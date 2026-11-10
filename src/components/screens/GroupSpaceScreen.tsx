import { ArrowUpRight, CalendarDays, ChevronRight, MapPin, MessageCircle, Users, Vote, Wallet } from 'lucide-react';
import { useTravel } from '../../features/travel/TravelContext';
import { TravelHeader, Image } from '../../features/travel/UI';
import { TripWorkspaceNav } from '../../features/travel/TripWorkspaceNav';
import { money } from '../../features/travel/format';
interface Props { onBack:()=>void; onOpenPoll:()=>void; onOpenChat:()=>void; onOpenLocation:()=>void; onOpenExpenseSplit:()=>void; onOpenSchedule:()=>void }
export function GroupSpaceScreen(p:Props) {
 const {plan,members,expenses,tripVotes}=useTravel();
 const total=expenses.filter(e=>e.tripId===plan.id&&e.scope==='group').reduce((s,e)=>s+e.amount,0);
 const options=[...new Set(plan.daysSchedule.flatMap(d=>d.items).filter(i=>/Ăn|thực/i.test(i.category)).map(i=>i.placeName))].slice(0,3);
 const choices=options.length?options:['Ăn tại khu trung tâm','Ăn gần chỗ nghỉ','Tự chọn quán khi đến nơi'];
 const baseVotes: Record<string, string> = { minhanh: choices[0], linhchi: choices[0], quanghuy: choices[1]||choices[0], ...tripVotes };
 const votes=members.filter(m=>baseVotes[m.id]).length;
 return <div className="travel-screen core-screen"><TravelHeader title="Nhóm chuyến đi" subtitle={plan.destination} onBack={p.onBack}/><TripWorkspaceNav/>
  <main className="travel-scroll core-stack">
   <section className="core-trip-cover"><Image src={plan.coverImage} alt={plan.destination}/><div><span className="core-photo-tag"><Users size={13}/>{members.length} người đồng hành</span><h2>{plan.title}</h2><p><CalendarDays size={13}/>{plan.dates}</p></div></section>
   <section className="core-section"><div className="core-section-heading"><h2>Đi cùng nhau</h2><span>{members.length} thành viên</span></div><div className="core-member-list">{members.map((m,i)=><div key={m.id}><span className="core-avatar" style={{background:m.color}}>{i===0?'B':String(i+1)}</span><b>{m.name}</b><small>{i===0?'Là bạn':'Đồng hành'}</small></div>)}</div></section>
   <button className="core-expense-link" onClick={p.onOpenExpenseSplit}><span className="core-icon-tile"><Wallet size={22}/></span><span><small>Đã chi chung</small><strong>{money(total)}</strong><span>Xem chia tiền & quyết toán</span></span><ArrowUpRight size={22}/></button>
   <section className="core-section"><div className="core-section-heading"><h2>Cả nhóm cùng quyết</h2></div><button className="core-action-row" onClick={p.onOpenPoll}><img src="/images/mascot-announce.png" alt="Bình chọn" className="w-10 h-10 object-contain shrink-0" /><span><b>Bình chọn ăn uống</b><small>{votes}/{members.length} người đã chọn · Bạn chọn gì?</small></span><ChevronRight size={18}/></button><button className="core-action-row" onClick={p.onOpenSchedule}><img src="/images/mascot-route.png" alt="Lịch trình" className="w-10 h-10 object-contain shrink-0" /><span><b>Lịch trình chung</b><small>Cùng xem những điểm sắp đến</small></span><ChevronRight size={18}/></button></section>
   <div className="core-tool-links"><button onClick={p.onOpenChat}><MessageCircle size={17}/>Nhắn tin<ChevronRight size={14}/></button><button onClick={p.onOpenLocation}><MapPin size={17}/>Vị trí minh hoạ<ChevronRight size={14}/></button></div>
   <p className="core-device-note">Thông tin lưu trên thiết bị này, chưa đồng bộ với điện thoại khác.</p>
  </main></div>;
}
