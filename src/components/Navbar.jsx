import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
//we are IOTIVE
import Logo from '../assets/Workshop_Images/IOTiveSolutionsLLP.png';
import IOIT_Logo from '../assets/Workshop_Images/aissms-ioit-logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Register', href: '#register', isButton: true }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* IOTive Logo */}
            <motion.a
              href="https://github.com/sahilvkale/bootcamp/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={Logo}
                className="h-10 md:h-12 w-auto object-contain"
                alt="IOTive Logo"
              />
            </motion.a>

            {/* Divider */}
            <div className="h-8 w-[1px] bg-slate-600"></div>

            {/* IOIT Logo */}
            <motion.a
              href="https://aissmsioit.org/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-white p-2 rounded-lg"
            >
              <img
                src={IOIT_Logo}
                className="h-7 md:h-12 w-auto object-contain"
                alt="AISSMS IOIT Logo"
              />
            </motion.a>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  link.isButton
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    link.isButton
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-center'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}