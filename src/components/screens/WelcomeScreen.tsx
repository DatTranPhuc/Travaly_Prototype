import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { IOSStatusBar } from '../common/IOSStatusBar';

interface WelcomeScreenProps {
  onStart: () => void;
  onLoginSuccess: (userName?: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLoginSuccess }) => {
  const recoveryNavigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState<'none' | 'login' | 'signup' | 'forgot'>('none');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Lumi greetings
  const LUMI_GREETINGS = [
    'Chào bạn! Hôm nay mình đi đâu ta? 🌟',
    'Mình đã sẵn sàng lên lịch cho bạn! ⚡',
    'Khám phá các điểm check-in cực xịn! 📸',
    'Cùng tạo một chuyến đi đáng nhớ nhé! 🎒'
  ];
  const [greetingIndex, setGreetingIndex] = useState(0);
  const cycleGreeting = () => {
    setGreetingIndex((prev) => (prev + 1) % LUMI_GREETINGS.length);
  };

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
    setActiveSheet('none');
    setTimeout(() => {
      onLoginSuccess(loginEmail.split('@')[0] || 'Hoàng Nam');
    }, 600);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }
    showToast('Tạo tài khoản thành công!');
    setActiveSheet('none');
    setTimeout(() => {
      onLoginSuccess(signupName || 'Thành viên mới');
    }, 600);
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`Đăng nhập ${provider} thành công!`);
    setActiveSheet('none');
    setTimeout(() => {
      onLoginSuccess(provider === 'Google' ? 'Minh Anh' : 'Quốc Bảo');
    }, 600);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-[#FFFFFF] via-[#F4F8FD] to-[#E8F1FC] text-slate-800">
      {/* Ambient background glow & atmospheric travel shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Sun Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[380px] h-[340px] rounded-full bg-radial from-[#FFA62B]/18 via-[#86C5FF]/15 to-transparent blur-3xl" />
        
        {/* Center Mascot Aura */}
        <div className="absolute top-[34%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-radial from-[#86C5FF]/25 via-[#FFA62B]/12 to-transparent blur-2xl" />
        
        {/* Bottom Ambient Glow */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[440px] h-[260px] rounded-full bg-radial from-[#86C5FF]/20 to-transparent blur-3xl" />

        {/* Delicate Flight Path Arch with Dotted Line */}
        <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 390 844" fill="none">
          <path
            d="M -20 220 Q 90 140 200 230 T 410 260"
            stroke="#93B2F8"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M 20 420 Q 180 340 370 410"
            stroke="#FFA62B"
            strokeWidth="1.2"
            strokeDasharray="3 5"
            opacity="0.5"
          />
        </svg>

        {/* Subtle decorative travel sparkles */}
        <div className="absolute top-20 left-7 text-[#FFA62B]/40 text-base animate-pulse">✦</div>
        <div className="absolute top-28 right-8 text-[#86C5FF]/50 text-sm">✦</div>
        <div className="absolute top-[48%] left-8 text-[#FFA62B]/30 text-xs">★</div>
        <div className="absolute top-[45%] right-7 text-[#86C5FF]/40 text-xs">★</div>
      </div>

      {/* iOS Status Bar */}
      <div className="relative z-20 shrink-0">
        <IOSStatusBar light={false} />
      </div>

      {/* Brand Header */}
      <header className="relative z-20 flex items-center justify-between pt-1 px-6 shrink-0">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/90 shadow-xs">
          <img src="/images/logo-full.png" alt="TravAly" className="h-[24px] w-auto object-contain" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-700 tracking-wide font-heading">AI v2.0 Ready</span>
        </div>
      </header>

      {/* Hero Mascot Center Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center my-auto min-h-0">
        {/* Center Mascot Container */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Interactive Speech Bubble */}
          <button
            type="button"
            onClick={cycleGreeting}
            className="mb-2 relative z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#FFA62B]/40 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <span className="text-[12px] font-bold text-[#0F2C59] tracking-tight font-heading">
              {LUMI_GREETINGS[greetingIndex]}
            </span>
            <span className="text-[10px] text-[#FFA62B] group-hover:rotate-12 transition-transform">✨</span>
            {/* Bubble Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#FFA62B]/40 rotate-45" />
          </button>

          {/* Floating Feature Pill Left: ⚡ Lên lịch trong 30s */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 hidden xs:flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-white/80 shadow-md">
            <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-[10px] font-bold">⚡</span>
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#0F2C59] block leading-none font-heading">AI 30 Giây</span>
              <span className="text-[8.5px] text-slate-400">Tối ưu lộ trình</span>
            </div>
          </div>

          {/* Floating Feature Pill Right: 📍 100+ Điểm đến */}
          <div className="absolute -right-6 top-1/3 z-20 hidden xs:flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-white/80 shadow-md">
            <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">📍</span>
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#0F2C59] block leading-none font-heading">Chuẩn Gu</span>
              <span className="text-[8.5px] text-slate-400">Ăn uống &amp; check-in</span>
            </div>
          </div>

          {/* Mascot Figure with Halo & Floor Shadow */}
          <div
            onClick={cycleGreeting}
            className="relative flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
            title="Chạm vào Bé Sao Lumi để chào hỏi!"
          >
            {/* Halo backlight */}
            <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-[#FFA62B]/25 via-[#86C5FF]/30 to-transparent blur-2xl pointer-events-none" />
            
            {/* The Mascot */}
            <img
              src="/images/mascot-hero.png"
              alt="Bé Sao Lumi - Bạn đồng hành TravAly"
              className="relative w-48 h-48 sm:w-52 sm:h-52 max-h-[205px] object-contain drop-shadow-2xl animate-mascot-float"
            />

            {/* Soft Floor Shadow */}
            <div className="w-32 h-3.5 rounded-full bg-[#0F2C59]/10 blur-sm -mt-2 pointer-events-none" />
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mt-4 space-y-1.5 max-w-[330px]">
          <div className="inline-block">
            <span className="text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#0A1680] bg-blue-50/90 px-3 py-1 rounded-full border border-blue-100/60 shadow-2xs font-heading">
              Đồng hành du lịch thông minh
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[28px] leading-[1.2] font-black text-[#0F2C59] tracking-tight font-heading pt-1">
            Lên lịch cho chuyến đi của bạn
          </h1>
          <p className="text-[13px] text-slate-500 leading-relaxed font-normal max-w-[280px] mx-auto">
            Chọn điểm đến, sắp xếp lịch trình tối ưu và rủ bạn bè cùng vi vu.
          </p>
        </div>
      </main>

      {/* Bottom Action Footer */}
      <footer className="relative z-20 px-6 pb-6 pt-2 shrink-0 flex flex-col items-center text-center">
        <div className="w-full space-y-3 max-w-[340px]">
          {/* Primary Action Button - Flagship Luxury Pill */}
          <button
            onClick={onStart}
            type="button"
            className="group relative w-full h-[52px] bg-[#0F2C59] hover:bg-[#091C3A] active:scale-[0.98] transition-all text-white font-bold text-[15.5px] rounded-full shadow-xl shadow-[#0F2C59]/30 flex items-center justify-between px-5 font-heading tracking-wide cursor-pointer overflow-hidden border border-white/15"
          >
            {/* Shimmer light pass */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            
            <span className="pl-2">Bắt đầu lên lịch trình</span>
            
            {/* Action Indicator Icon */}
            <div className="w-8 h-8 rounded-full bg-[#FFA62B] text-[#0F2C59] flex items-center justify-center group-hover:translate-x-0.5 transition-transform shadow-xs">
              <svg className="w-4 h-4 stroke-current fill-none stroke-[2.8]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>

          {/* Secondary Auth Links */}
          <div className="flex items-center justify-center space-x-1.5 text-[13px] pt-1 text-slate-600 font-medium">
            <span>Đã có tài khoản?</span>
            <button
              type="button"
              onClick={() => setActiveSheet('login')}
              className="text-[#0F2C59] font-bold hover:underline ml-1 inline-flex items-center gap-0.5 focus:outline-none cursor-pointer"
            >
              <span>Đăng nhập</span>
              <svg className="w-3.5 h-3.5 text-[#FFA62B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-slate-300 mx-1">•</span>
            <button
              type="button"
              onClick={() => setActiveSheet('signup')}
              className="text-[#0F2C59] font-semibold hover:underline focus:outline-none cursor-pointer"
            >
              <span>Đăng ký</span>
            </button>
          </div>
        </div>

        {/* iOS Home Bar Indicator */}
        <div className="w-full flex justify-center pt-5 pb-1">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </footer>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0A1680] text-white px-4 py-2 rounded-full shadow-xl text-[13px] font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <svg className="w-4 h-4 text-[#FBEDB0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LOGIN SHEET MODAL */}
      {activeSheet === 'login' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-[#0A1680]/30 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveSheet('none')}
          />
          <div className="relative bg-white p-6 shadow-2xl z-10 w-full max-h-[90%] overflow-y-auto rounded-t-[32px] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Handle & Close */}
            <div className="flex items-center justify-between pb-3">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
              <button
                type="button"
                aria-label="Đóng"
                onClick={() => setActiveSheet('none')}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mb-5 text-left flex items-start justify-between">
              <div>
                <h3 className="text-[22px] font-bold text-[#0A1680] font-heading tracking-tight leading-tight">
                  Chào mừng trở lại!
                </h3>
                <p className="text-[13px] text-slate-500 mt-1">
                  Đăng nhập để tiếp tục hành trình cùng TravAly
                </p>
              </div>
              <img src="/images/mascot-waving.png" alt="TravAly Mascot" className="w-9 h-9 object-contain shrink-0 ml-2" />
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-1">
                  Email hoặc Số điện thoại
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="example@travaiy.com"
                    className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#0A1680] focus:bg-white transition-colors"
                  />
                  <svg className="w-5 h-5 absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[13px] font-medium text-slate-700">Mật khẩu</label>
                  <button
                    type="button"
                    onClick={() => recoveryNavigate('/auth/recovery')}
                    className="text-[12px] font-semibold text-[#0A1680] hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full h-[48px] pl-4 pr-11 rounded-[16px] bg-slate-50 border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#0A1680] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-10 h-10 absolute right-1 top-1 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-[48px] bg-[#0A1680] hover:bg-[#071060] active:scale-[0.98] transition-all text-white font-bold text-[15px] rounded-full shadow-md flex items-center justify-center space-x-2 mt-4 font-heading"
              >
                <span>Đăng nhập</span>
                <svg className="w-4 h-4 ml-1 stroke-white fill-none stroke-[2]" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-[12px] text-slate-400 font-medium">
                Hoặc tiếp tục với
              </span>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="h-[44px] flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 rounded-[14px] text-[13px] font-semibold text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="h-[44px] flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 rounded-[14px] text-[13px] font-semibold text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.77-7.98-12.22-14.69-6.3-9.56-11.27-20.91-14.91-34.05-3.64-13.14-5.46-25.26-5.46-36.36 0-14.16 3.73-26.06 11.2-35.68 7.47-9.63 16.9-14.52 28.28-14.69 4.8 0 10.15 1.25 16.05 3.76 5.9 2.5 9.77 3.84 11.61 4.02 2.34-.35 6.46-1.77 12.38-4.27 5.91-2.5 11.25-3.65 16.02-3.45 12.87.67 22.95 5.56 30.23 14.69-11.23 6.81-16.71 16.35-16.45 28.61.26 10.05 4.19 18.52 11.78 25.43 7.6 6.91 16.89 10.83 27.87 11.76-2.22 6.64-4.8 13.06-7.75 19.26z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            <div className="mt-4 pt-2 text-center text-[13px] text-slate-600">
              <span>Chưa có tài khoản? </span>
              <button
                type="button"
                onClick={() => setActiveSheet('signup')}
                className="font-bold text-[#0A1680] hover:underline"
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIGNUP SHEET MODAL */}
      {activeSheet === 'signup' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-[#0A1680]/30 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveSheet('none')}
          />
          <div className="relative bg-white p-6 shadow-2xl z-10 w-full max-h-[92%] overflow-y-auto rounded-t-[32px] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Handle & Close */}
            <div className="flex items-center justify-between pb-3">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />
              <button
                type="button"
                aria-label="Đóng"
                onClick={() => setActiveSheet('none')}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mb-4 text-left flex items-start justify-between">
              <div>
                <h3 className="text-[22px] font-bold text-[#0A1680] font-heading tracking-tight leading-tight">
                  Tạo tài khoản mới
                </h3>
                <p className="text-[13px] text-slate-500 mt-1">
                  Cùng bé Sao Lumi kiến tạo những chuyến du lịch đáng nhớ
                </p>
              </div>
              <img src="/images/mascot-laptop-happy.png" alt="TravAly Mascot" className="w-9 h-9 object-contain shrink-0 ml-2" />
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#0A1680] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-1">
                  Email hoặc Số điện thoại
                </label>
                <input
                  type="text"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="traveller@travaiy.com"
                  className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#0A1680] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-1">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full h-[48px] pl-4 pr-11 rounded-[16px] bg-slate-50 border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#0A1680] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="w-10 h-10 absolute right-1 top-1 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showSignupPassword ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1.5">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0A1680] focus:ring-[#0A1680] cursor-pointer"
                />
                <label htmlFor="terms-checkbox" className="text-[12px] leading-[17px] text-slate-600 cursor-pointer">
                  Tôi đồng ý với{' '}
                  <span className="text-[#0A1680] font-semibold underline">
                    Điều khoản du lịch an toàn
                  </span>{' '}
                  và chính sách bảo mật dữ liệu của TravAIy.
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-[48px] bg-[#0A1680] hover:bg-[#071060] active:scale-[0.98] transition-all text-white font-bold text-[15px] rounded-full shadow-md flex items-center justify-center space-x-2 mt-4 font-heading"
              >
                <span>Đăng ký tài khoản</span>
                <svg className="w-4 h-4 ml-1 stroke-white fill-none stroke-[2]" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            </form>

            <div className="mt-4 pt-2 text-center text-[13px] text-slate-600">
              <span>Đã có tài khoản? </span>
              <button
                type="button"
                onClick={() => setActiveSheet('login')}
                className="font-bold text-[#0A1680] hover:underline"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD SHEET */}
      {activeSheet === 'forgot' && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-[#0A1680]/30 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveSheet('none')}
          />
          <div className="relative bg-white p-6 shadow-2xl z-10 w-full rounded-t-[32px] flex flex-col animate-in slide-in-from-bottom duration-300 text-left">
            <button
              type="button"
              onClick={() => setActiveSheet('login')}
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0A1680] mb-2 focus:outline-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Quay lại đăng nhập
            </button>
            <h3 className="text-[22px] font-bold text-[#0A1680] font-heading tracking-tight leading-tight">
              Khôi phục mật khẩu
            </h3>
            <p className="text-[13px] text-slate-500 mt-1 mb-4">
              Nhập email hoặc số điện thoại đã đăng ký để nhận mã OTP xác thực.
            </p>
            <input
              type="text"
              placeholder="example@travaiy.com"
              className="w-full h-[48px] px-4 rounded-[16px] bg-slate-50 border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:border-[#0A1680] mb-4"
            />
            <button
              type="button"
              onClick={() => {
                showToast('Mã OTP đã được gửi đến email/SĐT của bạn!');
                setActiveSheet('login');
              }}
              className="w-full h-[48px] bg-[#0A1680] text-white font-bold text-[15px] rounded-full shadow-md font-heading"
            >
              Gửi mã khôi phục
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
