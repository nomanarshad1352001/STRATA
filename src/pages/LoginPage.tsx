import { useState, useEffect, useRef } from 'react';
import { Building2, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, Crown, Ruler, HardHat, UserRound, Check } from 'lucide-react';
import { heroImages } from '../data/dummyData';

interface LoginPageProps { onLogin: () => void; onRegister: () => void; }

const demoRoles = [
  { key: 'owner', label: 'Executive Owner', name: 'John Mitchell', email: 'john@buildright.com', icon: Crown },
  { key: 'pm', label: 'Project Manager', name: 'Mike Rodriguez', email: 'mike@buildright.com', icon: Ruler },
  { key: 'field', label: 'Field Supervisor', name: 'David Kim', email: 'david@buildright.com', icon: HardHat },
  { key: 'client', label: 'Client Stakeholder', name: 'Amanda Foster', email: 'amanda@client.com', icon: UserRound },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

export default function LoginPage({ onLogin, onRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fillRole, setFillRole] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const timers = useRef<number[]>([]);

  const c1 = useCountUp(2480, 2000, mounted);
  const c2 = useCountUp(148, 2000, mounted);
  const c3 = useCountUp(12, 2000, mounted);

  useEffect(() => {
    setMounted(true);
    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, []);

  // Typewriter autofill for demo credentials
  const autofill = (targetEmail: string, roleKey: string, autoSubmit = false) => {
    timers.current.forEach(clearTimeout); timers.current = [];
    setFillRole(roleKey);
    setEmail(''); setPassword('');
    let i = 0;
    for (i = 0; i <= targetEmail.length; i++) {
      timers.current.push(window.setTimeout(() => setEmail(targetEmail.slice(0, i)), 22 * i));
    }
    const pass = 'StrataDemo2024';
    for (let j = 0; j <= pass.length; j++) {
      timers.current.push(window.setTimeout(() => setPassword(pass.slice(0, j)), 22 * targetEmail.length + 18 * j));
    }
    if (autoSubmit) {
      timers.current.push(window.setTimeout(doLogin, 22 * targetEmail.length + 18 * pass.length + 250));
    }
  };

  const doLogin = () => {
    setLoading(true);
    timers.current.push(window.setTimeout(() => {
      setSuccess(true);
      timers.current.push(window.setTimeout(onLogin, 650));
    }, 900));
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); doLogin(); };

  const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

  return (
    <div className="min-h-screen relative flex overflow-hidden bg-[#0a0c11]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <img src={heroImages.login} alt="" className="w-full h-full object-cover anim-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c11] via-[#0a0c11]/70 to-[#0a0c11]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c11] via-transparent to-[#0a0c11]/60" />
      </div>

      {/* Floating gold particles */}
      <div className="particle w-40 h-40 left-[8%] top-[15%]" style={{ animationDelay: '0s', animationDuration: '14s' }} />
      <div className="particle w-24 h-24 left-[70%] top-[70%]" style={{ animationDelay: '2s', animationDuration: '10s' }} />
      <div className="particle w-56 h-56 left-[40%] top-[80%]" style={{ animationDelay: '4s', animationDuration: '16s' }} />
      <div className="particle w-16 h-16 left-[55%] top-[25%]" style={{ animationDelay: '6s', animationDuration: '9s' }} />
      <div className="particle w-32 h-32 left-[85%] top-[40%]" style={{ animationDelay: '1s', animationDuration: '13s' }} />

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row">
        {/* Left — brand statement */}
        <div className="flex-1 hidden lg:flex flex-col justify-center px-14 xl:px-24">
          <div className="anim-fade-up" style={delay(0.1)}>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center shadow-[0_8px_30px_-6px_rgba(201,169,97,.6)]">
                <Building2 size={24} className="text-[#131008]" />
              </div>
              <div>
                <div className="font-display text-xl font-bold tracking-[0.18em] text-white">STRATA</div>
                <div className="text-[10px] tracking-[0.3em] text-[#c9a961] uppercase">Construction Intelligence</div>
              </div>
            </div>
          </div>

          <div className="anim-fade-up" style={delay(0.25)}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-[#c9a961]" />
              <span className="text-[11px] tracking-[0.35em] text-[#c9a961] uppercase font-medium">The Gold Standard</span>
            </div>
            <h1 className="font-display text-6xl xl:text-7xl font-bold text-white leading-[1.05]">
              Build the<br />
              <span className="italic bg-gradient-to-r from-[#e8d9b8] via-[#c9a961] to-[#b8954d] bg-clip-text text-transparent">Extraordinary</span>
            </h1>
            <div className="gold-line h-px w-64 mt-6" />
          </div>

          <p className="text-[#9aa3b2] text-lg max-w-md mt-8 leading-relaxed anim-fade-up" style={delay(0.4)}>
            One refined platform to command every project, every dollar, and every person — from penthouse bid to ribbon cutting.
          </p>

          {/* Animated counters */}
          <div className="flex gap-12 mt-14">
            {[
              { val: `${c1.toLocaleString()}+`, label: 'Projects Delivered' },
              { val: `${c2}`, label: 'Global Firms' },
              { val: `$${c3}B+`, label: 'Capital Managed' },
            ].map((s, i) => (
              <div key={s.label} className="anim-fade-up" style={delay(0.55 + i * 0.12)}>
                <div className="font-display text-3xl font-bold text-white">{s.val}</div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#6b7280] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — glass login card */}
        <div className="flex-none w-full lg:w-[500px] xl:w-[540px] flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md anim-fade-up" style={delay(0.3)}>
            {/* Mobile brand */}
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center">
                <Building2 size={22} className="text-[#131008]" />
              </div>
              <div className="font-display text-xl font-bold tracking-[0.18em] text-white">STRATA</div>
            </div>

            <div className="lux-glass rounded-3xl p-8 shadow-[0_32px_80px_-16px_rgba(0,0,0,.7)]">
              <div className="anim-fade-up" style={delay(0.5)}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Welcome back</h2>
                    <p className="text-sm text-[#8a8f98] mt-1">Enter your workspace</p>
                  </div>
                  <Sparkles size={20} className="text-[#c9a961]" style={{ animation: 'pulseGlow 3s infinite' }} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4 anim-fade-up" style={delay(0.6)}>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#8a8f98] mb-2">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
                    <input
                      type="email" value={email} onChange={e => { setEmail(e.target.value); setFillRole(null); }}
                      placeholder="you@firm.com"
                      className="w-full lux-input pl-11 pr-4 py-3 text-sm"
                    />
                    {fillRole && email.length > 0 && (
                      <Check size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 anim-fade-in" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-[#8a8f98] mb-2">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a5060]" />
                    <input
                      type={showPassword ? 'text' : 'password'} value={password}
                      onChange={e => { setPassword(e.target.value); setFillRole(null); }}
                      placeholder="••••••••••"
                      className="w-full lux-input pl-11 pr-11 py-3 text-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a5060] hover:text-[#c9a961] transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-[#c9a961] border-[#c9a961]' : 'border-[#2a3142] group-hover:border-[#c9a961]'}`}
                      onClick={() => setRememberMe(!rememberMe)}>
                      {rememberMe && <Check size={11} className="text-[#131008]" />}
                    </div>
                    <span className="text-xs text-[#8a8f98]">Remember me</span>
                  </label>
                  <button type="button" className="text-xs text-[#c9a961] hover:text-[#e8d9b8] transition-colors">Forgot password?</button>
                </div>

                <button type="submit" disabled={loading || success}
                  className="w-full lux-btn-gold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 mt-2">
                  {success ? <><Check size={16} /> Access Granted</> :
                   loading ? <><div className="w-4 h-4 border-2 border-[#131008]/30 border-t-[#131008] rounded-full animate-spin" /> Authenticating…</> :
                   <span className="flex items-center gap-2">Sign In to Workspace <ArrowRight size={16} /></span>}
                </button>
              </form>

              {/* Demo autofill */}
              <div className="mt-7 anim-fade-up" style={delay(0.75)}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-[#1f2533]" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#6b7280]">Instant Demo Access</span>
                  <div className="flex-1 h-px bg-[#1f2533]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {demoRoles.map(r => {
                    const Icon = r.icon;
                    const active = fillRole === r.key;
                    return (
                      <button key={r.key} onClick={() => autofill(r.email, r.key)}
                        className={`group flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-left transition-all duration-300 ${
                          active ? 'border-[#c9a961] bg-[#c9a961]/10' : 'border-[#1f2533] hover:border-[#c9a961]/50 hover:bg-[#c9a961]/5'
                        }`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          active ? 'bg-[#c9a961] text-[#131008]' : 'bg-[#1a1f2b] text-[#c9a961] group-hover:bg-[#c9a961]/20'
                        }`}>
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white truncate">{r.label}</div>
                          <div className="text-[10px] text-[#6b7280] truncate">{active ? 'Credentials filled ✓' : 'Tap to autofill'}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => autofill(demoRoles[0].email, 'owner', true)} disabled={loading || success}
                  className="w-full mt-3 py-3 rounded-xl border border-dashed border-[#c9a961]/40 text-[#c9a961] text-xs tracking-[0.15em] uppercase font-semibold hover:bg-[#c9a961]/10 transition-all flex items-center justify-center gap-2">
                  <Sparkles size={13} /> One-Click Demo Sign In
                </button>
              </div>

              <div className="mt-6 text-center anim-fade-up" style={delay(0.85)}>
                <span className="text-xs text-[#6b7280]">New to Strata? </span>
                <button onClick={onRegister} className="text-xs text-[#c9a961] hover:text-[#e8d9b8] font-semibold transition-colors">Register your firm</button>
              </div>
            </div>

            <p className="text-center text-[10px] text-[#4a5060] mt-6 tracking-[0.2em] uppercase anim-fade-in" style={delay(1)}>
              SOC 2 Compliant · End-to-End Encrypted · 99.99% Uptime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
