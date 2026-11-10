/**
 * animations.js — Quản lý hiệu ứng Mở thiệp (Open Invitation) và Fade-in các Section.
 * - Ban đầu khi tải trang: chỉ hiện Section 01 (`#section-invitation`), các section 02 -> 05
 *   ẩn đi với `opacity: 0`.
 * - Khi người dùng nhấn nút `OPEN INVITATION`: mở khóa các section 02 -> 05, kích hoạt
 *   hiệu ứng fade-in mượt mà, tự động bật nhạc nền và cuộn xuống Section 02 (`#section-our-home`).
 */

const STAGGER_DELAY_MS = 110;

/**
 * Kích hoạt hiển thị (fade-in) cho một section và các phần tử con `[data-animate-item]` bên trong.
 * @param {HTMLElement} sectionEl
 */
export function revealSection(sectionEl) {
  if (!sectionEl) return;

  sectionEl.classList.add("is-revealed");

  const items = sectionEl.querySelectorAll("[data-animate-item]");
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * STAGGER_DELAY_MS}ms`;
    item.classList.add("is-visible");
  });
}

/**
 * Tạo IntersectionObserver để các section tiếp theo hiện dần (fade-in) khi cuộn tới.
 * @param {Object} [options]
 * @returns {IntersectionObserver|null}
 */
export function createRevealObserver(options = {}) {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealSection(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.1,
      ...options,
    }
  );
}

/**
 * Khởi tạo luồng bấm nút "OPEN INVITATION" để mở các section còn lại và bật nhạc.
 * @param {Function} [onFirstOpen] - Callback được gọi ngay trong sự kiện click lần đầu mở thiệp
 */
export function initAnimations(onFirstOpen) {
  if (typeof document === "undefined") return;

  const openBtn = document.getElementById("open-invitation-btn");
  const hiddenSections = Array.from(
    document.querySelectorAll(".editorial-section:not(.section-invitation)")
  );
  const firstNextSection = document.getElementById("section-our-home");

  let isOpened = false;

  function handleOpenInvitation(event) {
    if (event) {
      event.preventDefault();
    }

    if (!isOpened) {
      isOpened = true;

      // 1. Gọi callback bật nhạc NGAY TRONG sự kiện click của người dùng
      //    để trình duyệt cho phép phát âm thanh tự động 100%.
      if (typeof onFirstOpen === "function") {
        onFirstOpen();
      }

      // 2. Mở khóa layout cho các section 02 -> 05 (vẫn đang ở opacity: 0)
      document.body.classList.add("is-invitation-opened");

      // 3. Ép trình duyệt tính toán lại layout (reflow) để nhận diện trạng thái opacity: 0
      //    trước khi thêm class .is-revealed (opacity: 1) giúp hiệu ứng fade-in mượt mà.
      if (firstNextSection) {
        void firstNextSection.offsetHeight;
      }

      // 4. Hiện dần (fade-in) Section 02 ngay lập tức và các section tiếp theo
      if (firstNextSection) {
        revealSection(firstNextSection);
      }

      const observer = createRevealObserver();
      hiddenSections.forEach((section, index) => {
        if (observer) {
          observer.observe(section);
        }
        // Đảm bảo tất cả các section 02 -> 05 đều lần lượt fade-in mượt mà
        setTimeout(() => {
          revealSection(section);
        }, (index + 1) * 180);
      });

      // 5. Cuộn mượt xuống Section 02 (OUR HOME)
      setTimeout(() => {
        if (
          firstNextSection &&
          typeof firstNextSection.scrollIntoView === "function"
        ) {
          firstNextSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 80);
    } else if (
      firstNextSection &&
      typeof firstNextSection.scrollIntoView === "function"
    ) {
      firstNextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  if (openBtn) {
    openBtn.addEventListener("click", handleOpenInvitation);
  }
}
