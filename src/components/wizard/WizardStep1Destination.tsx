import './destination-search.css';
import React, { useState } from 'react';
import { WizardHeader } from '../../features/travel/WizardUI';

interface WizardStep1DestinationProps {
  selectedDestination: string;
  onSelect: (destName: string, tagline?: string, img?: string) => void;
  onNext: () => void;
  onBack: () => void;
}

interface DestinationCardItem {
  id: string;
  name: string;
  destName: 'TP. Hồ Chí Minh' | 'Vũng Tàu';
  sub: string;
  tag: string;
  img: string;
}

export const WizardStep1Destination: React.FC<WizardStep1DestinationProps> = ({
  selectedDestination,
  onSelect,
  onNext,
  onBack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['Vũng Tàu', 'Quận 1 - Bến Bạch Đằng']);
  const [selectedCardId, setSelectedCardId] = useState<string>(() => {
    if (selectedDestination === 'Vũng Tàu') return 'vungtau';
    return 'tphcm';
  });

  const popular: DestinationCardItem[] = [
    {
      id: 'tphcm',
      name: 'TP. Hồ Chí Minh',
      destName: 'TP. Hồ Chí Minh',
      sub: 'Hòn ngọc Viễn Đông sôi động & sầm uất',
      tag: 'Đô thị & Văn hóa',
      img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'vungtau',
      name: 'Vũng Tàu',
      destName: 'Vũng Tàu',
      sub: 'Thiên đường biển xanh nghỉ dưỡng cuối tuần',
      tag: 'Bãi biển & Nghỉ dưỡng',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const others: DestinationCardItem[] = [
    {
      id: 'q1',
      name: 'Quận 1 - Bến Bạch Đằng',
      destName: 'TP. Hồ Chí Minh',
      sub: 'Dinh Độc Lập, phố đi bộ & bến Bạch Đằng',
      tag: 'Trung tâm Sài Gòn',
      img: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'baisau',
      name: 'Bãi Sau - Thùy Vân',
      destName: 'Vũng Tàu',
      sub: 'Bờ biển cát vàng, tắm biển & hải sản',
      tag: 'Bãi biển Vũng Tàu',
      img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'muinghinhphong',
      name: 'Mũi Nghinh Phong & Hải Đăng',
      destName: 'Vũng Tàu',
      sub: 'Cổng Trời lộng gió & Ngọn Hải Đăng cổ',
      tag: 'Danh thắng Vũng Tàu',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'cholon',
      name: 'Chợ Lớn - Quận 5',
      destName: 'TP. Hồ Chí Minh',
      sub: 'Phố người Hoa cổ kính & ẩm thực dimsum',
      tag: 'Văn hóa & Ẩm thực',
      img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'baitruoc',
      name: 'Bãi Trước & Núi Lớn',
      destName: 'Vũng Tàu',
      sub: 'Công viên ven biển, ngắm hoàng hôn & cà phê',
      tag: 'Cảnh quan Vũng Tàu',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'landmark81',
      name: 'Bình Thạnh & Landmark 81',
      destName: 'TP. Hồ Chí Minh',
      sub: 'Đài quan sát cao nhất & view sông Sài Gòn',
      tag: 'Hiện đại & Check-in',
      img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const toggleFav = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((f) => f !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  const handleCardClick = (item: DestinationCardItem) => {
    setSelectedCardId(item.id);
    onSelect(item.destName, item.sub, item.img);
  };

  const q = searchQuery.trim().toLowerCase();
  const filterFn = (item: DestinationCardItem) =>
    !q ||
    item.name.toLowerCase().includes(q) ||
    item.sub.toLowerCase().includes(q) ||
    item.destName.toLowerCase().includes(q) ||
    item.tag.toLowerCase().includes(q);

  const filteredPopular = popular.filter(filterFn);
  const filteredOthers = others.filter(filterFn);
  const hasResults = filteredPopular.length > 0 || filteredOthers.length > 0;

  return (
    <div className="relative w-full h-full min-h-0 bg-[#FCFDFF] flex flex-col justify-between overflow-hidden select-none text-slate-800">
      {/* Header & Progress */}
      <WizardHeader step={1} destination={selectedDestination} onBack={onBack}/>

      {/* Main Content */}
      <main className="flex-1 min-h-0 px-5 pt-2 pb-4 overflow-y-auto no-scrollbar flex flex-col gap-3.5 text-left">
        <div>
          <h1 className="plan-content-title">
            Bạn muốn đi đâu?
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Khám phá và lên lịch trình khám phá TP. Hồ Chí Minh & Vũng Tàu
          </p>
        </div>

        {/* Search Input */}
        <label className="destination-search">
          <span className="destination-search-icon" aria-hidden="true">
          <svg className="w-5 h-5 text-[#0A1680] mr-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35" />
          </svg></span>
          <input
            type="search"
            aria-label="Tìm thành phố hoặc khu vực"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm thành phố, khu vực…"
            className="destination-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Xoá từ khoá tìm kiếm"
              className="text-xs text-slate-400 hover:text-slate-600 ml-1 p-1"
            >
              ✕
            </button>
          )}
        </label>

        {!hasResults && (
          <div className="py-8 text-center text-slate-500 text-sm">
            <p>Không tìm thấy điểm đến nào phù hợp với &quot;{searchQuery}&quot;.</p>
            <p className="text-xs text-slate-400 mt-1">Hệ thống hiện phục vụ TP. Hồ Chí Minh và Vũng Tàu.</p>
          </div>
        )}

        {/* Gợi ý phổ biến (2-column Grid) */}
        {filteredPopular.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold text-slate-900 font-heading">Điểm đến chính</span>
                <span className="text-[#0A1680] text-sm">✨</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {filteredPopular.length} thành phố
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredPopular.map((item) => {
                const isSelected = selectedCardId === item.id || (!selectedCardId && selectedDestination === item.destName);
                const isFav = favorites.includes(item.name);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className={`group relative flex flex-col rounded-[24px] overflow-hidden bg-white shadow-xs cursor-pointer transition-all active:scale-[0.98] ${
                      isSelected ? 'border-2 border-[#0A1680] ring-2 ring-[#0A1680]/20' : 'border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="relative w-full h-[116px] overflow-hidden bg-slate-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badge tag */}
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-xs text-[10px] font-semibold text-white">
                        {item.tag}
                      </span>
                      {/* Heart Button */}
                      <button
                        type="button"
                        aria-label={`Yêu thích ${item.name}`}
                        onClick={(e) => toggleFav(item.name, e)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
                      >
                        <svg className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400 fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#0A1680] text-white flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex flex-col bg-white">
                      <span className="font-bold text-sm text-slate-900 leading-tight truncate font-heading">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-500 truncate mt-0.5">{item.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Các khu vực & Tuyến điểm nổi bật */}
        {filteredOthers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[15px] font-bold text-slate-900 font-heading">
                Khu vực & Tuyến điểm nổi bật
              </span>
              <span className="text-xs text-slate-400 font-medium">HCM & Vũng Tàu</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredOthers.map((item) => {
                const isSelected = selectedCardId === item.id;
                const isFav = favorites.includes(item.name);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className={`group relative flex flex-col rounded-[24px] overflow-hidden bg-white shadow-xs cursor-pointer transition-all active:scale-[0.98] ${
                      isSelected ? 'border-2 border-[#0A1680] ring-2 ring-[#0A1680]/20' : 'border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="relative w-full h-[116px] overflow-hidden bg-slate-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* City tag */}
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-xs text-[10px] font-semibold text-white">
                        {item.destName}
                      </span>
                      {/* Heart Button */}
                      <button
                        type="button"
                        aria-label={`Yêu thích ${item.name}`}
                        onClick={(e) => toggleFav(item.name, e)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
                      >
                        <svg className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-400 fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#0A1680] text-white flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex flex-col bg-white">
                      <span className="font-bold text-sm text-slate-900 leading-tight truncate font-heading">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-500 truncate mt-0.5">{item.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom CTA */}
      <footer className="shrink-0 w-full z-40 bg-white/95 backdrop-blur-xl px-5 py-3 border-t border-slate-200/80 shadow-md">
        <button
          onClick={onNext}
          type="button"
          className="w-full h-12 rounded-full bg-[#0A1680] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-[#0A1680]/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-heading"
        >
          <span>Tiếp tục</span>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </footer>
    </div>
  );
};
