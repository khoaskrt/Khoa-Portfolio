# Kế Hoạch Clone Transition About → Work (Phong cách QClay, độ giống 85–90%)

## Tóm tắt
Mục tiêu là dựng transition chuyển cảnh từ `AboutSection` sang `WorkExperienceSection` theo ngôn ngữ thị giác tương tự qclay: nền tối, line trung tâm, lớp sáng mở rộng, rồi nội dung section sáng “được mở khóa” theo tiến trình scroll.  
Giải pháp chọn: `CSS + Motion (motion/react) thuần`, không dùng video làm lớp chính để giữ hiệu năng, kiểm soát layering tốt, và tránh conflict override.

## QClay đang làm gì (rút ra từ phân tích kỹ thuật)
- QClay dùng kiến trúc section controller và state class để điều phối toàn trang (`fixed/absolute` layering, class trạng thái kiểu `-active/-next/-from-prev`).
- Transition không phải chỉ GIF: có cả `video/mp4`, Vimeo embed và animation CSS/JS đồng thời.
- Cảm giác “chuyển tối → sáng” đến từ:
  1. section chồng lớp (overlay/gradient/mask),
  2. timeline theo progress,
  3. stagger nội dung khi nền đã đổi pha.
- Với repo hiện tại, ta mô phỏng hiệu ứng bằng panel/gradient/line chạy theo scroll thay vì phụ thuộc video, để ổn định hơn trên mobile và dễ maintain.

## Thay đổi triển khai chính (decision-complete)

### 1) Timeline chuẩn cho transition About → Work
- Tạo timeline chuẩn hóa bằng `transitionProgress` (0 → 1) tại `DarkToLightTransition`.
- Pha chuyển:
  1. `P0 (0.00–0.18)`: giữ dark, line trung tâm hiện + kéo dọc.
  2. `P1 (0.18–0.62)`: panel sáng mở ngang từ tâm (scaleX/clip-like reveal).
  3. `P2 (0.50–0.86)`: fade dark particles/ornaments của about; gradient bridge tăng sáng.
  4. `P3 (0.72–1.00)`: unlock `WorkExperienceSection` + stagger content.
- Dùng overlap 12–18% giữa các pha để không “gãy nhịp”.

### 2) Chuẩn trigger và offset (đồng bộ toàn flow)
- Giữ transition section như một “band” độc lập nằm giữa About và Work.
- Chuẩn offset đề xuất:
  - `scrollYProgress` transition: `['start 94%', 'end -8%']`.
  - Reveal threshold cứng: `>= 0.80`; hysteresis tắt: `< 0.72` (tránh nháy khi cuộn ngược).
- Trên mobile compact: cho phép `sectionInView` hỗ trợ fallback như code hiện có, nhưng ưu tiên `revealReady`.

### 3) Kiến trúc state để chống conflict/override
- Tách rõ 3 nhóm state:
  1. `progress-state`: số liên tục (0..1), chỉ đọc cho style/transform.
  2. `phase-state`: class/data-attr rời rạc (`phase-0..phase-3`), chỉ cho rule hiển thị.
  3. `gate-state`: boolean `revealReady` để mở nội dung Work.
- Quy tắc ownership:
  - `DarkToLightTransition` sở hữu trigger + phase mapping.
  - `WorkExperienceSection` chỉ consume `revealReady/progress`, không tự suy ra trigger mới.
  - `AboutSection` không điều khiển Work trực tiếp.
- Không trộn nhiều nguồn animation cho cùng property trên cùng node (`transform` chỉ từ Motion, tránh CSS transition ghi đè transform).

### 4) Rule layering/z-index/contain thống nhất
- Khai báo z-index tokens (ví dụ): `--z-bg:0`, `--z-about:10`, `--z-transition:20`, `--z-work:30`, `--z-ui:40`.
- Mỗi section có `isolation: isolate`; các overlay transition dùng `pointer-events:none`.
- Dùng `contain: layout paint` cho transition band để giảm repaint bleed.
- Không dùng `position: fixed` tràn lan trong section content; chỉ dùng cho layer thật sự global nếu bắt buộc.
- Cấm hardcode z-index rải rác; chỉ dùng token/class utility.

### 5) Style/motion rules để tránh nhiễu
- Chỉ animate ưu tiên: `opacity`, `transform`, `filter` nhẹ; tránh animate `width/height/top/left` khi không cần.
- Easing:
  - reveal panel: `cubic-bezier(0.22, 1, 0.36, 1)`,
  - text/content: `ease-out` mềm hơn, delay sau panel ~`+0.10 progress`.
- Quantize progress gửi qua props (như hiện có) để giảm render jitter.
- `prefers-reduced-motion`: bỏ line/panel animation, set `revealReady=true`, render static light transition.

### 6) Material cần chuẩn bị
- Không bắt buộc video.
- Cần bộ asset nhẹ:
  1. 1 gradient palette dark→light (OKLCH đang dùng),
  2. 1 line style token (màu/độ mờ/glow),
  3. tùy chọn 1 noise texture rất nhẹ (PNG/WebP) nếu muốn tăng chất liệu.
- Chuẩn typography/contrast cho cả 2 nền để text không “cháy” ở vùng progress giữa.

### 7) Public interface/types cần chốt
- Giữ contract hiện tại và chuẩn hóa:
  - `DarkToLightTransitionProps`:
    - `onProgressChange(progress: number)`
    - `onRevealReadyChange(ready: boolean)`
  - `WorkExperienceSectionProps`:
    - `transitionProgress?: number`
    - `revealReady?: boolean`
- Bổ sung `TransitionPhase` type nội bộ (`0 | 1 | 2 | 3`) để rule class rõ ràng.

## Test plan & acceptance criteria
- Visual flow:
  1. Scroll xuống: About tối → line xuất hiện → panel sáng mở → Work reveal đúng thứ tự.
  2. Scroll ngược: không nháy trạng thái; gate hysteresis hoạt động.
- Responsive:
  1. Mobile <=767px: không overlap text/panel; reveal vẫn mượt.
  2. Desktop lớn: transition band không để lộ seam giữa section.
- Accessibility:
  1. `prefers-reduced-motion` bật: không animation mạnh, nội dung vẫn truy cập đầy đủ.
  2. Contrast text đạt mức đọc được ở progress trung gian.
- Performance:
  1. Không drop frame đáng kể khi scroll thường.
  2. Không tạo conflict transform giữa Motion và CSS transition.

## Giả định đã khóa
- Độ giống mục tiêu: **85–90% theo tinh thần qclay**, không pixel-perfect 1:1.
- Công nghệ transition: **CSS + Motion thuần**, không video-driven.
- Phạm vi: chỉ transition `About -> Work`, không refactor toàn bộ kiến trúc animation của các section khác.
