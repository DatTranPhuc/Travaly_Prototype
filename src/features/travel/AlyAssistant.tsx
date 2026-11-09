import {LumiGuide} from './LumiGuide';
import {lumiGuideFor} from './lumiGuides';
import {useCallback,useEffect,useRef,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import {ArrowUp,ArrowUpRight,GripVertical,MessageCircle,Minus,Sparkles} from 'lucide-react';
import {ModalSheet} from '../../components/common/ModalSheet';
import {useStored,useTravel} from './TravelContext';
import './aly.css';

type Message={id:string;role:'user'|'assistant';text:string;link?:{label:string;path:string}};
export function AlyAssistant(){
 const {pathname,search}=useLocation();const navigate=useNavigate();const {plan,expenses}=useTravel();
 const guide=lumiGuideFor(pathname);
 const [seenGuides,setSeenGuides]=useStored<Record<string,boolean>>('travaiy-lumi-guides-v2',{});
 const [guideOpen,setGuideOpen]=useState(()=>!!guide&&!seenGuides[guide.id]);
 // Re-evaluate on navigation; the assistant stays mounted between pages.
 useEffect(()=>{setGuideOpen(!!guide&&!seenGuides[guide.id]);},[guide?.id,seenGuides]);
 const closeGuide=useCallback(()=>{if(guide)setSeenGuides(previous=>({...previous,[guide.id]:true}));setGuideOpen(false);},[guide?.id,setSeenGuides]);
 const [open,setOpen]=useState(false);const [draft,setDraft]=useState('');
 const [conversations,setConversations]=useStored<Record<string,Message[]>>('travaiy-aly-conversations-v1',{});
 const messages=conversations[plan.id]||[];const end=useRef<HTMLDivElement>(null);const close=useCallback(()=>setOpen(false),[]);

 // Draggable state for Lumi floating launcher
 const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
 const [isDragging, setIsDragging] = useState(false);
 const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0, moved: false });
 const launcherRef = useRef<HTMLButtonElement>(null);

 const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
  if (e.button !== 0) return;
  dragRef.current = {
   startX: e.clientX,
   startY: e.clientY,
   initialX: dragOffset.x,
   initialY: dragOffset.y,
   moved: false,
  };
  setIsDragging(true);

  const onPointerMove = (ev: PointerEvent) => {
   const dx = ev.clientX - dragRef.current.startX;
   const dy = ev.clientY - dragRef.current.startY;
   if (Math.hypot(dx, dy) > 5) {
    dragRef.current.moved = true;
   }
   const container = launcherRef.current?.closest('.travel-device') as HTMLElement | null;
   let minX = -260;
   let maxX = 5;
   let minY = -650;
   let maxY = 70;

   if (container) {
    const rect = container.getBoundingClientRect();
    minX = -(rect.width - 125);
    maxX = 5;
    minY = -(rect.height - 170);
    maxY = 70;
   }

   const clampedX = Math.min(maxX, Math.max(minX, dragRef.current.initialX + dx));
   const clampedY = Math.min(maxY, Math.max(minY, dragRef.current.initialY + dy));
   setDragOffset({ x: clampedX, y: clampedY });
  };

  const onPointerUp = () => {
   setIsDragging(false);
   window.removeEventListener('pointermove', onPointerMove);
   window.removeEventListener('pointerup', onPointerUp);
  };

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
 };

 const handleLauncherClick = (e: React.MouseEvent) => {
  if (dragRef.current.moved) {
   e.preventDefault();
   e.stopPropagation();
   return;
  }
  setOpen(true);
 };
 const dayNumber=Number(pathname.match(/\/trip\/(?:day|edit)\/(\d+)/)?.[1]||new URLSearchParams(search).get('day'))||1;
 const day=plan.daysSchedule.find(value=>value.dayNumber===dayNumber)||plan.daysSchedule[0];
 const area=pathname.includes('expenses')?'Chi tiêu':pathname.includes('journal')||pathname.includes('recap')?'Kỷ niệm':pathname.includes('route')||pathname==='/map'?'Bản đồ':pathname.includes('/group')?'Không gian nhóm':pathname.includes('/day')?'Lịch trình':pathname.startsWith('/explore')?'Khám phá':'Chuyến đi';
 const prompts=area==='Chi tiêu'?['Đã chi bao nhiêu?','Xem lịch trình hôm nay']:area==='Bản đồ'?['Xem tuyến ngày này','Lịch ngày này có gì?']:area==='Kỷ niệm'?['Mở album chuyến đi','Xem lịch trình hôm nay']:['Lịch ngày này có gì?','Chiều mưa thì sao?','Đã chi bao nhiêu?'];
 useEffect(()=>{if(open)end.current?.scrollIntoView({block:'end'});},[open,messages.length]);
 const ask=(value:string)=>{
  const question=value.trim();if(!question)return;
  let answer:Omit<Message,'id'|'role'>;
  if(/mưa|đổi lịch|nghỉ ngơi|khởi hành trễ/i.test(question)){
   answer={text:'Bạn có thể xem phương án thay điểm ngoài trời, nghỉ ngơi hoặc xuất phát trễ trong lịch trình. Lumi sẽ giữ các giờ ăn và hoạt động đã khóa. Mở lịch rồi chọn tình huống để xem thay đổi trước khi áp dụng.',link:{label:'Xem điều chỉnh lịch',path:`/trip/day/${dayNumber}`}};
  }else if(/chi|ngân sách|tiền/i.test(question)){
   const total=expenses.filter(item=>item.tripId===plan.id).reduce((sum,item)=>sum+item.amount,0);
   answer={text:`Chuyến ${plan.destination} đã ghi nhận ${total.toLocaleString('vi-VN')}đ chi tiêu cá nhân và nhóm. ${total===0?'Bạn chưa ghi khoản chi nào.':'Đây là tổng các khoản đã nhập, chưa phải số tiền riêng bạn cần trả.'}`,link:{label:'Xem sổ chi tiêu',path:'/trip/expenses'}};
  }else if(/bản đồ|tuyến|chỉ đường|map/i.test(question)){
   answer={text:`Mình sẽ mở tuyến ngày ${dayNumber} theo các điểm trong lịch ${plan.destination}. Tại bản đồ bạn có thể mở chỉ đường trên Google Maps.`,link:{label:`Mở bản đồ ngày ${dayNumber}`,path:`/trip/route?day=${dayNumber}`}};
  }else if(/ảnh|album|kỷ niệm|recap/i.test(question)){
   answer={text:`Ảnh và kỷ niệm chuyến ${plan.destination} nằm trong album. Bạn có thể thêm ảnh, chụp check-in hoặc tạo recap tại đó.`,link:{label:'Mở kỷ niệm',path:'/trip/journal'}};
  }else if(/nhóm|chat|thành viên/i.test(question)){
   answer={text:'Mở không gian nhóm để trao đổi, xem lịch chung, bình chọn và quản lý chi tiêu.',link:{label:'Mở không gian nhóm',path:'/trip/group'}};
  }else if(/lịch|hôm nay|ngày này/i.test(question)){
   answer={text:day?.items.length?`Ngày ${day.dayNumber} · ${day.title}\n${day.items.map(item=>`${item.time} — ${item.placeName}`).join('\n')}`:'Ngày này chưa có hoạt động. Bạn có thể bổ sung trong lịch trình.',link:{label:'Mở lịch trình',path:`/trip/day/${dayNumber}`}};
  }else{
   answer={text:`Mình đang ở mục ${area.toLocaleLowerCase('vi-VN')} cùng bạn, trong chuyến ${plan.destination}. Bản trải nghiệm hiện hỗ trợ xem lịch, tra chi tiêu, mở bản đồ, nhóm và album. Bạn thử một gợi ý bên dưới nhé.`};
  }
  setConversations(previous=>({...previous,[plan.id]:[...(previous[plan.id]||[]),{id:crypto.randomUUID(),role:'user',text:question},{id:crypto.randomUUID(),role:'assistant',...answer}]}));setDraft('');
 };
 return <>
  <button
   ref={launcherRef}
   type="button"
   className={`aly-launcher ${isDragging ? 'is-dragging' : ''}`}
   aria-label="Hỏi Lumi — trợ lý chuyến đi (Kéo thả để di chuyển)"
   aria-haspopup="dialog"
   aria-expanded={open}
   style={{
     transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
     touchAction: 'none',
   }}
   onPointerDown={handlePointerDown}
   onClick={handleLauncherClick}
  >
   <GripVertical size={13} className="text-slate-400 -mr-0.5 opacity-60" />
   <img src="/images/mascot-thinking.png" alt="" draggable={false} />
   <span>Hỏi Lumi</span>
   <MessageCircle size={14}/>
  </button>
  <ModalSheet isOpen={open} onClose={close} title="Lumi — trợ lý chuyến đi" className="aly-overlay" contentClassName="aly-panel" showHandleBar={false}>
   <header className="aly-header"><img src="/images/mascot-thinking.png" alt=""/><div><h2>Lumi ở đây cùng bạn</h2><p>Trợ lý chuyến đi · Bản trải nghiệm</p></div><button type="button" aria-label="Thu gọn Lumi" onClick={close}><Minus size={21}/></button></header>
   <div className="aly-context"><span/>{plan.destination} · {area}{['Lịch trình','Bản đồ'].includes(area)?` · Ngày ${dayNumber}`:''}</div>
   {guide&&<button type="button" className="aly-guide-replay" onClick={()=>{setOpen(false);setGuideOpen(true);}}><Sparkles size={16}/>Xem hướng dẫn trang này</button>}
   <div className="aly-messages" role="log" aria-label="Hội thoại với Lumi" aria-live="polite">
    {!messages.length&&<div className="aly-welcome"><Sparkles size={24}/><h3>Bạn muốn làm gì tiếp theo?</h3><p>Xem lịch, tra chi tiêu hay tìm đường — mình đã biết chuyến đi bạn đang xem.</p></div>}
    {messages.map(message=><article key={message.id} className={`aly-message ${message.role}`}><small>{message.role==='assistant'?'Lumi':'Bạn'}</small><p>{message.role==='assistant'?message.text.replace(/\bAly\b/g,'Lumi'):message.text}</p>{message.link&&<button type="button" onClick={()=>{navigate(message.link!.path);close();}}>{message.link.label}<ArrowUpRight size={15}/></button>}</article>)}<div ref={end}/>
   </div>
   <div className="aly-prompts" aria-label="Gợi ý hỏi Lumi">{prompts.map(prompt=><button type="button" key={prompt} onClick={()=>ask(prompt)}>{prompt}</button>)}</div>
   <form className="aly-composer" onSubmit={event=>{event.preventDefault();ask(draft);}}><label className="sr-only" htmlFor="aly-message">Hỏi Lumi</label><input id="aly-message" autoComplete="off" placeholder="Hỏi Lumi về chuyến đi…" maxLength={1000} value={draft} onChange={event=>setDraft(event.target.value)}/><button type="submit" aria-label="Gửi câu hỏi cho Lumi" disabled={!draft.trim()}><ArrowUp size={19}/></button></form>
  </ModalSheet>
  {guide&&guideOpen&&<LumiGuide key={guide.id} guide={guide} onClose={closeGuide}/>}
 </>;
}
