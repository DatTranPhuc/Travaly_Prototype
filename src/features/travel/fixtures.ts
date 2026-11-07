import { MOCK_TRIP } from '../../data/mockData';
import type { ActivePlan, GeoPoint, PhotoMoment, Stay } from './model';
export const images = { hero:'/images/vietnam-hero.png',room:'/images/room.jpg',room2:'/images/room2.jpg',resort:'/images/resort.jpg',beach:'/images/beach.jpg',bridge:'/images/bridge.jpg',bay:'/images/bay.jpg',food:'/images/food.jpg',town:'/images/town.png',dalatCabin:'/images/dalat-cabin.jpg' };
// Fictional properties and sample prices; approximate map coordinates for an interactive reference.
export const STAYS:Stay[]=[
 {id:'saigon-river-hotel',name:'Saigon Riverfront Boutique',area:'Quận 1 · TP. Hồ Chí Minh',type:'Khách sạn',price:950000,rating:4.8,image:images.room,gallery:[images.room,images.room2],location:{lat:10.7769,lng:106.7009},amenities:['Gần phố đi bộ','Hồ bơi sân thượng','Ăn sáng','Wi-Fi'],description:'Khách sạn boutique sang trọng ngay trung tâm Quận 1, bước vài bước ra phố đi bộ Nguyễn Huệ và bến Bạch Đằng.'},
 {id:'ben-thanh-homestay',name:'Bến Thành Heritage House',area:'Quận 1 · TP. Hồ Chí Minh',type:'Homestay',price:620000,rating:4.7,image:images.room2,gallery:[images.room2,images.room],location:{lat:10.7725,lng:106.6980},amenities:['Trung tâm','Bếp riêng','Wi-Fi','Ban công ngắm phố'],description:'Căn hộ homestay phong cách Sài Gòn xưa ấm cúng, view phố cổ kính và tiện di chuyển ăn uống.'},
 {id:'thao-dien-oasis',name:'Thảo Điền Oasis Retreat',area:'TP. Thủ Đức · TP. Hồ Chí Minh',type:'Resort',price:1850000,rating:4.9,image:images.resort,gallery:[images.resort,images.room],location:{lat:10.8034,lng:106.7321},amenities:['Hồ bơi nhiệt đới','Sân vườn ven sông','Spa','Ăn sáng'],description:'Không gian nghỉ dưỡng thanh bình ven sông Sài Gòn, tách biệt khỏi sự nhộn nhịp của trung tâm đô thị.'},
 {id:'vungtau-ocean-hotel',name:'Mây Biển Vũng Tàu Hotel',area:'Bãi Sau · Vũng Tàu',type:'Khách sạn',price:820000,rating:4.8,image:images.beach,gallery:[images.beach,images.room],location:{lat:10.3392,lng:107.0843},amenities:['View biển','Hồ bơi','Gần bãi tắm','Wi-Fi'],description:'Khách sạn hiện đại ngay mặt tiền Bãi Sau, chỉ cách bờ cát vài bước chân, thuận tiện tắm biển và ăn hải sản.'},
 {id:'nghinh-phong-homestay',name:'Nghinh Phong Sunset Villa',area:'Bãi Trước · Vũng Tàu',type:'Homestay',price:590000,rating:4.7,image:images.room2,gallery:[images.room2,images.beach],location:{lat:10.3341,lng:107.0735},amenities:['View hoàng hôn biển','Gần hải đăng','Sân BBQ','Wi-Fi'],description:'Homestay xinh xắn view trọn biển Bãi Trước, ngắm hoàng hôn đỏ ửng buông trên mặt biển Vũng Tàu.'},
 {id:'hai-dang-hillside',name:'Hải Đăng Hillside Resort',area:'Núi Nhỏ · Vũng Tàu',type:'Resort',price:1650000,rating:4.9,image:images.resort,gallery:[images.resort,images.beach],location:{lat:10.3312,lng:107.0768},amenities:['Trên đồi ngắm biển','Hồ bơi vô cực','Ăn sáng','Spa'],description:'Resort sang trọng lưng chừng Núi Nhỏ với hồ bơi vô cực ngắm trọn eo biển Vũng Tàu xanh biếc.'},
 {id:'may-bien',name:'Mây Biển Retreat',area:'Bãi biển Mỹ Khê · Đà Nẵng',type:'Khách sạn',price:1250000,rating:4.8,image:images.room,gallery:[images.room,images.resort,images.room2],location:{lat:16.0544,lng:108.2471},amenities:['Hồ bơi','Gần biển','Ăn sáng','Wi-Fi'],description:'Một chỗ nghỉ sáng thoáng gần biển, thuận tiện cho những buổi sáng dạo bờ cát và khám phá thành phố.'},
 {id:'nha-ben-song',name:'Nhà bên sông Hàn',area:'Hải Châu · Đà Nẵng',type:'Homestay',price:720000,rating:4.7,image:images.room2,gallery:[images.room2,images.room,images.resort],location:{lat:16.0712,lng:108.2235},amenities:['Bếp riêng','Gần trung tâm','Wi-Fi','Ban công'],description:'Căn phòng ấm áp gần sông Hàn, phù hợp nếu bạn thích đi bộ, ghé quán nhỏ và khám phá nhịp sống đô thị.'},
 {id:'son-tra-garden',name:'Sơn Trà Garden',area:'Bán đảo Sơn Trà · Đà Nẵng',type:'Resort',price:2180000,rating:4.9,image:images.resort,gallery:[images.resort,images.room,images.room2],location:{lat:16.102,lng:108.275},amenities:['Vườn riêng','Hồ bơi','Bãi biển','Ăn sáng'],description:'Không gian nghỉ dưỡng yên tĩnh bên sườn núi, dành cho những ngày muốn dành thêm thời gian cho thiên nhiên.'},
 {id:'nha-thong-nho',name:'Nhà Thông Nhỏ',area:'Đồi thông · Đà Lạt',type:'Homestay',price:680000,rating:4.8,image:images.dalatCabin,gallery:[images.dalatCabin,images.room2,images.room],location:{lat:11.964,lng:108.438},amenities:['View đồi thông','Vườn nhỏ','Wi-Fi','Bếp chung'],description:'Căn nhà gỗ nhỏ giữa đồi thông, có góc ngồi nhìn ra vườn và không gian ấm áp cho những buổi tối se lạnh. Chỗ ở hư cấu để minh họa giao diện.'},
 {id:'may-doi-stay',name:'Mây Đồi Stay',area:'Gần hồ Xuân Hương · Đà Lạt',type:'Khách sạn',price:820000,rating:4.7,image:images.room2,gallery:[images.room2,images.room,images.dalatCabin],location:{lat:11.943,lng:108.445},amenities:['Gần trung tâm','Ăn sáng','Wi-Fi','Chỗ đỗ xe'],description:'Phòng nghỉ sáng thoáng, thuận tiện đi dạo quanh hồ và ghé các quán cà phê trong thành phố. Tên, ảnh và giá là dữ liệu mẫu.'},
 {id:'vuon-suong-retreat',name:'Vườn Sương Retreat',area:'Khu vườn trên đồi · Đà Lạt',type:'Resort',price:1350000,rating:4.9,image:images.room,gallery:[images.room,images.dalatCabin,images.room2],location:{lat:11.952,lng:108.466},amenities:['Vườn riêng','Ban công','Ăn sáng','Wi-Fi'],description:'Không gian nghỉ dưỡng yên tĩnh với phòng tông gỗ, cửa sổ lớn và vườn nhỏ. Đây là chỗ nghỉ hư cấu, chưa có thông tin phòng trống thực tế.'},
 {id:'pho-hoi-stay',name:'Phố Hội Stay',area:'Trung tâm · Hội An',type:'Khách sạn',price:650000,rating:4.7,image:images.town,gallery:[images.town,images.room],location:{lat:15.88,lng:108.33},amenities:['Wi-Fi','Chỗ đỗ xe','Ăn sáng'],description:'Chỗ ở hư cấu trong bộ dữ liệu mẫu để thử lập lịch trình tại Hội An. Chưa có đặt phòng thật.'},
 {id:'bien-xanh-stay',name:'Biển Xanh Stay',area:'Trung tâm · Nha Trang',type:'Khách sạn',price:650000,rating:4.7,image:images.beach,gallery:[images.beach,images.room],location:{lat:12.24,lng:109.19},amenities:['Wi-Fi','Chỗ đỗ xe','Ăn sáng'],description:'Chỗ ở hư cấu trong bộ dữ liệu mẫu để thử lập lịch trình tại Nha Trang. Chưa có đặt phòng thật.'},
 {id:'dao-nang-stay',name:'Đảo Nắng Retreat',area:'Trung tâm · Phú Quốc',type:'Khách sạn',price:650000,rating:4.7,image:images.resort,gallery:[images.resort,images.room],location:{lat:10.21,lng:103.96},amenities:['Wi-Fi','Chỗ đỗ xe','Ăn sáng'],description:'Chỗ ở hư cấu trong bộ dữ liệu mẫu để thử lập lịch trình tại Phú Quốc. Chưa có đặt phòng thật.'},
 {id:'may-sapa-stay',name:'Mây Sapa Stay',area:'Trung tâm · Sapa',type:'Khách sạn',price:650000,rating:4.7,image:images.room2,gallery:[images.room2,images.room],location:{lat:22.33,lng:103.84},amenities:['Wi-Fi','Chỗ đỗ xe','Ăn sáng'],description:'Chỗ ở hư cấu trong bộ dữ liệu mẫu để thử lập lịch trình tại Sapa. Chưa có đặt phòng thật.'},
 {id:'song-huong-stay',name:'Sông Hương Stay',area:'Trung tâm · Huế',type:'Khách sạn',price:650000,rating:4.7,image:images.room,gallery:[images.room,images.room],location:{lat:16.46,lng:107.59},amenities:['Wi-Fi','Chỗ đỗ xe','Ăn sáng'],description:'Chỗ ở hư cấu trong bộ dữ liệu mẫu để thử lập lịch trình tại Huế. Chưa có đặt phòng thật.'},
 {id:'trang-an-stay',name:'Tràng An Stay',area:'Trung tâm · Ninh Bình',type:'Khách sạn',price:650000,rating:4.7,image:images.bay,gallery:[images.bay,images.room],location:{lat:20.25,lng:105.98},amenities:['Wi-Fi','Chỗ đỗ xe','Ăn sáng'],description:'Chỗ ở hư cấu trong bộ dữ liệu mẫu để thử lập lịch trình tại Ninh Bình. Chưa có đặt phòng thật.'},
];
const points:Record<string,GeoPoint>={ 'item-1':{lat:16.0606,lng:108.2202},'item-2':{lat:16.0544,lng:108.2471},'item-3':{lat:16.0815,lng:108.255},'item-4':{lat:16.1089,lng:108.2779},'item-5':{lat:16.0611,lng:108.2277},'item-2-1':{lat:15.9961,lng:107.9965},'item-2-2':{lat:15.9974,lng:107.989},'item-3-1':{lat:15.877,lng:108.326},'item-3-2':{lat:15.879,lng:108.33}};
export const INITIAL_PLAN:ActivePlan={...MOCK_TRIP,coverImage:images.bridge,dates:'16–18/10/2026',daysSchedule:MOCK_TRIP.daysSchedule.map((d,index)=>({...d,dateText:`${16+index}/10`,items:d.items.map(i=>({...i,location:points[i.id],locked:/Ăn|Buffet|Cao Lầu/.test(i.placeName),image:/Bà Nà|Vàng/.test(i.placeName)?images.bridge:/biển/i.test(i.placeName)?images.beach:/Ăn|Buffet|Cao Lầu/.test(i.placeName)?images.food:/Hội An/.test(i.placeName)?images.town:images.bay}))}))};

