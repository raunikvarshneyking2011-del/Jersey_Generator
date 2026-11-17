import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreateJerseyPage from './pages/CreateJerseyPage';
import MyDesignsPage from './pages/MyDesignsPage';
import AboutPage from './pages/AboutPage';
import AuthModal from './pages/AuthModal';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Main View Router */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateJerseyPage />} />
          <Route path="/my-designs" element={<MyDesignsPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
