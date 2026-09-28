import React from 'react';
import { MapPin, Navigation, Utensils, Info, Shield, Compass } from 'lucide-react';
import CampusMapViewer from '../components/CampusMapViewer';

export default function MapPage({ mapLocations = [], events = [], festInfo }) {
  const college = festInfo?.collegeName || 'R.V.R. & J.C. College of Engineering';
  const location = festInfo?.collegeLocation || 'Chowdavaram, Guntur, Andhra Pradesh - 522019';

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          Campus Navigation
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Fest & Campus Map
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Explore the official 37.4-acre campus layout of {college} in Chowdavaram, Guntur. All festival stages, entry gates, parking, and the official Food Stall Area are marked below.
        </p>
      </div>

      {/* Special Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Food Stall Area Highlight */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-orange-950/20 border border-amber-500/30 flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Festival Food Stall Area</h4>
            <p className="text-xs text-gray-300 mt-0.5">
              Located at the Central Plaza opposite Canteen. 25+ food counters with Andhra street food, drinks, and mocktails.
            </p>
          </div>
        </div>

        {/* Main Stage OAT */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-950/30 to-rose-950/20 border border-pink-500/30 flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">Open Air Theatre (OAT)</h4>
            <p className="text-xs text-gray-300 mt-0.5">
              Main amphitheater arena (2,500+ capacity) hosting Battle of Bands, Mega Group Dance, and the Celebrity DJ Night.
            </p>
          </div>
        </div>

        {/* Entrance & Help Desk */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/30 to-cyan-950/20 border border-purple-500/30 flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-purple-500/20 text-cyan-400 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Main Arch & Helpdesk</h4>
            <p className="text-xs text-gray-300 mt-0.5">
              Direct access from NH-16 Highway, Chowdavaram. Visitor verification, badge distribution, and security desks.
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Map Component */}
      <CampusMapViewer locations={mapLocations} events={events} />

      {/* Campus Location & Transit Advice */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0f1224] border border-purple-900/30 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-purple-400" />
          <span>How to Reach R.V.R. & J.C. College of Engineering</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
          <div>
            <span className="font-bold text-white block mb-1">By Bus / Public Transit</span>
            <p className="text-gray-400 leading-relaxed">
              Frequent RTC buses operate from Guntur NTR Bus Station (12 km) directly towards Chilakaluripet via NH-16. Get down at Chowdavaram RVR&JC College stop.
            </p>
          </div>
          <div>
            <span className="font-bold text-white block mb-1">By Train</span>
            <p className="text-gray-400 leading-relaxed">
              Guntur Railway Junction (GNT) is 14 km away. Taxis and auto-rickshaws are readily available directly to the RVRJC college gate.
            </p>
          </div>
          <div>
            <span className="font-bold text-white block mb-1">Parking on Campus</span>
            <p className="text-gray-400 leading-relaxed">
              Designated two-wheeler and four-wheeler parking lots are situated beside the main NH-16 entrance gate. Strictly follow campus traffic volunteers.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
