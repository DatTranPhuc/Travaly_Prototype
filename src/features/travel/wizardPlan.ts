import {manualPlacesFor} from './manualPlaces';
import { MOCK_PLACES } from '../../data/mockData';
import type { TripWizardData } from '../../types/travel';
import { INITIAL_PLAN, SAIGON_PLAN, STAYS, images } from './fixtures';
import { dayCount, isoDate, lodgingError, optimizePlan, type Stay, type ActivePlan } from './model';
// Deterministic preview fixtures; no live AI request.
export function buildWizardPlan(data:TripWizardData):ActivePlan{
 const start=isoDate(data.startDate),end=isoDate(data.endDate);const count=Math.max(1,Math.min(30,dayCount(start,end)||1));
 const stay=STAYS.find(s=>s.id===data.stayId&&s.area.includes(data.destination));
 const draft:ActivePlan={planningMode:'ai',companionType:data.companionType,companionCount:data.companionCount,departureTime:data.departureTime,returnTime:data.returnTime,budgetAmount:data.budgetAmount,id:`trip-${data.destination}-${start}`,destination:data.destination,stayRoomCount:lodgingBudget(data).rooms,hotelBudgetPerNight:lodgingBudget(data).nightly,title:`${data.destination} · ${count} ngày`,days:count,dates:`${start.split('-').reverse().join('/')} – ${end.split('-').reverse().join('/')}`,startDate:start,endDate:end,checkIn:stay?(data.stayDatesMode==='custom'?isoDate(data.checkIn):start):undefined,checkOut:stay?(data.stayDatesMode==='custom'?isoDate(data.checkOut):end):undefined,coverImage:data.destination==='TP. Hồ Chí Minh'?images.town:data.destination==='Vũng Tàu'?images.beach:data.destination==='Đà Nẵng'?images.bridge:data.destination==='Hội An'?images.town:images.hero,estimatedCostPerPerson:`${data.budgetAmount.toLocaleString('vi-VN')}đ`,daysSchedule:Array.from({length:count},(_,index)=>{
 const date=new Date(start+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+index);const dateText=Number.isNaN(date.getTime())?'':`${date.getUTCDate()}/${date.getUTCMonth()+1}`;
 const sample=data.destination==='TP. Hồ Chí Minh'?SAIGON_PLAN.daysSchedule[index]:data.destination==='Đà Nẵng'?INITIAL_PLAN.daysSchedule[index]:undefined;
 return {dayNumber:index+1,title:sample?.title||`Khám phá ${data.destination}`,dateText,dayCost:sample?.dayCost||'Chưa dự tính',items:sample?sample.items.map(i=>({...i})):[]};
 })};
 const choices=manualPlacesFor(data.destination);const chosen=[...new Set(data.mustVisitPlaces)];
 const candidates=[...new Map(choices.filter(p=>!chosen.includes(p.name)&&!/^Ăn|Thưởng thức|Trải nghiệm địa phương/.test(p.name)&&!/Ăn|Ẩm|Cà phê/i.test(p.category)).map(p=>[p.name.trim().toLocaleLowerCase('vi-VN'),p])).values()];
 draft.placeSelection=chosen;
 draft.unscheduledPlaces=chosen.slice(count*4);
 draft.daysSchedule.forEach((day,dayIndex)=>{
  const pick=(slot:number)=>candidates[(dayIndex*2+slot)%Math.max(1,candidates.length)];
  const rows=[
   {time:'08:00',name:`Ăn sáng tại ${data.destination}`,category:'Ăn sáng',cost:'60.000đ',locked:true},
   {time:'09:30',name:pick(0)?.name||`Khám phá ${data.destination}`,category:'Tham quan',place:pick(0),cost:'Chưa dự tính'},
   {time:'11:30',name:`Ăn trưa và nghỉ tại ${data.destination}`,category:'Ăn trưa',cost:'100.000đ',locked:true},
   {time:'14:00',name:`Cà phê tại ${data.destination}`,category:'Cà phê',cost:'50.000đ',locked:true},
   {time:'16:00',name:pick(1)?.name||`Dạo quanh ${data.destination}`,category:'Tham quan',place:pick(1),cost:'Chưa dự tính'},
   {time:'18:00',name:`Ăn tối tại ${data.destination}`,category:'Ăn tối',cost:'150.000đ',locked:true},
  ];
  day.items=rows.map((r,i)=>({id:`day-${dayIndex+1}-${i}`,time:r.time,placeName:r.name,category:r.category,duration:'60 phút',cost:r.cost,note:r.locked?'Khung giờ ăn/nghỉ · chi phí dự kiến, chưa phải khoản đã chi.':'Gợi ý từ dữ liệu có sẵn; kiểm tra giờ mở cửa trước khi đi.',locked:!!r.locked,image:r.place?.image||(/Ăn|Cà phê/.test(r.category)?images.food:draft.coverImage),location:r.place?.location,address:r.place?.address||data.destination}));
  day.dayCost='Từ 360.000đ · dự kiến';
 });
 chosen.slice(0,count*4).forEach((name,index)=>{
  const place=choices.find(p=>p.name===name);const day=draft.daysSchedule[index%count];const slot=Math.floor(index/count);
  const times=['09:30','16:00','14:00','10:45'];
  const item={id:`selected-${index}`,time:times[slot],placeName:name,category:place?.category||'Tự chọn',duration:slot===3?'45 phút':'60 phút',cost:'Chưa dự tính',note:'Địa điểm bạn đã chọn · giờ gợi ý, có thể chỉnh.',image:place?.image||draft.coverImage,location:place?.location,address:place?.address};
  if(slot<3)day.items[[1,4,3][slot]]=item;else day.items.push(item);
 });
 draft.daysSchedule.forEach(day=>day.items.sort((a,b)=>a.time.localeCompare(b.time)));
 return stay?optimizePlan(draft,stay):draft;

}

