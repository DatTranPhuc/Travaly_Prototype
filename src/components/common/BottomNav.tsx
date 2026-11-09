import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Hotel, Sparkles, X } from 'lucide-react';
import { ModalSheet } from './ModalSheet';
import { NavTab } from '../../types/travel';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="absolute bottom-4 left-0 right-0 w-full flex justify-center z-40 pointer-events-none px-3">
        <nav
          aria-label="Thanh điều hướng"
          className="pointer-events-auto w-[276px] h-[64px] bg-white/98 backdrop-blur-2xl rounded-full shadow-xl shadow-black/8 px-2.5 flex justify-between items-center transition-all duration-300"
        >
          {/* 1. Trang chủ */}
          {activeTab === 'home' ? (
            <button
              type="button"
              className="h-11 flex items-center space-x-1.5 px-3.5 rounded-full bg-[#0F2C59] text-white shadow-xs shrink-0 active:scale-95 transition-all"
              aria-label="Trang chủ"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-[12px] font-bold tracking-tight">Trang chủ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFA62B] shrink-0 shadow-2xs" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onTabChange('home')}
              className="w-10 h-10 flex items-center justify-center text-[#657580] hover:text-[#0F2C59] transition-colors rounded-full active:scale-90"
              aria-label="Trang chủ"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </button>
          )}

          {/* 2. Tạo chuyến */}
          {activeTab === 'create-trip' || showCreateSheet ? (
            <button
              type="button"
              onClick={() => setShowCreateSheet(!showCreateSheet)}
              className="h-11 flex items-center space-x-1.5 px-3.5 rounded-full bg-[#0F2C59] text-white shadow-xs shrink-0 active:scale-95 transition-all cursor-pointer"
              aria-label="Tạo chuyến"
            >
              <svg className={`w-4 h-4 transition-transform duration-200 ${showCreateSheet ? 'rotate-45' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              <span className="text-[12px] font-bold tracking-tight">Tạo chuyến</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFA62B] shrink-0 shadow-2xs" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowCreateSheet(true)}
              className="w-10 h-10 flex items-center justify-center text-[#657580] hover:text-[#0F2C59] transition-colors rounded-full active:scale-90 cursor-pointer"
              aria-label="Tạo chuyến"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>
          )}

          {/* 3. Khám phá */}
          {activeTab === 'explore' ? (
          <button
            type="button"
            className="h-11 flex items-center space-x-1.5 px-3.5 rounded-full bg-[#0F2C59] text-white shadow-xs shrink-0 active:scale-95 transition-all"
            aria-label="Khám phá"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span className="text-[12px] font-bold tracking-tight">Khám phá</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA62B] shrink-0 shadow-2xs" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onTabChange('explore')}
            className="w-10 h-10 flex items-center justify-center text-[#657580] hover:text-[#0F2C59] transition-colors rounded-full active:scale-90"
            aria-label="Khám phá"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </button>
        )}

        {/* 4. Chuyến đi */}
        {activeTab === 'trips' ? (
          <button
            type="button"
            className="h-11 flex items-center space-x-1.5 px-3.5 rounded-full bg-[#0F2C59] text-white shadow-xs shrink-0 active:scale-95 transition-all"
            aria-label="Chuyến đi"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span className="text-[12px] font-bold tracking-tight">Chuyến đi</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA62B] shrink-0 shadow-2xs" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onTabChange('trips')}
            className="w-10 h-10 flex items-center justify-center text-[#657580] hover:text-[#0F2C59] transition-colors rounded-full active:scale-90"
            aria-label="Chuyến đi"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </button>
        )}

        {/* 5. Tài khoản */}
        {activeTab === 'profile' ? (
          <button
            type="button"
            className="h-11 flex items-center space-x-1.5 px-3.5 rounded-full bg-[#0F2C59] text-white shadow-xs shrink-0 active:scale-95 transition-all"
            aria-label="Tài khoản"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[12px] font-bold tracking-tight">Tài khoản</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA62B] shrink-0 shadow-2xs" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onTabChange('profile')}
            className="w-10 h-10 flex items-center justify-center text-[#657580] hover:text-[#0F2C59] transition-colors rounded-full active:scale-90"
            aria-label="Tài khoản"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        )}
      </nav>
    </div>

    {/* Create Trip Action Sheet */}
    <ModalSheet
      isOpen={showCreateSheet}
      onClose={() => setShowCreateSheet(false)}
      title="Tạo mới với TravAIy"
      type="bottom-sheet"
    >
      <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-left font-sans select-none">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#0F2C59] font-heading leading-tight">
                Tạo mới với TravAIy
              </h2>
              <p className="text-[11px] text-slate-500">
                Lên kế hoạch du lịch TP.HCM & Vũng Tàu
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Đóng"
            onClick={() => setShowCreateSheet(false)}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Option 1: AI Planner */}
        <button
          type="button"
          onClick={() => {
            setShowCreateSheet(false);
            onTabChange('create-trip');
          }}
          style={{ backgroundColor: '#0F2C59' }}
          className="w-full text-left p-3.5 rounded-2xl bg-[#0F2C59] text-white shadow-md hover:bg-[#1E4D8C] transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles size={20} className="text-[#FFA62B]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[13px] sm:text-[14px] text-white font-heading">Lập lịch trình bằng AI</span>
                <span className="text-[9px] font-extrabold uppercase bg-[#FFA62B] text-[#0F2C59] px-1.5 py-0.5 rounded-md shadow-2xs">
                  Gợi ý
                </span>
              </div>
              <p className="text-[11px] text-blue-100/90 mt-0.5 line-clamp-2">
                Lumi tự động tối ưu lộ trình, gợi ý khách sạn, quán ăn & điểm check-in phù hợp nhất
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </button>

        {/* Option 2: Manual Plan */}
        <button
          type="button"
          onClick={() => {
            setShowCreateSheet(false);
            navigate('/trip/manual/new');
          }}
          className="w-full text-left p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:bg-slate-50/80 transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <Calendar size={20} />
            </div>
            <div>
              <span className="font-bold text-[13px] text-slate-800 font-heading">Lên lịch trình thủ công</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tự do chọn các điểm đến, tự xếp ngày và quản lý thời gian theo ý bạn
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </button>

        {/* Option 3: Find Stays */}
        <button
          type="button"
          onClick={() => {
            setShowCreateSheet(false);
            navigate('/explore/stays');
          }}
          className="w-full text-left p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs hover:bg-slate-50/80 transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <Hotel size={20} />
            </div>
            <div>
              <span className="font-bold text-[13px] text-slate-800 font-heading">Tìm chỗ ở & khách sạn</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tham khảo resort, homestay, khách sạn đẹp tại TP.HCM và Vũng Tàu
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </button>
      </div>
    </ModalSheet>
  </>
  );
};
