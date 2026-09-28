import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';

import EventModal from '../components/EventModal';

export default function SchedulePage({
  schedule = [],
  events = [],
  venues = []
}) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedVenue, setSelectedVenue] = useState('ALL');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  /*
   * COLORIDO 2K26
   * Day 1 -> December 28, 2026
   * Day 2 -> December 29, 2026
   */
  const days = [
    {
      num: 1,
      label: 'Day 1',
      date: 'December 28, 2026',
      subtitle: 'Festival Events & Competitions'
    },
    {
      num: 2,
      label: 'Day 2',
      date: 'December 29, 2026',
      subtitle: 'Festival Events & Competitions'
    }
  ];

  const filteredSchedule = useMemo(() => {
    return schedule.filter((item) => {

      // Day filter
      if (
        selectedDay !== 'ALL' &&
        item.dayNumber !== selectedDay
      ) {
        return false;
      }

      // Type filter
      if (
        selectedType !== 'ALL' &&
        item.type !== selectedType
      ) {
        return false;
      }

      // Venue filter
      if (
        selectedVenue !== 'ALL' &&
        item.venue?.id?.toString() !== selectedVenue.toString()
      ) {
        return false;
      }

      return true;
    });
  }, [
    schedule,
    selectedDay,
    selectedType,
    selectedVenue
  ]);

  const getTypeBadge = (type) => {
    switch (type) {
      case 'CULTURAL_NIGHT':
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
            Pro-Night
          </span>
        );

      case 'CEREMONY':
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Ceremony
          </span>
        );

      case 'BREAK':
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Carnival Break
          </span>
        );

      default:
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            Competition
          </span>
        );
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

      {/* ================= HEADER ================= */}
      <div className="text-center max-w-3xl mx-auto space-y-3">

        <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          COLORIDO 2K26 Agenda
        </span>

        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Festival Schedule
        </h1>

        <p className="text-xs sm:text-sm text-gray-400">
          Plan your 2-day experience at R.V.R. & J.C. College of Engineering.
          All timings and venues are dynamically updated by the festival committee.
        </p>
      </div>

      {/* ================= DAY SELECTOR ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {days.map((d) => {

          const isSelected = selectedDay === d.num;

          return (
            <button
              key={d.num}
              onClick={() => setSelectedDay(d.num)}
              className={`
                p-4 rounded-2xl text-left border
                transition-all duration-300
                flex flex-col justify-between

                ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-900/50 via-[#151934] to-pink-900/40 border-pink-500/60 shadow-xl shadow-purple-950/50'
                    : 'bg-[#0f1224] border-purple-900/30 hover:border-purple-600/40 text-gray-400'
                }
              `}
            >

              <div>

                <div className="flex items-center gap-2">

                  <Calendar
                    className={`w-4 h-4 ${
                      isSelected
                        ? 'text-pink-400'
                        : 'text-gray-500'
                    }`}
                  />

                  <span
                    className={`
                      text-xs font-bold uppercase tracking-wider
                      ${
                        isSelected
                          ? 'text-pink-400'
                          : 'text-gray-400'
                      }
                    `}
                  >
                    {d.date}
                  </span>

                </div>

                <h3
                  className={`
                    text-xl font-black mt-1
                    ${
                      isSelected
                        ? 'text-white'
                        : 'text-gray-200'
                    }
                  `}
                >
                  {d.label}
                </h3>

              </div>

              <p className="text-xs text-gray-400 mt-2">
                {d.subtitle}
              </p>

            </button>
          );
        })}

      </div>

      {/* ================= FILTER OPTIONS ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#0f1224] border border-purple-900/30 rounded-xl text-xs">

        {/* TYPE */}
        <div className="flex items-center flex-wrap gap-2">

          <span className="text-gray-400 font-semibold">
            Type:
          </span>

          {[
            'ALL',
            'EVENT',
            'CULTURAL_NIGHT',
            'CEREMONY',
            'BREAK'
          ].map((t) => (

            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`
                px-2.5 py-1 rounded-lg
                text-[11px] font-bold
                uppercase tracking-wider
                transition-colors

                ${
                  selectedType === t
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white bg-white/5'
                }
              `}
            >
              {t === 'ALL'
                ? 'All Types'
                : t.replace('_', ' ')}
            </button>

          ))}

        </div>

        {/* VENUE */}
        <div className="flex items-center space-x-2">

          <span className="text-gray-400 font-semibold">
            Venue:
          </span>

          <select
            value={selectedVenue}
            onChange={(e) =>
              setSelectedVenue(e.target.value)
            }
            className="bg-[#15192c] text-gray-200 text-xs rounded-lg px-2.5 py-1 border border-purple-800/40 focus:outline-none"
          >

            <option value="ALL">
              All Venues
            </option>

            {venues.map((v) => (
              <option
                key={v.id}
                value={v.id}
              >
                {v.name}
              </option>
            ))}

          </select>

        </div>

      </div>

      {/* ================= TIMELINE ================= */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-800/40 space-y-8">

        {filteredSchedule.map((item) => (

          <div
            key={item.id}
            className="relative group"
          >

            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full bg-[#0b0d18] border-2 border-pink-500 flex items-center justify-center">

              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />

            </div>

            {/* Timeline Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1224] border border-purple-900/40 hover:border-pink-500/40 transition-all duration-300 shadow-xl space-y-3">

              {/* TIME + TYPE */}
              <div className="flex flex-wrap items-center justify-between gap-2">

                <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">

                  <Clock className="w-3.5 h-3.5" />

                  <span>
                    {item.startTime} — {item.endTime}
                  </span>

                </div>

                {getTypeBadge(item.type)}

              </div>

              {/* TITLE */}
              <div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}

              </div>

              {/* FOOTER */}
              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">

                {/* VENUE */}
                <div className="flex items-center space-x-2 text-gray-300">

                  <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />

                  <span className="font-medium">
                    {item.venue?.name || 'Designated Area'}
                  </span>

                  {item.venue?.landmark && (
                    <span className="text-gray-500 hidden sm:inline">
                      ({item.venue.landmark})
                    </span>
                  )}

                </div>

                {/* EVENT ACTIONS */}
                {item.event && (

                  <div className="flex items-center space-x-2">

                    <button
                      onClick={() =>
                        setActiveModalEvent(item.event)
                      }
                      className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/40 text-[11px] font-bold transition-colors"
                    >
                      Event Info
                    </button>

                    {item.event.registrationUrl && (

                      <a
                        href={item.event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-[11px] font-bold shadow-sm"
                      >

                        <span>
                          Register
                        </span>

                        <ExternalLink className="w-3 h-3" />

                      </a>

                    )}

                  </div>

                )}

              </div>

            </div>

          </div>

        ))}

        {/* EMPTY */}
        {filteredSchedule.length === 0 && (

          <div className="py-12 text-center text-gray-500">

            <Clock className="w-8 h-8 mx-auto mb-2 opacity-40 text-purple-400" />

            <p className="text-xs">
              No events scheduled with the selected filters.
            </p>

          </div>

        )}

      </div>

      {/* ================= EVENT MODAL ================= */}
      {activeModalEvent && (

        <EventModal
          event={activeModalEvent}
          onClose={() =>
            setActiveModalEvent(null)
          }
        />

      )}

    </div>
  );
}