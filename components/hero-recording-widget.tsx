"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Square } from "lucide-react"
import { motion } from "framer-motion"
import BreathingGuide from "./breathing-guide"

export default function HeroRecordingWidget() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showBreathingGuide, setShowBreathingGuide] = useState(false)
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(30).fill(0))
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const pulseRef = useRef<number>(0)

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)

        // Simulate audio levels
        setAudioLevels((prev) => {
          const newLevels = [...prev]
          newLevels.shift()
          newLevels.push(Math.random() * 0.8 + 0.2)
          return newLevels
        })
      }, 100)
    } else {
      setRecordingTime(0)
      setAudioLevels(Array(30).fill(0))
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const parentWidth = canvas.parentElement?.clientWidth || 400
    const parentHeight = canvas.parentElement?.clientHeight || 400

    canvas.width = parentWidth
    canvas.height = parentHeight

    const drawVisualizer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0)
      gradient.addColorStop(0, "#FF3F2F") // Coral Red
      gradient.addColorStop(0.5, "#FF7B4A") // Pumpkin Orange
      gradient.addColorStop(1, "#FFB380") // Peach

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw circular recording indicator
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.35

      // Update pulse effect
      pulseRef.current += 0.03
      const pulseFactor = !isRecording ? Math.sin(pulseRef.current) * 0.05 + 1 : 1
      const pulseRadius = radius * pulseFactor

      // Draw outer ring with pulse effect
      ctx.strokeStyle = "#D6FF7F"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw subtle glow around the circle when not recording
      if (!isRecording) {
        ctx.shadowColor = "#D6FF7F"
        ctx.shadowBlur = 15 + Math.sin(pulseRef.current * 2) * 5
        ctx.strokeStyle = "rgba(214, 255, 127, 0.5)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, pulseRadius + 5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Draw inner circle when recording
      if (isRecording) {
        ctx.fillStyle = "#D6FF7F"
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw audio visualizer
      if (isRecording) {
        const barWidth = canvas.width / (audioLevels.length * 2)
        const maxBarHeight = radius * 0.8

        ctx.fillStyle = "#D6FF7F"

        // Draw bars on both sides of the circle
        audioLevels.forEach((level, i) => {
          // Left side bars
          const leftX = centerX - radius - barWidth - i * barWidth * 1.2
          if (leftX > 0) {
            const barHeight = level * maxBarHeight
            ctx.fillRect(leftX, centerY - barHeight / 2, barWidth, barHeight)
          }

          // Right side bars
          const rightX = centerX + radius + i * barWidth * 1.2
          if (rightX < canvas.width) {
            const barHeight = level * maxBarHeight
            ctx.fillRect(rightX, centerY - barHeight / 2, barWidth, barHeight)
          }
        })

        // Draw circular wave around the main circle
        ctx.strokeStyle = "#D6FF7F"
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let i = 0; i < 360; i += 5) {
          const angle = (i * Math.PI) / 180
          const levelIndex = Math.floor(i / 12) % audioLevels.length
          const waveRadius = radius + audioLevels[levelIndex] * radius * 0.3

          const x = centerX + Math.cos(angle) * waveRadius
          const y = centerY + Math.sin(angle) * waveRadius

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.stroke()
      }

      // Draw time indicator at the top (more subtle)
      if (isRecording) {
        const timeText = formatTime(Math.floor(recordingTime / 10))
        ctx.font = "16px sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillText(timeText, centerX, 20)

        // Add guidance text based on recording duration
        const seconds = Math.floor(recordingTime / 10)
        let guidanceText = ""

        if (seconds < 15) {
          guidanceText = "What's on your mind?"
        } else if (seconds < 30) {
          guidanceText = "Any important context?"
        } else if (seconds < 45) {
          guidanceText = "Why does this matter to you?"
        } else {
          guidanceText = "Elaborate as much as you like"
        }

        // Draw guidance text in the center
        ctx.font = "bold 18px sans-serif"
        ctx.fillStyle = "#FFFFFF"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Handle text wrapping for longer guidance text
        const maxWidth = radius * 1.5
        const words = guidanceText.split(" ")
        let line = ""
        const lines = []

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " "
          const metrics = ctx.measureText(testLine)

          if (metrics.width > maxWidth && i > 0) {
            lines.push(line)
            line = words[i] + " "
          } else {
            line = testLine
          }
        }
        lines.push(line)

        // Draw each line of text
        const lineHeight = 24
        const totalHeight = lines.length * lineHeight
        const startY = centerY - totalHeight / 2 + lineHeight / 2

        lines.forEach((line, index) => {
          ctx.fillText(line.trim(), centerX, startY + index * lineHeight)
        })
      }
    }

    const animate = () => {
      drawVisualizer()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRecording, audioLevels, recordingTime])

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      setShowBreathingGuide(true)
    } else {
      setIsRecording(true)
    }
  }

  const handleBreathingComplete = () => {
    setShowBreathingGuide(false)
  }

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 4px 6px rgba(0, 0, 0, 0.1)",
        "0 10px 15px rgba(214, 255, 127, 0.4)",
        "0 4px 6px rgba(0, 0, 0, 0.1)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 20px rgba(214, 255, 127, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  }

  // Mic icon animation variants
  const micIconVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [-5, 5, -5, 5, 0],
      transition: {
        delay: 3,
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop" as const,
        repeatDelay: 5,
      },
    },
  }

  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl">
          <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />

          {/* Control button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            {!isRecording ? (
              <motion.button
                onClick={toggleRecording}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-droplet-lime text-gray-800 font-medium"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                aria-label="Start recording"
              >
                <motion.div variants={micIconVariants} animate="animate">
                  <Mic size={18} />
                </motion.div>
                <span>Start Recording</span>
              </motion.button>
            ) : (
              <button
                onClick={toggleRecording}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-droplet-red transition-all duration-300 font-medium shadow-lg"
                aria-label="Stop recording"
              >
                <Square size={18} />
                <span>Stop Recording</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showBreathingGuide && <BreathingGuide isVisible={showBreathingGuide} onComplete={handleBreathingComplete} />}
    </>
  )
}
