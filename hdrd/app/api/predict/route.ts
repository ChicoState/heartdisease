import { NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

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
    const input: PredictionInput = await request.json()

    // Get the absolute path to the Python script
    const scriptPath = path.join(process.cwd(), "predict.py")
    
    // Check if Python script exists
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Python script not found at ${scriptPath}`)
    }

    // Check if model files exist
    const modelPath = path.join(process.cwd(), "heart_disease_rf.pkl")
    const scalerPath = path.join(process.cwd(), "scaler.pkl")
    
    if (!fs.existsSync(modelPath)) {
      throw new Error(`Model file not found at ${modelPath}`)
    }
    if (!fs.existsSync(scalerPath)) {
      throw new Error(`Scaler file not found at ${scalerPath}`)
    }

    // Call Python script to make prediction
    const pythonProcess = spawn("python3", [scriptPath])
    pythonProcess.stdin.write(JSON.stringify(input))
    pythonProcess.stdin.end()

    let output = ""
    let error = ""

    // Collect output from Python script
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString()
    })

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString()
    })

    // Wait for Python script to complete
    await new Promise((resolve, reject) => {
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          resolve(null)
        } else {
          reject(new Error(`Python script exited with code ${code}. Error: ${error}`))
        }
      })
    })

    if (error) {
      throw new Error(`Python script error: ${error}`)
    }

    if (!output) {
      throw new Error("No output received from Python script")
    }

    // Parse output from Python script
    const result = JSON.parse(output)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to make prediction" },
      { status: 500 }
    )
  }
} 