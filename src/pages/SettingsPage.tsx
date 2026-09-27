import { useState } from 'react';
import { Building2, User, Bell, Shield, Palette, Globe, Key, Database, Check } from 'lucide-react';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

export default function SettingsPage() {
  const [tab, setTab] = useState('company');
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState('Noir');
  const [accent, setAccent] = useState('#c9a961');

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };

  const tabs = [
    { id: 'company', icon: Building2, label: 'Firm Profile' }, { id: 'profile', icon: User, label: 'My Identity' },
    { id: 'notifications', icon: Bell, label: 'Notifications' }, { id: 'security', icon: Shield, label: 'Security' },
    { id: 'appearance', icon: Palette, label: 'Appearance' }, { id: 'integrations', icon: Globe, label: 'Integrations' },
    { id: 'api', icon: Key, label: 'API Keys' }, { id: 'data', icon: Database, label: 'Data & Privacy' },
  ];

  const inputCls = "w-full lux-input px-4 py-2.5 text-sm";
  const labelCls = "block text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-1.5";

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="anim-fade-up">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-px bg-[#c9a961]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Configuration</span>
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Workspace Settings</h1>
      </div>

      {saved && (
        <div className="anim-fade-up flex items-center gap-2.5 bg-emerald-400/10 text-emerald-300 px-5 py-3.5 rounded-xl text-sm font-medium border border-emerald-400/25">
          <Check size={15} /> Preferences committed successfully
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-60 flex-shrink-0">
          <div className="lux-card p-2 space-y-0.5 lg:sticky lg:top-6 anim-fade-up" style={delay(0.1)}>
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-all ${
                    tab === t.id ? 'bg-[#c9a961]/12 text-[#e8d9b8] border border-[#c9a961]/25' : 'text-[#8a8f98] hover:text-white hover:bg-white/[.04] border border-transparent'
                  }`}>
                  <Icon size={15} className={tab === t.id ? 'text-[#c9a961]' : ''} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 lux-card p-7 anim-fade-up" style={delay(0.15)} key={tab}>
        <div className="anim-fade-up">
          {tab === 'company' && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-white">Firm Profile</h2>
              <div className="flex items-center gap-5 pb-5 border-b border-[#1f2533]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/30 flex items-center justify-center"><Building2 size={26} className="text-[#c9a961]" /></div>
                <div>
                  <button className="lux-btn-ghost px-4 py-2 rounded-lg text-xs">Replace Crest</button>
                  <p className="text-[10px] text-[#4a5060] mt-2">SVG or PNG · min 512×512</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[['Firm Name', 'BuildRight Construction'], ['Industry', 'General Contracting'], ['Registered Address', '1200 River Drive, Austin, TX'],
                  ['Direct Line', '(555) 123-4567'], ['Web', 'www.buildright.com'], ['Tax Reference', '12-3456789']].map(([label, value]) => (
                  <div key={label}><label className={labelCls}>{label}</label>
                    <input defaultValue={value} className={inputCls} /></div>
                ))}
              </div>
              <button onClick={save} className="lux-btn-gold px-7 py-3 rounded-xl text-sm">Commit Changes</button>
            </div>
          )}
          {tab === 'profile' && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-white">My Identity</h2>
              <div className="flex items-center gap-5 pb-5 border-b border-[#1f2533]">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center text-[#131008] text-2xl font-bold font-display ring-2 ring-[#c9a961]/30">JM</div>
                <div><button className="lux-btn-ghost px-4 py-2 rounded-lg text-xs">Change Portrait</button>
                  <button className="text-xs text-rose-300 hover:text-rose-200 ml-3">Remove</button></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[['Full Name', 'John Mitchell'], ['Email', 'john@buildright.com'], ['Line', '(555) 123-4567'], ['Title', 'CEO & Principal']].map(([label, value]) => (
                  <div key={label}><label className={labelCls}>{label}</label><input defaultValue={value} className={inputCls} /></div>
                ))}
              </div>
              <button onClick={save} className="lux-btn-gold px-7 py-3 rounded-xl text-sm">Save Identity</button>
            </div>
          )}
          {tab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-white">Notification Doctrine</h2>
              {['Email Digest', 'Push Signals', 'SMS Alerts'].map(section => (
                <div key={section}>
                  <h3 className="text-sm font-semibold text-[#e8d9b8] mb-3">{section}</h3>
                  <div className="space-y-1">
                    {['New task assignments', 'RFI responses', 'Change order movements', 'Daily log filings', 'Document deposits', 'Budget thresholds', 'Schedule shifts'].map(pref => (
                      <label key={pref} className="flex items-center justify-between py-2.5 px-3 cursor-pointer hover:bg-white/[.03] rounded-xl transition-colors">
                        <span className="text-sm text-[#c3cbd8]">{pref}</span>
                        <div className="relative">
                          <input type="checkbox" defaultChecked={Math.random() > 0.35} className="peer sr-only" />
                          <div className="w-9 h-5 rounded-full bg-[#2a3142] peer-checked:bg-[#c9a961] transition-colors" />
                          <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={save} className="lux-btn-gold px-7 py-3 rounded-xl text-sm">Save Doctrine</button>
            </div>
          )}
          {tab === 'security' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-white">Security Posture</h2>
              <div>
                <h3 className="text-sm font-semibold text-[#e8d9b8] mb-3">Rotate Credentials</h3>
                <div className="space-y-3 max-w-md">
                  {['Current Passphrase', 'New Passphrase', 'Confirm Passphrase'].map(l => (
                    <div key={l}><label className={labelCls}>{l}</label><input type="password" className={inputCls} /></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0d1017] border border-[#1f2533] rounded-xl">
                <div><div className="text-sm font-medium text-white">Two-Factor Authentication</div>
                  <div className="text-xs text-emerald-300 mt-0.5 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Enforced via authenticator</div></div>
                <button className="lux-btn-ghost px-4 py-2 rounded-lg text-xs">Reconfigure</button>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#e8d9b8] mb-2">Active Sessions</h3>
                {[['Chrome · macOS', 'Austin, TX · Current'], ['Safari · iPhone 15', 'Austin, TX · 2 hours ago']].map(([device, meta]) => (
                  <div key={device} className="flex items-center justify-between p-3.5 border-b border-[#1f2533]/60 hover:bg-white/[.02] cursor-pointer transition-colors">
                    <div><div className="text-sm text-white">{device}</div><div className="text-[11px] text-[#6b7280]">{meta}</div></div>
                    <button className="text-[10px] text-rose-300 hover:text-rose-200">Revoke</button>
                  </div>
                ))}
              </div>
              <button onClick={save} className="lux-btn-gold px-7 py-3 rounded-xl text-sm">Harden Security</button>
            </div>
          )}
          {tab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="font-display text-xl font-bold text-white">Appearance</h2>
              <div>
                <h3 className="text-sm font-semibold text-[#e8d9b8] mb-3">Motif</h3>
                <div className="flex gap-3">
                  {['Noir', 'Alabaster', 'System'].map(t => (
                    <button key={t} onClick={() => setTheme(t)}
                      className={`px-7 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${theme === t ? 'border-[#c9a961] bg-[#c9a961]/10 text-[#e8d9b8]' : 'border-[#2a3142] text-[#8a8f98] hover:border-[#c9a961]/40'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#e8d9b8] mb-3">Accent Metal</h3>
                <div className="flex gap-2.5">
                  {[['#c9a961', 'Champagne Gold'], ['#38bdf8', 'Azure'], ['#34d399', 'Jade'], ['#a78bfa', 'Amethyst'], ['#fb7185', 'Ruby']].map(([c, name]) => (
                    <button key={c} onClick={() => setAccent(c)} title={name}
                      className={`w-10 h-10 rounded-full transition-all ${accent === c ? 'ring-2 ring-offset-2 ring-offset-[#11141c] ring-white scale-110' : 'hover:scale-105'}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#e8d9b8] mb-3">Density</h3>
                <div className="flex gap-3">
                  {['Compact', 'Standard', 'Spacious'].map(d => (
                    <button key={d} className={`px-5 py-2.5 rounded-xl border text-sm transition-all ${d === 'Standard' ? 'border-[#c9a961] bg-[#c9a961]/10 text-[#e8d9b8]' : 'border-[#2a3142] text-[#8a8f98] hover:border-[#c9a961]/40'}`}>{d}</button>
                  ))}
                </div>
              </div>
              <button onClick={save} className="lux-btn-gold px-7 py-3 rounded-xl text-sm">Apply Aesthetic</button>
            </div>
          )}
          {tab === 'integrations' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-white">Connected Services</h2>
              {[['Procore', 'Construction sync · bleeding edge', true], ['QuickBooks', 'Financial ledger bridge', true],
                ['Dropbox', 'Document distribution', false], ['Slack', 'Team signaling', true],
                ['AutoCAD Cloud', 'Drawing federation', false], ['Google Calendar', 'Diary harmonization', false]].map(([name, desc, connected], i) => (
                <div key={name as string} className="flex items-center justify-between p-4 border border-[#1f2533] rounded-xl hover:bg-white/[.03] cursor-pointer transition-colors anim-fade-up" style={delay(i * 0.05)}>
                  <div><div className="font-medium text-sm text-white">{name as string}</div><div className="text-xs text-[#6b7280] mt-0.5">{desc as string}</div></div>
                  <button className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${connected ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/25' : 'bg-white/[.04] text-[#c3cbd8] border border-[#2a3142] hover:border-[#c9a961]/50 hover:text-[#c9a961]'}`}>
                    {connected ? 'Linked ✓' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}
          {tab === 'api' && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-white">API Credentials</h2>
              <p className="text-sm text-[#6b7280]">Bespoke integrations with the Strata fabric</p>
              {[['Production Key', 'mdn_live_sk_••••••••4567'], ['Sandbox Key', 'mdn_test_sk_••••••••8901']].map(([name, key]) => (
                <div key={name} className="flex items-center justify-between p-4 border border-[#1f2533] rounded-xl hover:bg-white/[.03] transition-colors">
                  <div><div className="font-medium text-sm text-white">{name}</div>
                    <code className="text-xs text-[#4a5060] font-mono-lux">{key}</code></div>
                  <div className="flex gap-2">
                    <button onClick={() => { navigator.clipboard?.writeText(key); alert('Copied'); }} className="px-3 py-1.5 text-[11px] lux-btn-ghost rounded-lg">Copy</button>
                    <button onClick={() => { if (confirm('Revoke this key?')) alert('Key revoked'); }} className="px-3 py-1.5 text-[11px] text-rose-300 border border-rose-400/25 rounded-lg hover:bg-rose-500/10 transition-colors">Revoke</button>
                  </div>
                </div>
              ))}
              <button onClick={() => alert('New keypair minted')} className="lux-btn-gold px-5 py-2.5 rounded-xl text-sm">Mint New Keypair</button>
            </div>
          )}
          {tab === 'data' && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-white">Data Sovereignty</h2>
              <div className="p-4 bg-sky-400/8 border border-sky-400/25 rounded-xl">
                <h3 className="font-medium text-sm text-sky-200">Retention Policy</h3>
                <p className="text-xs text-[#8a8f98] mt-1.5 leading-relaxed">Your records are retained for the duration of your engagement with Strata, plus ninety days following dissolution, after which full cryptographic erasure is performed.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#e8d9b8] mb-3">Export Holdings</h3>
                <button onClick={() => alert('Archive compiling… you will be notified')} className="lux-btn-ghost px-5 py-2.5 rounded-xl text-sm">Request Full Archive (ZIP)</button>
              </div>
              <div className="p-4 bg-rose-500/8 rounded-xl border border-rose-400/25">
                <h3 className="font-medium text-sm text-rose-200">Dissolution</h3>
                <p className="text-xs text-[#8a8f98] mt-1.5 mb-3">Permanently dissolve your firm's workspace and all associated records. This cannot be undone.</p>
                <button onClick={() => { if (confirm('This is irreversible. Proceed?')) alert('Dissolution request filed'); }} className="px-4 py-2 bg-rose-500/90 text-white rounded-lg text-sm hover:bg-rose-500 transition-colors">Initiate Dissolution</button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
