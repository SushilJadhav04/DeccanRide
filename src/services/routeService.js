import { supabase } from './supabase'

export async function getRouteBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) {
      console.error('Error fetching route:', error)
      return null
    }
    
    return data
  } catch (err) {
    console.error('Exception:', err)
    return null
  }
}

export async function getAllRoutes() {
  try {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
    
    if (error) {
      console.error('Error fetching routes:', error)
      return []
    }
    
    return data || []
  } catch (err) {
    console.error('Exception:', err)
    return []
  }
}

/**
 * Update route (admin only - requires authentication)
 */
export async function updateRoute(routeId, updates) {
  try {
    const { data, error } = await supabase
      .from('routes')
      .update(updates)
      .eq('id', routeId)
      .select()

    if (error) {
      console.error('Error updating route:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Exception:', err)
    return { success: false, error: err.message }
  }
}