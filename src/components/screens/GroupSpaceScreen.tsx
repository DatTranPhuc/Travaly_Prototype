import {useTravel} from '../../features/travel/TravelContext';
import {TravelHeader,Pill} from '../../features/travel/UI';
import {TripWorkspaceNav} from '../../features/travel/TripWorkspaceNav';
import {money} from '../../features/travel/format';
interface Props{onBack:()=>void;onOpenPoll:()=>void;onOpenChat:()=>void;onOpenLocation:()=>void;onOpenExpenseSplit:()=>void;onOpenSchedule:()=>void}
export function GroupSpaceScreen(p:Props){
 const {plan,members,expenses,tripVotes}=useTravel();const total=expenses.filter(e=>e.tripId===plan.id&&e.scope==='group').reduce((s,e)=>s+e.amount,0);
 return <div className="travel-screen"><TravelHeader title="Nhóm chuyến đi" subtitle={plan.title} onBack={p.onBack}/><TripWorkspaceNav/><main className="travel-scroll polish-stack"><section className="polish-card"><h2>{members.length} thành viên · {money(total)} đã chi chung</h2><p>{plan.dates}</p><div className="core-members">{members.map(m=><span key={m.id} style={{background:m.color}}>{m.name}</span>)}</div><small>Thông tin lưu trên thiết bị này; chưa đồng bộ với điện thoại khác.</small></section><Pill onClick={p.onOpenPoll}>Bình chọn · {Object.keys(tripVotes).filter(id=>members.some(m=>m.id===id)).length}/{members.length} người đã chọn</Pill><Pill secondary onClick={p.onOpenExpenseSplit}>Chia tiền và quyết toán · {money(total)}</Pill><Pill secondary onClick={p.onOpenSchedule}>Xem lịch chung</Pill><details className="polish-card"><summary>Công cụ bổ sung</summary><button className="travel-pill secondary mt-3" onClick={p.onOpenChat}>Nhắn tin</button><button className="travel-pill secondary mt-3" onClick={p.onOpenLocation}>Vị trí minh hoạ</button></details></main></div>;
}
