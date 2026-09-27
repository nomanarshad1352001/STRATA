import { useState } from 'react';
import { Plus, Search, Star, Phone, Mail, Shield, X, AlertTriangle, Award, Check } from 'lucide-react';
import { subcontractors } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const statusChip: Record<string, string> = {
  active: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25',
  prequalified: 'bg-sky-400/15 text-sky-300 border-sky-400/25',
  inactive: 'bg-white/8 text-[#8a8f98] border-white/12',
};

export default function SubcontractorsPage() {
  const [search, setSearch] = useState('');
  const [tradeFilter, setTradeFilter] = useState('all');
  const [showNew, setShowNew] = useState(false);
  const [selectedSub, setSelectedSub] = useState<typeof subcontractors[0] | null>(null);
  const [added, setAdded] = useState(false);

  const trades = [...new Set(subcontractors.map(s => s.trade))];
  const filtered = subcontractors.filter(s =>
    s.company.toLowerCase().includes(search.toLowerCase()) && (tradeFilter === 'all' || s.trade === tradeFilter)
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Partners</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Trade Partners</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{subcontractors.length} vetted subcontractors & vendors</p>
        </div>
        <button onClick={() => setShowNew(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Plus size={16} /> Onboard Partner
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap anim-fade-up" style={delay(0.08)}>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
          <input type="text" placeholder="Search partners…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 flex-wrap">
          <button onClick={() => setTradeFilter('all')} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${tradeFilter === 'all' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>All</button>
          {trades.map(t => (
            <button key={t} onClick={() => setTradeFilter(t)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${tradeFilter === t ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((s, i) => (
          <div key={s.id} onClick={() => setSelectedSub(s)}
            className="lux-card lux-hover-lift p-5 cursor-pointer anim-fade-up" style={delay(0.12 + i * 0.05)}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/25 flex items-center justify-center">
                  <span className="font-display font-bold text-[#c9a961] text-sm">{s.company.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-[15px]">{s.company}</h3>
                  <span className="text-[11px] text-[#6b7280]">{s.trade}</span>
                </div>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize border ${statusChip[s.status]}`}>{s.status}</span>
            </div>
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(n => <Star key={n} size={13} className={n <= Math.round(s.rating) ? 'text-[#c9a961] fill-[#c9a961]' : 'text-[#2a3142]'} />)}
              <span className="text-xs text-[#c9a961] font-semibold ml-1.5">{s.rating}</span>
              {s.rating >= 4.7 && <Award size={13} className="text-[#c9a961] ml-1" />}
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2.5 text-xs text-[#8a8f98]"><Mail size={12} className="text-[#c9a961]/60" /> {s.email}</div>
              <div className="flex items-center gap-2.5 text-xs text-[#8a8f98]"><Phone size={12} className="text-[#c9a961]/60" /> {s.phone}</div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#1f2533]">
              <span className="text-[11px] text-[#4a5060]">{s.projectsCompleted} deliveries</span>
              {new Date(s.insuranceExpiry) < new Date('2024-06-01') && (
                <span className="flex items-center gap-1.5 text-[10px] text-amber-300 font-medium"><AlertTriangle size={11} /> Insurance lapsing</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sub Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedSub(null)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/30 flex items-center justify-center font-display font-bold text-[#c9a961]">
                  {selectedSub.company.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">{selectedSub.company}</h2>
                  <div className="flex gap-2 mt-1"><span className="text-[11px] text-[#6b7280]">{selectedSub.trade}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize border ${statusChip[selectedSub.status]}`}>{selectedSub.status}</span></div>
                </div>
              </div>
              <button onClick={() => setSelectedSub(null)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-2.5">
              {[['Principal Contact', selectedSub.contact], ['Email', selectedSub.email], ['Line', selectedSub.phone],
                ['License', selectedSub.licenseNumber], ['Insurance Valid Through', selectedSub.insuranceExpiry],
                ['Deliveries', `${selectedSub.projectsCompleted} projects`], ['Partner Rating', `${selectedSub.rating} / 5.0`]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1f2533]/60">
                  <span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span><span className="font-medium text-white">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-6">
              <button className="flex-1 lux-btn-gold py-2.5 rounded-xl text-sm">Edit Record</button>
              <button className="flex-1 lux-btn-ghost py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5"><Shield size={13} /> Verify Docs</button>
              <button className="flex-1 lux-btn-ghost py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5"><Mail size={13} /> Contact</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowNew(false)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Onboard Trade Partner</h2>
                <p className="text-xs text-[#6b7280] mt-1">Prequalification & vetting</p></div>
              <button onClick={() => setShowNew(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {added ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center mb-4"><Check size={24} className="text-emerald-300" /></div>
                <h3 className="font-display text-lg font-bold text-white">Partner Onboarded</h3>
                <button onClick={() => { setShowNew(false); setAdded(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Done</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {[['Firm Name', 'text', 'e.g. Sterling Masonry Ltd.'], ['Trade Discipline', 'text', 'e.g. Masonry'], ['Principal Contact', 'text', 'Full name'],
                    ['Email', 'email', 'office@firm.com'], ['Line', 'tel', '(555) 000-0000'], ['License Number', 'text', 'XX-2024-0000']].map(([label, type, ph]) => (
                    <div key={label as string}>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">{label as string}</label>
                      <input type={type as string} className="w-full lux-input px-4 py-2.5 text-sm" placeholder={ph as string} />
                    </div>
                  ))}
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Insurance Expiry</label>
                    <input type="date" className="w-full lux-input px-4 py-2.5 text-sm [color-scheme:dark]" /></div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowNew(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Cancel</button>
                  <button onClick={() => setAdded(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">Onboard Partner</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
