import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-gray-300 font-sans border-t border-white/10">
      {/* Modern Slim Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />

      {/* Main Footer Content */}
      <div className="w-full px-6 sm:px-12 md:px-16 lg:px-20 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-black text-white tracking-tight">
                Deccan<span className="text-gray-400 font-light">Ride</span>
              </h2>
            </Link>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Premium, reliable, and transparent intercity cab services
              connecting Pune and Mumbai with 24/7 highway coverage.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/fleet"
                  className="hover:text-white transition-colors"
                >
                  Fleet & Vehicles
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Booking & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Routes */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">
              Corridors
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link
                  to="/pune-to-mumbai-cab"
                  className="hover:text-white transition-colors"
                >
                  Pune &rarr; Mumbai Cab
                </Link>
              </li>
              <li>
                <Link
                  to="/mumbai-to-pune-cab"
                  className="hover:text-white transition-colors"
                >
                  Mumbai &rarr; Pune Cab
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-default">
                  Mumbai Airport Pickups
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operations */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase font-bold text-white tracking-widest">
              Support
            </h3>
            <div className="space-y-2 text-sm font-light text-gray-300">
              <p>Pune &bull; Mumbai Highway Ops</p>
              <p className="text-white font-medium">support@deccanride.com</p>
              <p className="text-white font-mono font-semibold text-base">
                +91 (20) 24/7-RIDE
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-light text-gray-400">
          <p>&copy; 2026 DeccanRide Technologies. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>
            <Link
              to="/admin/login"
              className="hover:text-white transition-colors font-mono font-medium"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
