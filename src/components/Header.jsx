import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const closeMenu = () => {
    const menuCheckbox = document.getElementById('mobile-menu');
    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  };

  return (
    <header className="relative w-full bg-white dark:bg-[#121212] z-50 font-sans transition-colors duration-200">
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-16">
        <div className="min-h-18 flex items-center justify-between">
          {/* Left Group: Logo + Public Nav Links */}
          <div className="flex items-center gap-8 lg:gap-12">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/public/logo.png"
                alt="DeccanRide"
                className="w-10 h-10 object-contain"
              />
              <span className="text-black dark:text-white text-xl sm:text-2xl font-bold tracking-tight">
                Deccan<span className="text-gray-500 font-light">Ride</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 lg:gap-4">
              <Link
                to="/fleet"
                className="px-3.5 py-2 text-gray-700 dark:text-gray-300 font-semibold text-s tracking-widest uppercase hover:text-black dark:hover:text-white transition-all"
              >
                Fleet
              </Link>

              <Link
                to="/contact"
                className="px-3.5 py-2 text-gray-700 dark:text-gray-300 font-semibold text-s tracking-widest uppercase hover:text-black dark:hover:text-white transition-all"
              >
                Booking
              </Link>

              <Link
                to="/about"
                className="px-3.5 py-2 text-gray-700 dark:text-gray-300 font-semibold text-s tracking-widest uppercase hover:text-black dark:hover:text-white transition-all"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Right Group: Theme Toggle + Admin Link */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link
              to="/admin/login"
              className="px-3.5 py-2 text-gray-700 dark:text-gray-300 font-semibold text-s tracking-widest uppercase hover:text-black dark:hover:text-white transition-all"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle & Actions */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />

            <input type="checkbox" id="mobile-menu" className="peer hidden" />

            <label
              htmlFor="mobile-menu"
              className="relative z-50 flex items-center justify-center w-10 h-10 text-black dark:text-white cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition"
              aria-label="Toggle navigation"
            >
              <span className="text-2xl leading-none peer-checked:hidden">
                ☰
              </span>
              <span className="hidden text-2xl leading-none peer-checked:block">
                ×
              </span>
            </label>

            {/* Mobile Navigation Dropdown */}
            <nav className="hidden peer-checked:block absolute left-0 top-full w-full bg-white dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-white/10 px-6 py-4 z-40 shadow-2xl">
              <div className="w-full flex flex-col text-left space-y-1">
                <Link
                  to="/fleet"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-800 dark:text-gray-200 font-medium text-base tracking-wide hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition"
                >
                  Fleet
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-800 dark:text-gray-200 font-medium text-base tracking-wide hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition"
                >
                  Booking
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-800 dark:text-gray-200 font-medium text-base tracking-wide hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition"
                >
                  About
                </Link>

                <Link
                  to="/admin/login"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-gray-800 dark:text-gray-200 font-medium text-base tracking-wide hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition border-t border-gray-200 dark:border-white/10 mt-2 pt-3"
                >
                  Admin Portal
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
