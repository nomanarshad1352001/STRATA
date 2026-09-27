import { useState } from 'react';
import { Landmark, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { budgetItems, projects } from '../data/dummyData';

const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const tooltipStyle = { backgroundColor: '#131722', border: '1px solid #2a3142', borderRadius: '12px', color: '#e8e6e3', fontSize: '12px' };
const pieColors = ['#c9a961', '#8a7650', '#e8d9b8', '#6d582f', '#34d399', '#38bdf8', '#a78bfa', '#fb7185', '#fbbf24', '#4a5060'];

export default function BudgetPage() {
  const [selectedProject, setSelectedProject] = useState('p1');
  const items = budgetItems.filter(b => b.projectId === selectedProject);
  const totalBudget = items.reduce((s, b) => s + b.budgeted, 0);
  const totalActual = items.reduce((s, b) => s + b.actual, 0);
  const totalCommitted = items.reduce((s, b) => s + b.committed, 0);
  const totalVariance = totalBudget - totalActual;
  const pieData = items.map(b => ({ name: b.category, value: b.actual }));

  const cards = [
    { label: 'Total Allocation', value: fmt(totalBudget), icon: Landmark, sub: projects.find(p => p.id === selectedProject)?.name || '', tint: 'from-[#c9a961]/25 to-transparent', color: 'text-[#c9a961]' },
    { label: 'Capital Deployed', value: fmt(totalActual), icon: TrendingDown, sub: `${((totalActual / totalBudget) * 100).toFixed(0)}% of allocation`, tint: 'from-sky-400/20 to-transparent', color: 'text-sky-300' },
    { label: 'Committed', value: fmt(totalCommitted), icon: Scale, sub: `${((totalCommitted / totalBudget) * 100).toFixed(0)}% encumbered`, tint: 'from-violet-400/20 to-transparent', color: 'text-violet-300' },
    { label: 'Variance', value: `${totalVariance >= 0 ? '+' : ''}${fmt(totalVariance)}`, icon: TrendingUp, sub: totalVariance >= 0 ? 'Favorable position' : 'Attention required', tint: totalVariance >= 0 ? 'from-emerald-400/20 to-transparent' : 'from-rose-400/20 to-transparent', color: totalVariance >= 0 ? 'text-emerald-300' : 'text-rose-300' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4 anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Finance</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Capital Ledger</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">Cost control across the portfolio</p>
        </div>
        <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}
          className="lux-input px-4 py-2.5 text-sm min-w-[240px]">
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="lux-card lux-hover-lift p-5 relative overflow-hidden anim-fade-up" style={delay(0.1 + i * 0.06)}>
              <div className={`absolute inset-0 bg-gradient-to-br ${c.tint} opacity-60`} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={15} className={c.color} />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b7280]">{c.label}</span>
                </div>
                <div className={`font-display text-[28px] font-bold ${c.color}`}>{c.value}</div>
                <div className="text-[11px] text-[#6b7280] mt-1 truncate">{c.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 lux-card p-6 anim-fade-up" style={delay(0.3)}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Budget vs. Deployment</h3>
              <p className="text-xs text-[#6b7280] mt-0.5">By cost category</p>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#3a4356]" /> Allocated</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#c9a961]" /> Deployed</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-sky-400" /> Committed</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={items} barGap={1}>
              <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 9.5, fill: '#6b7280' }} angle={-18} textAnchor="end" height={62} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={v => `$${(v as number) / 1000000}M`} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
              <Bar dataKey="budgeted" fill="#3a4356" name="Allocated" radius={[3, 3, 0, 0]} animationDuration={1200} />
              <Bar dataKey="actual" fill="#c9a961" name="Deployed" radius={[3, 3, 0, 0]} animationDuration={1200} />
              <Bar dataKey="committed" fill="#38bdf8" name="Committed" radius={[3, 3, 0, 0]} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lux-card p-6 anim-fade-up" style={delay(0.36)}>
          <h3 className="font-display text-lg font-semibold text-white mb-1">Capital Mix</h3>
          <p className="text-xs text-[#6b7280] mb-3">Where the money flows</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none" animationDuration={1300}>
                {pieData.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={v => fmt(v as number)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {pieData.slice(0, 6).map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/[.04] cursor-default">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
                <span className="text-[10px] text-[#8a8f98] truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lux-card overflow-hidden anim-fade-up" style={delay(0.42)}>
        <div className="px-6 py-4 border-b border-[#1f2533]"><h3 className="font-display font-semibold text-white">Line-Item Ledger</h3></div>
        <table className="w-full">
          <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
            {['Category', 'Allocated', 'Deployed', 'Committed', 'Delta', 'Utilization'].map((h, i) => (
              <th key={h} className={`px-5 py-3.5 text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em] ${i === 0 ? 'text-left' : i === 5 ? 'text-left pl-8' : 'text-right'}`}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{items.map((b, i) => (
            <tr key={b.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.3 + i * 0.03)}>
              <td className="px-5 py-4 text-sm font-medium text-white">{b.category}</td>
              <td className="px-5 py-4 text-sm text-[#c3cbd8] text-right">{fmt(b.budgeted)}</td>
              <td className="px-5 py-4 text-sm text-[#c3cbd8] text-right">{fmt(b.actual)}</td>
              <td className="px-5 py-4 text-sm text-[#c3cbd8] text-right">{fmt(b.committed)}</td>
              <td className={`px-5 py-4 text-sm text-right font-semibold ${b.variance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{b.variance >= 0 ? '+' : ''}{fmt(b.variance)}</td>
              <td className="px-5 py-4 pl-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-20 h-[5px] bg-[#1f2533] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full anim-bar" style={{ width: `${Math.min((b.actual / b.budgeted) * 100, 100)}%` }} />
                  </div>
                  <span className="text-[11px] text-[#6b7280] font-mono-lux">{((b.actual / b.budgeted) * 100).toFixed(0)}%</span>
                </div>
              </td>
            </tr>
          ))}</tbody>
          <tfoot><tr className="bg-[#0d1017] border-t border-[#2a3142]">
            <td className="px-5 py-4 text-sm font-bold text-white">Total</td>
            <td className="px-5 py-4 font-display font-bold text-white text-right">{fmt(totalBudget)}</td>
            <td className="px-5 py-4 font-display font-bold text-[#c9a961] text-right">{fmt(totalActual)}</td>
            <td className="px-5 py-4 font-display font-bold text-white text-right">{fmt(totalCommitted)}</td>
            <td className={`px-5 py-4 font-display font-bold text-right ${totalVariance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>+{fmt(totalVariance)}</td>
            <td className="px-5 py-4 text-[11px] text-[#6b7280]">{((totalActual / totalBudget) * 100).toFixed(0)}% deployed</td>
          </tr></tfoot>
        </table>
      </div>
    </div>
  );
}
