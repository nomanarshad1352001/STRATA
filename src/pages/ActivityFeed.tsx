import { useState } from 'react';
import { MessageSquare, FileText, CheckSquare, Users, DollarSign, FolderKanban, Send } from 'lucide-react';
import { comments, auditLogs } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

export default function ActivityFeed() {
  const [filter, setFilter] = useState('all');
  const [feedComments, setFeedComments] = useState(comments);
  const [draft, setDraft] = useState('');

  const activities = [
    { id: 1, icon: CheckSquare, color: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', user: 'Mike Rodriguez', action: 'closed task', target: '"Foundation inspection — Building A"', time: '2 min ago', type: 'task' },
    { id: 2, icon: FileText, color: 'bg-sky-400/15 text-sky-300 border-sky-400/25', user: 'David Kim', action: 'deposited media', target: '"Site Captures · Jan 15.zip"', time: '15 min ago', type: 'document' },
    { id: 3, icon: MessageSquare, color: 'bg-[#c9a961]/15 text-[#c9a961] border-[#c9a961]/25', user: 'Sarah Chen', action: 'annotated', target: 'RFI-001 · Column Grid Layout', time: '30 min ago', type: 'comment' },
    { id: 4, icon: DollarSign, color: 'bg-violet-400/15 text-violet-300 border-violet-400/25', user: 'John Mitchell', action: 'executed instrument', target: 'CO-001 · $125,000', time: '1 hour ago', type: 'financial' },
    { id: 5, icon: FolderKanban, color: 'bg-indigo-400/15 text-indigo-300 border-indigo-400/25', user: 'Lisa Thompson', action: 'advanced completion on', target: 'Oakwood Estate → 45%', time: '2 hours ago', type: 'project' },
    { id: 6, icon: Users, color: 'bg-teal-400/15 text-teal-300 border-teal-400/25', user: 'Sarah Chen', action: 'extended invitation to', target: 'Carlos Mendez · Field Worker', time: '3 hours ago', type: 'team' },
    { id: 7, icon: CheckSquare, color: 'bg-amber-400/15 text-amber-300 border-amber-400/25', user: 'Mike Rodriguez', action: 'moved to review', target: '"Safety audit preparation"', time: '4 hours ago', type: 'task' },
    { id: 8, icon: FileText, color: 'bg-sky-400/15 text-sky-300 border-sky-400/25', user: 'Lisa Thompson', action: 'deposited drawing', target: '"Landscape Design Plans.dwg"', time: '5 hours ago', type: 'document' },
    { id: 9, icon: MessageSquare, color: 'bg-[#c9a961]/15 text-[#c9a961] border-[#c9a961]/25', user: 'James Wilson', action: 'responded to', target: 'RFI-002 · HVAC Duct Routing', time: '6 hours ago', type: 'comment' },
    { id: 10, icon: DollarSign, color: 'bg-violet-400/15 text-violet-300 border-violet-400/25', user: 'Lisa Thompson', action: 'filed instrument', target: 'CO-002 · $340,000', time: '8 hours ago', type: 'financial' },
    { id: 11, icon: FolderKanban, color: 'bg-indigo-400/15 text-indigo-300 border-indigo-400/25', user: 'Mike Rodriguez', action: 'filed a field entry for', target: 'Riverside Tower · Jan 15', time: '10 hours ago', type: 'project' },
    { id: 12, icon: CheckSquare, color: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', user: 'David Kim', action: 'commenced work on', target: '"Parking paving · Section C"', time: '1 day ago', type: 'task' },
  ];

  const filteredActivities = filter === 'all' ? activities : activities.filter(a => a.type === filter);

  const postComment = () => {
    if (!draft.trim()) return;
    setFeedComments([{ id: `cm${Date.now()}`, author: 'You', avatar: 'JM', content: draft, timestamp: 'just now', mentions: [] }, ...feedComments]);
    setDraft('');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="anim-fade-up">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-px bg-[#c9a961]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Pulse</span>
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">The Chronicle</h1>
        <p className="text-sm text-[#6b7280] mt-1.5">Every movement across the workspace, in real time</p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap anim-fade-up" style={delay(0.08)}>
        {['all', 'task', 'document', 'comment', 'financial', 'project', 'team'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs rounded-xl font-medium capitalize transition-all ${filter === f ? 'bg-[#c9a961] text-[#131008] shadow' : 'bg-[#11141c] border border-[#1f2533] text-[#8a8f98] hover:text-white hover:border-[#c9a961]/40'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-1">
          {filteredActivities.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={a.id} className="flex gap-4 anim-fade-up" style={delay(0.1 + i * 0.04)}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${a.color}`}>
                    <Icon size={16} />
                  </div>
                  {i < filteredActivities.length - 1 && <div className="w-px flex-1 bg-[#1f2533] my-1.5" />}
                </div>
                <div className="flex-1 pb-6 cursor-pointer group">
                  <p className="text-sm text-[#9aa3b2] leading-relaxed group-hover:text-[#c3cbd8] transition-colors">
                    <span className="font-semibold text-white">{a.user}</span>{' '}{a.action}{' '}
                    <span className="font-medium text-[#e8d9b8]">{a.target}</span>
                  </p>
                  <span className="text-[11px] text-[#4a5060]">{a.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-5">
          <div className="lux-card p-6 anim-fade-up" style={delay(0.2)}>
            <h3 className="font-display font-semibold text-white mb-4">The Council Room</h3>
            <div className="flex gap-2.5 mb-5">
              <input type="text" placeholder="Address the team…" value={draft}
                onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && postComment()}
                className="flex-1 lux-input px-3.5 py-2.5 text-sm" />
              <button onClick={postComment} className="lux-btn-gold p-2.5 rounded-xl"><Send size={15} /></button>
            </div>
            <div className="space-y-3.5">
              {feedComments.slice(0, 4).map((c, i) => (
                <div key={c.id} className="flex gap-3 p-2.5 hover:bg-white/[.03] rounded-xl cursor-pointer transition-colors anim-fade-up" style={delay(0.24 + i * 0.05)}>
                  <div className="w-8 h-8 rounded-full bg-[#1a1f2b] border border-[#c9a961]/25 text-[#c9a961] flex items-center justify-center text-[10px] font-bold flex-shrink-0">{c.avatar}</div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white">{c.author}</div>
                    <div className="text-xs text-[#9aa3b2] mt-0.5 leading-snug">{c.content.substring(0, 72)}{c.content.length > 72 ? '…' : ''}</div>
                    <div className="text-[10px] text-[#4a5060] mt-1">{c.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lux-card p-6 anim-fade-up" style={delay(0.3)}>
            <h3 className="font-display font-semibold text-white mb-4">Governance Log</h3>
            <div className="space-y-1.5">
              {auditLogs.slice(0, 5).map((log, i) => (
                <div key={log.id} className="p-2.5 hover:bg-white/[.03] rounded-xl cursor-pointer transition-colors anim-fade-up" style={delay(0.32 + i * 0.04)}>
                  <div className="text-xs font-medium text-[#c9a961]">{log.action}</div>
                  <div className="text-[10px] text-[#6b7280] mt-0.5">{log.user} · {log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
