import React from 'react';
import { TravelHeader } from './UI';
import './wizard-header.css';

export function WizardProgress({step,total=8}:{step:number;total?:number}) {
 return <div className="plan-step-bars" role="progressbar" aria-label="Tiến trình tạo chuyến đi" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>{Array.from({length:total},(_,index)=><span key={index} className={index===step-1?'current':index<step-1?'done':''}/>)}</div>;
}
export function WizardHeader({step,destination,title,subtitle,onBack,action}:{step?:number;destination?:string;title?:string;subtitle?:string;onBack:()=>void;action?:React.ReactNode}) {
 return <><TravelHeader title={step?`Bước ${step}/8${destination?` · ${destination}`:''}`:'Sở thích chuyến đi'} onBack={onBack} action={action}/><div className="plan-step-intro">{step&&<WizardProgress step={step}/>}{title&&<h1 className="plan-content-title">{title}</h1>}{subtitle&&<p>{subtitle}</p>}</div></>;
}
