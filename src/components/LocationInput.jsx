import { useState } from 'react';
import { PUNE_LOCATIONS, MUMBAI_LOCATIONS } from '../data/locations';

export default function LocationInput({
  label,
  value,
  onChange,
  placeholder = 'Select location',
  city = null,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  let locations;

  if (city === 'Pune' || city === 'pune') {
    locations = PUNE_LOCATIONS;
  } else if (city === 'Mumbai' || city === 'mumbai') {
    locations = MUMBAI_LOCATIONS;
  } else {
    locations = [...PUNE_LOCATIONS, ...MUMBAI_LOCATIONS];
  }

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes((value || '').toLowerCase())
  );

  const handleSelect = (location) => {
    onChange(location.name);
    setIsOpen(false);
  };

  return (
    <div className="relative font-sans">
      <label className="block text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
        {label}
        {required && (
          <span className="text-gray-900 dark:text-white font-mono"> *</span>
        )}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="w-full px-4 py-3.5 pr-10 bg-white dark:bg-[#121212] border border-gray-300 dark:border-white/10 rounded-xl text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-sm shadow-sm"
        />

        {/* Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && filteredLocations.length > 0 && (
          <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg">
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                type="button"
                onMouseDown={() => handleSelect(location)}
                className="w-full text-left px-4 py-3 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                {location.name}
              </button>
            ))}
          </div>
        )}

        {isOpen && value && filteredLocations.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
            No matching locations found
          </div>
        )}
      </div>
    </div>
  );
}
