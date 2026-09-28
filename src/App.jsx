import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatModal from './components/AIChatModal';

import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import SchedulePage from './pages/SchedulePage';
import MapPage from './pages/MapPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminResults from "./pages/AdminResults";

import {
  fetchFestInfo,
  fetchCategories,
  fetchEvents,
  fetchVenues,
  fetchSchedule,
  fetchMapLocations,
  fetchGallery,
  fetchContacts
} from './services/api';

function AppLayout({ festInfo, events, categories, venues, schedule, mapLocations, gallery, contacts, reloadData }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 flex flex-col selection:bg-pink-500 selection:text-white">
      {/* Public Navbar (hidden on admin pages for focused workspace) */}
      {!isAdminRoute && <Navbar festInfo={festInfo} />}

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                festInfo={festInfo}
                events={events}
                categories={categories}
                gallery={gallery}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventsPage
                events={events}
                categories={categories}
                venues={venues}
              />
            }
          />
          <Route
            path="/schedule"
            element={
              <SchedulePage
                schedule={schedule}
                events={events}
                venues={venues}
              />
            }
          />
          <Route
    path="/admin/results"
    element={<AdminResults />}
/>
          {/* <Route
            path="/map"
            element={
              <MapPage
                mapLocations={mapLocations}
                events={events}
                festInfo={festInfo}
              />
            }
          /> */}
          <Route
            path="/gallery"
            element={<GalleryPage gallery={gallery} />}
          />
          <Route
            path="/about"
            element={<AboutPage festInfo={festInfo} />}
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                contacts={contacts}
                festInfo={festInfo}
              />
            }
          />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage onDataChanged={reloadData} />} />
          <Route
            path="*"
            element={
              <HomePage
                festInfo={festInfo}
                events={events}
                categories={categories}
                gallery={gallery}
              />
            }
          />
        </Routes>
      </div>
{/* {/* 
      {/* Public Footer */}
      {/* {!isAdminRoute && <Footer festInfo={festInfo} />}

      {/* Floating AI Assistant on all public pages */}
      {/* {!isAdminRoute && <AIChatModal />}   */}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [festInfo, setFestInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [mapLocations, setMapLocations] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);

  const loadData = async () => {
    try {
      const [fData, cData, eData, vData, sData, mData, gData, ctData] = await Promise.all([
        fetchFestInfo().catch(() => null),
        fetchCategories().catch(() => []),
        fetchEvents().catch(() => []),
        fetchVenues().catch(() => []),
        fetchSchedule().catch(() => []),
        fetchMapLocations().catch(() => []),
        fetchGallery().catch(() => []),
        fetchContacts().catch(() => [])
      ]);

      if (fData) setFestInfo(fData);
      setCategories(cData || []);
      setEvents(eData || []);
      setVenues(vData || []);
      setSchedule(sData || []);
      setMapLocations(mData || []);
      setGallery(gData || []);
      setContacts(ctData || []);
    } catch (err) {
      console.error('Initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 animate-spin">
          <div className="w-full h-full bg-[#0b0e1e] rounded-[14px]" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Loading COLORIDO 2K26...
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppLayout
        festInfo={festInfo}
        events={events}
        categories={categories}
        venues={venues}
        schedule={schedule}
        mapLocations={mapLocations}
        gallery={gallery}
        contacts={contacts}
        reloadData={loadData}
      />
    </BrowserRouter>
  );
}
