import React, { useEffect } from 'react';
import { GalleryImage } from '../types/portfolio';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}) => {
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 text-white select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
      >
        {/* Top action bar */}
        <div className="w-full max-w-5xl flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <span>
              {currentImage.folder}/{currentImage.filename}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{currentImage.recommendedSize}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              {currentIndex + 1} of {images.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close lightbox (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image Container with Motion transition */}
        <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-4">
          {/* Previous button */}
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-all cursor-pointer hover:scale-105"
            aria-label="Previous image (Left arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Animated Image with key switch */}
          <div className="w-full max-h-[72vh] flex items-center justify-center p-2 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {currentImage.imageUrl ? (
                <motion.img
                  key={currentImage.id}
                  src={currentImage.imageUrl}
                  alt={currentImage.alt}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="max-h-[70vh] max-w-full rounded-lg object-contain border border-white/10 shadow-2xl"
                />
              ) : (
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-h-[70vh] aspect-[16/10] bg-[#1E2024] border border-white/10 rounded-lg flex flex-col items-center justify-center p-6 text-center shadow-2xl relative overflow-hidden"
                >
                  <div className="relative z-10 max-w-md space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    
                    <div className="font-mono text-xs text-emerald-400 uppercase tracking-wider">
                      {currentImage.type.toUpperCase()} PREVIEW
                    </div>

                    <div className="font-mono text-sm sm:text-base text-slate-200 font-medium">
                      {currentImage.filename}
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      Target Resolution: {currentImage.recommendedSize}
                    </div>

                    <p className="text-xs text-slate-400 pt-2 border-t border-white/10 italic">
                      {currentImage.alt}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next button */}
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-all cursor-pointer hover:scale-105"
            aria-label="Next image (Right arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption footer */}
        <div className="w-full max-w-3xl text-center pb-2">
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {currentImage.caption}
          </p>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            Use ← and → arrow keys to navigate, Esc to close
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
