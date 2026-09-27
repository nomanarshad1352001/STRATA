import { useState } from 'react';
import { Eye, Download, MessageSquare, Calendar, FileText, ArrowUpRight, Send } from 'lucide-react';
import { projects, documents, milestones } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const mStatus: Record<string, string> = {
  completed: 'bg-emerald-400/15 text-emerald-300', overdue: 'bg-rose-400/15 text-rose-300', upcoming: 'bg-[#c9a961]/15 text-[#c9a961]', 
};
const fmt = (n: number) => `$${(n / 1000000).toFixed(1)}M`;

const initialMsgs = [
  { from: 'Mike Rodriguez', msg: 'Delighted to report — Floor 16 poured ahead of schedule, sir.', time: '2h ago', isMe: false },
  { from: 'You', msg: 'Excellent news. And the curtain wall on the south face?', time: '1h ago', isMe: true },
  { from: 'Mike Rodriguez', msg: 'On track. Panels arrive Monday; we begin the south elevation within the week.', time: '45m ago', isMe: false },
];

export default function ClientPortal() {
  const [tab, setTab] = useState('overview');
  const [messages, setMessages] = useState(initialMsgs);
  const [draft, setDraft] = useState('');
  const project = projects[0];

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages([...messages, { from: 'You', msg: draft, time: 'now', isMe: true }]);
    setDraft('');
    setTimeout(() => {
      setMessages(m => [...m, { from: 'Mike Rodriguez', msg: 'Received — I shall confirm with the site office and revert within the hour.', time: 'now', isMe: false }]);
    }, 1600);
  };

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="relative h-64 lg:h-72 overflow-hidden">
        <img src={project.image} alt="" className="w-full h-full object-cover anim-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c11] via-[#0a0c11]/55 to-[#0a0c11]/25" />
        <div className="absolute inset-0 px-6 lg:px-8 py-7 flex flex-col justify-end max-w-[1600px] mx-auto">
          <div className="anim-fade-up">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold mb-2">Client Observatory · Private View</div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-white">{project.name}</h1>
            <p className="text-sm text-white/70 mt-2">{project.address}</p>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 max-w-[1600px] mx-auto space-y-6">
        {/* Stat band */}
        <div className="grid grid-cols-3 gap-4 -mt-10 relative z-10">
          {[
            ['Completion', `${project.progress}%`, 'of total works'],
            ['Contract Sum', fmt(project.budget), 'as awarded'],
            ['Target Handover', 'Jun 2025', project.endDate],
          ].map(([k, v, sub], i) => (
            <div key={k} className="lux-card lux-hover-lift p-5 anim-fade-up" style={delay(0.15 + i * 0.06)}>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#6b7280]">{k}</div>
              <div className="font-display text-2xl lg:text-3xl font-bold text-[#c9a961] mt-1">{v}</div>
              <div className="text-[11px] text-[#6b7280] mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-2xl p-1.5 w-fit anim-fade-up" style={delay(0.28)}>
          {[['overview', 'Overview'], ['documents', 'Documents'], ['schedule', 'Schedule'], ['messages', 'Direct Line']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-5 py-2.5 text-[13px] rounded-xl font-medium transition-all ${tab === id ? 'bg-[#c9a961] text-[#131008] shadow-lg' : 'text-[#8a8f98] hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        <div key={tab} className="anim-fade-up">
        {tab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-5">Engagement Particulars</h3>
              <div className="space-y-3">
                {[['Classification', project.type], ['Principal Manager', project.manager], ['Commencement', project.startDate], ['Target Handover', project.endDate]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm py-2.5 border-b border-[#1f2533]/60 last:border-0">
                    <span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span>
                    <span className="font-medium text-white">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-2"><span className="text-[#6b7280] uppercase tracking-wider">Physical Completion</span><span className="text-[#c9a961] font-bold">{project.progress}%</span></div>
                <div className="w-full h-2 bg-[#1f2533] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full anim-bar" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>
            <div className="lux-card p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">Latest Dispatches</h3>
              <div className="space-y-1.5">
                {[['Concrete pour — Floor 16 complete', '2h ago'], ['Steel consignment received · Floors 17-18', '1d ago'],
                  ['Waterproofing inspection — passed', '2d ago'], ['Monthly progress dossier published', '3d ago'],
                  ['MEP design walkthrough held', '5d ago']].map(([update, time], i) => (
                  <div key={update} className="flex gap-3 p-2.5 hover:bg-white/[.03] rounded-xl cursor-pointer transition-colors anim-fade-up" style={delay(0.3 + i * 0.05)}>
                    <div className="w-2 h-2 rounded-full bg-[#c9a961] mt-1.5 flex-shrink-0" />
                    <div><div className="text-sm text-[#c3cbd8]">{update}</div><div className="text-[11px] text-[#4a5060]">{time}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'documents' && (
          <div className="lux-card overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1f2533]"><h3 className="font-display font-semibold text-white">Released to Client</h3></div>
            <div className="divide-y divide-[#1f2533]/60">
              {documents.filter(d => d.projectId === project.id && d.status === 'current').map((d) => (
                <div key={d.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[.03] cursor-pointer transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-[#1a1f2b] border border-[#2a3142] flex items-center justify-center flex-shrink-0">
                    <FileText size={17} className="text-[#c9a961]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{d.name}</div>
                    <div className="text-[11px] text-[#6b7280]">{d.uploadedAt} · {d.size} · Rev {d.version}</div>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="p-2 rounded-lg bg-white/[.04] border border-[#2a3142] text-[#8a8f98] group-hover:opacity-100 hover:border-[#c9a961] hover:text-[#c9a961] transition-all"><Eye size={13} /></button>
                    <button onClick={() => alert('Download initiated')} className="p-2 rounded-lg bg-white/[.04] border border-[#2a3142] text-[#8a8f98] hover:border-[#c9a961] hover:text-[#c9a961] transition-all"><Download size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'schedule' && (
          <div className="lux-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-white">Milestone Outlook</h3>
              <Calendar size={16} className="text-[#c9a961]" />
            </div>
            <div className="space-y-1">
              {milestones.filter(m => m.projectId === project.id).map((m, i) => (
                <div key={m.id} className="flex items-center gap-5 p-4 hover:bg-white/[.03] rounded-xl cursor-pointer transition-colors">
                  <div className="flex flex-col items-center self-stretch">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${m.status === 'completed' ? 'bg-emerald-400 border-emerald-400' : 'border-[#c9a961]'}`} />
                    {i < milestones.filter(mm => mm.projectId === project.id).length - 1 && <div className="w-px flex-1 bg-[#2a3142] mt-1.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-white">{m.name}</div>
                    <div className="text-xs text-[#6b7280] mt-0.5">{m.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white font-mono-lux">{m.dueDate}</div>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full capitalize font-semibold ${mStatus[m.status]}`}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div className="lux-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-white">Direct Line · {project.manager}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulseGlow 1.8s infinite' }} />
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider">On site now</span>
                </div>
              </div>
              <MessageSquare size={16} className="text-[#c9a961]" />
            </div>
            <div className="space-y-4 mb-5 max-h-[380px] overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'} anim-fade-up`}>
                  <div className={`max-w-[75%] rounded-2xl px-4.5 py-3 px-4 ${m.isMe ? 'bg-gradient-to-br from-[#d9b876] to-[#b8954d] text-[#131008]' : 'bg-[#1a1f2b] border border-[#2a3142] text-white'}`}>
                    {!m.isMe && <div className="text-[10px] font-semibold mb-1 text-[#c9a961] tracking-wider uppercase">{m.from}</div>}
                    <div className="text-sm leading-relaxed">{m.msg}</div>
                    <div className={`text-[9px] mt-1.5 ${m.isMe ? 'text-[#131008]/60' : 'text-[#4a5060]'}`}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5">
              <input type="text" placeholder="Compose to your project principal…" value={draft}
                onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 lux-input px-4 py-3 text-sm" />
              <button onClick={sendMessage} className="lux-btn-gold px-5 py-3 rounded-xl text-sm flex items-center gap-2">
                <Send size={14} /> Dispatch
              </button>
            </div>
          </div>
        )}

        {/* Always-visible contact strip */}
        <div className="lux-card p-5 flex items-center justify-between flex-wrap gap-4 cursor-pointer lux-hover-lift" onClick={() => setTab('messages')}>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#1a1f2b] border border-[#c9a961]/30 text-[#c9a961] flex items-center justify-center text-xs font-bold">MR</div>
            <div>
              <div className="text-sm font-semibold text-white">Your principal: {project.manager}</div>
              <div className="text-xs text-[#6b7280]">Typically responds within the hour</div>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-[#c9a961]" />
        </div>
        </div>
      </div>
    </div>
  );
}
