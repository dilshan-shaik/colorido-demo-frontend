import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Trophy,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

import coloridoLogo from '../assets/colorido-logo.png';
import collegelogo from '../assets/college-logo.png';

export default function HomePage({
  festInfo,
  events = [],
  categories = [],
  gallery = []
}) {

  /* =====================================================
     COUNTDOWN TIMER
     COLORIDO 2K26 STARTS:
     28 DECEMBER 2026 - 12:00 AM IST
  ===================================================== */

  const targetDate = new Date(
    '2026-12-28T00:00:00+05:30'
  ).getTime();

  const calculateTimeLeft = () => {

    const difference = targetDate - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      )
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft()
  );

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* =====================================================
     EVENTS
  ===================================================== */

  const featuredEvents = events
    .filter((event) => event.featured)
    .slice(0, 6);

  const displayEvents =
    featuredEvents.length > 0
      ? featuredEvents
      : events.slice(0, 6);

  const displayGallery = gallery.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#070913] text-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative min-h-screen flex items-center overflow-hidden pt-24">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />

          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />

        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* HERO CONTENT */}

            <div className="space-y-7">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-widest">

                <Sparkles className="w-4 h-4" />

                COLORIDO 2K26

              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight">

                Where

                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                  Passion
                </span>

                <span className="block">
                  Meets Culture.
                </span>

              </h1>

              <p className="max-w-xl text-base sm:text-lg text-gray-400 leading-8">

                The premier youth and cultural festival of
                R.V.R. & J.C. College of Engineering, Guntur.
                Experience music, dance, fine arts, theatre,
                competitions and unforgettable moments.

              </p>

              <div className="flex flex-wrap gap-4">

                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300"
                >

                  Explore Events

                  <ArrowRight className="w-4 h-4" />

                </Link>

                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-purple-500/30 bg-white/5 text-gray-200 font-bold text-sm hover:bg-white/10 transition-colors"
                >

                  <Calendar className="w-4 h-4" />

                  View Schedule

                </Link>

              </div>

              <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-400">

                <div className="flex items-center gap-2">

                  <Calendar className="w-4 h-4 text-pink-400" />

                  <span>
                    28–29 December 2026
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <MapPin className="w-4 h-4 text-purple-400" />

                  <span>
                    RVR & JC, Guntur
                  </span>

                </div>

              </div>

            </div>

            {/* HERO LOGO */}

            <div className="relative flex items-center justify-center">

              <div className="absolute w-[70%] h-[70%] bg-purple-600/20 blur-[100px] rounded-full" />

              <img
                src={coloridoLogo}
                alt="COLORIDO 2K26"
                className="relative z-10 w-full max-w-[650px] object-contain drop-shadow-[0_30px_80px_rgba(168,85,247,0.3)]"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
    COUNTDOWN TIMER
===================================================== */}

