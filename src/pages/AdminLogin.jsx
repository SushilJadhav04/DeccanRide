import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { adminLogin } from '../services/authService'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password) {
      setError('Please enter both email and password')
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    const result = await adminLogin(email, password)

    if (result.success) {
      navigate('/admin/enquiries')
    } else {
      setError(result.error || 'Login failed. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex items-center justify-center px-4 relative overflow-hidden font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-200">
      
      {/* Background Subtle Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black/[0.02] dark:bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-white/10 rounded-md p-8 sm:p-10 w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm transition-colors">
        
        {/* Brand Header */}
        <div className="mb-8 text-center sm:text-left">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-black text-black dark:text-white tracking-tight mb-1">
              Deccan<span className="text-gray-500 font-light">Ride</span>
            </h1>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-s font-mono uppercase tracking-[0.2em] mt-1">
            Management Portal
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-transparent border border-red-200 dark:border-red-500/50 rounded-md">
            <p className="text-red-600 dark:text-red-400 text-s font-mono leading-relaxed">
              {error}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@deccanride.com"
              className="w-full px-4 py-3.5 bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-white/10 rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Deccan@2026"
              className="w-full px-4 py-3.5 bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-white/10 rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition text-s font-mono tracking-wider"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-4 py-3.5 rounded-md font-bold text-s uppercase tracking-[0.2em] transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-md space-y-1">
          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
            Demo Credentials
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-s font-mono">
            Email: <span className="text-black dark:text-white font-semibold">admin@deccanride.com</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-s font-mono">
            Password: <span className="text-black dark:text-white font-semibold">Deccan@2026</span>
          </p>
        </div>    
      </div>
    </div>
  )
}