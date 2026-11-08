import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Check, ChevronRight, Clock3, MapPin, Navigation, RotateCcw } from 'lucide-react';
import { useTravel } from './TravelContext';
import { currentTripDay, nextActivity } from './coreLoop';
import { TravelHeader, Pill, Image } from './UI';
import { TripWorkspaceNav } from './TripWorkspaceNav';
import { AdaptiveNotice, AdaptiveDayControls } from './AdaptiveUI';
export function TodayScreen() {
 const nav=useNavigate();
 const {plan,completedActivities,toggleActivity,skippedActivities,skipActivity,restoreSkippedActivity}=useTravel();
 const [now,setNow]=useState(()=>new Date());
 useEffect(()=>{const id=setInterval(()=>setNow(new Date()),30000);return()=>clearInterval(id);},[]);
 const completed=completedActivities[plan.id]||[];
 const skipped=skippedActivities[plan.id]||[];
 const dayNumber=currentTripDay(plan,now);
 const next=nextActivity(plan,completed,skipped,now);
 const day=plan.daysSchedule.find(d=>d.dayNumber===dayNumber);
 const skippedItems=plan.daysSchedule.flatMap(d=>d.items).filter(i=>skipped.includes(i.id));
 const done=day?.items.filter(i=>completed.includes(i.id)).length||0;
 return <div className="travel-screen core-screen"><TravelHeader title="Hôm nay" subtitle={plan.destination} onBack={()=>nav('/trip/overview')}/><TripWorkspaceNav/><main className="travel-scroll core-stack">
  {day&&<div className="core-day-heading"><div><span>Ngày {dayNumber} · {day.dateText}</span><h1>Mình đi đâu hôm nay?</h1></div><span className="core-day-progress"><Check size={13}/>{done}/{day.items.length}</span></div>}
  {!day||!next?<section className="core-empty"><span className="core-icon-tile"><CalendarDays size={28}/></span><h2>{!day?'Hẹn bạn vào ngày khởi hành':day.items.length?'Một ngày thật trọn vẹn':'Ngày mới, lịch mới'}</h2><p>{!day?plan.dates:day.items.length?'Bạn đã xem hết hoạt động hôm nay. Nghỉ ngơi một chút nhé.':'Thêm điểm đến để bắt đầu khám phá cùng nhau.'}</p><Pill onClick={()=>nav(!day?'/trip/day/1':`/trip/edit/${dayNumber}`)}>{!day?'Xem lịch đã lên':'Chỉnh lịch hôm nay'}</Pill></section>:<article className="core-next-card">
   <div className="core-next-photo"><Image src={next.item.image||plan.coverImage} alt={next.item.placeName}/><span className="core-photo-tag"><Clock3 size={13}/>{next.item.time} · Điểm tiếp theo</span></div>
   <div className="core-next-body"><span className="core-countdown" role="status"><span/>{next.minutes>0?`Còn ${next.minutes} phút`:next.minutes===0?'Đến giờ rồi':`Đã qua giờ dự kiến ${-next.minutes} phút`}</span><h2>{next.item.placeName}</h2><p className="core-place-address"><MapPin size={15}/>{next.item.address||plan.destination}</p><div className="core-stop-meta"><span><Clock3 size={14}/>{next.item.duration}</span><span>{next.item.cost}</span></div><div className="core-next-actions"><a className="core-directions" href={next.item.location?`https://www.google.com/maps/dir/?api=1&destination=${next.item.location.lat},${next.item.location.lng}`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(next.item.placeName+' '+plan.destination)}`} target="_blank" rel="noreferrer"><Navigation size={16}/>{next.item.location?'Chỉ đường':'Tìm địa điểm'}</a><button className="core-arrived" onClick={()=>toggleActivity(next.item.id)}><Check size={17}/>Đến rồi</button></div><button className="core-skip" onClick={()=>skipActivity(next.item.id)}>Bỏ qua điểm này<ChevronRight size={14}/></button></div>
  </article>}
  <button className="core-action-row core-section" onClick={()=>nav(`/trip/day/${dayNumber||1}`)}><span className="core-icon-tile"><CalendarDays size={20}/></span><span><b>Xem lịch cả ngày</b><small>Tất cả điểm đến, theo nhịp của bạn</small></span><ChevronRight size={18}/></button>
  {!!skippedItems.length&&<details className="core-section core-skipped"><summary>{skippedItems.length} điểm đã bỏ qua</summary>{skippedItems.map(i=><button key={i.id} onClick={()=>restoreSkippedActivity(i.id)}><span>{i.placeName}</span><RotateCcw size={15}/><span className="sr-only">Khôi phục</span></button>)}</details>}
  <AdaptiveNotice/>{day&&<AdaptiveDayControls dayNumber={day.dayNumber}/>}
 </main></div>;
}
