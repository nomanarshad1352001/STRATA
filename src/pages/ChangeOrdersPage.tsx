import { useState } from 'react';
import { Plus, Search, X, Check, Ban, FileSignature } from 'lucide-react';
import { changeOrders, projects } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const statusChip: Record<string, string> = {
  draft: 'bg-white/10 text-[#c3cbd8] border-white/12', submitted: 'bg-sky-400/15 text-sky-300 border-sky-400/25',
  approved: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', rejected: 'bg-rose-400/15 text-rose-300 border-rose-400/25',
};

export default function ChangeOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);
  const [selectedCO, setSelectedCO] = useState<typeof changeOrders[0] | null>(null);
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
  const [created, setCreated] = useState(false);

  const filtered = changeOrders.filter(co =>
    co.title.toLowerCase().includes(search.toLowerCase()) && (statusFilter === 'all' || co.status === statusFilter)
  );
  const totalApproved = changeOrders.filter(co => co.status === 'approved').reduce((s, co) => s + co.amount, 0);

  const summary = [
    { label: 'Instruments Filed', val: changeOrders.length.toString(), tint: 'from-sky-400/20 to-transparent', color: 'text-sky-300' },
    { label: 'Approved Value', val: `$${(totalApproved / 1000).toFixed(0)}K`, tint: 'from-emerald-400/20 to-transparent', color: 'text-emerald-300' },
    { label: 'Awaiting Decision', val: changeOrders.filter(c => c.status === 'submitted' || c.status === 'draft').length.toString(), tint: 'from-[#c9a961]/25 to-transparent', color: 'text-[#c9a961]' },
    { label: 'Declined', val: changeOrders.filter(c => c.status === 'rejected').length.toString(), tint: 'from-rose-400/20 to-transparent', color: 'text-rose-300' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Contract Control</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Change Instruments</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{changeOrders.length} change orders under review</p>
        </div>
        <button onClick={() => setShowNew(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Plus size={16} /> Draft Instrument
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((s, i) => (
          <div key={s.label} className="lux-card lux-hover-lift p-5 cursor-pointer relative overflow-hidden anim-fade-up" style={delay(0.1 + i * 0.06)}>
            <div className={`absolute inset-0 bg-gradient-to-br ${s.tint} opacity-60`} />
            <div className="relative">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#6b7280]">{s.label}</div>
              <div className={`font-display text-3xl font-bold mt-1 ${s.color}`}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap anim-fade-up" style={delay(0.2)}>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
          <input type="text" placeholder="Search instruments…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1">
          {['all', 'draft', 'submitted', 'approved', 'rejected'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-all ${statusFilter === s ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="lux-card overflow-hidden anim-fade-up" style={delay(0.26)}>
        <table className="w-full">
          <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
            {['Ref', 'Instrument', 'Standing', 'Consideration', 'Grounds', 'Filed By', 'Date'].map(h => (
              <th key={h} className="px-5 py-4 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
            ))}
          </tr></thead>
          <tbody>{filtered.map((co, i) => (
            <tr key={co.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.1 + i * 0.04)}
              onClick={() => { setSelectedCO(co); setDecision(null); }}>
              <td className="px-5 py-4 font-mono-lux text-[11px] text-[#c9a961]">{co.number}</td>
              <td className="px-5 py-4"><div className="text-sm font-medium text-white max-w-[220px] truncate">{co.title}</div></td>
              <td className="px-5 py-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize border ${statusChip[co.status]}`}>{co.status}</span></td>
              <td className="px-5 py-4 font-display font-bold text-white">${co.amount.toLocaleString()}</td>
              <td className="px-5 py-4 text-xs text-[#8a8f98]">{co.reason}</td>
              <td className="px-5 py-4 text-sm text-[#8a8f98]">{co.submittedBy}</td>
              <td className="px-5 py-4 text-[11px] text-[#6b7280] font-mono-lux">{co.submittedDate}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* CO Detail Modal */}
      {selectedCO && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedCO(null)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-lux text-[10px] text-[#c9a961] tracking-wider">{selectedCO.number}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold capitalize border ${statusChip[selectedCO.status]}`}>{selectedCO.status}</span>
                </div>
                <h2 className="font-display text-lg font-bold text-white pr-4">{selectedCO.title}</h2>
              </div>
              <button onClick={() => setSelectedCO(null)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            <div className="relative overflow-hidden bg-[#0d1017] border border-[#c9a961]/25 rounded-2xl p-5 mb-5 text-center">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#c9a961]/10 rounded-full blur-2xl" />
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#6b7280]">Consideration</div>
              <div className="font-display text-4xl font-bold text-[#c9a961] mt-1">${selectedCO.amount.toLocaleString()}</div>
            </div>
            <p className="text-sm text-[#9aa3b2] mb-5 leading-relaxed">{selectedCO.description}</p>
            <div className="space-y-2.5 mb-5">
              {[['Grounds', selectedCO.reason], ['Filed By', selectedCO.submittedBy], ['Date Filed', selectedCO.submittedDate],
                ['Engagement', projects.find(p => p.id === selectedCO.projectId)?.name || '']].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1f2533]/60">
                  <span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span><span className="font-medium text-white">{v}</span>
                </div>
              ))}
            </div>
            {(selectedCO.status === 'submitted' || selectedCO.status === 'draft') && !decision && (
              <div className="flex gap-2.5">
                <button onClick={() => setDecision('approved')} className="flex-1 py-3 rounded-xl text-sm font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-2">
                  <FileSignature size={15} /> Execute & Approve
                </button>
                <button onClick={() => setDecision('rejected')} className="flex-1 py-3 rounded-xl text-sm font-semibold bg-rose-500/10 text-rose-300 border border-rose-400/25 hover:bg-rose-500/20 transition-all flex items-center justify-center gap-2">
                  <Ban size={15} /> Decline
                </button>
              </div>
            )}
            {decision && (
              <div className={`text-center py-3.5 rounded-xl text-sm font-semibold anim-fade-up flex items-center justify-center gap-2 ${decision === 'approved' ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/30' : 'bg-rose-400/15 text-rose-300 border border-rose-400/30'}`}>
                <Check size={15} /> Instrument {decision === 'approved' ? 'executed' : 'declined'} — parties notified
              </div>
            )}
          </div>
        </div>
      )}

      {/* New CO Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowNew(false)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Draft Change Instrument</h2>
                <p className="text-xs text-[#6b7280] mt-1">Contractual scope modification</p></div>
              <button onClick={() => setShowNew(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {created ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 flex items-center justify-center mb-4"><FileSignature size={22} className="text-[#c9a961]" /></div>
                <h3 className="font-display text-lg font-bold text-white">Instrument Filed</h3>
                <button onClick={() => { setShowNew(false); setCreated(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Done</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Title</label>
                    <input className="w-full lux-input px-4 py-2.5 text-sm" placeholder="Nature of the change" /></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Justification</label>
                    <textarea className="w-full lux-input px-4 py-2.5 text-sm" rows={3} placeholder="Explain the scope modification…" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Consideration ($)</label>
                      <input type="number" className="w-full lux-input px-4 py-2.5 text-sm" placeholder="250000" /></div>
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Grounds</label>
                      <select className="w-full lux-input px-4 py-2.5 text-sm"><option>Client Request</option><option>Scope Change</option><option>Unforeseen Conditions</option><option>Regulatory Change</option></select></div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowNew(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Discard</button>
                  <button onClick={() => setCreated(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">File Instrument</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
