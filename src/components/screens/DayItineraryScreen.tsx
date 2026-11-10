import { TripProgress } from '../../features/travel/TripProgress';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BedDouble,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Coffee,
  MapPin,
  Navigation,
  Pencil,
  Plus,
  Sparkles,
  Utensils,
  X
} from 'lucide-react';
import { BottomNav } from '../common/BottomNav';
import { ModalSheet } from '../common/ModalSheet';
import type { NavTab } from '../../types/travel';
import { useTravel } from '../../features/travel/TravelContext';
import { STAYS, SAIGON_PLAN } from '../../features/travel/fixtures';
import { type LocatedItem, distanceKm, stayAppliesOnDay, isoDate } from '../../features/travel/model';
import { Image, TravelHeader, Eyebrow } from '../../features/travel/UI';
import { TripWorkspaceNav } from '../../features/travel/TripWorkspaceNav';
import { AdaptiveDayControls } from '../../features/travel/AdaptiveUI';

interface Props {
  onNavigateTab: (tab: NavTab) => void;
  initialDay?: number;
  onOpenPlaceDetail: (id: string) => void;
  onEditDay: (day: number) => void;
  onBack: () => void;
}

export function DayItineraryScreen({ onNavigateTab, initialDay = 1, onEditDay, onBack }: Props) {
  const navigate = useNavigate();
  const { plan: rawPlan, completedActivities, toggleActivity, adaptive } = useTravel();
  const [activeDay, setActiveDay] = useState(initialDay);
  const [selected, setSelected] = useState<LocatedItem | null>(null);

  // Fallback safe plan nếu plan trong localStorage bị null/undefined
  const plan = rawPlan && rawPlan.daysSchedule && rawPlan.daysSchedule.length > 0 ? rawPlan : SAIGON_PLAN;

  const stay = STAYS.find(s => s.id === plan.stayId && stayAppliesOnDay(plan, activeDay));

  useEffect(() => setActiveDay(initialDay), [initialDay]);

  useEffect(() => {
    if (adaptive?.status === 'pending' && adaptive.dayNumber !== initialDay) {
      navigate(`/trip/day/${adaptive.dayNumber}`);
    }
  }, [adaptive?.id, adaptive?.status, adaptive?.dayNumber, initialDay, navigate]);

  const daysSchedule = plan.daysSchedule || [];
  const day =
    daysSchedule.find(d => d.dayNumber === activeDay) ||
    daysSchedule[0] || {
      dayNumber: activeDay,
      title: `Ngày ${activeDay}`,
      dateText: '',
      dayCost: '0đ',
      items: []
    };

  // An toàn tuyệt đối khi parse ngày checkout
  let checkoutDay = false;
  try {
    if (plan.startDate && plan.checkOut) {
      const parsedIso = isoDate(plan.startDate);
      if (parsedIso) {
        const currentDate = new Date(parsedIso + 'T12:00:00Z');
        if (!Number.isNaN(currentDate.getTime())) {
          currentDate.setUTCDate(currentDate.getUTCDate() + activeDay - 1);
          checkoutDay = currentDate.toISOString().slice(0, 10) === isoDate(plan.checkOut);
        }
      }
    }
  } catch {
    checkoutDay = false;
  }

  // Tính toán tiến độ ngày an toàn
  const planCompleted = plan && plan.id ? completedActivities[plan.id] || [] : [];
  const items = day.items || [];
  const doneCount = items.filter(item => planCompleted.includes(item.id)).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="travel-screen daily-screen">
      <TravelHeader
        title="Lịch trình từng ngày"
        subtitle={`${plan.destination || 'Chuyến đi'} · ${plan.days || 1} ngày`}
        onBack={onBack}
        action={
          <button
            className="travel-icon"
            aria-label="Sửa lịch ngày đang xem"
            onClick={() => onEditDay(activeDay)}
          >
            <Pencil size={18} />
          </button>
        }
      />

      <TripWorkspaceNav />

      <main className="travel-scroll daily-scroll">
        <div className="daily-trip-heading">
          <Image src={plan.coverImage} alt="Ảnh minh họa chuyến đi" />
          <div>
            <Eyebrow>CHUYẾN ĐI CỦA BẠN</Eyebrow>
            <h2>{plan.destination}</h2>
            <p>{plan.dates} · {plan.days} ngày</p>
          </div>
        </div>

        <TripProgress dayNumber={activeDay} />
        <AdaptiveDayControls dayNumber={activeDay} />

        <button className="daily-add" onClick={() => navigate(`/trip/route?day=${activeDay}`)}>
          <Navigation size={16} /> Chọn địa điểm và xem lộ trình
        </button>

        <div className="daily-layout">
          {/* Day rail */}
          <nav className="daily-rail" aria-label="Chọn ngày">
            {daysSchedule.map(d => (
              <button
                key={d.dayNumber}
                aria-current={activeDay === d.dayNumber ? 'date' : undefined}
                className={activeDay === d.dayNumber ? 'active' : ''}
                onClick={() => setActiveDay(d.dayNumber)}
              >
                <span className="day-rail-dot" />
                <b>Ngày {d.dayNumber}</b>
                <small>{d.dateText}</small>
              </button>
            ))}
          </nav>

          <section className="daily-content">
            {/* Header ngày & Thanh tiến độ hoàn thành */}
            <div className="daily-title flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <Eyebrow>NGÀY {day.dayNumber}</Eyebrow>
                  <h2>{day.title}</h2>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">
                    Dự chi {(day.dayCost || '0đ').replace('~', '')}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 transition-colors ${
                      doneCount === totalCount && totalCount > 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : doneCount > 0
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Check size={11} strokeWidth={2.5} />
                    {doneCount}/{totalCount} điểm ({progressPercent}%)
                  </span>
                </div>
              </div>

              {/* Progress bar mini */}
              {totalCount > 0 && (
                <div className="w-full h-1.5 rounded-full bg-slate-200/80 overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}

              {/* Banner chúc mừng khi hoàn thành 100% các điểm trong ngày */}
              {doneCount === totalCount && totalCount > 0 && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center gap-3 shadow-xs mt-1">
                  <img
                    src="/images/lumi-guides/pose-b-4.png"
                    alt="Lumi Celebrate"
                    className="w-10 h-10 object-contain shrink-0 drop-shadow-xs"
                  />
                  <div className="min-w-0">
                    <b className="text-[12px] text-emerald-900 font-heading block">
                      🎉 Tuyệt vời! Bạn đã hoàn thành Ngày {day.dayNumber}
                    </b>
                    <p className="text-[10.5px] text-emerald-700">
                      Đã ghé đủ {totalCount} điểm hôm nay. Bạn có thể mở album để xem lại kỷ niệm!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {stay && (
              <button
                className="daily-stay-anchor"
                onClick={() =>
                  setSelected({
                    id: stay.id,
                    placeName: stay.name,
                    time: 'Xuất phát',
                    category: 'Chỗ ở',
                    duration: '',
                    note: 'Điểm đầu và cuối ngày. Tọa độ minh họa.',
                    cost: '',
                    location: stay.location,
                    image: stay.image
                  })
                }
              >
                <BedDouble size={17} />
                <span>
                  {checkoutDay ? 'Trả phòng tại' : 'Chỗ ở: '} <b>{stay.name}</b>
                </span>
              </button>
            )}

            {/* DANH SÁCH HOẠT ĐỘNG VỚI UX HOÀN THÀNH NỔI BẬT */}
            <div className="daily-timeline">
              {items.map((item, index) => {
                const isCompleted = planCompleted.includes(item.id);

                return (
                  <React.Fragment key={item.id}>
                    <article className={`daily-activity ${isCompleted ? 'is-completed' : ''}`}>
                      {/* Timeline dot với icon check khi hoàn thành */}
                      <span className={`daily-timeline-dot ${isCompleted ? 'completed-dot' : ''}`}>
                        {isCompleted && <Check size={8} strokeWidth={3} className="text-white" />}
                      </span>

                      {/* Nút bấm thẻ chi tiết */}
                      <button
                        type="button"
                        className={`daily-activity-button transition-all text-left ${
                          isCompleted
                            ? '!bg-emerald-50/70 !border-2 !border-emerald-400/80 shadow-xs'
                            : 'hover:border-slate-300'
                        }`}
                        onClick={() => setSelected(item)}
                      >
                        <div className="daily-time-icon">
                          <time className={isCompleted ? 'text-emerald-700 font-bold' : ''}>
                            {item.time}
                          </time>
                          <span className={isCompleted ? 'bg-emerald-100 text-emerald-700' : ''}>
                            {isCompleted ? (
                              <Check size={18} strokeWidth={2.5} />
                            ) : /Ăn|Buffet|Cao Lầu/.test(item.placeName) ? (
                              <Utensils size={18} />
                            ) : item.category === 'Cà phê' ? (
                              <Coffee size={18} />
                            ) : (
                              <Camera size={18} />
                            )}
                          </span>
                        </div>

                        <div className="daily-activity-copy min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className={`font-heading ${isCompleted ? 'text-emerald-950 font-bold' : ''}`}>
                              {(item.placeName || '').replace('Ăn sáng - ', '').replace('Ăn trưa - ', '')}
                            </h3>
                            {isCompleted && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9.5px] font-extrabold flex items-center gap-0.5 shadow-2xs">
                                <Check size={10} strokeWidth={3} /> Đã đến
                              </span>
                            )}
                          </div>
                          <p className={isCompleted ? 'text-emerald-800/80 font-medium' : 'text-slate-500'}>
                            {item.category} · {item.duration}
                          </p>
                          {item.locked && (
                            <span className="daily-locked">
                              <Check size={10} /> Giữ giờ
                            </span>
                          )}
                        </div>

                        <div className="relative shrink-0">
                          <Image
                            src={item.image || plan.coverImage}
                            alt={`Ảnh minh họa ${item.placeName}`}
                            className={`daily-activity-photo ${isCompleted ? 'opacity-90 saturate-125' : ''}`}
                          />
                          {isCompleted && (
                            <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-[0.5px] rounded-xl flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                                <Check size={13} strokeWidth={3} />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>

                      {/* NÚT TÍCH HOÀN THÀNH NỔI BẬT & RÕ RÀNG */}
                      <div className="mt-1.5 mb-3 flex items-center justify-between px-1">
                        <button
                          type="button"
                          onClick={() => toggleActivity(item.id)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 ${
                            isCompleted
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
                              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 size={14} className="text-white" />
                              <span>Đã hoàn thành · Chạm để hủy</span>
                            </>
                          ) : (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 flex items-center justify-center" />
                              <span>Đánh dấu đã hoàn thành</span>
                            </>
                          )}
                        </button>

                        {isCompleted && (
                          <span className="text-[10.5px] text-emerald-700 font-semibold flex items-center gap-1">
                            ✨ Đã lưu vào kỷ niệm
                          </span>
                        )}
                      </div>
                    </article>

                    {index < items.length - 1 &&
                      item.location &&
                      items[index + 1]?.location && (
                        <p className="daily-distance">
                          <Navigation size={10} />
                          {distanceKm(item.location, items[index + 1].location!).toFixed(1)} km · khoảng cách thẳng
                        </p>
                      )}
                  </React.Fragment>
                );
              })}
            </div>

            {stay && !checkoutDay && (
              <div className="daily-stay-anchor return">
                <BedDouble size={17} />
                <span>
                  Trở về <b>{stay.name}</b>
                </span>
              </div>
            )}

            <button className="daily-add" onClick={() => onEditDay(activeDay)}>
              <Plus size={16} /> Thêm hoạt động
            </button>
          </section>
        </div>

        <p className="travel-footnote daily-disclaimer">
          Lịch mẫu để xem bố cục. Gợi ý thứ tự theo tọa độ; chưa tính đường bộ và giao thông.
        </p>
      </main>

      <BottomNav activeTab="trips" onTabChange={onNavigateTab} />

      <ModalSheet isOpen={!!selected} onClose={() => setSelected(null)} title="Chi tiết hoạt động">
        {selected && (
          <div className="travel-modal-content">
            <div className="travel-section-title">
              <h2>{selected.placeName}</h2>
              <button className="travel-icon" aria-label="Đóng" onClick={() => setSelected(null)}>
                <X size={20} />
              </button>
            </div>
            {selected.image && <Image src={selected.image} alt="Ảnh minh họa" className="daily-detail-photo" />}
            <div className="flex items-center gap-4 text-sm">
              <span>
                <Clock3 size={14} className="inline mr-1" />
                {selected.time}
              </span>
              <b>{selected.cost}</b>
            </div>
            <p>{selected.note}</p>
            <button
              className="travel-pill"
              onClick={() => navigate(`/trip/camera?place=${encodeURIComponent(selected.id)}`)}
            >
              <Camera size={16} /> Chụp ảnh tại đây
            </button>
            {selected.address && (
              <p>
                <MapPin size={14} className="inline mr-1" />
                {selected.address}
              </p>
            )}
            <button className="travel-pill secondary" onClick={() => onEditDay(activeDay)}>
              <Pencil size={15} /> Chỉnh sửa ngày {activeDay}
            </button>
            {selected.location && (
              <a
                className="travel-pill"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${selected.location.lat},${selected.location.lng}`}
              >
                <Navigation size={16} /> Mở chỉ đường
              </a>
            )}
          </div>
        )}
      </ModalSheet>
    </div>
  );
}
