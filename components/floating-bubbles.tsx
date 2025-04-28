"use client"

import { useEffect, useRef } from "react"

interface Bubble {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function FloatingBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight

      // Initialize bubbles
      initBubbles()
    }

    const initBubbles = () => {
      const bubbleCount = Math.floor((canvas.width * canvas.height) / 15000) // Adjust density
      bubblesRef.current = []

      // Bubble colors - using our gradient colors and lime
      const colors = ["#FF3F2F", "#FF7B4A", "#FFB380", "#D6FF7F"]

      for (let i = 0; i < bubbleCount; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 5, // Size between 5-20
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1, // Opacity between 0.1-0.6
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with transparent fill to create trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw bubbles
      bubblesRef.current.forEach((bubble) => {
        // Move bubble
        bubble.x += bubble.speedX
        bubble.y += bubble.speedY

        // Bounce off edges
        if (bubble.x < 0 || bubble.x > canvas.width) bubble.speedX *= -1
        if (bubble.y < 0 || bubble.y > canvas.height) bubble.speedY *= -1

        // Draw bubble
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fillStyle =
          bubble.color +
          Math.floor(bubble.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = bubble.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Set up canvas and start animation
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}
