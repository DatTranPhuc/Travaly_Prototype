# Core loop — nghiệm thu local

Nhánh: feature/core-loop

## Phạm vi

Giữ wizard hiện tại. Nối dữ liệu tạo chuyến → xem/sửa lịch → Hôm nay → nhóm/chia tiền.

## Đã kiểm tra

- Wizard AI tạo 6 hoạt động/ngày, giữ các điểm đã chọn; điểm vượt sức chứa được liệt kê chờ xếp.
- Thêm/sửa hoạt động, chặn tên rỗng và trùng giờ; lưu giữ thông tin chuyến và cập nhật lịch dùng chung.
- Hôm nay dùng múi giờ Việt Nam, hiển thị điểm tiếp theo, đến rồi/bỏ qua/khôi phục. Trạng thái giữ sau reload.
- Một danh sách thành viên dùng chung cho nhóm, phiếu bầu và chia tiền.
- Đổi lựa chọn không tăng số người đã bỏ phiếu; phiếu giữ sau reload.
- Khoản chi nhóm 600.000đ/3 người: mỗi người 200.000đ, hai người chuyển lại người ứng tiền 200.000đ/người. Tổng nhóm trùng màn chi tiêu.
- npm run lint, npm test (32 test), npm run build đều pass.

## Giới hạn

Lịch được tạo từ dữ liệu mẫu theo quy tắc, chưa gọi AI thật. Dữ liệu lưu trên thiết bị qua localStorage, chưa đồng bộ nhiều người hay backend. Gợi ý quyết toán bảo toàn số tiền nhưng không cam kết số giao dịch tối thiểu tuyệt đối. Build còn cảnh báo bundle lớn; tối ưu bundle nằm ngoài thay đổi này.
