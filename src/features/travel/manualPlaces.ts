import {MOCK_PLACES} from '../../data/mockData';
import {INITIAL_PLAN,images} from './fixtures';
import type {GeoPoint} from './model';
export type ManualPlace={id:string;name:string;category:string;image:string;address:string;location?:GeoPoint;duration?:string};
// Approximate coordinates and illustrative images for offline prototype selection.
const extra:Record<string,[string,number,number,string][]>={
 'TP. Hồ Chí Minh':[['Dinh Độc Lập',10.7769,106.6953,images.town],['Chợ Bến Thành',10.7725,106.698,images.food],['Phố đi bộ Nguyễn Huệ',10.7743,106.7032,images.room2],['Landmark 81 Skyview',10.795,106.7219,images.bridge],['Bưu điện Trung tâm Sài Gòn',10.7798,106.6999,images.town]],
 'Vũng Tàu':[['Tượng Chúa Kông Kito Vua',10.3262,107.0847,images.hero],['Ngọn Hải Đăng Vũng Tàu',10.3338,107.0762,images.bay],['Bãi Sau Vũng Tàu',10.3392,107.0843,images.beach],['Mũi Nghinh Phong',10.3235,107.0832,images.beach],['Bánh khọt Gốc Vú Sữa',10.3458,107.0782,images.food]],
 'Hội An':[['Chùa Cầu',15.877,108.326,images.town],['Phố cổ Hội An',15.879,108.33,images.town],['Biển An Bàng',15.913,108.339,images.beach]],
 'Nha Trang':[['Bãi biển Trần Phú',12.238,109.198,images.beach],['Tháp Bà Ponagar',12.265,109.195,images.hero],['Chợ Đầm',12.255,109.189,images.food]],
 'Phú Quốc':[['Bãi Sao',10.055,104.035,images.beach],['Chợ đêm Phú Quốc',10.217,103.96,images.food],['Dinh Cậu',10.219,103.957,images.resort]],
 'Sapa':[['Bản Cát Cát',22.336,103.823,images.hero],['Nhà thờ đá Sapa',22.336,103.843,images.room2],['Thung lũng Mường Hoa',22.303,103.87,images.bay]],
 'Huế':[['Đại Nội Huế',16.469,107.578,images.hero],['Chùa Thiên Mụ',16.454,107.544,images.bay],['Chợ Đông Ba',16.473,107.586,images.food]],
 'Ninh Bình':[['Tràng An',20.25,105.917,images.bay],['Hang Múa',20.23,105.937,images.hero],['Tam Cốc',20.216,105.938,images.bay]],
};
export function manualPlacesFor(city:string):ManualPlace[]{
 const center:Record<string,[number,number]>={'TP. Hồ Chí Minh':[10.7769,106.7009],'Hồ Chí Minh':[10.7769,106.7009],'Sài Gòn':[10.7769,106.7009],'Vũng Tàu':[10.346,107.084],'Đà Nẵng':[16.066,108.224],'Đà Lạt':[11.943,108.445],'Hội An':[15.879,108.33],'Nha Trang':[12.24,109.19],'Phú Quốc':[10.217,103.96],'Sapa':[22.336,103.843],'Huế':[16.469,107.578],'Ninh Bình':[20.25,105.937]};
 const point=center[city];
 const additional:ManualPlace[]=point?[{id:`food-${city}`,name:`Thưởng thức ẩm thực ${city}`,category:'Ăn uống',image:images.food,address:city,location:{lat:point[0],lng:point[1]},duration:'1 giờ'},{id:`experience-${city}`,name:`Trải nghiệm địa phương ${city}`,category:'Trải nghiệm',image:city==='Đà Lạt'?images.dalatCabin:images.bay,address:city,location:{lat:point[0]+.005,lng:point[1]+.005},duration:'2 giờ'}]:[];
 const existing=MOCK_PLACES.filter(p=>p.city===city).map(p=>({id:p.id,name:p.name,category:p.category,image:p.images[0],address:p.address,location:p.coordinates?.lat!==undefined&&p.coordinates.lng!==undefined?{lat:p.coordinates.lat,lng:p.coordinates.lng}:undefined}));
 if(city==='Đà Nẵng')return [...INITIAL_PLAN.daysSchedule.slice(0,2).flatMap(d=>d.items).filter(i=>i.location).map(i=>({id:i.id,name:i.placeName,category:i.category,image:i.image||images.bridge,address:city,location:i.location,duration:i.duration})),...additional];
 return [...existing,...(extra[city]||[]).map(([name,lat,lng,image],index)=>({id:`manual-${city}-${index}`,name,category:'Tham quan',image,address:city,location:{lat,lng}})),...additional];
}
