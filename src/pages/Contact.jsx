import { useState, useEffect } from 'react';
import { submitEnquiry } from '../services/enquiryService';
import { getVehicles } from '../services/vehicleService';
import { isValidLocation } from '../data/locations';
import LocationInput from '../components/LocationInput';

export default function Contact() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickup: '',
    drop: '',
    travel_date: '',
    travel_time: '',
    trip_type: 'one-way',
    vehicle_id: '',
    passengers: '1',
    message: '',
  });

  useEffect(() => {
    async function fetchVehicles() {
      const data = await getVehicles();
      setVehicles(data);
    }
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.pickup ||
      !formData.drop ||
      !formData.travel_date ||
      !formData.vehicle_id
    ) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!isValidLocation(formData.pickup)) {
      setError(
        `"${formData.pickup}" is not a valid pickup location. Please select from suggestions.`
      );
      setLoading(false);
      return;
    }

    if (!isValidLocation(formData.drop)) {
      setError(
        `"${formData.drop}" is not a valid drop location. Please select from suggestions.`
      );
      setLoading(false);
      return;
    }

    const selectedDate = new Date(formData.travel_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Travel date must be in the future');
      setLoading(false);
      return;
    }

    const result = await submitEnquiry({
      ...formData,
      vehicle_id: parseInt(formData.vehicle_id),
      passengers: parseInt(formData.passengers),
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        pickup: '',
        drop: '',
        travel_date: '',
        travel_time: '',
        trip_type: 'one-way',
        vehicle_id: '',
        passengers: '1',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setError(`Failed to submit booking: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      {/* Header Banner */}
      <section className="pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-12 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <span className="text-gray-500 dark:text-gray-400 font-mono uppercase tracking-[0.2em] text-[10px] sm:text-s">
              Instant Reservations
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-black dark:text-white tracking-tight mt-2 mb-3 sm:mb-4">
              Book Your Cab.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Intercity highway transit between Pune and Mumbai. Upfront
              billing, safety-certified drivers, and guaranteed departures.
            </p>
          </div>
        </div>
      </section>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-16">
        {/* Status Alerts */}
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md bg-white dark:bg-[#121212] text-black dark:text-white border border-gray-200 dark:border-white/10 shadow-2xl p-8 sm:p-10 text-center">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
                aria-label="Close confirmation"
              >
                ✕
              </button>

              {/* Success Icon */}
              <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-black dark:border-white flex items-center justify-center text-xl">
                ✓
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                Reservation Confirmed
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                Your booking request has been submitted successfully. Our
                dispatch team will contact you shortly.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 px-8 py-3 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-[0.15em] text-xs hover:opacity-80 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-transparent border border-red-300 dark:border-red-500 text-red-600 dark:text-red-400 font-mono text-s text-center">
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
            {/* Column 01: Passenger Information */}
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-[11px] sm:text-s uppercase font-bold text-gray-500 tracking-[0.2em] border-b border-gray-200 dark:border-white/10 pb-3">
                01 / Passenger Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm rounded-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm font-mono rounded-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm rounded-none"
                  required
                />
              </div>

              <div>
                <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Special Requests / Flight Number
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Terminal pickup details, luggage notes, or extra stops..."
                  rows="4"
                  className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm leading-relaxed rounded-none resize-none"
                />
              </div>
            </div>

            {/* Column 02: Itinerary & Vehicle Specs */}
            <div className="space-y-5 sm:space-y-6">
              <h2 className="text-[11px] sm:text-s uppercase font-bold text-gray-500 tracking-[0.2em] border-b border-gray-200 dark:border-white/10 pb-3">
                02 / Itinerary & Vehicle
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <LocationInput
                  label="Pickup Location"
                  value={formData.pickup}
                  onChange={(value) =>
                    setFormData({ ...formData, pickup: value })
                  }
                  placeholder="Select pickup spot"
                  required={true}
                />

                <LocationInput
                  label="Drop Location"
                  value={formData.drop}
                  onChange={(value) =>
                    setFormData({ ...formData, drop: value })
                  }
                  placeholder="Select drop spot"
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    name="travel_date"
                    value={formData.travel_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm cursor-pointer rounded-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Travel Time
                  </label>
                  <input
                    type="time"
                    name="travel_time"
                    value={formData.travel_time}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm cursor-pointer rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <div>
                  <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Trip Type *
                  </label>
                  <select
                    name="trip_type"
                    value={formData.trip_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm cursor-pointer rounded-none"
                    required
                  >
                    <option
                      value="one-way"
                      className="bg-white text-black dark:bg-black dark:text-white"
                    >
                      One Way
                    </option>
                    <option
                      value="round-trip"
                      className="bg-white text-black dark:bg-black dark:text-white"
                    >
                      Round Trip
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Vehicle Class *
                  </label>
                  <select
                    name="vehicle_id"
                    value={formData.vehicle_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm cursor-pointer rounded-none"
                    required
                  >
                    <option
                      value=""
                      className="bg-white text-gray-500 dark:bg-black dark:text-gray-500"
                    >
                      Select class
                    </option>
                    {vehicles.map((vehicle) => (
                      <option
                        key={vehicle.id}
                        value={vehicle.id}
                        className="bg-white text-black dark:bg-black dark:text-white"
                      >
                        {vehicle.name} — ₹{vehicle.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-s uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
                    Passengers *
                  </label>
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    min="1"
                    max="15"
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-black border border-gray-300 dark:border-white/15 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition text-base sm:text-sm font-mono rounded-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Centered Action Button */}
          <div className="pt-4 sm:pt-6 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold uppercase tracking-[0.2em] text-s transition-all rounded-none shadow-lg active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Processing Request...' : 'Submit Reservation →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
