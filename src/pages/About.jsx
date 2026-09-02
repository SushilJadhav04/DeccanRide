import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      
      {/* Editorial Hero */}
      <section className="relative pt-24 sm:pt-36 pb-20 border-b border-gray-200 dark:border-white/5">
        <div className="w-full px-8 sm:px-16 md:px-20 lg:px-24">
          <div className="max-w-4xl">
            <span className="text-gray-500 dark:text-gray-400 font-mono uppercase tracking-[0.2em] text-s sm:text-sm">
              Established 2026
            </span>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-black dark:text-white mt-3 mb-6 leading-none">
              Redefining Intercity Travel.
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 font-light leading-relaxed max-w-3xl">
              DeccanRide was born out of a simple observation: traveling between Pune and Mumbai shouldn't be stressful, unpredictable, or overpriced. We built a service focused on reliability, dignity, and true comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Storytelling Timeline Flow */}
      <section className="py-24 relative">
        <div className="w-full px-8 sm:px-16 md:px-20 lg:px-24">
          <div className="max-w-5xl mx-auto space-y-24">

            {/* Mission & Vision Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h2 className="text-s font-bold uppercase tracking-[0.2em] text-gray-500 sticky top-28">
                  01 / Purpose & Drive
                </h2>
              </div>
              <div className="md:col-span-8 space-y-8 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                <p>
                  <strong className="text-black dark:text-white font-semibold">Our Mission</strong> is simple: connect cities with absolute peace of mind. We believe every journey should feel effortless—from the instant you book to the second you step out at your destination.
                </p>
                <p>
                  <strong className="text-black dark:text-white font-semibold">Our Vision</strong> extends beyond simple cab booking. We are building Western India's most trusted intercity corridor by combining modern fleet management with genuine hospitality.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 dark:bg-white/5" />

            {/* The Backstory */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h2 className="text-s font-bold uppercase tracking-[0.2em] text-gray-500 sticky top-28">
                  02 / The Origin
                </h2>
              </div>
              <div className="md:col-span-8 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed font-light text-base sm:text-lg">
                <h3 className="text-3xl font-bold text-black dark:text-white tracking-tight">
                  Why We Started
                </h3>
                <p>
                  The Pune-Mumbai Expressway sees tens of thousands of travelers every single day. Yet for years, commuters faced a broken choice: compromise on safety with shared taxis, or overpay for unmaintained private vehicles.
                </p>
                <p>
                  We launched DeccanRide to fill that exact gap—creating a clean, transparent, and premium highway transit service tailored to professionals, families, and solo travelers alike.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 dark:bg-white/5" />

            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h2 className="text-s font-bold uppercase tracking-[0.2em] text-gray-500 sticky top-28">
                  03 / Core Standards
                </h2>
              </div>
              <div className="md:col-span-8">
                <div className="divide-y divide-gray-200 dark:divide-white/5">
                  <div className="py-6 first:pt-0">
                    <h4 className="text-xl font-bold text-black dark:text-white mb-2">Absolute Reliability</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-base font-light">Punctual pickups guaranteed. When you schedule a ride, your cab is there—on time, every time.</p>
                  </div>
                  <div className="py-6">
                    <h4 className="text-xl font-bold text-black dark:text-white mb-2">Uncompromised Safety</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-base font-light">Comprehensively insured, regularly inspected vehicles driven by safety-certified highway specialists.</p>
                  </div>
                  <div className="py-6">
                    <h4 className="text-xl font-bold text-black dark:text-white mb-2">Transparent Flat Pricing</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-base font-light">No dynamic surges, hidden toll fees, or driver negotiation surprises at the end of your trip.</p>
                  </div>
                  <div className="py-6">
                    <h4 className="text-xl font-bold text-black dark:text-white mb-2">Human-First Support</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-base font-light">Real team members available 24/7 to coordinate your trip details and assist with special requests.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Minimalist Metrics Strip */}
      <section className="bg-gray-50 dark:bg-[#181818] py-20 border-t border-b border-gray-200 dark:border-white/5 transition-colors">
        <div className="w-full px-8 sm:px-16 md:px-20 lg:px-24">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            <div>
              <span className="block text-5xl sm:text-6xl font-black text-black dark:text-white mb-2">5,000+</span>
              <span className="text-s sm:text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">Journeys Completed</span>
            </div>
            <div>
              <span className="block text-5xl sm:text-6xl font-black text-black dark:text-white mb-2">50+</span>
              <span className="text-s sm:text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">Premium Vehicles</span>
            </div>
            <div>
              <span className="block text-5xl sm:text-6xl font-black text-black dark:text-white mb-2">100k+</span>
              <span className="text-s sm:text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">Safe Kilometers</span>
            </div>
            <div>
              <span className="block text-5xl sm:text-6xl font-black text-black dark:text-white mb-2">4.8 / 5</span>
              <span className="text-s sm:text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-medium">Customer Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seamless Integrated Call to Action */}
      <section className="py-28 text-center bg-white dark:bg-[#121212] transition-colors">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white mb-6 tracking-tight">
            Ready for a smoother trip?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-light mb-10">
            Book your cab between Pune and Mumbai in under two minutes.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-black text-white dark:bg-white dark:text-black px-12 py-5 rounded-none font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-s uppercase tracking-[0.2em] shadow-xl"
          >
            Book Your Journey Today →
          </Link>
        </div>
      </section>

    </div>
  )
}