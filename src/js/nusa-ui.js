/**
 * Nusa UI tiny interaction helpers.
 * Include this file with defer. All components remain usable without JS where possible.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
    const target = document.querySelector(button.getAttribute("data-menu-toggle"));
    if (!target) return;
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      target.hidden = expanded;
    });
  });

  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll("[role=tab]")];
    const panels = [...root.querySelectorAll("[role=tabpanel]")];
    tabs.forEach((tab, index) => tab.addEventListener("click", () => {
      tabs.forEach((item, i) => {
        const active = i === index;
        item.setAttribute("aria-selected", String(active));
        item.classList.toggle("active", active);
      });
      panels.forEach((panel, i) => { panel.hidden = i !== index; });
    }));
  });

  document.querySelectorAll("[data-accordion]").forEach((root) => {
    root.querySelectorAll("[data-accordion-trigger]").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  });

  document.querySelectorAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.getAttribute("data-modal-open"));
      if (modal) { modal.hidden = false; modal.querySelector("[data-modal-close]")?.focus(); }
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      if (modal) modal.hidden = true;
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") document.querySelectorAll("[data-modal]:not([hidden])").forEach((modal) => { modal.hidden = true; });
  });
});