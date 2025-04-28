"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BreathingGuideProps {
  isVisible: boolean
  onComplete?: () => void
}

export default function BreathingGuide({ isVisible, onComplete }: BreathingGuideProps) {
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [counter, setCounter] = useState(4)
  const [totalTimer, setTotalTimer] = useState(120) // 2 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false)

  // Format the total timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  useEffect(() => {
    if (!isVisible) return

    // Breathing phase timer
    const breathInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          // Change breathing phase
          setBreathPhase((currentPhase) => {
            switch (currentPhase) {
              case "inhale":
                return "hold"
              case "hold":
                return "exhale"
              case "exhale":
                return "rest"
              case "rest":
                return "inhale"
              default:
                return "inhale"
            }
          })

          // Set new counter based on phase
          switch (breathPhase) {
            case "inhale":
              return 7 // Hold for 7 counts
            case "hold":
              return 8 // Exhale for 8 counts
            case "exhale":
              return 4 // Rest for 4 counts
            case "rest":
              return 4 // Inhale for 4 counts
            default:
              return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    // Total 2-minute countdown timer
    const totalTimerInterval = setInterval(() => {
      setTotalTimer((prev) => {
        if (prev <= 1) {
          clearInterval(totalTimerInterval)
          setIsCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(breathInterval)
      clearInterval(totalTimerInterval)
    }
  }, [isVisible, breathPhase])

  if (!isVisible) return null

  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      transition: { duration: 7, ease: "linear" },
    },
    exhale: {
      scale: 1,
      transition: { duration: 8, ease: "easeInOut" },
    },
    rest: {
      scale: 1,
      transition: { duration: 4, ease: "linear" },
    },
  }

  const getInstructions = () => {
    switch (breathPhase) {
      case "inhale":
        return "Breathe in..."
      case "hold":
        return "Hold..."
      case "exhale":
        return "Breathe out..."
      case "rest":
        return "Rest..."
      default:
        return ""
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center">
        {isCompleted ? (
          <div className="py-8">
            <h3 className="text-2xl font-bold text-white mb-6">Check your inbox for some great thinking</h3>
            <p className="text-white/80 mb-8">If it's not there yet, check your junk folder</p>
            <button
              onClick={onComplete}
              className="bg-droplet-lime hover:bg-droplet-lime/90 text-gray-800 px-6 py-2 rounded-full font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-6">
              Your output should hit your inbox in about two minutes, so how about a two-minute breathing exercise
              because you work hard
            </h3>

            <div className="text-white text-lg mb-4">
              Time remaining: <span className="font-bold">{formatTime(totalTimer)}</span>
            </div>

            <div className="relative flex items-center justify-center my-10">
              {/* Outer static circle */}
              <div className="absolute w-64 h-64 rounded-full border-2 border-droplet-lime/30"></div>

              {/* Animated breathing circle */}
              <motion.div
                className="w-40 h-40 rounded-full bg-gradient-to-br from-droplet-gradient-from via-droplet-gradient-via to-droplet-gradient-to"
                variants={circleVariants}
                animate={breathPhase}
              />

              {/* Instruction text */}
              <div className="absolute text-white text-xl font-medium">{getInstructions()}</div>
            </div>

            <div className="text-white text-lg mb-6">
              <span className="font-medium">{counter}</span>
            </div>

            <button
              onClick={onComplete}
              className="bg-droplet-lime hover:bg-droplet-lime/90 text-gray-800 px-6 py-2 rounded-full font-medium"
            >
              Skip
            </button>
          </>
        )}
      </div>
    </div>
  )
}
