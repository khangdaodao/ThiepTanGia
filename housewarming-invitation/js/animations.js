/**
 * animations.js — Module chuẩn bị cho hiệu ứng ở Phase 5.
 * Phase 4 chỉ dựng giao diện cốt lõi (Core UI) và gắn sẵn các hook HTML
 * (`[data-animate-group]`, `[data-animate-item]`).
 * Hiệu ứng mở thiệp (opening transition) và staggered scroll fade-in sẽ được
 * triển khai và kích hoạt trong Phase 5.
 */

export function createRevealObserver(options = {}) {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  return new IntersectionObserver(() => {
    // Dự kiến triển khai ở Phase 5
  }, options);
}

export function initAnimations() {
  // Chưa kích hoạt ở Phase 4 theo yêu cầu tách biệt phạm vi Phase 4 & Phase 5
}
