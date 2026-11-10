import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { TravelHeader } from './UI';
import './wizard-header.css';

export function WizardProgress({step,total=8}:{step:number;total?:number}) {
 return <div className="plan-step-bars" role="progressbar" aria-label="Tiến trình tạo chuyến đi" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total}>{Array.from({length:total},(_,index)=><span key={index} className={index===step-1?'current':index<step-1?'done':''}/>)}</div>;
}
export function WizardHeader({
  step,
  total=8,
  destination,
  title,
  subtitle,
  onBack,
  action,
  onExit,
}:{
  step?:number;
  total?:number;
  destination?:string;
  title?:string;
  subtitle?:string;
  onBack:()=>void;
  action?:React.ReactNode;
  onExit?:()=>void;
}) {
  const navigate = useNavigate();
  const exitHandler = onExit || (() => navigate('/home'));

  const headerAction = action !== undefined ? (
    <div className="flex items-center gap-1">
      {action}
      <button
        type="button"
        className="travel-icon text-slate-500 hover:text-slate-800"
        aria-label="Thoát về Trang chủ"
        title="Thoát về Trang chủ"
        onClick={exitHandler}
      >
        <X size={18} />
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="travel-icon text-slate-500 hover:text-slate-800"
      aria-label="Thoát về Trang chủ"
      title="Thoát về Trang chủ"
      onClick={exitHandler}
    >
      <X size={18} />
    </button>
  );

  return (
    <>
      <TravelHeader
        title={step?`Bước ${step}/${total}${destination?` · ${destination}`:''}`:'Sở thích chuyến đi'}
        onBack={onBack}
        action={headerAction}
      />
      <div className="plan-step-intro">
        {step&&<WizardProgress step={step} total={total}/>}
        {title&&<h1 className="plan-content-title">{title}</h1>}
        {subtitle&&<p>{subtitle}</p>}
      </div>
    </>
  );
}
