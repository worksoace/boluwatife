const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));

const slideshows = document.querySelectorAll("[data-slideshow]");

slideshows.forEach((slideshow) => {
  const slides = slideshow.querySelectorAll(".slide");
  const nextButton = slideshow.querySelector("[data-next]");
  const prevButton = slideshow.querySelector("[data-prev]");
  let currentIndex = 0;

  if (!slides.length) return;

  const setActiveSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(currentIndex);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    setActiveSlide(currentIndex);
  };
  let autoScrollId;

  const startAutoScroll = () => {
    autoScrollId = setInterval(showNext, 3500);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollId);
  };

  if (nextButton) {
    nextButton.addEventListener("click", showNext);
  }

  if (prevButton) {
    prevButton.addEventListener("click", showPrev);
  }

  slideshow.addEventListener("mouseenter", stopAutoScroll);
  slideshow.addEventListener("mouseleave", startAutoScroll);

  setActiveSlide(currentIndex);
  startAutoScroll();
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
const enlargeableImages = document.querySelectorAll(".enlargeable");

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

enlargeableImages.forEach((image) => {
  image.addEventListener("click", () => openLightbox(image));
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
