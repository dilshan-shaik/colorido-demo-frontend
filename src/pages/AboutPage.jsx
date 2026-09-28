import React from 'react';
import { Sparkles, Calendar, MapPin, Award, CheckCircle, ShieldAlert, Building2 } from 'lucide-react';

export default function AboutPage({ festInfo }) {
  const festName = festInfo?.festName || 'COLORIDO 2K26';
  const college = festInfo?.collegeName || 'R.V.R. & J.C. College of Engineering';
  const location = festInfo?.collegeLocation || 'Chowdavaram, Guntur, Andhra Pradesh - 522019';
  const tagline = festInfo?.tagline || 'The Grand Symphony of Youth, Culture & Euphoria';

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          Festival Identity & Heritage
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          About {festName}
        </h1>
        <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          "{tagline}"
        </p>
      </div>

      {/* Hero Overview Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0e1224] border border-purple-900/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs">
          <div className="flex items-center space-x-2 text-pink-400 font-semibold">
            <Calendar className="w-4 h-4" />
            <span>{festInfo?.startDate || 'March 12'} to {festInfo?.endDate || 'March 14, 2026'}</span>
          </div>
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
            <MapPin className="w-4 h-4" />
            <span>{college}, {location}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-900/60 text-purple-200 font-bold uppercase tracking-wider text-[10px]">
            {festInfo?.edition || 'National Cultural Fest'}
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            The Pinnacle of Collegiate Expression
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
            {festInfo?.description || 'COLORIDO 2K26 is the premier annual youth and cultural festival of RVR & JC College of Engineering, Guntur. Spanning 3 electrifying days, it unites thousands of students across the nation in an explosion of dance, music, fine arts, theatre, and athletics.'}
          </p>
        </div>
      </div>

      {/* History & Heritage of RVRJC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f1326] border border-purple-900/30 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">College Heritage & Legacy</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {festInfo?.history || 'Established in 1985 under the patronage of Nagarjuna Education Society, R.V.R. & J.C. College of Engineering is an autonomous institution celebrated for academic excellence and vibrant student life.'}
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f1326] border border-purple-900/30 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">Campus & Fest Atmosphere</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {festInfo?.aboutContent || 'Set amidst the scenic 37.4-acre campus in Chowdavaram, Guntur, COLORIDO transforms RVRJC into a vibrant carnival of lights, rhythms, street performances, mega stages, food arenas, and high-energy competitions.'}
          </p>
        </div>

      </div>

      {/* Important Guidelines & Notice */}
      {festInfo?.importantNotice && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#141026] border border-amber-500/40 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 text-sm font-bold uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5" />
            <span>Important Notice & Participant Code of Conduct</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-line">
            {festInfo.importantNotice}
          </p>
        </div>
      )}

      {/* Fast Facts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0e1224] border border-purple-900/30 text-center">
          <span className="text-3xl font-black text-white">1985</span>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">College Inception</p>
        </div>
        <div className="p-4 rounded-xl bg-[#0e1224] border border-purple-900/30 text-center">
          <span className="text-3xl font-black text-pink-400">37.4</span>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Acres Campus</p>
        </div>
        <div className="p-4 rounded-xl bg-[#0e1224] border border-purple-900/30 text-center">
          <span className="text-3xl font-black text-amber-400">2,500+</span>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">OAT Seating</p>
        </div>
        <div className="p-4 rounded-xl bg-[#0e1224] border border-purple-900/30 text-center">
          <span className="text-3xl font-black text-cyan-400">100%</span>
          <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Cultural Spirit</p>
        </div>
      </div>

    </div>
  );
}
