# Project Context — Housewarming Invitation Website

## 1. Mục tiêu dự án
Website thiệp mời tân gia một trang dọc theo phong cách **Luxury Editorial Housewarming Invitation** (lấy cảm hứng từ mẫu thiết kế thiệp editorial *inkaphy Print Atelier*), dễ dàng tùy chỉnh cho các khách hàng tiếp theo thông qua một file cấu hình duy nhất `js/config.js`.

## 2. Tech stack
- HTML5 ngữ nghĩa (Semantic HTML5)
- CSS3 (`css/style.css`, `css/responsive.css`, `css/animations.css`) sử dụng CSS Custom Properties
- Vanilla JavaScript (ES Modules: `js/config.js`, `js/main.js`, `js/animations.js`)
- Intersection Observer API (đã gắn sẵn HTML/CSS hooks trong Phase 4; hiệu ứng kích hoạt thuộc phạm vi Phase 5)
- Vercel static deployment (`vercel.json`)
- Không sử dụng React, Vue, Angular, Tailwind CSS hoặc bất kỳ UI framework nào.

## 3. Cấu trúc thư mục (Root: TanGiaWeb)
```text
TanGiaWeb/
├── index.html
├── README.md
├── context.md
├── vercel.json
├── .gitignore
├── assets/
│   ├── images/
│   │   ├── houseReal.jpg
│   │   └── houseAI.jpg
│   ├── fonts/.gitkeep
│   └── music/.gitkeep
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
└── js/
    ├── config.js
    ├── main.js
    └── animations.js
```

## 4. Quyết định thiết kế đã khóa & Áp dụng từ ảnh tham chiếu
- **Bố cục tổng thể:** Một trang dọc duy nhất (single-page vertical scrolling) trên cả Desktop và Mobile. Không xếp ngang các section, không thêm thanh điều hướng rườm rà.
- **Thứ tự 5 section cố định:**
  1. `01. THE INVITATION`
  2. `02. OUR HOME`
  3. `03. THE DATE`
  4. `04. LOCATION`
  5. `05. THANK YOU`
- **Ngôn ngữ thị giác từ mẫu tham chiếu (`inkaphy Print Atelier`):**
  - Nền giấy ấm tông **Ivory (`#FAF8F4`) & Beige (`#E4DCD0`)** kết hợp chữ **Ink Black (`#151413`)** độ tương phản cao, bo góc mềm mại (`22px` trên desktop, `16px–18px` trên mobile) và đổ bóng nhẹ như tấm thiệp in cao cấp.
  - Đường kẻ dọc mảnh (`vertical-hairline`) phân tách nhịp điệu thị giác giữa phần lời dẫn, tên gia chủ và thông tin ngày giờ.
  - Typography kết hợp font Serif thanh lịch hỗ trợ tiếng Việt (`Cormorant Garamond`) cho tiêu đề lớn/tên gia chủ/ngày tháng và font Sans-serif tối giản (`Be Vietnam Pro`) cho phần nội dung.
  - Biểu tượng ngôi sao 4 cánh màu đen (diamond star emblem) đánh dấu ngày sự kiện trên bảng lịch.
  - Phần **Location** sử dụng nền đen tuyền (`#151413`) tương phản cao kèm khung ảnh trắng kiểu **Polaroid Atelier** giống hệt nửa dưới thẻ giữa của ảnh tham chiếu.

## 5. Chi tiết 5 section đã triển khai trong Phase 4
1. **SECTION 01 — THE INVITATION (`#section-invitation`)**:
   - Bìa thiệp tối giản, hoàn toàn không dùng ảnh ngôi nhà.
   - Hiển thị tiêu đề `HOUSEWARMING INVITATION`, tên hai gia chủ (`TOÀN VĂN PHONG & NGUYỄN THỊ THẢO`) ngăn cách bằng đường kẻ dọc mảnh, lời mời, dấu ngày `14 . 11 . 2026` và nút `OPEN INVITATION` (giao diện nút đã hoàn thiện; hiệu ứng mở thiệp sẽ thực hiện ở Phase 5).
2. **SECTION 02 — OUR HOME (`#section-our-home`)**:
   - Bố cục tạp chí bất đối xứng (Editorial Magazine 12-column grid trên màn hình lớn, tự động xếp dọc trên màn hình nhỏ).
   - Tiêu đề `OUR HOME`, tên gia chủ, lời giới thiệu ngôi nhà mới và khung ảnh ngoại thất ngôi nhà (hiện hiển thị khung placeholder có ghi chú rõ đường dẫn cần bổ sung `assets/images/our-home.jpg`).
3. **SECTION 03 — THE DATE (`#section-date`)**:
   - Tiêu đề `SAVE THE DATE`, lời mời dự tiệc, thông tin nổi bật `VÀO HỒI 16:00` và `THỨ BẢY | 14 . 11 . 2026`.
   - Bảng lịch `NOVEMBER 2026` dựng bằng lưới thực tế (`T2 T3 T4 T5 T6 T7 CN`), tính toán chính xác:
     - Ngày `01/11/2026` rơi vào **Chủ Nhật (`CN`)** (sau 6 ô trống từ `T2` đến `T7`).
     - Ngày `14/11/2026` rơi vào **Thứ Bảy (`T7`)** và được đánh dấu nổi bật bằng ngôi sao 4 cánh màu đen cùng chữ số trắng.
