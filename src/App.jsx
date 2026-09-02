import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import PuneToMumbai from './pages/PuneToMumbai';
import MumbaiToPune from './pages/MumbaiToPune';
import Fleet from './pages/Fleet';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin
import AdminLogin from './pages/AdminLogin';
import EnquiryManager from './admin/EnquiryManager';
import VehicleManager from './admin/VehicleManager';
import RouteManager from './admin/RouteManager';

//Theme
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <EnquiryManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/vehicles"
            element={
              <ProtectedRoute>
                <VehicleManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/routes"
            element={
              <ProtectedRoute>
                <RouteManager />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen bg-white">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/pune-to-mumbai-cab"
                      element={<PuneToMumbai />}
                    />
                    <Route
                      path="/mumbai-to-pune-cab"
                      element={<MumbaiToPune />}
                    />
                    <Route path="/fleet" element={<Fleet />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </ThemeProvider>
  );
}
