import { supabase } from './supabase'

/**
 * Get all vehicles with all fields
 */
export async function getVehicles() {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('status', 'active')
      .order('price', { ascending: true })
    
    if (error) {
      console.error('Error fetching vehicles:', error)
      return []
    }
    
    return data || []
  } catch (err) {
    console.error('Exception:', err)
    return []
  }
}

/**
 * Get single vehicle by ID
 */
export async function getVehicleById(vehicleId) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .single()
    
    if (error) {
      console.error('Error fetching vehicle:', error)
      return null
    }
    
    return data
  } catch (err) {
    console.error('Exception:', err)
    return null
  }
}

/**
 * Get vehicles filtered by type or fuel
 */
export async function getVehiclesByFilter(filters = {}) {
  try {
    let query = supabase
      .from('vehicles')
      .select('*')
      .eq('status', 'active')

    if (filters.vehicleType) {
      query = query.eq('vehicle_type', filters.vehicleType)
    }

    if (filters.fuelType) {
      query = query.eq('fuel_type', filters.fuelType)
    }

    if (filters.transmission) {
      query = query.eq('transmission', filters.transmission)
    }

    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }

    if (filters.minSeats) {
      query = query.gte('seating_capacity', filters.minSeats)
    }

    const { data, error } = await query.order('price', { ascending: true })

    if (error) {
      console.error('Error fetching filtered vehicles:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Exception:', err)
    return []
  }
}

/**
 * Update vehicle (admin only - requires authentication)
 */
export async function updateVehicle(vehicleId, updates) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .update(updates)
      .eq('id', vehicleId)
      .select()

    if (error) {
      console.error('Error updating vehicle:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Exception:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Create vehicle (admin only - requires authentication)
 */
export async function createVehicle(vehicleData) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicleData])
      .select()

    if (error) {
      console.error('Error creating vehicle:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Exception:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Delete vehicle (admin only - requires authentication)
 */
export async function deleteVehicle(vehicleId) {
  try {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', vehicleId)

    if (error) {
      console.error('Error deleting vehicle:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Exception:', err)
    return { success: false, error: err.message }
  }
}