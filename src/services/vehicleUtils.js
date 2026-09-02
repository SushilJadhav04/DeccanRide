/**
 * Get vehicle type label with icon/color info
 */
export function getVehicleTypeInfo(vehicleType) {
  const types = {
    'Sedan': {
      label: 'Sedan',
      description: '4-seater comfort',
      category: 'Individual/Couple'
    },
    'MUV': {
      label: 'MUV (Multi-purpose)',
      description: '6-8 seater family vehicle',
      category: 'Family/Group'
    },
    'Group Transport': {
      label: 'Group Transport',
      description: '12+ seater large group',
      category: 'Large Groups'
    }
  }
  return types[vehicleType] || { label: vehicleType, description: '', category: '' }
}

/**
 * Get fuel type info with efficiency details
 */
export function getFuelTypeInfo(fuelType) {
  const fuels = {
    'CNG': {
      label: 'CNG',
      emoji: '♻️',
      efficiency: 'Best',
      speed: 'Moderate',
      cost: 'Lowest',
      note: 'Most fuel-efficient, eco-friendly'
    },
    'Petrol': {
      label: 'Petrol',
      emoji: '⛽',
      efficiency: 'Good',
      speed: 'High',
      cost: 'Medium',
      note: 'Good performance, widely available'
    },
    'Diesel': {
      label: 'Diesel',
      emoji: '⛽',
      efficiency: 'Very Good',
      speed: 'Good',
      cost: 'Moderate',
      note: 'Excellent mileage for long distances'
    }
  }
  return fuels[fuelType] || { label: fuelType, emoji: '⚙️', efficiency: 'Unknown' }
}

/**
 * Get transmission info
 */
export function getTransmissionInfo(transmission) {
  const types = {
    'Manual': {
      label: 'Manual',
      description: 'Traditional manual shift',
      costBenefit: 'Budget-friendly'
    },
    'Automatic': {
      label: 'Automatic',
      description: 'Smooth automatic transmission',
      costBenefit: 'Premium, comfort-focused'
    }
  }
  return types[transmission] || { label: transmission, description: '' }
}

/**
 * Categorize vehicles for display
 */
export function categorizeVehicles(vehicles) {
  return {
    sedans: vehicles.filter(v => v.vehicle_type === 'Sedan'),
    muvs: vehicles.filter(v => v.vehicle_type === 'MUV'),
    groups: vehicles.filter(v => v.vehicle_type === 'Group Transport')
  }
}

/**
 * Get price comparison info
 */
export function getPricingComparison(vehicles) {
  if (!vehicles.length) return null

  const prices = vehicles.map(v => v.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    average: Math.round(prices.reduce((a, b) => a + b) / prices.length)
  }
}

/**
 * Format vehicle display name for UI
 */
export function getVehicleDisplayName(vehicle) {
  return `${vehicle.name} • ${vehicle.seating_capacity} seats`
}

/**
 * Get suitable use cases for vehicle
 */
export function getUseCases(vehicle) {
  if (!vehicle.suitable_for) return []
  return vehicle.suitable_for
    .split(',')
    .map(use => use.trim())
    .filter(Boolean)
}