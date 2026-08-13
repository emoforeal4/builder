// ================= Navbar scroll state + mobile menu =================
const navbar = document.querySelector(".navbar-custom");
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function onScroll() {
  if (!navbar) return;
  navbar.classList.toggle("is-scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("is-open"));
  });
}

// ================= Scroll reveal =================
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ================= FAQ accordion =================
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  if (!question || !answer) return;

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("is-open");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    item.classList.toggle("is-open", !isOpen);
    answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
  });
});

// ================= HLS hero video (home page only) =================
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  if (window.Hls && Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(heroVideo);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      heroVideo.play().catch((e) => console.log("Auto-play prevented:", e));
    });
  } else if (heroVideo.canPlayType("application/vnd.apple.mpegurl")) {
    heroVideo.src = videoSrc;
    heroVideo.addEventListener("loadedmetadata", () => {
      heroVideo.play().catch((e) => console.log("Auto-play prevented:", e));
    });
  }
}
