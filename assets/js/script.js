'use strict';

/* ================================
   ELEMENT TOGGLE
================================ */
const elementToggleFunc = (elem) => elem.classList.toggle("active");
/* ================================
   SIDEBAR
================================ */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => {
  elementToggleFunc(sidebar);
});

/* ================================
   TESTIMONIALS MODAL
================================ */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

/* ================================
   PORTFOLIO FILTER
================================ */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => elementToggleFunc(select));

const filterFunc = (value) => {
  filterItems.forEach(item => {
    item.classList.toggle(
      "active",
      value === "all" || item.dataset.category === value
    );
  });
};

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const value = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(value);

    lastClickedBtn.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

/* ================================
   PAGE NAVIGATION
================================ */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
/* ================================
   PAGE NAVIGATION WITH ANIMATION
================================ */
navigationLinks.forEach(link => {
  link.addEventListener("click", () => {

    const targetPage = link.innerText.toLowerCase();

    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach(btn => btn.classList.remove("active"));
    link.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


/* ================================
   CONTACT FORM (AJAX – FORMSPREE)
================================ */
const contactForm = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        status.textContent = "✅ Message submitted successfully!";
        status.style.color = "#00ff9c";
        contactForm.reset();
      } else {
        status.textContent = "❌ Something went wrong.";
        status.style.color = "#ff4c4c";
      }
    } catch {
      status.textContent = "❌ Network error. Try again.";
      status.style.color = "#ff4c4c";
    }
  });
}
