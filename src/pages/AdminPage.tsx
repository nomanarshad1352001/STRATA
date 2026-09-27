import { useState } from 'react';
import { Shield, Users, Building2, AlertTriangle, Search, Eye, Ban, Check, X, Activity } from 'lucide-react';
import { companies, auditLogs } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const planChip: Record<string, string> = {
  enterprise: 'bg-[#c9a961]/15 text-[#c9a961] border-[#c9a961]/30', professional: 'bg-sky-400/15 text-sky-300 border-sky-400/25', starter: 'bg-white/8 text-[#c3cbd8] border-white/12',
};
const statusChip: Record<string, string> = {
  active: 'bg-emerald-400/15 text-emerald-300', trial: 'bg-amber-400/15 text-amber-300', suspended: 'bg-rose-400/15 text-rose-300',
};

export default function AdminPage() {
  const [tab, setTab] = useState<'companies' | 'audit' | 'system'>('companies');
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);
  const [search, setSearch] = useState('');
  const [action, setAction] = useState('');

  const filteredCompanies = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const stats = [
    { label: 'Tenant Firms', val: companies.length, icon: Building2, tint: 'from-sky-400/20 to-transparent', color: 'text-sky-300' },
    { label: 'Platform Users', val: 152, icon: Users, tint: 'from-emerald-400/20 to-transparent', color: 'text-emerald-300' },
    { label: 'Open Incidents', val: 3, icon: AlertTriangle, tint: 'from-rose-400/20 to-transparent', color: 'text-rose-300' },
    { label: 'Fabric Uptime', val: '99.98%', icon: Activity, tint: 'from-[#c9a961]/25 to-transparent', color: 'text-[#c9a961]' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-4 anim-fade-up">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/40 flex items-center justify-center">
          <Shield size={22} className="text-[#c9a961]" />
        </div>
        <div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Sovereign Console</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Platform-wide administration · super-admin clearance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="lux-card lux-hover-lift p-5 relative overflow-hidden anim-fade-up" style={delay(0.1 + i * 0.06)}>
              <div className={`absolute inset-0 bg-gradient-to-br ${s.tint} opacity-60`} />
              <div className="relative">
                <Icon size={17} className={`${s.color} mb-3`} />
                <div className="font-display text-3xl font-bold text-white">{s.val}</div>
                <div className="text-[11px] text-[#6b7280]">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 w-fit anim-fade-up" style={delay(0.2)}>
        {[['companies', 'Tenants'], ['audit', 'Audit Trail'], ['system', 'Fabric Health']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id as typeof tab)}
            className={`px-5 py-2 text-xs rounded-lg font-medium transition-all ${tab === id ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>{label}</button>
        ))}
      </div>

      <div key={tab} className="anim-fade-up">
      {tab === 'companies' && (
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
            <input type="text" placeholder="Search tenants…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
          </div>
          <div className="lux-card overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
                {['Firm', 'Tier', 'Standing', 'Users', 'Projects', 'Storage', 'Established', ''].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr></thead>
              <tbody>{filteredCompanies.map((c, i) => (
                <tr key={c.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.05 + i * 0.04)}
                  onClick={() => setSelectedCompany(c)}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/25 flex items-center justify-center font-display font-bold text-[#c9a961] text-xs">
                        {c.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                      <div><div className="font-medium text-sm text-white">{c.name}</div><div className="text-[11px] text-[#4a5060]">{c.owner}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize border ${planChip[c.plan]}`}>{c.plan}</span></td>
                  <td className="px-5 py-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-medium capitalize ${statusChip[c.status]}`}>{c.status}</span></td>
                  <td className="px-5 py-4 text-sm text-[#c3cbd8]">{c.usersCount}</td>
                  <td className="px-5 py-4 text-sm text-[#c3cbd8]">{c.projectsCount}</td>
                  <td className="px-5 py-4 text-xs text-[#6b7280] font-mono-lux">{c.storageUsed}</td>
                  <td className="px-5 py-4 text-[11px] text-[#6b7280] font-mono-lux">{c.createdAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      <button onClick={e => { e.stopPropagation(); setSelectedCompany(c); }} className="p-2 rounded-lg hover:bg-white/[.06] text-[#8a8f98] hover:text-[#c9a961] transition-colors"><Eye size={14} /></button>
                      <button onClick={e => { e.stopPropagation(); if (confirm(`Suspend ${c.name}?`)) { setAction(`${c.name} suspended`); setTimeout(() => setAction(''), 2500); } }}
                        className="p-2 rounded-lg hover:bg-rose-500/10 text-[#8a8f98] hover:text-rose-300 transition-colors"><Ban size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          {action && <div className="anim-fade-up text-sm text-amber-300 bg-amber-400/10 border border-amber-400/25 rounded-xl px-4 py-3 flex items-center gap-2"><Ban size={14} /> {action}</div>}
        </div>
      )}

      {tab === 'audit' && (
        <div className="lux-card overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1f2533]"><h3 className="font-display font-semibold text-white">Immutable Audit Trail</h3></div>
          <table className="w-full">
            <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
              {['Timestamp', 'Event', 'Actor', 'Detail', 'Origin IP'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr></thead>
            <tbody>{auditLogs.map((log, i) => (
              <tr key={log.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(i * 0.03)}>
                <td className="px-5 py-3.5 text-[11px] text-[#6b7280] font-mono-lux">{log.timestamp}</td>
                <td className="px-5 py-3.5"><span className="text-[10px] bg-[#c9a961]/10 text-[#c9a961] border border-[#c9a961]/25 px-2.5 py-1 rounded-full">{log.action}</span></td>
                <td className="px-5 py-3.5 text-sm text-white">{log.user}</td>
                <td className="px-5 py-3.5 text-sm text-[#8a8f98]">{log.details}</td>
                <td className="px-5 py-3.5 text-[11px] font-mono-lux text-[#4a5060]">{log.ip}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {tab === 'system' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lux-card p-6">
              <h3 className="font-display font-semibold text-white mb-4">Fabric Status</h3>
              {[['API Gateway', 'Operational', true], ['Ledger Database', 'Operational', true], ['Media Vault', 'Operational', true],
                ['Dispatch Service', 'Degraded', false], ['Background Engines', 'Operational', true]].map(([service, status, ok]) => (
                <div key={service as string} className="flex items-center justify-between py-3 border-b border-[#1f2533]/60 last:border-0 hover:bg-white/[.02] px-2 rounded-lg cursor-pointer transition-colors">
                  <span className="text-sm text-[#c3cbd8]">{service as string}</span>
                  <span className={`flex items-center gap-2 text-xs font-medium ${ok ? 'text-emerald-300' : 'text-amber-300'}`}>
                    <div className={`w-2 h-2 rounded-full ${ok ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ animation: 'pulseGlow 2s infinite' }} />{status as string}
                  </span>
                </div>
              ))}
            </div>
            <div className="lux-card p-6">
              <h3 className="font-display font-semibold text-white mb-4">Telemetry</h3>
              {[['API Calls (24h)', '1.2M'], ['Median Latency', '143ms'], ['Error Rate', '0.018%'], ['Vault Consumption', '1.8 TB'], ['Live Connections', '342']].map(([metric, value]) => (
                <div key={metric} className="flex items-center justify-between py-3 border-b border-[#1f2533]/60 last:border-0 hover:bg-white/[.02] px-2 rounded-lg cursor-pointer transition-colors">
                  <span className="text-sm text-[#c3cbd8]">{metric}</span>
                  <span className="text-sm font-semibold text-[#c9a961] font-mono-lux">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lux-card p-6">
            <h3 className="font-display font-semibold text-white mb-4">Privileged Operations</h3>
            <div className="flex flex-wrap gap-2.5">
              {['Purge Cache', 'Cycle Workers', 'Execute Migrations', 'Compile Board Report', 'Broadcast Announcement', 'Snapshot Vault'].map(action => (
                <button key={action} onClick={() => alert(`${action} initiated — ops team notified`)}
                  className="lux-btn-ghost px-4 py-2.5 rounded-xl text-xs">{action}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedCompany(null)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/30 flex items-center justify-center font-display font-bold text-[#c9a961] text-lg">
                  {selectedCompany.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div><h2 className="font-display text-lg font-bold text-white">{selectedCompany.name}</h2>
                  <div className="text-xs text-[#6b7280]">Principal: {selectedCompany.owner}</div></div>
              </div>
              <button onClick={() => setSelectedCompany(null)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-2.5 mb-5">
              {[['Tier', selectedCompany.plan], ['Standing', selectedCompany.status], ['Users', selectedCompany.usersCount.toString()],
                ['Projects', selectedCompany.projectsCount.toString()], ['Storage', selectedCompany.storageUsed], ['Established', selectedCompany.createdAt]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1f2533]/60">
                  <span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span><span className="font-medium text-white capitalize">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5">
              <button onClick={() => { setSelectedCompany(null); alert('Tier upgraded'); }} className="flex-1 lux-btn-gold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5"><Check size={14} /> Elevate Tier</button>
              <button onClick={() => { setSelectedCompany(null); if (confirm('Suspend this tenant?')) setAction(`${selectedCompany.name} suspended`); }}
                className="flex-1 py-2.5 rounded-xl text-sm border border-rose-400/30 text-rose-300 hover:bg-rose-500/10 transition-colors flex items-center justify-center gap-1.5"><Ban size={14} /> Suspend</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
