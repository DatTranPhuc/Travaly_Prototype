export const money=(value:number)=>`${Math.round(value).toLocaleString('vi-VN')}đ`;
export const localDate=(value=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(value);
export function dateLabel(value:string){const key=value.includes('/')?value.split('/').reverse().join('-'):value;const date=new Date(`${key}T12:00:00+07:00`);return Number.isNaN(date.getTime())?'Chưa chọn ngày':new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'Asia/Ho_Chi_Minh'}).format(date);}
export const timeLabel=(value:string)=>/^\d{2}:\d{2}$/.test(value)?value:'--:--';
