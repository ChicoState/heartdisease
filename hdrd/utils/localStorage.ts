"use client"

export interface HealthData {
  id: string
  date: string
  age: number
  sex: string
  systolicBP: number
  totalCholesterol: number
  hdlCholesterol: number
  smoker: string
  diabetes: boolean
  riskScore: number
  riskLevel: "Low" | "Medium" | "High"
}

export const saveHealthData = (
  data: Omit<HealthData, "id" | "date"> & Partial<Pick<HealthData, "riskScore" | "riskLevel">>
): HealthData => {
  const { riskScore, riskLevel } = data.riskScore !== undefined && data.riskLevel !== undefined
    ? { riskScore: data.riskScore, riskLevel: data.riskLevel }
    : calculateRiskScore(data)

  const healthData: HealthData = {
    ...data,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    riskScore,
    riskLevel,
  }
  const existingData = getHealthHistory()
  const updatedData = [...existingData, healthData]
  localStorage.setItem("healthHistory", JSON.stringify(updatedData))

  return healthData
}

export const getHealthHistory = (): HealthData[] => {
  if (typeof window === "undefined") {
    return []
  }

  const data = localStorage.getItem("healthHistory")
  return data ? JSON.parse(data) : []
}

export const deleteHealthData = (id: string): void => {
  const existingData = getHealthHistory()
  const updatedData = existingData.filter((item) => item.id !== id)
  localStorage.setItem("healthHistory", JSON.stringify(updatedData))
}

export const calculateRiskScore = (
  data: Omit<HealthData, "id" | "date" | "riskScore" | "riskLevel">,
): { riskScore: number; riskLevel: "Low" | "Medium" | "High" } => {
  let score = 0
  score += data.age * 0.5
  if (data.systolicBP > 140) {
    score += 15
  } else if (data.systolicBP > 120) {
    score += 7
  }
  if (data.totalCholesterol > 240) {
    score += 15
  } else if (data.totalCholesterol > 200) {
    score += 7
  }

  if (data.hdlCholesterol < 40) {
    score += 10
  } else if (data.hdlCholesterol < 60) {
    score += 5
  }
  if (data.diabetes) score += 15
  if (data.smoker === "current") score += 15
  if (data.smoker === "former") score += 7
  const normalizedScore = Math.min(Math.max(score, 0), 100)
  let riskLevel: "Low" | "Medium" | "High"
  if (normalizedScore < 30) {
    riskLevel = "Low"
  } else if (normalizedScore < 60) {
    riskLevel = "Medium"
  } else {
    riskLevel = "High"
  }

  return { riskScore: normalizedScore, riskLevel }
}

