export const PUNE_LOCATIONS = [
  { id: 'pune-1', name: 'Pune Railway Station', city: 'pune' },
  { id: 'pune-2', name: 'Shivajinagar', city: 'pune' },
  { id: 'pune-3', name: 'Swargate', city: 'pune' },
  { id: 'pune-4', name: 'Pune Airport', city: 'pune' },
  { id: 'pune-5', name: 'Kalyani Nagar', city: 'pune' },
  { id: 'pune-6', name: 'Viman Nagar', city: 'pune' },
  { id: 'pune-7', name: 'Koregaon Park', city: 'pune' },
  { id: 'pune-8', name: 'Kharadi', city: 'pune' },
  { id: 'pune-9', name: 'Hadapsar', city: 'pune' },
  { id: 'pune-10', name: 'Pimpri', city: 'pune' },
  { id: 'pune-11', name: 'Chinchwad', city: 'pune' },
  { id: 'pune-12', name: 'Wakad', city: 'pune' },
  { id: 'pune-13', name: 'Hinjewadi', city: 'pune' },
  { id: 'pune-14', name: 'Baner', city: 'pune' },
  { id: 'pune-15', name: 'Aundh', city: 'pune' },
  { id: 'pune-16', name: 'Kothrud', city: 'pune' },
  { id: 'pune-17', name: 'Magarpatta', city: 'pune' },
  { id: 'pune-18', name: 'Bavdhan', city: 'pune' },
  { id: 'pune-19', name: 'Pashan', city: 'pune' },
  { id: 'pune-20', name: 'Katraj', city: 'pune' },
  { id: 'pune-21', name: 'Camp', city: 'pune' },
  { id: 'pune-22', name: 'Deccan Gymkhana', city: 'pune' },
  { id: 'pune-23', name: 'FC Road', city: 'pune' },
  { id: 'pune-24', name: 'Dhadge', city: 'pune' },
  { id: 'pune-25', name: 'Wagholi', city: 'pune' },
]

export const MUMBAI_LOCATIONS = [
  { id: 'mumbai-1', name: 'Mumbai Airport (CSMI)', city: 'mumbai' },
  { id: 'mumbai-2', name: 'Andheri', city: 'mumbai' },
  { id: 'mumbai-3', name: 'Bandra', city: 'mumbai' },
  { id: 'mumbai-4', name: 'Powai', city: 'mumbai' },
  { id: 'mumbai-5', name: 'Mulund', city: 'mumbai' },
  { id: 'mumbai-6', name: 'Thane', city: 'mumbai' },
  { id: 'mumbai-7', name: 'Vashi', city: 'mumbai' },
  { id: 'mumbai-8', name: 'Navi Mumbai', city: 'mumbai' },
  { id: 'mumbai-9', name: 'Panvel', city: 'mumbai' },
  { id: 'mumbai-10', name: 'Dadgar', city: 'mumbai' },
  { id: 'mumbai-11', name: 'Borivali', city: 'mumbai' },
  { id: 'mumbai-12', name: 'Malad', city: 'mumbai' },
  { id: 'mumbai-13', name: 'Goregaon', city: 'mumbai' },
  { id: 'mumbai-14', name: 'Juhu', city: 'mumbai' },
  { id: 'mumbai-15', name: 'Worli', city: 'mumbai' },
  { id: 'mumbai-16', name: 'Lower Parel', city: 'mumbai' },
  { id: 'mumbai-17', name: 'Colaba', city: 'mumbai' },
  { id: 'mumbai-18', name: 'BKC (Bandra Kurla Complex)', city: 'mumbai' },
  { id: 'mumbai-19', name: 'Ghatkopar', city: 'mumbai' },
  { id: 'mumbai-20', name: 'Chembur', city: 'mumbai' },
  { id: 'mumbai-21', name: 'Kandivali', city: 'mumbai' },
  { id: 'mumbai-22', name: 'Santacruz', city: 'mumbai' },
  { id: 'mumbai-23', name: 'Khar Road', city: 'mumbai' },
  { id: 'mumbai-24', name: 'Churchgate', city: 'mumbai' },
  { id: 'mumbai-25', name: 'CST (Chhatrapati Shivaji Terminus)', city: 'mumbai' },
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