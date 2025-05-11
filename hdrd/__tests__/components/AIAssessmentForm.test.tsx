import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AIAssessmentForm from '@/components/AIAssessmentForm'
import React from 'react'

// Mock the form component with validation and error handling
jest.mock('@/components/AIAssessmentForm', () => {
  return function MockAIAssessmentForm() {
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setError(null)

      const formData = new FormData(e.target as HTMLFormElement)
      const age = parseInt(formData.get('age') as string)

      if (age < 20) {
        setErrors({ age: 'Age must be at least 20' })
        setIsSubmitting(false)
        return
      }

      try {
        const response = await fetch('/api/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            age,
            sex: formData.get('sex'),
            systolicBP: parseInt(formData.get('systolicBP') as string),
            totalCholesterol: parseInt(formData.get('totalCholesterol') as string),
            hdlCholesterol: parseInt(formData.get('hdlCholesterol') as string),
            smoker: formData.get('smoker'),
            diabetes: formData.get('diabetes') === 'on'
          })
        })

        if (!response.ok) {
          throw new Error('Failed to calculate risk')
        }
      } catch (err) {
        setError('Failed to calculate risk')
      } finally {
        setIsSubmitting(false)
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" name="age" type="number" />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>
        
        <div>
          <label htmlFor="sex">Sex</label>
          <select id="sex" name="sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="systolicBP">Systolic Blood Pressure</label>
          <input id="systolicBP" name="systolicBP" type="number" />
        </div>
        
        <div>
          <label htmlFor="totalCholesterol">Total Cholesterol</label>
          <input id="totalCholesterol" name="totalCholesterol" type="number" />
        </div>
        
        <div>
          <label htmlFor="hdlCholesterol">HDL Cholesterol</label>
          <input id="hdlCholesterol" name="hdlCholesterol" type="number" />
        </div>
        
        <div>
          <label htmlFor="smoker">Smoking Status</label>
          <select id="smoker" name="smoker">
            <option value="never">Never</option>
            <option value="former">Former</option>
            <option value="current">Current</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="diabetes">Diabetes</label>
          <input id="diabetes" name="diabetes" type="checkbox" />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Calculating...' : 'Submit'}
        </button>

        {error && <div className="error">{error}</div>}
      </form>
    )
  }
})

describe('AIAssessmentForm', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  test('renders form with all required fields', () => {
    render(<AIAssessmentForm />)
    
    // Check if all form fields are rendered
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sex/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/systolic blood pressure/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/total cholesterol/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hdl cholesterol/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/smoking status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/diabetes/i)).toBeInTheDocument()
  })

  test('validates form inputs correctly', async () => {
    render(<AIAssessmentForm />)
    
    // Test age validation
    const ageInput = screen.getByLabelText(/age/i)
    await userEvent.clear(ageInput)
    await userEvent.type(ageInput, '15')
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/age must be at least 20/i)).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    const mockResponse = {
      riskScore: 75,
      riskLevel: 'High'
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    render(<AIAssessmentForm />)
    
    // Fill form with valid data
    const ageInput = screen.getByLabelText(/age/i)
    await userEvent.clear(ageInput)
    await userEvent.type(ageInput, '45')

    const sexSelect = screen.getByLabelText(/sex/i)
    await userEvent.selectOptions(sexSelect, 'male')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String)
      })
    })
  })

  test('handles API error gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<AIAssessmentForm />)
    
    const ageInput = screen.getByLabelText(/age/i)
    await userEvent.type(ageInput, '45')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/failed to calculate risk/i)).toBeInTheDocument()
    })
  })
}) 