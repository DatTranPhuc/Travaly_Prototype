import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Clock3, X } from 'lucide-react';
import { ModalSheet } from '../common/ModalSheet';
import './wizard-time-picker.css';

export function WizardTimePicker({label,value,onChange}:{label:string;value:string;onChange:(value:string)=>void}) {
  const root=useRef<HTMLDivElement>(null);
  const hourList=useRef<HTMLDivElement>(null);
  const minuteList=useRef<HTMLDivElement>(null);
  const [open,setOpen]=useState(false);
  const [draft,setDraft]=useState(value);
  const [hours,minutes]=draft.split(':').map(Number);
  const hour=hours%12||12;
  const period=hours>=12?'PM':'AM';
  useEffect(()=>{
    if(open){
      if(hourList.current)hourList.current.scrollTop=Math.max(0,((Number(value.split(':')[0])%12||12)-1)*46-92);
      if(minuteList.current)minuteList.current.scrollTop=Math.max(0,Number(value.split(':')[1])*46-92);
    }
  },[open,value]);
  const format=(time:string)=>{
    const [h,m]=time.split(':').map(Number);
    return `${String(h%12||12).padStart(2,'0')}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;
  };
  const update=(nextHour:number,nextMinute:number,nextPeriod:string)=>{
    const hour24=nextHour%12+(nextPeriod==='PM'?12:0);
    setDraft(`${String(hour24).padStart(2,'0')}:${String(nextMinute).padStart(2,'0')}`);
  };
  return <div ref={root} className="wizard-time-picker"><span>{label}</span>
    <button type="button" className="wizard-time-trigger" aria-label={`${label}: ${format(value)}`} aria-haspopup="dialog" aria-expanded={open} onClick={()=>{setDraft(value);setOpen(true);}}><span>{format(value)}</span><Clock3 size={16}/></button>
    {open&&createPortal(<ModalSheet isOpen={open} onClose={()=>setOpen(false)} title={label} className="wizard-time-overlay" contentClassName="wizard-time-sheet">
      <div className="wizard-time-sheet-header"><h2><Clock3 size={19}/>{label}</h2><button type="button" className="travel-icon" aria-label="Đóng chọn giờ" onClick={()=>setOpen(false)}><X size={20}/></button></div>
      <output className="wizard-time-preview" aria-live="polite">{format(draft)}</output>
      <div className="wizard-time-options">
        <fieldset><legend>Giờ</legend><div ref={hourList} className="wizard-hour-grid" tabIndex={0} role="group" aria-label="Giờ từ 1 đến 12">{Array.from({length:12},(_,i)=>i+1).map(h=><button type="button" key={h} aria-label={`${label} - ${h} giờ`} aria-pressed={hour===h} onClick={()=>update(h,minutes,period)}>{String(h).padStart(2,'0')}</button>)}</div></fieldset>
        <fieldset><legend>Phút</legend><div ref={minuteList} className="wizard-minute-grid" tabIndex={0} role="group" aria-label="Phút từ 00 đến 59">{Array.from({length:60},(_,i)=>i).map(m=><button type="button" key={m} aria-label={`${label} - ${m} phút`} aria-pressed={minutes===m} onClick={()=>update(hour,m,period)}>{String(m).padStart(2,'0')}</button>)}</div></fieldset>
        <fieldset><legend>Buổi</legend><div className="wizard-period-grid">{['AM','PM'].map(p=><button type="button" key={p} aria-pressed={period===p} onClick={()=>update(hour,minutes,p)}>{p}</button>)}</div></fieldset>
      </div>
      <div className="wizard-time-sheet-footer"><button type="button" className="travel-pill" onClick={()=>{onChange(draft);setOpen(false);}}>Xong</button></div>
    </ModalSheet>,root.current?.closest('.travel-screen')||document.body)}
  </div>;
}
