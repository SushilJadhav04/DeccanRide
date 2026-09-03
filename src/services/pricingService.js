import { supabase } from './supabase'

const WAITING_CHARGE = 500

/**
 * Calculate fare based on vehicle and pickup/drop locations.
 */
export async function calculateFare({
  vehicleId,
  pickup,
  drop,
  tripType,
}) {
  try {
    if (!vehicleId || !pickup || !drop) {
      return {
        success: false,
        error: 'Vehicle, pickup and drop locations are required.',
      }
    }

    // Get selected vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('id, name, price')
      .eq('id', vehicleId)
      .eq('status', 'active')
      .single()

    if (vehicleError) {
      console.error('Error fetching vehicle price:', vehicleError)
      return {
        success: false,
        error: 'Unable to fetch vehicle pricing.',
      }
    }

    // Get pickup and drop location charges
    const { data: locations, error: locationError } = await supabase
      .from('location_pricing')
      .select('location, city, extra_charge')
      .in('location', [pickup, drop])

    if (locationError) {
      console.error('Error fetching location pricing:', locationError)
      return {
        success: false,
        error: 'Unable to fetch location pricing.',
      }
    }

    const pickupLocation = locations.find(
      (location) =>
        location.location.toLowerCase() === pickup.toLowerCase()
    )

    const dropLocation = locations.find(
      (location) =>
        location.location.toLowerCase() === drop.toLowerCase()
    )

    if (!pickupLocation || !dropLocation) {
      return {
        success: false,
        error: 'Pricing not available for the selected locations.',
      }
    }

    const vehiclePrice = Number(vehicle.price)
    const pickupCharge = Number(pickupLocation.extra_charge)
    const dropCharge = Number(dropLocation.extra_charge)

    const baseFare = vehiclePrice
    const locationCharge = pickupCharge + dropCharge

    const oneWayFare = baseFare + locationCharge

    const tripFare =
      tripType === 'round-trip'
        ? oneWayFare * 2
        : oneWayFare

    const waitingCharge =
  tripType === 'round-trip'
    ? WAITING_CHARGE
    : 0

const totalFare = tripFare + waitingCharge

    return {
      success: true,

      vehicle: {
        id: vehicle.id,
        name: vehicle.name,
      },

      baseFare,
      pickupCharge,
      dropCharge,
      locationCharge,
      oneWayFare,
      waitingCharge,
      totalFare,
      tripType,
    }
  } catch (err) {
    console.error('Fare calculation exception:', err)

    return {
      success: false,
      error: 'Unable to calculate fare.',
    }
  }
}