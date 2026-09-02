import { PUNE_LOCATIONS, MUMBAI_LOCATIONS } from '../data/locations';

export default function LocationInput({
  label,
  value,
  onChange,
  placeholder = 'Select location',
  city = null,
  required = false,
}) {
  let locations;

  if (city === 'Pune' || city === 'pune') {
    locations = PUNE_LOCATIONS;
  } else if (city === 'Mumbai' || city === 'mumbai') {
    locations = MUMBAI_LOCATIONS;
  } else {
    locations = [...PUNE_LOCATIONS, ...MUMBAI_LOCATIONS];
  }

  return (
    <div className="relative font-sans">
      <label className="block text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300 font-bold mb-2">
        {label}
        {required && (
          <span className="text-gray-900 dark:text-white font-mono"> *</span>
        )}
      </label>

      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full appearance-none px-4 py-3.5 pr-10 bg-white dark:bg-[#121212] border border-gray-300 dark:border-white/10 rounded-xl text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-sm cursor-pointer shadow-sm"
        >
          <option
            value=""
            disabled
            className="bg-white text-gray-500 dark:bg-[#1e1e1e] dark:text-gray-500"
          >
            {placeholder}
          </option>

          {locations.map((location) => (
            <option
              key={location.id}
              value={location.name}
              className="bg-white text-black dark:bg-[#1e1e1e] dark:text-white"
            >
              {location.name}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow */}
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
      </div>
    </div>
  );
}
