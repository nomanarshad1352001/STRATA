import { useState } from 'react';
import { Plus, Search, X, Check } from 'lucide-react';
import { tasks as initialTasks, projects } from '../data/dummyData';
import type { Task } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const priorityChip: Record<string, string> = {
  urgent: 'bg-rose-400/15 text-rose-300 border-rose-400/25', high: 'bg-amber-400/15 text-amber-300 border-amber-400/25',
  medium: 'bg-yellow-400/10 text-yellow-200 border-yellow-400/20', low: 'bg-white/5 text-[#8a8f98] border-white/10',
};
const statusLabels: Record<string, string> = { todo: 'To Do', in_progress: 'In Progress', review: 'Review', done: 'Done' };
const statusAccent: Record<string, string> = { todo: 'bg-[#4a5060]', in_progress: 'bg-[#c9a961]', review: 'bg-amber-400', done: 'bg-emerald-400' };
const statusPill: Record<string, string> = { todo: 'bg-white/10 text-[#c3cbd8]', in_progress: 'bg-[#c9a961]/15 text-[#c9a961]', review: 'bg-amber-400/15 text-amber-300', done: 'bg-emerald-400/15 text-emerald-300' };

export default function TasksPage() {
  const [allTasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState<'board' | 'list'>('board');
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState('all');
  const [created, setCreated] = useState(false);

  const filtered = allTasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) && (filter === 'all' || t.priority === filter)
  );
  const moveTask = (id: string, newStatus: Task['status']) => setTasks(allTasks.map(t => t.id === id ? { ...t, status: newStatus } : t));

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Execution</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Work Queue</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{allTasks.length} items across {new Set(allTasks.map(t => t.projectId)).size} engagements</p>
        </div>
        <button onClick={() => setShowNew(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Plus size={16} /> New Task
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap anim-fade-up" style={delay(0.08)}>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
          <input type="text" placeholder="Search the queue…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1">
          {['all', 'urgent', 'high', 'medium', 'low'].map(p => (
            <button key={p} onClick={() => setFilter(p)}
              className={`px-3.5 py-1.5 text-xs rounded-lg font-medium capitalize transition-all ${filter === p ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>{p}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 ml-auto">
          <button onClick={() => setView('board')} className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-all ${view === 'board' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Board</button>
          <button onClick={() => setView('list')} className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-all ${view === 'list' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Ledger</button>
        </div>
      </div>

      {view === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {(['todo', 'in_progress', 'review', 'done'] as const).map((status, ci) => {
            const statusTasks = filtered.filter(t => t.status === status);
            return (
              <div key={status} className="bg-[#0d1017] border border-[#1f2533] rounded-2xl p-3 anim-fade-up" style={delay(0.12 + ci * 0.06)}>
                <div className="flex items-center gap-2.5 mb-3.5 px-1.5 pt-1">
                  <div className={`w-2 h-2 rounded-full ${statusAccent[status]}`} />
                  <span className="font-display font-semibold text-[13px] text-white tracking-wide">{statusLabels[status]}</span>
                  <span className="text-[10px] text-[#4a5060] ml-auto font-mono-lux">{statusTasks.length}</span>
                </div>
                <div className="space-y-2.5">
                  {statusTasks.map((t, i) => (
                    <div key={t.id} onClick={() => setSelectedTask(t)}
                      className="lux-card lux-hover-lift p-4 cursor-pointer anim-fade-up" style={delay(0.15 + i * 0.05)}>
                      <div className="text-[13px] font-medium text-white leading-snug mb-2.5">{t.title}</div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider border ${priorityChip[t.priority]}`}>{t.priority}</span>
                        <span className="text-[9px] text-[#4a5060] uppercase tracking-wider">{t.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-6 h-6 rounded-full bg-[#1a1f2b] border border-[#c9a961]/25 text-[#c9a961] flex items-center justify-center text-[9px] font-bold" title={t.assignee}>
                          {t.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-[10px] text-[#6b7280] font-mono-lux">{t.dueDate}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowNew(true)}
                    className="w-full py-2.5 text-[11px] text-[#4a5060] hover:text-[#c9a961] rounded-xl border border-dashed border-[#2a3142] hover:border-[#c9a961]/50 transition-all">
                    + Add item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="lux-card overflow-hidden anim-fade-up" style={delay(0.12)}>
          <table className="w-full">
            <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
              {['Item', 'Status', 'Priority', 'Assignee', 'Engagement', 'Due'].map(h => (
                <th key={h} className="px-5 py-4 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr></thead>
            <tbody>{filtered.map((t, i) => (
              <tr key={t.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.05 + i * 0.03)} onClick={() => setSelectedTask(t)}>
                <td className="px-5 py-4"><div className="text-sm font-medium text-white">{t.title}</div><div className="text-[11px] text-[#6b7280]">{t.category}</div></td>
                <td className="px-5 py-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusPill[t.status]}`}>{statusLabels[t.status]}</span></td>
                <td className="px-5 py-4"><span className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${priorityChip[t.priority]}`}>{t.priority}</span></td>
                <td className="px-5 py-4 text-sm text-[#8a8f98]">{t.assignee}</td>
                <td className="px-5 py-4 text-sm text-[#8a8f98]">{projects.find(p => p.id === t.projectId)?.name?.substring(0, 22)}</td>
                <td className="px-5 py-4 text-xs text-[#6b7280] font-mono-lux">{t.dueDate}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedTask(null)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white pr-4">{selectedTask.title}</h2>
                <div className="flex gap-2 mt-2.5">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${priorityChip[selectedTask.priority]}`}>{selectedTask.priority}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${statusPill[selectedTask.status]}`}>{statusLabels[selectedTask.status]}</span>
                </div>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-[#6b7280] hover:text-white transition-colors"><X size={20} /></button>
            </div>
            <p className="text-sm text-[#9aa3b2] mb-5 leading-relaxed">{selectedTask.description}</p>
            <div className="space-y-2.5 mb-6">
              {[['Assignee', selectedTask.assignee], ['Discipline', selectedTask.category], ['Due', selectedTask.dueDate],
                ['Engagement', projects.find(p => p.id === selectedTask.projectId)?.name || '']].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1f2533]/60 last:border-0">
                  <span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span><span className="font-medium text-white">{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-2">Transition to</div>
              <div className="flex gap-2">
                {(['todo', 'in_progress', 'review', 'done'] as const).map(s => (
                  <button key={s} onClick={() => { moveTask(selectedTask.id, s); setSelectedTask({ ...selectedTask, status: s }); }}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl font-medium transition-all ${selectedTask.status === s ? 'bg-[#c9a961] text-[#131008]' : 'bg-white/[.04] text-[#8a8f98] border border-[#2a3142] hover:border-[#c9a961]/50 hover:text-white'}`}>
                    {selectedTask.status === s && <Check size={11} />}{statusLabels[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowNew(false)}>
          <div className="lux-card w-full max-w-lg p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Commission Task</h2>
                <p className="text-xs text-[#6b7280] mt-1">Add an item to the work queue</p></div>
              <button onClick={() => setShowNew(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {created ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 flex items-center justify-center mb-4"><Check size={24} className="text-[#c9a961]" /></div>
                <h3 className="font-display text-lg font-bold text-white">Task Commissioned</h3>
                <button onClick={() => { setShowNew(false); setCreated(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Continue</button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Title</label>
                    <input className="w-full lux-input px-4 py-2.5 text-sm" placeholder="What must be done?" /></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Briefing</label>
                    <textarea className="w-full lux-input px-4 py-2.5 text-sm" rows={3} placeholder="Details for the assignee…" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Priority</label>
                      <select className="w-full lux-input px-4 py-2.5 text-sm"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></div>
                    <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Due</label>
                      <input type="date" className="w-full lux-input px-4 py-2.5 text-sm [color-scheme:dark]" /></div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowNew(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Cancel</button>
                  <button onClick={() => setCreated(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">Create Task</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
