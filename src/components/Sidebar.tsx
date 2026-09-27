import { LayoutDashboard, FolderKanban, CheckSquare, Users, FileText, ClipboardList, MessageSquare, DollarSign, Receipt, HardHat, Calendar, BarChart3, Settings, Shield, CreditCard, UserCircle, Activity, ChevronLeft, ChevronRight, Building2, LogOut } from 'lucide-react';
import type { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems: { icon: React.ElementType; label: string; page: Page; section?: string }[] = [
  { icon: LayoutDashboard, label: 'Command Center', page: 'dashboard', section: 'Overview' },
  { icon: Activity, label: 'Activity Feed', page: 'activity', section: 'Overview' },
  { icon: FolderKanban, label: 'Projects', page: 'projects', section: 'Operations' },
  { icon: CheckSquare, label: 'Tasks', page: 'tasks', section: 'Operations' },
  { icon: Calendar, label: 'Schedule', page: 'schedule', section: 'Operations' },
  { icon: ClipboardList, label: 'Daily Logs', page: 'daily-logs', section: 'Operations' },
  { icon: FileText, label: 'Documents', page: 'documents', section: 'Controls' },
  { icon: MessageSquare, label: 'RFIs', page: 'rfis', section: 'Controls' },
  { icon: Receipt, label: 'Change Orders', page: 'change-orders', section: 'Controls' },
  { icon: DollarSign, label: 'Budget', page: 'budget', section: 'Finance' },
  { icon: BarChart3, label: 'Reports', page: 'reports', section: 'Finance' },
  { icon: Users, label: 'Team', page: 'team', section: 'People' },
  { icon: HardHat, label: 'Subcontractors', page: 'subcontractors', section: 'People' },
  { icon: UserCircle, label: 'Client Portal', page: 'client-portal', section: 'People' },
  { icon: CreditCard, label: 'Subscription', page: 'subscription', section: 'Enterprise' },
  { icon: Shield, label: 'Super Admin', page: 'admin', section: 'Enterprise' },
  { icon: Settings, label: 'Settings', page: 'settings', section: 'Enterprise' },
];

export default function Sidebar({ currentPage, navigateTo, isOpen, onToggle }: SidebarProps) {
  let lastSection = '';

  return (
    <div className={`${isOpen ? 'w-[264px]' : 'w-[76px]'} bg-[#0a0c11] border-r border-[#1f2533] flex flex-col transition-all duration-300 relative flex-shrink-0`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-5 border-b border-[#1f2533] ${!isOpen ? 'justify-center px-0' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center flex-shrink-0 shadow-[0_4px_20px_-4px_rgba(201,169,97,.5)]">
          <Building2 size={20} className="text-[#131008]" />
        </div>
        {isOpen && (
          <div>
            <div className="font-display text-lg font-bold tracking-[0.14em] text-white leading-none">STRATA</div>
            <div className="text-[9px] tracking-[0.28em] text-[#c9a961] uppercase mt-0.5">Construction OS</div>
          </div>
        )}
      </div>

      <button onClick={onToggle} className="absolute -right-3 top-[72px] w-6 h-6 bg-[#1a1f2b] rounded-full flex items-center justify-center hover:bg-[#c9a961] hover:text-[#131008] text-[#8a8f98] z-10 border border-[#2a3142] transition-colors">
        {isOpen ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
      </button>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2.5">
        {menuItems.map(item => {
          const showSection = isOpen && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <div key={item.page}>
              {showSection && (
                <div className="px-3 pt-4 pb-1.5 text-[9px] font-semibold text-[#4a5060] uppercase tracking-[0.25em]">
                  {item.section}
                </div>
              )}
              <button
                onClick={() => navigateTo(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-[9px] rounded-xl text-[13px] transition-all duration-200 mb-0.5 group relative ${
                  isActive
                    ? 'text-[#e8d9b8]'
                    : 'text-[#8a8f98] hover:text-white hover:bg-white/[.04]'
                } ${!isOpen ? 'justify-center px-0' : ''}`}
                title={!isOpen ? item.label : undefined}
              >
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c9a961]/15 to-transparent rounded-xl" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-[#d9b876] to-[#b8954d]" />
                  </>
                )}
                <Icon size={17} className={`flex-shrink-0 relative ${isActive ? 'text-[#c9a961]' : 'group-hover:text-[#c9a961] transition-colors'}`} />
                {isOpen && <span className="relative">{item.label}</span>}
                {isOpen && isActive && <div className="relative ml-auto w-1.5 h-1.5 rounded-full bg-[#c9a961]" style={{ animation: 'pulseGlow 2s infinite' }} />}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Bottom plan card */}
      <div className={`p-3 border-t border-[#1f2533] ${!isOpen ? 'px-2' : ''}`}>
        {isOpen ? (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1f2b] to-[#11141c] border border-[#2a3142] p-4">
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#c9a961]/10 rounded-full blur-xl" />
            <div className="text-[9px] tracking-[0.25em] uppercase text-[#c9a961] font-semibold">Enterprise Suite</div>
            <div className="text-sm font-semibold text-white mt-1">BuildRight Construction</div>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 h-1 bg-[#2a3142] rounded-full overflow-hidden">
                <div className="h-full w-[23%] bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full anim-bar" />
              </div>
              <span className="text-[9px] text-[#6b7280]">234 GB</span>
            </div>
            <button className="w-full mt-3 py-1.5 text-[10px] tracking-widest uppercase text-[#c9a961] border border-[#c9a961]/30 rounded-lg hover:bg-[#c9a961]/10 transition-colors">
              Upgrade Storage
            </button>
          </div>
        ) : (
          <button onClick={onToggle} className="w-full p-2 text-[#6b7280] hover:text-[#c9a961] transition-colors">
            <LogOut size={16} className="mx-auto rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
}
