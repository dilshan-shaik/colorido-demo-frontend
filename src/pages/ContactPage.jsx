import React, { useState } from 'react';
import { Phone, Mail, MapPin, User, Building, HelpCircle, Shield, Sparkles } from 'lucide-react';

export default function ContactPage({ contacts = [], festInfo }) {
  const [filterType, setFilterType] = useState('ALL');

  const filteredContacts = contacts.filter((c) => {
    if (filterType === 'ALL') return true;
    return c.type === filterType;
  });

  const facultyContacts = contacts.filter(c => c.type === 'FACULTY');
  const studentContacts = contacts.filter(c => c.type === 'STUDENT');
  const helpDeskContacts = contacts.filter(c => c.type === 'HELP_DESK');

  const college = festInfo?.collegeName || 'R.V.R. & J.C. College of Engineering';
  const location = festInfo?.collegeLocation || 'Chowdavaram, Guntur, Andhra Pradesh - 522019';

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          Organizing Committee
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Contact & Coordination
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Reach out to official faculty conveners, student coordinators, and registration help desks of {festInfo?.festName || 'COLORIDO 2K26'}.
        </p>
      </div>

      {/* Central Help Desk Banner */}
      {helpDeskContacts.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/50 via-[#13172c] to-pink-950/40 border border-pink-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">24/7 Fast Response</span>
              <h3 className="text-xl font-bold text-white">{helpDeskContacts[0].name}</h3>
              <p className="text-xs text-gray-300">{helpDeskContacts[0].department || 'Administrative Wing'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {helpDeskContacts[0].phone && (
              <a
                href={`tel:${helpDeskContacts[0].phone}`}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Helpdesk</span>
              </a>
            )}
            {helpDeskContacts[0].email && (
              <a
                href={`mailto:${helpDeskContacts[0].email}`}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10"
              >
                <Mail className="w-4 h-4" />
                <span>Email Inquiry</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-center space-x-2">
        {['ALL', 'FACULTY', 'STUDENT', 'HELP_DESK'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filterType === t
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'bg-[#12162a] text-gray-400 hover:text-white border border-purple-900/30'
            }`}
          >
            {t === 'ALL' ? 'All Leads' : t.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-6 rounded-2xl bg-[#0f1224] border border-purple-900/40 hover:border-pink-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  contact.type === 'FACULTY' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  contact.type === 'STUDENT' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                  'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {contact.type}
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                  <User className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                <p className="text-xs font-semibold text-pink-400 mt-0.5">{contact.role}</p>
                {contact.department && (
                  <p className="text-[11px] text-gray-400 mt-1">{contact.department}</p>
                )}
              </div>
            </div>

            {/* Contact details */}
            <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="font-mono">{contact.phone}</span>
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors truncate"
                  title={contact.email}
                >
                  <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* College Address & Physical Campus Info */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0e1e] border border-purple-900/40 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Physical Campus</span>
          <h3 className="text-2xl font-bold text-white">{college}</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Chandramoulipuram, Chowdavaram, Guntur, Andhra Pradesh, India - 522019.<br />
            Conveniently accessible along National Highway 16 (NH-16).
          </p>
          <div className="pt-2 text-xs text-gray-400 space-y-1">
            <p><strong>General College EPABX:</strong> 0863-2288254, 2288201</p>
            <p><strong>Official Fest Email:</strong> colorido2k26@rvrjcce.ac.in</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#12162a] border border-white/10 space-y-2 text-xs text-gray-300">
          <h4 className="font-bold text-white flex items-center space-x-1.5">
            <Shield className="w-4 h-4 text-pink-400" />
            <span>Festival Help Desk Guidelines</span>
          </h4>
          <p className="text-gray-400 leading-relaxed">
            The main registration desk is located inside the Welcome Arch at the college entrance. All registered teams must report at least 45 minutes prior to their scheduled event timings with original college identity cards.
          </p>
        </div>
      </div>

    </div>
  );
}
