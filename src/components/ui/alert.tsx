import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AlertProps {
  children: ReactNode
  variant?: "default" | "destructive"
  className?: string
}

export function Alert({ children, variant = "default", className }: AlertProps) {
  const baseStyle =
    "relative w-full px-4 py-3 text-sm flex items-start gap-3 border"

  const variants = {
    default: "border-white text-white",
    destructive: "border-red-500 text-red-500",
  }

  return (
    <div role="alert" className={cn(baseStyle, variants[variant], className)}>
      {children}
    </div>
  )
}

export function AlertTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("font-medium tracking-tight", className)}>
      {children}
    </div>
  )
}

export function AlertDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-sm opacity-90", className)}>
      {children}
    </div>
  )
}
