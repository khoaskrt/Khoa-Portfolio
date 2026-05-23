document.addEventListener("DOMContentLoaded", () => {
  // Lấy các element cần tương tác
  const percentageElement = document.getElementById("loaderPercentage");
  const logoFillElement = document.querySelector(".logo-fill");
  const loaderWrapper = document.getElementById("loaderWrapper");

  // ========================================================
  // CẤU HÌNH THỜI GIAN CHẠY (Tùy chỉnh ở đây)
  // ========================================================
  const DURATION = 2500; // Tổng thời gian giả lập loading (2500ms = 2.5 giây)
  const START_VAL = 0;   // Bắt đầu từ 0%
  const END_VAL = 100;   // Kết thúc ở 100%
  
  let startTime = null;

  // Hàm tạo hiệu ứng (Easing function)
  // Giúp tốc độ loading không đều đặn tẻ nhạt: bắt đầu chậm, tăng tốc ở giữa và chậm lại khi kết thúc
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Vòng lặp animation mượt mà sử dụng requestAnimationFrame
  function animateLoader(timestamp) {
    // Khởi tạo thời gian ban đầu
    if (!startTime) startTime = timestamp;
    
    // Tính toán thời gian đã trôi qua
    const progressTime = timestamp - startTime;

    // Tính tỷ lệ % hoàn thành theo thời gian (từ 0.0 đến 1.0)
    let timeFraction = progressTime / DURATION;
    if (timeFraction > 1) timeFraction = 1; // Đảm bảo không vượt quá 1

    // Áp dụng hàm Easing để lấy tiến trình thực tế (giúp animation mượt và tự nhiên hơn)
    const progress = easeInOutCubic(timeFraction);

    // Tính giá trị phần trăm hiện tại (từ 0 đến 100)
    const currentPercent = Math.floor(START_VAL + (END_VAL - START_VAL) * progress);

    // 1. Cập nhật số phần trăm hiển thị trên màn hình
    percentageElement.textContent = `${currentPercent}%`;

    // 2. Cập nhật hiệu ứng "đổ đầy" (Fill animation) bằng clip-path
    // Giá trị Y chạy ngược từ 100% (cắt hết) về 0% (không cắt, lấp đầy hoàn toàn)
    // Polygon: (TopLeft, TopRight, BottomRight, BottomLeft)
    const clipY = 100 - (progress * 100); 
    logoFillElement.style.clipPath = `polygon(0% ${clipY}%, 100% ${clipY}%, 100% 100%, 0% 100%)`;

    // 3. Kiểm tra xem đã hoàn thành chưa
    if (progressTime < DURATION) {
      // Nếu chưa hết thời gian, tiếp tục gọi frame tiếp theo
      requestAnimationFrame(animateLoader);
    } else {
      // Đã chạy xong 100%, thực thi hiệu ứng trượt lên trên (Slide-up)
      // Dùng setTimeout để người dùng nhìn thấy 100% trong một khoảnh khắc nhỏ trước khi cuộn mất
      setTimeout(() => {
        loaderWrapper.classList.add("slide-up");
        // Kích hoạt scroll lại cho body
        document.documentElement.classList.add("loaded");
      }, 400); // Dừng lại 400ms (0.4s) ở mức 100%
    }
  }

  // Bắt đầu chuỗi animation
  requestAnimationFrame(animateLoader);
});
