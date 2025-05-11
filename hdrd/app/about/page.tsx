import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ConfusionMatrix from "@/components/ConfusionMatrix"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">About the HeartRisk AI Model</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>How the Model Works</CardTitle>
            <CardDescription>A transparent look at our heart disease risk prediction pipeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The HeartRisk AI model uses a machine learning pipeline to estimate your risk of heart disease based on your health data. The process involves data cleaning, feature engineering, and prediction using a Random Forest Classifier.
            </p>
            <h3 className="font-medium mt-4">Pipeline Steps</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><b>Data Input:</b> Your health metrics (age, blood pressure, cholesterol, etc.) are collected via the app form.</li>
              <li><b>Preprocessing:</b> Categorical features are one-hot encoded, and continuous features are standardized using a scaler.</li>
              <li><b>Feature Engineering:</b> Additional features are created by combining certain variables (e.g., total number of major vessels, high-risk chest pain types).</li>
              <li><b>Prediction:</b> The processed data is fed into a Random Forest Classifier trained on real patient data to estimate your risk.</li>
              <li><b>Output:</b> The model returns a risk score and a risk category (Low, Medium, High) to help you understand your results.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Data</CardTitle>
            <CardDescription>What the model learned from</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The model was trained on a public heart disease dataset containing 305 anonymized patient records. Each record includes demographic, clinical, and laboratory features relevant to heart disease risk.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Features include: age, sex, blood pressure, cholesterol, chest pain type, ECG results, and more</li>
              <li>Target variable: presence or absence of heart disease</li>
              <li>Dataset source: UCI Heart Disease dataset (Cleveland Clinic subset)</li>
            </ul>
            <p className="mt-4">
              The relatively small dataset size means the model is best used for educational and screening purposes, not as a diagnostic tool.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Details</CardTitle>
            <CardDescription>Technical summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-1">
              <li>Algorithm: Random Forest Classifier (200 trees, max depth 6)</li>
              <li>Preprocessing: StandardScaler for continuous features, one-hot encoding for categorical features</li>
              <li>Feature interactions: Summed vessel counts and high-risk chest pain types</li>
              <li>Evaluation: ~92% accuracy on held-out test data</li>
              <li>Model and scaler are saved and used for real-time predictions in the app</li>
            </ul>
          </CardContent>
        </Card>

        <ConfusionMatrix />
        <Card>
          <CardHeader>
            <CardTitle>Limitations & Responsible Use</CardTitle>
            <CardDescription>Important considerations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-1">
              <li>Predictions are based on a small, historical dataset and may not generalize to all populations</li>
              <li>Does not account for rare genetic factors or all possible medical conditions</li>
              <li>Should not be used as a substitute for professional medical advice or diagnosis</li>
              <li>Use results as a conversation starter with your healthcare provider</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

