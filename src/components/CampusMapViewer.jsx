import React, { useState, useEffect } from 'react';
import { MapPin, Utensils, Award, Info, HeartPulse, Car, Compass, Sparkles, Layers, Eye } from 'lucide-react';

export default function CampusMapViewer({ locations = [], events = [], onSelectLocation }) {
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    if (locations && locations.length > 0 && !selectedLoc) {
      // Default to Food Stall Area or first location
      const food = locations.find(l => l.name?.toLowerCase().includes('food') || l.category === 'FOOD');
      setSelectedLoc(food || locations[0]);
    }
  }, [locations]);

  const categories = [
    { id: 'ALL', label: 'All Markers', color: 'from-purple-500 to-pink-500' },
    { id: 'FOOD', label: 'Food Stall Area', color: 'from-amber-500 to-orange-500' },
    { id: 'VENUE', label: 'Stages & Theatres', color: 'from-pink-500 to-rose-500' },
    { id: 'SPORTS', label: 'Sports Arena', color: 'from-emerald-500 to-teal-500' },
    { id: 'ENTRY', label: 'Entrance & Helpdesk', color: 'from-cyan-500 to-blue-500' },
    { id: 'FACILITY', label: 'Campus Facilities', color: 'from-gray-500 to-slate-500' },
  ];

  const filteredLocations = locations.filter(loc => {
    if (activeFilter === 'ALL') return true;
    return loc.category === activeFilter;
  });

  const getIconForCategory = (cat, iconName) => {
    if (cat === 'FOOD' || iconName === 'utensils') return <Utensils className="w-4 h-4" />;
    if (cat === 'SPORTS' || iconName === 'trophy') return <Award className="w-4 h-4" />;
    if (cat === 'ENTRY' || iconName === 'info') return <Info className="w-4 h-4" />;
    if (cat === 'FACILITY' && iconName === 'car') return <Car className="w-4 h-4" />;
    if (cat === 'FACILITY' || iconName === 'heart-pulse') return <HeartPulse className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const getPinColor = (cat) => {
    switch (cat) {
      case 'FOOD': return 'bg-amber-500 text-white shadow-amber-500/50 border-amber-300';
      case 'VENUE': return 'bg-pink-600 text-white shadow-pink-600/50 border-pink-300';
      case 'SPORTS': return 'bg-emerald-600 text-white shadow-emerald-600/50 border-emerald-300';
      case 'ENTRY': return 'bg-cyan-500 text-white shadow-cyan-500/50 border-cyan-300';
      case 'FACILITY': return 'bg-blue-600 text-white shadow-blue-600/50 border-blue-300';
      default: return 'bg-purple-600 text-white shadow-purple-600/50 border-purple-300';
    }
  };

  // Find events related to the currently selected venue/marker
  const currentEvents = selectedLoc?.venue
    ? events.filter(e => e.venue?.id === selectedLoc.venue.id)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Filter Tabs Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all duration-200 ${
              activeFilter === cat.id
                ? 'bg-gradient-to-r text-white shadow-lg ' + cat.color
                : 'bg-[#12162a] text-gray-400 hover:text-white border border-purple-900/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Campus Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Map Visualization (2 Cols) */}
        <div className="lg:col-span-2 relative bg-[#090b16] border border-purple-900/40 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 min-h-[480px]">
          
          {/* Legend and Compass Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '30s' }} />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                R.V.R. & J.C. Campus Architectural Layout (Chowdavaram)
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-500">
              37.4 Acres • Dynamic Fest Markers
            </span>
          </div>

          {/* SVG Map Base Canvas */}
          <div className="relative w-full aspect-[16/10] bg-[#0c1022] rounded-xl border border-white/10 overflow-hidden select-none">
            
            {/* Campus SVG Graphic: Real Layout */}
            <svg
              viewBox="0 0 1000 625"
              className="w-full h-full object-cover"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e243d" />
                  <stop offset="100%" stopColor="#161a2d" />
                </linearGradient>
                <linearGradient id="lawnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0b241b" />
                  <stop offset="100%" stopColor="#061611" />
                </linearGradient>
                <linearGradient id="bldgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#252b47" />
                  <stop offset="100%" stopColor="#181c2f" />
                </linearGradient>
                <linearGradient id="foodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3d2110" />
                  <stop offset="100%" stopColor="#261308" />
                </linearGradient>
                <linearGradient id="oatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b1136" />
                  <stop offset="100%" stopColor="#1d081b" />
                </linearGradient>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="1000" height="625" fill="#090d1c" />
              <rect width="1000" height="625" fill="url(#gridPattern)" />

              {/* Peripheral Campus Perimeter Wall */}
              <rect x="20" y="20" width="960" height="585" rx="16" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="2" strokeDasharray="6 4" />

              {/* NH-16 Highway & Campus Main Road Spine */}
              <path d="M 50 600 L 220 500 L 480 340 L 780 340 L 920 450" fill="none" stroke="#252b45" strokeWidth="28" strokeLinecap="round" />
              <path d="M 50 600 L 220 500 L 480 340 L 780 340 L 920 450" fill="none" stroke="#ffcc00" strokeWidth="2" strokeDasharray="12 12" />

              {/* Main Connecting Pathways */}
              <path d="M 220 500 L 320 220 L 480 180" fill="none" stroke="#1d2238" strokeWidth="14" />
              <path d="M 480 340 L 520 440 L 780 440" fill="none" stroke="#1d2238" strokeWidth="14" />
              <path d="M 480 340 L 480 200" fill="none" stroke="#1d2238" strokeWidth="16" />
              <path d="M 650 340 L 650 200" fill="none" stroke="#1d2238" strokeWidth="12" />

              {/* Campus Lawns & Green Zones */}
              <rect x="250" y="280" width="180" height="150" rx="12" fill="url(#lawnGrad)" stroke="#164e3b" strokeWidth="1.5" />
              <text x="340" y="360" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle" opacity="0.6">CENTRAL LAWNS</text>

              <rect x="520" y="160" width="100" height="120" rx="8" fill="url(#lawnGrad)" stroke="#164e3b" strokeWidth="1.5" />

              {/* 1. Main Welcome Arch / Entrance (Bottom Left, NH-16) */}
              <g>
                <rect x="120" y="490" width="140" height="60" rx="8" fill="url(#bldgGrad)" stroke="#00dfd8" strokeWidth="1.5" />
                <text x="190" y="525" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">MAIN ENTRANCE ARCH</text>
                <text x="190" y="540" fill="#94a3b8" fontSize="9" textAnchor="middle">NH-16 Chowdavaram Gate</text>
              </g>

              {/* 2. Silver Jubilee Block (Main Admin & SJB Auditorium) */}
              <g>
                <rect x="260" y="120" width="150" height="110" rx="8" fill="url(#bldgGrad)" stroke="#a855f7" strokeWidth="1.5" />
                <text x="335" y="170" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle">SILVER JUBILEE BLOCK</text>
                <text x="335" y="190" fill="#c084fc" fontSize="10" textAnchor="middle">Auditorium & Admin</text>
              </g>

              {/* 3. Open Air Theatre (OAT - Main Fest Stage) */}
              <g>
                <circle cx="480" cy="240" r="75" fill="url(#oatGrad)" stroke="#ff0080" strokeWidth="2.5" />
                <circle cx="480" cy="240" r="50" fill="none" stroke="#ff0080" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="480" cy="240" r="25" fill="#ff0080" opacity="0.25" />
                <text x="480" y="235" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">OPEN AIR THEATRE</text>
                <text x="480" y="252" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">OAT • 2500+ Capacity</text>
                <text x="480" y="268" fill="#fda4af" fontSize="9" textAnchor="middle">Battle of Bands & Pro-Night</text>
              </g>

              {/* 4. Decennial Block & Stage */}
              <g>
                <rect x="600" y="150" width="140" height="100" rx="8" fill="url(#bldgGrad)" stroke="#ec4899" strokeWidth="1.5" />
                <text x="670" y="200" fill="#f1f5f9" fontSize="11" fontWeight="bold" textAnchor="middle">DECENNIAL BLOCK</text>
                <text x="670" y="218" fill="#f472b6" fontSize="9" textAnchor="middle">Open Stage • Mime & Street Dance</text>
              </g>

              {/* 5. Cyber Block (CS / IT / Workshops) */}
              <g>
                <rect x="320" y="380" width="130" height="90" rx="8" fill="url(#bldgGrad)" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="385" y="425" fill="#f1f5f9" fontSize="11" fontWeight="bold" textAnchor="middle">CYBER BLOCK</text>
                <text x="385" y="442" fill="#93c5fd" fontSize="9" textAnchor="middle">Seminar Hall 1 & Art Lab</text>
              </g>

              {/* 6. Food Plaza & Canteen Area (Official Food Stall Area!) */}
              <g>
                <rect x="470" y="340" width="160" height="110" rx="12" fill="url(#foodGrad)" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx="550" cy="395" r="28" fill="#f59e0b" opacity="0.15" />
                <text x="550" y="385" fill="#fbbf24" fontSize="13" fontWeight="900" textAnchor="middle">FOOD STALL AREA</text>
                <text x="550" y="402" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">25+ Carnival Stalls</text>
                <text x="550" y="418" fill="#fef3c7" fontSize="8.5" textAnchor="middle">South Indian, Chaat, Drinks</text>
              </g>

              {/* 7. Hi-Tech Block (ECE & EEE) */}
              <g>
                <rect x="640" y="340" width="100" height="85" rx="8" fill="url(#bldgGrad)" stroke="#6366f1" strokeWidth="1.5" />
                <text x="690" y="385" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">HI-TECH BLOCK</text>
                <text x="690" y="402" fill="#a5b4fc" fontSize="9" textAnchor="middle">ECE & EEE Wing</text>
              </g>

              {/* 8. Main Sports Complex & Grounds */}
              <g>
                <rect x="740" y="360" width="210" height="180" rx="16" fill="url(#lawnGrad)" stroke="#10b981" strokeWidth="2" />
                {/* Cricket Pitch representation */}
                <rect x="830" y="420" width="30" height="80" rx="4" fill="#a16207" opacity="0.7" />
                <text x="845" y="410" fill="#34d399" fontSize="13" fontWeight="900" textAnchor="middle">SPORTS COMPLEX</text>
                <text x="845" y="525" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Gully Cricket Arena & Grounds</text>
              </g>

              {/* 9. Dispensary / Health Center */}
              <g>
                <rect x="220" y="270" width="80" height="55" rx="6" fill="url(#bldgGrad)" stroke="#ef4444" strokeWidth="1.5" />
                <text x="260" y="298" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">DISPENSARY</text>
                <text x="260" y="312" fill="#ef4444" fontSize="8.5" textAnchor="middle">Medical Clinic</text>
              </g>

              {/* 10. Student & Visitor Parking */}
              <g>
                <rect x="70" y="410" width="90" height="65" rx="6" fill="#13172c" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
                <text x="115" y="442" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">PARKING ZONE</text>
                <text x="115" y="456" fill="#64748b" fontSize="8" textAnchor="middle">2W & 4W Vehicles</text>
              </g>

            </svg>

            {/* DYNAMIC PINS OVERLAY FROM BACKEND */}
            {filteredLocations.map((loc) => {
              const isSelected = selectedLoc?.id === loc.id;
              const xPos = loc.posX ?? 50;
              const yPos = loc.posY ?? 50;

              return (
                <div
                  key={loc.id}
                  style={{ left: `${xPos}%`, top: `${yPos}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  onClick={() => {
                    setSelectedLoc(loc);
                    if (onSelectLocation) onSelectLocation(loc);
                  }}
                >
                  {/* Glowing Radar Pulse if selected */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-pink-500 animate-ping opacity-60" />
                  )}

                  {/* Pin Bubble */}
                  <div className={`relative flex items-center justify-center p-2 rounded-full border-2 shadow-xl transition-all duration-300 ${
                    isSelected ? 'scale-125 ring-4 ring-pink-500/40 ' : 'hover:scale-110 '
                  } ${getPinColor(loc.category)}`}>
                    {getIconForCategory(loc.category, loc.icon)}
                  </div>

                  {/* Hover Tag */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:flex items-center px-2 py-0.5 bg-black/90 text-white text-[10px] font-bold tracking-wide rounded border border-white/20 whitespace-nowrap shadow-lg pointer-events-none z-30">
                    {loc.name}
                  </div>
                </div>
              );
            })}

          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>Click any marker on the map to view arena guidelines and schedule.</span>
            <span className="text-purple-300 font-semibold">{filteredLocations.length} locations active</span>
          </div>

        </div>

        {/* Selected Marker Detail Card (1 Col) */}
        <div className="bg-[#0f1224] border border-purple-900/40 rounded-2xl p-5 shadow-xl space-y-5">
          {selectedLoc ? (
            <>
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                    selectedLoc.category === 'FOOD' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    selectedLoc.category === 'VENUE' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                    selectedLoc.category === 'SPORTS' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {selectedLoc.category}
                  </span>
                  <h3 className="text-xl font-black text-white">{selectedLoc.name}</h3>
                </div>
                <div className={`p-2.5 rounded-xl border ${getPinColor(selectedLoc.category)}`}>
                  {getIconForCategory(selectedLoc.category, selectedLoc.icon)}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">Description</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {selectedLoc.description}
                </p>
              </div>

              {selectedLoc.venue && (
                <div className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-xl space-y-1 text-xs">
                  <span className="text-purple-300 font-bold uppercase text-[10px]">Linked Venue Arena:</span>
                  <p className="text-white font-semibold">{selectedLoc.venue.name}</p>
                  {selectedLoc.venue.capacity && (
                    <p className="text-gray-400">Capacity: {selectedLoc.venue.capacity.toLocaleString()} visitors</p>
                  )}
                  {selectedLoc.venue.landmark && (
                    <p className="text-pink-300">Landmark: {selectedLoc.venue.landmark}</p>
                  )}
                </div>
              )}

              {/* Special Food Stall Area callout */}
              {selectedLoc.category === 'FOOD' && (
                <div className="p-3.5 bg-gradient-to-r from-amber-950/40 to-orange-950/30 border border-amber-500/40 rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                    <Utensils className="w-4 h-4" />
                    <span>Festival Food Carnival</span>
                  </div>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    Over 25 stalls open throughout the fest days (09:00 AM - 10:00 PM) featuring Andhra street delicacies, mocktails, juices, bakery desserts, and quick meals.
                  </p>
                </div>
              )}

              {/* Events occurring at this venue */}
              {currentEvents.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Events at this Arena ({currentEvents.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {currentEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-2.5 bg-[#14182e] border border-purple-900/30 rounded-lg text-xs flex items-center justify-between"
                      >
                        <div>
                          <p className="text-white font-semibold truncate max-w-[170px]">{evt.name}</p>
                          <p className="text-[10px] text-gray-400">{evt.eventDate} • {evt.startTime}</p>
                        </div>
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-purple-600/30 text-purple-300 shrink-0">
                          {evt.category?.name?.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span>Map Coordinates:</span>
                <span className="font-mono text-purple-400">X: {selectedLoc.posX}% | Y: {selectedLoc.posY}%</span>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40 text-purple-400" />
              <p className="text-xs">Select any pin to view location details</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
