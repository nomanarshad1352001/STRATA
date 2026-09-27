import { useState, useEffect } from 'react';
import { DollarSign, FolderKanban, CheckSquare, Users, ArrowRight, ArrowUpRight, AlertTriangle, Clock, Flame, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { projects, tasks, chartData, comments, milestones, heroImages } from '../data/dummyData';
import type { Page } from '../App';

interface DashboardProps { navigateTo: (page: Page, projectId?: string) => void; }
const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

function Counter({ target, format = (v: number) => v.toLocaleString() }: { target: number; format?: (v: number) => string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1400, 1);
      setV((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{format(Math.round(v))}</>;
}

const tooltipStyle = {
  backgroundColor: '#131722', border: '1px solid #2a3142', borderRadius: '12px',
  color: '#e8e6e3', fontSize: '12px', boxShadow: '0 8px 24px rgba(0,0,0,.5)',
};

const statusChip: Record<string, string> = {
  in_progress: 'bg-sky-400/15 text-sky-300 border-sky-400/20',
  planning: 'bg-white/10 text-[#c3cbd8] border-white/10',
  on_hold: 'bg-amber-400/15 text-amber-300 border-amber-400/20',
  completed: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/20',
};

export default function Dashboard({ navigateTo }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const featured = projects[0];

  const stats = [
    { label: 'Active Projects', numeric: 5, display: '5', delta: '+2 this quarter', icon: FolderKanban, page: 'projects' as Page, tint: 'from-sky-400/20 to-transparent', iconColor: 'text-sky-300' },
    { label: 'Open Tasks', numeric: 12, display: '12', delta: '3 due today', icon: CheckSquare, page: 'tasks' as Page, tint: 'from-emerald-400/20 to-transparent', iconColor: 'text-emerald-300' },
    { label: 'Portfolio Value', numeric: 140, display: '$140.5M', prefix: '$', suffix: 'M', delta: '+$2.8M MoM', icon: DollarSign, page: 'budget' as Page, tint: 'from-[#c9a961]/25 to-transparent', iconColor: 'text-[#c9a961]' },
    { label: 'Workforce On-Site', numeric: 217, display: '217', delta: '+15 this week', icon: Users, page: 'team' as Page, tint: 'from-violet-400/20 to-transparent', iconColor: 'text-violet-300' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Command Center</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Good evening, <span className="italic text-[#c9a961]">Mr. Mitchell</span></h1>
          <p className="text-sm text-[#6b7280] mt-1.5">Your portfolio is tracking <span className="text-emerald-400 font-medium">4.2% ahead</span> of schedule this week.</p>
        </div>
        <div className="hidden sm:flex gap-1.5 bg-[#11141c] border border-[#1f2533] rounded-xl p-1">
          {['24h', '7d', '30d', 'YTD'].map(r => (
            <button key={r} onClick={() => setTimeRange(r)}
              className={`px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all ${timeRange === r ? 'bg-[#c9a961] text-[#131008] shadow' : 'text-[#8a8f98] hover:text-white'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Featured project hero */}
      <div className="relative h-56 lg:h-64 rounded-3xl overflow-hidden anim-fade-up img-zoom cursor-pointer group" style={delay(0.1)}
        onClick={() => navigateTo('project-detail', featured.id)}>
        <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c11] via-[#0a0c11]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c11]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#131008] bg-[#c9a961] px-3 py-1 rounded-full">Flagship Project</span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium border backdrop-blur-sm ${statusChip[featured.status]} bg-opacity-70`}>
              {featured.status.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-white">{featured.name}</h2>
              <p className="text-[13px] text-[#9aa3b2] mt-1.5 max-w-md hidden sm:block">{featured.address} · Managed by {featured.manager}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden md:block">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#8a8f98]">Progress</div>
                <div className="font-display text-4xl font-bold text-[#c9a961]"><Counter target={featured.progress} />%</div>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#c9a961] text-[#131008] flex items-center justify-center flex-shrink-0 shadow-[0_4px_24px_rgba(201,169,97,.5)] transition-transform group-hover:scale-110 group-hover:rotate-[-8deg]">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`lux-card lux-hover-lift p-5 cursor-pointer relative overflow-hidden anim-fade-up`} style={delay(0.15 + i * 0.08)}
              onClick={() => navigateTo(s.page)}>
              <div className={`absolute inset-0 bg-gradient-to-br ${s.tint} opacity-60`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[.05] border border-white/10 flex items-center justify-center">
                    <Icon size={18} className={s.iconColor} />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                    <TrendingUp size={11} /> {s.delta}
                  </span>
                </div>
                <div className="font-display text-3xl font-bold text-white">
                  <Counter target={s.numeric} format={v => s.display.startsWith('$') ? `$${v}${s.display.replace(/\D*/g, '') ? 'M' : ''}` : v.toLocaleString()} />
                </div>
                <div className="text-xs text-[#6b7280] mt-1 tracking-wide">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 lux-card p-6 anim-fade-up" style={delay(0.3)}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Capital Expenditure</h3>
              <p className="text-xs text-[#6b7280] mt-0.5">Monthly spend across portfolio</p>
            </div>
            <button onClick={() => navigateTo('budget')} className="text-xs text-[#c9a961] hover:text-[#e8d9b8] flex items-center gap-1 transition-colors">
              Full Analysis <ArrowRight size={12} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData.monthlySpend}>
              <defs>
                <linearGradient id="goldSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a961" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#c9a961" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={v => `$${(v as number) / 1000000}M`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="amount" stroke="#c9a961" strokeWidth={2.5} fill="url(#goldSpend)" animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lux-card p-6 anim-fade-up" style={delay(0.38)}>
          <h3 className="font-display text-lg font-semibold text-white mb-1">Task Velocity</h3>
          <p className="text-xs text-[#6b7280] mb-4">Status distribution</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={chartData.tasksByStatus} cx="50%" cy="50%" innerRadius={52} outerRadius={76} paddingAngle={5} dataKey="value" stroke="none" animationDuration={1200}>
                {['#4a5060', '#c9a961', '#e8b64c', '#34d399'].map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {chartData.tasksByStatus.map((t, i) => (
              <div key={t.name} className="flex items-center gap-2 cursor-pointer hover:bg-white/[.04] rounded-lg px-2 py-1.5 transition-colors" onClick={() => navigateTo('tasks')}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#4a5060', '#c9a961', '#e8b64c', '#34d399'][i] }} />
                <span className="text-[11px] text-[#8a8f98]">{t.name}</span>
                <span className="text-[11px] text-white font-semibold ml-auto">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 lux-card p-6 anim-fade-up" style={delay(0.44)}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold text-white">Portfolio Snapshot</h3>
            <button onClick={() => navigateTo('projects')} className="text-xs text-[#c9a961] hover:text-[#e8d9b8] flex items-center gap-1 transition-colors">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {projects.filter(p => p.status !== 'completed').slice(0, 4).map((p, i) => (
              <button key={p.id} onClick={() => navigateTo('project-detail', p.id)}
                className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/[.04] border border-transparent hover:border-[#2a3142] transition-all text-left group anim-fade-up"
                style={delay(0.5 + i * 0.07)}>
                <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#2a3142]">
                  <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-white truncate">{p.name}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium capitalize border ${statusChip[p.status]}`}>{p.status.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[11px] text-[#6b7280]">{p.manager}</span>
                    <span className="text-[11px] text-[#4a5060]">·</span>
                    <span className="text-[11px] text-[#6b7280]">{fmt(p.spent)} / {fmt(p.budget)}</span>
                  </div>
                </div>
                <div className="w-28 flex-shrink-0 hidden sm:block">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-[#6b7280]">Progress</span>
                    <span className="font-semibold text-[#c9a961]">{p.progress}%</span>
                  </div>
                  <div className="w-full h-[5px] bg-[#1f2533] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full anim-bar" style={{ width: `${p.progress}%`, animationDelay: `${0.6 + i * 0.1}s` }} />
                  </div>
                </div>
                <ArrowRight size={15} className="text-[#4a5060] group-hover:text-[#c9a961] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="lux-card p-6 anim-fade-up" style={delay(0.5)}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold text-white">Live Feed</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulseGlow 1.6s infinite' }} />
              <span className="text-[10px] text-emerald-400 tracking-wider uppercase">Live</span>
            </div>
          </div>
          <div className="space-y-4">
            {comments.map((c, i) => (
              <div key={c.id} className="flex gap-3 cursor-pointer hover:bg-white/[.04] p-2.5 -m-2.5 rounded-xl transition-colors anim-fade-up" style={delay(0.56 + i * 0.06)}
                onClick={() => navigateTo('activity')}>
                <div className="w-8 h-8 rounded-full bg-[#1a1f2b] border border-[#c9a961]/25 text-[#c9a961] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  {c.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] text-[#c3cbd8] leading-snug"><span className="font-semibold text-white">{c.author.split(' ')[0]}</span> {c.content.substring(0, 58)}…</p>
                  <p className="text-[10px] text-[#4a5060] mt-1">{c.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigateTo('activity')}
            className="w-full mt-5 py-2.5 lux-btn-ghost rounded-xl text-xs font-medium flex items-center justify-center gap-2">
            Open Full Feed <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lux-card p-6 anim-fade-up" style={delay(0.56)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2"><Flame size={16} className="text-rose-400" /> Critical Path</h3>
            <button onClick={() => navigateTo('tasks')} className="text-xs text-[#c9a961] hover:text-[#e8d9b8] transition-colors">View All →</button>
          </div>
          <div className="space-y-2">
            {tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').slice(0, 4).map(t => (
              <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[.04] cursor-pointer transition-colors" onClick={() => navigateTo('tasks')}>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.priority === 'urgent' ? 'bg-rose-400' : 'bg-amber-400'}`} style={{ animation: 'pulseGlow 2s infinite' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[#e8e6e3] truncate">{t.title}</div>
                  <div className="text-[11px] text-[#6b7280]">{t.assignee}</div>
                </div>
                <span className="text-[10px] text-[#c9a961] font-mono-lux flex-shrink-0">{t.dueDate.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lux-card p-6 anim-fade-up" style={delay(0.62)}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-white">Milestones</h3>
            <button onClick={() => navigateTo('schedule')} className="text-xs text-[#c9a961] hover:text-[#e8d9b8] transition-colors">Schedule →</button>
          </div>
          <div className="space-y-2">
            {milestones.filter(m => m.status !== 'completed').slice(0, 4).map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[.04] cursor-pointer transition-colors" onClick={() => navigateTo('schedule')}>
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                  m.status === 'overdue' ? 'bg-rose-500/10 border-rose-400/30 text-rose-400' : 'bg-[#c9a961]/10 border-[#c9a961]/30 text-[#c9a961]'
                }`}>
                  {m.status === 'overdue' ? <AlertTriangle size={14} /> : <Clock size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[#e8e6e3] truncate">{m.name}</div>
                  <div className="text-[11px] text-[#6b7280]">Due {m.dueDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lux-card p-6 anim-fade-up" style={delay(0.68)}>
          <h3 className="font-display text-lg font-semibold text-white mb-1">Labor Hours</h3>
          <p className="text-xs text-[#6b7280] mb-4">This week's deployment</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData.weeklyHours}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
              <Bar dataKey="hours" fill="#c9a961" radius={[6, 6, 0, 0]} barSize={26} animationDuration={1300} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Site gallery strip */}
      <div className="anim-fade-up" style={delay(0.74)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-white">From the Field</h3>
          <button onClick={() => navigateTo('documents')} className="text-xs text-[#c9a961] hover:text-[#e8d9b8] transition-colors">Media Library →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[heroImages.site1, heroImages.site2, heroImages.site3, heroImages.site4, heroImages.site7, heroImages.site6].map((src, i) => (
            <div key={i} className="relative h-28 rounded-2xl overflow-hidden img-zoom cursor-pointer group border border-[#1f2533]" onClick={() => navigateTo('documents')}>
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0a0c11]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                <span className="text-[10px] text-white bg-black/50 backdrop-blur px-2 py-1 rounded-md">Site capture · Jan 15</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
