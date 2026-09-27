import { useState, useEffect } from 'react';
import {
  Building2, ArrowRight, ArrowUpRight, Check, Crown, Shield, Zap, BarChart3, Users,
  FileText, CalendarClock, MessageSquare, Landmark, ChevronDown, Star, Menu, X,
  HardHat, Ruler, Camera, TrendingUp, Globe2
} from 'lucide-react';
import { heroImages, projects } from '../data/dummyData';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

/* ---------- Scroll reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCount(target: number, active: boolean, dur = 1900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setV((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, dur]);
  return v;
}

/* ---------- Rotating hero word ---------- */
const words = ['Command', 'Orchestrate', 'Capitalize', 'Deliver'];

export default function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordFade, setWordFade] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [heroStatsActive, setHeroStatsActive] = useState(false);
  const [mockHover, setMockHover] = useState(false);

  const c1 = useCount(2480, heroStatsActive);
  const c2 = useCount(148, heroStatsActive);
  const c3 = useCount(12, heroStatsActive);
  const c4 = useCount(99, heroStatsActive);

  useReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    setHeroStatsActive(true);
    const wordTimer = setInterval(() => {
      setWordFade(true);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % words.length);
        setWordFade(false);
      }, 320);
    }, 2800);
    return () => { window.removeEventListener('scroll', onScroll); clearInterval(wordTimer); };
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Voices', href: '#testimonials' },
    { label: 'Tiers', href: '#pricing' },
  ];

  const features = [
    { icon: BarChart3, title: 'Capital Command', desc: 'Live ledgers, variance alarms and committed-cost forecasting that read like a private bank statement.', tint: 'from-[#c9a961]/20', iconColor: 'text-[#c9a961]' },
    { icon: CalendarClock, title: 'Master Scheduling', desc: 'Gantt-grade timelines with critical-path intelligence and milestone sentinels.', tint: 'from-sky-400/20', iconColor: 'text-sky-300' },
    { icon: FileText, title: 'Document Vault', desc: 'Versioned drawings, specifications and contracts — sealed, audited, retrievable in one breath.', tint: 'from-violet-400/20', iconColor: 'text-violet-300' },
    { icon: MessageSquare, title: 'RFI & Instruments', desc: 'Formal requests and change orders with SLA tracking and executive sign-off trails.', tint: 'from-emerald-400/20', iconColor: 'text-emerald-300' },
    { icon: HardHat, title: 'Field Journal', desc: 'Daily site intelligence — weather, labor hours, incidents — filed from any device, anywhere.', tint: 'from-amber-400/20', iconColor: 'text-amber-300' },
    { icon: Users, title: 'Sovereign Access', desc: 'Granular, role-based rights from owner to client stakeholder, with immutable audit trails.', tint: 'from-rose-400/20', iconColor: 'text-rose-300' },
  ];

  const testimonials = [
    { quote: 'We replaced four tools the same week. Our board pack now writes itself — and the numbers are never wrong.', name: 'Victoria Lane', role: 'CEO, LaneWood Developments', initials: 'VL' },
    { quote: 'The field journal alone cut our reporting lag from three days to twenty minutes. The foremen actually love it.', name: 'Marcus Okafor', role: 'COO, Summit & Vale', initials: 'MO' },
    { quote: 'A platform that finally treats construction capital with the dignity of institutional finance.', name: 'Isabella Ricci', role: 'Principal, Ricci Partners', initials: 'IR' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c11] text-[#e8e6e3] overflow-x-hidden">
      {/* =============== NAV =============== */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navScrolled ? 'bg-[#0a0c11]/85 backdrop-blur-xl border-b border-[#1f2533] py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(201,169,97,.5)]">
              <Building2 size={20} className="text-[#131008]" />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-[0.16em] text-white leading-none">STRATA</div>
              <div className="text-[8px] tracking-[0.3em] text-[#c9a961] uppercase mt-0.5">Construction Intelligence</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="text-[13px] text-[#9aa3b2] hover:text-[#e8d9b8] transition-colors tracking-wide">{l.label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onLogin} className="px-5 py-2.5 text-[13px] text-[#c3cbd8] hover:text-white transition-colors">Sign In</button>
            <button onClick={onRegister} className="lux-btn-gold px-5 py-2.5 rounded-xl text-[13px] flex items-center gap-1.5">
              Begin <ArrowRight size={14} />
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-[#0a0c11]/95 backdrop-blur-xl border-t border-[#1f2533] px-6 py-5 space-y-3 anim-fade-up">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileMenu(false)} className="block text-sm text-[#c3cbd8] py-1.5">{l.label}</a>
            ))}
            <div className="flex gap-3 pt-3 border-t border-[#1f2533]">
              <button onClick={onLogin} className="flex-1 lux-btn-ghost py-2.5 rounded-xl text-sm">Sign In</button>
              <button onClick={onRegister} className="flex-1 lux-btn-gold py-2.5 rounded-xl text-sm">Begin</button>
            </div>
          </div>
        )}
      </nav>

      {/* =============== HERO =============== */}
      <header className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImages.login} alt="" className="w-full h-full object-cover anim-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c11] via-[#0a0c11]/65 to-[#0a0c11]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c11] via-transparent to-[#0a0c11]/50" />
        </div>
        <div className="particle w-52 h-52 left-[60%] top-[20%]" />
        <div className="particle w-32 h-32 left-[15%] top-[65%]" style={{ animationDelay: '3s' }} />
        <div className="particle w-24 h-24 left-[45%] top-[40%]" style={{ animationDelay: '6s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="max-w-3xl">
            <div className="anim-fade-up flex items-center gap-3 mb-7" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-px bg-[#c9a961]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#c9a961] font-semibold">The Operating System of Ambitious Builders</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[76px] font-bold text-white leading-[1.04] anim-fade-up" style={{ animationDelay: '0.22s' }}>
              <span className="block overflow-hidden h-[1.16em]">
                <span className={`inline-block transition-all duration-300 ${wordFade ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  {words[wordIdx]}
                </span>
              </span>
              every dollar.<br />
              <span className="italic bg-gradient-to-r from-[#e8d9b8] via-[#c9a961] to-[#b8954d] bg-clip-text text-transparent">Every crew. Every crane.</span>
            </h1>

            <div className="gold-line h-px w-72 mt-7 anim-fade-up" style={{ animationDelay: '0.4s' }} />

            <p className="text-lg text-[#9aa3b2] max-w-xl mt-7 leading-relaxed anim-fade-up" style={{ animationDelay: '0.5s' }}>
              One refined platform uniting your portfolio, budgets, documents, field crews and clients
              into a single instrument of control — engineered for firms who build with conviction.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10 anim-fade-up" style={{ animationDelay: '0.62s' }}>
              <button onClick={onRegister} className="lux-btn-gold px-8 py-4 rounded-2xl text-sm flex items-center gap-2">
                Commission Your Workspace <ArrowRight size={16} />
              </button>
              <button onClick={onLogin} className="group px-8 py-4 rounded-2xl text-sm font-medium text-white border border-white/20 backdrop-blur-sm hover:border-[#c9a961]/60 hover:bg-white/5 transition-all flex items-center gap-2">
                Enter Demo <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 anim-fade-up" style={{ animationDelay: '0.75s' }}>
              {[
                { v: `${Math.round(c1).toLocaleString()}+`, l: 'Projects Delivered' },
                { v: `${Math.round(c2)}`, l: 'Global Firms' },
                { v: `$${Math.round(c3)}B+`, l: 'Capital Managed' },
                { v: `${Math.round(c4)}.98%`, l: 'Uptime Pledge' },
              ].map(s => (
                <div key={s.l} className="border-l border-[#c9a961]/30 pl-4">
                  <div className="font-display text-2xl lg:text-3xl font-bold text-white">{s.v}</div>
                  <div className="text-[10px] tracking-[0.18em] uppercase text-[#6b7280] mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b7280] anim-fade-up" style={{ animationDelay: '1.2s' }}>
          <span className="text-[9px] tracking-[0.3em] uppercase">Descend</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </header>

      {/* =============== TICKER =============== */}
      <section className="border-y border-[#1f2533] bg-[#0d1017] py-5 overflow-hidden">
        <div className="flex whitespace-nowrap ticker">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-14 pr-14">
              {['HOLLINGSWORTH & SONS', 'LANEWOOD DEVELOPMENTS', 'SUMMIT & VALE', 'RICCI PARTNERS',
                'APEX CONTINENTAL', 'GILDROW GROUP', 'NORTHPINE CAPITAL', 'VANTAGE BUILD CO'].map(name => (
                <span key={name + k} className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.18em] text-[#4a5060]">
                  <Landmark size={14} className="text-[#c9a961]/40" /> {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =============== PLATFORM / FEATURES =============== */}
      <section id="platform" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#c9a961]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">The Platform</span>
              <div className="w-8 h-px bg-[#c9a961]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
              Built like the structures <span className="italic text-[#c9a961]">you raise</span>
            </h2>
            <p className="text-[#8a8f98] mt-5 leading-relaxed">
              Every module engineered to hold the weight of real operations — from the first estimate to the final punch list.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="lux-card lux-hover-lift p-7 relative overflow-hidden reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.tint} to-transparent opacity-50`} />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-white/[.05] border border-white/10 flex items-center justify-center mb-5">
                      <Icon size={21} className={f.iconColor} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{f.title}</h3>
                    <p className="text-sm text-[#8a8f98] leading-relaxed mt-2.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== PRODUCT PREVIEW =============== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c9a961]/[.03] to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
              Your entire empire, <span className="italic text-[#c9a961]">in one gaze</span>
            </h2>
          </div>

          <div className="reveal" style={{ perspective: '1400px' }}>
            <div
              className="lux-card border-[#2a3142] rounded-3xl overflow-hidden shadow-[0_50px_140px_-30px_rgba(0,0,0,.85)] transition-transform duration-700 ease-out"
              style={{ transform: mockHover ? 'rotateX(0deg) rotateY(0deg) scale(1.01)' : 'rotateX(7deg) rotateY(-4deg)' }}
              onMouseEnter={() => setMockHover(true)}
              onMouseLeave={() => setMockHover(false)}
            >
              {/* Mock window bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1f2533] bg-[#0d1017]">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <div className="ml-4 flex-1 max-w-xs h-6 rounded-md bg-[#1a1f2b] border border-[#2a3142] flex items-center px-3 text-[9px] text-[#4a5060] font-mono-lux">strata.app/command</div>
              </div>
              {/* Mock dashboard */}
              <div className="p-5 bg-[#0a0c11]">
                <div className="relative h-36 rounded-2xl overflow-hidden mb-4">
                  <img src={projects[0].image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c11]/90 via-[#0a0c11]/40 to-transparent flex items-center px-6">
                    <div>
                      <div className="text-[9px] tracking-[0.25em] uppercase text-[#c9a961] font-bold">Flagship</div>
                      <div className="font-display text-xl font-bold text-white">{projects[0].name}</div>
                      <div className="mt-2 w-44 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-[63%] bg-gradient-to-r from-[#d9b876] to-[#b8954d] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[['Capital', '$140.5M', 'text-[#c9a961]'], ['Deployed', '$68.8M', 'text-white'], ['On-Site', '217', 'text-white'], ['Variance', '+3.2%', 'text-emerald-400']].map(([k, v, c]) => (
                    <div key={k as string} className="bg-[#11141c] border border-[#1f2533] rounded-xl p-3.5">
                      <div className="text-[8px] tracking-[0.2em] uppercase text-[#4a5060]">{k as string}</div>
                      <div className={`font-display text-lg font-bold mt-0.5 ${c}`}>{v as string}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 mt-4 items-end h-20 px-1">
                  {[42, 58, 51, 70, 66, 85, 60].map((h, i) => (
                    <div key={i} className="rounded-md bg-gradient-to-t from-[#b8954d]/60 to-[#d9b876] transition-all duration-500" style={{ height: `${mockHover ? h : h * 0.6}%`, opacity: 0.4 + i * 0.08 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== SHOWCASE SPLIT =============== */}
      <section id="showcase" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden h-[420px] img-zoom border border-[#2a3142]">
                <img src={heroImages.site1} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-4 lg:-right-6 lux-card border-[#c9a961]/30 p-5 w-60 shadow-2xl">
                <div className="flex items-center gap-2 text-[#c9a961] text-[10px] tracking-[0.2em] uppercase font-bold mb-2"><TrendingUp size={12} /> This Week</div>
                <div className="font-display text-3xl font-bold text-white">+4.2%</div>
                <div className="text-[11px] text-[#8a8f98]">ahead of schedule across active sites</div>
              </div>
              <div className="absolute -top-5 -left-3 lg:-left-5 lux-glass rounded-2xl px-4 py-3 flex items-center gap-3">
                <Camera size={15} className="text-[#c9a961]" />
                <span className="text-xs text-white">1,240 field captures this month</span>
              </div>
            </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#c9a961]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Field to Boardroom</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              The foreman's phone.<br /><span className="italic text-[#c9a961]">The chairman's screen.</span>
            </h2>
            <p className="text-[#8a8f98] mt-6 leading-relaxed">
              Time-stamped photos, weather logs and labor counts filed on-site surface instantly in
              executive dashboards — no transcription, no delay, no doubt.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ['Offline-first field capture', 'Signal dies in basements. Your data does not.'],
                ['Immutable audit trail', 'Every signature, revision and receipt — sealed forever.'],
                ['Client observatory', 'Give stakeholders a window, never a worry.'],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-[#c9a961]" />
                  </div>
                  <div><div className="font-semibold text-white text-sm">{t}</div><div className="text-[13px] text-[#6b7280] mt-0.5">{d}</div></div>
                </div>
              ))}
            </div>
            <button onClick={onRegister} className="mt-9 group flex items-center gap-2 text-sm font-semibold text-[#c9a961] hover:text-[#e8d9b8] transition-colors">
              Discover the full repertoire <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* =============== PRINCIPLES BAND =============== */}
      <section className="border-y border-[#1f2533] bg-[#0d1017] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Shield, t: 'Sovereign Security', d: 'SOC 2 Type II, end-to-end encryption, region-locked sovereignty.' },
            { icon: Zap, t: 'Real-Time Fabric', d: 'Sub-second sync between field crews and executive suites.' },
            { icon: Ruler, t: 'Precision Controls', d: 'Role & permission matrices rivaling institutional banks.' },
            { icon: Globe2, t: 'Multi-Tenant Core', d: 'Complete data isolation per firm, guaranteed by architecture.' },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.t} className="reveal flex flex-col items-start" style={{ transitionDelay: `${i * 70}ms` }}>
                <Icon size={22} className="text-[#c9a961] mb-4" />
                <h3 className="font-display font-bold text-white">{p.t}</h3>
                <p className="text-[13px] text-[#6b7280] mt-2 leading-relaxed">{p.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =============== TESTIMONIALS =============== */}
      <section id="testimonials" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#c9a961]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Voices</span>
              <div className="w-8 h-px bg-[#c9a961]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">Sworn by the firms <span className="italic text-[#c9a961]">who raise skylines</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
            {testimonials.map((t, i) => (
              <div key={t.name} className="lux-card lux-hover-lift p-7 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(n => <Star key={n} size={14} className="text-[#c9a961] fill-[#c9a961]" />)}
                </div>
                <p className="font-display text-[17px] leading-relaxed text-[#d5dbe5] italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-7 pt-5 border-t border-[#1f2533]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2a3142] to-[#1a1f2b] border border-[#c9a961]/30 flex items-center justify-center text-[#c9a961] text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-[#6b7280]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== PRICING =============== */}
      <section id="pricing" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c9a961]/[.04] to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#c9a961]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Membership</span>
              <div className="w-8 h-px bg-[#c9a961]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">Tiers of ambition</h2>
            <div className="flex justify-center gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1 w-fit mx-auto mt-8">
              <button onClick={() => setBilling('monthly')} className={`px-5 py-2 text-xs rounded-lg font-medium transition-all ${billing === 'monthly' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Monthly</button>
              <button onClick={() => setBilling('annual')} className={`px-5 py-2 text-xs rounded-lg font-medium transition-all ${billing === 'annual' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Annual · Save 20%</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            {[
              { name: 'Starter', price: 49, desc: 'Emerging firms', features: ['5 seats', '3 engagements', '10 GB vault', 'Daily journal', 'Email concierge'] },
              { name: 'Professional', price: 149, desc: 'The house favorite', features: ['25 seats', '15 engagements', '100 GB vault', 'RFI & instruments', 'Trade partner portal', 'API fabric'], badge: true },
              { name: 'Enterprise', price: 399, desc: 'Full sovereignty', features: ['Unbounded seats', 'Unbounded engagements', '1 TB vault', 'Everything in Pro', 'SSO & SAML', 'Dedicated steward'] },
            ].map((p, i) => {
              const price = billing === 'annual' ? Math.round(p.price * 0.8) : p.price;
              return (
                <div key={p.name}
                  className={`lux-card lux-hover-lift p-7 relative reveal ${p.badge ? 'ring-1 ring-[#c9a961]/60 shadow-[0_0_80px_-20px_rgba(201,169,97,.45)] lg:-translate-y-3' : ''}`}
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  {p.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.18em] uppercase font-bold text-[#131008] bg-gradient-to-r from-[#d9b876] to-[#b8954d] px-4 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                      <Crown size={11} /> Most Elective
                    </span>
                  )}
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="text-[11px] text-[#6b7280] mt-0.5">{p.desc}</div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-white">${price}</span>
                    <span className="text-sm text-[#6b7280]">/ month</span>
                  </div>
                  {billing === 'annual' && <div className="text-[11px] text-emerald-300 mt-1">Saving ${(p.price - price) * 12}/yr</div>}
                  <div className="mt-6 space-y-2.5">
                    {p.features.map(f => (
                      <div key={f} className="flex items-center gap-2.5 text-[13px] text-[#c3cbd8]">
                        <Check size={13} className="text-[#c9a961] flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={onRegister} className={`w-full mt-7 py-3 rounded-xl text-sm font-semibold ${p.badge ? 'lux-btn-gold' : 'lux-btn-ghost'}`}>
                    Elect {p.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== FINAL CTA =============== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImages.site2} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0a0c11]/88" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c11] via-transparent to-[#0a0c11]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center reveal">
          <Crown size={28} className="mx-auto text-[#c9a961] mb-6" />
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight">
            Raise your firm to<br /><span className="italic bg-gradient-to-r from-[#e8d9b8] via-[#c9a961] to-[#b8954d] bg-clip-text text-transparent">the Strata standard</span>
          </h2>
          <p className="text-[#8a8f98] mt-6 max-w-lg mx-auto leading-relaxed">
            Fourteen days, full membership, no card. The firms you admire are already here.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button onClick={onRegister} className="lux-btn-gold px-9 py-4 rounded-2xl text-sm flex items-center gap-2">
              Found Your Workspace <ArrowRight size={16} />
            </button>
            <button onClick={onLogin} className="px-9 py-4 rounded-2xl text-sm text-white border border-white/20 hover:border-[#c9a961]/60 hover:bg-white/5 transition-all">
              Sign In to Demo
            </button>
          </div>
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <footer className="border-t border-[#1f2533] bg-[#080a0e] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d9b876] to-[#b8954d] flex items-center justify-center">
                  <Building2 size={18} className="text-[#131008]" />
                </div>
                <div>
                  <div className="font-display font-bold tracking-[0.16em] text-white">STRATA</div>
                  <div className="text-[8px] tracking-[0.3em] text-[#c9a961] uppercase">Construction Intelligence</div>
                </div>
              </div>
              <p className="text-[13px] text-[#6b7280] leading-relaxed max-w-xs">
                The operating system for firms who build with conviction. Engineered in Austin, deployed on every continent.
              </p>
            </div>
            {[
              ['Platform', ['Command Center', 'Capital Ledger', 'Document Vault', 'Field Journal', 'Client Observatory']],
              ['Firm', ['Manifesto', 'The Chronicle', 'Careers', 'Press Kit', 'Contact Concierge']],
              ['Legal', ['Privacy Covenant', 'Terms of Service', 'SOC 2 Attestation', 'Data Sovereignty', 'Status']],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#c9a961] font-semibold mb-4">{title as string}</h4>
                <div className="space-y-2.5">
                  {(links as string[]).map(l => (
                    <button key={l} onClick={() => alert(`${l} — coming soon in the demo`)} className="block text-[13px] text-[#6b7280] hover:text-[#e8d9b8] transition-colors text-left">{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-8 border-t border-[#1f2533] flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-[#4a5060]">© 2026 Strata Construction Intelligence, Inc. All rights reserved.</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#4a5060] flex items-center gap-2">
              <Shield size={11} className="text-[#c9a961]/60" /> SOC 2 · ISO 27001 · 99.98% Uptime Pledge
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
