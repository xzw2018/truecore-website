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
  const resultTitle = document.querySelector("#resultTitle");
  const resultDeliveryStatus = document.querySelector("#resultDeliveryStatus");
  const exportStatus = document.querySelector("#exportStatus");
  const submitButton = document.querySelector("#sendEnquiryButton");
  const submitLabel = document.querySelector("#sendEnquiryLabel");
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
  let generatedFingerprint = "";
  let currentResultNotice = "";
  let unknownProduct = false;
  let sending = false;
  const submissionOutcomes = new Map();
  const deliveryURL = "https://formsubmit.co/ajax/3537213006@qq.com";

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

  function requestData() {
    const data = collectData();
    if (data.type !== "business") { data.quantity = ""; data.timeline = ""; }
    else {
      const quantity = Number(data.quantity);
      if (Number.isInteger(quantity) && quantity >= 1 && quantity <= 1000000) data.quantity = String(quantity);
    }
    return { ...data, consent: field("consent").checked, website: field("website").value.trim() };
  }

  function fingerprint(data = requestData()) {
    // Consent and the spam trap are not enquiry contents and cannot bypass duplicate protection.
    const { consent, website, ...contents } = data;
    return JSON.stringify(contents);
  }

  function syncSubmitButton() {
    const outcome = submissionOutcomes.get(fingerprint());
    submitButton.disabled = sending || Boolean(outcome);
    submitLabel.textContent = sending ? "Sending…" : outcome === "accepted" ? "Enquiry submitted" : outcome ? "Check submission status" : "Send enquiry";
  }

  function markChanged() {
    if (sending) return;
    syncSubmitButton();
    if (!generatedText) return;
    generatedDirty = fingerprint() !== generatedFingerprint;
    resultNotice.textContent = generatedDirty ? "Your form has changed. The copy below contains your previous details. Send the updated enquiry when ready." : currentResultNotice;
    copyButton.disabled = generatedDirty;
    downloadButton.disabled = generatedDirty;
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
      notify("Draft restored. Review the form before sending your enquiry.");
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

  function prepareSummary(data) {
    const product = getProduct(data.product);
    const lines = ["chenglian Project Enquiry", "━━━━━━━━━━━━━━━━━━━━", `Prepared: ${new Date().toLocaleString("en-GB", { hour12: false, timeZoneName: "short" })}`, `Enquiry type: ${labels[data.type]}`, `Name: ${data.name}`, `Email or phone: ${data.contact}`];
    if (product) lines.push(`Product: ${product.name} (${product.id})`);
    if (data.organization) lines.push(`Company or organization: ${data.organization}`);
    if (data.usage) lines.push(`Deployment: ${data.usage}`);
    if (data.type === "business") {
      lines.push(`Estimated quantity: ${data.quantity}`);
      if (data.timeline) lines.push(`Target delivery: ${data.timeline}`);
    }
    lines.push("", "Requirements:", data.message, "", "This document records your enquiry details. It is not an order or proof of email delivery.");
    generatedText = lines.join("\n");
    generatedType = data.type;
    generatedDirty = false;
    generatedFingerprint = fingerprint(data);
    summary.textContent = generatedText;
    result.hidden = false;
    exportStatus.textContent = "";
    copyButton.disabled = false;
    downloadButton.disabled = false;
  }

  function showResult(state, title, message, deliveryStatus) {
    result.dataset.state = state;
    resultTitle.textContent = title;
    currentResultNotice = message;
    resultNotice.textContent = message;
    resultDeliveryStatus.textContent = deliveryStatus;
    const icon = document.createElement("i");
    icon.dataset.lucide = state === "accepted" ? "check" : state === "sending" ? "loader-circle" : "info";
    icon.setAttribute("aria-hidden", "true");
    result.querySelector(".con-result-icon").replaceChildren(icon);
    site.refreshIcons?.();
    notify(`${title}. ${message}`);
  }

  function focusResult() {
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  function showUnconfirmed(key) {
    submissionOutcomes.set(key, "unconfirmed");
    showResult("unconfirmed", "Submission status unknown", "We could not confirm whether your enquiry was accepted. Your details are preserved below. Contact 3537213006@qq.com to check before sending again.", "No automatic retry was made. Repeating this enquiry could send a duplicate.");
  }

  function showRateLimit(response) {
    const seconds = Number(response.headers.get("Retry-After"));
    const wait = Number.isInteger(seconds) && seconds > 0 && seconds <= 3600 ? `Wait ${seconds} seconds before trying again.` : "Wait a few minutes before trying again.";
    showResult("error", "Please wait before sending", `${wait} Your enquiry is preserved below.`, "This attempt was not sent. You can also email 3537213006@qq.com.");
  }

  function showPreparationFailure() {
    showResult("error", "Enquiry not sent", "We could not prepare your enquiry for email delivery. Try again, or email 3537213006@qq.com.", "This attempt was not sent to the email service. Your details are preserved below.");
  }

  function applyServerErrors(errors) {
    const messages = {
      type: "Choose an enquiry type.", product: "Select a product from the list or leave it blank.",
      name: "Enter your name (up to 80 characters).", contact: "Enter a valid email address or a phone number with 7–15 digits.",
      organization: "Check your company or organization name (up to 160 characters).", usage: "Check your deployment details (up to 240 characters).",
      quantity: "Enter a whole number between 1 and 1,000,000.", timeline: "Keep the target delivery details within 100 characters.",
      message: "Describe your requirements in 10–3,000 characters.", consent: "Confirm that you agree to send your details."
    };
    const names = Object.keys(errors || {}).filter(name => Object.prototype.hasOwnProperty.call(messages, name));
    names.forEach(name => {
      const input = field(name);
      const error = form.querySelector(`[data-error-for="${name}"]`);
      input.setCustomValidity(messages[name]);
      input.setAttribute("aria-invalid", "true");
      if (error) error.textContent = messages[name];
    });
    return names[0];
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    const data = requestData();
    const key = fingerprint(data);
    if (submissionOutcomes.has(key)) {
      notify(submissionOutcomes.get(key) === "accepted" ? "This enquiry has already been submitted. Edit the details to send an updated enquiry." : "The status of this enquiry is unknown. Contact 3537213006@qq.com before sending it again.");
      return;
    }
    if (!validate()) return;
    prepareSummary(data);
    sending = true;
    const controlStates = Array.from(form.elements).map(control => [control, control.disabled]);
    controlStates.forEach(([control]) => { control.disabled = true; });
    form.setAttribute("aria-busy", "true");
    syncSubmitButton();
    showResult("sending", "Sending your enquiry", "Please keep this page open while we request email delivery.", "Awaiting confirmation from the email service.");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000);
    let deliveryTimeout;
    let deliveryStarted = false;
    let errorField;
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: "same-origin", body: JSON.stringify(data), signal: controller.signal
      });
      const body = await response.json().catch(() => null);
      if (response.status === 200 && body?.ok === true && body.status === "ready") {
        const payload = body.delivery?.payload;
        if (body.delivery?.url !== deliveryURL || !payload || typeof payload !== "object" || Array.isArray(payload)) {
          showPreparationFailure();
          return;
        }
        // The same-origin endpoint only prepares the enquiry. The browser sends the validated payload directly.
        deliveryTimeout = setTimeout(() => controller.abort(), 18000);
        deliveryStarted = true;
        const delivery = await fetch(deliveryURL, {
          method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
          credentials: "omit", body: JSON.stringify(payload), signal: controller.signal, redirect: "error"
        });
        if (delivery.status === 429) {
          showRateLimit(delivery);
          return;
        }
        if (!delivery.ok) {
          showUnconfirmed(key);
          return;
        }
        const receipt = await delivery.json().catch(() => null);
        if (typeof receipt?.message === "string" && /needs? activation|activate (?:your |the )?form|confirm (?:your )?email/i.test(receipt.message)) {
          submissionOutcomes.set(key, "activation");
          showResult("activation", "Email setup pending", "The email service is awaiting activation and may retain your enquiry until setup is complete. Contact 3537213006@qq.com to check its status before sending again.", "Email delivery is not confirmed. Your details are preserved below; no automatic retry was made.");
        } else if (receipt?.success === true || receipt?.success === "true") {
          submissionOutcomes.set(key, "accepted");
          const reference = typeof body.reference === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(body.reference) ? ` Reference: ${body.reference}.` : "";
          showResult("accepted", "Enquiry submitted", "Your enquiry has been accepted for email delivery to chenglian. Keep the copy below for your records.", `Accepted for email delivery; inbox receipt is not confirmed.${reference} This enquiry is not an order.`);
        } else if (receipt?.success === false || receipt?.success === "false") {
          showResult("error", "Email submission failed", "Your enquiry could not be accepted for email delivery. Try again later, or email 3537213006@qq.com.", "Your details are preserved below. Copy or download your enquiry to send by email.");
        } else {
          showUnconfirmed(key);
        }
      } else if (response.status === 422 && body?.code === "validation_error") {
        errorField = applyServerErrors(body.errors);
        showResult("error", "Check your enquiry", "Some details need attention. Review the highlighted fields and send again.", "Your enquiry has not been sent. Your details are preserved below.");
      } else if (response.status === 429) {
        showRateLimit(response);
      } else if (["service_unavailable", "origin_not_allowed", "unsupported_content_type", "payload_too_large", "invalid_json", "invalid_submission"].includes(body?.code)) {
        const message = body.code === "service_unavailable"
          ? "Email submission is temporarily unavailable. Try again later, or email 3537213006@qq.com."
          : body.code === "payload_too_large"
            ? "Your enquiry exceeds the submission limit. Shorten your requirements and try again, or email 3537213006@qq.com."
            : "We could not process this submission. Review your details and try again, or email 3537213006@qq.com.";
        showResult("error", "Enquiry not sent", message, "This attempt was not sent to the email service. Your details are preserved below.");
      } else {
        showPreparationFailure();
      }
    } catch {
      if (deliveryStarted) showUnconfirmed(key);
      else showPreparationFailure();
    } finally {
      clearTimeout(timeout);
      clearTimeout(deliveryTimeout);
      controlStates.forEach(([control, disabled]) => { control.disabled = disabled; });
      sending = false;
      form.removeAttribute("aria-busy");
      syncSubmitButton();
      if (errorField) field(errorField).focus();
      else focusResult();
    }
  });

  copyButton.addEventListener("click", async () => {
    if (!generatedText || generatedDirty) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(generatedText);
      exportStatus.textContent = "Enquiry copied to your clipboard.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(summary);
      selection.removeAllRanges();
      selection.addRange(range);
      summary.focus();
      exportStatus.textContent = "Automatic copy is unavailable. Copy the selected text or choose “Download TXT”.";
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
    exportStatus.textContent = "Download started. Keep the file for your records or send it by email if needed.";
  });
})();