<section className="relative py-20 px-6 overflow-hidden">

  {/* Background glow */}

  <div className="absolute inset-0 pointer-events-none">

    <div className="absolute top-10 left-[15%] w-72 h-72 bg-purple-600/20 rounded-full blur-[120px]" />

    <div className="absolute bottom-0 right-[15%] w-72 h-72 bg-pink-600/20 rounded-full blur-[120px]" />

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-600/10 rounded-full blur-[100px]" />

  </div>


  <div className="relative max-w-6xl mx-auto">

    {/* Main timer container */}

    <div className="relative overflow-hidden rounded-[2rem] border border-purple-500/30 bg-gradient-to-br from-[#16102d] via-[#0c1024] to-[#210d26] p-7 sm:p-10 lg:p-14 shadow-[0_0_80px_rgba(139,92,246,0.12)]">

      {/* Decorative circles */}

      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-purple-500/10" />

      <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full border border-pink-500/10" />


      {/* Small decorative dots */}

      <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

      <div className="absolute top-12 right-12 w-2 h-2 rounded-full bg-pink-400 animate-pulse" />

      <div className="absolute bottom-10 left-16 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />


      <div className="relative z-10 text-center">

        {/* Label */}

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-md">

          <span className="relative flex h-2 w-2">

            <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 animate-ping" />

            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400" />

          </span>

          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-purple-300">

            COLORIDO 2K26

          </span>

        </div>


        {/* Heading */}

        <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">

          <span className="text-white">
            The Celebration
          </span>

          <br />

          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">

            Begins In

          </span>

        </h2>


        <p className="mt-4 text-sm sm:text-base text-gray-400">

          Get ready for two unforgettable days of music,
          culture, competition and celebration.

        </p>


        {/* Countdown */}

        <div className="mt-10 flex justify-center">

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 w-full max-w-4xl">


            {/* DAYS */}

            <div className="group relative">

              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-purple-500/60 to-purple-900/20 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl bg-[#0b0e1c]/95 backdrop-blur-xl px-4 py-6 sm:px-6 sm:py-8 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tabular-nums bg-gradient-to-b from-white to-purple-300 bg-clip-text text-transparent">

                  {String(timeLeft.days).padStart(2, '0')}

                </div>

                <div className="mt-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-purple-400">

                  Days

                </div>

              </div>

            </div>


            {/* HOURS */}

            <div className="group relative">

              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-pink-500/60 to-pink-900/20 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl bg-[#0b0e1c]/95 backdrop-blur-xl px-4 py-6 sm:px-6 sm:py-8 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tabular-nums bg-gradient-to-b from-white to-pink-300 bg-clip-text text-transparent">

                  {String(timeLeft.hours).padStart(2, '0')}

                </div>

                <div className="mt-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-pink-400">

                  Hours

                </div>

              </div>

            </div>


            {/* MINUTES */}

            <div className="group relative">

              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/60 to-cyan-900/20 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl bg-[#0b0e1c]/95 backdrop-blur-xl px-4 py-6 sm:px-6 sm:py-8 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tabular-nums bg-gradient-to-b from-white to-cyan-300 bg-clip-text text-transparent">

                  {String(timeLeft.minutes).padStart(2, '0')}

                </div>

                <div className="mt-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-cyan-400">

                  Minutes

                </div>

              </div>

            </div>


            {/* SECONDS */}

            <div className="group relative">

              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/60 to-amber-900/20 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl bg-[#0b0e1c]/95 backdrop-blur-xl px-4 py-6 sm:px-6 sm:py-8 border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black tabular-nums bg-gradient-to-b from-white to-amber-300 bg-clip-text text-transparent">

                  {String(timeLeft.seconds).padStart(2, '0')}

                </div>

                <div className="mt-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-amber-400">

                  Seconds

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Date */}

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">

          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-purple-500/50" />

          <p className="text-xs sm:text-sm font-bold text-gray-400 tracking-wide">

            28 — 29 DECEMBER 2026

          </p>

          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-pink-500/50" />

        </div>


        <p className="mt-3 text-xs text-gray-500">

          R.V.R. & J.C. College of Engineering · Chowdavaram, Guntur

        </p>

      </div>

    </div>

  </div>

</section>


      {/* =====================================================
          COLORIDO LEGACY
      ===================================================== */}

      <section className="relative py-24 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT */}

            <div className="space-y-7">

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">

                <Sparkles className="w-4 h-4" />

                THE COLORIDO LEGACY

              </span>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">

                Where Passion,
                <br />

                Rhythms & Culture
                <br />

                Collide.

              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-8">

                COLORIDO 2K26 is the premier annual youth and cultural
                festival of R.V.R. & J.C. College of Engineering, Guntur.
                Spanning <strong className="text-white">2 electrifying days</strong>,
                it unites students across the region in an explosion of
                dance, music, fine arts, theatre, and competitions.

              </p>

              <p className="text-sm sm:text-base text-gray-400 leading-7">

                Set amidst the scenic 37.4-acre campus in Chowdavaram,
                Guntur, COLORIDO transforms RVRJC into a vibrant carnival
                of lights, rhythms, street performances, mega stages,
                food arenas, and high-energy competitions.

              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-bold uppercase tracking-wide transition-colors"
              >

                READ FULL COLLEGE & FEST STORY

                <ArrowRight className="w-4 h-4" />

              </Link>

            </div>


            {/* RIGHT */}

            <div className="relative">

              <div className="absolute inset-0 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">

                <img
                  src={collegelogo}
                  alt="COLORIDO 2K26 - R.V.R. & J.C. College of Engineering"
                  className="w-full max-w-[650px] object-contain drop-shadow-[0_25px_60px_rgba(168,85,247,0.3)]"
                />

                <div className="mt-5 w-full max-w-[650px]">

                  <div className="px-6 py-5 rounded-2xl bg-[#0b0e1e]/95 backdrop-blur-md border border-purple-500/40 shadow-2xl">

                    <p className="text-base sm:text-lg font-bold text-white">

                      RVR & JC College of Engineering

                    </p>

                    <p className="text-sm text-gray-400 mt-1">

                      Estd. 1985 · Autonomous Institution

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      {categories.length > 0 && (

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="text-center mb-12">

              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">

                Discover

              </span>

              <h2 className="text-4xl sm:text-5xl font-black mt-2">

                Explore Categories

              </h2>

              <p className="text-gray-400 mt-3">

                Something for every passion.

              </p>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {categories.map((category) => (

                <div
                  key={category.id}
                  className="p-6 rounded-2xl bg-[#0f1224] border border-purple-900/40 hover:border-pink-500/40 transition-all"
                >

                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">

                    <Sparkles className="w-5 h-5 text-purple-400" />

                  </div>

                  <h3 className="font-bold text-white">

                    {category.name}

                  </h3>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FEATURED EVENTS
      ===================================================== */}

      {displayEvents.length > 0 && (

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">

              <div>

                <span className="text-xs font-bold uppercase tracking-widest text-pink-400">

                  What's happening

                </span>

                <h2 className="text-4xl sm:text-5xl font-black mt-2">

                  Featured Events

                </h2>

              </div>

              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300"
              >

                View All

                <ArrowRight className="w-4 h-4" />

              </Link>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {displayEvents.map((event) => (

                <div
                  key={event.id}
                  className="group overflow-hidden rounded-2xl bg-[#0f1224] border border-purple-900/40 hover:border-pink-500/40 transition-all"
                >

                  <div className="relative h-52 overflow-hidden">

                    <img
                      src={
                        event.imageUrl ||
                        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'
                      }
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1224] to-transparent" />

                    {event.featured && (

                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-pink-600 text-white text-[10px] font-bold uppercase">

                        Featured

                      </span>

                    )}

                  </div>


                  <div className="p-5">

                    <p className="text-xs text-purple-400 font-bold uppercase mb-2">

                      {event.category?.name || 'Event'}

                    </p>

                    <h3 className="text-xl font-bold text-white">

                      {event.name}

                    </h3>

                    {event.description && (

                      <p className="text-sm text-gray-400 mt-2 line-clamp-2">

                        {event.description}

                      </p>

                    )}

                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">

                      {event.eventDate && (

                        <span className="flex items-center gap-1">

                          <Calendar className="w-3.5 h-3.5 text-pink-400" />

                          {event.eventDate}

                        </span>

                      )}

                      {event.venue?.name && (

                        <span className="flex items-center gap-1">

                          <MapPin className="w-3.5 h-3.5 text-purple-400" />

                          {event.venue.name}

                        </span>

                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FESTIVAL HIGHLIGHTS
      ===================================================== */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/50 via-[#10142a] to-pink-950/30 p-8 sm:p-12">

            <div className="absolute -right-20 -top-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />

            <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="text-center">

                <Calendar className="w-8 h-8 mx-auto text-pink-400 mb-3" />

                <p className="text-3xl font-black text-white">

                  28–29

                </p>

                <p className="text-sm text-gray-400 mt-1">

                  December 2026

                </p>

              </div>


              <div className="text-center">

                <Trophy className="w-8 h-8 mx-auto text-amber-400 mb-3" />

                <p className="text-3xl font-black text-white">

                  2 Days

                </p>

                <p className="text-sm text-gray-400 mt-1">

                  Competitions & Celebrations

                </p>

              </div>


              <div className="text-center">

                <MapPin className="w-8 h-8 mx-auto text-cyan-400 mb-3" />

                <p className="text-3xl font-black text-white">

                  RVRJC

                </p>

                <p className="text-sm text-gray-400 mt-1">

                  Chowdavaram, Guntur

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      {displayGallery.length > 0 && (

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            <div className="flex items-end justify-between mb-10">

              <div>

                <span className="text-xs font-bold uppercase tracking-widest text-pink-400">

                  Moments

                </span>

                <h2 className="text-4xl sm:text-5xl font-black mt-2">

                  Festival Gallery

                </h2>

              </div>


              <Link
                to="/gallery"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300"
              >

                View Gallery

                <ArrowRight className="w-4 h-4" />

              </Link>

            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {displayGallery.map((item) => (

                <div
                  key={item.id}
                  className="relative h-52 sm:h-64 overflow-hidden rounded-2xl bg-[#0f1224] border border-purple-900/30 group"
                >

                  {item.imageUrl ? (

                    <img
                      src={item.imageUrl}
                      alt={item.title || 'COLORIDO Gallery'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center">

                      <ImageIcon className="w-10 h-10 text-purple-500/40" />

                    </div>

                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">

                    {item.title && (

                      <p className="text-sm font-bold text-white">

                        {item.title}

                      </p>

                    )}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="py-24">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-xl shadow-purple-900/30">

            <Trophy className="w-8 h-8 text-white" />

          </div>


          <h2 className="text-4xl sm:text-6xl font-black">

            Be Part of

            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">

              COLORIDO 2K26

            </span>

          </h2>


          <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-7">

            Two days of competition, creativity, music, culture and
            unforgettable memories at R.V.R. & J.C. College of Engineering.

          </p>


          <div className="flex justify-center gap-4 mt-8">

            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:scale-105 transition-transform"
            >

              Explore Events

              <ArrowRight className="w-4 h-4" />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}