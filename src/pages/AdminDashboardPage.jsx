import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Users,
  Trophy,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Check,
  AlertCircle,
  ExternalLink,
  Eye,
  RefreshCw,
  Sparkles,
  Utensils
} from 'lucide-react';

import {
  fetchFestInfo,
  updateFestInfo,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  fetchVenues,
  createVenue,
  updateVenue,
  deleteVenue,
  fetchSchedule,
  createScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,
  fetchMapLocations,
  createMapLocation,
  updateMapLocation,
  deleteMapLocation,
  fetchGallery,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
  fetchDashboardStats,
  uploadImage
} from '../services/api';

import { clearAuth, getUser, isAuthenticated } from '../services/auth';

import AdminResults from './AdminResults';


export default function AdminDashboardPage({ onDataChanged }) {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');

  const [loading, setLoading] = useState(false);

  const [actionSuccess, setActionSuccess] = useState('');

  const [actionError, setActionError] = useState('');


  // ==============================
  // DATA STATES
  // ==============================

  const [stats, setStats] = useState(null);

  const [fest, setFest] = useState(null);

  const [categories, setCategories] = useState([]);

  const [events, setEvents] = useState([]);

  const [venues, setVenues] = useState([]);

  const [schedule, setSchedule] = useState([]);

  const [mapLocations, setMapLocations] = useState([]);

  const [gallery, setGallery] = useState([]);

  const [contacts, setContacts] = useState([]);


  // ==============================
  // MODAL / FORM STATES
  // ==============================

  const [modalType, setModalType] = useState(null);

  const [currentEditItem, setCurrentEditItem] = useState(null);

  const [formData, setFormData] = useState({});


  // ==============================
  // INITIAL LOAD
  // ==============================

  useEffect(() => {

    if (!isAuthenticated()) {

      navigate('/admin/login');

      return;

    }

    loadAllData();

  }, []);


  // ==============================
  // LOAD ALL DATA
  // ==============================

  const loadAllData = async () => {

    setLoading(true);

    try {

      const [
        sData,
        fData,
        cData,
        eData,
        vData,
        schData,
        mData,
        gData,
        ctData
      ] = await Promise.all([

        fetchDashboardStats(),

        fetchFestInfo(),

        fetchCategories(),

        fetchEvents(),

        fetchVenues(),

        fetchSchedule(),

        fetchMapLocations(true),

        fetchGallery(),

        fetchContacts()

      ]);


      setStats(sData);

      setFest(fData);

      setCategories(cData);

      setEvents(eData);

      setVenues(vData);

      setSchedule(schData);

      setMapLocations(mData);

      setGallery(gData);

      setContacts(ctData);

    } catch (err) {

      console.error(
        'Error loading data:',
        err
      );

      setActionError(
        'Error loading dashboard data: ' +
        err.message
      );

    } finally {

      setLoading(false);

    }

  };


  // ==============================
  // NOTIFICATIONS
  // ==============================

  const showNotification = (
    msg,
    isError = false
  ) => {

    if (isError) {

      setActionError(msg);

      setTimeout(
        () => setActionError(''),
        4500
      );

    } else {

      setActionSuccess(msg);

      setTimeout(
        () => setActionSuccess(''),
        3500
      );

    }

  };


  // ==============================
  // GLOBAL SYNC
  // ==============================

  const triggerGlobalSync = () => {

    loadAllData();

    if (onDataChanged) {

      onDataChanged();

    }

  };


  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {

    clearAuth();

    if (onDataChanged) {

      onDataChanged();

    }

    navigate('/');

  };


  // ==============================
  // OPEN MODAL
  // ==============================

  const openModal = (
    type,
    item = null
  ) => {

    setModalType(type);

    setCurrentEditItem(item);


    if (item) {

      setFormData({

        ...item,

        categoryId:
          item.category?.id ||
          item.categoryId ||
          (categories[0]?.id || ''),

        venueId:
          item.venue?.id ||
          item.venueId ||
          '',

        eventId:
          item.event?.id ||
          item.eventId ||
          ''

      });

    } else {

      // ==============================
      // EVENT DEFAULTS
      // ==============================

      if (type.includes('event')) {

        setFormData({

          name: '',

          categoryId:
            categories[0]?.id || '',

          venueId:
            venues[0]?.id || '',

          description: '',

          rules: '',

          teamSize: 'Solo (1)',

          prizes:
            '1st: ₹10,000 | 2nd: ₹5,000',

          eventDate:
            fest?.startDate ||
            '2026-03-12',

          startTime: '10:00 AM',

          endTime: '01:00 PM',

          registrationUrl:
            'https://forms.gle/colorido2k26-demo',

          imageUrl:
            'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',

          isFeatured: false,

          status: 'OPEN',

          coordinatorName: '',

          coordinatorContact: ''

        });

      }

      // ==============================
      // CATEGORY DEFAULTS
      // ==============================

      else if (type.includes('cat')) {

        setFormData({

          name: '',

          slug: '',

          description: '',

          icon: 'Sparkles',

          displayOrder:
            categories.length + 1

        });

      }

      // ==============================
      // VENUE DEFAULTS
      // ==============================

      else if (type.includes('venue')) {

        setFormData({

          name: '',

          code: '',

          description: '',

          capacity: 1000,

          landmark: '',

          mapX: 50.0,

          mapY: 50.0

        });

      }

      // ==============================
      // SCHEDULE DEFAULTS
      // ==============================

      else if (type.includes('schedule')) {

        setFormData({

          title: '',

          eventId:
            events[0]?.id || '',

          venueId:
            venues[0]?.id || '',

          dayNumber: 1,

          scheduleDate:
            fest?.startDate ||
            '2026-03-12',

          startTime: '10:00 AM',

          endTime: '01:00 PM',

          description: '',

          type: 'EVENT'

        });

      }

      // ==============================
      // MAP DEFAULTS
      // ==============================

      else if (type.includes('map')) {

        setFormData({

          name: '',

          category: 'VENUE',

          description: '',

          posX: 50.0,

          posY: 50.0,

          icon: 'stage',

          venueId:
            venues[0]?.id || '',

          isActive: true

        });

      }

      // ==============================
      // GALLERY DEFAULTS
      // ==============================

      else if (type.includes('gallery')) {

        setFormData({

          title: '',

          category: 'CROWD',

          imageUrl:
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',

          description: '',

          year: '2025',

          isFeatured: false,

          displayOrder:
            gallery.length + 1

        });

      }

      // ==============================
      // CONTACT DEFAULTS
      // ==============================

      else if (type.includes('contact')) {

        setFormData({

          name: '',

          role: 'Student Coordinator',

          department: 'Cultural Affairs',

          phone: '+91 ',

          email: '',

          type: 'STUDENT',

          displayOrder:
            contacts.length + 1

        });

      }

    }

  };


  // ==============================
  // CLOSE MODAL
  // ==============================

  const closeModal = () => {

    setModalType(null);

    setCurrentEditItem(null);

    setFormData({});

  };


  // ==============================
  // GENERIC FORM SUBMIT
  // ==============================

  const handleFormSubmit = async (e) => {

    e.preventDefault();


    const payload = {
      ...formData
    };


    if (
      payload.venueId === '' ||
      payload.venueId === 0 ||
      payload.venueId === '0'
    ) {

      payload.venueId = null;

    }


    if (
      payload.categoryId === '' ||
      payload.categoryId === 0 ||
      payload.categoryId === '0'
    ) {

      payload.categoryId = null;

    }


    if (
      payload.eventId === '' ||
      payload.eventId === 0 ||
      payload.eventId === '0'
    ) {

      payload.eventId = null;

    }


    try {

      if (
        modalType === 'create_event'
      ) {

        await createEvent(payload);

        showNotification(
          'Event created successfully!'
        );

      }

      else if (
        modalType === 'edit_event'
      ) {

        await updateEvent(
          currentEditItem.id,
          payload
        );

        showNotification(
          'Event updated successfully!'
        );

      }

      else if (
        modalType === 'create_cat'
      ) {

        await createCategory(payload);

        showNotification(
          'Category created successfully!'
        );

      }

      else if (
        modalType === 'edit_cat'
      ) {

        await updateCategory(
          currentEditItem.id,
          payload
        );

        showNotification(
          'Category updated successfully!'
        );

      }

      else if (
        modalType === 'create_venue'
      ) {

        await createVenue(payload);

        showNotification(
          'Venue created successfully!'
        );

      }

      else if (
        modalType === 'edit_venue'
      ) {

        await updateVenue(
          currentEditItem.id,
          payload
        );

        showNotification(
          'Venue updated successfully!'
        );

      }

      else if (
        modalType === 'create_schedule'
      ) {

        await createScheduleItem(payload);

        showNotification(
          'Schedule item created successfully!'
        );

      }

      else if (
        modalType === 'edit_schedule'
      ) {

        await updateScheduleItem(
          currentEditItem.id,
          payload
        );

        showNotification(
          'Schedule item updated successfully!'
        );

      }

      else if (
        modalType === 'create_map'
      ) {

        await createMapLocation(payload);

        showNotification(
          'Map marker created successfully!'
        );

      }

      else if (
        modalType === 'edit_map'
      ) {

        await updateMapLocation(
          currentEditItem.id,
          payload
        );

        showNotification(
          'Map marker updated successfully!'
        );

      }

      else if (
        modalType === 'create_gallery'
      ) {

        await addGalleryImage(payload);

        showNotification(
          'Gallery image added successfully!'
        );

      }

      else if (
        modalType === 'edit_gallery'
      ) {

        await updateGalleryImage(
          currentEditItem.id,
          payload
        );

        showNotification(
          'Gallery image updated successfully!'
        );

      }

      else if (
        modalType === 'create_contact'
      ) {

        await createContact(payload);

        showNotification(
          'Contact added successfully!'
        );

      }

      else if (
        modalType === 'edit_contact'
      ) {

        await updateContact(
          currentEditItem.id,
          payload
        );

        showNotification(
          'Contact updated successfully!'
        );

      }


      closeModal();

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // DELETE EVENT
  // ==============================

  const handleDeleteEvent = async (id) => {

    if (
      !window.confirm(
        'Are you sure you want to delete this event?'
      )
    ) return;


    try {

      await deleteEvent(id);

      showNotification(
        'Event deleted successfully.'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // DELETE CATEGORY
  // ==============================

  const handleDeleteCategory = async (id) => {

    if (
      !window.confirm(
        'Delete category? Note: Events assigned to it will be affected.'
      )
    ) return;


    try {

      await deleteCategory(id);

      showNotification(
        'Category deleted successfully.'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // DELETE VENUE
  // ==============================

  const handleDeleteVenue = async (id) => {

    if (
      !window.confirm(
        'Delete venue?'
      )
    ) return;


    try {

      await deleteVenue(id);

      showNotification(
        'Venue deleted successfully.'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // DELETE SCHEDULE
  // ==============================

  const handleDeleteSchedule = async (id) => {

    if (
      !window.confirm(
        'Delete schedule item?'
      )
    ) return;


    try {

      await deleteScheduleItem(id);

      showNotification(
        'Schedule item deleted successfully.'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // DELETE MAP
  // ==============================

  const handleDeleteMap = async (id) => {

    if (
      !window.confirm(
        'Delete map marker?'
      )
    ) return;


    try {

      await deleteMapLocation(id);

      showNotification(
        'Map marker deleted successfully.'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // DELETE GALLERY
  // ==============================

  const handleDeleteGallery = async (id) => {

    if (
      !window.confirm(
        'Delete gallery image?'
      )
    ) return;


    try {

      await deleteGalleryImage(id);

      showNotification(
        'Gallery image deleted successfully.'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // DELETE CONTACT
  // ==============================

  const handleDeleteContact = async (id) => {

    if (
      !window.confirm(
        'Delete coordinator contact?'
      )
    ) return;


    try {

      await deleteContact(id);

      showNotification(
        'Contact deleted successfully.'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // FEST UPDATE
  // ==============================

  const handleFestUpdate = async (e) => {

    e.preventDefault();


    try {

      await updateFestInfo(fest);

      showNotification(
        'Fest configuration saved to live database!'
      );

      triggerGlobalSync();

    } catch (err) {

      showNotification(
        err.message,
        true
      );

    }

  };


  // ==============================
  // JSX
  // ==============================

  return (

    <div className="min-h-screen bg-[#070913] text-gray-200 flex flex-col">


      {/* ======================================
          TOP NAVBAR
      ====================================== */}

      <header className="bg-[#0c1022] border-b border-purple-900/40 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-40">

        <div className="flex items-center space-x-3">

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 flex items-center justify-center shadow-md">

            <div className="w-full h-full bg-[#0d1020] rounded-[10px] flex items-center justify-center">

              <Shield className="w-5 h-5 text-pink-400" />

            </div>

          </div>


          <div>

            <h1 className="text-base sm:text-lg font-black text-white flex items-center space-x-2">

              <span>
                COLORIDO Admin
              </span>

              <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">

                Live Source of Truth

              </span>

            </h1>


            <p className="text-[10px] text-gray-400">

              R.V.R. & J.C. College of Engineering

            </p>

          </div>

        </div>


        <div className="flex items-center space-x-3">

          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-colors"
          >

            <Eye className="w-3.5 h-3.5 text-pink-400" />

            <span className="hidden sm:inline">
              View Public Website
            </span>

          </Link>


          <button
            onClick={triggerGlobalSync}
            title="Refresh All Data"
            className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >

            <RefreshCw
              className={`w-4 h-4 ${
                loading
                  ? 'animate-spin'
                  : ''
              }`}
            />

          </button>


          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-semibold transition-colors"
          >

            <LogOut className="w-3.5 h-3.5" />

            <span className="hidden sm:inline">
              Logout
            </span>

          </button>

        </div>

      </header>


      {/* ======================================
          NOTIFICATIONS
      ====================================== */}

      {actionSuccess && (

        <div className="bg-emerald-950/90 border-b border-emerald-500/50 text-emerald-300 px-4 py-2.5 text-xs font-bold flex items-center justify-center space-x-2 animate-in fade-in">

          <Check className="w-4 h-4 text-emerald-400" />

          <span>
            {actionSuccess}
          </span>

        </div>

      )}


      {actionError && (

        <div className="bg-red-950/90 border-b border-red-500/50 text-red-300 px-4 py-2.5 text-xs font-bold flex items-center justify-center space-x-2 animate-in fade-in">

          <AlertCircle className="w-4 h-4 text-red-400" />

          <span>
            {actionError}
          </span>

        </div>

      )}


      {/* ======================================
          MAIN ADMIN WORKSPACE
      ====================================== */}

      <div className="flex-1 flex flex-col md:flex-row">


        {/* ======================================
            SIDEBAR
        ====================================== */}

        <aside className="w-full md:w-64 bg-[#0a0d1a] border-r border-purple-900/30 p-4 space-y-1 shrink-0">

          {[

            {
              id: 'overview',
              label: 'Overview',
              icon: LayoutDashboard
            },

            {
              id: 'events',
              label: 'Events & Rules',
              icon: Trophy,
              count: events.length
            },

            // NEW RESULTS OPTION
            {
              id: 'results',
              label: 'Results & Winners',
              icon: Trophy
            },

            {
              id: 'categories',
              label: 'Categories',
              icon: Sparkles,
              count: categories.length
            },

            {
              id: 'schedule',
              label: 'Schedule Items',
              icon: Calendar,
              count: schedule.length
            },

            {
              id: 'venues',
              label: 'Venues',
              icon: MapPin,
              count: venues.length
            },

            {
              id: 'map',
              label: 'Map & Food Stalls',
              icon: Utensils,
              count: mapLocations.length
            },

            {
              id: 'gallery',
              label: 'Gallery Images',
              icon: ImageIcon,
              count: gallery.length
            },

            {
              id: 'fest',
              label: 'Fest Information',
              icon: Settings
            },

            {
              id: 'contacts',
              label: 'Coordinators',
              icon: Users,
              count: contacts.length
            }

          ].map((item) => {

            const Icon = item.icon;

            const isActive =
              activeTab === item.id;


            return (

              <button
                key={item.id}
                onClick={() =>
                  setActiveTab(item.id)
                }
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >

                <div className="flex items-center space-x-2.5">

                  <Icon className="w-4 h-4 shrink-0" />

                  <span>
                    {item.label}
                  </span>

                </div>


                {item.count !== undefined && (

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-gray-400'
                    }`}
                  >

                    {item.count}

                  </span>

                )}

              </button>

            );

          })}


          <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-gray-400 space-y-1">

            <p className="font-bold text-gray-300">
              Live Database Sync:
            </p>

            <p>
              MySQL / MariaDB on 3306
            </p>

            <p className="text-pink-400">
              COLORIDO AI Context Live
            </p>

          </div>

        </aside>


        {/* ======================================
            CONTENT AREA
        ====================================== */}

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">


          {/* ======================================
              OVERVIEW
          ====================================== */}

          {activeTab === 'overview' && (

            <div className="space-y-8">

              <div>

                <h2 className="text-2xl font-black text-white">
                  Festival Control Center
                </h2>

                <p className="text-xs text-gray-400 mt-1">

                  All updates made here update the
                  public festival site and the COLORIDO
                  AI Assistant in real time.

                </p>

              </div>


              {/* STATS */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="p-5 rounded-2xl bg-[#0f1326] border border-purple-900/40">

                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Total Events
                  </span>

                  <p className="text-3xl font-black text-white mt-1">
                    {stats?.totalEvents || events.length}
                  </p>

                  <p className="text-[10px] text-pink-400 mt-1">
                    Non-Technical Competitions
                  </p>

                </div>


                <div className="p-5 rounded-2xl bg-[#0f1326] border border-purple-900/40">

                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Categories
                  </span>

                  <p className="text-3xl font-black text-white mt-1">
                    {stats?.totalCategories || categories.length}
                  </p>

                  <p className="text-[10px] text-purple-400 mt-1">
                    Dynamic Verticals
                  </p>

                </div>


                <div className="p-5 rounded-2xl bg-[#0f1326] border border-purple-900/40">

                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Campus Venues
                  </span>

                  <p className="text-3xl font-black text-white mt-1">
                    {stats?.totalVenues || venues.length}
                  </p>

                  <p className="text-[10px] text-amber-400 mt-1">
                    Including OAT & Auditorium
                  </p>

                </div>


                <div className="p-5 rounded-2xl bg-[#0f1326] border border-purple-900/40">

                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Map Markers
                  </span>

                  <p className="text-3xl font-black text-white mt-1">
                    {stats?.totalMapLocations || mapLocations.length}
                  </p>

                  <p className="text-[10px] text-emerald-400 mt-1">
                    Including Food Stall Area
                  </p>

                </div>

              </div>


              {/* QUICK ACTIONS */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                <div className="p-6 rounded-2xl bg-[#0e1224] border border-purple-900/30 space-y-4">

                  <h3 className="text-base font-bold text-white flex items-center space-x-2">

                    <Sparkles className="w-4 h-4 text-pink-400" />

                    <span>
                      Quick Management Actions
                    </span>

                  </h3>


                  <div className="grid grid-cols-2 gap-3">


                    <button
                      onClick={() =>
                        openModal('create_event')
                      }
                      className="p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 text-xs font-bold text-left flex items-center space-x-2"
                    >

                      <Plus className="w-4 h-4 text-pink-400" />

                      <span>
                        Add New Event
                      </span>

                    </button>


                    <button
                      onClick={() =>
                        openModal('create_schedule')
                      }
                      className="p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 text-xs font-bold text-left flex items-center space-x-2"
                    >

                      <Plus className="w-4 h-4 text-amber-400" />

                      <span>
                        Add Schedule Item
                      </span>

                    </button>


                    <button
                      onClick={() =>
                        openModal('create_map')
                      }
                      className="p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 text-xs font-bold text-left flex items-center space-x-2"
                    >

                      <Plus className="w-4 h-4 text-cyan-400" />

                      <span>
                        Add Map Marker
                      </span>

                    </button>


                    <button
                      onClick={() =>
                        openModal('create_gallery')
                      }
                      className="p-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 text-xs font-bold text-left flex items-center space-x-2"
                    >

                      <Plus className="w-4 h-4 text-emerald-400" />

                      <span>
                        Add Photo
                      </span>

                    </button>


                    {/* NEW RESULTS BUTTON */}

                    <button
                      onClick={() =>
                        setActiveTab('results')
                      }
                      className="p-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-200 text-xs font-bold text-left flex items-center space-x-2 col-span-2"
                    >

                      <Trophy className="w-4 h-4 text-amber-400" />

                      <span>
                        Enter Event Results
                      </span>

                    </button>


                  </div>

                </div>


                {/* FEST SUMMARY */}

                <div className="p-6 rounded-2xl bg-[#0e1224] border border-purple-900/30 space-y-3">

                  <h3 className="text-base font-bold text-white">
                    Current Fest Configuration
                  </h3>

                  <div className="text-xs space-y-2 text-gray-300">

                    <p>
                      <strong>Fest Name:</strong>{' '}
                      {fest?.festName}
                    </p>

                    <p>
                      <strong>College:</strong>{' '}
                      {fest?.collegeName}
                    </p>

                    <p>
                      <strong>Tagline:</strong>{' '}
                      "{fest?.tagline}"
                    </p>

                    <p>
                      <strong>Dates:</strong>{' '}
                      {fest?.startDate} to {fest?.endDate}
                    </p>

                    <p>
                      <strong>Google Forms Linked:</strong>{' '}
                      {events.filter(
                        e => e.registrationUrl
                      ).length}{' '}
                      of {events.length} events
                    </p>

                  </div>


                  <button
                    onClick={() =>
                      setActiveTab('fest')
                    }
                    className="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300"
                  >

                    Edit Fest Details →

                  </button>

                </div>

              </div>

            </div>

          )}


          {/* ======================================
              RESULTS & WINNERS
          ====================================== */}

          {activeTab === 'results' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <Trophy className="w-6 h-6 text-amber-400" />

                    <h2 className="text-2xl font-black text-white">
                      Results & Winners
                    </h2>

                  </div>


                  <p className="text-xs text-gray-400 mt-1">

                    Enter, edit and publish winners
                    for COLORIDO 2K26 events.

                  </p>

                </div>

              </div>


              <div className="rounded-2xl bg-[#0e1224] border border-purple-900/40 p-4 sm:p-6">

                <AdminResults />

              </div>

            </div>

          )}


          {/* ======================================
              EVENTS
          ====================================== */}

          {activeTab === 'events' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    Events Management
                  </h2>

                  <p className="text-xs text-gray-400">
                    Manage competitions, venues,
                    rules, prizes, and Google Form
                    registration links.
                  </p>

                </div>


                <button
                  onClick={() =>
                    openModal('create_event')
                  }
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg"
                >

                  <Plus className="w-4 h-4" />

                  <span>
                    Create Event
                  </span>

                </button>

              </div>


              <div className="bg-[#0e1224] border border-purple-900/40 rounded-2xl overflow-x-auto shadow-xl">

                <table className="w-full text-left text-xs">

                  <thead className="bg-[#12162d] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/5">

                    <tr>

                      <th className="p-4">
                        Event Name
                      </th>

                      <th className="p-4">
                        Category
                      </th>

                      <th className="p-4">
                        Venue
                      </th>

                      <th className="p-4">
                        Date & Time
                      </th>

                      <th className="p-4">
                        Registration URL
                      </th>

                      <th className="p-4">
                        Featured
                      </th>

                      <th className="p-4 text-right">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-white/5 text-gray-300">

                    {events.map((evt) => (

                      <tr
                        key={evt.id}
                        className="hover:bg-white/[0.02]"
                      >

                        <td className="p-4 font-bold text-white flex items-center space-x-3">

                          <img
                            src={
                              evt.imageUrl ||
                              'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=100&q=80'
                            }
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover shrink-0"
                          />

                          <span className="truncate max-w-[200px]">
                            {evt.name}
                          </span>

                        </td>


                        <td className="p-4">

                          <span className="px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 text-[10px] font-bold">

                            {evt.category?.name ||
                              'Unassigned'}

                          </span>

                        </td>


                        <td className="p-4 truncate max-w-[150px]">

                          {evt.venue?.name ||
                            'TBA'}

                        </td>


                        <td className="p-4 whitespace-nowrap">

                          {evt.eventDate}

                          <br />

                          <span className="text-[10px] text-gray-500">

                            {evt.startTime}

                          </span>

                        </td>


                        <td className="p-4">

                          {evt.registrationUrl ? (

                            <a
                              href={evt.registrationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-pink-400 hover:text-pink-300 truncate max-w-[120px] block font-mono text-[11px]"
                            >

                              Google Form

                            </a>

                          ) : (

                            <span className="text-gray-500">
                              None
                            </span>

                          )}

                        </td>


                        <td className="p-4">

                          {evt.isFeatured ? (

                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">

                              Featured

                            </span>

                          ) : (

                            <span className="text-gray-500 text-[10px]">
                              Standard
                            </span>

                          )}

                        </td>


                        <td className="p-4 text-right whitespace-nowrap">

                          <button
                            onClick={() =>
                              openModal(
                                'edit_event',
                                evt
                              )
                            }
                            className="p-1.5 text-purple-400 hover:text-white hover:bg-purple-900/40 rounded-lg mr-1"
                            title="Edit Event"
                          >

                            <Edit className="w-4 h-4" />

                          </button>


                          <button
                            onClick={() =>
                              handleDeleteEvent(
                                evt.id
                              )
                            }
                            className="p-1.5 text-red-400 hover:text-white hover:bg-red-900/40 rounded-lg"
                            title="Delete Event"
                          >

                            <Trash2 className="w-4 h-4" />

                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}


          {/* ======================================
              CATEGORIES
          ====================================== */}

          {activeTab === 'categories' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    Event Categories
                  </h2>

                  <p className="text-xs text-gray-400">
                    Manage dynamic non-technical categories.
                    Technical events are excluded as per
                    COLORIDO fest rules.
                  </p>

                </div>


                <button
                  onClick={() =>
                    openModal('create_cat')
                  }
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >

                  <Plus className="w-4 h-4" />

                  <span>
                    Add Category
                  </span>

                </button>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {categories.map((cat) => (

                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-[#0e1224] border border-purple-900/40 flex flex-col justify-between space-y-3"
                  >

                    <div className="space-y-2">

                      <div className="flex items-center justify-between">

                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-gray-400 bg-white/5">

                          Order:
                          {' '}
                          {cat.displayOrder || 1}

                        </span>


                        <div className="flex items-center space-x-1">

                          <button
                            onClick={() =>
                              openModal(
                                'edit_cat',
                                cat
                              )
                            }
                            className="p-1 text-purple-400 hover:text-white"
                          >

                            <Edit className="w-3.5 h-3.5" />

                          </button>


                          <button
                            onClick={() =>
                              handleDeleteCategory(
                                cat.id
                              )
                            }
                            className="p-1 text-red-400 hover:text-white"
                          >

                            <Trash2 className="w-3.5 h-3.5" />

                          </button>

                        </div>

                      </div>


                      <h3 className="text-base font-bold text-white">
                        {cat.name}
                      </h3>


                      <p className="text-xs text-gray-400 line-clamp-2">
                        {cat.description}
                      </p>

                    </div>


                    <div className="text-[11px] text-gray-500 font-mono">

                      slug:
                      {' '}
                      {cat.slug}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}


          {/* ======================================
              SCHEDULE
          ====================================== */}

          {activeTab === 'schedule' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    Timeline & Schedule
                  </h2>

                  <p className="text-xs text-gray-400">
                    Manage chronological festival sessions,
                    ceremonies, competitions, and pro-nights
                    across 3 days.
                  </p>

                </div>


                <button
                  onClick={() =>
                    openModal(
                      'create_schedule'
                    )
                  }
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >

                  <Plus className="w-4 h-4" />

                  <span>
                    Add Schedule Item
                  </span>

                </button>

              </div>


              <div className="bg-[#0e1224] border border-purple-900/40 rounded-2xl overflow-x-auto shadow-xl">

                <table className="w-full text-left text-xs">

                  <thead className="bg-[#12162d] text-gray-400 uppercase text-[10px] tracking-wider border-b border-white/5">

                    <tr>

                      <th className="p-4">
                        Day
                      </th>

                      <th className="p-4">
                        Timings
                      </th>

                      <th className="p-4">
                        Title
                      </th>

                      <th className="p-4">
                        Venue
                      </th>

                      <th className="p-4">
                        Type
                      </th>

                      <th className="p-4 text-right">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-white/5 text-gray-300">

                    {schedule.map((item) => (

                      <tr
                        key={item.id}
                        className="hover:bg-white/[0.02]"
                      >

                        <td className="p-4 font-bold text-white">
                          Day {item.dayNumber}
                        </td>

                        <td className="p-4 font-mono text-[11px] whitespace-nowrap text-amber-400">

                          {item.startTime}
                          {' - '}
                          {item.endTime}

                        </td>

                        <td className="p-4 font-semibold text-white truncate max-w-[220px]">

                          {item.title}

                        </td>

                        <td className="p-4 truncate max-w-[150px]">

                          {item.venue?.name ||
                            'TBA'}

                        </td>

                        <td className="p-4">

                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5">

                            {item.type}

                          </span>

                        </td>

                        <td className="p-4 text-right whitespace-nowrap">

                          <button
                            onClick={() =>
                              openModal(
                                'edit_schedule',
                                item
                              )
                            }
                            className="p-1.5 text-purple-400 hover:text-white mr-1"
                          >

                            <Edit className="w-4 h-4" />

                          </button>


                          <button
                            onClick={() =>
                              handleDeleteSchedule(
                                item.id
                              )
                            }
                            className="p-1.5 text-red-400 hover:text-white"
                          >

                            <Trash2 className="w-4 h-4" />

                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}


          {/* ======================================
              VENUES
          ====================================== */}

          {activeTab === 'venues' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    Campus Venues
                  </h2>

                  <p className="text-xs text-gray-400">
                    Manage physical college stages,
                    auditoriums, and open arenas across
                    the 37.4-acre RVRJC campus.
                  </p>

                </div>


                <button
                  onClick={() =>
                    openModal('create_venue')
                  }
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >

                  <Plus className="w-4 h-4" />

                  <span>
                    Add Venue
                  </span>

                </button>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {venues.map((v) => (

                  <div
                    key={v.id}
                    className="p-5 rounded-2xl bg-[#0e1224] border border-purple-900/40 space-y-3"
                  >

                    <div className="flex items-center justify-between">

                      <span className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 font-mono text-[10px]">

                        {v.code || 'VENUE'}

                      </span>


                      <div className="flex items-center space-x-1">

                        <button
                          onClick={() =>
                            openModal(
                              'edit_venue',
                              v
                            )
                          }
                          className="p-1 text-purple-400 hover:text-white"
                        >

                          <Edit className="w-3.5 h-3.5" />

                        </button>


                        <button
                          onClick={() =>
                            handleDeleteVenue(
                              v.id
                            )
                          }
                          className="p-1 text-red-400 hover:text-white"
                        >

                          <Trash2 className="w-3.5 h-3.5" />

                        </button>

                      </div>

                    </div>


                    <div>

                      <h3 className="text-base font-bold text-white">
                        {v.name}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {v.description}
                      </p>

                    </div>


                    <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400 space-y-1">

                      {v.landmark && (

                        <p>
                          <strong>
                            Landmark:
                          </strong>{' '}
                          {v.landmark}
                        </p>

                      )}

                      {v.capacity && (

                        <p>
                          <strong>
                            Capacity:
                          </strong>{' '}
                          {v.capacity.toLocaleString()}
                          {' seats'}
                        </p>

                      )}

                      <p className="font-mono text-purple-400">

                        Map Pos:
                        {' '}
                        X: {v.mapX}%
                        {' | '}
                        Y: {v.mapY}%

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}


          {/* ======================================
              MAP
          ====================================== */}

          {activeTab === 'map' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    Campus Map & Food Stall Area
                  </h2>

                  <p className="text-xs text-gray-400">
                    Manage map markers. Notice:
                    Food Stall Area is represented as a
                    dedicated map location marker as specified.
                  </p>

                </div>


                <button
                  onClick={() =>
                    openModal('create_map')
                  }
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >

                  <Plus className="w-4 h-4" />

                  <span>
                    Add Map Marker
                  </span>

                </button>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {mapLocations.map((loc) => (

                  <div
                    key={loc.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      loc.category === 'FOOD'
                        ? 'bg-gradient-to-br from-amber-950/30 to-[#0e1224] border-amber-500/40'
                        : 'bg-[#0e1224] border-purple-900/40'
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          loc.category === 'FOOD'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-purple-900/60 text-purple-300'
                        }`}
                      >

                        {loc.category}

                      </span>


                      <div className="flex items-center space-x-1">

                        <button
                          onClick={() =>
                            openModal(
                              'edit_map',
                              loc
                            )
                          }
                          className="p-1 text-purple-400 hover:text-white"
                        >

                          <Edit className="w-3.5 h-3.5" />

                        </button>


                        <button
                          onClick={() =>
                            handleDeleteMap(
                              loc.id
                            )
                          }
                          className="p-1 text-red-400 hover:text-white"
                        >

                          <Trash2 className="w-3.5 h-3.5" />

                        </button>

                      </div>

                    </div>


                    <div>

                      <h3 className="text-base font-bold text-white flex items-center space-x-2">

                        {loc.category === 'FOOD' && (

                          <Utensils className="w-4 h-4 text-amber-400 shrink-0" />

                        )}

                        <span>
                          {loc.name}
                        </span>

                      </h3>


                      <p className="text-xs text-gray-300 mt-1">
                        {loc.description}
                      </p>

                    </div>


                    <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400 flex items-center justify-between">

                      <span className="font-mono text-purple-400">

                        Pos:
                        {' '}
                        {loc.posX}% X
                        {' / '}
                        {loc.posY}% Y

                      </span>


                      <span
                        className={
                          loc.isActive
                            ? 'text-emerald-400 font-bold'
                            : 'text-gray-500'
                        }
                      >

                        {loc.isActive
                          ? 'Active'
                          : 'Inactive'}

                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}


          {/* ======================================
              GALLERY
          ====================================== */}

          {activeTab === 'gallery' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    Gallery Images
                  </h2>

                  <p className="text-xs text-gray-400">
                    Upload or link high-resolution fest
                    photos. Visible on the public Gallery
                    and Memories section.
                  </p>

                </div>


                <button
                  onClick={() =>
                    openModal('create_gallery')
                  }
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >

                  <Plus className="w-4 h-4" />

                  <span>
                    Add Photo
                  </span>

                </button>

              </div>


              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                {gallery.map((img) => (

                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden bg-[#0e1224] border border-purple-900/40 aspect-[4/3]"
                  >

                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />


                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">

                      <div className="flex items-center justify-between">

                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-purple-600 text-white">

                          {img.category}

                        </span>


                        <div className="flex items-center space-x-1">

                          <button
                            onClick={() =>
                              openModal(
                                'edit_gallery',
                                img
                              )
                            }
                            className="p-1 text-white hover:text-purple-300"
                          >

                            <Edit className="w-3.5 h-3.5" />

                          </button>


                          <button
                            onClick={() =>
                              handleDeleteGallery(
                                img.id
                              )
                            }
                            className="p-1 text-red-400 hover:text-red-300"
                          >

                            <Trash2 className="w-3.5 h-3.5" />

                          </button>

                        </div>

                      </div>


                      <div>

                        <p className="text-xs font-bold text-white truncate">
                          {img.title}
                        </p>

                        <p className="text-[10px] text-gray-400 font-mono">
                          {img.year}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}


          {/* ======================================
              FEST INFO
          ====================================== */}

          {activeTab === 'fest' && (

            <div className="max-w-3xl space-y-6">

              <div>

                <h2 className="text-2xl font-black text-white">
                  Festival Information
                </h2>

                <p className="text-xs text-gray-400">
                  Update the official tagline, dates,
                  descriptions, and code of conduct in
                  the live database.
                </p>

              </div>


              {fest && (

                <form
                  onSubmit={handleFestUpdate}
                  className="p-6 rounded-2xl bg-[#0e1224] border border-purple-900/40 space-y-4"
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Fest Name
                      </label>

                      <input
                        type="text"
                        value={fest.festName || ''}
                        onChange={(e) =>
                          setFest({
                            ...fest,
                            festName:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Edition Title
                      </label>

                      <input
                        type="text"
                        value={fest.edition || ''}
                        onChange={(e) =>
                          setFest({
                            ...fest,
                            edition:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Official Tagline
                    </label>

                    <input
                      type="text"
                      value={fest.tagline || ''}
                      onChange={(e) =>
                        setFest({
                          ...fest,
                          tagline:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-semibold"
                    />

                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Start Date (YYYY-MM-DD)
                      </label>

                      <input
                        type="text"
                        value={fest.startDate || ''}
                        onChange={(e) =>
                          setFest({
                            ...fest,
                            startDate:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        End Date (YYYY-MM-DD)
                      </label>

                      <input
                        type="text"
                        value={fest.endDate || ''}
                        onChange={(e) =>
                          setFest({
                            ...fest,
                            endDate:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Description (Home Page)
                    </label>

                    <textarea
                      rows={3}
                      value={fest.description || ''}
                      onChange={(e) =>
                        setFest({
                          ...fest,
                          description:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      RVRJC Heritage & History
                    </label>

                    <textarea
                      rows={3}
                      value={fest.history || ''}
                      onChange={(e) =>
                        setFest({
                          ...fest,
                          history:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Campus Atmosphere
                    </label>

                    <textarea
                      rows={3}
                      value={fest.aboutContent || ''}
                      onChange={(e) =>
                        setFest({
                          ...fest,
                          aboutContent:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Important Notice / Guidelines
                    </label>

                    <textarea
                      rows={3}
                      value={fest.importantNotice || ''}
                      onChange={(e) =>
                        setFest({
                          ...fest,
                          importantNotice:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 text-amber-200"
                    />

                  </div>


                  <div className="pt-2">

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                    >

                      Save Live Fest Configuration

                    </button>

                  </div>

                </form>

              )}

            </div>

          )}


          {/* ======================================
              CONTACTS
          ====================================== */}

          {activeTab === 'contacts' && (

            <div className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-black text-white">
                    Coordinators & Help Desk
                  </h2>

                  <p className="text-xs text-gray-400">
                    Manage faculty and student
                    coordinators, phone numbers,
                    and official emails.
                  </p>

                </div>


                <button
                  onClick={() =>
                    openModal('create_contact')
                  }
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >

                  <Plus className="w-4 h-4" />

                  <span>
                    Add Coordinator
                  </span>

                </button>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {contacts.map((c) => (

                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-[#0e1224] border border-purple-900/40 space-y-3"
                  >

                    <div className="flex items-center justify-between">

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/5 text-purple-300">

                        {c.type}

                      </span>


                      <div className="flex items-center space-x-1">

                        <button
                          onClick={() =>
                            openModal(
                              'edit_contact',
                              c
                            )
                          }
                          className="p-1 text-purple-400 hover:text-white"
                        >

                          <Edit className="w-3.5 h-3.5" />

                        </button>


                        <button
                          onClick={() =>
                            handleDeleteContact(
                              c.id
                            )
                          }
                          className="p-1 text-red-400 hover:text-white"
                        >

                          <Trash2 className="w-3.5 h-3.5" />

                        </button>

                      </div>

                    </div>


                    <div>

                      <h3 className="text-base font-bold text-white">
                        {c.name}
                      </h3>

                      <p className="text-xs text-pink-400">
                        {c.role}
                      </p>

                      <p className="text-[11px] text-gray-400">
                        {c.department}
                      </p>

                    </div>


                    <div className="pt-2 border-t border-white/5 text-xs text-gray-400 space-y-1">

                      <p className="font-mono text-purple-300">
                        {c.phone}
                      </p>

                      <p className="truncate">
                        {c.email}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </main>

      </div>


      {/* ======================================
          CRUD MODAL
      ====================================== */}

      {modalType && (

        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl max-h-[90vh] bg-[#0c1022] border border-purple-900/60 rounded-2xl p-6 overflow-y-auto space-y-5 shadow-2xl">


            <div className="flex items-center justify-between border-b border-white/10 pb-3">

              <h3 className="text-lg font-bold text-white uppercase tracking-wider">

                {modalType.replace('_', ' ')}

              </h3>


              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-sm"
              >

                ✕

              </button>

            </div>


            <form
              onSubmit={handleFormSubmit}
              className="space-y-4"
            >


              {/* EVENT FIELDS */}

              {modalType.includes('event') && (

                <>

                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Event Name
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Category
                      </label>

                      <select
                        value={
                          formData.categoryId ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categoryId:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                        required
                      >

                        <option value="">
                          Select Category
                        </option>

                        {categories.map((c) => (

                          <option
                            key={c.id}
                            value={c.id}
                          >
                            {c.name}
                          </option>

                        ))}

                      </select>

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Venue
                      </label>

                      <select
                        value={
                          formData.venueId ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            venueId:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="">
                          Select Venue
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


                  <div className="grid grid-cols-3 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Date
                      </label>

                      <input
                        type="text"
                        value={
                          formData.eventDate ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            eventDate:
                              e.target.value
                          })
                        }
                        placeholder="2026-03-12"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Start Time
                      </label>

                      <input
                        type="text"
                        value={
                          formData.startTime ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime:
                              e.target.value
                          })
                        }
                        placeholder="10:00 AM"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        End Time
                      </label>

                      <input
                        type="text"
                        value={
                          formData.endTime ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            endTime:
                              e.target.value
                          })
                        }
                        placeholder="01:00 PM"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-pink-400 mb-1">

                      Registration Google Form URL (Crucial)

                    </label>

                    <input
                      type="url"
                      value={
                        formData.registrationUrl ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationUrl:
                            e.target.value
                        })
                      }
                      placeholder="https://forms.gle/..."
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-pink-500/40 font-mono"
                    />

                  </div>


                  <div className="grid grid-cols-3 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Team Size
                      </label>

                      <input
                        type="text"
                        value={
                          formData.teamSize ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            teamSize:
                              e.target.value
                          })
                        }
                        placeholder="e.g. 6-16 Members"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Prizes Pool
                      </label>

                      <input
                        type="text"
                        value={
                          formData.prizes ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            prizes:
                              e.target.value
                          })
                        }
                        placeholder="1st: ₹30,000 | 2nd: ₹18,000"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Event Status
                      </label>

                      <select
                        value={
                          formData.status ||
                          'OPEN'
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="OPEN">
                          OPEN
                        </option>

                        <option value="CLOSING_SOON">
                          CLOSING_SOON
                        </option>

                        <option value="COMPLETED">
                          COMPLETED
                        </option>

                      </select>

                    </div>

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Coordinator Name
                      </label>

                      <input
                        type="text"
                        value={
                          formData.coordinatorName ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coordinatorName:
                              e.target.value
                          })
                        }
                        placeholder="Prof. Name / Student Lead"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Coordinator Phone
                      </label>

                      <input
                        type="text"
                        value={
                          formData.coordinatorContact ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coordinatorContact:
                              e.target.value
                          })
                        }
                        placeholder="+91 98480 12345"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Image URL
                    </label>

                    <input
                      type="text"
                      value={
                        formData.imageUrl ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          imageUrl:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                    />

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Description
                    </label>

                    <textarea
                      rows={2}
                      value={
                        formData.description ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Rules & Regulations
                    </label>

                    <textarea
                      rows={3}
                      value={
                        formData.rules ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rules:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="flex items-center space-x-2 pt-2">

                    <input
                      type="checkbox"
                      id="featCheck"
                      checked={
                        formData.isFeatured ||
                        false
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isFeatured:
                            e.target.checked
                        })
                      }
                      className="w-4 h-4 rounded text-purple-600"
                    />

                    <label
                      htmlFor="featCheck"
                      className="text-xs font-bold text-gray-300"
                    >
                      Mark as Featured Event
                      (Shown on Home Page)
                    </label>

                  </div>

                </>

              )}


              {/* CATEGORY FIELDS */}

              {modalType.includes('cat') && (

                <>

                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Category Name
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        formData.name ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Slug
                    </label>

                    <input
                      type="text"
                      value={
                        formData.slug ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          slug:
                            e.target.value
                        })
                      }
                      placeholder="e.g. dance-battles"
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                    />

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Description
                    </label>

                    <textarea
                      rows={2}
                      value={
                        formData.description ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>

                </>

              )}


              {/* VENUE FIELDS */}

              {modalType.includes('venue') && (

                <>

                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Venue Name
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        formData.name ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Code
                      </label>

                      <input
                        type="text"
                        value={
                          formData.code ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            code:
                              e.target.value
                          })
                        }
                        placeholder="OAT"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Capacity
                      </label>

                      <input
                        type="number"
                        value={
                          formData.capacity ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            capacity:
                              parseInt(
                                e.target.value
                              ) || 0
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Landmark
                    </label>

                    <input
                      type="text"
                      value={
                        formData.landmark ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          landmark:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Map X Coordinate (%)
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        value={
                          formData.mapX ||
                          50
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mapX:
                              parseFloat(
                                e.target.value
                              ) || 0
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Map Y Coordinate (%)
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        value={
                          formData.mapY ||
                          50
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mapY:
                              parseFloat(
                                e.target.value
                              ) || 0
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>

                  </div>

                </>

              )}


              {/* SCHEDULE FIELDS */}

              {modalType.includes('schedule') && (

                <>

                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Schedule Item Title
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        formData.title ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-3 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Day Number
                      </label>

                      <select
                        value={
                          formData.dayNumber ||
                          1
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dayNumber:
                              parseInt(
                                e.target.value
                              ) || 1
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value={1}>
                          Day 1
                        </option>

                        <option value={2}>
                          Day 2
                        </option>

                        <option value={3}>
                          Day 3
                        </option>

                      </select>

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Start Time
                      </label>

                      <input
                        type="text"
                        value={
                          formData.startTime ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        End Time
                      </label>

                      <input
                        type="text"
                        value={
                          formData.endTime ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            endTime:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Linked Venue
                      </label>

                      <select
                        value={
                          formData.venueId ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            venueId:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="">
                          Select Venue
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


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Schedule Type
                      </label>

                      <select
                        value={
                          formData.type ||
                          'EVENT'
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            type:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="EVENT">
                          EVENT
                        </option>

                        <option value="CULTURAL_NIGHT">
                          CULTURAL_NIGHT
                        </option>

                        <option value="CEREMONY">
                          CEREMONY
                        </option>

                        <option value="BREAK">
                          BREAK
                        </option>

                      </select>

                    </div>

                  </div>

                </>

              )}


              {/* MAP FIELDS */}

              {modalType.includes('map') && (

                <>

                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Location Name
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        formData.name ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Category
                      </label>

                      <select
                        value={
                          formData.category ||
                          'VENUE'
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="FOOD">
                          FOOD
                        </option>

                        <option value="VENUE">
                          VENUE
                        </option>

                        <option value="SPORTS">
                          SPORTS
                        </option>

                        <option value="ENTRY">
                          ENTRY
                        </option>

                        <option value="FACILITY">
                          FACILITY
                        </option>

                      </select>

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Icon Style
                      </label>

                      <select
                        value={
                          formData.icon ||
                          'stage'
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            icon:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="utensils">
                          utensils
                        </option>

                        <option value="stage">
                          stage
                        </option>

                        <option value="trophy">
                          trophy
                        </option>

                        <option value="info">
                          info
                        </option>

                        <option value="heart-pulse">
                          heart-pulse
                        </option>

                        <option value="car">
                          car
                        </option>

                      </select>

                    </div>

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Description
                    </label>

                    <textarea
                      rows={2}
                      value={
                        formData.description ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Position X (%)
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        value={
                          formData.posX ||
                          50
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            posX:
                              parseFloat(
                                e.target.value
                              ) || 0
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Position Y (%)
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        value={
                          formData.posY ||
                          50
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            posY:
                              parseFloat(
                                e.target.value
                              ) || 0
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>

                  </div>

                </>

              )}


              {/* GALLERY FIELDS */}

              {modalType.includes('gallery') && (

                <>

                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Photo Title
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        formData.title ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Category
                      </label>

                      <select
                        value={
                          formData.category ||
                          'CROWD'
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="CROWD">
                          CROWD
                        </option>

                        <option value="MUSIC">
                          MUSIC
                        </option>

                        <option value="DANCE">
                          DANCE
                        </option>

                        <option value="CAMPUS">
                          CAMPUS
                        </option>

                        <option value="SPORTS">
                          SPORTS
                        </option>

                      </select>

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Year
                      </label>

                      <input
                        type="text"
                        value={
                          formData.year ||
                          '2025'
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            year:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>

                  </div>


                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Image URL
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        formData.imageUrl ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          imageUrl:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                    />

                  </div>


                  <div className="flex items-center space-x-2 pt-2">

                    <input
                      type="checkbox"
                      id="featGal"
                      checked={
                        formData.isFeatured ||
                        false
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isFeatured:
                            e.target.checked
                        })
                      }
                      className="w-4 h-4 rounded text-purple-600"
                    />

                    <label
                      htmlFor="featGal"
                      className="text-xs font-bold text-gray-300"
                    >
                      Feature on Home Page Memories
                    </label>

                  </div>

                </>

              )}


              {/* CONTACT FIELDS */}

              {modalType.includes('contact') && (

                <>

                  <div>

                    <label className="block text-xs font-bold text-gray-400 mb-1">
                      Full Name
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        formData.name ||
                        ''
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name:
                            e.target.value
                        })
                      }
                      className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                    />

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Role
                      </label>

                      <input
                        type="text"
                        value={
                          formData.role ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role:
                              e.target.value
                          })
                        }
                        placeholder="Faculty Convener / Student Lead"
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Type
                      </label>

                      <select
                        value={
                          formData.type ||
                          'STUDENT'
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            type:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      >

                        <option value="FACULTY">
                          FACULTY
                        </option>

                        <option value="STUDENT">
                          STUDENT
                        </option>

                        <option value="HELP_DESK">
                          HELP_DESK
                        </option>

                      </select>

                    </div>

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Phone
                      </label>

                      <input
                        type="text"
                        value={
                          formData.phone ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40 font-mono"
                      />

                    </div>


                    <div>

                      <label className="block text-xs font-bold text-gray-400 mb-1">
                        Email
                      </label>

                      <input
                        type="email"
                        value={
                          formData.email ||
                          ''
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email:
                              e.target.value
                          })
                        }
                        className="w-full bg-[#13172b] text-white text-xs rounded-xl p-2.5 border border-purple-900/40"
                      />

                    </div>

                  </div>

                </>

              )}


              {/* MODAL ACTIONS */}

              <div className="pt-4 border-t border-white/10 flex items-center justify-end space-x-3">

                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:bg-white/5"
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-md"
                >

                  Save to Database

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}