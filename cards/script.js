// Hamburger Menu Toggle
const navbarToggle = document.getElementById("navbarToggle");
const navbarLinks = document.getElementById("navbarLinks");

if (navbarToggle && navbarLinks) {
  navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("active");
    navbarLinks.classList.toggle("active");
    // Accessibility: Toggle aria-expanded
    const isExpanded = navbarToggle.classList.contains("active");
    navbarToggle.setAttribute("aria-expanded", isExpanded);
  });
}

// Language Toggle (basic; works in both desktop and mobile)
function toggleLanguage() {
  const toggles = document.querySelectorAll(".language-toggle"); // Handle multiple (desktop + mobile)
  toggles.forEach((toggle) => {
    toggle.classList.toggle("active");
    const flagIcon = toggle.querySelector("#flagIcon");
    if (toggle.classList.contains("active")) {
      flagIcon.src = "https://flagcdn.com/w320/en.png";
      flagIcon.alt = "English Flag";
    } else {
      flagIcon.src = "https://flagcdn.com/w320/no.png";
      flagIcon.alt = "Norwegian Flag";
    }
    // Add actual language switching logic here
  });
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// Close mobile menu on link click
const navLinks = document.querySelectorAll(".navbar-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarLinks.classList.contains("active")) {
      navbarToggle.classList.remove("active");
      navbarLinks.classList.remove("active");
    }
  });
});