export function wizardDateError(data:TripWizardData){
 const count=dayCount(data.startDate,data.endDate);if(count<1)return 'Ngày về cần từ ngày đi trở đi.';if(count>30)return 'Bản xem trước hỗ trợ tối đa 30 ngày.';
 const stay=STAYS.find(s=>s.id===data.stayId&&s.area.includes(data.destination));
 return stay?lodgingError(data.startDate,data.endDate,data.stayDatesMode==='custom'?data.checkIn||'':data.startDate,data.stayDatesMode==='custom'?data.checkOut||'':data.endDate):'';
}

export function lodgingBudget(data:TripWizardData){
 const nights=Math.max(0,dayCount(data.startDate,data.endDate)-1);const people=data.companionType==='solo'?1:Math.max(1,data.companionCount);const rooms=Math.max(1,data.stayRoomCount||Math.ceil(people/2));
 const suggested=Math.max(100000,Math.floor((data.budgetAmount*people*0.35/Math.max(1,nights*rooms))/50000)*50000);
 return {nights,people,rooms,nightly:data.hotelBudgetPerNight??suggested,suggested};
}
export function rankStays(stays:Stay[],data:TripWizardData){
 const budget=lodgingBudget(data);if(!budget.nights)return [];
 return stays.filter(s=>s.area.includes(data.destination)).map(stay=>({stay,withinBudget:stay.price<=budget.nightly,over:Math.max(0,stay.price-budget.nightly),estimatedTotal:stay.price*budget.rooms*(data.stayDatesMode==='custom'?Math.max(0,dayCount(data.checkIn||'',data.checkOut||'')-1):budget.nights)})).sort((a,b)=>Number(b.withinBudget)-Number(a.withinBudget)||(a.withinBudget?b.stay.rating-a.stay.rating:a.over-b.over)||a.stay.price-b.stay.price);
}

export function wizardNeedsStay(data:TripWizardData){return dayCount(data.startDate,data.endDate)>1&&!STAYS.some(s=>s.id===data.stayId&&s.area.includes(data.destination));}
