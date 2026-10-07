import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';

interface LazyImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholderText?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  placeholderText,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-6 text-center bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 ${containerClassName}`}>
        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-2 text-[#0F5132] dark:text-[#34D399]">
          <ImageIcon className="w-5 h-5 opacity-70" />
        </div>
        <span className="text-xs font-mono text-[#5A5A5A] dark:text-[#A09E9A] max-w-[200px] line-clamp-2">
          {placeholderText || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black/[0.05] dark:bg-white/[0.05] animate-pulse flex items-center justify-center z-10">
          <ImageIcon className="w-6 h-6 text-[#6E6D6B]/30 dark:text-[#9A9894]/30" />
        </div>
      )}

      {/* Image with smooth fade-in motion once loaded */}
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${className}`}
      />
    </div>
  );
};

