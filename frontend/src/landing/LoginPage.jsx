import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { setRole, setCurrentUser, users, pushNotification, pendingMembership, setPendingMembership, requestMembership, setActiveTab } = useApp();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const demoUsers = [
    { name: "Sarah Jenkins", email: "sarah.admin@connect.com", role: "admin", roleLabel: "Admin", badgeCls: "badge-rose" },
    { name: "Apex Creative Services", email: "contact@apexcreative.co", role: "vendor", roleLabel: "Vendor", badgeCls: "badge-teal" },
    { name: "Innovate Tech Corp", email: "recruiting@innovatetech.com", role: "employer", roleLabel: "Employer", badgeCls: "badge-blue" },
    { name: "Alex Mercer", email: "alex.mercer@gmail.com", role: "user", roleLabel: "Candidate", badgeCls: "badge-emerald" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email address.'); return; }

    setLoading(true);
    setTimeout(() => {
      const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!matched) {
        setError('No account found. Try one of the quick logins below.');
        setLoading(false);
        return;
      }
      setCurrentUser(matched);
      setRole(matched.role);
      if (matched.role === 'user' && pendingMembership) {
        requestMembership(pendingMembership.name, pendingMembership.price, "Initial Payment");
        setActiveTab('membership');
        setPendingMembership(null);
      } else {
        setPendingMembership(null);
      }
      pushNotification(`Welcome back, ${matched.name}!`);
      setLoading(false);
    }, 500);
  };

  const handleQuickLogin = (emailVal) => {
    setError('');
    setLoading(true);
    setEmail(emailVal);
    setPassword('••••••••');
    setTimeout(() => {
      const matched = users.find(u => u.email.toLowerCase() === emailVal.toLowerCase());
      if (!matched) {
        setError('Demo account not found.');
        setLoading(false);
        return;
      }
      setCurrentUser(matched);
      setRole(matched.role);
      if (matched.role === 'user' && pendingMembership) {
        requestMembership(pendingMembership.name, pendingMembership.price, "Initial Payment");
        setActiveTab('membership');
        setPendingMembership(null);
      } else {
        setPendingMembership(null);
      }
      pushNotification(`Welcome back, ${matched.name}!`);
      setLoading(false);
    }, 500);
  };

  return (
    <div
      className="w-full min-h-[calc(100vh-62px)] flex items-center justify-center px-4 py-12 animate-fade-in"
      style={{ background: 'var(--bg-page)' }}
    >
      {/* ── Card ── */}
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.30), 0 4px 16px rgba(0,0,0,0.15)',
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-teal)]" />

        <div className="px-8 py-9">
          {/* Back link */}
          <button
            onClick={() => { setRole('visitor'); setPendingMembership(null); }}
            className="inline-flex items-center gap-1.5 text-xs font-medium mb-7 transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-base)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ArrowLeft size={13} />
            Back to Home
          </button>

          {/* Logo + title */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-teal)] flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="font-black text-white text-base">C</span>
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-base)', fontFamily: 'var(--font-display)' }}>
                Connect<span style={{ color: 'var(--accent-primary)' }}>App</span>
              </span>
            </div>
            <h1 className="text-[28px] font-bold leading-tight" style={{ color: 'var(--text-base)', fontFamily: 'var(--font-display)' }}>
              Welcome back
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>Sign in to your dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 border text-xs font-medium rounded-xl px-4 py-3"
                 style={{ background: 'var(--color-danger-light)', borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}>
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <Mail size={12} style={{ color: 'var(--text-muted)' }} /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: 'var(--bg-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-base)',
                  fontFamily: 'var(--font-sans)',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                <Lock size={12} style={{ color: 'var(--text-muted)' }} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border px-4 py-3 pr-11 text-sm outline-none transition-all"
                  style={{
                    background: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-base)',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-light)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors text-[var(--text-muted)] hover:text-[var(--text-base)]"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: loading ? 'var(--text-faint)' : 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-teal) 100%)',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 20px var(--accent-glow)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.04em',
              }}
            >
              {loading ? 'Signing in…' : 'SIGN IN'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-subtle)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-3 text-[10px] tracking-widest font-bold bg-[var(--bg-surface)] text-[var(--text-faint)]">
                Or Quick Login
              </span>
            </div>
          </div>

          {/* Quick login grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {demoUsers.map((demo) => (
              <button
                key={demo.role}
                type="button"
                onClick={() => handleQuickLogin(demo.email)}
                className="flex flex-col items-start p-3 rounded-xl border text-left transition-all hover:bg-[var(--bg-elevated)] group cursor-pointer"
                style={{
                  borderColor: 'var(--border-subtle)',
                  background: 'var(--bg-surface)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = '0 4px 12px var(--accent-light)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`badge ${demo.badgeCls} text-[9px] tracking-wide`}>{demo.roleLabel}</span>
                  <span className="text-xs text-[var(--text-faint)] group-hover:text-[var(--accent-primary)] transition-colors">➔</span>
                </div>
                <div className="text-xs font-bold text-[var(--text-base)] truncate w-full">{demo.name}</div>
                <div className="text-[10px] text-[var(--text-muted)] truncate w-full">{demo.email}</div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
