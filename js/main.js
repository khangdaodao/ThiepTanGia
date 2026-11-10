/**
 * main.js — Entry point của Housewarming Invitation Website (Phase 4: Core UI).
 * Đọc dữ liệu từ `js/config.js` và render 5 section theo đúng thứ tự đã khóa:
 * 01. THE INVITATION
 * 02. OUR HOME
 * 03. THE DATE
 * 04. LOCATION
 * 05. THANK YOU
 */
import { config } from "./config.js";

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text ?? "";
  }
}

function formatHostNames(hosts) {
  if (!hosts) return "";
  if (Array.isArray(hosts.names) && hosts.names.length > 0) {
    return hosts.names.join(` ${hosts.separator || "&"} `);
  }
  return [hosts.firstHost, hosts.secondHost]
    .filter(Boolean)
    .join(` ${hosts.separator || "&"} `);
}

/**
 * Render hình ảnh thực tế nếu có đường dẫn trong `config.js`.
 * Nếu chưa có ảnh thực tế trong `assets/images/`, hiển thị placeholder rõ ràng
 * để báo cho người dùng biết file ảnh nào cần bổ sung (không dùng ảnh giả/AI).
 */
function renderEditorialFigure(figureEl, options) {
  if (!figureEl) return;
  const { src, alt, caption, missingLabel } = options;
  figureEl.innerHTML = "";

  const cleanSrc = typeof src === "string" ? src.trim() : "";

  if (cleanSrc) {
    const img = document.createElement("img");
    img.src = cleanSrc;
    img.alt = alt || "";
    img.loading = "lazy";
    figureEl.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder";
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", missingLabel || alt || "Image placeholder");

    const arch = document.createElement("div");
    arch.className = "photo-placeholder__frame";
    arch.setAttribute("aria-hidden", "true");

    const badge = document.createElement("span");
    badge.className = "photo-placeholder__badge";
    badge.textContent = "IMAGE PLACEHOLDER";

    const title = document.createElement("p");
    title.className = "photo-placeholder__title";
    title.textContent = caption || "HOUSE PHOTOGRAPH";

    const pathNote = document.createElement("p");
    pathNote.className = "photo-placeholder__path";
    pathNote.textContent =
      missingLabel || "Cập nhật đường dẫn ảnh thật trong js/config.js";

    placeholder.append(arch, badge, title, pathNote);
    figureEl.appendChild(placeholder);
  }

  if (caption && cleanSrc) {
    const figcaption = document.createElement("figcaption");
    figcaption.className = "editorial-figcaption";
    figcaption.textContent = caption;
    figureEl.appendChild(figcaption);
  }
}

/**
 * SECTION 01 — THE INVITATION
 */
function renderInvitationSection(cfg) {
  const { hosts, invitation, date } = cfg;
  setText("invitation-subtitle", invitation.subtitle);
  setText("invitation-heading", invitation.heading);
  setText("invitation-role-label", hosts.roleLabel);
  setText("invitation-host-1", hosts.firstHost || hosts.names?.[0] || "");
  setText("invitation-host-sep", hosts.separator || "&");
  setText("invitation-host-2", hosts.secondHost || hosts.names?.[1] || "");
  setText("invitation-message", invitation.message);
  setText("invitation-date-stamp", date.formattedDate || "14 . 11 . 2026");
  setText("open-invitation-btn", invitation.buttonText || "OPEN INVITATION");
}

/**
 * SECTION 02 — OUR HOME
 */
function renderOurHomeSection(cfg) {
  const { hosts, ourHome } = cfg;
  setText("our-home-number", ourHome.sectionNumber || "02");
  setText("our-home-eyebrow", ourHome.eyebrow);
  setText("our-home-heading", ourHome.heading);
  setText("our-home-subtitle", ourHome.subtitle);
  setText("our-home-hosts", formatHostNames(hosts));
  setText("our-home-intro", ourHome.introduction);
  setText("our-home-note", ourHome.editorialNote);

  renderEditorialFigure(document.getElementById("our-home-figure"), {
    src: ourHome.image,
    alt: ourHome.imageAlt,
    caption: ourHome.imageCaption,
    missingLabel: ourHome.missingAssetLabel,
  });
}

/**
 * Tính toán danh sách ô lịch cho tháng/năm bất kỳ theo chuẩn tuần bắt đầu từ Thứ Hai (T2 -> CN).
 * Với tháng 11/2026:
 * - Ngày 01/11/2026 là Chủ Nhật (CN - cột thứ 7, sau 6 ô trống từ T2 đến T7).
 * - Ngày 14/11/2026 là Thứ Bảy (T7 - cột thứ 6).
 */
export function buildCalendarCells(year, month, highlightDay) {
  const totalDays = new Date(year, month, 0).getDate();
  const firstWeekdaySundayZero = new Date(year, month - 1, 1).getDay(); // 0 = CN, 1 = T2, ..., 6 = T7
  const leadingBlanks = (firstWeekdaySundayZero + 6) % 7; // T2 = 0, T3 = 1, ..., T7 = 5, CN = 6

  const cells = [];
  for (let i = 0; i < leadingBlanks; i += 1) {
    cells.push({ empty: true, day: null, highlighted: false });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    cells.push({
      empty: false,
      day,
      highlighted: day === Number(highlightDay),
    });
  }

  return cells;
}

