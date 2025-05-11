import { NextResponse } from "next/server"
import { runPrediction } from '@/lib/predict'

interface PredictionInput {
  age: number
  sex: string
  systolicBP: number
  totalCholesterol: number
  hdlCholesterol: number
  smoker: string
  diabetes: boolean
}

export async function POST(request: Request) {
  try {
    const input = await request.json()
    const result = await runPrediction(input)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to make prediction" },
      { status: 500 }
    )
  }
} 