4. **SECTION 04 — LOCATION (`#section-location`)**:
   - Tiêu đề `LOCATION` / `FIND OUR HOME`, tên tư gia, địa chỉ cấu hình từ `js/config.js` (`Ngõ 7, TDP Đông Hòa, phường Đông Hòa Lư, Ninh Bình`).
   - Khung ảnh Polaroid trắng hiển thị ảnh ngôi nhà (hoặc placeholder rõ ràng khi chưa có file ảnh) kèm chú thích dưới ảnh.
   - Nút `VIEW LOCATION` lấy dữ liệu từ `location.mapsUrl`. Khi `mapsUrl` là chuỗi rỗng `""`, nút tự động chuyển sang trạng thái vô hiệu hóa (`aria-disabled="true"`, không có `href` lỗi) và hiện dòng ghi chú bên dưới.
5. **SECTION 05 — THANK YOU (`#section-thank-you`)**:
   - Bố cục tối giản trên nền giấy Ivory, tiêu đề lớn `THANK YOU`, lời cảm ơn tiếng Việt ấm áp, trang trọng và tên hai gia chủ. Không có ảnh nhà hay nút thừa.

## 6. Những file đã tạo / cập nhật trong Phase 4
- `index.html`: Cấu trúc HTML ngữ nghĩa cho 5 section, nạp font tiếng Việt và gắn sẵn các thuộc tính `data-animate-group` / `data-animate-item` làm hook cho Phase 5.
- `js/config.js`: Tập trung toàn bộ dữ liệu tùy chỉnh của 5 section, giữ nguyên thông tin demo đã duyệt và `mapsUrl: ""`.
- `js/main.js`: Module render dữ liệu từ `config.js` vào 5 section, hàm `buildCalendarCells(2026, 11, 14)` tạo lịch tháng 11/2026 chính xác, xử lý placeholder ảnh và trạng thái nút Google Maps.
- `js/animations.js`: Giữ stub chuẩn bị cho Phase 5, chưa kích hoạt hiệu ứng cuộn.
- `css/style.css`: Hệ thống biến CSS (màu sắc Ivory/Beige/Black, typography, spacing, border-radius, shadows) và toàn bộ style cho 5 section.
- `css/responsive.css`: Quy tắc đáp ứng cho các kích thước màn hình `375px`, `390px`, `768px` và `1440px`.
- `css/animations.css`: Giữ các phần tử hiển thị mặc định (`opacity: 1`) trong Phase 4, chuẩn bị hook cho Phase 5.
- `README.md` & `context.md`: Cập nhật tài liệu.

## 7. Tài nguyên còn thiếu & Điểm cần xác nhận
- **Ảnh chụp ngôi nhà thực tế (Missing Assets):** Thư mục `assets/images/` hiện chỉ có `.gitkeep`, chưa có file ảnh thật từ khách hàng. Website đang hiển thị khung `IMAGE PLACEHOLDER` ghi rõ hai đường dẫn cần bổ sung:
  - `assets/images/our-home.jpg` (dành cho `ourHome.image` ở Section 02)
  - `assets/images/location-house.jpg` (dành cho `location.image` ở Section 04)
- **Địa chỉ & Google Maps URL:** Địa chỉ demo (`Ngõ 7, TDP Đông Hòa, phường Đông Hòa Lư, Ninh Bình`) cần xác nhận lại với khách hàng trước khi bàn giao; `location.mapsUrl` đang để `""`.

## 8. Tính năng để dành cho Phase 5 (Chưa triển khai ở Phase 4)
- Hiệu ứng chuyển cảnh khi bấm nút `OPEN INVITATION` ở Section 01.
- Hiệu ứng Staggered Scroll Fade-In bằng Intersection Observer khi cuộn qua từng section.
- Nhạc nền (`music.enabled: false`) và các tương tác nâng cao khác.

## 9. Trạng thái hiện tại
- **Phase 3 (Project Foundation):** Đã hoàn thành & phê duyệt.
- **Phase 4 (Core UI Implementation):** Đã hoàn thành giao diện 5 section theo ảnh tham chiếu. Đang chờ người dùng kiểm tra và phê duyệt trước khi sang Phase 5.

## 10. Chỉnh sửa theo phản hồi khách (10/11/2026)
- Font toàn trang đổi sang **Montserrat** (Google Fonts, hỗ trợ tiếng Việt) theo ảnh mẫu khách gửi. Font mẫu được nhận diện bằng mắt, chưa xác nhận chắc chắn. Đổi font: sửa `--font-serif` / `--font-sans` trong css/style.css và link font trong index.html.
- Phóng to phần ngày tháng (Section 03): dòng giờ/ngày, tiêu đề tháng, hàng thứ, ô ngày (44px -> 52px desktop, 36px -> 40px mobile), khung lịch 520px -> 600px.
- Trạng thái: đã sửa code, CHƯA kiểm tra bằng trình duyệt (chụp màn hình headless bị treo), CHƯA commit/push, chờ khách duyệt.