/**
 * Tạo biểu tượng ngôi sao 4 cánh (diamond star) giống thiết kế tham chiếu để đánh dấu ngày 14.
 */
function createStarBadgeSvg() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 48 48");
  svg.setAttribute("class", "calendar-cell__star");
  svg.setAttribute("aria-hidden", "true");

  const path = document.createElementNS(svgNS, "path");
  // Ngôi sao 4 đỉnh cân đối theo phong cách editorial của mẫu thiệp tham chiếu
  path.setAttribute(
    "d",
    "M24 2 C27.5 15.5 32.5 20.5 46 24 C32.5 27.5 27.5 32.5 24 46 C20.5 32.5 15.5 27.5 2 24 C15.5 20.5 20.5 15.5 24 2 Z"
  );
  svg.appendChild(path);
  return svg;
}

/**
 * SECTION 03 — THE DATE
 */
function renderDateSection(cfg) {
  const { date } = cfg;
  setText("date-number", date.sectionNumber || "03");
  setText("date-heading", date.heading || "SAVE THE DATE");
  setText("date-invitation-lead", date.invitationLead);
  setText("date-time-line", `${date.timePrefix || "VÀO HỒI"} ${date.time}`);
  setText(
    "date-full-line",
    `${(date.weekday || "THỨ BẢY").toUpperCase()} | ${date.formattedDate || "14 . 11 . 2026"}`
  );
  setText("calendar-month-heading", date.monthHeading || "NOVEMBER 2026");

  const gridEl = document.getElementById("calendar-grid");
  if (!gridEl) return;

  gridEl.innerHTML = "";
  const cells = buildCalendarCells(date.year, date.month, date.day);

  cells.forEach((cell) => {
    const cellEl = document.createElement("div");
    cellEl.setAttribute("role", "gridcell");

    if (cell.empty) {
      cellEl.className = "calendar-cell calendar-cell--empty";
      cellEl.setAttribute("aria-hidden", "true");
    } else {
      cellEl.className = "calendar-cell";
      const numberSpan = document.createElement("span");
      numberSpan.className = "calendar-cell__number";
      numberSpan.textContent = String(cell.day);

      if (cell.highlighted) {
        cellEl.classList.add("calendar-cell--highlighted");
        cellEl.setAttribute(
          "aria-label",
          `Thứ Bảy, ngày ${cell.day} tháng ${date.month} năm ${date.year} — Ngày tổ chức tiệc tân gia`
        );
        cellEl.appendChild(createStarBadgeSvg());
      }

      cellEl.appendChild(numberSpan);
    }

    gridEl.appendChild(cellEl);
  });
}

/**
 * SECTION 04 — LOCATION
 */
function renderLocationSection(cfg) {
  const { location } = cfg;
  setText("location-number", location.sectionNumber || "04");
  setText("location-eyebrow", location.eyebrow || "LOCATION");
  setText("location-heading", location.heading || "FIND OUR HOME");
  setText("location-venue", location.venueName);
  setText("location-address", location.address);
  setText("polaroid-venue-title", location.venueName);
  setText("polaroid-address-short", location.imageCaption || location.address);

  renderEditorialFigure(document.getElementById("location-figure"), {
    src: location.image,
    alt: location.imageAlt,
    caption: "",
    missingLabel: location.missingAssetLabel,
  });

  const mapsBtn = document.getElementById("location-maps-btn");
  const disabledNote = document.getElementById("location-disabled-note");
  const cleanUrl =
    typeof location.mapsUrl === "string" ? location.mapsUrl.trim() : "";

  if (mapsBtn) {
    mapsBtn.textContent = location.buttonText || "VIEW LOCATION";

    if (cleanUrl) {
      mapsBtn.href = cleanUrl;
      mapsBtn.classList.remove("editorial-btn--disabled");
      mapsBtn.removeAttribute("aria-disabled");
      if (disabledNote) disabledNote.hidden = true;
    } else {
      mapsBtn.removeAttribute("href");
      mapsBtn.classList.add("editorial-btn--disabled");
      mapsBtn.setAttribute("aria-disabled", "true");
      if (disabledNote && location.disabledButtonHint) {
        disabledNote.textContent = location.disabledButtonHint;
        disabledNote.hidden = false;
      }
    }
  }
}

/**
 * SECTION 05 — THANK YOU
 */
function renderThankYouSection(cfg) {
  const { hosts, thankYou } = cfg;
  setText("thank-you-number", thankYou.sectionNumber || "05");
  setText("thank-you-subtitle", thankYou.subtitle);
  setText("thank-you-heading", thankYou.heading || "THANK YOU");
  setText("thank-you-message", thankYou.message);
  setText("thank-you-closing-note", thankYou.closingNote);
  setText("thank-you-hosts", formatHostNames(hosts));
}

function setDocumentTitle(cfg) {
  const hostDisplay = formatHostNames(cfg.hosts);
  document.title = `${cfg.invitation.heading} — ${hostDisplay}`;
}

const renderModules = [
  renderInvitationSection,
  renderOurHomeSection,
  renderDateSection,
  renderLocationSection,
  renderThankYouSection,
];

export function init() {
  if (typeof document === "undefined") return;
  setDocumentTitle(config);
  renderModules.forEach((renderFn) => renderFn(config));
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
