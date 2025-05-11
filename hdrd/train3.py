import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score

df = pd.read_csv("dataset.csv")
X = df.drop('target', axis=1)
y = df['target']

continuous_cols = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
categorical_cols = ['cp', 'restecg', 'slope', 'ca', 'thal']

X = pd.get_dummies(X, columns=categorical_cols, drop_first=True)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\nTraining set size: {X_train.shape}, Test set size: {X_test.shape}")

scaler = StandardScaler()
X_train[continuous_cols] = scaler.fit_transform(X_train[continuous_cols])
X_test[continuous_cols] = scaler.transform(X_test[continuous_cols])

X_train['ca_total'] = X_train[['ca_1', 'ca_2', 'ca_3']].sum(axis=1)
X_test['ca_total'] = X_test[['ca_1', 'ca_2', 'ca_3']].sum(axis=1)

X_train['cp_highrisk'] = X_train[['cp_2', 'cp_3']].sum(axis=1)
X_test['cp_highrisk'] = X_test[['cp_2', 'cp_3']].sum(axis=1)

model = RandomForestClassifier(n_estimators=200, max_depth=6, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

acc = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
classif_report = classification_report(y_test, y_pred)
auc_score = roc_auc_score(y_test, y_proba)

print("\n--- MODEL EVALUATION (Random Forest) ---")
print(f"Accuracy: {acc:.3f}")
print(f"Confusion Matrix:\n{cm}")
print("\nClassification Report:")
print(classif_report)
print(f"ROC-AUC Score: {auc_score:.3f}")

joblib.dump(model, "heart_disease_rf.pkl")
joblib.dump(scaler, "scaler.pkl")

print("\nRandom Forest Model and Scaler saved successfully!")
