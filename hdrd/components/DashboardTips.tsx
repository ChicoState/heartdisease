import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, Utensils } from "lucide-react"

const healthTips = [
  {
    icon: Heart,
    title: "Monitor Blood Pressure",
    description: "Check your blood pressure regularly. Aim for readings below 120/80 mmHg.",
  },
  {
    icon: Activity,
    title: "Stay Active",
    description: "Aim for at least 150 minutes of moderate exercise each week.",
  },
  {
    icon: Utensils,
    title: "Heart-Healthy Diet",
    description: "Focus on fruits, vegetables, whole grains, and lean proteins.",
  },
]

export default function DashboardTips() {
  const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Tip</CardTitle>
        <CardDescription>Advice to improve your heart health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <randomTip.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">{randomTip.title}</h3>
            <p className="text-sm text-muted-foreground">{randomTip.description}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t text-sm">
          <p className="text-muted-foreground">
            Remember to consult with your healthcare provider before making significant changes to your health routine.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

