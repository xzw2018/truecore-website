(function () {
  "use strict";

  const form = document.querySelector("#consultationForm");
  if (!form) return;
  const site = window.CLSite || {};
  const products = Array.isArray(window.CL_PRODUCTS) ? window.CL_PRODUCTS : [];
  const field = (name) => form.elements.namedItem(name);
  const context = document.querySelector("#consultationContext");
  const businessFields = document.querySelector("#businessFields");
  const status = document.querySelector("#consultationMessage");
  const result = document.querySelector("#consultationResult");
  const summary = document.querySelector("#consultationSummary");
  const resultNotice = document.querySelector("#resultNotice");
  const copyButton = document.querySelector("#copyConsultationButton");
  const downloadButton = document.querySelector("#downloadConsultationButton");
  const saveButton = document.querySelector("#saveDraftButton");
  const loadButton = document.querySelector("#loadDraftButton");
  const removeButton = document.querySelector("#removeDraftButton");
  const draftStatus = document.querySelector("#draftStatus");
  const storageKey = "chenglian-consultation-draft-v1";
  const draftFields = ["type", "product", "name", "contact", "organization", "usage", "quantity", "timeline", "message"];
  const labels = { general: "General enquiry", product: "Product advice", business: "Procurement", technical: "Compatibility check", support: "After-sales support" };
  const prompts = {
    general: "Describe the hardware and configuration you need. Minimum 10 characters.",
    product: "List models and quantities. For drives, add capacity, interface and server model. Minimum 10 characters.",
    business: "Include project scope, quantities, budget and target delivery. Minimum 10 characters.",
    technical: "Include equipment models, interfaces, port speeds and compatibility questions. Minimum 10 characters.",
    support: "Describe the fault, equipment model and checks already made. Do not include passwords. Minimum 10 characters.",
  };
  let generatedText = "";
  let generatedType = "general";
  let generatedDirty = false;
  let unknownProduct = false;

  Object.entries(window.CL_CATEGORIES || {}).filter(([key]) => key !== 'all').forEach(([category,label]) => {
    const group = document.createElement('optgroup'); group.label = label;
    products.filter(product => product.category === category).forEach(product => {
      const option = document.createElement('option'); option.value = product.id; option.textContent = product.name; group.append(option);
    });
    if (group.children.length) field('product').append(group);
  });

  function getProduct(id) { return site.getProduct?.(id) || products.find((product) => product.id === id); }
  function notify(text) { status.textContent = text; }
  function updateCounter() { document.querySelector("#con-message-count").textContent = `${field("message").value.length} / 3000`; }

  function renderProductContext() {
    const product = getProduct(field("product").value);
    context.replaceChildren();
    context.classList.toggle("con-context-warning", unknownProduct);
    context.hidden = !product && !unknownProduct;
    if (unknownProduct) {
      context.textContent = "The linked product was not found. Choose a product or enter its model in your requirements.";
      return;
    }
    if (!product) return;
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = "";
    image.width = 64;
    image.height = 64;
    image.addEventListener("error", () => { image.hidden = true; });
    const copy = document.createElement("span");
    const label = document.createElement("small");
    label.textContent = "Selected product";
    const name = document.createElement("strong");
    name.textContent = product.name;
    const link = document.createElement("a");
    link.href = `product-detail.html?id=${encodeURIComponent(product.id)}`;
    link.textContent = "View product details ↗";
    copy.append(label, name, link);
    context.append(image, copy);
  }

  function syncType() {
    const business = field("type").value === "business";
    businessFields.hidden = !business;
    businessFields.disabled = !business;
    ["organization", "usage", "quantity"].forEach((name) => { field(name).required = business; });
    document.querySelector("#organizationLabel").textContent = business ? "Company or organization *" : "Company or organization";
    document.querySelector("#usageLabel").textContent = business ? "Deployment *" : "Deployment";
    field("organization").placeholder = business ? "Company or organization name" : "Optional";
    field("message").placeholder = prompts[field("type").value] || prompts.general;
    ["organization", "usage", "quantity"].forEach(clearError);
  }

  function clearError(name) {
    const input = field(name);
    const error = form.querySelector(`[data-error-for="${name}"]`);
    if (input) { input.setCustomValidity(""); input.removeAttribute("aria-invalid"); }
    if (error) error.textContent = "";
  }

  function validate() {
    const errors = {};
    if (!field("name").value.trim()) errors.name = "Enter your name.";
    const contact = field("contact").value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
    const phoneDigits = contact.replace(/[+\s().-]/g, "");
    const isPhone = /^\+?[0-9\s().-]+$/.test(contact) && /^\d{7,15}$/.test(phoneDigits);
    if (!isEmail && !isPhone) errors.contact = "Enter a valid email address or a phone number with 7–15 digits.";
    if (field("type").value === "business") {
      if (!field("organization").value.trim()) errors.organization = "Enter your company or organization name.";
      if (!field("usage").value.trim()) errors.usage = "Describe where or how the equipment will be used.";
      const quantity = Number(field("quantity").value);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 1000000) errors.quantity = "Enter a whole number between 1 and 1,000,000.";
    }
    if (field("message").value.trim().length < 10) errors.message = "Describe your requirements in at least 10 characters.";
    if (!field("consent").checked) errors.consent = "Please confirm the statement above.";
    ["name", "contact", "organization", "usage", "quantity", "message", "consent"].forEach(clearError);
    Object.entries(errors).forEach(([name, text]) => {
      field(name).setCustomValidity(text);
      field(name).setAttribute("aria-invalid", "true");
      form.querySelector(`[data-error-for="${name}"]`).textContent = text;
    });
    const first = Object.keys(errors)[0];
    if (first) {
      notify("Check the highlighted fields to continue.");
      field(first).focus();
      return false;
    }
    return true;
  }

  function collectData() {
    return Object.fromEntries(draftFields.map((name) => [name, field(name).value.trim()]));
  }

  function markChanged() {
    if (!generatedText) return;
    generatedDirty = true;
    resultNotice.textContent = "Details changed. Select “Prepare enquiry” to update this document.";
    copyButton.disabled = true;
    downloadButton.disabled = true;
  }

  function refreshDraftStatus(message) {
    try {
      const hasDraft = Boolean(localStorage.getItem(storageKey));
      loadButton.disabled = !hasDraft;
      removeButton.disabled = !hasDraft;
      draftStatus.textContent = message || (hasDraft ? "A saved draft is available on this device. Select “Restore draft” to open it." : "No draft saved.");
    } catch {
      loadButton.disabled = true;
      removeButton.disabled = true;
      draftStatus.textContent = "Browser storage is unavailable. You can still prepare and download an enquiry.";
    }
  }

  const params = new URLSearchParams(window.location.search);
  const topicTypes = { technical: "technical", sales: "business", "after-sales": "support", coordination: "general" };
  const requestedType = params.get("type") || topicTypes[params.get("topic")];
  if (Object.prototype.hasOwnProperty.call(labels, requestedType)) field("type").value = requestedType;
  const requestedProduct = params.get("product");
  if (requestedProduct) {
    if (getProduct(requestedProduct)) {
      field("product").value = getProduct(requestedProduct).id;
      if (!requestedType) field("type").value = "product";
    } else unknownProduct = true;
  }
  const scenarioLabels = { office: "Office networking", datacenter: "Data center infrastructure", maintenance: "Expansion and spare parts", expansion: "Expansion and spare parts" };
  if (params.get("scenario")) field("usage").value = scenarioLabels[params.get("scenario")] || params.get("scenario").slice(0, 240);
  syncType();
  renderProductContext();
  updateCounter();
  refreshDraftStatus();

  field("type").addEventListener("change", syncType);
  field("product").addEventListener("change", () => { unknownProduct = false; renderProductContext(); });
  form.addEventListener("input", (event) => {
    if (!event.target.name || event.target.name === "saveDraft") return;
    clearError(event.target.name);
    updateCounter();
    markChanged();
  });
  form.addEventListener("change", (event) => {
    if (event.target.name !== "saveDraft") markChanged();
  });
  field("saveDraft").addEventListener("change", () => { saveButton.disabled = !field("saveDraft").checked; });

  saveButton.addEventListener("click", () => {
    if (!field("saveDraft").checked) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ version: 1, savedAt: new Date().toISOString(), fields: collectData() }));
      refreshDraftStatus("Draft saved. Save again after making changes.");
    } catch { draftStatus.textContent = "Unable to save the draft. Check browser storage settings or download your enquiry instead."; }
  });
  loadButton.addEventListener("click", () => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw || raw.length > 20000) throw new Error("Invalid draft size");
      const draft = JSON.parse(raw);
      if (!draft || draft.version !== 1 || !draft.fields || typeof draft.fields !== "object" || Array.isArray(draft.fields)) throw new Error("Invalid draft");
      if (!draftFields.every((name) => typeof draft.fields[name] === "string") || !Object.prototype.hasOwnProperty.call(labels, draft.fields.type)) throw new Error("Invalid draft fields");
      const values = Object.fromEntries(draftFields.map((name) => {
        const max = field(name).maxLength > 0 ? field(name).maxLength : 3000;
        return [name, draft.fields[name].slice(0, max)];
      }));
      const missingProduct = Boolean(values.product && !getProduct(values.product));
      if (missingProduct) values.product = "";
      draftFields.forEach((name) => { field(name).value = values[name]; });
      field("consent").checked = false;
      unknownProduct = missingProduct;
      ["name", "contact", "organization", "usage", "quantity", "message", "consent"].forEach(clearError);
      syncType(); renderProductContext(); updateCounter(); markChanged();
      refreshDraftStatus("Draft restored. Review the details and check the consent box again.");
      notify("Draft restored. Review the form before preparing your enquiry.");
    } catch { draftStatus.textContent = "Unable to read this draft. Your entries are unchanged. Delete the draft and save a new one."; }
  });
  removeButton.addEventListener("click", () => {
    try {
      localStorage.removeItem(storageKey);
      field("saveDraft").checked = false;
      saveButton.disabled = true;
      refreshDraftStatus("Draft deleted. Your form entries are unchanged.");
    } catch { draftStatus.textContent = "Unable to delete the draft. Check your browser storage settings."; }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;
    const data = collectData();
    const product = getProduct(data.product);
    const lines = ["chenglian Project Enquiry", "━━━━━━━━━━━━━━━━━━━━", `Prepared: ${new Date().toLocaleString("en-GB", { hour12: false, timeZoneName: "short" })}`, `Enquiry type: ${labels[data.type]}`, `Name: ${data.name}`, `Email or phone: ${data.contact}`];
    if (product) lines.push(`Product: ${product.name} (${product.id})`);
    if (data.organization) lines.push(`Company or organization: ${data.organization}`);
    if (data.usage) lines.push(`Deployment: ${data.usage}`);
    if (data.type === "business") {
      lines.push(`Estimated quantity: ${data.quantity}`);
      if (data.timeline) lines.push(`Target delivery: ${data.timeline}`);
    }
    lines.push("", "Requirements:", data.message, "", "This enquiry was prepared locally and has not been sent. Send it to a verified chenglian contact. It is not an order.");
    generatedText = lines.join("\n");
    generatedType = data.type;
    generatedDirty = false;
    summary.textContent = generatedText;
    result.hidden = false;
    resultNotice.textContent = "Check the details, then copy or download the document to send.";
    copyButton.disabled = false;
    downloadButton.disabled = false;
    notify("Enquiry prepared below. Nothing has been sent.");
    if (typeof site.refreshIcons === "function") site.refreshIcons();
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  copyButton.addEventListener("click", async () => {
    if (!generatedText || generatedDirty) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(generatedText);
      resultNotice.textContent = "Enquiry copied. Send it to your verified chenglian contact.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(summary);
      selection.removeAllRanges();
      selection.addRange(range);
      summary.focus();
      resultNotice.textContent = "Automatic copy is unavailable. Copy the selected text or choose “Download TXT”.";
    }
  });
  downloadButton.addEventListener("click", () => {
    if (!generatedText || generatedDirty) return;
    const url = URL.createObjectURL(new Blob(["\uFEFF", generatedText], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    link.download = `chenglian-enquiry-${generatedType}-${date}.txt`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    resultNotice.textContent = "Download started. Send the saved file to your verified chenglian contact.";
  });
})();
