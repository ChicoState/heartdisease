import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const confusionMatrixData = {
  truePositive: 85,
  falsePositive: 15,
  falseNegative: 10,
  trueNegative: 90,
}

export default function ConfusionMatrix() {
  const total = Object.values(confusionMatrixData).reduce((a, b) => a + b, 0)
  const accuracy = (((confusionMatrixData.truePositive + confusionMatrixData.trueNegative) / total) * 100).toFixed(1)
  const precision = (
    (confusionMatrixData.truePositive / (confusionMatrixData.truePositive + confusionMatrixData.falsePositive)) *
    100
  ).toFixed(1)
  const recall = (
    (confusionMatrixData.truePositive / (confusionMatrixData.truePositive + confusionMatrixData.falseNegative)) *
    100
  ).toFixed(1)
  const f1Score = (
    (2 * (Number.parseFloat(precision) * Number.parseFloat(recall))) /
    (Number.parseFloat(precision) + Number.parseFloat(recall))
  ).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance: Confusion Matrix</CardTitle>
        <CardDescription>Evaluation of our AI model's predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
            <p className="font-semibold">True Positive</p>
            <p className="text-2xl">{confusionMatrixData.truePositive}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
            <p className="font-semibold">False Positive</p>
            <p className="text-2xl">{confusionMatrixData.falsePositive}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
            <p className="font-semibold">False Negative</p>
            <p className="text-2xl">{confusionMatrixData.falseNegative}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
            <p className="font-semibold">True Negative</p>
            <p className="text-2xl">{confusionMatrixData.trueNegative}</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <p>
            <strong>Accuracy:</strong> {accuracy}%
          </p>
          <p>
            <strong>Precision:</strong> {precision}%
          </p>
          <p>
            <strong>Recall:</strong> {recall}%
          </p>
          <p>
            <strong>F1 Score:</strong> {f1Score}
          </p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          This confusion matrix represents the performance of our AI model on a test dataset. It shows how well the
          model predicts both positive (at-risk) and negative (not at-risk) cases.
        </p>
      </CardContent>
    </Card>
  )
}

