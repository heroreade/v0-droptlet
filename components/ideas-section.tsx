import BouncingIdeas from "./prompting-animation"

export default function IdeasSection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-droplet-gradient-from via-droplet-gradient-via to-droplet-gradient-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white drop-shadow-sm">Interactive Idea Space</h2>
          <p className="text-white/80 mt-2">Watch as your ideas bounce around and transform into something amazing</p>
        </div>
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-white/20 shadow-xl">
          <BouncingIdeas />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 left-1/4 w-20 h-20 rounded-full bg-white/20 blur-xl"></div>
      <div className="absolute top-20 right-1/4 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
    </section>
  )
}
