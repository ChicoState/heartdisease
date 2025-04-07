import AIAssessmentForm from "@/components/AIAssessmentForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <h1 className="text-4xl font-bold text-center mb-8">Heart Disease Risk Assessment</h1>
        <p className="text-center mb-8">
          This tool uses machine learning to assess your risk of developing heart disease based on your health information.
        </p>
        <AIAssessmentForm />
      </div>
    </main>
  )
}