export const SAIGON_PLAN: ActivePlan = {
  id: 'trip-tphcm-3n2d',
  destination: 'TP. Hồ Chí Minh',
  title: 'TP. Hồ Chí Minh 3N2Đ',
  days: 3,
  dates: '16–18/10/2026',
  coverImage: images.town,
  estimatedCostPerPerson: '2.500.000đ / người',
  stayId: 'saigon-river-hotel',
  daysSchedule: [
    {
      dayNumber: 1,
      dateText: '16/10',
      title: 'Trung tâm lịch sử & Phố đi bộ',
      dayCost: '130.000đ',
      items: [
        { id: 'sg-1', placeName: 'Ăn sáng - Cơm tấm Ba Ghiền', category: 'Ăn sáng', time: '07:30', duration: '1 giờ', cost: '65.000đ', note: 'Sườn nướng than hoa trứ danh Sài Gòn', location: { lat: 10.7932, lng: 106.6698 }, locked: true, image: images.food },
        { id: 'sg-2', placeName: 'Dinh Độc Lập', category: 'Tham quan', time: '09:00', duration: '2 giờ', cost: '65.000đ', note: 'Di tích lịch sử và biểu tượng kiến trúc', location: { lat: 10.7769, lng: 106.6953 }, locked: false, image: images.town },
        { id: 'sg-3', placeName: 'Bưu điện Trung tâm & Nhà thờ Đức Bà', category: 'Tham quan', time: '14:30', duration: '1.5 giờ', cost: 'Miễn phí', note: 'Check-in góc phố cổ kính phong cách Pháp', location: { lat: 10.7798, lng: 106.6999 }, locked: false, image: images.town },
        { id: 'sg-4', placeName: 'Phố đi bộ Nguyễn Huệ & Bến Bạch Đằng', category: 'Buổi tối', time: '18:00', duration: '2 giờ', cost: 'Miễn phí', note: 'Dạo mát buổi tối, ngắm du thuyền lung linh', location: { lat: 10.7743, lng: 106.7032 }, locked: false, image: images.bridge }
      ]
    },
    {
      dayNumber: 2,
      dateText: '17/10',
      title: 'Hiện đại & Mua sắm check-in',
      dayCost: '450.000đ',
      items: [
        { id: 'sg-5', placeName: 'Landmark 81 Skyview', category: 'Tham quan', time: '09:00', duration: '2 giờ', cost: '300.000đ', note: 'Ngắm toàn cảnh thành phố từ tầng cao nhất', location: { lat: 10.795, lng: 106.7219 }, locked: false, image: images.bridge },
        { id: 'sg-6', placeName: 'Chợ Bến Thành & Cà phê chung cư', category: 'Tham quan', time: '14:00', duration: '2.5 giờ', cost: '150.000đ', note: 'Dạo chợ lâu đời và cà phê ngắm phố', location: { lat: 10.7725, lng: 106.698 }, locked: false, image: images.room2 }
      ]
    },
    {
      dayNumber: 3,
      dateText: '18/10',
      title: 'Văn hóa Chợ Lớn & Sông Sài Gòn',
      dayCost: '150.000đ',
      items: [
        { id: 'sg-7', placeName: 'Chợ Lớn & Chùa Bà Thiên Hậu', category: 'Văn hóa', time: '08:30', duration: '2 giờ', cost: '120.000đ', note: 'Chiêm bái chùa cổ và thưởng thức điểm sấm', location: { lat: 10.7533, lng: 106.6601 }, locked: false, image: images.town },
        { id: 'sg-8', placeName: 'Du thuyền buýt Saigon Waterbus', category: 'Tham quan', time: '16:00', duration: '1.5 giờ', cost: '30.000đ', note: 'Ngắm hoàng hôn trên sông lãng mạn', location: { lat: 10.7711, lng: 106.7061 }, locked: false, image: images.bay }
      ]
    }
  ]
};
export const SAMPLE_PHOTOS:PhotoMoment[]=[
 {id:'p1',tripId:MOCK_TRIP.id,src:images.beach,title:'Một buổi chiều bên biển',region:'Đà Nẵng',date:'16/10/2026',location:points['item-2'],isSample:true},
 {id:'p2',tripId:MOCK_TRIP.id,src:images.bridge,title:'Giữa mây trời Bà Nà',region:'Đà Nẵng',date:'17/10/2026',location:points['item-2-1'],isSample:true},
 {id:'p3',tripId:MOCK_TRIP.id,src:images.town,title:'Dạo phố lúc lên đèn',region:'Hội An',date:'18/10/2026',location:points['item-3-1'],isSample:true},
 {id:'p4',tripId:MOCK_TRIP.id,src:images.food,title:'Một hương vị muốn nhớ',region:'Đà Nẵng',date:'16/10/2026',location:points['item-3'],isSample:true},
 {id:'p5',tripId:'sample-north',src:images.hero,title:'Miền vịnh trong nắng sớm',region:'Miền Bắc',date:'04/09/2026',location:{lat:20.91,lng:107.17},isSample:true},
 {id:'p6',tripId:'sample-north',src:images.bay,title:'Theo một con thuyền nhỏ',region:'Miền Bắc',date:'04/09/2026',location:{lat:20.94,lng:107.12},isSample:true},
 {id:'p7',tripId:'sample-south',src:images.beach,title:'Ngày nắng ở đảo',region:'Phú Quốc',date:'06/08/2026',location:{lat:10.11,lng:103.99},isSample:true},
];
export const SAMPLE_MEMBERS=[{id:'minhanh',name:'Minh Anh',initials:'MA',color:'#7564c4',location:{lat:16.072,lng:108.242},updated:'5 phút trước'},{id:'linhchi',name:'Linh Chi',initials:'LC',color:'#b77856',location:{lat:16.062,lng:108.227},updated:'12 phút trước'}];
