// Add smooth scroll behavior and enhanced interactions
document.addEventListener("DOMContentLoaded", function () {
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item, index) => {
    // Add click event for potential navigation
    item.addEventListener("click", function () {
      const serviceName = this.querySelector(".service-text").textContent;
      console.log(`Clicked on: ${serviceName}`);
      // You can add navigation logic here
    });

    // Add entrance animation
    item.style.opacity = "1";
    item.style.transform = "translateY(30px)";

    setTimeout(() => {
      item.style.transition = "all 0.6s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 150);
  });

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

  // Close mobile menu on resize (if screen becomes larger)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 875 && navbarLinks.classList.contains("active")) {
      navbarToggle.classList.remove("active");
      navbarLinks.classList.remove("active");
    }
  });

  // Select all the links inside the mobile menu
  const navLinks = document.querySelectorAll("#navbarLinks li a");

  // Function to close the menu
  function closeMenu() {
    navbarToggle.classList.remove("active");
    navbarLinks.classList.remove("active");
    navbarToggle.setAttribute("aria-expanded", "false"); // Important for accessibility
  }

  // Add a click event to each link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // When a link is clicked, close the menu
      closeMenu();
    });
  });

  // -----------------------------------------------------------//
  // Get elements
  const openFormBtn = document.getElementById("openFormBtn");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeBtn");
  const applicationForm = document.getElementById("applicationForm");

  // --- Functions to open and close the modal ---
  const openModal = () => {
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    resetForm();
  };

  // --- Event Listeners for Modal ---
  openFormBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.style.display === "flex") {
      closeModal();
    }
  });

  // --- Form Handling ---
  const resetForm = () => {
    applicationForm.reset();
    hideAllErrors();
  };

  const hideAllErrors = () => {
    document.querySelectorAll(".error-message").forEach((error) => {
      error.style.display = "none";
    });
  };

  const validateForm = () => {
    let isValid = true;
    hideAllErrors();

    // Simple validation check, you can make this more complex
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "countryCode",
      "phoneNumber",
      "country",
    ];
    requiredFields.forEach((id) => {
      const field = document.getElementById(id);
      if (field.value.trim() === "") {
        document.getElementById(field.id + "Error").style.display = "block";
        isValid = false;
      }
    });

    // Specific validation for email
    const email = document.getElementById("email");
    if (
      email.value.trim() !== "" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    }

    // Fix for phone error message display
    const countryCode = document.getElementById("countryCode");
    const phoneNumber = document.getElementById("phoneNumber");
    if (countryCode.value === "" || phoneNumber.value.trim() === "") {
      document.getElementById("phoneError").style.display = "block";
      isValid = false;
    }

    // Validate Privacy Policy
    if (!document.getElementById("privacyPolicy").checked) {
      document.getElementById("privacyError").style.display = "block";
      isValid = false;
    }

    return isValid;
  };

  applicationForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validateForm()) {
      const formData = new FormData(applicationForm);
      const data = Object.fromEntries(formData.entries());

      console.log("Form submitted successfully:", data);
      alert("Thank you for your application!");
      closeModal();
    } else {
      console.log("Form validation failed.");
    }
  });

  // Real-time validation for phone number (numbers only)
  document
    .getElementById("phoneNumber")
    .addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });

  // ============================================================
  let isEnglish = false;

  function toggleLanguage() {
    const toggle = document.querySelector(".language-toggle");
    const flagIcon = document.getElementById("flagIcon");

    // Toggle the visual state
    toggle.classList.toggle("active");
    isEnglish = !isEnglish;

    // Change flag icon
    flagIcon.src = isEnglish
      ? "https://flagcdn.com/w320/no.png"
      : "https://flagcdn.com/w320/us.png";

    // Switch language content
    switchLanguage(isEnglish ? "no" : "en");

    console.log("Language switched to:", isEnglish ? "EN" : "NO");
  }

  function switchLanguage(lang) {
    // Find all elements with language data attributes
    const elements = document.querySelectorAll("[data-no][data-en]");

    elements.forEach((element) => {
      const text = element.getAttribute(`data-${lang}`);
      if (text) {
        element.textContent = text;
      }
    });

    // Update document language for SEO
    document.documentElement.lang = lang === "en" ? "en" : "no";
  }

  // Attach language toggle event
  const languageToggleBtn = document.querySelector(".language-toggle");
  if (languageToggleBtn) {
    languageToggleBtn.addEventListener("click", toggleLanguage);
  }
});
