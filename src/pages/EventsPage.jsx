import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Sparkles, MapPin, Clock, Trophy, Users, ExternalLink } from 'lucide-react';
import EventModal from '../components/EventModal';

export default function EventsPage({ events = [], categories = [], venues = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'ALL');
  const [selectedVenue, setSelectedVenue] = useState('ALL');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  // Sync state if URL query param changes
  React.useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'ALL') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Category filter
      if (selectedCategory !== 'ALL' && e.category?.id?.toString() !== selectedCategory.toString()) {
        return false;
      }
      // Venue filter
      if (selectedVenue !== 'ALL' && e.venue?.id?.toString() !== selectedVenue.toString()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = e.name?.toLowerCase().includes(q);
        const matchesDesc = e.description?.toLowerCase().includes(q);
        const matchesCat = e.category?.name?.toLowerCase().includes(q);
        const matchesVenue = e.venue?.name?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesVenue) {
          return false;
        }
      }
      return true;
    });
  }, [events, selectedCategory, selectedVenue, searchQuery]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          COLORIDO 2K26 Competitions
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Events & Discovery
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Discover all inter-collegiate competitions at R.V.R. & J.C. College of Engineering. Registration is facilitated directly through the official Google Forms.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="space-y-4">
        
        {/* Search input and Venue dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search competitions, rules, artists..."
              className="w-full bg-[#101426] text-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-purple-900/40 focus:outline-none focus:border-pink-500 transition-colors placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap hidden sm:inline">Venue:</span>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="w-full sm:w-auto bg-[#101426] text-gray-200 text-xs rounded-xl px-3 py-2.5 border border-purple-900/40 focus:outline-none focus:border-purple-500"
            >
              <option value="ALL">All Campus Arenas</option>
              {venues.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => handleCategorySelect('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
              selectedCategory === 'ALL'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'bg-[#12162a] text-gray-400 hover:text-white border border-purple-900/30'
            }`}
          >
            All ({events.length})
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory.toString() === cat.id.toString();
            const count = events.filter(e => e.category?.id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id.toString())}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-600/30'
                    : 'bg-[#12162a] text-gray-400 hover:text-white border border-purple-900/30'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setActiveModalEvent(event)}
              className="group bg-[#0e1224] border border-purple-900/40 hover:border-pink-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-950/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Event Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={event.imageUrl || 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80'}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1224] via-[#0e1224]/30 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-900/90 text-purple-200 border border-purple-500/40 rounded-full shadow-lg">
                    {event.category?.name || 'Cultural'}
                  </span>
                </div>

                {/* Team size badge */}
                {event.teamSize && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-black/70 text-gray-200 rounded-full border border-white/10 flex items-center space-x-1">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span>{event.teamSize}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Event Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors leading-snug">
                    {event.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Metadata details */}
                <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span className="truncate">{event.venue?.name || 'TBA'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{event.eventDate} • {event.startTime} - {event.endTime}</span>
                  </div>
                  {event.prizes && (
                    <div className="flex items-center space-x-2 text-amber-300 font-semibold truncate">
                      <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{event.prizes}</span>
                    </div>
                  )}
                </div>

                {/* Action CTA */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                    View Rules & Guidelines
                  </span>
                  {event.registrationUrl ? (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center space-x-1 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-md shadow-pink-600/25 hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Register</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-500">Form soon</span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl bg-[#0f1224] border border-purple-900/30 p-8">
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white">No Competitions Found</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or category filters to discover COLORIDO events.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedVenue('ALL');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-xl text-xs font-bold hover:bg-purple-600/50"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Modal */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
        />
      )}

    </div>
  );
}
