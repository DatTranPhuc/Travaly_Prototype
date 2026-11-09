import React, { useMemo } from 'react';
import { Check, Utensils, Users } from 'lucide-react';
import { useTravel } from '../../features/travel/TravelContext';
import { TravelHeader } from '../../features/travel/UI';
import { TripWorkspaceNav } from '../../features/travel/TripWorkspaceNav';

export function GroupPollScreen({onBack}:{onBack:()=>void}) {
 const {plan,members,tripVotes,castVote}=useTravel();
 const options=[...new Set(plan.daysSchedule.flatMap(d=>d.items).filter(i=>/Ăn|thực/i.test(i.category)).map(i=>i.placeName))].slice(0,3);
 const choices=options.length?options:['Ăn tại khu trung tâm','Ăn gần chỗ nghỉ','Tự chọn quán khi đến nơi'];

 // Sync votes with simulated companion choices so voting actively updates counts and percentages
 const effectiveVotes = useMemo(() => {
  const base: Record<string, string> = {
   minhanh: choices[0] || 'Ăn tại khu trung tâm',
   linhchi: choices[0] || 'Ăn tại khu trung tâm',
   quanghuy: choices[1] || choices[0] || 'Ăn gần chỗ nghỉ',
   ...tripVotes,
  };
  return base;
 }, [choices, tripVotes]);

 const total = members.filter(m => effectiveVotes[m.id]).length;

 return <div className="travel-screen core-screen"><TravelHeader title="Bình chọn ăn uống" subtitle={plan.destination} onBack={onBack}/><TripWorkspaceNav/><main className="travel-scroll core-stack">
  <section className="core-poll-intro"><span className="core-icon-tile warm"><Utensils size={24}/></span><h1>Cả nhóm muốn ăn gì?</h1><p>Chọn một gợi ý trong lịch trình.<br/>Bạn luôn có thể đổi ý.</p><span className="core-poll-count"><Users size={14}/>{total}/{members.length} người đã chọn</span></section>
  <div className="core-poll-options">{choices.map((option,index)=>{
   const voters = members.filter(m => effectiveVotes[m.id] === option);
   const selected = effectiveVotes.you === option;
   const percent = members.length > 0 ? Math.round((voters.length / members.length) * 100) : 0;
   return <button key={option} className="core-poll-option cursor-pointer transition-all active:scale-[0.99]" aria-pressed={selected} onClick={()=>castVote(option)}><div className="core-poll-top"><span className="core-option-number">0{index+1}</span><span className="core-poll-name">{option}</span><span className="core-radio">{selected&&<Check size={14}/>}</span></div><div className="core-vote-track"><span style={{width:`${percent}%`}}/></div><div className="core-poll-bottom"><span>{voters.length} phiếu{selected?' · Có bạn':''}</span><b>{percent}%</b></div></button>;
  })}</div>
  <p className="core-device-note">Mỗi người một phiếu. Bình chọn được lưu và cập nhật tức thì trên thiết bị.</p>
 </main></div>;
}
