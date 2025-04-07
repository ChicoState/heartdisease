import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ConfusionMatrix from "@/components/ConfusionMatrix"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">About the HeartRisk AI Model</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Model Overview</CardTitle>
            <CardDescription>Understanding our AI-powered heart disease risk assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The HeartRisk AI model is a machine learning algorithm designed to predict an individual's risk of
              developing heart disease. It analyzes various health metrics and lifestyle factors to provide a
              personalized risk assessment.
            </p>
            <h3 className="font-medium mt-4">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Utilizes advanced machine learning techniques</li>
              <li>Trained on large-scale, diverse medical datasets</li>
              <li>Considers multiple risk factors for comprehensive analysis</li>
              <li>Provides personalized risk scores and recommendations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Data</CardTitle>
            <CardDescription>The foundation of our AI model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our model was trained on a diverse dataset comprising over 300,000 patient records from various sources,
              including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Framingham Heart Study</li>
              <li>NHANES (National Health and Nutrition Examination Survey)</li>
              <li>UK Biobank</li>
              <li>Electronic Health Records from multiple healthcare systems</li>
            </ul>
            <p className="mt-4">
              This extensive dataset ensures that our model can account for a wide range of demographic and health
              profiles, enhancing its accuracy and applicability.
            </p>
          </CardContent>
        </Card>

        <ConfusionMatrix />

        <Card>
          <CardHeader>
            <CardTitle>Model Limitations</CardTitle>
            <CardDescription>Understanding the boundaries of our AI predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>While our model strives for high accuracy, it's important to understand its limitations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Predictions are based on population-level data and may not capture all individual variations</li>
              <li>The model doesn't account for rare genetic factors or certain specific medical conditions</li>
              <li>Accuracy may vary across different demographic groups</li>
              <li>The assessment is not a substitute for professional medical advice or diagnosis</li>
            </ul>
            <p className="mt-4">
              We recommend using the HeartRisk AI assessment as a starting point for discussions with healthcare
              providers and as a tool for monitoring general heart health trends.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

