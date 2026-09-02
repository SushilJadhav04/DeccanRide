import { allServiceLocations } from '../data/serviceLocations'

export function searchLocations(query) {
  if (!query || query.length < 2) return []
  
  const q = query.toLowerCase()
  return allServiceLocations
    .filter(loc => 
      loc.name.toLowerCase().includes(q) ||
      loc.alias.some(a => a.toLowerCase().includes(q))
    )
    .map(loc => ({
      id: loc.id,
      label: loc.name,
      value: loc.name
    }))
}