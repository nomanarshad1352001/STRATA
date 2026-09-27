import { useState } from 'react';
import { Plus, CloudSun, Users, Clock, AlertTriangle, X, Check, Camera } from 'lucide-react';
import { dailyLogs, projects, heroImages } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const logPhotos = [heroImages.site1, heroImages.site3, heroImages.site7, heroImages.site2, heroImages.login];

export default function DailyLogsPage() {
  const [showNew, setShowNew] = useState(false);
  const [selectedLog, setSelectedLog] = useState<typeof dailyLogs[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Field Operations</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Field Journal</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{dailyLogs.length} entries · daily site intelligence</p>
        </div>
        <button onClick={() => setShowNew(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Plus size={16} /> File Entry
        </button>
      </div>

      <div className="space-y-4">
        {dailyLogs.map((log, i) => (
          <div key={log.id} onClick={() => setSelectedLog(log)}
            className="lux-card lux-hover-lift cursor-pointer overflow-hidden anim-fade-up" style={delay(0.1 + i * 0.06)}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-56 h-40 md:h-auto flex-shrink-0 img-zoom relative">
                <img src={logPhotos[i % logPhotos.length]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#11141c]/60 hidden md:block" />
                <div className="absolute top-3 left-3 text-[10px] font-mono-lux text-white bg-black/50 backdrop-blur px-2.5 py-1 rounded-lg border border-white/15">{log.date}</div>
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#c9a961]/12 border border-[#c9a961]/25 flex items-center justify-center"><CloudSun size={17} className="text-[#c9a961]" /></div>
                    <div>
                      <div className="font-display font-semibold text-white text-[15px]">{projects.find(p => p.id === log.projectId)?.name}</div>
                      <div className="text-[11px] text-[#6b7280]">{log.weather} · {log.temperature}</div>
                    </div>
                  </div>
                  {log.delaysReported && (
                    <span className="text-[10px] text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">Delay Noted</span>
                  )}
                </div>
                <p className="text-sm text-[#9aa3b2] leading-relaxed line-clamp-2">{log.summary}</p>
                <div className="flex flex-wrap items-center gap-5 mt-4 text-[11px] text-[#6b7280]">
                  <span className="flex items-center gap-1.5"><Users size={12} className="text-[#c9a961]/70" /> {log.workersOnSite} personnel</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#c9a961]/70" /> {log.hoursWorked} hours</span>
                  <span className="flex items-center gap-1.5"><AlertTriangle size={12} className="text-[#c9a961]/70" /> {log.safetyIncidents} incidents</span>
                  <span className="flex items-center gap-1.5"><Camera size={12} className="text-[#c9a961]/70" /> 12 captures</span>
                  <span className="ml-auto text-[#4a5060]">Filed by {log.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedLog(null)}>
          <div className="lux-card w-full max-w-lg p-0 anim-modal border-[#2a3142] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative h-44">
              <img src={logPhotos[0]} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] to-transparent" />
              <button onClick={() => setSelectedLog(null)} className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70"><X size={16} /></button>
              <div className="absolute bottom-4 left-6">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#c9a961]">Field Entry · {selectedLog.date}</div>
                <h2 className="font-display text-xl font-bold text-white mt-1">{projects.find(p => p.id === selectedLog.projectId)?.name}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[['Conditions', `${selectedLog.weather} · ${selectedLog.temperature}`], ['Personnel', `${selectedLog.workersOnSite} on site`],
                  ['Labor', `${selectedLog.hoursWorked} hours`], ['Incidents', `${selectedLog.safetyIncidents} reported`]].map(([k, v]) => (
                  <div key={k} className="bg-[#0d1017] border border-[#1f2533] rounded-xl p-3.5">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#4a5060]">{k}</div>
                    <div className="font-medium text-sm text-white mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mb-4"><h3 className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-2">Narrative</h3>
                <p className="text-sm text-[#c3cbd8] leading-relaxed">{selectedLog.summary}</p></div>
              <div className="pt-4 border-t border-[#1f2533] flex justify-between text-xs text-[#6b7280]">
                <span>Filed by {selectedLog.author}</span>
                {selectedLog.delaysReported && <span className="text-amber-300 font-medium">Delays officially noted</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Log Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowNew(false)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">File Field Entry</h2>
                <p className="text-xs text-[#6b7280] mt-1">Daily site intelligence report</p></div>
              <button onClick={() => setShowNew(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {submitted ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center mb-4"><Check size={24} className="text-emerald-300" /></div>
                <h3 className="font-display text-lg font-bold text-white">Entry Filed</h3>
                <p className="text-sm text-[#8a8f98] mt-2">The journal entry has been logged.</p>
                <button onClick={() => { setShowNew(false); setSubmitted(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Done</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Date</label>
                      <input type="date" className="w-full lux-input px-4 py-2.5 text-sm [color-scheme:dark]" /></div>
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Engagement</label>
                      <select className="w-full lux-input px-4 py-2.5 text-sm">{projects.map(p => <option key={p.id}>{p.name}</option>)}</select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Conditions</label>
                      <select className="w-full lux-input px-4 py-2.5 text-sm"><option>Sunny</option><option>Partly Cloudy</option><option>Overcast</option><option>Rain</option><option>Storm</option></select></div>
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Temperature</label>
                      <input type="text" className="w-full lux-input px-4 py-2.5 text-sm" placeholder="72°F" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Personnel</label>
                      <input type="number" className="w-full lux-input px-4 py-2.5 text-sm" placeholder="42" /></div>
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Total Hours</label>
                      <input type="number" className="w-full lux-input px-4 py-2.5 text-sm" placeholder="336" /></div>
                  </div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Narrative</label>
                    <textarea className="w-full lux-input px-4 py-2.5 text-sm" rows={4} placeholder="Describe the day on site…" /></div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#c9a961]" /><span className="text-sm text-[#c3cbd8]">Safety incident</span></label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#c9a961]" /><span className="text-sm text-[#c3cbd8]">Delay occurred</span></label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowNew(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Cancel</button>
                  <button onClick={() => setSubmitted(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">File Entry</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
