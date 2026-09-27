import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, FileText, CheckSquare, Clock, Download, Check } from 'lucide-react';
import { projects, tasks, documents, milestones, budgetItems, comments, dailyLogs, heroImages } from '../data/dummyData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Page } from '../App';

interface Props { projectId: string; navigateTo: (page: Page, projectId?: string) => void; }
const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const tooltipStyle = { backgroundColor: '#131722', border: '1px solid #2a3142', borderRadius: '12px', color: '#e8e6e3', fontSize: '12px' };

const statusChip: Record<string, string> = {
  planning: 'bg-white/10 text-[#d5dbe5] border-white/15',
  in_progress: 'bg-sky-400/20 text-sky-200 border-sky-300/25',
  on_hold: 'bg-amber-400/20 text-amber-200 border-amber-300/25',
  completed: 'bg-emerald-400/20 text-emerald-200 border-emerald-300/25',
};
const priorityChip: Record<string, string> = {
  urgent: 'bg-rose-400/15 text-rose-300 border-rose-400/25', high: 'bg-amber-400/15 text-amber-300 border-amber-400/25',
  medium: 'bg-yellow-400/10 text-yellow-200 border-yellow-400/20', low: 'bg-white/5 text-[#8a8f98] border-white/10',
};
const mStatus: Record<string, string> = {
  completed: 'bg-emerald-400/15 text-emerald-300', overdue: 'bg-rose-400/15 text-rose-300', upcoming: 'bg-sky-400/15 text-sky-300',
};

