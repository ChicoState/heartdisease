import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'

export interface PredictionInput {
  age: number
  sex: string
  systolicBP: number
  totalCholesterol: number
  hdlCholesterol: number
  smoker: string
  diabetes: boolean
}

export async function runPrediction(input: PredictionInput): Promise<any> {
  const scriptPath = path.join(process.cwd(), 'predict.py')
  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Python script not found at ${scriptPath}`)
  }
  const modelPath = path.join(process.cwd(), 'heart_disease_rf.pkl')
  const scalerPath = path.join(process.cwd(), 'scaler.pkl')

  if (!fs.existsSync(modelPath)) {
    throw new Error(`Model file not found at ${modelPath}`)
  }
  if (!fs.existsSync(scalerPath)) {
    throw new Error(`Scaler file not found at ${scalerPath}`)
  }

  const pythonProcess = spawn(path.join(process.cwd(), 'venv', 'bin', 'python3.9'), [scriptPath], {
    env: {
      ...process.env,
      PYTHONPATH: path.join(process.cwd(), 'venv', 'lib', 'python3.9', 'site-packages')
    }
  })

  pythonProcess.stdin.write(JSON.stringify(input))
  pythonProcess.stdin.end()

  let output = ''
  let error = ''

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString()
  })

  pythonProcess.stderr.on('data', (data) => {
    error += data.toString()
  })

  await new Promise((resolve, reject) => {
    pythonProcess.on('close', (code) => {
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
    throw new Error('No output received from Python script')
  }

  return JSON.parse(output)
} 