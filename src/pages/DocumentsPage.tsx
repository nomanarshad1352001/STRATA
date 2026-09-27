import { useState } from 'react';
import { Upload, Search, Download, Eye, Trash2, X, FolderOpen, FileText, Check } from 'lucide-react';
import { documents as initialDocs, projects, heroImages } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });
const photoPool = [heroImages.site1, heroImages.site2, heroImages.site3, heroImages.site4, heroImages.site5, heroImages.site7, heroImages.site6, heroImages.site8, heroImages.login, heroImages.onboarding];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<typeof initialDocs[0] | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const filtered = initialDocs.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) && (typeFilter === 'all' || d.type === typeFilter)
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between anim-fade-up">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-px bg-[#c9a961]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Records</span>
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Document Vault</h1>
          <p className="text-sm text-[#6b7280] mt-1.5">{initialDocs.length} records · drawings, specifications & media</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="lux-btn-gold flex items-center gap-2 px-5 py-3 rounded-xl text-sm">
          <Upload size={16} /> Deposit File
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap anim-fade-up" style={delay(0.08)}>
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
          <input type="text" placeholder="Search the vault…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full lux-input pl-11 pr-4 py-2.5 text-sm" />
        </div>
        <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 flex-wrap">
          {['all', 'drawing', 'spec', 'contract', 'photo', 'report', 'permit'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium capitalize transition-all ${typeFilter === t ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="lux-card overflow-hidden anim-fade-up" style={delay(0.14)}>
        <table className="w-full">
          <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
            {['Record', 'Classification', 'Engagement', 'Depositor', 'Date', 'Size', 'Rev', ''].map(h => (
              <th key={h} className="px-5 py-4 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
            ))}
          </tr></thead>
          <tbody>{filtered.map((d, i) => (
            <tr key={d.id} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(0.05 + i * 0.03)}
              onClick={() => setSelectedDoc(d)}>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-10 rounded-lg overflow-hidden border border-[#2a3142] flex-shrink-0 relative">
                    {d.type === 'photo' ? (
                      <img src={photoPool[i % photoPool.length]} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#1a1f2b] flex items-center justify-center"><FileText size={15} className="text-[#c9a961]" /></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-white max-w-[240px] truncate">{d.name}</span>
                </div>
              </td>
              <td className="px-5 py-4"><span className="text-[10px] capitalize bg-white/[.06] text-[#c3cbd8] border border-[#2a3142] px-2.5 py-1 rounded-full">{d.type}</span></td>
              <td className="px-5 py-4 text-sm text-[#8a8f98]">{projects.find(p => p.id === d.projectId)?.name?.substring(0, 20)}</td>
              <td className="px-5 py-4 text-sm text-[#8a8f98]">{d.uploadedBy}</td>
              <td className="px-5 py-4 text-[11px] text-[#6b7280] font-mono-lux">{d.uploadedAt}</td>
              <td className="px-5 py-4 text-[11px] text-[#6b7280] font-mono-lux">{d.size}</td>
              <td className="px-5 py-4"><span className="text-[10px] text-[#c9a961] font-mono-lux border border-[#c9a961]/25 bg-[#c9a961]/8 px-1.5 py-0.5 rounded">v{d.version}</span></td>
              <td className="px-5 py-4">
                <div className="flex gap-1.5">
                  <button onClick={e => { e.stopPropagation(); setSelectedDoc(d); }} className="p-2 rounded-lg hover:bg-white/[.06] text-[#8a8f98] hover:text-[#c9a961] transition-colors"><Eye size={14} /></button>
                  <button onClick={e => { e.stopPropagation(); alert('Download initiated'); }} className="p-2 rounded-lg hover:bg-white/[.06] text-[#8a8f98] hover:text-[#c9a961] transition-colors"><Download size={14} /></button>
                  <button onClick={e => { e.stopPropagation(); if (confirm('Remove this record?')) alert('Record removed'); }} className="p-2 rounded-lg hover:bg-rose-500/10 text-[#8a8f98] hover:text-rose-300 transition-colors"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* Photo strip */}
      <div className="anim-fade-up" style={delay(0.2)}>
        <h3 className="font-display text-lg font-semibold text-white mb-4">Site Imagery</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {photoPool.slice(0, 5).map((src, i) => (
            <div key={i} className="relative h-32 rounded-2xl overflow-hidden img-zoom cursor-pointer group border border-[#1f2533]">
              <img src={src} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c11]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[10px] text-white">Site capture · {i + 1} of 248</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doc Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setSelectedDoc(null)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <div><h2 className="font-display text-lg font-bold text-white pr-4">{selectedDoc.name}</h2>
                <p className="text-xs text-[#6b7280] mt-1">Record detail · Rev {selectedDoc.version}</p></div>
              <button onClick={() => setSelectedDoc(null)} className="text-[#6b7280] hover:text-white h-fit"><X size={20} /></button>
            </div>
            {selectedDoc.type === 'photo' && (
              <div className="h-44 rounded-xl overflow-hidden border border-[#2a3142] mb-5">
                <img src={photoPool[0]} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-2.5">
              {[['Classification', selectedDoc.type], ['Size', selectedDoc.size], ['Standing', selectedDoc.status],
                ['Depositor', selectedDoc.uploadedBy], ['Date', selectedDoc.uploadedAt]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-2 border-b border-[#1f2533]/60">
                  <span className="text-[#6b7280] text-xs uppercase tracking-wider">{k}</span><span className="font-medium text-white capitalize">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-6">
              <button onClick={() => alert('Download initiated')} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm flex items-center justify-center gap-2"><Download size={14} /> Retrieve</button>
              <button onClick={() => alert('Opening preview…')} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm flex items-center justify-center gap-2"><Eye size={14} /> Preview</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowUpload(false)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#2a3142]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div><h2 className="font-display text-xl font-bold text-white">Deposit Document</h2>
                <p className="text-xs text-[#6b7280] mt-1">Secure vault storage · v-versioned</p></div>
              <button onClick={() => setShowUpload(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {uploaded ? (
              <div className="text-center py-8 anim-fade-up">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400/15 border border-emerald-400/40 flex items-center justify-center mb-4"><Check size={24} className="text-emerald-300" /></div>
                <h3 className="font-display text-lg font-bold text-white">Deposited to Vault</h3>
                <button onClick={() => { setShowUpload(false); setUploaded(false); }} className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Done</button>
              </div>
            ) : (
              <>
                <div className="border-2 border-dashed border-[#2a3142] rounded-2xl p-8 text-center mb-5 hover:border-[#c9a961]/50 transition-colors cursor-pointer" onDragOver={e => e.preventDefault()}>
                  <FolderOpen size={36} className="mx-auto text-[#4a5060] mb-3" />
                  <p className="text-sm text-[#c3cbd8]">Drag & drop or <span className="text-[#c9a961] font-medium">browse files</span></p>
                  <p className="text-[11px] text-[#4a5060] mt-1.5">PDF, DWG, DOCX, JPG · up to 500 MB</p>
                </div>
                <div className="space-y-4">
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Engagement</label>
                    <select className="w-full lux-input px-4 py-2.5 text-sm">{projects.map(p => <option key={p.id}>{p.name}</option>)}</select></div>
                  <div><label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5">Classification</label>
                    <select className="w-full lux-input px-4 py-2.5 text-sm"><option>Drawing</option><option>Specification</option><option>Contract</option><option>Photo</option><option>Report</option><option>Permit</option></select></div>
                </div>
                <button onClick={() => setUploaded(true)} className="w-full mt-6 lux-btn-gold py-3 rounded-xl text-sm">Deposit to Vault</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
