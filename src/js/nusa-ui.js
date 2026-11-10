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

    /* Dropdown */
    document.querySelectorAll("[data-dropdown]").forEach((root) => {
        const trigger = root.querySelector("[data-dropdown-trigger]");
        const menu = root.querySelector("[data-dropdown-menu]");
        if (!trigger || !menu) return;

        const items = () => [...menu.querySelectorAll(
            "a[href], button:not(:disabled):not([aria-disabled='true'])"
        )].filter((item) => !item.hidden);

        const setOpen = (open, focus = false) => {
            trigger.setAttribute("aria-expanded", String(open));
            menu.hidden = !open;
            if (open && focus) items()[0]?.focus();
        };

        trigger.addEventListener("click", () => {
            setOpen(menu.hidden);
        });

        trigger.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpen(true, true);
            }
            if (event.key === "ArrowUp") {
                event.preventDefault();
                setOpen(true);
                items().at(-1)?.focus();
            }
        });

        menu.addEventListener("keydown", (event) => {
            const list = items();
            const index = list.indexOf(document.activeElement);
            let next = null;

            if (event.key === "ArrowDown") next = (index + 1) % list.length;
            if (event.key === "ArrowUp") next = (index - 1 + list.length) % list.length;
            if (event.key === "Home") next = 0;
            if (event.key === "End") next = list.length - 1;

            if (next !== null && list.length) {
                event.preventDefault();
                list[next].focus();
            }
            if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
                trigger.focus();
            }
            if (event.key === "Tab") setOpen(false);
        });

        document.addEventListener("click", (event) => {
            if (!root.contains(event.target)) setOpen(false);
        });

        menu.addEventListener("click", (event) => {
            if (event.target.closest("a, button")) setOpen(false);
        });

        setOpen(false);
    });

    /* Tabs: automatic activation with arrow-key navigation */
    document.querySelectorAll("[data-tabs]").forEach((root) => {
        const tabs = [...root.querySelectorAll('[role="tab"]')];
        const panels = [...root.querySelectorAll('[role="tabpanel"]')];
        if (!tabs.length || !panels.length) return;

        const activate = (index, moveFocus = false) => {
            const tab = tabs[index];
            if (!tab || tab.disabled || tab.getAttribute("aria-disabled") === "true") return;

            tabs.forEach((item, i) => {
                const active = i === index;
                item.setAttribute("aria-selected", String(active));
                item.tabIndex = active ? 0 : -1;
                item.classList.toggle("active", active);
            });

            panels.forEach((panel, i) => {
                panel.hidden = i !== index;
            });

            if (moveFocus) tab.focus();
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => activate(index));

            tab.addEventListener("keydown", (event) => {
                const vertical = root.getAttribute("aria-orientation") === "vertical";
                const previous = vertical ? "ArrowUp" : "ArrowLeft";
                const next = vertical ? "ArrowDown" : "ArrowRight";
                let target = null;

                if (event.key === next) target = (index + 1) % tabs.length;
                if (event.key === previous) target = (index - 1 + tabs.length) % tabs.length;
                if (event.key === "Home") target = 0;
                if (event.key === "End") target = tabs.length - 1;

                if (target !== null) {
                    event.preventDefault();
                    let candidate = target;
                    for (let i = 0; i < tabs.length; i++) {
                        if (!tabs[candidate].disabled &&
                            tabs[candidate].getAttribute("aria-disabled") !== "true") {
                            activate(candidate, true);
                            break;
                        }
                        candidate = (candidate + (event.key === previous ? -1 : 1) + tabs.length) % tabs.length;
                    }
                }
            });
        });

        const selected = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
        activate(selected >= 0 ? selected : 0);
    });

    /* Accordion: supports optional single-open mode */
    document.querySelectorAll("[data-accordion]").forEach((root) => {
        const triggers = [...root.querySelectorAll("[data-accordion-trigger]")];

        const setExpanded = (trigger, expanded) => {
            const panelId = trigger.getAttribute("aria-controls");
            const panel = panelId
                ? document.getElementById(panelId)
                : trigger.nextElementSibling;

            if (!panel) return;

            if (expanded && root.hasAttribute("data-accordion-single")) {
                triggers.filter((item) => item !== trigger).forEach((item) => {
                    const otherId = item.getAttribute("aria-controls");
                    const otherPanel = otherId
                        ? document.getElementById(otherId)
                        : item.nextElementSibling;
                    item.setAttribute("aria-expanded", "false");
                    if (otherPanel) otherPanel.hidden = true;
                });
            }

            trigger.setAttribute("aria-expanded", String(expanded));
            panel.hidden = !expanded;
        };

        triggers.forEach((trigger, index) => {
            const expanded = trigger.getAttribute("aria-expanded") === "true";
            setExpanded(trigger, expanded);

            trigger.addEventListener("click", () => {
                setExpanded(trigger, trigger.getAttribute("aria-expanded") !== "true");
            });

            trigger.addEventListener("keydown", (event) => {
                let target = null;
                if (event.key === "ArrowDown") target = (index + 1) % triggers.length;
                if (event.key === "ArrowUp") target = (index - 1 + triggers.length) % triggers.length;
                if (event.key === "Home") target = 0;
                if (event.key === "End") target = triggers.length - 1;

                if (target !== null) {
                    event.preventDefault();
                    triggers[target].focus();
                }
            });
        });
    });

    /* Modal: focus trap, Escape, backdrop click and focus restoration */
    const modalOpeners = new WeakMap();

    const getModalFocusables = (modal) => [...modal.querySelectorAll(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => !element.hidden && element.getAttribute("aria-hidden") !== "true");

    const openModal = (modal, opener) => {
        if (!modal || !modal.hidden) return;

        modalOpeners.set(modal, opener || document.activeElement);
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.dataset.modalOpen = "true";

        const initialFocus = modal.querySelector("[data-modal-autofocus], [data-modal-close]") ||
            getModalFocusables(modal)[0] ||
            modal.querySelector("[role='dialog']");

        if (initialFocus) {
            if (!initialFocus.hasAttribute("tabindex") && initialFocus.matches("[role='dialog']")) {
                initialFocus.setAttribute("tabindex", "-1");
            }
            initialFocus.focus();
        }
    };

    const closeModal = (modal) => {
        if (!modal || modal.hidden) return;

        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");

        const remaining = [...document.querySelectorAll("[data-modal]")].some((item) => !item.hidden);
        if (!remaining) delete document.body.dataset.modalOpen;

        const opener = modalOpeners.get(modal);
        if (opener?.isConnected) opener.focus();
    };

    document.querySelectorAll("[data-modal-open]").forEach((button) => {
        button.addEventListener("click", () => {
            openModal(document.querySelector(button.getAttribute("data-modal-open")), button);
        });
    });

    document.querySelectorAll("[data-modal-close]").forEach((button) => {
        button.addEventListener("click", () => closeModal(button.closest("[data-modal]")));
    });

    document.querySelectorAll("[data-modal]").forEach((modal) => {
        modal.setAttribute("aria-hidden", String(modal.hidden));

        modal.addEventListener("click", (event) => {
            if (event.target === modal && modal.hasAttribute("data-modal-backdrop-close")) {
                closeModal(modal);
            }
        });

        modal.addEventListener("keydown", (event) => {
            if (event.key !== "Tab") return;

            const focusables = getModalFocusables(modal);
            if (!focusables.length) {
                event.preventDefault();
                modal.querySelector("[role='dialog']")?.focus();
                return;
            }

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        const openModals = [...document.querySelectorAll("[data-modal]:not([hidden])")];
        const modal = openModals.at(-1);

        if (modal) {
            event.preventDefault();
            closeModal(modal);
        }
    });

    /* Documentation: Responsive Sidebar */
    const menuButton = document.querySelector("#docs-menu-toggle");
    const sidebar = document.querySelector("#docs-sidebar");
    const overlay = document.querySelector("#docs-overlay");
    const desktopBreakpoint = window.matchMedia("(min-width: 1024px)");

    if (menuButton && sidebar && overlay) {
        const navLinks = sidebar.querySelectorAll(".docs-nav-link");

        const setSidebarState = (open, restoreFocus = false) => {
            const desktop = desktopBreakpoint.matches;

            if (desktop) open = false;

            sidebar.classList.toggle("open", open);
            overlay.hidden = !open;
            menuButton.setAttribute("aria-expanded", String(open));
            sidebar.setAttribute("aria-hidden", String(!desktop && !open));

            document.body.style.overflow = open ? "hidden": "";

            if (restoreFocus && !desktop) {
                menuButton.focus();
            }
        };

        const openSidebar = () => {
            if (desktopBreakpoint.matches) return;

            setSidebarState(true);
            sidebar.querySelector(".docs-nav-link")?.focus();
        };

        const closeSidebar = (restoreFocus = false) => {
            const wasOpen = sidebar.classList.contains("open");

            setSidebarState(false, restoreFocus && wasOpen);
        };

        menuButton.addEventListener("click", () => {
            const isOpen = sidebar.classList.contains("open");

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        overlay.addEventListener("click",
            () => {
                closeSidebar(true);
            });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeSidebar();
            });
        });

        document.addEventListener("keydown",
            (event) => {
                if (event.key === "Escape" && sidebar.classList.contains("open")) {
                    closeSidebar(true);
                }
            });

        desktopBreakpoint.addEventListener("change",
            (event) => {
                if (event.matches) {
                    closeSidebar();
                    sidebar.setAttribute("aria-hidden", "false");
                } else {
                    sidebar.setAttribute("aria-hidden", "true");
                }
            });

        setSidebarState(false);
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

    /* Documentation: Code Preview */
    const normalizeCode = (value) => {
        const lines = value.replace(/\r\n?/g, "\n").split("\n");

        while (lines.length && !lines[0].trim()) lines.shift();
        while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

        if (!lines.length) return "";

        const followingLines = lines.slice(1).filter((line) => line.trim());
        const indentation = followingLines.length
        ? Math.min(...followingLines.map((line) => line.match(/^[\t ]*/)[0].length)): 0;

        return lines.map((line, index) => {
            if (!line.trim()) return "";
            if (index === 0) return line.trimStart();
            return line.slice(indentation);
        }).join("\n");
    };

    document.querySelectorAll(".docs-code pre code").forEach((code) => {
        code.textContent = normalizeCode(code.textContent);
    });

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

    function dedentCode(element) {
        const lines = element.textContent.replace(/^\n|\n\s*$/g, '').split('\n');
        const indent = Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^\s*/)[0].length));
        element.textContent = lines.map(line => line.slice(indent)).join('\n');
    }

    document.querySelectorAll('pre code').forEach(dedentCode);
});