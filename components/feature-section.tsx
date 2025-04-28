import { Sparkles, Zap, RefreshCw, Award } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-droplet-red" />,
      title: "AI-Powered Transformation",
      description: "Our advanced AI turns your voice notes into polished, professional content ready for publication.",
    },
    {
      icon: <Zap className="h-8 w-8 text-droplet-red" />,
      title: "Lightning Fast",
      description: "Get your content back in minutes, not days. Focus on ideas, not on writing and editing.",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-droplet-red" />,
      title: "Iterative Refinement",
      description: "Provide feedback and watch as your content evolves to match your exact vision and voice.",
    },
    {
      icon: <Award className="h-8 w-8 text-droplet-red" />,
      title: "Premium Quality",
      description: "Content that stands out with research-backed insights and professional polish.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-droplet-red mb-4">Turn Voice into Value</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Droplet transforms your spoken ideas into premium long-form content that captivates your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-droplet-peach/10 to-droplet-red/5 border border-droplet-lime/20 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-droplet-lime/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
