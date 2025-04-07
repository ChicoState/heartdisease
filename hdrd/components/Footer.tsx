import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">HeartRisk AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered heart disease risk assessment based on medical research and real-world data.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About the AI Model
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary">
                  Help & Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Have questions or feedback? <br />
              <a href="mailto:contact@heartrisk.ai" className="text-primary hover:underline">
                contact@heartrisk.ai
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HeartRisk AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

