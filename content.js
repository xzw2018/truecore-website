(() => {
  "use strict";
  const searchInput = document.getElementById("faq-search");
  const faqItems = Array.from(document.querySelectorAll(".cl-faq-item"));
  const resultCount = document.getElementById("faq-results");
  const emptyState = document.getElementById("faq-empty");
  const normalize = value => value.toLocaleLowerCase().replace(/\s+/g, " ").trim();

  function filterQuestions() {
    if (!searchInput) return;
    const terms = normalize(searchInput.value).split(" ").filter(Boolean);
    let visibleCount = 0;
    faqItems.forEach(item => {
      const searchable = normalize(`${item.textContent} ${item.dataset.keywords || ""}`);
      const matches = terms.every(term => searchable.includes(term));
      item.hidden = !matches;
      item.open = matches && terms.length > 0;
      if (matches) visibleCount += 1;
    });
    if (resultCount) resultCount.textContent = terms.length ? `${visibleCount} ${visibleCount === 1 ? "answer" : "answers"} found` : `${visibleCount} ${visibleCount === 1 ? "answer" : "answers"}`;
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }
  if (searchInput) {
    searchInput.addEventListener("input", filterQuestions);
    document.getElementById("faq-search-form")?.addEventListener("submit", event => {
      event.preventDefault();
      filterQuestions();
      document.getElementById("faq")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    });
    document.querySelectorAll("[data-faq-query]").forEach(button => {
      button.addEventListener("click", () => {
        searchInput.value = button.dataset.faqQuery;
        filterQuestions();
        searchInput.focus({ preventScroll: true });
      });
    });
    document.getElementById("faq-clear")?.addEventListener("click", () => {
      searchInput.value = "";
      filterQuestions();
      searchInput.focus({ preventScroll: true });
    });
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) searchInput.value = initialQuery;
    filterQuestions();
  }

  document.getElementById("download-checklist")?.addEventListener("click", () => {
    const checklist = [
      "chenglian | Hardware Support Checklist", "",
      "1. HARDWARE DETAILS", "[ ] System brand, exact model and hardware revision:", "[ ] Current operating system or firmware version:", "[ ] Existing component models and part numbers:", "[ ] Purchase date, supplier and proof of purchase:", "[ ] Enquiry type: Product selection / Technical / After-sales", "",
      "2. NETWORK CONNECTIONS", "[ ] Devices and port numbers at both ends:", "[ ] Port types, target speeds and operating modes:", "[ ] Transceiver models, wavelengths, fiber types and link distance:", "[ ] Cable types, lengths and connection layout:", "[ ] PoE devices and power requirements, if applicable:", "",
      "3. FAULT DESCRIPTION", "[ ] When the issue first occurred and recent changes:", "[ ] Steps to reproduce the issue:", "[ ] LED status, port output or error messages:", "[ ] Troubleshooting completed and results:", "[ ] Photos, logs and configuration excerpts with sensitive data removed:", "",
      "4. PROCUREMENT OR UPGRADE PLAN", "[ ] Application workloads, device counts and growth plans:", "[ ] CPU, memory, storage and network specifications:", "[ ] Rack space, power and cooling conditions:", "[ ] Budget range, delivery location and target date:", "",
      "5. MAINTENANCE PREPARATION", "[ ] Back up data and configurations, and verify they can be restored.", "[ ] Schedule the maintenance window; confirm affected services and a rollback plan.", "[ ] Check hardware compatibility and the service provider’s instructions.", "[ ] Keep proof of purchase and serial numbers available for the service provider.", "",
      "Remove passwords, private keys, verification codes and sensitive network details before sending an enquiry.", "Check compatibility in the documentation for the exact model. Warranty coverage, charges and service arrangements depend on the purchase channel and applicable product terms."
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", checklist], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "chenglian-service-checklist.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    const status = document.getElementById("checklist-status");
    if (status) status.textContent = "Your checklist download has started.";
    window.CLSite?.showToast?.("Checklist download started.");
  });

  document.querySelectorAll(".cl-guide").forEach(guide => {
    guide.addEventListener("toggle", () => {
      const action = guide.querySelector(".cl-guide-action");
      if (action && action.firstChild?.nodeType === Node.TEXT_NODE) action.firstChild.textContent = guide.open ? "Close guide " : "Read guide ";
    });
  });
  function revealLinkedGuide() {
    let id;
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    const guide = document.getElementById(id);
    if (guide?.matches(".cl-guide")) guide.open = true;
  }
  revealLinkedGuide();
  window.addEventListener("hashchange", revealLinkedGuide);
  window.CLSite?.refreshIcons?.();
})();
