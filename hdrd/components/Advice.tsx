"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Activity, Utensils, Pill } from "lucide-react"

export default function Advice() {
  return (
    <Tabs defaultValue="lifestyle">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="lifestyle" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span className="hidden sm:inline">Lifestyle</span>
        </TabsTrigger>
        <TabsTrigger value="diet" className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          <span className="hidden sm:inline">Diet</span>
        </TabsTrigger>
        <TabsTrigger value="medical" className="flex items-center gap-2">
          <Pill className="h-4 w-4" />
          <span className="hidden sm:inline">Medical</span>
        </TabsTrigger>
        <TabsTrigger value="monitoring" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Monitoring</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="lifestyle">
        <Card>
          <CardHeader>
            <CardTitle>Lifestyle Recommendations</CardTitle>
            <CardDescription>Physical activity and lifestyle changes to improve heart health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Physical Activity</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Aim for at least 150 minutes of moderate-intensity exercise per week</li>
                <li>Include both aerobic exercise (walking, swimming) and strength training</li>
                <li>Break up long periods of sitting with short activity breaks</li>
                <li>Find activities you enjoy to make exercise sustainable</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Smoking Cessation</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Quitting smoking can reduce heart disease risk by up to 50% after one year</li>
                <li>Consider nicotine replacement therapy or medications to help quit</li>
                <li>Avoid secondhand smoke exposure</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Stress Management</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Practice stress reduction techniques like meditation or deep breathing</li>
                <li>Ensure adequate sleep (7-8 hours per night)</li>
                <li>Consider mindfulness practices or yoga</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="diet">
        <Card>
          <CardHeader>
            <CardTitle>Dietary Recommendations</CardTitle>
            <CardDescription>Eating patterns and specific foods to support heart health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Heart-Healthy Eating Patterns</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Consider a Mediterranean-style diet rich in fruits, vegetables, whole grains, and healthy fats</li>
                <li>Limit saturated and trans fats, which can raise LDL cholesterol</li>
                <li>Reduce sodium intake to help control blood pressure</li>
                <li>Limit added sugars and refined carbohydrates</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Beneficial Foods</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Fatty fish (salmon, mackerel) rich in omega-3 fatty acids</li>
                <li>Nuts, seeds, and plant oils for healthy fats</li>
                <li>Fruits and vegetables high in antioxidants and fiber</li>
                <li>Whole grains instead of refined grains</li>
                <li>Lean proteins like poultry, fish, and plant-based proteins</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Foods to Limit</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Processed meats (bacon, sausage, deli meats)</li>
                <li>Foods high in saturated fats (fatty cuts of meat, full-fat dairy)</li>
                <li>Foods with trans fats (some fried foods, baked goods)</li>
                <li>High-sodium foods (processed foods, canned soups)</li>
                <li>Sugar-sweetened beverages and desserts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="medical">
        <Card>
          <CardHeader>
            <CardTitle>Medical Considerations</CardTitle>
            <CardDescription>Information about medications and medical interventions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-4">
              <p className="text-yellow-800 font-medium">
                Note: This information is educational only. Always consult with your healthcare provider before starting
                or changing any medications.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Blood Pressure Management</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hypertension medications may be recommended if lifestyle changes are insufficient</li>
                <li>Common classes include ACE inhibitors, ARBs, calcium channel blockers, and diuretics</li>
                <li>Regular monitoring is important to ensure medications are effective</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Cholesterol Management</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Statins can reduce LDL cholesterol and may be recommended based on your risk profile</li>
                <li>Other medications like ezetimibe or PCSK9 inhibitors may be options for some people</li>
                <li>Regular lipid panel testing helps monitor effectiveness</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Aspirin Therapy</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Low-dose aspirin may be recommended for some individuals with high cardiovascular risk</li>
                <li>Recent guidelines have narrowed recommendations for aspirin use</li>
                <li>Discuss with your doctor if aspirin therapy is appropriate for you</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monitoring">
        <Card>
          <CardHeader>
            <CardTitle>Health Monitoring</CardTitle>
            <CardDescription>How to track your heart health metrics over time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Blood Pressure Monitoring</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Consider home blood pressure monitoring if you have hypertension</li>
                <li>Take readings at the same time each day for consistency</li>
                <li>Keep a log of readings to share with your healthcare provider</li>
                <li>Target: Less than 120/80 mmHg for most adults</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Cholesterol Testing</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Follow your doctor's recommendations for frequency of testing</li>
                <li>Typically every 4-6 years for adults with normal levels</li>
                <li>More frequently for those with elevated levels or on medication</li>
                <li>
                  Target: Total cholesterol &lt;200 mg/dL, LDL &lt;100 mg/dL, HDL &gt;40 mg/dL (men) or &gt;50 mg/dL
                  (women)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Regular Check-ups</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Schedule regular visits with your healthcare provider</li>
                <li>Discuss changes in your health or symptoms promptly</li>
                <li>Update your risk assessment annually or after significant health changes</li>
                <li>Consider additional testing (like ECG or stress tests) if recommended</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

