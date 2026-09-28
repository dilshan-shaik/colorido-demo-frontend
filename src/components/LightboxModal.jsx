import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';

export default function LightboxModal({ images = [], currentIndex = 0, onClose, onNavigate }) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-purple-600/60 border border-purple-400/40 text-white text-xs font-bold uppercase tracking-wider rounded-full">
            {currentImage.category || 'COLORIDO'}
          </span>
          {currentImage.year && (
            <span className="text-xs text-gray-400 font-mono flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-pink-400" />
              {currentImage.year}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev / Next buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-white/20 transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-white/20 transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Frame */}
      <div
        className="max-w-5xl max-h-[82vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.imageUrl}
          alt={currentImage.title}
          className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-white/10"
        />
        
        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h3 className="text-lg font-bold text-white">{currentImage.title}</h3>
          {currentImage.description && (
            <p className="text-xs sm:text-sm text-gray-300 mt-1">{currentImage.description}</p>
          )}
          <p className="text-[11px] text-gray-500 font-mono mt-1">
            {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
