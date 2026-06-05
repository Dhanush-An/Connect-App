import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase, Users, ShoppingBag, Shield, Search, ArrowRight,
  CheckCircle, MapPin, TrendingUp, Zap, Award, Star, Gem, Check,
  X, Compass, Sparkles
} from 'lucide-react';



/* ══════════════════════════════════════════════════════════════
   MEMBERSHIP PLAN DATA
══════════════════════════════════════════════════════════════ */
const MEMBERSHIPS = [
  {
    name: 'Silver',
    price: '$19',
    period: '/mo',
    suitableFor: 'Suitable for Individuals and Students.',
    feeLabel: 'Basic Plan',
    desc: 'Perfect for getting started with basic discounts, food offers, and job portal access.',
    features: [
      'Basic discounts on partner stores',
      'Food offers',
      'Travel offers',
      'Job portal access',
      'Service booking discounts',
      'Reward points'
    ],
    highlight: false,
    color: '#94A3B8',
    gradient: 'from-slate-500 to-slate-400',
    btnText: 'Start Silver',
    atmBg: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
    cardNumber: '5412 7500 1920 0045',
    cardHolder: 'SILVER MEMBER',
    cardExpiry: '12/29'
  },
  {
    name: 'Gold',
    price: '$49',
    period: '/mo',
    suitableFor: 'Suitable for Working Professionals and Families.',
    feeLabel: 'Medium Plan',
    desc: 'The best value plan for active candidates and growing service providers.',
    features: [
      'All Silver Benefits',
      'Higher discounts',
      'Priority customer support',
      'Exclusive hotel offers',
      'Healthcare discounts',
      'Premium job opportunities',
      'Special festival offers',
      'Increased reward points'
    ],
    highlight: true,
    color: '#F59E0B',
    gradient: 'from-amber-500 to-yellow-400',
    btnText: 'Go Gold',
    atmBg: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #f59e0b 100%)',
    cardNumber: '5412 7500 4920 0088',
    cardHolder: 'GOLD MEMBER',
    cardExpiry: '06/30'
  },
  {
    name: 'Diamond',
    price: '$99',
    period: '/mo',
    suitableFor: 'Suitable for Business Owners and Premium Customers.',
    feeLabel: 'Premium Plan',
    desc: 'Ultimate console access for businesses, top agency vendors, and VIP recruiters.',
    features: [
      'All Gold Benefits',
      'Maximum discounts',
      'VIP customer support',
      'Business networking access',
      'Premium travel benefits',
      'Business service discounts',
      'Priority job hiring support',
      'Exclusive partner deals',
      'Higher cashback rewards'
    ],
    highlight: false,
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-400',
    btnText: 'Get Diamond',
    atmBg: 'linear-gradient(135deg, #0d9488 0%, #1e1b4b 50%, #4338ca 100%)',
    cardNumber: '5412 7500 9920 0123',
    cardHolder: 'DIAMOND MEMBER',
    cardExpiry: '09/31'
  }
];

/* ══════════════════════════════════════════════════════════════
   STATS DATA
══════════════════════════════════════════════════════════════ */
const STATS = [
  { value: '10k+',  label: 'Active Users',      icon: Users,      color: '#60a5fa' },
  { value: '$2.5M+',label: 'Revenue Processed', icon: TrendingUp, color: '#4ade80' },
  { value: '99.8%', label: 'Match Accuracy',     icon: Award,      color: '#a78bfa' },
  { value: '450+',  label: 'Categories',         icon: Zap,        color: '#67e8f9' },
];

