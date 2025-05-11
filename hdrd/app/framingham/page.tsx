import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FraminghamForm from "@/components/FraminghamForm"

export default function FraminghamPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Framingham Risk Score Calculator</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>About the Framingham Risk Score</CardTitle>
            <CardDescription>Understanding the gold standard in cardiovascular risk assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Framingham Risk Score is a widely used tool to estimate an individual's 10-year risk of developing cardiovascular disease. It was developed based on data from the Framingham Heart Study, one of the longest-running and most influential cardiovascular studies.
            </p>
            <h3 className="font-medium mt-4">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Estimates 10-year risk of cardiovascular disease</li>
              <li>Separate calculations for men and women</li>
              <li>Considers multiple risk factors including age, cholesterol, blood pressure, smoking status, and diabetes</li>
              <li>Validated in multiple populations worldwide</li>
            </ul>
          </CardContent>
        </Card>

        <FraminghamForm />

        <Card>
          <CardHeader>
            <CardTitle>Risk Categories</CardTitle>
            <CardDescription>Understanding your risk level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-1">
              <li><b>Low Risk:</b> Less than 10% - Regular check-ups and healthy lifestyle maintenance recommended</li>
              <li><b>Moderate Risk:</b> 10-20% - Lifestyle modifications and possibly medication may be recommended</li>
              <li><b>High Risk:</b> Greater than 20% - Aggressive risk factor modification and medical intervention likely needed</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitations & Important Notes</CardTitle>
            <CardDescription>Understanding the calculator's scope</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-5 space-y-1">
              <li>Not validated for individuals under 20 or over 79 years of age</li>
              <li>May underestimate risk in certain ethnic groups</li>
              <li>Does not account for family history of premature cardiovascular disease</li>
              <li>Should not replace professional medical advice</li>
              <li>Use results as a starting point for discussion with your healthcare provider</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 