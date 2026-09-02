import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVehicles } from '../services/vehicleService'

export default function Fleet() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')
  const [filterFuel, setFilterFuel] = useState('all')

  useEffect(() => {
    async function fetchData() {
      const data = await getVehicles()
      setVehicles(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filteredVehicles = vehicles.filter(v => {
    if (filterType !== 'all' && v.vehicle_type !== filterType) return false
    if (filterFuel !== 'all' && v.fuel_type !== filterFuel) return false
    return true
  })

  const vehicleTypes = ['all', ...new Set(vehicles.map(v => v.vehicle_type))]
  const fuelTypes = ['all', ...new Set(vehicles.map(v => v.fuel_type))]

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-500 dark:text-gray-400 flex items-center justify-center font-sans transition-colors duration-200">
        <p className="animate-pulse tracking-wide">Loading available fleet...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200 font-sans relative overflow-hidden transition-colors duration-200">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-24 relative z-10">
        
        {/* Header Title Block */}
        <div className="max-w-3xl mb-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">
            Highway Transit Options
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white tracking-tight mb-4">
            Our Fleet & Classes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Select your preferred cab type for the Pune ↔ Mumbai route. All options include professional highway drivers, full AC, and transparent flat rates.
          </p>
        </div>

        {/* Minimal Monochrome Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-12 pb-6 border-b border-gray-200 dark:border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-s uppercase tracking-wider text-gray-500 font-bold mr-2">Type:</span>
            {vehicleTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-full text-s font-semibold tracking-wide transition-all ${
                  filterType === type
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {type === 'all' ? 'All Vehicles' : type}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-0 sm:ml-auto mt-2 sm:mt-0">
            <span className="text-s uppercase tracking-wider text-gray-500 font-bold mr-2">Fuel:</span>
            {fuelTypes.map(fuel => (
              <button
                key={fuel}
                onClick={() => setFilterFuel(fuel)}
                className={`px-4 py-2 rounded-full text-s font-semibold tracking-wide transition-all ${
                  filterFuel === fuel
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {fuel === 'all' ? 'All Fuel Types' : fuel}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className="group bg-gray-50 hover:bg-gray-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-gray-200 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-s font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-1">
                      {vehicle.vehicle_type || 'Standard Class'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white group-hover:text-black dark:group-hover:text-gray-100 transition-colors">
                      {vehicle.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-black dark:text-white block">
                      ₹{vehicle.price.toFixed(0)}
                    </span>
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">
                      One Way / Flat
                    </span>
                  </div>
                </div>

                {vehicle.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed mb-6">
                    {vehicle.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-gray-200/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-s px-3.5 py-1.5 rounded-lg border border-gray-300/50 dark:border-white/5">
                    👥 {vehicle.seating_capacity} Seats
                  </span>
                  <span className="bg-gray-200/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-s px-3.5 py-1.5 rounded-lg border border-gray-300/50 dark:border-white/5">
                    ⛽ {vehicle.fuel_type}
                  </span>
                  <span className="bg-gray-200/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-s px-3.5 py-1.5 rounded-lg border border-gray-300/50 dark:border-white/5">
                    ⚙️ {vehicle.transmission}
                  </span>
                  {vehicle.luggage_capacity && (
                    <span className="bg-gray-200/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-s px-3.5 py-1.5 rounded-lg border border-gray-300/50 dark:border-white/5">
                      🧳 {vehicle.luggage_capacity}
                    </span>
                  )}
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full text-center bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.99]"
              >
                Select {vehicle.name} →
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-base mb-4">No vehicles found matching your selected filters.</p>
            <button
              onClick={() => { setFilterType('all'); setFilterFuel('all'); }}
              className="text-black dark:text-white text-s uppercase font-bold tracking-widest underline hover:opacity-80"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}