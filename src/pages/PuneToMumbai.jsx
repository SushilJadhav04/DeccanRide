import { useEffect, useState } from 'react'
import { getRouteBySlug } from '../services/routeService'
import { Link } from 'react-router-dom'

export default function PuneToMumbai() {
  const [route, setRoute] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await getRouteBySlug('pune-to-mumbai')
      setRoute(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-500 flex items-center justify-center font-mono text-s uppercase tracking-widest transition-colors duration-200">
        Loading Route Specifications...
      </div>
    )
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-500 flex items-center justify-center font-mono text-s uppercase tracking-widest transition-colors duration-200">
        Route specification not found.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      
      {/* Header Banner */}
      <section className="pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-12 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <span className="text-gray-500 dark:text-gray-400 font-mono uppercase tracking-[0.2em] text-[10px] sm:text-s">
              Highway Route Corridor
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-black dark:text-white tracking-tight mt-2 mb-3 sm:mb-4">
              {route.origin} &rarr; {route.destination}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Express intercity transit service. Doorstep pickup across Pune & PCMC directly to any location in Mumbai or CSMI Airport.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-16 space-y-16">
        
        {/* Core Specs & Pricing Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Route Specifications */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-[11px] sm:text-s uppercase font-bold text-gray-500 tracking-[0.2em] border-b border-gray-200 dark:border-white/10 pb-3">
              01 / Route Specifications
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-gray-200 dark:border-white/10 font-mono">
              <div>
                <span className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1">Distance</span>
                <span className="text-2xl font-bold text-black dark:text-white">{route.distance} km</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1">Travel Time</span>
                <span className="text-2xl font-bold text-black dark:text-white">{route.travel_time}</span>
              </div>
              <div>
                <span className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1">Availability</span>
                <span className="text-2xl font-bold text-black dark:text-white">24 / 7</span>
              </div>
            </div>

            {route.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
                {route.description}
              </p>
            )}

            <div className="space-y-4 pt-2">
              <p className="text-s text-gray-500 font-mono uppercase tracking-widest">
                Included Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-s font-mono text-gray-700 dark:text-gray-300">
                <span className="p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 block">
                  &bull; Doorstep pickup across Pune / PCMC
                </span>
                <span className="p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 block">
                  &bull; Expressway toll charges inclusive
                </span>
                <span className="p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 block">
                  &bull; Professional highway driver
                </span>
                <span className="p-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 block">
                  &bull; Full air conditioning
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-[11px] sm:text-s uppercase font-bold text-gray-500 tracking-[0.2em] border-b border-gray-200 dark:border-white/10 pb-3">
              02 / Flat Rate Breakdown
            </h2>

            {/* One Way Card */}
            <div className="bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 p-6 sm:p-8 flex items-center justify-between gap-4">
              <div>
                <span className="text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
                  Single Journey
                </span>
                <h3 className="text-xl font-bold text-black dark:text-white">One Way</h3>
                <p className="text-gray-500 dark:text-gray-400 text-s mt-1">Pune to Mumbai direct</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-mono font-bold text-black dark:text-white block">
                  ₹{route.one_way_price.toFixed(0)}
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase">Flat Rate</span>
              </div>
            </div>

            {/* Round Trip Card */}
            <div className="bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/15 p-6 sm:p-8 flex items-center justify-between gap-4">
              <div>
                <span className="text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
                  Return Journey
                </span>
                <h3 className="text-xl font-bold text-black dark:text-white">Round Trip</h3>
                <p className="text-gray-500 dark:text-gray-400 text-s mt-1">Pune &rarr; Mumbai &rarr; Pune</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-mono font-bold text-black dark:text-white block">
                  ₹{route.round_trip_price.toFixed(0)}
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase">Flat Rate</span>
              </div>
            </div>

            {/* Direct CTA Button */}
            <Link 
              to="/contact" 
              className="w-full text-center block bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 py-4 font-bold text-s uppercase tracking-[0.2em] transition-all rounded-none shadow-lg active:scale-[0.99] mt-6"
            >
              Book Pune to Mumbai Cab &rarr;
            </Link>
          </div>

        </div>

        {/* Key Highlights */}
        <div className="pt-12 border-t border-gray-200 dark:border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10">
              <h3 className="text-base font-bold text-black dark:text-white mb-2">Professional Drivers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-s font-light leading-relaxed">
                Experienced, safety-certified highway drivers with excellent track records.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10">
              <h3 className="text-base font-bold text-black dark:text-white mb-2">Clean Vehicles</h3>
              <p className="text-gray-600 dark:text-gray-400 text-s font-light leading-relaxed">
                Well-maintained, hygienically cleaned cabs with comfortable seating and AC.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10">
              <h3 className="text-base font-bold text-black dark:text-white mb-2">24/7 Availability</h3>
              <p className="text-gray-600 dark:text-gray-400 text-s font-light leading-relaxed">
                Available around the clock for early morning, afternoon, or late-night departures.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-12 border-t border-gray-200 dark:border-white/10">
          <h2 className="text-[11px] sm:text-s uppercase font-bold text-gray-500 tracking-[0.2em] mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="border-l border-gray-300 dark:border-white/20 pl-4">
              <h3 className="text-sm font-bold text-black dark:text-white mb-2">How long is the journey?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-s font-light leading-relaxed">
                The journey typically takes {route.travel_time}, depending on Expressway traffic conditions.
              </p>
            </div>
            <div className="border-l border-gray-300 dark:border-white/20 pl-4">
              <h3 className="text-sm font-bold text-black dark:text-white mb-2">What is included in the fare?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-s font-light leading-relaxed">
                The fare includes the vehicle, driver allowance, Expressway tolls, and basic insurance.
              </p>
            </div>
            <div className="border-l border-gray-300 dark:border-white/20 pl-4">
              <h3 className="text-sm font-bold text-black dark:text-white mb-2">Can I cancel my booking?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-s font-light leading-relaxed">
                Free cancellations are available when requested at least 24 hours prior to scheduled departure.
              </p>
            </div>
            <div className="border-l border-gray-300 dark:border-white/20 pl-4">
              <h3 className="text-sm font-bold text-black dark:text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-s font-light leading-relaxed">
                We accept cash, UPI (Google Pay, PhonePe, Paytm), and major credit or debit cards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}