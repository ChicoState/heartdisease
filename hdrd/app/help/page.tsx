import Advice from "@/components/Advice"

export default function HelpPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Help & Resources</h1>

      <div className="grid grid-cols-1 gap-8">
        <Advice />
      </div>
    </div>
  )
}

