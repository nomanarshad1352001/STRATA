import { useState } from 'react';
import { Download, FileText, BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { projects, chartData, budgetItems } from '../data/dummyData';

const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const tooltipStyle = { backgroundColor: '#131722', border: '1px solid #2a3142', borderRadius: '12px', color: '#e8e6e3', fontSize: '12px' };
const statusChip: Record<string, string> = {
  planning: 'bg-white/10 text-[#d5dbe5] border-white/15', in_progress: 'bg-sky-400/20 text-sky-200 border-sky-300/25',
  on_hold: 'bg-amber-400/20 text-amber-200 border-amber-300/25', completed: 'bg-emerald-400/20 text-emerald-200 border-emerald-300/25',
};

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('overview');
  const [exported, setExported] = useState(false);

  const reports = [
    { id: 'overview', name: 'Portfolio Brief', icon: BarChart3 },
    { id: 'financial', name: 'Capital Review', icon: TrendingUp },
    { id: 'tasks', name: 'Execution Metrics', icon: FileText },
    { id: 'labor', name: 'Workforce Report', icon: PieChartIcon },
  ];

  const laborData = [
    { trade: 'Electrical', hours: 1240, workers: 15 }, { trade: 'Plumbing', hours: 980, workers: 12 },
    { trade: 'Concrete', hours: 1560, workers: 20 }, { trade: 'Steel', hours: 850, workers: 8 },
    { trade: 'HVAC', hours: 720, workers: 10 }, { trade: 'General', hours: 2100, workers: 30 },
  ];

  const handleExport = () => { setExported(true); setTimeout(() => setExported(false), 2400); };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4 anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Intelligence</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Reports & Analysis</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">Board-grade insight, on demand</p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={() => alert('Filters applied')} className="lux-btn-ghost px-4 py-2.5 rounded-xl text-sm">Refine</button>
          <button onClick={handleExport} className="lux-btn-gold flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
            <Download size={15} /> {exported ? 'Board Pack Sent' : 'Export Board Pack'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap anim-fade-up" style={delay(0.08)}>
        {reports.map(r => {
          const Icon = r.icon;
          return (
            <button key={r.id} onClick={() => setActiveReport(r.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                activeReport === r.id ? 'bg-[#c9a961] text-[#131008] shadow-lg' : 'bg-[#11141c] border border-[#1f2533] text-[#8a8f98] hover:text-white hover:border-[#c9a961]/40'
              }`}>
              <Icon size={15} /> {r.name}
            </button>
          );
        })}
      </div>

      <div key={activeReport} className="anim-fade-up">
      {activeReport === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-1">Completion Trajectory</h3>
              <p className="text-xs text-[#6b7280] mb-5">Progress across active engagements</p>
              <ResponsiveContainer width="100%" height={290}>
                <BarChart data={chartData.projectProgress} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis type="category" dataKey="name" width={115} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8a8f98' }} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
                  <Bar dataKey="progress" fill="#c9a961" radius={[0, 5, 5, 0]} barSize={18} animationDuration={1400} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-1">Portfolio Composition</h3>
              <p className="text-xs text-[#6b7280] mb-5">By engagement status</p>
              <ResponsiveContainer width="100%" height={290}>
                <PieChart>
                  <Pie data={[
                    { name: 'In Progress', value: 3 }, { name: 'Planning', value: 1 },
                    { name: 'On Hold', value: 1 }, { name: 'Completed', value: 1 },
                  ]} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" stroke="none"
                    label={({ name, value }) => `${name} · ${value}`} labelLine={{ stroke: '#4a5060' }}>
                    {['#38bdf8', '#8a8f98', '#fbbf24', '#34d399'].map((c, i) => <Cell key={i} fill={c} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lux-card overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1f2533]"><h3 className="font-display font-semibold text-white">Engagement Summary</h3></div>
            <table className="w-full">
              <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
                {['Engagement', 'Standing', 'Budget', 'Deployed', 'Progress', 'Principal'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr></thead>
              <tbody>{projects.map((p, i) => (
                <tr key={p.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.1 + i * 0.04)}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-8 rounded-md overflow-hidden border border-[#2a3142]"><img src={p.image} className="w-full h-full object-cover" /></div>
                      <span className="text-sm font-medium text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-medium capitalize border ${statusChip[p.status]}`}>{p.status.replace('_', ' ')}</span></td>
                  <td className="px-5 py-4 text-sm text-[#c3cbd8]">{fmt(p.budget)}</td>
                  <td className="px-5 py-4 text-sm text-[#c3cbd8]">{fmt(p.spent)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2"><div className="w-16 h-[5px] bg-[#1f2533] rounded-full">
                      <div className="h-full bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full" style={{ width: `${p.progress}%` }} /></div>
                      <span className="text-xs text-[#c9a961] font-semibold">{p.progress}%</span></div>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#8a8f98]">{p.manager}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {activeReport === 'financial' && (
        <div className="space-y-6">
          <div className="lux-card p-6">
            <h3 className="font-display text-lg font-semibold text-white mb-1">Capital Flow</h3>
            <p className="text-xs text-[#6b7280] mb-5">Trailing seven months</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.monthlySpend}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={v => `$${(v as number) / 1000000}M`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="amount" stroke="#c9a961" strokeWidth={2.5} dot={{ r: 4.5, fill: '#c9a961', strokeWidth: 2, stroke: '#131008' }} animationDuration={1600} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="lux-card p-6">
            <h3 className="font-display text-lg font-semibold text-white mb-5">Allocation vs. Deployment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetItems} layout="vertical">
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={v => `$${(v as number) / 1000000}M`} />
                <YAxis type="category" dataKey="category" width={115} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8a8f98' }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
                <Bar dataKey="budgeted" fill="#3a4356" name="Allocated" radius={[0, 4, 4, 0]} />
                <Bar dataKey="actual" fill="#c9a961" name="Deployed" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeReport === 'tasks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[['Total Items', '12', 'from-[#c9a961]/25 to-transparent', 'text-[#c9a961]'], ['Closed', '1', 'from-emerald-400/20 to-transparent', 'text-emerald-300'],
              ['In Motion', '4', 'from-sky-400/20 to-transparent', 'text-sky-300'], ['Breach Risk', '2', 'from-rose-400/20 to-transparent', 'text-rose-300']].map(([label, val, tint, color], i) => (
              <div key={label as string} className="lux-card lux-hover-lift p-5 cursor-pointer relative overflow-hidden anim-fade-up" style={delay(0.1 + i * 0.06)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${tint} opacity-60`} />
                <div className="relative">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#6b7280]">{label as string}</div>
                  <div className={`font-display text-3xl font-bold mt-1 ${color}`}>{val as string}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="lux-card p-6">
            <h3 className="font-display text-lg font-semibold text-white mb-5">Queue Composition</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData.tasksByStatus} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={4} dataKey="value" stroke="none" animationDuration={1300}>
                  {['#4a5060', '#c9a961', '#e8b64c', '#34d399'].map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeReport === 'labor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-1">Hours by Discipline</h3>
              <p className="text-xs text-[#6b7280] mb-5">This cycle</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={laborData}>
                  <XAxis dataKey="trade" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8a8f98' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
                  <Bar dataKey="hours" fill="#c9a961" radius={[4, 4, 0, 0]} animationDuration={1300} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-1">Daily Deployment</h3>
              <p className="text-xs text-[#6b7280] mb-5">Week trend</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData.weeklyHours}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="hours" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4.5, fill: '#38bdf8', strokeWidth: 2, stroke: '#131008' }} animationDuration={1600} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lux-card overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
                {['Discipline', 'Personnel', 'Hours', 'Mean / Person'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr></thead>
              <tbody>{laborData.map((l, i) => (
                <tr key={l.trade} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.1 + i * 0.04)}>
                  <td className="px-5 py-4 text-sm font-medium text-white">{l.trade}</td>
                  <td className="px-5 py-4 text-sm text-[#c3cbd8]">{l.workers}</td>
                  <td className="px-5 py-4 text-sm text-[#c3cbd8]">{l.hours.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-[#c9a961] font-semibold">{(l.hours / l.workers).toFixed(0)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
