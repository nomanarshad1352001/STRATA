import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Check } from 'lucide-react';
import { milestones, projects, tasks } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const mStatus: Record<string, string> = {
  completed: 'bg-emerald-400/15 text-emerald-300', overdue: 'bg-rose-400/15 text-rose-300', upcoming: 'bg-[#c9a961]/15 text-[#c9a961]',
};
const ganttStyle: Record<string, { pos: string; w: string; grad: string }> = {
  p1: { pos: '8%', w: '44%', grad: 'from-sky-500 to-sky-400' },
  p2: { pos: '30%', w: '38%', grad: 'from-[#d9b876] to-[#b8954d]' },
  p3: { pos: '55%', w: '34%', grad: 'from-[#8a8f98] to-[#6b7280]' },
  p4: { pos: '5%', w: '40%', grad: 'from-violet-500 to-violet-400' },
  p5: { pos: '42%', w: '20%', grad: 'from-amber-500 to-amber-400' },
};

export default function SchedulePage() {
  const [view, setView] = useState<'timeline' | 'calendar'>('timeline');
  const [showNew, setShowNew] = useState(false);
  const [calMonth, setCalMonth] = useState(0);
  const [added, setAdded] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const ganttProjects = projects.filter(p => p.status !== 'completed');
  const calDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2;
    return { day: day + 1, inMonth: day >= 0 && day < 31, hasEvent: [5, 12, 15, 20, 22, 28].includes(day + 1), isToday: day + 1 === 15 };
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Time</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Master Schedule</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{milestones.length} milestones · critical path monitored</p>
        </div>
        <div className="flex gap-2.5">
          <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1">
            <button onClick={() => setView('timeline')} className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-all ${view === 'timeline' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Timeline</button>
            <button onClick={() => setView('calendar')} className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-all ${view === 'calendar' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Calendar</button>
          </div>
          <button onClick={() => setShowNew(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm">
            <Plus size={15} /> Milestone
          </button>
        </div>
      </div>

      {view === 'timeline' ? (
        <div className="space-y-6">
          <div className="lux-card p-6 overflow-x-auto anim-fade-up" style={delay(0.1)}>
            <h3 className="font-display text-lg font-semibold text-white mb-5">Engagement Timelines</h3>
            <div className="min-w-[860px]">
              <div className="flex items-center gap-2 mb-3 ml-52">
                {['Q1 23', 'Q2 23', 'Q3 23', 'Q4 23', 'Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25'].map(q => (
                  <div key={q} className="flex-1 text-center text-[9px] font-mono-lux text-[#4a5060] border-l border-[#1f2533] py-1.5">{q}</div>
                ))}
              </div>
              {ganttProjects.map((p, i) => {
                const g = ganttStyle[p.id] || { pos: '10%', w: '40%', grad: 'from-[#8a8f98] to-[#6b7280]' };
                return (
                  <div key={p.id} className="flex items-center gap-3 mb-2.5 group cursor-pointer hover:bg-white/[.02] rounded-xl py-1 anim-fade-up" style={delay(0.15 + i * 0.06)}>
                    <div className="w-48 flex items-center gap-2.5 flex-shrink-0">
                      <div className="w-9 h-7 rounded-md overflow-hidden border border-[#2a3142] flex-shrink-0"><img src={p.image} className="w-full h-full object-cover" /></div>
                      <span className="text-[13px] font-medium text-white truncate">{p.name}</span>
                    </div>
                    <div className="flex-1 relative h-7">
                      <div className={`absolute h-full rounded-lg bg-gradient-to-r ${g.grad} opacity-75 group-hover:opacity-100 transition-all flex items-center px-2.5 shadow-lg`}
                        style={{ left: g.pos, width: g.w }}>
                        <span className="text-[10px] text-white/90 font-semibold">{p.progress}%</span>
                      </div>
                      <div className={`absolute h-full rounded-lg bg-black/35 pointer-events-none`} style={{ left: g.pos, width: `calc(${g.w.replace(/\d+%/, m => (parseFloat(m) * (1 - p.progress / 100)).toFixed(1))}%)`, marginLeft: `calc(${g.w.replace(/\d+%/, m => (parseFloat(m) * p.progress / 100).toFixed(1))}%)` }} />
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center gap-4 mt-4 ml-52 text-[10px] text-[#6b7280]">
                <span className="flex items-center gap-1.5"><div className="w-3 h-2.5 rounded bg-[#c9a961]/80" /> Executed to date</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-2.5 rounded bg-black/60 border border-[#2a3142]" /> Remaining scope</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lux-card p-6 anim-fade-up" style={delay(0.25)}>
              <h3 className="font-display text-lg font-semibold text-white mb-5">Milestone Ledger</h3>
              <div className="space-y-1">
                {milestones.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-4 p-3 hover:bg-white/[.03] rounded-xl cursor-pointer transition-colors anim-fade-up" style={delay(0.28 + i * 0.04)}>
                    <div className="flex flex-col items-center self-stretch">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${m.status === 'completed' ? 'bg-emerald-400 border-emerald-400' : m.status === 'overdue' ? 'border-rose-400' : 'border-[#c9a961]'}`} />
                      {i < milestones.length - 1 && <div className="w-px flex-1 bg-[#2a3142] mt-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-white truncate">{m.name}</div>
                      <div className="text-[11px] text-[#6b7280] truncate">{projects.find(p => p.id === m.projectId)?.name}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-semibold text-white font-mono-lux">{m.dueDate}</div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full capitalize font-semibold ${mStatus[m.status]}`}>{m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lux-card p-6 anim-fade-up" style={delay(0.32)}>
              <h3 className="font-display text-lg font-semibold text-white mb-5">Approaching Deadlines</h3>
              <div className="space-y-2">
                {tasks.filter(t => t.status !== 'done').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((t, i) => (
                  <div key={t.id} className="flex items-center gap-3.5 p-3 hover:bg-white/[.03] rounded-xl cursor-pointer transition-colors anim-fade-up" style={delay(0.34 + i * 0.04)}>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.priority === 'urgent' ? 'bg-rose-400' : t.priority === 'high' ? 'bg-amber-400' : 'bg-[#c9a961]'}`} style={{ animation: t.priority === 'urgent' ? 'pulseGlow 1.5s infinite' : 'none' }} />
                    <span className="flex-1 text-sm text-[#e8e6e3] truncate">{t.title}</span>
                    <span className="text-[11px] text-[#6b7280]">{t.assignee.split(' ')[0]}</span>
                    <span className="text-[11px] font-semibold text-[#c9a961] font-mono-lux">{t.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lux-card p-6 anim-fade-up" style={delay(0.1)}>
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => setCalMonth(Math.max(0, calMonth - 1))} className="p-2 hover:bg-white/5 rounded-xl text-[#8a8f98] hover:text-[#c9a961] transition-colors"><ChevronLeft size={18} /></button>
            <h3 className="font-display text-xl font-bold text-white">{months[calMonth]} <span className="text-[#c9a961]">2024</span></h3>
            <button onClick={() => setCalMonth(Math.min(11, calMonth + 1))} className="p-2 hover:bg-white/5 rounded-xl text-[#8a8f98] hover:text-[#c9a961] transition-colors"><ChevronRight size={18} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-[#4a5060] uppercase tracking-widest py-2">{d}</div>
            ))}
            {calDays.map((d, i) => (
              <div key={i} className={`h-20 border rounded-xl p-2 transition-all ${d.inMonth ? 'border-[#1f2533] bg-[#0d1017] hover:border-[#c9a961]/40 cursor-pointer' : 'border-transparent bg-transparent'}`}>
                {d.inMonth && d.day > 0 && d.day <= 31 && (
                  <>
                    <span className={`text-[11px] font-semibold flex items-center justify-center w-6 h-6 rounded-lg ${d.isToday ? 'bg-gradient-to-br from-[#d9b876] to-[#b8954d] text-[#131008]' : 'text-[#8a8f98]'}`}>{d.day}</span>
                    {d.hasEvent && <div className="mt-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#c9a961] to-transparent w-3/4" />}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Milestone Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowNew(false)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Set Milestone</h2>
                <p className="text-xs text-[#6b7280] mt-1">Anchor point on the critical path</p></div>
              <button onClick={() => setShowNew(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {added ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 flex items-center justify-center mb-4"><Check size={24} className="text-[#c9a961]" /></div>
                <h3 className="font-display text-lg font-bold text-white">Milestone Anchored</h3>
                <button onClick={() => { setShowNew(false); setAdded(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Done</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Designation</label><input className="w-full lux-input px-4 py-2.5 text-sm" placeholder="e.g. Structure Top-Out" /></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Scope</label><textarea className="w-full lux-input px-4 py-2.5 text-sm" rows={2} /></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Engagement</label>
                    <select className="w-full lux-input px-4 py-2.5 text-sm">{projects.map(p => <option key={p.id}>{p.name}</option>)}</select></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Target Date</label><input type="date" className="w-full lux-input px-4 py-2.5 text-sm [color-scheme:dark]" /></div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowNew(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Cancel</button>
                  <button onClick={() => setAdded(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">Anchor Milestone</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
