import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Mail, Phone, Calendar, ArrowUp, Heart } from 'lucide-react';

export default function Footer({ festInfo }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const festName = festInfo?.festName || 'COLORIDO 2K26';
  const college = festInfo?.collegeName || 'R.V.R. & J.C. College of Engineering';
  const location = festInfo?.collegeLocation || 'Chowdavaram, Guntur, Andhra Pradesh - 522019';
  const tagline = festInfo?.tagline || 'The Grand Symphony of Youth, Culture & Euphoria';

  return (
    <footer className="relative bg-[#060810] border-t border-purple-900/30 text-gray-400 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Fest Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#090b14] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
                {festName}
              </span>
            </div>
            <p className="text-sm text-gray-300 font-medium">
              {tagline}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              The flagship annual inter-collegiate cultural fest of {college}. An electric celebration of dance, music, arts, theatre, and sports.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-950/40 border border-purple-500/30 rounded-full text-xs text-purple-300">
              <Calendar className="w-3.5 h-3.5 text-pink-400" />
              <span>{festInfo?.startDate || 'March 12'} to {festInfo?.endDate || 'March 14, 2026'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-pink-500 mr-2" />
              Festival Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-300 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-purple-300 transition-colors">Events & Discovery</Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-purple-300 transition-colors">3-Day Timeline</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-purple-300 transition-colors">Interactive Campus Map</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-purple-300 transition-colors">Festival Memories</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-300 transition-colors">About RVRJC & Fest</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-300 transition-colors">Faculty & Student Leads</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Highlights */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
              Key Arenas
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Open Air Theatre (OAT):</strong> Capacity 2,500+ attendees for Band Clash & Pro-Nights</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-pink-400 font-bold">•</span>
                <span><strong>Silver Jubilee Auditorium:</strong> Classical vocals & Inauguration</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Central Food Plaza:</strong> Official Food Stall Area with 25+ stalls</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Decennial Stage:</strong> 1v1 Street dance battles & Street plays</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Sports Arena:</strong> Gully Cricket Championship</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Institution & Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2" />
              Campus Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{college}<br />Chandramoulipuram, {location}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-gray-300">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <a href="mailto:colorido2k26@rvrjcce.ac.in" className="hover:text-white transition-colors">
                  colorido2k26@rvrjcce.ac.in
                </a>
              </div>
              <div className="flex items-center space-x-2.5 text-gray-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 863 2288254 / +91 98480 11001</span>
              </div>
              <div className="pt-2 text-[11px] text-gray-500 border-t border-white/5">
                Autonomous Institution | Estd. 1985<br />
                Affiliated to Acharya Nagarjuna University
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p className="text-center sm:text-left">
            © 2026 <span className="text-purple-300 font-semibold">{festName}</span> — R.V.R. & J.C. College of Engineering. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-purple-300 transition-colors">Guidelines</Link>
            <Link to="/contact" className="hover:text-purple-300 transition-colors">Support</Link>
            <Link to="/admin/login" className="hover:text-pink-300 transition-colors font-medium flex items-center space-x-1">
              <span>Admin Login</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 rounded-lg border border-purple-500/30 transition-all hover:scale-105 active:scale-95"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
