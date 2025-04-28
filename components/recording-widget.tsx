"use client"

import { useState } from "react"
import { Mic, Square } from "lucide-react"
import BreathingGuide from "./breathing-guide"

export default function RecordingWidget() {
  const [isRecording, setIsRecording] = useState(false)
  const [showBreathingGuide, setShowBreathingGuide] = useState(false)

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

  return (
    <>
      <div className="relative w-full max-w-xl">
        <div
          className={`
            flex items-center gap-4 p-4 rounded-full 
            bg-white/20 backdrop-blur-sm
            border border-white/30 shadow-lg transition-all duration-300
          `}
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="Drop your idea..."
              className="w-full bg-transparent border-none text-white placeholder-white/70 focus:outline-none text-lg"
              disabled={isRecording}
            />
          </div>

          <button
            onClick={toggleRecording}
            className={`
              relative flex items-center justify-center px-6 py-2 rounded-full
              ${isRecording ? "bg-white/20" : "bg-droplet-lime"}
              ${isRecording ? "text-white" : "text-gray-800"} 
              transition-all duration-300 font-medium
            `}
            aria-label={isRecording ? "Stop recording" : "Record"}
          >
            {isRecording ? (
              <>
                <Square size={16} className="mr-2 animate-pulse" />
                <span>Stop</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </>
            ) : (
              <>
                <span>Record</span>
                <Mic size={16} className="ml-2" />
              </>
            )}

            {isRecording && <span className="absolute inset-0 rounded-full animate-ripple bg-white/20"></span>}
          </button>
        </div>
      </div>

      {showBreathingGuide && <BreathingGuide isVisible={showBreathingGuide} onComplete={handleBreathingComplete} />}
    </>
  )
}
