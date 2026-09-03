export const PUNE_LOCATIONS = [
  { id: 'pune-1', name: 'Pune Railway Station', city: 'pune' },
  { id: 'pune-2', name: 'Shivajinagar', city: 'pune' },
  { id: 'pune-3', name: 'Swargate', city: 'pune' },
  { id: 'pune-4', name: 'Pune Airport', city: 'pune' },
  { id: 'pune-5', name: 'Viman Nagar', city: 'pune' },
  { id: 'pune-6', name: 'Kharadi', city: 'pune' },
  { id: 'pune-7', name: 'Wakad', city: 'pune' },
  { id: 'pune-8', name: 'Hinjewadi', city: 'pune' },
  { id: 'pune-9', name: 'Kothrud', city: 'pune' },
  { id: 'pune-10', name: 'Hadapsar', city: 'pune' },
]

export const MUMBAI_LOCATIONS = [
  { id: 'mumbai-1', name: 'Mumbai Airport (CSMI)', city: 'mumbai' },
  { id: 'mumbai-2', name: 'Andheri', city: 'mumbai' },
  { id: 'mumbai-3', name: 'Bandra', city: 'mumbai' },
  { id: 'mumbai-4', name: 'Powai', city: 'mumbai' },
  { id: 'mumbai-5', name: 'Thane', city: 'mumbai' },
  { id: 'mumbai-6', name: 'Vashi', city: 'mumbai' },
  { id: 'mumbai-7', name: 'Navi Mumbai', city: 'mumbai' },
  { id: 'mumbai-8', name: 'Panvel', city: 'mumbai' },
  { id: 'mumbai-9', name: 'Borivali', city: 'mumbai' },
  { id: 'mumbai-10', name: 'BKC (Bandra Kurla Complex)', city: 'mumbai' },
]

export const ALL_LOCATIONS = [...PUNE_LOCATIONS, ...MUMBAI_LOCATIONS]

/**
 * Search locations by query string
 * Simple substring matching (case-insensitive)
 * @param {string} query - User input
 * @param {string} city - Filter by city ('pune', 'mumbai', or null for all)
 * @returns {array} Matching locations
 */
export function searchLocations(query, city = null) {
  if (!query || query.length < 1) return []

  const q = query.toLowerCase()
  
  return ALL_LOCATIONS
    .filter(loc => {
      // Filter by city if specified
      if (city && loc.city !== city) return false
      
      // Substring match on location name
      return loc.name.toLowerCase().includes(q)
    })
    .slice(0, 8) // Max 8 suggestions
}

/**
 * Validate if a location name exists (case-insensitive)
 * @param {string} name - Location name to validate
 * @returns {boolean} True if location exists
 */
export function isValidLocation(name) {
  if (!name) return false
  return ALL_LOCATIONS.some(loc => 
    loc.name.toLowerCase() === name.toLowerCase()
  )
}

/**
 * Get location object by name
 * @param {string} name - Location name
 * @returns {object|null} Location object or null
 */
export function getLocationByName(name) {
  if (!name) return null
  return ALL_LOCATIONS.find(loc => 
    loc.name.toLowerCase() === name.toLowerCase()
  )
}