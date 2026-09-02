import { Link, useLocation, useNavigate } from 'react-router-dom'
import { adminLogout } from '../services/authService'
import ThemeToggle from '../components/ThemeToggle'

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    const result = await adminLogout()
    if (result.success) {
      navigate('/')
    } else {
      alert('Logout failed: ' + result.error)
    }
  }

  const navItems = [
    { name: 'Enquiries', path: '/admin/enquiries', letter: 'E' },
    { name: 'Vehicles', path: '/admin/vehicles', letter: 'V' },
    { name: 'Routes', path: '/admin/routes', letter: 'R' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-200 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      
      {/* Collapsible Responsive Sidebar */}
      <aside className="w-16 md:w-64 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-[#222] flex flex-col justify-between p-3 md:p-6 shrink-0 z-20 transition-all duration-300">
        <div>
          {/* Brand Logo / Monogram */}
          <Link to="/" className="block mb-8 md:mb-12 text-center md:text-left">
            {/* Desktop Brand Text */}
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                Deccan<span className="text-gray-500 font-light">Ride</span>
              </h1>
              <p className="text-[9px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-[0.2em] mt-1">
                Admin Portal
              </p>
            </div>

            {/* Mobile Icon Logo */}
            <div className="block md:hidden mx-auto w-8 h-8 rounded-md bg-black dark:bg-white text-white dark:text-black font-black text-xs flex items-center justify-center">
              DR
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.name}
                  className={`flex items-center justify-center md:justify-between px-3 md:px-4 py-3 text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold rounded-md shadow-sm'
                      : 'text-gray-500 font-medium hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#111] rounded-md'
                  }`}
                >
                  {/* Icon Indicator for Mobile Collapsed Bar */}
                  <span className="text-xs font-bold font-mono uppercase tracking-wider">
                    {item.letter}
                  </span>

                  {/* Text Label for Desktop View */}
                  <span className="hidden md:inline">{item.name}</span>

                  {/* Active Marker Dot for Desktop */}
                  {isActive && (
                    <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white dark:bg-black"></span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer & Logout Action */}
        <div className="pt-6 border-t border-gray-200 dark:border-[#222] space-y-4">
          <Link
            to="/"
            title="View Public Site"
            className="flex items-center justify-center md:justify-between text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors px-1 md:px-2"
          >
            <span className="hidden md:inline">View Public Site</span>
            <span>&rarr;</span>
          </Link>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="w-full flex items-center justify-center px-2 md:px-4 py-3 bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-[#333] hover:border-black dark:hover:border-white rounded-md text-[10px] uppercase tracking-widest font-bold transition-all active:scale-[0.98]"
          >
            {/* Desktop Label */}
            <span className="hidden md:inline">Sign Out</span>
            {/* Mobile Icon */}
            <span className="inline md:hidden text-xs">&times;</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar with Theme Toggle */}
        <header className="h-16 border-b border-gray-200 dark:border-[#222] bg-white dark:bg-[#0a0a0a] px-4 sm:px-8 flex items-center justify-between z-10 sticky top-0 transition-colors duration-200">
          
          {/* System Status */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-widest">
              System Active
            </span>
          </div>

          {/* Controls & Admin Profile */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="text-right hidden sm:block">
              <span className="block text-xs font-semibold text-black dark:text-white leading-tight">
                Administrator
              </span>
              <span className="text-[10px] text-gray-500">
                admin@deccanride.com
              </span>
            </div>
            {/* Monogram Avatar */}
            <div className="w-8 h-8 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-md flex items-center justify-center text-black dark:text-white text-xs font-medium">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Main View Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-gray-50 dark:bg-black transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}