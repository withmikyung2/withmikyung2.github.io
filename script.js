const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector("#site-menu");
const contactSection = document.querySelector("#contact");

if (menuButton && siteMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteMenu.contains(event.target) && !menuButton.contains(event.target)) {
      siteMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll(".js-scroll-to-contact").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!contactSection) return;

    event.preventDefault();
    const presetCategory = link.dataset.presetCategory;
    const categoryField = contactSection.querySelector("#inquiry-category");

    if (presetCategory && categoryField) {
      categoryField.value = presetCategory;
    }

    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const firstField = contactSection.querySelector("#inquiry-name, input, select, textarea, button");
      if (firstField) firstField.focus({ preventScroll: true });
    }, 450);
  });
});

document.querySelectorAll("[data-tabs]").forEach((tabs) => {
  const buttons = Array.from(tabs.querySelectorAll("[data-tab-target]"));
  const panels = Array.from(tabs.querySelectorAll("[role='tabpanel']"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tabTarget;

      buttons.forEach((tabButton) => {
        const isSelected = tabButton === button;
        tabButton.classList.toggle("active", isSelected);
        tabButton.setAttribute("aria-selected", String(isSelected));
      });

      panels.forEach((panel) => {
        const isSelected = panel.id === targetId;
        panel.classList.toggle("active", isSelected);
        panel.hidden = !isSelected;
      });
    });
  });
});

document.querySelectorAll("[data-accordion] .acc-head").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".acc-item");
    if (!item) return;

    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const inquiryForm = document.querySelector("#inquiry-form");
const formStatus = document.querySelector("#form-status");
const googleSheetsWebAppUrl = "https://script.google.com/macros/s/AKfycbx0gsWtL7fu00S4x-GfCJS9SkOv_94erLYt_6_fNqjgUfYekkfqMZxS6-ksRw7Ktlc_fA/exec";

if (inquiryForm && formStatus) {
  const categoryField = inquiryForm.querySelector("#inquiry-category");
  const initialCategory = new URLSearchParams(window.location.search).get("category");

  if (categoryField && initialCategory) {
    categoryField.value = initialCategory;
  }

  const setFormStatus = (message, type = "") => {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`.trim();
  };

  const saveInquiry = async (inquiry) => {
    if (typeof window.saveInquiry === "function") {
      await window.saveInquiry(inquiry);
      return;
    }

    if (typeof window.submitInquiry === "function") {
      await window.submitInquiry(inquiry);
      return;
    }

    if (googleSheetsWebAppUrl) {
      await fetch(googleSheetsWebAppUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(inquiry),
      });
      return;
    }

    const savedInquiries = JSON.parse(localStorage.getItem("salmitdaInquiries") || "[]");
    savedInquiries.push(inquiry);
    localStorage.setItem("salmitdaInquiries", JSON.stringify(savedInquiries));
  };

  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      setFormStatus("필수 항목을 확인해주세요. 이름, 연락처, 문의 내용, 개인정보 동의가 필요합니다.", "error");
      return;
    }

    const submitButton = inquiryForm.querySelector(".form-submit");
    const originalText = submitButton.textContent;
    const formData = new FormData(inquiryForm);

    submitButton.disabled = true;
    submitButton.textContent = "접수 중...";
    setFormStatus("문의 내용을 보내는 중입니다. 잠시만 기다려주세요.");

    try {
      const inquiry = {
        name: formData.get("name").trim(),
        phone: formData.get("phone").trim(),
        category: formData.get("category"),
        quantity: (formData.get("quantity") || "").trim(),
        availableTime: formData.get("availableTime"),
        region: (formData.get("region") || "").trim(),
        message: formData.get("message").trim(),
        privacyAgree: formData.get("privacyAgree") === "on" ? "동의" : "",
        submittedAt: new Date().toISOString(),
      };

      await saveInquiry(inquiry);

      inquiryForm.reset();
      setFormStatus("문의가 접수되었습니다. 확인 후 연락드리겠습니다.", "success");
    } catch (error) {
      setFormStatus("저장 중 문제가 발생했습니다. 다시 시도해주세요.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}
