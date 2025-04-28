export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Record Your Ideas",
      description: "Speak your thoughts naturally into the Droplet app. No need to worry about structure or polish.",
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Our AI analyzes your recording, researches supporting information, and structures your content.",
    },
    {
      number: "03",
      title: "Review & Refine",
      description: "Receive your draft and provide feedback. Our system learns your preferences over time.",
    },
    {
      number: "04",
      title: "Publish & Share",
      description: "Export your polished content to your preferred platform or share directly from Droplet.",
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-droplet-gradient-from via-droplet-gradient-via to-droplet-gradient-to"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-droplet-lime mb-4">How Droplet Works</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A simple four-step process that turns your spoken ideas into premium content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20"
            >
              <div className="text-4xl font-bold text-droplet-lime mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-droplet-lime mb-4">
                For verified leaders and experienced professionals
              </h3>
              <p className="text-white/90 mb-6">
                Droplet is an invite-only platform for those whose insights are legendary, even if they're not yet
                famous. Think MasterClass for minds that move business.
              </p>
              <ul className="space-y-3">
                {[
                  "Not a content tool for everyone",
                  "A craft tool for the quietly brilliant",
                  "Your raw voice note becomes a refined body of thought",
                  "Challenged by bots, grounded in research",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/90">
                    <span className="w-2 h-2 bg-droplet-lime rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-droplet-lime rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-droplet-red rounded-full border-4 border-droplet-lime/30 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">D</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
