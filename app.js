/* =========================================================
   app.js — gallery modal + scroll-to-footer
   ========================================================= */

/* ── External link URLs — fill in when available ────────── */
const URLS = {
  cv:        "https://melinasz.github.io/Melina%20Szarfsztejn%20-%20UX%20Design%20CV%20-%20EN.pdf",
  lms:       "https://docs.google.com/presentation/d/1hH_URdsKrHGdJXQh5TvOsuS_Z7JBj4HDERE9O8gofyM/edit?usp=sharing",
  vendor:    "https://docs.google.com/presentation/d/1Fh8VmQxZN1GnAf2siOMglZXQN-axGhqsoTUCJvRjxVM/edit?usp=sharing",
  materials: "https://www.figma.com/design/HSSfg0j3M4O6SfCi8KoFYB/Portfolio---Meli-Szarfsztejn?node-id=2-11969",
};

/* ── Gallery definitions — add { src, alt } objects when image URLs are available ── */
const GALLERIES = {
  /* Figma: "The challenge" section in DeMotores case study */
  "demotores-challenge": {
    title:  "DeMotores.com — The Challenge",
    images: [
      { src: "img/dm-home-old.jpg",          alt: "DeMotores.com — homepage before redesign" },
      { src: "img/dm-home-new.jpg",          alt: "DeMotores.com — homepage after redesign (January 2014)" },
      { src: "img/dm-listados-old.jpg",      alt: "DeMotores.com — listings page before redesign" },
      { src: "img/dm-listados-new.jpg",      alt: "DeMotores.com — listings page after redesign" },
      { src: "img/dm-ficha-usados-old.jpg",  alt: "DeMotores.com — used car detail page before redesign" },
      { src: "img/dm-ficha-usados-new.jpg",  alt: "DeMotores.com — used car detail page after redesign" },
    ],
  },
  /* Figma: Older-Project-Card — Funnely */
  "funnely": {
    title:  "Funnely — Web Application",
    images: [
      { src: "img/funnely-ampliada1.png", alt: "Funnely — campaign management interface" },
      { src: "img/funnely-ampliada2.png", alt: "Funnely — campaign optimization screen" },
    ],
  },
  /* Figma: Older-Project-Card — Pactanda */
  "pactanda": {
    title:  "Pactanda — Web Application",
    images: [
      { src: "img/pactanda-ampliada1.png", alt: "Pactanda — eCommerce dispute resolution interface" },
    ],
  },
  /* Figma: Older-Project-Card — Foglia */
  "foglia": {
    title:  "Foglia — Retailer Website",
    images: [
      { src: "img/foglia-site-home-00.jpg", alt: "Foglia — homepage" },
      { src: "img/foglia-site-marca-00.jpg", alt: "Foglia — Marca" },
      { src: "img/foglia-site-coleccion-00.jpg", alt: "Foglia — Colección" },
      { src: "img/foglia-site-campania-00.jpg", alt: "Foglia — Campaña" },
      { src: "img/foglia-site-campania-01.jpg", alt: "Foglia — Campaña" },
      { src: "img/foglia-site-sis-00.jpg", alt: "Foglia" },
    ],
  },
  /* Figma: Older-Project-Card — Miss Rock */
  "missrock": {
    title:  "Miss Rock — Retailer Website",
    images: [
      { src: "img/missrock-site3-campania-00.jpg", alt: "Miss Rock — Campaña" },
      { src: "img/missrock-site3-coleccion-00.jpg", alt: "Miss Rock — Colección" },
      { src: "img/missrock-site3-marca-00.jpg", alt: "Miss Rock — Marca" },
    ],
  },
  /* Figma: Older-Project-Card — Rodrigo Suarez */
  "rodrigo": {
    title:  "Rodrigo Suarez Arquitectura",
    images: [
      { src: "img/rodrigo-home.jpg",   alt: "Rodrigo Suarez Arquitectura — homepage" },
      { src: "img/rodrigo-perfil.jpg", alt: "Rodrigo Suarez Arquitectura — profile" },
      { src: "img/rodrigo-obras.jpg",  alt: "Rodrigo Suarez Arquitectura — works" },
    ],
  },
  /* Figma: Older-Project-Card — Magdalena Yomha */
  "magdalena": {
    title:  "Magdalena Yomha",
    images: [
      { src: "img/luba-home.jpg",     alt: "Magdalena Yomha — homepage" },
      { src: "img/luba-luba.jpg",     alt: "Magdalena Yomha — about" },
      { src: "img/luba-ficha.jpg",    alt: "Magdalena Yomha — play detail" },
      { src: "img/luba-video.jpg",    alt: "Magdalena Yomha — video" },
      { src: "img/luba-galeria.jpg",  alt: "Magdalena Yomha — gallery" },
      { src: "img/luba-cv.jpg",       alt: "Magdalena Yomha — CV" },
      { src: "img/luba-contacto.jpg", alt: "Magdalena Yomha — contact" },
    ],
  },
};

