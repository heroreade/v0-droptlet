"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-droplet-gradient-from via-droplet-gradient-via to-droplet-gradient-to bg-opacity-90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-white">Droplet</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="#features" className="text-white/90 hover:text-white px-3 py-2">
              Features
            </Link>
            <Link href="#how-it-works" className="text-white/90 hover:text-white px-3 py-2">
              How It Works
            </Link>
            <Link href="#pricing" className="text-white/90 hover:text-white px-3 py-2">
              Pricing
            </Link>
            <Button className="ml-4 bg-droplet-lime hover:bg-droplet-lime/90 text-gray-800">Sign Up</Button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/80 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-droplet-gradient-from via-droplet-gradient-via to-droplet-gradient-to">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="block px-3 py-2 text-white/90 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 text-white/90 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 text-white/90 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-droplet-lime hover:bg-droplet-lime/90 text-gray-800">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
