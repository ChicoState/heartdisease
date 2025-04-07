import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 noise"></div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            AI-Powered Heart Health Assessment
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Understand your heart disease risk in minutes. Our AI analyzes your health data to provide personalized
            insights and recommendations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="#risk-assessment">
              <Button size="lg" className="rounded-full">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/80">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

