import React, { useState } from 'react';
import { TravelHeader } from '../../features/travel/UI';
import { useTravel, useStored } from '../../features/travel/TravelContext';
import { MOCK_PACKING_ITEMS } from '../../data/mockData';
import type { PackingItem } from '../../types/travel';
import './trip-preparation.css';
import { BottomNav } from '../common/BottomNav';
import { NavTab } from '../../types/travel';
import { TripWorkspaceNav } from '../../features/travel/TripWorkspaceNav';

interface TripPreparationScreenProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenPackingList: () => void;
  onBack: () => void;
}

export const TripPreparationScreen: React.FC<TripPreparationScreenProps> = ({
  onNavigateTab,
  onOpenPackingList,
  onBack,
}) => {
  const {plan}=useTravel();
  const [packing]=useStored<Record<string,PackingItem[]>>('travaiy-packing-v1',{});
  const packed=packing[plan.id]||MOCK_PACKING_ITEMS;
  const packedCount=packed.filter(i=>i.isChecked).length;
  const packedPercent=packed.length?Math.round(packedCount/packed.length*100):0;
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'CCCD / Hộ chiếu bản gốc', checked: true, cat: 'Giấy tờ' },
    { id: 'c2', label: 'Vé máy bay khứ hồi (Check-in online trước 24h)', checked: true, cat: 'Vé & Đặt chỗ' },
    { id: 'c3', label: 'Xác nhận đặt phòng khách sạn ven biển', checked: true, cat: 'Vé & Đặt chỗ' },
    { id: 'c4', label: 'Tiền mặt lẻ 20k - 50k ăn vặt & tip', checked: false, cat: 'Tài chính' },
    { id: 'c5', label: 'Bảo hiểm du lịch nội địa', checked: false, cat: 'Bảo hiểm' },
    { id: 'c6', label: 'Thuốc say xe / say sóng khi đi cano Cù Lao Chàm', checked: true, cat: 'Y tế' },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = checklist.filter((i) => i.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  return (
    <div className="travel-screen preparation-screen">
      <TravelHeader title="Chuẩn bị chuyến đi" subtitle={`${plan.destination} · ${plan.dates}`} onBack={onBack}/>

      <TripWorkspaceNav />

      {/* Main Content */}
      <main className="travel-scroll preparation-content">
        {/* Weather Forecast Card */}
        <div className="preparation-weather">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-100 font-heading">
              Thời tiết · {plan.destination}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
              Minh hoạ
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/20">
            <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] block opacity-80">Ngày 1</span>
              <span className="text-2xl my-1 block">☀️</span>
              <span className="font-bold text-[14px] font-heading block">31°C</span>
              <span className="text-[10px] opacity-75">Nắng nhẹ</span>
            </div>

            <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] block opacity-80">Ngày 2</span>
              <span className="text-2xl my-1 block">🌤️</span>
              <span className="font-bold text-[14px] font-heading block">29°C</span>
              <span className="text-[10px] opacity-75">Mây rải rác</span>
            </div>

            <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-xs">
              <span className="text-[11px] block opacity-80">Ngày 3</span>
              <span className="text-2xl my-1 block">⛅</span>
              <span className="font-bold text-[14px] font-heading block">30°C</span>
              <span className="text-[10px] opacity-75">Nắng ấm</span>
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] text-blue-100 flex items-center gap-1.5">
            <span>💡</span>
            <span>Nắng nhiều ban ngày, nên chuẩn bị kem chống nắng SPF50+ và mũ nón!</span>
          </div>
        </div>

        {/* Smart Packing List Banner */}
        <button
          type="button"
          onClick={onOpenPackingList}
          className="preparation-packing group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                🎒
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-slate-900 font-heading group-hover:text-[#0A1680] transition-colors">
                  Danh sách hành lý thông minh
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  Đã chuẩn bị {packedCount} / {packed.length} món ({packedPercent}%)
                </span>
              </div>
            </div>
            <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0A1680] transition-colors">
              →
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-3">
            <div className="h-full bg-emerald-500 rounded-full" style={{width:`${packedPercent}%`}} />
          </div>
        </button>

        {/* Pre-Trip Checklist Section */}
        <div className="preparation-checklist">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[15px] text-slate-900 font-heading">
              Thủ tục cần chuẩn bị trước
            </h3>
            <span className="text-[11px] font-bold text-[#0A1680]">
              {checkedCount}/{checklist.length} xong
            </span>
          </div>

          <div className="space-y-2">
            {checklist.map((item) => (
              <div
                key={item.id}
                role="checkbox" aria-checked={item.checked} tabIndex={0}
                onKeyDown={e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();toggleCheck(item.id);}}}
                onClick={() => toggleCheck(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  item.checked
                    ? 'bg-slate-50/70 border-slate-200/80 text-slate-500'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-[#0A1680]/30'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs transition-colors shrink-0 ${
                    item.checked
                      ? 'bg-[#0F2C59] text-white font-bold shadow-xs'
                      : 'bg-white hover:border-slate-400'
                  }`}
                  style={{
                    border: item.checked ? '2px solid #0F2C59' : '2px solid #94A3B8',
                    backgroundColor: item.checked ? '#0F2C59' : '#FFFFFF',
                    color: '#FFFFFF',
                  }}
                >
                  {item.checked && '✓'}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`preparation-item-label ${
                      item.checked ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {item.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Emergency & Assistance Info */}
        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <h3 className="font-bold text-[13px] text-slate-800 font-heading">
            Thông tin khẩn cấp & Hotline hỗ trợ
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Trung tâm hỗ trợ du khách TP.HCM:</span>
              <strong className="text-[#0A1680] font-mono font-bold">0236 3550 111</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Công an thành phố:</span>
              <strong className="text-slate-800 font-mono font-bold">113</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Cấp cứu y tế:</span>
              <strong className="text-slate-800 font-mono font-bold">115</strong>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold shadow-lg animate-in fade-in zoom-in duration-200">
          {toastMessage}
        </div>
      )}

      {/* Floating Capsule Dock */}
      <BottomNav activeTab="trips" onTabChange={onNavigateTab} />
    </div>
  );
};
