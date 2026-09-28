import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  ShieldAlert,
  ExternalLink,
  Sparkles,
  UserCheck,
  Medal
} from 'lucide-react';

import resultService from '../services/resultService';

export default function EventModal({ event, onClose }) {
  const [results, setResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    if (!event?.id) {
      setResults([]);
      return;
    }

    const loadResults = async () => {
      try {
        setLoadingResults(true);

        const data = await resultService.getPublishedResultsByEvent(event.id);

        console.log('Event results:', data);

        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load event results:', error);
        setResults([]);
      } finally {
        setLoadingResults(false);
      }
    };

    loadResults();
  }, [event?.id]);

  if (!event) return null;

  const getPositionLabel = (position) => {
    switch (position) {
      case 'FIRST':
        return '1st Place';
      case 'SECOND':
        return '2nd Place';
      case 'THIRD':
        return '3rd Place';
      case 'SPECIAL_MENTION':
        return 'Special Mention';
      case 'PARTICIPATION':
        return 'Participation';
      default:
        return position || 'Award';
    }
  };

  const getPositionIcon = (position) => {
    switch (position) {
      case 'FIRST':
        return '🥇';
      case 'SECOND':
        return '🥈';
      case 'THIRD':
        return '🥉';
      case 'SPECIAL_MENTION':
        return '🏆';
      default:
        return '🏅';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0f1e] border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-950/80 overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ================= HERO ================= */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">

          <img
            src={
              event.imageUrl ||
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
            }
            alt={event.name || 'Event'}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1e] via-[#0c0f1e]/40 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              {event.category?.name || 'Cultural Event'}
            </span>
          </div>

          {/* Event name */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-wide leading-tight">
              {event.name || 'Event'}
            </h2>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-6 space-y-6">

          {/* Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

            {/* Date */}
            <div className="p-3 bg-[#13172b] border border-purple-900/40 rounded-xl">
              <div className="flex items-center space-x-1.5 text-purple-400 text-xs font-semibold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date</span>
              </div>

              <p className="text-sm font-bold text-white">
                {event.eventDate || 'TBA'}
              </p>
            </div>

            {/* Time */}
            <div className="p-3 bg-[#13172b] border border-purple-900/40 rounded-xl">
              <div className="flex items-center space-x-1.5 text-pink-400 text-xs font-semibold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Timings</span>
              </div>

              <p className="text-sm font-bold text-white">
                {event.startTime
                  ? `${event.startTime} - ${event.endTime || ''}`
                  : 'TBA'}
              </p>
            </div>

            {/* Venue */}
            <div className="p-3 bg-[#13172b] border border-purple-900/40 rounded-xl">
              <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Venue</span>
              </div>

              <p
                className="text-sm font-bold text-white truncate"
                title={event.venue?.name}
              >
                {event.venue?.name || 'Designated Arena'}
              </p>

              {event.venue?.landmark && (
                <p className="text-[10px] text-gray-400 truncate">
                  {event.venue.landmark}
                </p>
              )}
            </div>

            {/* Team */}
            <div className="p-3 bg-[#13172b] border border-purple-900/40 rounded-xl">
              <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-semibold mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Team Format</span>
              </div>

              <p className="text-sm font-bold text-white">
                {event.teamSize || 'Open Format'}
              </p>
            </div>
          </div>

          {/* ================= WINNERS ================= */}
          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  Event Winners
                </h3>

                <p className="text-xs text-gray-400">
                  Official published results
                </p>
              </div>
            </div>

            {/* Loading */}
            {loadingResults && (
              <div className="p-6 rounded-xl bg-[#111528] border border-purple-900/30 text-center">
                <p className="text-sm text-gray-400">
                  Loading winners...
                </p>
              </div>
            )}

            {/* No results */}
            {!loadingResults && results.length === 0 && (
              <div className="p-6 rounded-xl bg-[#111528] border border-purple-900/30 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-gray-600" />

                <p className="text-sm font-semibold text-gray-400">
                  Winners not announced yet
                </p>

                <p className="text-xs text-gray-600 mt-1">
                  Results will appear here after they are published by the admin.
                </p>
              </div>
            )}

            {/* Results */}
            {!loadingResults && results.length > 0 && (
              <div className="space-y-3">

                {results.map((result) => (

                  <div
                    key={result.id}
                    className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-[#17132d] to-[#111528] border border-purple-500/20"
                  >

                    <div className="flex items-center gap-4">

                      {/* Medal */}
                      <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/10 border border-purple-400/20 flex items-center justify-center">
                        <span className="text-2xl">
                          {getPositionIcon(result.position)}
                        </span>
                      </div>

                      {/* Winner information */}
                      <div className="flex-1 min-w-0">

                        <p className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                          {getPositionLabel(result.position)}
                        </p>

                        {/* PARTICIPANT NAME */}
                        <h4 className="text-lg sm:text-xl font-black text-white break-words">
                          {result.participantName ||
                            result.participant_name ||
                            result.name ||
                            'Winner name unavailable'}
                        </h4>

                        {/* TEAM */}
                        {result.teamName && (
                          <p className="text-sm text-gray-300 mt-1">
                            Team:{' '}
                            <span className="font-semibold text-pink-300">
                              {result.teamName}
                            </span>
                          </p>
                        )}

                        {/* COLLEGE */}
                        {result.collegeName && (
                          <p className="text-xs text-gray-400 mt-1">
                            {result.collegeName}
                          </p>
                        )}

                        {/* SCORE */}
                        {result.score && (
                          <p className="text-xs text-amber-400 mt-2 font-semibold">
                            Score: {result.score}
                          </p>
                        )}

                        {/* REMARKS */}
                        {result.remarks && (
                          <p className="text-xs text-gray-500 mt-1">
                            {result.remarks}
                          </p>
                        )}

                      </div>

                      {/* Trophy */}
                      <Medal className="hidden sm:block w-6 h-6 text-yellow-400 shrink-0" />

                    </div>
                  </div>

                ))}

              </div>
            )}
          </div>

          {/* ================= PRIZES ================= */}
          {event.prizes && (
            <div className="p-4 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/20 border border-amber-500/30 rounded-xl flex items-start space-x-3">

              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Prize Pool & Honors
                </h4>

                <p className="text-sm text-gray-200 font-semibold mt-0.5">
                  {event.prizes}
                </p>
              </div>

            </div>
          )}

          {/* ================= DESCRIPTION ================= */}
          {event.description && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">
                Overview
              </h4>

              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}

          {/* ================= RULES ================= */}
          {event.rules && (
            <div className="p-4 bg-[#111528] border border-purple-900/30 rounded-xl space-y-2">

              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Rules & Regulations</span>
              </div>

              <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                {event.rules}
              </div>

            </div>
          )}

          {/* ================= COORDINATORS ================= */}
          {(event.coordinatorName || event.coordinatorContact) && (
            <div className="flex items-center space-x-3 p-3 bg-purple-950/20 border border-purple-800/30 rounded-xl text-xs">

              <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />

              <div>

                <span className="text-gray-400">
                  Event Coordinators:{' '}
                </span>

                <span className="text-white font-medium">
                  {event.coordinatorName || 'Not specified'}
                </span>

                {event.coordinatorContact && (
                  <span className="text-pink-400 ml-2 font-mono">
                    ({event.coordinatorContact})
                  </span>
                )}

              </div>
            </div>
          )}

        </div>

        {/* ================= FOOTER ================= */}
        <div className="p-4 sm:p-6 bg-[#090c18] border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">

          <div className="text-center sm:text-left">

            <p className="text-xs text-gray-400">
              Official RVRJC Student Registration
            </p>

            <p className="text-[11px] text-purple-300">
              Opens Google Form in a new tab
            </p>

          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors"
            >
              Close
            </button>

            {event.registrationUrl ? (

              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 hover:scale-105 active:scale-95 transition-all"
              >

                <Sparkles className="w-4 h-4 mr-2 text-amber-300" />

                Register Now

                <ExternalLink className="w-3.5 h-3.5 ml-2" />

              </a>

            ) : (

              <span className="text-xs text-gray-500 px-4 py-2 bg-white/5 rounded-xl">
                Registration opening soon
              </span>

            )}

          </div>
        </div>

      </div>
    </div>
  );
}