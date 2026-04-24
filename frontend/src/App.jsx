import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import MapPage from './pages/MapPage';
import HomeDetailPage from './pages/HomeDetailPage';
import SchemesPage from './pages/SchemesPage';
import ServicesPage from './pages/ServicesPage';
import LoanOptimizerPage from './pages/LoanOptimizerPage';
import UserDashboard from './pages/UserDashboard';
import VirtualToursPage from './pages/VirtualToursPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SellHomePage from './pages/SellHomePage';
import { Toaster } from 'react-hot-toast';
import SplashScreen from './components/SplashScreen';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Toaster position="top-right" />
          <Routes>
            {/* Full-screen routes (no Navbar / Footer) */}
            <Route path="/map" element={<MapPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Main app routes with Navbar and Footer */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="home/:id" element={<HomeDetailPage />} />
              <Route path="schemes" element={<SchemesPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="loan-optimizer" element={<LoanOptimizerPage />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="virtual-tours" element={<VirtualToursPage />} />
              <Route path="sell-home" element={<SellHomePage />} />
            </Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
