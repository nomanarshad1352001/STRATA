import { useState } from 'react';
import { Plus, Search, Grid, List, MapPin, Calendar, X, ArrowUpRight, Plane } from 'lucide-react';
import { projects } from '../data/dummyData';
import type { Page } from '../App';

interface Props { navigateTo: (page: Page, projectId?: string) => void; }
const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

const statusChip: Record<string, string> = {
  planning: 'bg-white/10 text-[#d5dbe5] border-white/15',
  in_progress: 'bg-sky-400/20 text-sky-200 border-sky-300/25',
  on_hold: 'bg-amber-400/20 text-amber-200 border-amber-300/25',
  completed: 'bg-emerald-400/20 text-emerald-200 border-emerald-300/25',
};

export default function ProjectsPage({ navigateTo }: Props) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', type: '', address: '', budget: '', manager: '', startDate: '', endDate: '' });
  const [created, setCreated] = useState(false);

  const filtered = projects.filter(p =>
    (statusFilter === 'all' || p.status === statusFilter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Operations</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Project Portfolio</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{projects.length} engagements · <span className="text-[#c9a961]">{fmt(projects.reduce((s, p) => s + p.budget, 0))}</span> under management</p>
        </div>
        <button onClick={() => setShowNew(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Plus size={16} /> New Engagement
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap anim-fade-up" style={delay(0.08)}>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
          <input type="text" placeholder="Search the portfolio…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex items-center gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 flex-wrap">
          {['all', 'planning', 'in_progress', 'on_hold', 'completed'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 text-xs rounded-lg font-medium capitalize transition-all ${statusFilter === s ? 'bg-[#c9a961] text-[#131008] shadow' : 'text-[#8a8f98] hover:text-white'}`}>
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 ml-auto">
          <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}><Grid size={14} /></button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}><List size={14} /></button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div key={p.id} onClick={() => navigateTo('project-detail', p.id)}
              className="lux-card lux-hover-lift overflow-hidden cursor-pointer group anim-fade-up" style={delay(0.12 + i * 0.07)}>
              <div className="relative h-44 img-zoom">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-[#11141c]/30 to-transparent" />
                <span className={`absolute top-3.5 left-3.5 text-[10px] px-3 py-1 rounded-full font-semibold capitalize border backdrop-blur-md ${statusChip[p.status]}`}>
                  {p.status.replace('_', ' ')}
                </span>
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-2">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
                <div className="absolute bottom-3.5 left-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#c9a961] font-semibold">{p.type}</div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-white group-hover:text-[#e8d9b8] transition-colors leading-snug">{p.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#6b7280] mt-1.5">
                  <MapPin size={11} className="text-[#c9a961]/60" /> {p.address}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-[#0d1017] border border-[#1f2533] rounded-xl px-3 py-2.5">
                    <div className="text-[9px] tracking-[0.2em] uppercase text-[#4a5060]">Budget</div>
                    <div className="font-display font-bold text-white text-lg">{fmt(p.budget)}</div>
                  </div>
                  <div className="bg-[#0d1017] border border-[#1f2533] rounded-xl px-3 py-2.5">
                    <div className="text-[9px] tracking-[0.2em] uppercase text-[#4a5060]">Deployed</div>
                    <div className="font-display font-bold text-[#c9a961] text-lg">{fmt(p.spent)}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-[#6b7280] tracking-wide uppercase">Completion</span>
                    <span className="font-bold text-white">{p.progress}%</span>
                  </div>
                  <div className="w-full h-[5px] bg-[#1f2533] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full anim-bar" style={{ width: `${p.progress}%`, animationDelay: `${0.3 + i * 0.08}s` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1f2533]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#6b7280]"><Calendar size={11} /> {p.startDate.slice(0, 7)} → {p.endDate.slice(0, 7)}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1a1f2b] border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center text-[9px] font-bold">
                      {p.manager.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] text-[#8a8f98]">{p.manager.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="lux-card overflow-hidden anim-fade-up" style={delay(0.15)}>
          <table className="w-full">
            <thead><tr className="border-b border-[#1f2533] bg-[#0d1017]">
              {['Engagement', 'Status', 'Budget', 'Progress', 'Principal', 'Timeline'].map(h => (
                <th key={h} className="px-5 py-4 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} onClick={() => navigateTo('project-detail', p.id)}
                  className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.1 + i * 0.04)}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-10 rounded-lg overflow-hidden border border-[#2a3142] flex-shrink-0"><img src={p.image} className="w-full h-full object-cover" /></div>
                      <div>
                        <div className="font-medium text-sm text-white">{p.name}</div>
                        <div className="text-[11px] text-[#6b7280]">{p.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-medium capitalize border ${statusChip[p.status]}`}>{p.status.replace('_', ' ')}</span></td>
                  <td className="px-5 py-4 font-display font-bold text-white">{fmt(p.budget)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-24 h-[5px] bg-[#1f2533] rounded-full"><div className="h-full bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full" style={{ width: `${p.progress}%` }} /></div>
                      <span className="text-xs font-semibold text-[#c9a961]">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#8a8f98]">{p.manager}</td>
                  <td className="px-5 py-4 text-[11px] text-[#6b7280] font-mono-lux">{p.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Project Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowNew(false)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal max-h-[90vh] overflow-y-auto border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-white">New Engagement</h2>
                <p className="text-xs text-[#6b7280] mt-1">Commission a new construction project</p>
              </div>
              <button onClick={() => setShowNew(false)} className="text-[#6b7280] hover:text-white transition-colors"><X size={20} /></button>
            </div>
            {created ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 flex items-center justify-center mb-4">
                  <Plane size={26} className="text-[#c9a961]" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Engagement Commissioned</h3>
                <p className="text-sm text-[#8a8f98] mt-2">"{newProject.name || 'Untitled Project'}" has been added to the portfolio.</p>
                <button onClick={() => { setShowNew(false); setCreated(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Continue</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {[
                    ['Project Name', 'name', 'text', 'e.g. The Strata Residences'],
                    ['Classification', 'type', 'text', 'e.g. Luxury Commercial'],
                    ['Site Address', 'address', 'text', 'Street, City, State'],
                    ['Budget (USD)', 'budget', 'number', '10,000,000'],
                    ['Principal Manager', 'manager', 'text', 'Full name'],
                  ].map(([label, key, type, ph]) => (
                    <div key={key}>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b7280] mb-1.5">{label}</label>
                      <input type={type} value={newProject[key as keyof typeof newProject]} placeholder={ph}
                        onChange={e => setNewProject({ ...newProject, [key]: e.target.value })}
                        className="w-full lux-input px-4 py-2.5 text-sm" />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b7280] mb-1.5">Commencement</label>
                      <input type="date" className="w-full lux-input px-4 py-2.5 text-sm [color-scheme:dark]" /></div>
                    <div><label className="block text-[10px] tracking-[0.2em] uppercase text-[#6b7280] mb-1.5">Target Delivery</label>
                      <input type="date" className="w-full lux-input px-4 py-2.5 text-sm [color-scheme:dark]" /></div>
                  </div>
                </div>
                <div className="flex gap-3 mt-7">
                  <button onClick={() => setShowNew(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm font-medium">Cancel</button>
                  <button onClick={() => setCreated(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">Commission Project</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