/* ══════════════════════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const { setRole, cms, jobs, services, products, pushNotification, reviews, setActiveTab, requestMembership, setPendingMembership } = useApp();
  const [keyword, setKeyword] = useState('');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState(null); // plan object or null

  // Prevent scroll and hide header when modal is open
  useEffect(() => {
    if (selectedPlanForModal) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [selectedPlanForModal]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPlanForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = keyword
    ? jobs.filter(j =>
        j.title.toLowerCase().includes(keyword.toLowerCase()) ||
        j.company.toLowerCase().includes(keyword.toLowerCase())
      )
    : [];

  return (
    <div id="home" className="w-full min-h-[calc(100vh-62px)] flex flex-col animate-fade-in">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 lg:py-32 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div style={{
            position:'absolute', top:'-10%', left:'50%', transform:'translateX(-50%)',
            width:'600px', height:'400px', borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)',
            filter:'blur(40px)',
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto space-y-8">
          {/* Pill label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
            style={{ background:'rgba(124,58,237,0.12)', color:'#a78bfa', border:'1px solid rgba(124,58,237,0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Connect Platform v2.0 — Now Live
          </div>

          <h1
            className="text-[42px] md:text-[64px] font-extrabold leading-[1.08] tracking-tight"
            style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}
          >
            {cms?.landingHeroTitle?.split(',').map((part, i, arr) => (
              <span key={i}>
                {i === 0 ? <span className="text-gradient">{part}</span> : part}
                {i < arr.length - 1 ? ',' : ''}
              </span>
            )) || (
              <>
                <span className="text-gradient">Connect</span> Your Business,<br />
                Career &amp; Services
              </>
            )}
          </h1>

          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {cms?.landingHeroSub || 'The all-in-one platform for talent, vendors, and employers — collaborate, transact, and grow.'}
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button onClick={() => setRole('user')} className="btn-primary px-6 py-3 text-sm">
              Get Started Free <ArrowRight size={14} />
            </button>
            <button onClick={() => setRole('login')} className="btn-ghost px-6 py-3 text-sm">
              Sign In
            </button>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative pt-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg"
              style={{ background:'var(--bg-surface)', border:'1px solid var(--border-mid)' }}>
              <Search size={15} style={{ color:'var(--text-faint)', flexShrink:0 }} />
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search jobs — try 'React', 'Node' or 'Design'..."
                className="bg-transparent border-none text-sm w-full focus:outline-none"
                style={{ color:'var(--text-base)' }}
              />
            </div>

            {keyword && (
              <div className="absolute left-0 right-0 mt-2 rounded-xl shadow-2xl z-20 overflow-hidden animate-fade-in"
                style={{ background:'var(--bg-surface)', border:'1px solid var(--border-mid)' }}>
                <p className="section-label px-4 pt-3 pb-1.5">Search Results ({searchResults.length})</p>
                <div className="max-h-52 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <p className="text-center text-xs py-6" style={{ color:'var(--text-faint)' }}>
                      No matches. Try "React" or "Developer".
                    </p>
                  ) : (
                    searchResults.map(job => (
                      <button
                        key={job.id}
                        onClick={() => { setRole('user'); setKeyword(''); }}
                        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-[var(--glass-hover-bg)] group"
                        style={{ borderTop:'1px solid var(--border-subtle)' }}
                      >
                        <div>
                          <p className="text-xs font-semibold transition-colors group-hover:text-violet-400" style={{ color:'var(--text-base)' }}>
                            {job.title}
                          </p>
                          <p className="text-[11px] mt-0.5" style={{ color:'var(--text-faint)' }}>{job.company}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[11px]" style={{ color:'var(--text-faint)' }}>
                          <MapPin size={10} /> {job.location}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <div>
                <p className="text-2xl font-extrabold" style={{ color, fontFamily:'var(--font-display)' }}>{value}</p>
                <p className="text-[11px] mt-1 font-medium" style={{ color:'var(--text-faint)' }}>{label}</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:`${color}18` }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── USP & TAGLINE BANNER ─────────────────────────────────── */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border flex flex-col md:flex-row items-center gap-8 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(27,42,138,0.15) 0%, rgba(245,168,0,0.06) 100%)',
            borderColor: 'var(--border-mid)'
          }}
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
          />

          <div className="flex-1 space-y-5 text-center md:text-left z-10">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-violet-500/10 border border-violet-500/20 text-violet-400">
              Unique Value Proposition
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-base)' }}>
              One Card. <span className="text-gradient">Unlimited Benefits.</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              "Your Everyday Savings & Lifestyle Partner. Travel, Food, Stay, Shop, Work – All Connected."
            </p>
            <p className="text-xs max-w-xl" style={{ color: 'var(--text-faint)' }}>
              Instead of carrying multiple loyalty cards, users need only one Connect Membership Card to unlock benefits across all our partner domains.
            </p>
          </div>

          {/* Grid checkmark items */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto shrink-0 z-10">
            {[
              'Food & Dining', 'Travel Offers', 'Hotels & Stay', 
              'Shopping Deals', 'Healthcare', 'Premium Services', 
              'Job Opportunities', 'Education Portal', 'Business Options'
            ].map(item => (
              <div key={item} className="flex items-center gap-2 p-3 rounded-xl border text-xs font-bold"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-base)' }}>
                <CheckCircle size={14} className="text-amber-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── MEMBERSHIP PLANS ─────────────────────────────────────── */}
      <section id="pricing" className="px-6 py-16 max-w-6xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="text-center mb-10">
          <p className="section-label mb-1 font-bold tracking-wider">Premium Access</p>
          <h2 className="text-2xl font-bold" style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}>
            Choose Your Membership Card
          </h2>
          <p className="text-sm mt-2" style={{ color:'var(--text-muted)' }}>
            Unlock advanced capabilities, verified profile badges, and direct commerce tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBERSHIPS.map((plan) => (
            <div
              key={plan.name}
              className={`surface-card p-6 flex flex-col justify-between transition-all duration-300 relative ${
                plan.highlight ? 'border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)] scale-[1.03]' : ''
              }`}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = plan.highlight ? 'var(--accent-primary)' : 'var(--border-mid)';
                e.currentTarget.style.boxShadow = plan.highlight ? '0 12px 36px var(--accent-glow)' : '0 8px 24px rgba(37,99,235,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = plan.highlight ? 'var(--accent-primary)' : 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[var(--accent-primary)] text-white z-10">
                  Most Popular
                </span>
              )}

              <div className="flex flex-col gap-6">
                {/* ── ATM CARD VISUAL ── */}
                <div
                  onClick={() => setSelectedPlanForModal(plan)}
                  className="w-full aspect-[1.586/1] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer atm-card-visual"
                  style={{
                    background: plan.atmBg,
                    boxShadow: plan.highlight ? '0 10px 30px rgba(245,158,11,0.2)' : '0 10px 25px rgba(0,0,0,0.3)',
                  }}
                  title="Click to view card benefits"
                >
                  {/* Glass Gloss Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex justify-between items-start z-10">
                    <span className="text-[9px] font-bold tracking-widest text-white/50 font-mono">
                      CONNECT PREPAID
                    </span>
                    <div className="flex flex-col items-end">
                      {/* Wireless icon indicator */}
                      <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h.01M8.5 8.5a5 5 0 0 1 7 0M12 5a10 10 0 0 1 10 10" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Chip and Tech element */}
                  <div className="flex items-center gap-3 z-10">
                    {/* Realistic Gold/Silver Chip */}
                    <div className="w-9 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-amber-500 opacity-90 relative overflow-hidden shadow border border-amber-600/20">
                      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-amber-700/25">
                        <div className="border-r border-b border-amber-700/25" />
                        <div className="border-r border-b border-amber-700/25" />
                        <div className="border-b border-amber-700/25" />
                      </div>
                    </div>
                    {/* Metal Contactless indicator */}
                    <div className="w-6 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                      <div className="w-3 h-2.5 bg-white/20 rounded-sm" />
                    </div>
                  </div>

                  {/* Embossed Card Number */}
                  <div className="z-10 font-mono text-sm tracking-[0.18em] text-white font-extrabold text-shadow-sm select-none">
                    {plan.cardNumber}
                  </div>

                  {/* Footer Row */}
                  <div className="flex justify-between items-end z-10">
                    <div>
                      <p className="text-[7px] text-white/45 tracking-wider uppercase">Cardholder</p>
                      <p className="text-[10px] font-mono font-bold text-white tracking-wide">{plan.cardHolder}</p>
                    </div>
                    <div>
                      <p className="text-[7px] text-white/45 tracking-wider uppercase">Valid Thru</p>
                      <p className="text-[10px] font-mono font-bold text-white tracking-wide">{plan.cardExpiry}</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                      <span className="font-black text-white text-xs select-none">C</span>
                    </div>
                  </div>
                </div>

                {/* ── CARD PLAN INFO ── */}
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold" style={{ color:'var(--text-base)' }}>{plan.price}</span>
                      <span className="text-xs" style={{ color:'var(--text-faint)' }}>{plan.period}</span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedPlanForModal(plan)}
                      className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors text-[var(--accent-primary)] hover:text-[var(--accent-teal)]"
                    >
                      View Benefits
                    </button>
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {plan.suitableFor}
                    </p>
                    <p className="text-[10px] uppercase font-bold tracking-wider mt-1" style={{ color: plan.color }}>
                      Annual Fee: {plan.feeLabel}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setPendingMembership({ name: plan.name, price: plan.price });
                  setRole('login');
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer mt-4 ${
                  plan.highlight 
                    ? 'btn-primary justify-center' 
                    : 'btn-ghost justify-center text-[var(--text-base)] border-[var(--border-mid)] hover:bg-[var(--glass-hover-bg)]'
                }`}
              >
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── REWARD SYSTEM ─────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="text-center mb-10">
          <p className="section-label mb-1 font-bold tracking-wider">Earn & Redeem</p>
          <h2 className="text-2xl font-bold" style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}>
            Connect Reward System
          </h2>
          <p className="text-sm mt-2" style={{ color:'var(--text-muted)' }}>
            Every transaction on the Connect App earns you **Connect Points**. Redeem them for premium benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left panel: Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Food Vouchers', desc: 'Redeem points for dining and restaurant discounts.' },
              { title: 'Travel Discounts', desc: 'Apply points for bus, flight, and cab booking savings.' },
              { title: 'Hotel Bookings', desc: 'Get free stays or room upgrades at premium partner resorts.' },
              { title: 'Product Purchases', desc: 'Unlock Figmas, digital tools, and physical tech items.' },
              { title: 'Service Bookings', desc: 'Cover consulting audits, developers, and agency audits.' },
              { title: 'Renewal Discounts', desc: 'Save on your Silver, Gold, or Diamond annual subscription fee.' }
            ].map((rew, idx) => (
              <div key={rew.title} className="surface-card p-5 border flex flex-col gap-2 transition-all hover:scale-[1.01]"
                style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center">
                  <span className="text-yellow-500 text-xs font-bold font-mono">0{idx+1}</span>
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-wide" style={{ color: 'var(--text-base)' }}>{rew.title}</h4>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{rew.desc}</p>
              </div>
            ))}
          </div>

          {/* Right panel: Visualization */}
          <div className="surface-card p-8 border rounded-2xl flex flex-col justify-between h-full relative overflow-hidden shadow-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(245,168,0,0.08) 0%, rgba(27,42,138,0.08) 100%)',
              borderColor: 'var(--border-mid)'
            }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)' }}
            />

            <div className="space-y-6 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <Gem size={18} className="text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[var(--text-base)]">Connect Points Wallet</h3>
                  <p className="text-[10px] text-[var(--text-faint)]">Redeemable Balance</p>
                </div>
              </div>

              <div className="bg-black/35 rounded-2xl p-5 border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-white/50">Current Balance</span>
                  <span className="text-emerald-400 text-xs font-bold">Active</span>
                </div>
                <div className="text-3xl font-extrabold tracking-tight text-white font-mono flex items-baseline gap-1">
                  12,450 <span className="text-xs font-bold text-white/40">pts</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full w-4/5" />
                </div>
                <p className="text-[10px] text-white/45">80% of points goal earned for free Premium Renewal.</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[var(--text-base)]">How it works:</h4>
                <div className="flex gap-3 items-start text-[11px] text-[var(--text-muted)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]/80 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <p>Book services, buy digital products, or apply to jobs inside the platform.</p>
                </div>
                <div className="flex gap-3 items-start text-[11px] text-[var(--text-muted)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]/80 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <p>Earn reward points automatically instantly added to your dashboard wallet.</p>
                </div>
                <div className="flex gap-3 items-start text-[11px] text-[var(--text-muted)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]/80 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <p>Exchange points at checkout for partner store vouchers or subscription renewals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SHOWCASE ───────────────────────────────────── */}
      <section id="services" className="px-6 py-16 max-w-6xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-1">Platform Services</p>
            <h2 className="text-xl font-bold" style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}>
              Agency & Professional Services
            </h2>
          </div>
          <button className="btn-ghost text-xs" onClick={() => setRole('user')}>
            View all <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.slice(0, 4).map(srv => (
            <div key={srv.id} className="surface-card p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold" style={{ color:'var(--text-base)' }}>{srv.title}</h3>
                  <span className="badge badge-violet mt-1.5">{srv.category}</span>
                </div>
                <span className="font-bold text-base shrink-0" style={{ color:'#8b5cf6' }}>${srv.price}</span>
              </div>
              <p className="text-[12px] leading-relaxed flex-1" style={{ color:'var(--text-muted)' }}>{srv.description}</p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop:'1px solid var(--border-subtle)' }}>
                <span className="text-[11px]" style={{ color:'var(--text-faint)' }}>by {srv.vendorName}</span>
                <button
                  onClick={() => { setRole('user'); pushNotification(`Selected: "${srv.title}". Choose a date to book.`); }}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS SHOWCASE ───────────────────────────────────── */}
      <section id="products" className="px-6 py-16 max-w-6xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label mb-1">Digital Marketplace</p>
            <h2 className="text-xl font-bold" style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}>
              SaaS & Toolkit Marketplace
            </h2>
          </div>
          <button className="btn-ghost text-xs" onClick={() => setRole('user')}>
            Browse all <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(prod => (
            <div key={prod.id} className="surface-card p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold" style={{ color:'var(--text-base)' }}>{prod.title}</h3>
                <span className="font-bold shrink-0" style={{ color:'#c084fc' }}>${prod.price}</span>
              </div>
              <span className="section-label">{prod.category}</span>
              <p className="text-[12px] leading-relaxed flex-1" style={{ color:'var(--text-muted)' }}>{prod.description}</p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop:'1px solid var(--border-subtle)' }}>
                <span className="text-[11px]" style={{ color:'var(--text-faint)' }}>{prod.sales || 0} sales</span>
                <button
                  onClick={() => { setRole('user'); pushNotification('Redirected to marketplace.'); }}
                  className="btn-ghost text-xs"
                  style={{ color:'#c084fc', borderColor:'rgba(192,132,252,0.3)' }}
                >
                  Buy Toolkit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS (POSITIVE REVIEWS) ───────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="text-center mb-10">
          <p className="section-label mb-1">Testimonials</p>
          <h2 className="text-xl font-bold" style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}>
            Client Success & Positive Feedback
          </h2>
          <p className="text-sm mt-2" style={{ color:'var(--text-muted)' }}>
            Read about the positive experiences our partners have had on the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews && reviews.filter(r => r.rating >= 4).map(rev => (
            <div key={rev.id} className="surface-card p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm" style={{ color:'var(--text-base)' }}>{rev.reviewerName}</h4>
                  <p className="text-[10px]" style={{ color:'var(--text-faint)' }}>{rev.date}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-xs italic leading-relaxed" style={{ color:'var(--text-muted)' }}>
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BUSINESS MODEL ────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="text-center mb-10">
          <p className="section-label mb-1 font-bold tracking-wider">Monetization & Flow</p>
          <h2 className="text-2xl font-bold" style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}>
            Ecosystem Business Model
          </h2>
          <p className="text-sm mt-2" style={{ color:'var(--text-muted)' }}>
            Transparent representation of our revenue engines and sustainable marketplace channels.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Membership Fees', desc: 'Sustained pricing plans from individuals and enterprise card users.' },
            { title: 'Partner Commissions', desc: 'Direct transactional cuts on bookings and digital toolkit purchases.' },
            { title: 'Product Sales', desc: 'Earning payouts directly from platform-sold software and template bundles.' },
            { title: 'Service Booking Fees', desc: 'Small flat transactional fees processed on service hiring contracts.' },
            { title: 'Job Posting Fees', desc: 'Recruiters and premium employers paying to post high-visibility active vacancies.' },
            { title: 'Featured Listings', desc: 'Businesses and agency vendors bidding to highlight their listings on visitor page grids.' },
            { title: 'Advertisements', desc: 'Sponsored display ads in selected marketplace categories.' },
            { title: 'Corporate Membership Plans', desc: 'Enterprise packages providing prepaid cards to team workforces at scale.' }
          ].map((src, idx) => (
            <div
              key={src.title}
              className="surface-card p-5 border flex flex-col justify-between transition-all hover:scale-[1.01]"
              style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-elevated)' }}
            >
              <div className="space-y-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                  Revenue 0{idx + 1}
                </span>
                <h4 className="text-xs font-black uppercase tracking-wide pt-1" style={{ color: 'var(--text-base)' }}>{src.title}</h4>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{src.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section id="contact" className="px-6 py-16 max-w-xl mx-auto w-full" style={{ borderTop:'1px solid var(--border-subtle)' }}>
        <div className="text-center mb-8">
          <p className="section-label mb-1">Support</p>
          <h2 className="text-xl font-bold" style={{ fontFamily:'var(--font-display)', color:'var(--text-base)' }}>
            Get in Touch
          </h2>
          <p className="text-sm mt-2" style={{ color:'var(--text-muted)' }}>
            Have a question? We'll get back to you within 24 hours.
          </p>
        </div>
        <ContactForm pushNotification={pushNotification} />
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="mt-auto" style={{ borderTop:'1px solid var(--border-subtle)', background:'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {cms?.featuredNotice && (
            <div className="text-xs px-4 py-2 rounded-lg" style={{ background:'rgba(124,58,237,0.08)', color:'#a78bfa', border:'1px solid rgba(124,58,237,0.18)' }}>
              📢 {cms.featuredNotice}
            </div>
          )}
          <p className="text-xs" style={{ color:'var(--text-faint)' }}>
            © 2026 ConnectApp, Inc. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── MEMBERSHIP POP-UP MODAL ── */}
      {selectedPlanForModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPlanForModal(null)}
        >
          <div 
            className="w-full max-w-lg rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative shadow-2xl border animate-slide-up max-h-[90vh] overflow-hidden"
            style={{ 
              background: 'var(--bg-surface)', 
              borderColor: 'var(--border-mid)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPlanForModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--glass-hover-bg)] text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header & Card Replica */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="section-label tracking-wider font-bold">Membership Details</span>
                <h3 className="text-2xl font-extrabold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-base)' }}>
                  {selectedPlanForModal.name} Plan
                </h3>
              </div>

              {/* Thematic ATM Card Preview inside modal */}
              <div
                className="w-full aspect-[1.586/1] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border self-center animate-pulse-subtle"
                style={{
                  background: selectedPlanForModal.atmBg,
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                <div className="flex justify-between items-start z-10">
                  <span className="text-[9px] font-bold tracking-widest text-white/50 font-mono">
                    CONNECT PREPAID
                  </span>
                  <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h.01M8.5 8.5a5 5 0 0 1 7 0M12 5a10 10 0 0 1 10 10" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex items-center gap-3 z-10">
                  <div className="w-9 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-amber-500 opacity-90 relative overflow-hidden shadow border border-amber-600/20">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-amber-700/25">
                      <div className="border-r border-b border-amber-700/25" />
                      <div className="border-r border-b border-amber-700/25" />
                      <div className="border-b border-amber-700/25" />
                    </div>
                  </div>
                  <div className="w-6 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                    <div className="w-3 h-2.5 bg-white/20 rounded-sm" />
                  </div>
                </div>
                <div className="z-10 font-mono text-sm tracking-[0.18em] text-white font-extrabold text-shadow-sm select-none">
                  {selectedPlanForModal.cardNumber}
                </div>
                <div className="flex justify-between items-end z-10">
                  <div>
                    <p className="text-[7px] text-white/45 tracking-wider uppercase">Cardholder</p>
                    <p className="text-[10px] font-mono font-bold text-white tracking-wide">{selectedPlanForModal.cardHolder}</p>
                  </div>
                  <div>
                    <p className="text-[7px] text-white/45 tracking-wider uppercase">Valid Thru</p>
                    <p className="text-[10px] font-mono font-bold text-white tracking-wide">{selectedPlanForModal.cardExpiry}</p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <span className="font-black text-white text-xs select-none">C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Features - Scrollable */}
            <div className="space-y-4 overflow-y-auto pr-2 flex-1 modal-scroll">
              <div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {selectedPlanForModal.desc}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium animate-pulse-subtle" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                    {selectedPlanForModal.suitableFor}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: `${selectedPlanForModal.color}15`, color: selectedPlanForModal.color }}>
                    Annual Fee: {selectedPlanForModal.feeLabel}
                  </span>
                </div>
              </div>
              <div className="w-full h-px" style={{ background: 'var(--border-subtle)' }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-faint)' }}>
                  Included Benefits:
                </p>
                <ul className="space-y-2.5">
                  {selectedPlanForModal.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: selectedPlanForModal.color }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="flex items-center justify-between gap-4 mt-2 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>Price</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-extrabold" style={{ color: 'var(--text-base)' }}>{selectedPlanForModal.price}</span>
                  <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{selectedPlanForModal.period}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setPendingMembership({ name: selectedPlanForModal.name, price: selectedPlanForModal.price });
                  setRole('login');
                  setSelectedPlanForModal(null);
                }}
                className="btn-primary py-3 px-6 rounded-xl text-xs font-bold transition-all cursor-pointer"
                style={{
                  background: selectedPlanForModal.highlight ? 'var(--accent-primary)' : 'rgba(124, 58, 237, 0.15)',
                  color: selectedPlanForModal.highlight ? '#fff' : '#a78bfa',
                  border: selectedPlanForModal.highlight ? 'none' : '1px solid rgba(124, 58, 237, 0.3)',
                }}
              >
                {selectedPlanForModal.btnText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════════ */
function ContactForm({ pushNotification }) {
  const [form, setForm] = useState({ name:'', email:'', msg:'' });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;
    pushNotification(`Inquiry from ${form.name} (${form.email})`);
    setSent(true);
    setForm({ name:'', email:'', msg:'' });
    setTimeout(() => setSent(false), 5000);
  };

  if (sent) return (
    <div className="surface-card p-10 text-center space-y-3 animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
        <CheckCircle size={22} className="text-emerald-400" />
      </div>
      <h4 className="font-semibold text-sm" style={{ color:'var(--text-base)' }}>Message received!</h4>
      <p className="text-xs" style={{ color:'var(--text-muted)' }}>A Connect manager will respond shortly.</p>
    </div>
  );

  return (
    <div className="surface-card p-6">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="section-label">Name</label>
            <input className="input-field" type="text" value={form.name} onChange={set('name')} placeholder="Alex Mercer" required />
          </div>
          <div className="space-y-1.5">
            <label className="section-label">Email</label>
            <input className="input-field" type="email" value={form.email} onChange={set('email')} placeholder="alex@gmail.com" required />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="section-label">Message</label>
          <textarea className="input-field resize-none" rows="4" value={form.msg} onChange={set('msg')} placeholder="How can we help?" required />
        </div>
        <button type="submit" className="btn-primary w-full justify-center py-2.5">
          Send Message
        </button>
      </form>
    </div>
  );
}
