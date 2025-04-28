import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold text-droplet-lime">Droplet</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Turn your voice notes into premium long-form content. The shortest path between what's in your head and
              the world that needs it.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-droplet-lime">Product</h3>
            <ul className="space-y-2">
              {["Features", "How It Works", "Pricing", "FAQ"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-droplet-lime">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Droplet. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            {["Terms", "Privacy", "Cookies"].map((item, i) => (
              <Link key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
