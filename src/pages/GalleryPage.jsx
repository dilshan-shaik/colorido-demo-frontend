import React, { useState, useMemo } from 'react';
import { Sparkles, Calendar, Eye, Image as ImageIcon } from 'lucide-react';
import LightboxModal from '../components/LightboxModal';

export default function GalleryPage({ gallery = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { id: 'ALL', label: 'All Moments' },
    { id: 'CROWD', label: 'Crowds & Aura' },
    { id: 'MUSIC', label: 'Bands & Beats' },
    { id: 'DANCE', label: 'Dance Battles' },
    { id: 'CAMPUS', label: 'Campus Glow' },
    { id: 'SPORTS', label: 'Sports Arena' },
  ];

  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'ALL') return gallery;
    return gallery.filter(img => img.category?.toUpperCase() === selectedCategory);
  }, [gallery, selectedCategory]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          Visual Memories
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Festival Gallery
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Relive the unforgettable moments of COLORIDO across stages, cyphers, concerts, and cheering crowds at R.V.R. & J.C. College of Engineering.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-600/30'
                : 'bg-[#12162a] text-gray-400 hover:text-white border border-purple-900/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Fluid Dynamic Masonry Grid */}
      {filteredGallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => {
            // Give some featured cards larger visual span for variety
            const isSpanTwo = item.isFeatured && index % 3 === 0;

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className={`group relative rounded-2xl overflow-hidden bg-[#0e1224] border border-purple-900/40 hover:border-pink-500/50 shadow-xl cursor-pointer transition-all duration-500 ${
                  isSpanTwo ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-900/80 backdrop-blur-md text-purple-200 rounded-full border border-purple-500/30">
                      {item.category}
                    </span>
                    {item.year && (
                      <span className="text-xs text-gray-300 font-mono flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-pink-400" />
                        {item.year}
                      </span>
                    )}
                  </div>

                  {/* Bottom Captions */}
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <span className="inline-flex items-center space-x-1 text-xs text-pink-400 font-semibold mt-2">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Click to view full size</span>
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl bg-[#0f1224] border border-purple-900/30 p-8">
          <ImageIcon className="w-10 h-10 text-purple-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white">No Images in this Category</h3>
          <p className="text-xs text-gray-400 mt-1">Please select another category or check back soon.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={filteredGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}

    </div>
  );
}
