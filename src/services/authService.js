import { supabase } from './supabase'

/**
 * Admin login with email and password
 * Returns user session if successful
 */
export async function adminLogin(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error.message)
      return { 
        success: false, 
        error: error.message 
      }
    }

    console.log('Admin logged in successfully')
    return { 
      success: true, 
      user: data.user,
      session: data.session 
    }
  } catch (err) {
    console.error('Login exception:', err.message)
    return { 
      success: false, 
      error: 'An unexpected error occurred' 
    }
  }
}

/**
 * Admin logout
 */
export async function adminLogout() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Logout error:', error.message)
      return { success: false, error: error.message }
    }

    console.log('Admin logged out successfully')
    return { success: true }
  } catch (err) {
    console.error('Logout exception:', err.message)
    return { success: false, error: 'Logout failed' }
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Get user error:', error.message)
      return null
    }

    return data.user
  } catch (err) {
    console.error('Get user exception:', err.message)
    return null
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Get current session
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Get session error:', error.message)
      return null
    }

    return data.session
  } catch (err) {
    console.error('Get session exception:', err.message)
    return null
  }
}

/**
 * Listen to auth state changes
 * Useful for keeping UI in sync with auth state
 */
export function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })

  // Return unsubscribe function
  return () => data?.subscription?.unsubscribe()
}