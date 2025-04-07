import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Droplet, Heart, Activity, Stethoscope, Calendar, AlertCircle } from "lucide-react"

export default function HowToMeasurePage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">How to Get Your Health Measurements</h1>
        <p className="text-center text-muted-foreground mb-8">
          A guide to obtaining the health metrics needed for your heart disease risk assessment
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-yellow-800 text-sm">
            <p className="font-medium">Important Note</p>
            <p>
              The information on this page is for educational purposes only. Always consult with healthcare
              professionals for medical advice and proper testing procedures.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Cholesterol Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <Droplet className="h-5 w-5 text-red-600" />
                </div>
                <CardTitle>Cholesterol Measurements</CardTitle>
              </div>
              <CardDescription>How to get your HDL, LDL, and total cholesterol values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">What is a Lipid Panel?</h3>
                <p className="text-sm text-muted-foreground">
                  A lipid panel (or lipid profile) is a blood test that measures different types of cholesterol and
                  triglycerides in your blood. It typically includes:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Total Cholesterol:</span> The total amount of cholesterol in your
                    blood
                  </li>
                  <li>
                    <span className="font-medium">HDL Cholesterol:</span> "Good" cholesterol that helps remove other
                    forms of cholesterol from your bloodstream
                  </li>
                  <li>
                    <span className="font-medium">LDL Cholesterol:</span> "Bad" cholesterol that can build up in your
                    arteries
                  </li>
                  <li>
                    <span className="font-medium">Triglycerides:</span> A type of fat found in your blood
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">How to Get Tested</h3>
                <p className="text-sm text-muted-foreground">You can get a lipid panel through:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Your primary care physician during a regular check-up</li>
                  <li>Health clinics or community health centers</li>
                  <li>Pharmacy-based health clinics (available at some major pharmacy chains)</li>
                  <li>Health fairs or workplace wellness programs</li>
                  <li>At-home test kits (though these may be less accurate than laboratory tests)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Preparing for the Test</h3>
                <p className="text-sm text-muted-foreground">For the most accurate results:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Fast for 9-12 hours before the test (water is okay)</li>
                  <li>Avoid alcohol for 24 hours before the test</li>
                  <li>Maintain your regular diet for several days before the test</li>
                  <li>Inform your healthcare provider about any medications you're taking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Blood Pressure Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle>Blood Pressure Measurements</CardTitle>
              </div>
              <CardDescription>How to get your systolic and diastolic blood pressure readings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Understanding Blood Pressure Readings</h3>
                <p className="text-sm text-muted-foreground">Blood pressure is measured using two numbers:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Systolic (top number):</span> The pressure in your arteries when your
                    heart beats
                  </li>
                  <li>
                    <span className="font-medium">Diastolic (bottom number):</span> The pressure in your arteries when
                    your heart rests between beats
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Blood pressure is written as systolic/diastolic, such as 120/80 mmHg.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Where to Get Your Blood Pressure Measured</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Doctor's office or healthcare clinic</li>
                  <li>Pharmacy blood pressure machines (often free to use)</li>
                  <li>Community health fairs</li>
                  <li>Home blood pressure monitors (available at pharmacies and online)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Tips for Accurate Readings</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Avoid caffeine, exercise, and smoking for 30 minutes before measurement</li>
                  <li>Empty your bladder before the test</li>
                  <li>Sit with your back supported and feet flat on the floor</li>
                  <li>Rest your arm at heart level on a table or other support</li>
                  <li>Don't talk during the measurement</li>
                  <li>Take multiple readings and calculate the average</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Other Measurements Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle>Other Health Measurements</CardTitle>
              </div>
              <CardDescription>How to obtain other metrics needed for the risk assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Diabetes Status</h3>
                <p className="text-sm text-muted-foreground">
                  Diabetes is typically diagnosed through blood tests that measure your blood glucose levels:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Fasting blood glucose test</li>
                  <li>A1C test (measures average blood sugar over 2-3 months)</li>
                  <li>Oral glucose tolerance test</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  These tests are available through your healthcare provider or at specialized diabetes screening
                  events.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Smoking Status</h3>
                <p className="text-sm text-muted-foreground">
                  This is self-reported based on your current and past smoking habits:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Current smoker: Currently smoke cigarettes, even occasionally</li>
                  <li>Former smoker: Previously smoked but have quit</li>
                  <li>Never smoker: Never smoked cigarettes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Medication Use</h3>
                <p className="text-sm text-muted-foreground">
                  Information about medications (hypertension treatment, statins, aspirin) should be based on your
                  current prescription medications. If you're unsure, check with your healthcare provider or pharmacist.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Testing Frequency */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle>How Often to Get Tested</CardTitle>
              </div>
              <CardDescription>Recommended frequency for health screenings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Cholesterol Screening</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Adults 20+ with normal levels:</span> Every 4-6 years
                  </li>
                  <li>
                    <span className="font-medium">Adults with risk factors or abnormal levels:</span> More frequently,
                    as recommended by your healthcare provider
                  </li>
                  <li>
                    <span className="font-medium">Adults 40+ or with certain risk factors:</span> Annually or as
                    recommended
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Blood Pressure Screening</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Adults with normal blood pressure:</span> At least once every 2 years
                  </li>
                  <li>
                    <span className="font-medium">Adults with elevated or high blood pressure:</span> More frequently,
                    as recommended by your healthcare provider
                  </li>
                  <li>
                    <span className="font-medium">Home monitoring:</span> If recommended by your doctor, follow their
                    guidance on frequency
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Diabetes Screening</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Adults 45+ with normal results:</span> Every 3 years
                  </li>
                  <li>
                    <span className="font-medium">Adults with prediabetes:</span> Every 1-2 years
                  </li>
                  <li>
                    <span className="font-medium">Adults with risk factors:</span> Start screening earlier and more
                    frequently
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Finding Healthcare Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Stethoscope className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle>Finding Healthcare Resources</CardTitle>
              </div>
              <CardDescription>Where to go for health screenings and tests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Healthcare Providers</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Primary care physicians</li>
                  <li>Family medicine practitioners</li>
                  <li>Internal medicine specialists</li>
                  <li>Cardiologists (for specialized heart health)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Community Resources</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Community health centers</li>
                  <li>Public health departments</li>
                  <li>Health fairs and screening events</li>
                  <li>Workplace wellness programs</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-1">Finding Low-Cost Options</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Federally Qualified Health Centers (FQHCs) offer sliding scale fees</li>
                  <li>Many pharmacies offer low-cost health screenings</li>
                  <li>Check with your insurance provider about covered preventive services</li>
                  <li>
                    Search for free screening events through local hospitals, health departments, or community
                    organizations
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link href="/#risk-assessment">
              <Button size="lg" className="gap-2">
                Return to Assessment Form
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

