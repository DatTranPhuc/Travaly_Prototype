// Individual padded cutouts from the user-supplied sheets; no generated or redrawn artwork.
const pose=(sheet:'a'|'b',column:number,row:number,label:string)=>({src:`/images/lumi-guides/pose-${sheet}-${row*3+column}.png`,label});
export const LUMI_GUIDE_ACTIONS={
 tour:pose('a',0,0,'đeo kính râm và cầm gậy hướng dẫn'),
 map:pose('a',1,0,'cầm bản đồ và gậy hướng dẫn'),
 safari:pose('a',2,0,'đội mũ du lịch, đeo ba lô và cầm gậy'),
 localGuide:pose('a',0,1,'đội nón lá, quàng khăn xanh và cầm gậy'),
 idea:pose('a',1,1,'khoác áo choàng với bóng đèn ý tưởng'),
 announce:pose('a',2,1,'đeo kính và cầm loa thông báo'),
 pin:pose('b',0,0,'chỉ ghim vị trí trên bản đồ'),
 laptop:pose('b',1,0,'đeo kính và làm việc trên laptop'),
 route:pose('b',2,0,'đội nón lá và chỉ đường trên bảng bản đồ'),
 hiking:pose('b',0,1,'đeo ba lô và bước đi cùng gậy hướng dẫn'),
 celebrate:pose('b',1,1,'ăn mừng trên đỉnh núi bên cờ xanh'),
 reading:pose('b',2,1,'đọc sách bên quả địa cầu'),
 // Semantic aliases keep existing guide definitions readable, using only the supplied poses.
 clock:pose('b',1,0,'xem kế hoạch trên laptop'),
 wave:pose('a',0,0,'chào bạn cùng gậy hướng dẫn'),
 budget:pose('b',1,0,'kiểm tra chi phí trên laptop'),
 hotel:pose('a',2,0,'chuẩn bị chỗ nghỉ cho hành trình'),
 heart:pose('a',1,1,'gợi ý ý tưởng cho chuyến đi'),
 checklist:pose('b',2,1,'đọc thông tin chuẩn bị chuyến đi'),
 search:pose('b',0,0,'tìm điểm đến trên bản đồ'),
 suitcase:pose('b',0,1,'đeo ba lô sẵn sàng khởi hành'),
 ticket:pose('b',2,1,'xem thông tin hành trình'),
 camera:pose('a',0,0,'đồng hành lưu lại kỷ niệm'),
 album:pose('b',2,1,'xem lại những kỷ niệm'),
 chat:pose('a',2,1,'cầm loa trao đổi cùng nhóm'),
} as const;
export type LumiGuideAction=keyof typeof LUMI_GUIDE_ACTIONS;
export type LumiGuide = {id:string;name:string;action:LumiGuideAction;steps:{title:string;text:string;action?:LumiGuideAction}[]};
const stepActions:Record<string,LumiGuideAction[]>={
 'wizard-destination':['pin','map'], 'wizard-places':['map','route'],
 'wizard-dates':['laptop','route'], 'wizard-companions':['announce','laptop'],
 'wizard-budget':['laptop','reading'], 'wizard-stay':['safari','reading'],
 'wizard-preferences':['idea','laptop'], 'wizard-summary':['laptop','route'],
 'wizard-subscription':['reading','idea'], 'wizard-refine':['idea','laptop'],
 home:['localGuide','map','announce'],explore:['pin','reading'],stays:['safari','reading'],
 trips:['hiking','tour'],overview:['localGuide','route'],itinerary:['route','laptop'],
 map:['pin','route'],expenses:['laptop','announce'],preparation:['hiking','reading'],
 camera:['tour','celebrate'],memories:['reading','celebrate'],group:['announce','hiking'],
 wallet:['reading','laptop'],community:['announce','tour'],profile:['tour','idea'],
 proposal:['laptop','idea'],manual:['route','reading'],subscription:['reading','celebrate'],today:['hiking','route'], 'memory-map':['pin','reading'],
};
const guide=(id:string,name:string,action:LumiGuideAction,steps:[string,string][]):LumiGuide=>({id,name,action,steps:steps.map(([title,text],index)=>({title,text,action:stepActions[id]?.[index]||action}))});
export function lumiGuideFor(path:string):LumiGuide|null {
 const wizard=path.split('/wizard/')[1];
 const wizardSteps:Record<string,[string,string]>={destination:['Đi đâu, khi nào?','Chọn điểm đến và khoảng ngày. Bước tiếp theo vẫn có danh sách nơi muốn ghé để bạn lựa chọn.'],places:['Chọn địa điểm bạn thích','Dùng danh mục hoặc tìm theo tên. Chạm để chọn hoặc bỏ chọn địa điểm; bạn chưa cần xếp theo ngày.'],dates:['Chọn ngày và giờ','Chọn ngày đi, ngày về rồi mở từng ô giờ. Chọn giờ 1–12, phút và AM/PM, nhấn Xong để lưu.'],companions:['Người đi và ngân sách','Chọn đi một mình hoặc theo nhóm, số người và ngân sách mỗi người. Tiếp tục để xem và chọn khách sạn theo ngân sách trước khi tạo lịch.'],budget:['Dự tính chi phí','Chọn mức ngân sách cho mỗi người. Nếu qua đêm, kiểm tra ngân sách mỗi phòng và số phòng.'],stay:['Chọn chỗ nghỉ','So sánh giá theo ngân sách rồi chọn khách sạn để tạo lịch. Nếu chưa muốn chọn, bấm Để sau, xem lịch trước.'],preferences:['Thêm sở thích riêng','Chọn hoạt động, phương tiện và ghi chú để kế hoạch phù hợp với bạn hơn.'],summary:['Chọn cách lên lịch','Để AI xếp các điểm đã chọn, hoặc tự xếp lịch. Mở thông tin chuyến đi để kiểm tra và chỉnh lại trước khi chọn gói.'],subscription:['Chọn gói cho chuyến đi','So sánh quyền lợi, chọn gói rồi tiếp tục theo cách lên lịch bạn đã chọn. Bản trải nghiệm không thu tiền.']};
 if(wizard==='ai-proposal')return guide('proposal','Lịch đề xuất','laptop',[['Xem lịch trước khi dùng','Cuộn xem hoạt động từng ngày. Mở Tinh chỉnh chuyến đi nếu muốn đổi sở thích hoặc chỗ ở.'],['Chọn cách tiếp tục','Dùng lịch trình này để lưu chuyến, hoặc Lưu và chỉnh lịch trình để sửa hoạt động. Tạo phương án khác sẽ dùng thêm một lượt AI.']]);
 if(path==='/trip/manual/new')return guide('manual','Tự xếp lịch','route',[['Xếp điểm vào từng ngày','Chọn địa điểm chưa xếp, chọn ngày và giờ để thêm vào lịch. Bạn cũng có thể tự nhập điểm khác.'],['Lưu khi đã sẵn sàng','Xếp các điểm đã chọn vào lịch rồi nhấn Lưu chuyến đi. Bạn có thể tiếp tục chỉnh sau khi lưu.']]);
 if(wizard==='refine')return guide('wizard-refine','Tinh chỉnh chuyến đi','heart',[['Lịch trước, tinh chỉnh sau','Thêm tối đa 3 sở thích, chọn chỗ ở hoặc để sau. Lịch được cập nhật khi quay lại bản đề xuất.'],['Gói chuyến đi là tuỳ chọn','Bạn có thể xem và chọn gói sau khi đã thấy lịch đầu tiên.']]);
 const wizardActions:Record<string,LumiGuideAction>={destination:'tour',places:'map',dates:'clock',companions:'wave',budget:'budget',stay:'hotel',preferences:'heart',summary:'checklist',subscription:'laptop'};
 if(wizardSteps[wizard])return guide(`wizard-${wizard}`,'Lên kế hoạch',wizardActions[wizard],[wizardSteps[wizard],['Đi tiếp khi đã sẵn sàng','Các lựa chọn của bạn được giữ khi quay lại bước trước. Dùng nút Tiếp tục ở cuối màn hình để sang bước kế tiếp.']]);
 if(path==='/home')return guide('home','Trang chủ','tour',[['Lumi chào bạn!','Mình sẽ cùng bạn chọn điểm đến, lên kế hoạch và lưu lại kỷ niệm. Mỗi chức năng đều có hướng dẫn riêng.'],['Bắt đầu một chuyến đi','Chạm Chọn điểm đến để lên kế hoạch mới, hoặc mở thẻ chuyến đi để tiếp tục kế hoạch đang có.'],['Cần mình giúp?','Mở Hỏi Lumi để xem lịch, tra chi tiêu hoặc xem lại hướng dẫn cho trang hiện tại.']]);
 if(path==='/explore'||path==='/search'||path.startsWith('/destination/')||path.startsWith('/place/'))return guide('explore','Khám phá','search',[['Tìm nơi bạn muốn ghé','Dùng thanh tìm kiếm và danh mục để tìm địa điểm, đồ ăn hoặc trải nghiệm phù hợp.'],['Xem trước khi lựa chọn','Mở thẻ để xem chi tiết. Dùng biểu tượng trái tim để lưu địa điểm bạn thích.']]);
 if(path==='/explore/stays'||path.startsWith('/stay/'))return guide('stays','Chỗ ở','hotel',[['Tìm chỗ nghỉ phù hợp','Xem các thẻ chỗ ở và lọc theo nhu cầu. Giá hiển thị là giá tham khảo.'],['Xem chi tiết chỗ ở','Mở một thẻ để xem hình ảnh, tiện ích và thông tin. Khi đi từ luồng lên kế hoạch, bạn có thể chọn chỗ ở cho chuyến đi.']]);
 if(path==='/trips')return guide('trips','Chuyến đi','ticket',[['Các hành trình của bạn','Mở thẻ chuyến đi để xem lịch, bản đồ, chuẩn bị và kỷ niệm.'],['Tạo chuyến mới','Dùng nút Tạo chuyến mới để bắt đầu, hoặc tiếp tục bản nháp đang có.']]);
 if(path==='/trip/overview')return guide('overview','Tổng quan','checklist',[['Nắm nhanh hành trình','Xem ngày đi, chỗ ở và tiến độ hoạt động của chuyến đi.'],['Đi đến từng chức năng','Thanh phía trên giúp chuyển giữa Tổng quan, Lịch trình, Bản đồ, Chuẩn bị và Kỷ niệm.']]);
 if(/\/trip\/(day|edit)\//.test(path))return guide('itinerary','Lịch trình','map',[['Khám phá từng ngày','Chọn ngày để xem các điểm ghé, khung giờ và dự chi. Mở hoạt động để xem chi tiết.'],['Chỉnh theo nhịp của bạn','Thêm hoặc chỉnh hoạt động trong lịch. Với các gợi ý điều chỉnh, xem trước thay đổi rồi mới áp dụng.']]);
 if(path==='/trip/today')return guide('today','Hôm nay','hiking',[['Sẵn sàng cho điểm tiếp theo','Xem giờ, địa điểm và chỉ đường. Đánh dấu Đến rồi hoặc bỏ qua để chuyển sang hoạt động tiếp theo.'],['Theo nhịp của bạn','Mở lịch cả ngày để xem hoặc chỉnh các hoạt động. Bạn có thể khôi phục điểm đã bỏ qua.']]);
 if(path==='/trip/recap/map')return guide('memory-map','Bản đồ ảnh','pin',[['Kỷ niệm theo địa điểm','Chạm cụm ảnh để phóng gần, hoặc chọn ảnh trong dải bên dưới để xem.'],['Xem lại khoảnh khắc','Chuyển giữa Tất cả chuyến và Chuyến này. Ảnh chưa gắn vị trí vẫn nằm trong album.']]);
 if(path==='/map'||path==='/trip/route'||path==='/trip/group/location')return guide('map','Bản đồ','map',[['Xem các điểm trên bản đồ','Chọn ngày hoặc loại điểm để xem thông tin liên quan. Chạm vào ghim để xem chi tiết.'],['Xem tuyến di chuyển','Tại bản đồ lộ trình, mở Google Maps để xem chỉ đường thực tế. Vị trí thành viên trong bản trải nghiệm là dữ liệu mẫu.']]);
 if(path.includes('expense'))return guide('expenses','Chi tiêu','budget',[['Ghi lại khoản chi','Chọn Cá nhân hoặc Nhóm, rồi nhấn Thêm khoản chi để nhập số tiền và danh mục.'],['Chia tiền rõ ràng','Với khoản nhóm, chọn người trả và người tham gia. Xem số dư để biết ai cần góp thêm hoặc nhận lại.']]);
 if(path.includes('packing')||path==='/trip/preparation')return guide('preparation','Chuẩn bị','suitcase',[['Chuẩn bị trước ngày đi','Xem các thủ tục và danh sách hành lý trước khi khởi hành.'],['Đánh dấu từng việc','Tích vào các mục đã chuẩn bị và thêm những món đồ riêng của bạn trong danh sách hành lý.']]);
 if(path==='/trip/camera'||path==='/trip/photobooth')return guide('camera','Camera & Photobooth','camera',[['Lưu một khoảnh khắc','Chọn địa điểm chụp, sau đó chọn ảnh từ máy hoặc mở camera.'],['Thử khung Photobooth','Chuyển sang Photobooth, chọn khung rồi thêm ảnh vào từng ô. Xem ảnh hoàn chỉnh trước khi lưu vào album hoặc tải về.']]);
 if(path.includes('journal')||path.includes('/memories')||path.includes('/recap'))return guide('memories','Kỷ niệm','album',[['Giữ lại những điều đáng nhớ','Thêm ảnh vào album, chụp check-in hoặc mở bản đồ kỷ niệm để xem ảnh theo địa điểm.'],['Tạo câu chuyện của bạn','Từ album, mở Tạo video để chọn ảnh và viết lời nhắn. Xem lại nội dung trước khi lưu hoặc chia sẻ.']]);
 if(path.includes('/group'))return guide('group','Không gian nhóm','chat',[['Cùng nhau chuẩn bị','Không gian nhóm tập hợp trao đổi, bình chọn, vị trí và chia tiền cho chuyến đi.'],['Chọn việc cần làm','Mở chức năng tương ứng để nhắn tin, bình chọn hoặc xem thông tin chung. Dữ liệu cộng tác hiện là bản trải nghiệm.']]);
 if(path.startsWith('/wallet'))return guide('wallet','Ví giấy tờ','ticket',[['Giấy tờ ở cùng một nơi','Xem vé và tài liệu của chuyến đi. Mở từng thẻ để xem thông tin chi tiết.'],['Thêm tài liệu','Nhấn Thêm giấy tờ mới, chọn loại tài liệu và nhập thông tin cần lưu.']]);
 if(path.startsWith('/community')||path==='/saved'||path==='/wishlist')return guide('community','Chia sẻ & lưu lại','heart',[['Tìm cảm hứng cho chuyến đi','Xem bài chia sẻ và các địa điểm yêu thích. Mở từng thẻ để xem nội dung.'],['Lưu điều bạn thích','Dùng nút lưu hoặc trái tim để giữ lại bài viết, địa điểm. Kiểm tra nội dung trước khi đăng bài mới.']]);
 if(path==='/profile')return guide('profile','Tài khoản','wave',[['Phong cách du lịch của bạn','Xem và cập nhật tên, sở thích trong DNA du lịch để gợi ý phù hợp hơn.'],['Xem lại khi cần','Các hướng dẫn đã xem sẽ không tự mở lại. Vào Hỏi Lumi và chọn Xem hướng dẫn trang này để mở lại.']]);
 if(path==='/subscription')return guide('subscription','Gói chuyến đi','celebrate',[['Xem quyền lợi hiện tại','Kiểm tra gói và số lượt AI còn lại cho chuyến đi.'],['Chọn gói phù hợp','Mở lựa chọn gói để so sánh trước khi áp dụng. Bản trải nghiệm không thu tiền.']]);
 return null;
}
