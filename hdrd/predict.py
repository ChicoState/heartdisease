import sys
import json
import joblib
import numpy as np
import os
import pandas as pd

def predict():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_dir, "heart_disease_rf.pkl")
    scaler_path = os.path.join(script_dir, "scaler.pkl")
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)

    input_data = json.loads(sys.stdin.read())
    df = pd.DataFrame({
        'age': [input_data["age"]],
        'sex': [1 if input_data["sex"] == "male" else 0],
        'trestbps': [input_data["systolicBP"]],
        'chol': [input_data["totalCholesterol"]],
        'fbs': [0],
        'thalach': [input_data["hdlCholesterol"]],
        'exang': [0],
        'oldpeak': [0],
        'cp_1': [0],
        'cp_2': [1 if input_data["sex"] == "male" else 0],
        'cp_3': [0],
        'restecg_1': [1],
        'restecg_2': [0],
        'slope_1': [1],
        'slope_2': [0],
        'ca_1': [0],
        'ca_2': [0],
        'ca_3': [0],
        'thal_2': [1],
        'thal_3': [0]
    })

    continuous_cols = ['age', 'trestbps', 'chol', 'thalach', 'oldpeak']
    df[continuous_cols] = scaler.transform(df[continuous_cols])
    df['ca_total'] = df[['ca_1', 'ca_2', 'ca_3']].sum(axis=1)
    df['cp_highrisk'] = df[['cp_2', 'cp_3']].sum(axis=1)

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    if probability < 0.3:
        risk_level = "Low"
    elif probability < 0.7:
        risk_level = "Medium"
    else:
        risk_level = "High"

    result = {
        "riskScore": float(probability * 100),
        "riskLevel": risk_level,
        "prediction": int(prediction),
    }
    print(json.dumps(result))

if __name__ == "__main__":
    predict() 