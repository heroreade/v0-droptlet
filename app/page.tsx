"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import FeatureSection from "@/components/feature-section"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import IdeasSection from "@/components/ideas-section"
import FloatingBubbles from "@/components/floating-bubbles"
import HeroRecordingWidget from "@/components/hero-recording-widget"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 min-h-[90vh] bg-gradient-to-br from-droplet-gradient-from via-droplet-gradient-via to-droplet-gradient-to overflow-hidden">
        <FloatingBubbles />

        <div className="w-full lg:w-1/2 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-sm">
            Drop your idea here.
            <br />
            We'll handle the rest.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl text-white/90 drop-shadow-sm">
            The shortest path between what's in your head and the world that needs it.
          </p>

          <div className="hidden lg:block">
            <div className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button className="bg-droplet-lime hover:bg-droplet-lime/90 text-gray-800 text-lg py-6 px-8 rounded-full shadow-lg">
                  Get an Invite
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <HeroRecordingWidget />
          </div>
        </div>

        <div className="lg:hidden mt-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button className="w-full bg-droplet-lime hover:bg-droplet-lime/90 text-gray-800 text-lg py-6 px-8 rounded-full shadow-lg">
              Get an Invite
            </Button>
          </motion.div>
        </div>
      </section>

      <IdeasSection />

      <FeatureSection />
      <HowItWorks />
      <Footer />
    </div>
  )
}