/* ── Gallery state ─────────────────────────────────────── */
let currentGallery = null;
let currentSlide   = 0;

/* ── DOM helpers ───────────────────────────────────────── */
const modal       = () => document.getElementById("gallery-modal");
const titleEl     = () => document.getElementById("modal-title-text");
const slideEl     = () => document.getElementById("gallery-slide");
const imgEl       = () => document.getElementById("gallery-img");
const counterEl   = () => document.getElementById("gallery-counter");
const dotsEl      = () => document.getElementById("gallery-dots");
const emptyEl     = () => document.getElementById("gallery-empty");
const carouselEl  = () => document.getElementById("gallery-carousel");
const prevBtn     = () => document.getElementById("gallery-prev");
const nextBtn     = () => document.getElementById("gallery-next");

/* ── Open gallery ──────────────────────────────────────── */
function openGallery(id) {
  const gallery = GALLERIES[id];
  if (!gallery) return;

  currentGallery = gallery;
  currentSlide   = 0;

  titleEl().textContent = gallery.title;

  const hasImages = gallery.images.length > 0;
  emptyEl().hidden   = hasImages;
  carouselEl().hidden = !hasImages;

  if (hasImages) renderSlide();

  modal().showModal();
}

/* ── Render current slide ──────────────────────────────── */
function renderSlide() {
  const images = currentGallery.images;
  const img    = images[currentSlide];

  imgEl().src = img.src;
  imgEl().alt = img.alt;
  counterEl().textContent = `${currentSlide + 1} / ${images.length}`;

  prevBtn().disabled = currentSlide === 0;
  nextBtn().disabled = currentSlide === images.length - 1;

  renderDots(images.length);
}

/* ── Render radio dot navigation ───────────────────────── */
function renderDots(count) {
  const container = dotsEl();
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const id = `gallery-dot-${i}`;

    /* Native radio input — visually hidden, keyboard accessible */
    const radio = document.createElement("input");
    radio.type    = "radio";
    radio.name    = "gallery-slide";
    radio.id      = id;
    radio.className = "gallery-radio sr-only";
    radio.checked = i === currentSlide;
    radio.setAttribute("aria-label", `Image ${i + 1} of ${count}: ${currentGallery.images[i].alt}`);
    radio.addEventListener("change", () => {
      currentSlide = i;
      renderSlide();
    });

    /* Visible dot label */
    const label = document.createElement("label");
    label.htmlFor   = id;
    label.className = "gallery-dot-label" + (i === currentSlide ? " gallery-dot-label--active" : "");
    label.setAttribute("aria-hidden", "true");

    container.appendChild(radio);
    container.appendChild(label);
  }
}

/* ── Navigation buttons ────────────────────────────────── */
function galleryPrev() {
  if (currentSlide > 0) { currentSlide--; renderSlide(); }
}
function galleryNext() {
  if (currentGallery && currentSlide < currentGallery.images.length - 1) {
    currentSlide++;
    renderSlide();
  }
}

/* ── Close gallery ─────────────────────────────────────── */
function closeGallery() {
  modal().close();
  _resetGalleryState();
}

/* Called by oncancel (Escape key) — browser closes dialog itself, just reset state */
function cancelGallery() {
  _resetGalleryState();
}

function _resetGalleryState() {
  const img = imgEl();
  if (img) { img.src = ''; img.alt = ''; }
  const carousel = carouselEl();
  if (carousel) carousel.hidden = true;
  currentGallery = null;
  currentSlide   = 0;
}

/* ── Contact me — scroll to footer ────────────────────── */
function scrollToFooter() {
  document.getElementById("site-footer")
    ?.scrollIntoView({ behavior: "smooth" });
}

/* ── Event delegation — "View gallery" buttons ─────────── */
document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-gallery]");
  if (btn) openGallery(btn.dataset.gallery);
});

/* ── Close on backdrop click ────────────────────────────── */
document.addEventListener("click", function (e) {
  if (e.target === modal()) closeGallery();
});

/* ── Set CV href if URL available ──────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  const cvLinks = document.querySelectorAll("[data-cv-link]");
  cvLinks.forEach(function (el) {
    if (URLS.cv) {
      el.href   = URLS.cv;
      el.target = "_blank";
      el.rel    = "noopener noreferrer";
    }
  });
  const lmsLinks = document.querySelectorAll("[data-url='lms']");
  lmsLinks.forEach(function (el) {
    if (URLS.lms) { el.href = URLS.lms; el.target = "_blank"; el.rel = "noopener noreferrer"; }
  });
  const vendorLinks = document.querySelectorAll("[data-url='vendor']");
  vendorLinks.forEach(function (el) {
    if (URLS.vendor) { el.href = URLS.vendor; el.target = "_blank"; el.rel = "noopener noreferrer"; }
  });
  const matLinks = document.querySelectorAll("[data-url='materials']");
  matLinks.forEach(function (el) {
    if (URLS.materials) { el.href = URLS.materials; el.target = "_blank"; el.rel = "noopener noreferrer"; }
  });
});
