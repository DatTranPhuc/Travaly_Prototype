import {useState} from 'react';
import {X,ArrowLeft,ArrowRight} from 'lucide-react';
import {ModalSheet} from '../../components/common/ModalSheet';
import {LUMI_GUIDE_ACTIONS,type LumiGuide as Guide} from './lumiGuides';
import './lumi-guide.css';
export function LumiGuide({guide,onClose}:{guide:Guide;onClose:()=>void}) {
 const [step,setStep]=useState(0);const current=guide.steps[step];const action=LUMI_GUIDE_ACTIONS[current.action||guide.action];
 return <ModalSheet isOpen onClose={onClose} type="dialog" title={`Lumi hướng dẫn: ${guide.name}`} className="lumi-guide-overlay" contentClassName="lumi-guide-card">
  <button type="button" className="lumi-guide-close" aria-label="Đóng hướng dẫn" onClick={onClose}><X size={19}/></button>
  <div className="lumi-guide-art"><div className="lumi-guide-mascot" role="img" aria-label={`Lumi ${action.label}`} style={{backgroundImage:`url(${action.src})`,backgroundPosition:`${action.column*50}% ${action.row*100}%`}}/><span>Lumi chỉ bạn nhé!</span></div>
  <p className="lumi-guide-category">{guide.name} · {step+1}/{guide.steps.length}</p>
  <div className="lumi-guide-copy" aria-live="polite" aria-atomic="true"><h2>{current.title}</h2><p>{current.text}</p></div>
  <div className="lumi-guide-progress" aria-label={`Hướng dẫn ${step+1} trên ${guide.steps.length}`}>{guide.steps.map((_,i)=><span key={i} className={i===step?'current':''}/>)}</div>
  <div className="lumi-guide-actions"><button type="button" disabled={step===0} onClick={()=>setStep(s=>s-1)}><ArrowLeft size={15}/>Trước</button><button type="button" onClick={onClose}>Bỏ qua</button><button type="button" className="lumi-guide-next" onClick={()=>step===guide.steps.length-1?onClose():setStep(s=>s+1)}>{step===guide.steps.length-1?'Đã hiểu':'Tiếp theo'}<ArrowRight size={16}/></button></div>
 </ModalSheet>;
}
