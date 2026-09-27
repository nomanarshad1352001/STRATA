import { useState } from 'react';
import { Check, CreditCard, X, Crown, Sparkles } from 'lucide-react';
import { subscriptionPlans } from '../data/dummyData';

const delay = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [currentPlan, setCurrentPlan] = useState('enterprise');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const tiers: Record<string, string> = {
    starter: 'border-[#2a3142]', professional: 'border-sky-400/40', enterprise: 'border-[#c9a961]/40',
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="anim-fade-up">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-px bg-[#c9a961]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">Membership</span>
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">Subscription & Billing</h1>
        <p className="text-sm text-[#6b7280] mt-1.5">Your seat at the Strata standard</p>
      </div>

      {/* Current plan banner */}
      <div className="relative overflow-hidden lux-card p-7 lg:p-8 anim-fade-up" style={delay(0.1)}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/15 via-transparent to-transparent" />
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a961] font-semibold">
              <Crown size={13} /> Current Tier
            </div>
            <div className="font-display text-4xl font-bold text-white mt-2 capitalize">{currentPlan}</div>
            <div className="text-sm text-[#8a8f98] mt-1.5">$399 / month · Annual commitment · Renews Feb 15, 2026</div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[['Seats', '47 / ∞'], ['Engagements', '12 / ∞'], ['Vault', '234 GB / 1 TB']].map(([k, v]) => (
              <div key={k} className="bg-black/30 backdrop-blur border border-[#c9a961]/25 rounded-2xl px-5 py-3.5">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#6b7280]">{k}</div>
                <div className="font-display font-bold text-white text-lg mt-0.5">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tier comparison */}
      <div>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5 anim-fade-up" style={delay(0.16)}>
          <h2 className="font-display text-xl font-bold text-white">Tiers of Membership</h2>
          <div className="flex gap-1 bg-[#11141c] border border-[#1f2533] rounded-xl p-1">
            <button onClick={() => setBilling('monthly')} className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-all ${billing === 'monthly' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Monthly</button>
            <button onClick={() => setBilling('annual')} className={`px-4 py-1.5 text-xs rounded-lg font-medium transition-all ${billing === 'annual' ? 'bg-[#c9a961] text-[#131008]' : 'text-[#8a8f98] hover:text-white'}`}>Annual · Save 20%</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {subscriptionPlans.map((plan, i) => {
            const price = billing === 'annual' ? Math.round(plan.price * 0.8) : plan.price;
            const isCurrent = plan.name.toLowerCase() === currentPlan;
            return (
              <div key={plan.id}
                className={`lux-card lux-hover-lift p-7 relative anim-fade-up ${isCurrent ? 'ring-1 ring-[#c9a961]/60 shadow-[0_0_60px_-12px_rgba(201,169,97,.35)]' : tiers[plan.name.toLowerCase()]}`}
                style={delay(0.2 + i * 0.08)}>
                {isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase font-bold text-[#131008] bg-gradient-to-r from-[#d9b876] to-[#b8954d] px-4 py-1 rounded-full whitespace-nowrap">
                    Active Membership
                  </span>
                )}
                {plan.recommended && !isCurrent && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-wider uppercase font-semibold text-white bg-sky-500 px-3.5 py-1 rounded-full">
                    Most Elective
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-white">${price}</span>
                  <span className="text-sm text-[#6b7280]">/ month</span>
                </div>
                {billing === 'annual' && <div className="text-xs text-emerald-300 font-medium mt-1">Saving ${(plan.price - price) * 12} per annum</div>}
                <div className="mt-6 space-y-2.5">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-[13px] text-[#c3cbd8]">
                      <Check size={13} className="text-[#c9a961] flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { if (!isCurrent) { setSelectedPlanId(plan.id); setShowUpgrade(true); setConfirmed(false); } }}
                  className={`w-full mt-7 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isCurrent ? 'bg-[#c9a961]/10 text-[#c9a961] border border-[#c9a961]/35 cursor-default' : 'lux-btn-gold'
                  }`}>
                  {isCurrent ? 'Current Tier' : `Elect ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing ledger + payment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 lux-card overflow-hidden anim-fade-up" style={delay(0.34)}>
          <div className="px-6 py-4 border-b border-[#1f2533] flex items-center justify-between">
            <h3 className="font-display font-semibold text-white">Settlement History</h3>
            <button onClick={() => alert('Exporting statements…')} className="text-xs text-[#c9a961] hover:text-[#e8d9b8] transition-colors">Export All</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-[#0d1017] border-b border-[#1f2533]">
              {['Date', 'Instrument', 'Amount', 'Standing', ''].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-[10px] font-semibold text-[#6b7280] uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr></thead>
            <tbody>{[
              ['Jan 15, 2026', 'Enterprise · Monthly', '$399.00'], ['Dec 15, 2025', 'Enterprise · Monthly', '$399.00'],
              ['Nov 15, 2025', 'Professional · Monthly', '$149.00'], ['Oct 15, 2025', 'Professional · Monthly', '$149.00'],
            ].map(([date, desc, amount], i) => (
              <tr key={i} className="border-b border-[#1f2533]/60 hover:bg-white/[.03] cursor-pointer transition-colors">
                <td className="px-5 py-3.5 text-sm text-[#c3cbd8] font-mono-lux">{date}</td>
                <td className="px-5 py-3.5 text-sm text-[#c3cbd8]">{desc}</td>
                <td className="px-5 py-3.5 font-display font-bold text-white">{amount}</td>
                <td className="px-5 py-3.5"><span className="text-[10px] bg-emerald-400/15 text-emerald-300 px-2 py-0.5 rounded-full font-medium">Settled</span></td>
                <td className="px-5 py-3.5"><button onClick={() => alert('Downloading statement…')} className="text-xs text-[#c9a961] hover:text-[#e8d9b8]">Statement</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="lux-card p-6 anim-fade-up" style={delay(0.4)}>
          <h3 className="font-display font-semibold text-white mb-5">Settlement Method</h3>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1f2b] to-[#0d1017] border border-[#c9a961]/30 p-5">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#c9a961]/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between mb-8">
              <Sparkles size={18} className="text-[#c9a961]" />
              <span className="text-[10px] tracking-[0.3em] text-[#6b7280] uppercase">Visa</span>
            </div>
            <div className="font-mono-lux text-lg text-white tracking-[0.15em]">•••• •••• •••• 4242</div>
            <div className="flex justify-between mt-4 text-[10px] text-[#6b7280] uppercase tracking-wider">
              <span>Mitchell, John</span><span>12 / 2028</span>
            </div>
          </div>
          <button className="w-full mt-5 lux-btn-ghost py-3 rounded-xl text-sm flex items-center justify-center gap-2">
            <CreditCard size={15} /> Replace Method
          </button>
        </div>
      </div>

      {/* Upgrade confirm modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-backdrop" onClick={() => setShowUpgrade(false)}>
          <div className="lux-card w-full max-w-md p-7 anim-modal border-[#c9a961]/30" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-white">Change of Tier</h2>
              <button onClick={() => setShowUpgrade(false)} className="text-[#6b7280] hover:text-white"><X size={20} /></button>
            </div>
            {confirmed ? (
              <div className="text-center py-6 anim-fade-up">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#c9a961]/15 border border-[#c9a961]/40 flex items-center justify-center mb-4">
                  <Crown size={26} className="text-[#c9a961]" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Membership Elevated</h3>
                <p className="text-sm text-[#8a8f98] mt-2">Welcome to the {subscriptionPlans.find(p => p.id === selectedPlanId)?.name} tier.</p>
                <button onClick={() => { setShowUpgrade(false); setCurrentPlan(subscriptionPlans.find(p => p.id === selectedPlanId)?.name.toLowerCase() || 'enterprise'); }}
                  className="lux-btn-gold mt-6 px-8 py-3 rounded-xl text-sm">Splendid</button>
              </div>
            ) : (
              <>
                <p className="text-sm text-[#9aa3b2] leading-relaxed">
                  You are electing the <span className="text-[#c9a961] font-semibold">{subscriptionPlans.find(p => p.id === selectedPlanId)?.name}</span> tier.
                  The change takes effect immediately, prorated to your settlement cycle.
                </p>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowUpgrade(false)} className="flex-1 lux-btn-ghost py-3 rounded-xl text-sm">Reconsider</button>
                  <button onClick={() => setConfirmed(true)} className="flex-1 lux-btn-gold py-3 rounded-xl text-sm">Confirm Election</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
