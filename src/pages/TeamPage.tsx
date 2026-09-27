import { useState } from 'react';
import { Plus, Search, Mail, Phone, Shield, X, Check } from 'lucide-react';
import { users } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const roleChip: Record<string, string> = {
  owner: 'bg-[#c9a961]/15 text-[#c9a961] border-[#c9a961]/30', admin: 'bg-sky-400/15 text-sky-300 border-sky-400/25',
  project_manager: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', field_worker: 'bg-amber-400/15 text-amber-300 border-amber-400/25',
  subcontractor: 'bg-violet-400/15 text-violet-300 border-violet-400/25', client: 'bg-white/8 text-[#c3cbd8] border-white/12',
};

export default function TeamPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showInvite, setShowInvite] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [showPerms, setShowPerms] = useState(false);
  const [invited, setInvited] = useState(false);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) && (roleFilter === 'all' || u.role === roleFilter)
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">People</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">The Workforce</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{users.length} members · role-based access control active</p>
        </div>
        <button onClick={() => setShowInvite(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Plus size={16} /> Extend Invitation
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap anim-fade-up" style={delay(0.08)}>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
          <input type="text" placeholder="Search members…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 flex-wrap">
          {['all', 'owner', 'admin', 'project_manager', 'field_worker', 'subcontractor', 'client'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-all ${roleFilter === r ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>
              {r === 'all' ? 'All' : r.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((u, i) => (
          <div key={u.id} onClick={() => setSelectedUser(u)}
            className="lux-card lux-hover-lift p-5 cursor-pointer group anim-fade-up" style={delay(0.12 + i * 0.05)}>
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/25 flex items-center justify-center text-[#c9a961] font-display font-bold text-lg">
                  {u.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#11141c] ${u.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white truncate">{u.name}</span>
                  {u.status === 'invited' && <span className="text-[9px] bg-amber-400/15 text-amber-300 border border-amber-400/25 px-2 py-0.5 rounded-full">Pending</span>}
                </div>
                <span className={`inline-block mt-1.5 text-[10px] px-2.5 py-0.5 rounded-full font-medium capitalize border ${roleChip[u.role]}`}>{u.role.replace('_', ' ')}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-[#8a8f98]"><Mail size={12} className="text-[#c9a961]/60" /> {u.email}</div>
              <div className="flex items-center gap-2.5 text-xs text-[#8a8f98]"><Phone size={12} className="text-[#c9a961]/60" /> {u.phone}</div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1f2533]">
              <span className="text-[10px] text-[#4a5060]">Active {u.lastActive}</span>
              <button onClick={e => { e.stopPropagation(); setSelectedUser(u); setShowPerms(true); }}
                className="text-[11px] text-[#c9a961] hover:text-[#e8d9b8] flex items-center gap-1.5 transition-colors">
                <Shield size={11} /> Permissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Detail Modal */}
      {selectedUser && !showPerms && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedUser(null)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/30 flex items-center justify-center text-[#c9a961] font-display font-bold text-xl">{selectedUser.avatar}</div>
                <div><h2 className="font-display text-lg font-bold text-white">{selectedUser.name}</h2>
                  <span className={`inline-block mt-1 text-[10px] px-2.5 py-0.5 rounded-full font-medium capitalize border ${roleChip[selectedUser.role]}`}>{selectedUser.role.replace('_', ' ')}</span></div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-2.5">
              {[['Email', selectedUser.email], ['Direct Line', selectedUser.phone], ['Standing', selectedUser.status], ['Last Active', selectedUser.lastActive]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1f2533]/60"><span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span><span className="font-medium text-white capitalize">{v}</span></div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-6">
              <button onClick={() => setShowPerms(true)} className="flex-1 lux-btn-gold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"><Shield size={14} /> Permissions</button>
              <button className="flex-1 lux-btn-ghost py-2.5 rounded-xl text-sm">Edit Profile</button>
              <button className="px-4 py-2.5 rounded-xl text-sm border border-rose-400/30 text-rose-300 hover:bg-rose-500/10 transition-colors">Suspend</button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPerms && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => { setShowPerms(false); setSelectedUser(null); }}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142] max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Access Rights</h2>
                <p className="text-xs text-[#6b7280] mt-1">{selectedUser.name} · {selectedUser.role.replace('_', ' ')}</p></div>
              <button onClick={() => { setShowPerms(false); setSelectedUser(null); }} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-1">
              {['View Projects', 'Edit Projects', 'Create Projects', 'Delete Projects', 'Manage Team', 'View Budget', 'Edit Budget',
                'Upload Documents', 'Manage RFIs', 'Approve Change Orders', 'View Reports', 'Admin Console'].map((perm, i) => (
                <label key={perm} className="flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-white/[.03] rounded-xl transition-colors"
                  style={delay(i * 0.01)}>
                  <span className="text-sm text-[#c3cbd8]">{perm}</span>
                  <input type="checkbox" defaultChecked={selectedUser.role === 'owner' || selectedUser.role === 'admin' || i % 3 !== 0}
                    className="w-4 h-4 rounded accent-[#c9a961]" />
                </label>
              ))}
            </div>
            <button onClick={() => { setShowPerms(false); setSelectedUser(null); }} className="w-full mt-5 lux-btn-gold py-3 rounded-xl text-sm">Save Access Rights</button>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowInvite(false)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Extend Invitation</h2>
                <p className="text-xs text-[#6b7280] mt-1">Bring a new member into the firm</p></div>
              <button onClick={() => setShowInvite(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {invited ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 flex items-center justify-center mb-4"><Mail size={22} className="text-[#c9a961]" /></div>
                <h3 className="font-display text-lg font-bold text-white">Invitation Dispatched</h3>
                <p className="text-sm text-[#8a8f98] mt-2">The invite is on its way.</p>
                <button onClick={() => { setShowInvite(false); setInvited(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Done</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Email Address</label>
                    <input type="email" className="w-full lux-input px-4 py-2.5 text-sm" placeholder="associate@firm.com" /></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Designation</label>
                    <select className="w-full lux-input px-4 py-2.5 text-sm">
                      <option>Admin</option><option>Project Manager</option><option>Field Worker</option><option>Subcontractor</option><option>Client</option>
                    </select></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Personal Note</label>
                    <textarea className="w-full lux-input px-4 py-2.5 text-sm" rows={3} placeholder="Welcome aboard…" /></div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowInvite(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Cancel</button>
                  <button onClick={() => setInvited(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm flex items-center justify-center gap-2"><Check size={14} /> Send Invitation</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
