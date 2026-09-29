import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Trophy,
  Image as ImageIcon,
  Sparkles,
  Link
} from 'lucide-react';

import coloridoLogo from '../assets/colorido-logo.png';
import collegelogo from  '../assets/college-logo.png';

export default function HomePage({
  festInfo,
  events = [],
  categories = [],
  gallery = []
}) {
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

        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
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

              <p className="max-w-xl text-gray-400 text-base sm:text-lg leading-8">
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
                  href="/schedule"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-purple-500/30 bg-white/5 text-gray-200 font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  View Schedule
                </Link>

              </div>

              {/* Festival information */}
              <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-400">

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  <span>28–29 December 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>RVR & JC, Guntur</span>
                </div>

              </div>

            </div>

            {/* Hero Logo */}
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
          COLORIDO LEGACY SECTION
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
                food arenas, and high-energy competitions. With
                participants joining from premier institutions across
                Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu,
                COLORIDO 2K26 promises an unforgettable festival experience.
              </p>

              <a
                href="/about"
                className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-bold uppercase tracking-wide transition-colors"
              >
                READ FULL COLLEGE & FEST STORY
                <ArrowRight className="w-4 h-4" />
              </a>

            </div>


            {/* RIGHT - LOGO + COLLEGE INFORMATION */}
            <div className="relative">

              {/* Glow */}
              <div className="absolute inset-0 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">

                {/* Logo */}
                <img
                  src={collegelogo}
                  alt="COLORIDO 2K26 - R.V.R. & J.C. College of Engineering"
                  className="w-full max-w-[650px] object-contain drop-shadow-[0_25px_60px_rgba(168,85,247,0.3)]"
                />

                {/* College information BELOW logo */}
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
          EVENT CATEGORIES
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

              <a
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </a>

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
          FESTIVAL HIGHLIGHT
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

              <a
                href="/gallery"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300"
              >
                View Gallery
                <ArrowRight className="w-4 h-4" />
              </a>

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

            <a
              href="/events"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:scale-105 transition-transform"
            >
              Explore Events
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}