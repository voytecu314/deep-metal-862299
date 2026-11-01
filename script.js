const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  primaryNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) closeMenu();
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
let lastFocusedElement;

document.querySelectorAll("[data-lightbox]").forEach((card) => {
  card.addEventListener("click", () => {
    lastFocusedElement = card;
    lightboxImage.src = card.dataset.lightbox;
    lightboxImage.alt = card.dataset.alt;
    lightboxCaption.textContent = card.dataset.alt;
    lightbox.showModal();
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
  lastFocusedElement?.focus();
});

const newsletterForm = document.querySelector("#newsletter-form");
const emailInput = document.querySelector("#email");
const formStatus = document.querySelector("#form-status");
const signupStorageKey = "deep-metal-newsletter-signups";

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;

  const email = emailInput.value.trim().toLowerCase();
  let signups;
  try {
    signups = JSON.parse(localStorage.getItem(signupStorageKey) || "[]");
    if (!Array.isArray(signups)) throw new Error("Stored signups are not a list.");
    const alreadySignedUp = signups.includes(email);
    if (!alreadySignedUp) {
      signups.push(email);
      localStorage.setItem(signupStorageKey, JSON.stringify(signups));
    }
    formStatus.textContent = alreadySignedUp
      ? "You're already on the list — saved in this browser."
      : "You're on the list — saved in this browser.";
  } catch (error) {
    formStatus.textContent = "Could not save your address in this browser. Please try again.";
    console.error("Newsletter signup could not be saved.", error);
    return;
  }

  newsletterForm.reset();
});
