/**
 * ============================================================
 *  config.js — NGUỒN DỮ LIỆU DUY NHẤT (Single Source of Truth)
 * ============================================================
 * Hướng dẫn tùy chỉnh cho khách hàng tiếp theo:
 * 1. Chỉ cần chỉnh sửa nội dung chữ, ngày giờ, địa chỉ và đường dẫn ảnh tại file này.
 * 2. Không đổi tên các thuộc tính (key) để tránh ảnh hưởng tới code hiển thị.
 * 3. Đặt ảnh chụp ngôi nhà thực tế vào thư mục `assets/images/` rồi điền đường dẫn
 *    vào `ourHome.image` và `location.image`.
 * 4. File này KHÔNG chứa logic giao diện.
 *
 * LƯU Ý QUAN TRỌNG:
 * - Địa chỉ demo dưới đây cần được xác nhận lại với khách hàng trước khi bàn giao.
 * - `location.mapsUrl` phải giữ là chuỗi rỗng "" cho đến khi có link Google Maps thật.
 */

export const config = {
  // ---- Thông tin gia chủ ----
  hosts: {
    firstHost: "Đoàn Văn Phong",
    secondHost: "Nguyễn Thị Thảo",
    names: ["Đoàn Văn Phong", "Nguyễn Thị Thảo"],
    separator: "&",
    roleLabel: "TRÂN TRỌNG BÁO TIN MỪNG TÂN GIA CỦA GIA ĐÌNH CHÚNG TÔI",
  },

  // ---- SECTION 01: THE INVITATION (Cover tối giản, không có ảnh nhà) ----
  invitation: {
    sectionNumber: "01",
    heading: "HOUSEWARMING INVITATION",
    subtitle: "THIỆP MỜI TÂN GIA",
    introText: "TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH",
    message:
      "Đến dự bữa tiệc thân mật mừng tân gia và chung vui cùng gia đình chúng tôi tại tổ ấm mới.",
    buttonText: "OPEN INVITATION",
  },

  // ---- SECTION 02: OUR HOME (Editorial Magazine Layout) ----
  ourHome: {
    sectionNumber: "02",
    eyebrow: "THE NEW CHAPTER",
    heading: "OUR HOME",
    subtitle: "Tổ ấm mới — Khởi đầu mới",
    introduction:
      "Sau hành trình ấp ủ và vun đắp, ngôi nhà nhỏ của chúng tôi đã chính thức hoàn thiện. Mỗi góc không gian đều được chăm chút bằng sự trân trọng, ấm áp và bình yên — nơi lưu giữ những khoảnh khắc sum vầy của gia đình.",
    editorialNote:
      "Niềm vui ngày về nhà mới sẽ trọn vẹn hơn khi có sự hiện diện và lời chúc phúc từ những người thân yêu.",
    // Đặt ảnh thật vào assets/images/ rồi cập nhật đường dẫn (ví dụ: "assets/images/our-home.jpg").
    // Để trống "" khi chưa có ảnh thực tế từ khách hàng.
    image: "assets/images/houseReal.jpg",
    imageAlt: "Ảnh ngoại thất ngôi nhà của Toàn Văn Phong và Nguyễn Thị Thảo",
    imageCaption: "TỔ ẤM CỦA PHONG & THẢO",
    missingAssetLabel: "Ảnh ngoại thất ngôi nhà (Cần bổ sung: assets/images/our-home.jpg)",
  },

  // ---- SECTION 03: THE DATE (Calendar tháng 11/2026) ----
  date: {
    sectionNumber: "03",
    eyebrow: "MARK THE CALENDAR",
    heading: "SAVE THE DATE",
    monthHeading: "NOVEMBER 2026",
    invitationLead:
      "KÍNH MỜI QUÝ KHÁCH\nĐẾN DỰ TIỆC MỪNG TÂN GIA CỦA GIA ĐÌNH CHÚNG TÔI",
    timePrefix: "VÀO HỒI",
    time: "16:00",
    hour: 16,
    minute: 0,
    weekday: "Thứ Bảy",
    weekdayEn: "Saturday",
    day: 14,
    month: 11,
    year: 2026,
    formattedDate: "14 . 11 . 2026",
  },

  // ---- SECTION 04: LOCATION (Ảnh nhà, địa chỉ & nút Google Maps) ----
  location: {
    sectionNumber: "04",
    eyebrow: "LOCATION",
    heading: "FIND OUR HOME",
    venueName: "TƯ GIA PHONG & THẢO",
    // Lưu ý: Địa chỉ cần được xác nhận lại với khách hàng trước khi bàn giao.
    address: "Ngõ 7, TDP Đông Hòa, phường Đông Hòa Lư, Ninh Bình",
    // Giữ chuỗi rỗng "" khi chưa có link bản đồ thực tế. Tuyệt đối không tự đoán URL.
    mapsUrl: "https://maps.app.goo.gl/hcVV1DPN9XNScr1i8",
    buttonText: "VIEW LOCATION",
    disabledButtonHint:
      "Nút chỉ đường sẽ được kích hoạt ngay khi cập nhật Google Maps URL trong js/config.js",
    // Đặt ảnh thật vào assets/images/ rồi cập nhật đường dẫn (ví dụ: "assets/images/location-house.jpg").
    image: "assets/images/houseAI.jpg",
    imageAlt: "Ảnh ngôi nhà tại Đông Hòa Lư, Ninh Bình",
    imageCaption: "NGÕ 7, TDP ĐÔNG HÒA — NINH BÌNH",
    missingAssetLabel: "Ảnh ngôi nhà tại phần Địa điểm (Cần bổ sung: assets/images/location-house.jpg)",
  },

  // ---- SECTION 05: THANK YOU (Minimalist Closing Section) ----
  thankYou: {
    sectionNumber: "05",
    eyebrow: "WITH GRATITUDE",
    heading: "THANK YOU",
    subtitle: "LỜI CẢM ƠN",
    message:
      "Cảm ơn Quý khách đã dành thời gian quý báu đến chung vui và gửi những lời chúc tốt đẹp nhất đến gia đình chúng tôi. Sự hiện diện của Quý khách là niềm vinh hạnh lớn lao trong ngày khởi đầu tại tổ ấm mới.",
    closingNote: "RẤT HÂN HẠNH ĐƯỢC ĐÓN TIẾP!",
  },

  // ---- Đường dẫn thư mục tài nguyên ----
  assets: {
    imagesDir: "assets/images/",
    fontsDir: "assets/fonts/",
    musicDir: "assets/music/",
  },

  // ---- Nhạc nền (Nút phát nhạc góc trái màn hình) ----
  music: {
    enabled: true,
    autoPlayOnOpen: true,
    // Bỏ file nhạc .mp3 vào thư mục assets/music/ rồi đổi tên file dưới đây (ví dụ: "assets/music/nhac-nen.mp3").
    // Nếu chưa có file .mp3 trong thư mục, web sẽ tự phát giai điệu piano nhẹ dự phòng.
    src: "assets/music/Yesterday.mp3",
  },
};

export default config;
