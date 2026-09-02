import { supabase } from './supabase'

export async function submitEnquiry(enquiryData) {
  try {
    const { error } = await supabase
      .from('enquiries')
      .insert([
        {
          name: enquiryData.name,
          phone: enquiryData.phone,
          email: enquiryData.email,
          pickup: enquiryData.pickup,
          drop: enquiryData.drop,
          travel_date: enquiryData.travel_date,
          travel_time: enquiryData.travel_time,
          trip_type: enquiryData.trip_type,
          vehicle_id: enquiryData.vehicle_id,
          passengers: enquiryData.passengers,
          message: enquiryData.message || null,
          status: 'new',
        }
      ])

    if (error) {
      console.error('Error submitting enquiry:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Exception:', err)
    return { success: false, error: err.message }
  }
}

export async function getEnquiries() {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching enquiries:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Exception:', err)
    return []
  }
}