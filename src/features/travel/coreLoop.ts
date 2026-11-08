import type {ActivePlan} from './model';
import {localDate} from './format';
export function currentTripDay(plan:ActivePlan,now=new Date()){
 const today=localDate(now);if(!plan.startDate||!plan.endDate)return null;
 const start=plan.startDate.includes('/')?plan.startDate.split('/').reverse().join('-'):plan.startDate;
 const end=plan.endDate.includes('/')?plan.endDate.split('/').reverse().join('-'):plan.endDate;
 return today>=start&&today<=end?Math.floor((Date.parse(`${today}T00:00:00Z`)-Date.parse(`${start}T00:00:00Z`))/86400000)+1:null;
}
export function groupMembers(plan:ActivePlan){
 const count=plan.companionType==='group'?Math.max(2,Math.min(20,plan.companionCount||2)):1;
 return Array.from({length:count},(_,i)=>({id:['you','minhanh','linhchi','quanghuy'][i]||`member-${i+1}`,name:i===0?'Bạn':`Thành viên ${i+1}`,color:['#0F2C59','#547db6','#925b30','#28745f'][i%4]}));
}
export function nextActivity(plan:ActivePlan,completed:string[],skipped:string[],now=new Date()){
 const dayNumber=currentTripDay(plan,now);if(dayNumber===null)return null;
 const day=plan.daysSchedule.find(d=>d.dayNumber===dayNumber);
 const item=day?.items.find(i=>!completed.includes(i.id)&&!skipped.includes(i.id));
 if(!item)return null;
 const today=localDate(now);const timestamp=Date.parse(`${today}T${item.time}:00+07:00`);
 return {item,dayNumber,minutes:Math.ceil((timestamp-now.getTime())/60000)};
}
