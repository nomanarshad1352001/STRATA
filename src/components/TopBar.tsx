import { useState } from 'react';
import { Menu, Bell, Search, LogOut, Settings, X, Zap } from 'lucide-react';
import { notifications } from '../data/dummyData';
import type { Page } from '../App';

interface TopBarProps {
  onToggleSidebar: () => void;
  navigateTo: (page: Page) => void;
  onLogout: () => void;
}

export default function TopBar({ onToggleSidebar, navigateTo, onLogout }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifs, setNotifs] = useState(notifications);

  const unreadCount = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));

  const searchResults = searchQuery.length > 1 ? [
    { type: 'Project', name: 'Riverside Tower Complex', page: 'project-detail' as Page },
    { type: 'Task', name: 'Steel delivery coordination', page: 'tasks' as Page },
    { type: 'Document', name: 'Architectural Plans Building A', page: 'documents' as Page },
    { type: 'RFI', name: 'RFI-001 · Column Grid Layout', page: 'rfis' as Page },
    { type: 'Budget', name: 'Structural Steel allocation', page: 'budget' as Page },
  ].filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <header className="bg-[#0a0c11]/90 backdrop-blur-xl border-b border-[#1f2533] px-5 py-3 flex items-center gap-4 relative z-30">
      <button onClick={onToggleSidebar} className="p-2 hover:bg-white/5 rounded-lg text-[#8a8f98] hover:text-white transition-colors lg:hidden">
        <Menu size={19} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
        <input
          type="text" placeholder="Search projects, tasks, documents…"
          className="w-full lux-input pl-11 pr-10 py-2.5 text-sm"
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setShowSearch(true); }}
          onFocus={() => setShowSearch(true)}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#4a5060] border border-[#2a3142] rounded px-1.5 py-0.5 font-mono-lux">⌘K</kbd>
        {showSearch && searchQuery.length > 1 && (
          <div className="absolute top-full left-0 right-0 mt-2 lux-glass lux-card rounded-2xl max-h-80 overflow-y-auto anim-modal shadow-2xl">
            {searchResults.length > 0 ? searchResults.map((r, i) => (
              <button key={i} onClick={() => { navigateTo(r.page); setShowSearch(false); setSearchQuery(''); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left border-b border-[#1f2533] last:border-0 transition-colors">
                <span className="text-[9px] font-semibold bg-[#c9a961]/15 text-[#c9a961] px-2 py-0.5 rounded uppercase tracking-wider">{r.type}</span>
                <span className="text-sm text-[#c3cbd8]">{r.name}</span>
              </button>
            )) : (
              <div className="px-4 py-8 text-center text-sm text-[#6b7280]">No results found</div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {/* Upgrade */}
        <button onClick={() => navigateTo('subscription')}
          className="hidden md:flex items-center gap-1.5 px-3.5 py-2 mr-1 rounded-lg text-[11px] font-semibold tracking-wider uppercase text-[#c9a961] border border-[#c9a961]/30 hover:bg-[#c9a961]/10 transition-all">
          <Zap size={12} /> Enterprise
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="p-2.5 hover:bg-white/5 rounded-xl relative text-[#8a8f98] hover:text-white transition-colors">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#c9a961] text-[#131008] text-[9px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(201,169,97,.6)]">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[380px] lux-glass rounded-2xl overflow-hidden anim-modal shadow-2xl border border-[#2a3142]">
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#1f2533]">
                <h3 className="font-display font-semibold text-white">Notifications</h3>
                <div className="flex items-center gap-3">
                  <button onClick={markAllRead} className="text-[11px] text-[#c9a961] hover:text-[#e8d9b8]">Mark all read</button>
                  <button onClick={() => setShowNotifications(false)} className="text-[#6b7280] hover:text-white"><X size={15} /></button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifs.map(n => (
                  <button key={n.id} onClick={() => { markRead(n.id); navigateTo(n.link as Page); setShowNotifications(false); }}
                    className={`w-full text-left px-4 py-3 border-b border-[#1f2533]/60 hover:bg-white/[.04] transition-colors ${!n.read ? 'bg-[#c9a961]/[.05]' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                        n.type === 'error' ? 'bg-rose-500' : n.type === 'warning' ? 'bg-amber-400' :
                        n.type === 'success' ? 'bg-emerald-400' : 'bg-sky-400'
                      }`} />
                      <div className="min-w-0">
                        <p className={`text-[13px] ${!n.read ? 'text-white' : 'text-[#8a8f98]'}`}>{n.message}</p>
                        <p className="text-[11px] text-[#4a5060] mt-0.5">{n.timestamp}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2.5 pl-1.5 pr-2 py-1.5 hover:bg-white/5 rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center text-[#131008] text-xs font-bold ring-2 ring-[#c9a961]/30">
              JM
            </div>
            <div className="hidden md:block text-left">
              <div className="text-[13px] font-medium text-white leading-none">John Mitchell</div>
              <div className="text-[10px] text-[#6b7280] mt-0.5">Executive Owner</div>
            </div>
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-60 lux-glass rounded-2xl overflow-hidden anim-modal shadow-2xl border border-[#2a3142]">
              <div className="px-4 py-4 border-b border-[#1f2533]">
                <div className="font-semibold text-sm text-white">John Mitchell</div>
                <div className="text-[11px] text-[#6b7280]">john@buildright.com</div>
                <div className="mt-2 inline-block text-[9px] tracking-[0.2em] uppercase font-semibold text-[#c9a961] border border-[#c9a961]/30 rounded-full px-2.5 py-1">Enterprise Owner</div>
              </div>
              <button onClick={() => { navigateTo('settings'); setShowProfile(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#c3cbd8] hover:bg-white/5 transition-colors">
                <Settings size={15} className="text-[#8a8f98]" /> Workspace Settings
              </button>
              <button onClick={() => { navigateTo('activity'); setShowProfile(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#c3cbd8] hover:bg-white/5 transition-colors">
                <Bell size={15} className="text-[#8a8f98]" /> My Activity
              </button>
              <div className="border-t border-[#1f2533]">
                <button onClick={() => { onLogout(); setShowProfile(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-rose-400 hover:bg-rose-500/10 transition-colors">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showNotifications || showProfile || showSearch) && (
        <div className="fixed inset-0 z-[-1]" onClick={() => { setShowNotifications(false); setShowProfile(false); setShowSearch(false); }} />
      )}
    </header>
  );
}
