import { runPrediction, PredictionInput } from '@/lib/predict'

// Mock the Python process
jest.mock('child_process', () => ({
  spawn: jest.fn(() => {
    let input: any
    return {
      stdin: {
        write: jest.fn((data) => {
          input = JSON.parse(data.toString())
        }),
        end: jest.fn()
      },
      stdout: {
        on: jest.fn((event, callback) => {
          if (event === 'data') {
            const isInvalid = input.age < 20 || !input.systolicBP || !input.totalCholesterol || !input.hdlCholesterol || !input.smoker
            if (!isInvalid) {
              callback(Buffer.from(JSON.stringify({ riskScore: 75, riskLevel: 'High' })))
            }
          }
          if (event === 'end') {
            callback()
          }
        })
      },
      stderr: {
        on: jest.fn((event, callback) => {
          if (event === 'data') {
            const isInvalid = input.age < 20 || !input.systolicBP || !input.totalCholesterol || !input.hdlCholesterol || !input.smoker
            if (isInvalid) {
              callback(Buffer.from('Invalid input'))
            }
          }
        })
      },
      on: jest.fn((event, callback) => {
        if (event === 'close') {
          const isInvalid = input.age < 20 || !input.systolicBP || !input.totalCholesterol || !input.hdlCholesterol || !input.smoker
          callback(isInvalid ? 1 : 0)
        }
      })
    }
  })
}))

describe('runPrediction', () => {
  it('returns prediction for valid input', async () => {
    const input: PredictionInput = {
      age: 45,
      sex: 'male',
      systolicBP: 120,
      totalCholesterol: 200,
      hdlCholesterol: 50,
      smoker: 'never',
      diabetes: false
    }
    const result = await runPrediction(input)
    expect(result).toHaveProperty('riskScore')
    expect(result).toHaveProperty('riskLevel')
    expect(typeof result.riskScore).toBe('number')
    expect(typeof result.riskLevel).toBe('string')
  })

  it('throws error for invalid input', async () => {
    const input: any = {
      age: 15, // Invalid age
      sex: 'male',
      systolicBP: 120,
      totalCholesterol: 200,
      hdlCholesterol: 50,
      smoker: 'never',
      diabetes: false
    }
    await expect(runPrediction(input)).rejects.toThrow()
  })

  it('throws error for missing required fields', async () => {
    const input: any = {
      age: 45,
      sex: 'male'
      // Missing other required fields
    }
    await expect(runPrediction(input)).rejects.toThrow()
  })
}) 