import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ArrowLeft, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  siteName: string;
  isProjectPage?: boolean;
  onBackToWork?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  siteName,
  isProjectPage,
  onBackToWork,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (isProjectPage && onBackToWork) {
      onBackToWork();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 bg-[#FAF8F5]/90 dark:bg-[#121316]/90 border-black/5 dark:border-white/5"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Back link or Brand name */}
        <div className="flex items-center gap-4">
          {isProjectPage ? (
            <button
              onClick={onBackToWork}
              className="flex items-center gap-2 text-xs font-mono font-medium hover:text-[#0F5132] dark:hover:text-[#34D399] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to all work</span>
            </button>
          ) : (
            <a
              href="#top"
              className="font-serif text-lg tracking-tight font-semibold text-[#1A1A1A] dark:text-white hover:opacity-80 transition-opacity"
            >
              {siteName}
            </a>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono">
          {!isProjectPage && (
            <>
              <button
                onClick={() => scrollToSection('work')}
                className="text-[#5A5A5A] dark:text-[#9A9894] hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-[#5A5A5A] dark:text-[#9A9894] hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-[#5A5A5A] dark:text-[#9A9894] hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-[#5A5A5A] dark:text-[#9A9894] hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </>
          )}

          {/* Dark / Light Mode Toggle */}
          <div className="flex items-center pl-4 border-l border-black/10 dark:border-white/10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.06] text-[#1A1A1A] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer font-mono text-xs shadow-xs"
              aria-label="Toggle dark and light mode"
              title={isDark ? "Switch to warm light theme" : "Switch to dark theme"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                  <span className="text-[11px] font-medium text-[#EDEDEC]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#0F5132]" />
                  <span className="text-[11px] font-medium text-[#1A1A1A]">Dark</span>
                </>
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-[#1A1A1A] dark:text-white"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#1A1A1A]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#1A1A1A] dark:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b px-4 py-4 space-y-3 bg-[#FAF8F5] dark:bg-[#121316] border-black/5 dark:border-white/5 text-xs font-mono">
          {!isProjectPage && (
            <>
              <button
                onClick={() => scrollToSection('work')}
                className="block w-full text-left py-1 text-[#1A1A1A] dark:text-white"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-1 text-[#1A1A1A] dark:text-white"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="block w-full text-left py-1 text-[#1A1A1A] dark:text-white"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left py-1 text-[#1A1A1A] dark:text-white"
              >
                Contact
              </button>
            </>
          )}
        </div>
      )}
    </motion.header>
  );
};
