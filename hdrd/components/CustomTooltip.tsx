"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomTooltipProps {
  content: React.ReactNode
  children?: React.ReactNode
}

export default function CustomTooltip({ content, children }: CustomTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block">
      {children || (
        <Button
          ref={triggerRef}
          type="button"
          variant="ghost"
          size="icon"
          className="h-5 w-5 rounded-full p-0"
          onClick={(e) => {
            e.preventDefault()
            setIsVisible(!isVisible)
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <Info className="h-4 w-4" />
          <span className="sr-only">Info</span>
        </Button>
      )}

      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 w-64 p-3 text-sm bg-popover text-popover-foreground rounded-md shadow-md border border-border top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-[-8px]"
        >
          <div className="relative">
            {content}
            <div className="absolute w-3 h-3 bg-popover border-r border-b border-border rotate-45 left-1/2 -translate-x-1/2 -bottom-[7px]"></div>
          </div>
        </div>
      )}
    </div>
  )
}

