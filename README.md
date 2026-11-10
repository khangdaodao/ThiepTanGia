# Thiệp Mời Tân Gia — Housewarming Invitation Website

Website thiệp mời tân gia một trang dọc theo phong cách **Luxury Editorial** (Ivory, Beige & Black), xây dựng bằng HTML5, CSS3 và Vanilla JavaScript (ES Modules). Toàn bộ thông tin khách hàng được quản lý tập trung tại một file cấu hình duy nhất: `js/config.js`.

## 1. Cách mở project
Mở thư mục gốc `TanGiaWeb` trong VS Code hoặc trình soạn thảo mã nguồn bất kỳ.

## 2. Cách chạy local
Do trình duyệt yêu cầu giao thức HTTP/HTTPS khi nạp JavaScript ES Modules (`<script type="module">`), hãy chạy project qua một static server thay vì mở trực tiếp file `.html` bằng `file://`:
- **VS Code Live Server:** Chuột phải vào `index.html` → chọn **Open with Live Server**.
- **Node.js:** Chạy `npx serve .` trong thư mục `TanGiaWeb`.
- **Python:** Chạy `python -m http.server 8080` rồi truy cập `http://localhost:8080`.

## 3. Cách tùy chỉnh nội dung trong `js/config.js`
Chỉ cần chỉnh sửa file `js/config.js`:
- **Thay tên gia chủ:** Sửa `hosts.firstHost`, `hosts.secondHost` và mảng `hosts.names`.
- **Thay ngày giờ tổ chức:** Sửa trong object `date` (`day`, `month`, `year`, `time`, `weekday`, `formattedDate`, `monthHeading`). Bảng lịch sẽ tự động tính toán lại thứ trong tuần và đánh dấu đúng ngày `date.day`.
- **Thay địa chỉ:** Sửa `location.venueName`, `location.address` và `location.imageCaption`. *(Lưu ý: Địa chỉ demo hiện tại cần xác nhận lại với khách hàng trước khi bàn giao).*
- **Thêm Google Maps URL:** Dán link Google Maps vào `location.mapsUrl`. Khi để chuỗi rỗng `""`, nút `VIEW LOCATION` sẽ ở trạng thái vô hiệu hóa an toàn (không tạo link lỗi); khi có URL hợp lệ, nút sẽ tự động mở bản đồ trong tab mới.
- **Thay ảnh ngôi nhà trong `assets/images/`:**
  1. Chép ảnh thật của khách hàng vào thư mục `assets/images/` (ví dụ: `our-home.jpg` và `location-house.jpg`).
  2. Cập nhật đường dẫn trong `js/config.js`:
     - `ourHome.image: "assets/images/our-home.jpg"`
     - `location.image: "assets/images/location-house.jpg"`
  3. Khi hai trường này để trống `""`, giao diện hiển thị khung giữ chỗ (`IMAGE PLACEHOLDER`) báo rõ tên file cần bổ sung.
- **Thêm nhạc nền (dành cho giai đoạn sau):** Cấu hình `music.enabled` và `music.src` đã được chuẩn bị sẵn trong `js/config.js` (mặc định tắt `false`).

## 4. Cách deploy lên Vercel
1. Đẩy mã nguồn lên GitHub (`git push origin main`).
2. Trên Vercel, chọn **Add New Project** → Import repo GitHub (`ThiepTanGia`).
3. Root Directory để mặc định `./` (thư mục gốc).
4. Giữ nguyên thiết lập static mặc định (đã có `vercel.json`) và nhấn **Deploy**.
