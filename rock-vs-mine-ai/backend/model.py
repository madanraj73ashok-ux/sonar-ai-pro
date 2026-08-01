import os
import json
import sqlite3
import numpy as np
import pandas as pd
from typing import Dict, Any, List
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, roc_curve, auc
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier

DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "dataset", "sonar_data.csv")
DB_PATH = os.path.join(os.path.dirname(__file__), "sonar_ai.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            user TEXT,
            input_data TEXT,
            prediction TEXT,
            confidence REAL,
            model_used TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS models (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            model_name TEXT,
            accuracy REAL,
            precision REAL,
            recall REAL,
            f1 REAL,
            is_active INTEGER
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class SonarMLEngine:
    def __init__(self):
        self.models = {
            "Logistic Regression": LogisticRegression(max_iter=1000),
            "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
            "Decision Tree": DecisionTreeClassifier(random_state=42),
            "SVM": SVC(probability=True, random_state=42),
            "KNN": KNeighborsClassifier(n_neighbors=3),
            "Gradient Boosting": GradientBoostingClassifier(random_state=42),
            "XGBoost": XGBClassifier(eval_metric='logloss', random_state=42),
            "LightGBM": LGBMClassifier(random_state=42, verbose=-1),
            "CatBoost": CatBoostClassifier(verbose=0, random_state=42)
        }
        self.trained_models = {}
        self.metrics_cache = {}
        self.best_model_name = "Random Forest"
        self.load_data_and_train()

    def load_data(self):
        if not os.path.exists(DATASET_PATH):
            raise FileNotFoundError(f"Dataset missing at {DATASET_PATH}")
        df = pd.read_csv(DATASET_PATH, header=None)
        X = df.iloc[:, :-1].values
        y = df.iloc[:, -1].map({'R': 0, 'M': 1}).values
        return X, y, df

    def load_data_and_train(self):
        X, y, df = self.load_data()
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

        best_f1 = -1.0
        for name, clf in self.models.items():
            clf.fit(X_train, y_train)
            self.trained_models[name] = clf

            y_pred = clf.predict(X_test)
            y_proba = clf.predict_proba(X_test)[:, 1] if hasattr(clf, "predict_proba") else y_pred

            acc = float(accuracy_score(y_test, y_pred))
            prec = float(precision_score(y_test, y_pred, zero_division=0))
            rec = float(recall_score(y_test, y_pred, zero_division=0))
            f1 = float(f1_score(y_test, y_pred, zero_division=0))

            cm = confusion_matrix(y_test, y_pred).tolist()
            fpr, tpr, _ = roc_curve(y_test, y_proba)
            roc_auc = float(auc(fpr, tpr))

            # Feature Importance
            if hasattr(clf, "feature_importances_"):
                importances = clf.feature_importances_.tolist()
            elif hasattr(clf, "coef_"):
                importances = np.abs(clf.coef_[0]).tolist()
            else:
                importances = [1.0/60.0]*60

            self.metrics_cache[name] = {
                "accuracy": round(acc * 100, 2),
                "precision": round(prec * 100, 2),
                "recall": round(rec * 100, 2),
                "f1": round(f1 * 100, 2),
                "roc_auc": round(roc_auc, 3),
                "confusion_matrix": cm,
                "roc_curve": {"fpr": [round(val, 3) for val in fpr.tolist()], "tpr": [round(val, 3) for val in tpr.tolist()]},
                "feature_importances": importances
            }

            if f1 > best_f1:
                best_f1 = f1
                self.best_model_name = name

    def predict(self, features: List[float], model_name: str = None) -> Dict[str, Any]:
        target_model_name = model_name if model_name in self.trained_models else self.best_model_name
        model = self.trained_models[target_model_name]
        
        arr = np.array(features).reshape(1, -1)
        pred_int = int(model.predict(arr)[0])
        label = "Mine" if pred_int == 1 else "Rock"
        
        proba = model.predict_proba(arr)[0]
        confidence = float(proba[pred_int] * 100)

        # Calculate local feature attributions
        if hasattr(model, "feature_importances_"):
            base_imp = model.feature_importances_
        elif hasattr(model, "coef_"):
            base_imp = np.abs(model.coef_[0])
        else:
            base_imp = np.ones(60) / 60.0
            
        local_contributions = (arr[0] * base_imp)
        total = np.sum(np.abs(local_contributions)) + 1e-9
        normalized_scores = (np.abs(local_contributions) / total) * 100

        top_indices = np.argsort(normalized_scores)[::-1][:6]
        top_features = [{"feature": f"Signal {idx+1}", "index": int(idx), "importance": round(float(normalized_scores[idx]), 1), "value": round(float(features[idx]), 4)} for idx in top_indices]

        # Log prediction to DB
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO predictions (user, input_data, prediction, confidence, model_used)
            VALUES (?, ?, ?, ?, ?)
        ''', ("User", json.dumps(features), label, round(confidence, 2), target_model_name))
        conn.commit()
        conn.close()

        return {
            "prediction": label,
            "confidence": round(confidence, 2),
            "model_used": target_model_name,
            "top_features": top_features
        }

    def get_dataset_stats(self):
        X, y, df = self.load_data()
        counts = df.iloc[:, -1].value_counts().to_dict()
        num_rocks = int(counts.get('R', 0))
        num_mines = int(counts.get('M', 0))
        
        # Calculate mean frequency profile
        rock_means = df[df.iloc[:, -1] == 'R'].iloc[:, :-1].mean().tolist()
        mine_means = df[df.iloc[:, -1] == 'M'].iloc[:, :-1].mean().tolist()

        return {
            "total_samples": len(df),
            "num_rocks": num_rocks,
            "num_mines": num_mines,
            "num_features": 60,
            "rock_means": [round(x, 4) for x in rock_means],
            "mine_means": [round(x, 4) for x in mine_means]
        }

ml_engine = SonarMLEngine()