export default function ProjectDetail({ projectId, navigateTo }: Props) {
  const [tab, setTab] = useState('overview');
  const [checkedTasks, setCheckedTasks] = useState<string[]>(['t1']);
  const project = projects.find(p => p.id === projectId) || projects[0];
  const projTasks = tasks.filter(t => t.projectId === projectId);
  const projDocs = documents.filter(d => d.projectId === projectId);
  const projMilestones = milestones.filter(m => m.projectId === projectId);
  const projBudget = budgetItems.filter(b => b.projectId === projectId);
  const projLogs = dailyLogs.filter(d => d.projectId === projectId);
  const tabs = ['overview', 'tasks', 'documents', 'budget', 'schedule', 'logs', 'team'];

  const toggleTask = (id: string) => setCheckedTasks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover anim-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c11] via-[#0a0c11]/50 to-[#0a0c11]/20" />
        <div className="absolute inset-0 px-6 lg:px-8 py-6 flex flex-col justify-between max-w-[1600px] mx-auto">
          <button onClick={() => navigateTo('projects')}
            className="flex items-center gap-2 text-[13px] text-white/80 hover:text-white bg-black/30 backdrop-blur-md border border-white/15 w-fit px-4 py-2 rounded-xl transition-all hover:bg-black/50 anim-fade-up">
            <ArrowLeft size={15} /> Portfolio
          </button>
          <div className="anim-fade-up" style={delay(0.15)}>
            <div className="flex items-center gap-2.5 mb-3">
              <span className={`text-[10px] px-3 py-1 rounded-full font-semibold capitalize border backdrop-blur-md ${statusChip[project.status]}`}>{project.status.replace('_', ' ')}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/70 backdrop-blur-md bg-white/10 border border-white/15 px-3 py-1 rounded-full">{project.type}</span>
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-white">{project.name}</h1>
            <div className="flex items-center gap-5 text-[13px] text-white/70 mt-3">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#c9a961]" /> {project.address}</span>
              <span className="hidden sm:flex items-center gap-1.5"><Calendar size={13} className="text-[#c9a961]" /> {project.startDate} → {project.endDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 max-w-[1600px] mx-auto">
        {/* Stats bar overlapping hero */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-12 relative z-10">
          {[
            { icon: DollarSign, label: 'Capital', value: fmt(project.budget), sub: `${fmt(project.spent)} deployed`, color: 'text-[#c9a961]' },
            { icon: CheckSquare, label: 'Tasks', value: `${projTasks.length}`, sub: `${checkedTasks.length} resolved`, color: 'text-emerald-400' },
            { icon: FileText, label: 'Documents', value: `${projDocs.length}`, sub: 'under version control', color: 'text-sky-400' },
            { icon: Users, label: 'Field Team', value: '12', sub: 'active members', color: 'text-violet-400' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="lux-card lux-hover-lift p-5 anim-fade-up" style={delay(0.2 + i * 0.06)}>
                <div className="flex items-center gap-2 mb-2"><Icon size={15} className={s.color} /><span className="text-[10px] tracking-[0.2em] uppercase text-[#6b7280]">{s.label}</span></div>
                <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-[#6b7280]">{s.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-2xl p-1.5 w-fit mt-6 overflow-x-auto max-w-full anim-fade-up" style={delay(0.3)}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-[13px] rounded-xl font-medium capitalize transition-all whitespace-nowrap ${tab === t ? 'bg-[#c9a961] text-[#131008] shadow-lg' : 'text-[#8a8f98] hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6" key={tab}>
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 anim-fade-up">
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">The Brief</h3>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">{project.description}</p>
              <div className="mt-5 space-y-3">
                {[['Client', project.clientName], ['Principal Manager', project.manager], ['Commencement', project.startDate], ['Target Delivery', project.endDate]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5 border-b border-[#1f2533]/60 last:border-0">
                    <span className="text-xs text-[#6b7280] uppercase tracking-wider">{k}</span>
                    <span className="text-sm font-medium text-white">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-xs mb-2"><span className="text-[#6b7280] uppercase tracking-wider">Overall Construction</span><span className="text-[#c9a961] font-bold">{project.progress}%</span></div>
                <div className="w-full h-2 bg-[#1f2533] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full anim-bar" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">Site Gallery</h3>
              <div className="grid grid-cols-2 gap-3">
                {[project.image, heroImages.site1, heroImages.site2, heroImages.site3].map((src, i) => (
                  <div key={i} className="relative h-32 rounded-xl overflow-hidden img-zoom cursor-pointer group border border-[#1f2533]">
                    <img src={src} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0a0c11]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <h3 className="font-display text-lg font-semibold text-white mt-6 mb-3">Milestones</h3>
              <div className="space-y-1.5">
                {projMilestones.map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[.04] cursor-pointer transition-colors">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.status === 'completed' ? 'bg-emerald-400' : m.status === 'overdue' ? 'bg-rose-400' : 'bg-[#c9a961]'}`} />
                    <div className="flex-1 min-w-0"><div className="text-sm text-white truncate">{m.name}</div><div className="text-[11px] text-[#6b7280]">{m.dueDate}</div></div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${mStatus[m.status]}`}>{m.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'tasks' && (
          <div className="lux-card overflow-hidden anim-fade-up">
            <div className="px-6 py-4 border-b border-[#1f2533] flex justify-between items-center">
              <h3 className="font-display font-semibold text-white">Scope of Work · {projTasks.length} items</h3>
              <button className="lux-btn-gold px-4 py-2 rounded-xl text-xs">+ Add Task</button>
            </div>
            <div className="divide-y divide-[#1f2533]/60">
              {projTasks.map(t => {
                const done = checkedTasks.includes(t.id);
                return (
                  <div key={t.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[.03] cursor-pointer transition-colors" onClick={() => toggleTask(t.id)}>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${done ? 'bg-[#c9a961] border-[#c9a961]' : 'border-[#2a3142] hover:border-[#c9a961]'}`}>
                      {done && <Check size={12} className="text-[#131008]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm transition-all ${done ? 'line-through text-[#4a5060]' : 'text-white'}`}>{t.title}</div>
                      <div className="text-[11px] text-[#6b7280]">{t.category} · {t.assignee}</div>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${priorityChip[t.priority]}`}>{t.priority}</span>
                    <span className="text-[11px] text-[#6b7280] font-mono-lux">{t.dueDate}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'documents' && (
          <div className="lux-card overflow-hidden anim-fade-up">
            <div className="px-6 py-4 border-b border-[#1f2533] flex justify-between items-center">
              <h3 className="font-display font-semibold text-white">Document Registry · {projDocs.length}</h3>
              <button className="lux-btn-gold px-4 py-2 rounded-xl text-xs">Upload</button>
            </div>
            <div className="divide-y divide-[#1f2533]/60">
              {projDocs.map(d => (
                <div key={d.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[.03] cursor-pointer transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-[#1a1f2b] border border-[#2a3142] flex items-center justify-center flex-shrink-0">
                    <FileText size={17} className="text-[#c9a961]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{d.name}</div>
                    <div className="text-[11px] text-[#6b7280]">{d.uploadedBy} · {d.uploadedAt} · Rev {d.version}</div>
                  </div>
                  <span className="text-[11px] text-[#6b7280] font-mono-lux">{d.size}</span>
                  <button className="p-2 rounded-lg bg-white/[.04] border border-[#2a3142] opacity-0 group-hover:opacity-100 transition-all hover:border-[#c9a961] hover:text-[#c9a961] text-[#8a8f98]">
                    <Download size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'budget' && (
          <div className="space-y-6 anim-fade-up">
            <div className="lux-card p-6">
              <h3 className="font-display font-semibold text-white mb-5">Cost Control Ledger</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={projBudget}>
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} angle={-18} textAnchor="end" height={60} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={v => `$${(v as number) / 1000000}M`} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
                  <Bar dataKey="budgeted" fill="#3a4356" name="Budgeted" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="actual" fill="#c9a961" name="Actual" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="lux-card overflow-hidden">
              <table className="w-full">
                <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
                  {['Category', 'Budgeted', 'Actual', 'Delta'].map((h, i) => (
                    <th key={h} className={`px-5 py-3.5 text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em] ${i === 0 ? 'text-left' : 'text-right'}`}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>{projBudget.map(b => (
                  <tr key={b.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-white">{b.category}</td>
                    <td className="px-5 py-3.5 text-sm text-[#c3cbd8] text-right">{fmt(b.budgeted)}</td>
                    <td className="px-5 py-3.5 text-sm text-[#c3cbd8] text-right">{fmt(b.actual)}</td>
                    <td className={`px-5 py-3.5 text-sm text-right font-semibold ${b.variance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{b.variance >= 0 ? '+' : ''}{fmt(b.variance)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'schedule' && (
          <div className="lux-card p-6 anim-fade-up">
            <h3 className="font-display font-semibold text-white mb-6">Critical Timeline</h3>
            <div className="space-y-1">
              {projMilestones.map((m, i) => (
                <div key={m.id} className="flex items-center gap-5 cursor-pointer hover:bg-white/[.03] p-4 rounded-xl transition-colors">
                  <div className="flex flex-col items-center self-stretch">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${m.status === 'completed' ? 'bg-emerald-400 border-emerald-400' : m.status === 'overdue' ? 'border-rose-400' : 'border-[#c9a961]'}`} />
                    {i < projMilestones.length - 1 && <div className="w-px flex-1 bg-[#2a3142] mt-1.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-white">{m.name}</div>
                    <div className="text-xs text-[#6b7280] mt-0.5">{m.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white font-mono-lux">{m.dueDate}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${mStatus[m.status]}`}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'logs' && (
          <div className="space-y-4 anim-fade-up">
            {projLogs.map(l => (
              <div key={l.id} className="lux-card lux-hover-lift p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-[#c9a961]" />
                    <span className="font-semibold text-sm text-white font-mono-lux">{l.date}</span>
                    <span className="text-xs text-[#6b7280]">{l.weather} · {l.temperature}</span>
                  </div>
                  <span className="text-[11px] text-[#6b7280]">By {l.author}</span>
                </div>
                <p className="text-sm text-[#9aa3b2] mb-4 leading-relaxed">{l.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {[`${l.workersOnSite} personnel`, `${l.hoursWorked} hrs`, `${l.safetyIncidents} incidents`].map(chip => (
                    <span key={chip} className="text-[11px] text-[#8a8f98] bg-white/[.04] border border-[#2a3142] px-3 py-1 rounded-full">{chip}</span>
                  ))}
                  {l.delaysReported && <span className="text-[11px] text-amber-300 bg-amber-400/10 border border-amber-400/25 px-3 py-1 rounded-full font-medium">Delay Noted</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'team' && (
          <div className="lux-card p-6 anim-fade-up">
            <h3 className="font-display font-semibold text-white mb-5">Field Communication</h3>
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3.5 p-3.5 hover:bg-white/[.03] rounded-xl cursor-pointer transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#1a1f2b] border border-[#c9a961]/25 text-[#c9a961] flex items-center justify-center text-[11px] font-bold flex-shrink-0">{c.avatar}</div>
                  <div><div className="text-sm"><span className="font-semibold text-white">{c.author}</span> <span className="text-[#9aa3b2]">{c.content}</span></div>
                    <div className="text-[10px] text-[#4a5060] mt-1">{c.timestamp}</div></div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <input type="text" placeholder="Write a field note…" className="flex-1 lux-input px-4 py-3 text-sm" />
              <button className="lux-btn-gold px-6 py-3 rounded-xl text-sm">Post</button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
