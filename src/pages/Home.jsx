import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] font-sans text-gray-900 dark:text-gray-200 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      {/* Full Screen Hero Section */}
      <section className="relative bg-[#121212] text-white min-h-[calc(100dvh-72px)] flex flex-col justify-center py-12 border-b border-white/10 overflow-hidden">
        {/* Background Image Layer with responsive styling */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
          style={{ backgroundImage: "url('/herobg.png')" }}
        />

        <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
          <div className="max-w-5xl">
            <span className="text-gray-400 font-mono uppercase tracking-[0.2em] text-s sm:text-sm block mb-2">
              Intercity Highway Transit
            </span>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-4 leading-none">
              Deccan
              <span className="text-gray-500 font-light">Ride</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-bold mb-6 tracking-wide">
              Pune ↔ Mumbai Executive Service
            </p>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-3xl font-light">
              Book comfortable, reliable, and transparent cabs for your journey
              between Pune and Mumbai. Certified highway drivers, maintained
              fleet roster, and 24/7 dispatch.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/contact"
                className="bg-white text-black px-10 py-4 sm:px-12 sm:py-5 font-bold uppercase tracking-[0.2em] text-s hover:bg-gray-200 transition-all rounded-none shadow-lg active:scale-[0.99]"
              >
                Reserve Ride →
              </Link>
              <Link
                to="/about"
                className="border border-white/20 text-white px-10 py-4 sm:px-12 sm:py-5 font-bold uppercase tracking-[0.2em] text-s hover:bg-white hover:text-black transition-all rounded-none"
              >
                Our Standards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intercity Route Quick-Links */}
      <section className="bg-gray-50 dark:bg-[#181818] border-b border-gray-200 dark:border-white/10 py-16 sm:py-24 text-black dark:text-white transition-colors">
        <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="text-gray-500 font-mono text-s uppercase tracking-[0.2em] block mb-1">
                Direct Highway Corridors
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight">
                Popular Routes & Flat Rates
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Route 1: Pune to Mumbai */}
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/15 p-8 transition-all hover:border-black/30 dark:hover:border-white/40 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-white/10">
                    <span className="text-s font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      Primary Route
                    </span>
                    <span className="text-gray-500 text-s font-mono">
                      150 km • ~3.5 hrs
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-white mb-2">
                    Pune &rarr; Mumbai
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed mb-6">
                    Doorstep pickup across Pune & PCMC to any location in Mumbai
                    or CSMI Airport.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                  <Link
                    to="/contact"
                    className="block text-center bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 py-3.5 font-bold text-s uppercase tracking-[0.2em] transition-all rounded-none"
                  >
                    Book Pune to Mumbai →
                  </Link>
                </div>
              </div>

              {/* Route 2: Mumbai to Pune */}
              <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/15 p-8 transition-all hover:border-black/30 dark:hover:border-white/40 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-white/10">
                    <span className="text-s font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      Return Route
                    </span>
                    <span className="text-gray-500 text-s font-mono">
                      150 km • ~3.5 hrs
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-white mb-2">
                    Mumbai &rarr; Pune
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed mb-6">
                    Direct pickups from CSMI Airport Terminals & Mumbai city
                    limits to Pune doorstep.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                  <Link
                    to="/contact"
                    className="block text-center bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 py-3.5 font-bold text-s uppercase tracking-[0.2em] transition-all rounded-none"
                  >
                    Book Mumbai to Pune →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Call-to-Action Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#121212] transition-colors">
        <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              {/* Testimonials Column */}
              <div className="lg:col-span-8 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 p-8 sm:p-12 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-s font-mono text-gray-500 uppercase tracking-[0.2em] block mb-2">
                    Verified Feedback
                  </span>
                  <h2 className="text-3xl font-bold text-black dark:text-white mb-8 tracking-tight">
                    Traveler Experience
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border-l border-gray-300 dark:border-white/20">
                      <p className="text-gray-700 dark:text-gray-300 text-s leading-relaxed mb-4 font-light">
                        "Professional highway driver and spotless vehicle.
                        Excellent choice for airport runs."
                      </p>
                      <p className="font-mono text-s text-black dark:text-white font-bold">
                        — Rajesh P.
                      </p>
                    </div>

                    <div className="p-4 border-l border-gray-300 dark:border-white/20">
                      <p className="text-gray-700 dark:text-gray-300 text-s leading-relaxed mb-4 font-light">
                        "Punctual pickup in Pune and no hidden surge rates.
                        Completely reliable service."
                      </p>
                      <p className="font-mono text-s text-black dark:text-white font-bold">
                        — Priya M.
                      </p>
                    </div>

                    <div className="p-4 border-l border-gray-300 dark:border-white/20">
                      <p className="text-gray-700 dark:text-gray-300 text-s leading-relaxed mb-4 font-light">
                        "Consistently clean cars and courteous driving on the
                        expressway. Highly recommended."
                      </p>
                      <p className="font-mono text-s text-black dark:text-white font-bold">
                        — Amit K.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Callout Column */}
              <div className="lg:col-span-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 p-8 sm:p-12 flex flex-col justify-between items-start shadow-sm">
                <div>
                  <span className="text-s font-mono text-gray-500 uppercase tracking-[0.2em] block mb-2">
                    Ready to Travel?
                  </span>
                  <h2 className="text-3xl font-bold text-black dark:text-white mb-4 tracking-tight">
                    Reserve Your Cab
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-s leading-relaxed mb-8 font-light">
                    Guaranteed intercity departures, verified highway drivers,
                    and flat rate billing.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="w-full text-center bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 py-4 font-bold text-s uppercase tracking-[0.2em] transition-all rounded-none"
                >
                  Reserve Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
