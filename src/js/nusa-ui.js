/**
* Nusa UI JavaScript
* Version: 1.1.0
*/

document.addEventListener("DOMContentLoaded", () => {
    /* Mobile Navigation */
    document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
        const target = document.querySelector(button.getAttribute("data-menu-toggle"));
        if (!target) return;

        button.addEventListener("click", () => {
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            target.hidden = expanded;
        });
    });

    /* Tabs - basic existing behavior */
    document.querySelectorAll("[data-tabs]").forEach((root) => {
        const tabs = [...root.querySelectorAll("[role=tab]")];
        const panels = [...root.querySelectorAll("[role=tabpanel]")];

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabs.forEach((item, i) => {
                    const active = i === index;
                    item.setAttribute("aria-selected", String(active));
                    item.classList.toggle("active", active);
                });

                panels.forEach((panel, i) => {
                    panel.hidden = i !== index;
                });
            });
        });
    });

    /* Accordion - basic existing behavior */
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

    /* Modal - basic existing behavior */
    document.querySelectorAll("[data-modal-open]").forEach((button) => {
        button.addEventListener("click", () => {
            const modal = document.querySelector(button.getAttribute("data-modal-open"));

            if (modal) {
                modal.hidden = false;
                modal.querySelector("[data-modal-close]")?.focus();
            }
        });
    });

    document.querySelectorAll("[data-modal-close]").forEach((button) => {
        button.addEventListener("click",
            () => {
                const modal = button.closest("[data-modal]");
                if (modal) modal.hidden = true;
            });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            document.querySelectorAll("[data-modal]:not([hidden])").forEach((modal) => {
                modal.hidden = true;
            });
        }
    });

    /* Documentation: Mobile Sidebar */
    const menuButton = document.querySelector("#docs-menu-toggle");
    const sidebar = document.querySelector("#docs-sidebar");
    const overlay = document.querySelector("#docs-overlay");
    const desktopBreakpoint = window.matchMedia("(min-width: 1024px)");

    const closeSidebar = () => {
        sidebar?.classList.remove("open");
        if (overlay) overlay.hidden = true;
        menuButton?.setAttribute("aria-expanded", "false");
    };

    const openSidebar = () => {
        if (!sidebar || desktopBreakpoint.matches) return;

        sidebar.classList.add("open");
        if (overlay) overlay.hidden = false;
        menuButton?.setAttribute("aria-expanded", "true");
    };

    if (menuButton && sidebar) {
        menuButton.addEventListener("click", () => {
            const isOpen = sidebar.classList.contains("open");
            if (isOpen) closeSidebar();
            else openSidebar();
        });

        overlay?.addEventListener("click",
            closeSidebar);

        sidebar.querySelectorAll(".docs-nav-link").forEach((link) => {
            link.addEventListener("click", closeSidebar);
        });

        document.addEventListener("keydown",
            (event) => {
                if (event.key === "Escape" && sidebar.classList.contains("open")) {
                    closeSidebar();
                    menuButton.focus();
                }
            });

        desktopBreakpoint.addEventListener("change",
            (event) => {
                if (event.matches) closeSidebar();
            });
    }

    /* Documentation: Search */
    const searchInput = document.querySelector("#docs-search");
    const searchSections = [...document.querySelectorAll("[data-doc-section]")];
    const navigation = document.querySelector("#docs-navigation");
    const emptyState = document.querySelector("#docs-empty");

    if (searchInput && searchSections.length) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            searchSections.forEach((section) => {
                const matches = section.textContent.toLowerCase().includes(query);

                section.hidden = !matches;

                if (matches) visibleCount++;
            });

            navigation?.querySelectorAll(".docs-nav-group").forEach((group) => {
                let groupVisible = 0;

                group.querySelectorAll(".docs-nav-link").forEach((link) => {
                    const target = document.querySelector(link.getAttribute("href"));

                    const matches = !query || (
                        target && !target.hidden &&
                        link.textContent.toLowerCase().includes(query)
                    );

                    link.hidden = !matches;

                    if (matches) groupVisible++;
                });

                group.hidden = groupVisible === 0;
            });

            if (emptyState) {
                emptyState.style.display = visibleCount ? "none": "block";
            }
        });
    }

    /* Documentation: Copy Code */
    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.select();

        const copied = document.execCommand("copy");
        textarea.remove();

        if (!copied) throw new Error("Copy operation failed.");
    };

    document.querySelectorAll("[data-copy-target]").forEach((button) => {
        button.addEventListener("click", async () => {
            const target = document.getElementById(button.dataset.copyTarget);
            if (!target) return;

            const originalText = button.textContent;

            try {
                await copyText(target.textContent);
                button.textContent = "Copied!";
                button.setAttribute("aria-label", "Code copied");
            } catch (error) {
                button.textContent = "Copy failed";
            }

            window.setTimeout(() => {
                button.textContent = originalText;
                button.removeAttribute("aria-label");
            }, 1800);
        });
    });

    /* Documentation: Active Navigation */
    const navLinks = [...document.querySelectorAll(".docs-nav-link")];

    if ("IntersectionObserver" in window && navLinks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    const active = link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", active);
                });
            });
        }, {
            rootMargin: "-20% 0px -70% 0px"
        });

        searchSections.forEach((section) => observer.observe(section));
    }
});