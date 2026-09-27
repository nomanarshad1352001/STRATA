import { useState } from 'react';
import { Building2, ArrowRight, ArrowLeft, Check, Users, FolderKanban, Crown } from 'lucide-react';
import { heroImages } from '../data/dummyData';

interface OnboardingPageProps { onComplete: () => void; onBack: () => void; }
const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

export default function OnboardingPage({ onComplete, onBack }: OnboardingPageProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '', industry: 'general', size: '10-50', name: '', email: '', password: '',
    plan: 'professional', inviteEmails: ['', '', '']
  });
  const [finishing, setFinishing] = useState(false);

  const steps = [
    { icon: Building2, label: 'The Firm' },
    { icon: Users, label: 'Yourself' },
    { icon: FolderKanban, label: 'The Team' },
    { icon: Crown, label: 'Membership' },
  ];

  const updateInvite = (i: number, val: string) => {
    const emails = [...formData.inviteEmails];
    emails[i] = val;
    setFormData({ ...formData, inviteEmails: emails });
  };

  const finish = () => {
    setFinishing(true);
    setTimeout(onComplete, 1600);
  };

  const inputCls = "w-full lux-input px-4 py-3 text-sm";
  const labelCls = "block text-[10px] tracking-[0.2em] uppercase text-[#6b7280] mb-2";

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#0a0c11] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImages.onboarding} alt="" className="w-full h-full object-cover opacity-40 anim-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c11]/80 via-[#0a0c11]/85 to-[#0a0c11]" />
      </div>
      <div className="particle w-48 h-48 left-[10%] top-[60%]" style={{ animationDelay: '1s' }} />
      <div className="particle w-32 h-32 left-[80%] top-[20%]" style={{ animationDelay: '3s' }} />

      <div className="w-full max-w-2xl relative z-10">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 justify-center anim-fade-up">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center shadow-[0_4px_20px_rgba(201,169,97,.5)]">
            <Building2 size={22} className="text-[#131008]" />
          </div>
          <div>
            <div className="font-display text-xl font-bold tracking-[0.18em] text-white">STRATA</div>
            <div className="text-[9px] tracking-[0.3em] text-[#c9a961] uppercase">Founding Registration</div>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-1.5 mb-8 anim-fade-up" style={delay(0.1)}>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-1.5">
                <button onClick={() => i <= step && setStep(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    i === step ? 'bg-[#c9a961] text-[#131008] shadow-[0_4px_20px_rgba(201,169,97,.4)]' :
                    i < step ? 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/25' :
                    'bg-[#1a1f2b] text-[#6b7280] border border-[#2a3142]'
                  }`}>
                  {i < step ? <Check size={13} /> : <Icon size={13} />}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <div className={`w-6 h-px ${i < step ? 'bg-emerald-400/40' : 'bg-[#2a3142]'}`} />}
              </div>
            );
          })}
        </div>

        <div className="lux-glass lux-card p-8 anim-fade-up border-[#2a3142]" style={delay(0.2)}>
          <div key={step} className="anim-fade-up">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Christen your firm</h2>
                <p className="text-sm text-[#8a8f98] mt-1">The foundation of your Strata presence</p>
              </div>
              <div><label className={labelCls}>Firm Name</label>
                <input type="text" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Hollingsworth & Sons" className={inputCls} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelCls}>Discipline</label>
                  <select value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className={inputCls}>
                    <option value="general">General Contracting</option><option value="commercial">Commercial</option>
                    <option value="residential">Residential</option><option value="infrastructure">Infrastructure</option>
                    <option value="industrial">Industrial</option>
                  </select></div>
                <div><label className={labelCls}>Scale</label>
                  <select value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} className={inputCls}>
                    <option value="1-10">1-10 personel</option><option value="10-50">10-50 personnel</option>
                    <option value="50-200">50-200 personnel</option><option value="200+">200+ personnel</option>
                  </select></div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Introduce yourself</h2>
                <p className="text-sm text-[#8a8f98] mt-1">You'll govern as Owner</p>
              </div>
              <div><label className={labelCls}>Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Hollingsworth" className={inputCls} /></div>
              <div><label className={labelCls}>Work Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@firm.com" className={inputCls} /></div>
              <div><label className={labelCls}>Passphrase</label>
                <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 characters" className={inputCls} /></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Summon your lieutenants</h2>
                <p className="text-sm text-[#8a8f98] mt-1">They'll receive gilded invitations. More can join later.</p>
              </div>
              {formData.inviteEmails.map((em, i) => (
                <input key={i} type="email" value={em} onChange={e => updateInvite(i, e.target.value)}
                  placeholder={`Associate ${i + 1} · email`}
                  className={inputCls} />
              ))}
              <button onClick={() => setFormData({ ...formData, inviteEmails: [...formData.inviteEmails, ''] })}
                className="text-sm text-[#c9a961] hover:text-[#e8d9b8] font-medium transition-colors">+ Extend another invitation</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Elect your membership</h2>
                <p className="text-sm text-[#8a8f98] mt-1">Fourteen days' trial · no card required</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'starter', name: 'Starter', price: '$49', desc: 'Emerging firms' },
                  { id: 'professional', name: 'Professional', price: '$149', desc: 'The house favorite', badge: true },
                  { id: 'enterprise', name: 'Enterprise', price: '$399', desc: 'Full sovereignty' },
                ].map(p => (
                  <button key={p.id} onClick={() => setFormData({ ...formData, plan: p.id })}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all ${formData.plan === p.id ? 'border-[#c9a961] bg-[#c9a961]/10 shadow-[0_0_40px_-8px_rgba(201,169,97,.4)]' : 'border-[#2a3142] hover:border-[#c9a961]/40'}`}>
                    {p.badge && <span className="absolute -top-2.5 right-3 text-[9px] tracking-wider uppercase bg-[#c9a961] text-[#131008] font-bold px-2.5 py-0.5 rounded-full">Elective</span>}
                    <div className="font-display text-2xl font-bold text-white">{p.price}<span className="text-sm font-normal text-[#6b7280]">/mo</span></div>
                    <div className="font-semibold text-sm text-white mt-1.5">{p.name}</div>
                    <div className="text-[11px] text-[#6b7280] mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          </div>

          <div className="flex justify-between mt-9">
            <button onClick={() => step === 0 ? onBack() : setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#8a8f98] hover:text-white transition-colors">
              <ArrowLeft size={15} /> {step === 0 ? 'Return to sign in' : 'Back'}
            </button>
            <button onClick={() => step === 3 ? finish() : setStep(step + 1)} disabled={finishing}
              className="lux-btn-gold flex items-center gap-2 px-7 py-3 rounded-xl text-sm">
              {finishing ? (
                <><div className="w-4 h-4 border-2 border-[#131008]/30 border-t-[#131008] rounded-full animate-spin" /> Founding workspace…</>
              ) : step === 3 ? (
                <>Found Workspace <Crown size={15} /></>
              ) : (
                <>Proceed <ArrowRight size={15} /></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-[#4a5060] mt-6 tracking-[0.2em] uppercase anim-fade-in" style={delay(0.4)}>
          Your data remains sovereign · SOC 2 Type II
        </p>
      </div>
    </div>
  );
}
