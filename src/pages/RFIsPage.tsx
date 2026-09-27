import { useState } from 'react';
import { Plus, Search, X, MessageCircle, Check } from 'lucide-react';
import { rfis, projects } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const statusChip: Record<string, string> = {
  open: 'bg-sky-400/15 text-sky-300 border-sky-400/25', answered: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', closed: 'bg-white/8 text-[#8a8f98] border-white/12',
};
const priorityChip: Record<string, string> = {
  urgent: 'bg-rose-400/15 text-rose-300 border-rose-400/25', high: 'bg-amber-400/15 text-amber-300 border-amber-400/25',
  medium: 'bg-yellow-400/10 text-yellow-200 border-yellow-400/20', low: 'bg-white/5 text-[#8a8f98] border-white/10',
};

export default function RFIsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);
  const [selectedRFI, setSelectedRFI] = useState<typeof rfis[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [responded, setResponded] = useState(false);

  const filtered = rfis.filter(r =>
    r.subject.toLowerCase().includes(search.toLowerCase()) && (statusFilter === 'all' || r.status === statusFilter)
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Clarity</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Requests for Information</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{rfis.length} open channels · SLA tracked</p>
        </div>
        <button onClick={() => setShowNew(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Plus size={16} /> Draft RFI
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap anim-fade-up" style={delay(0.08)}>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
          <input type="text" placeholder="Search RFIs…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1">
          {['all', 'open', 'answered', 'closed'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 text-xs rounded-lg font-medium capitalize transition-all ${statusFilter === s ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3.5">
        {filtered.map((r, i) => (
          <div key={r.id} onClick={() => { setSelectedRFI(r); setResponded(false); }}
            className="lux-card lux-hover-lift p-5 cursor-pointer anim-fade-up" style={delay(0.12 + i * 0.05)}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#c9a961]/12 border border-[#c9a961]/25 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-[#c9a961]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-lux text-[10px] text-[#c9a961] tracking-wider">{r.number}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold capitalize border ${statusChip[r.status]}`}>{r.status}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold capitalize border ${priorityChip[r.priority]}`}>{r.priority}</span>
                  </div>
                  <h3 className="font-display font-semibold text-white mt-1.5 truncate">{r.subject}</h3>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] uppercase tracking-wider text-[#4a5060]">Response due</div>
                <div className="text-sm font-semibold text-[#c9a961] font-mono-lux mt-0.5">{r.dueDate}</div>
              </div>
            </div>
            <p className="text-sm text-[#9aa3b2] mt-3 leading-relaxed line-clamp-2">{r.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-[11px] text-[#6b7280]">
              <span>From <span className="text-[#c3cbd8]">{r.submittedBy}</span></span>
              <span className="text-[#4a5060]">→</span>
              <span>To <span className="text-[#c3cbd8]">{r.assignedTo}</span></span>
              <span className="ml-auto text-[#4a5060]">{projects.find(p => p.id === r.projectId)?.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RFI Detail Modal */}
      {selectedRFI && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedRFI(null)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-lux text-[10px] text-[#c9a961] tracking-wider">{selectedRFI.number}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium capitalize border ${statusChip[selectedRFI.status]}`}>{selectedRFI.status}</span>
                </div>
                <h2 className="font-display text-lg font-bold text-white pr-4">{selectedRFI.subject}</h2>
              </div>
              <button onClick={() => setSelectedRFI(null)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            <p className="text-sm text-[#9aa3b2] mb-5 leading-relaxed bg-[#0d1017] border border-[#1f2533] rounded-xl p-4">{selectedRFI.description}</p>
            <div className="grid grid-cols-2 gap-x-4 mb-5">
              {[['Submitted By', selectedRFI.submittedBy], ['Assigned To', selectedRFI.assignedTo], ['Priority', selectedRFI.priority], ['Response Due', selectedRFI.dueDate]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1f2533]/60">
                  <span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span><span className="font-medium text-white capitalize">{v}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-2">Official Response</label>
              <textarea className="w-full lux-input px-4 py-3 text-sm" rows={3} placeholder="Compose the firm's response…" />
            </div>
            <div className="flex gap-2.5 mt-5">
              <button onClick={() => setResponded(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                {responded ? <><Check size={14} /> Response Recorded</> : 'Submit Response'}
              </button>
              <button onClick={() => setSelectedRFI(null)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Close File</button>
            </div>
          </div>
        </div>
      )}

      {/* New RFI Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowNew(false)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Draft Request</h2>
                <p className="text-xs text-[#6b7280] mt-1">Formal request for information</p></div>
              <button onClick={() => setShowNew(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {submitted ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center mb-4"><Check size={24} className="text-emerald-300" /></div>
                <h3 className="font-display text-lg font-bold text-white">RFI Dispatched</h3>
                <button onClick={() => { setShowNew(false); setSubmitted(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Done</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Subject</label>
                    <input className="w-full lux-input px-4 py-2.5 text-sm" placeholder="Concise statement of the question" /></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Detail</label>
                    <textarea className="w-full lux-input px-4 py-2.5 text-sm" rows={3} placeholder="Full context and specifics…" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Engagement</label>
                      <select className="w-full lux-input px-4 py-2.5 text-sm">{projects.map(p => <option key={p.id}>{p.name}</option>)}</select></div>
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Priority</label>
                      <select className="w-full lux-input px-4 py-2.5 text-sm"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowNew(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Cancel</button>
                  <button onClick={() => setSubmitted(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">Dispatch RFI</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
