(function () {
  "use strict";
  const site = window.CLSite;
  const products = window.CL_PRODUCTS || [];
  const categories = window.CL_CATEGORIES || {};
  const types = window.CL_PRODUCT_TYPES || {};
  const pageSize = 12;
  const grid = document.getElementById("productGrid");
  if (!grid || !site) return;
  const esc = (value) => site.escapeHTML(String(value));
  const comparisonKey = "chenglian:compare:v1";
  const byId = new Map(products.map((product) => [product.id, product]));
  const categoryOrder = Object.keys(categories);
  const elements = {
    search: document.getElementById("catalogSearchInput"), sort: document.getElementById("sortSelect"),
    summary: document.getElementById("resultsSummary"), reset: document.getElementById("clearFiltersButton"),
    empty: document.getElementById("emptyState"), emptyTitle: document.getElementById("emptyTitle"),
    emptyCopy: document.getElementById("emptyCopy"), favorites: document.getElementById("favoritesFilterButton"),
    categories: [...document.querySelectorAll("[data-category]")], bar: document.getElementById("compareBar"),
    selection: document.getElementById("compareSelection"), count: document.getElementById("compareCount"),
    open: document.getElementById("openCompareButton"), dialog: document.getElementById("compareDialog"),
    table: document.getElementById("compareTable"), brand: document.getElementById("brandSelect"),
    type: document.getElementById("typeSelect"), pagination: document.getElementById("catalogPagination")
  };
  let state;
  let compared = [];
  let previousOverflow = "";
  let previousFocus = null;

  function readState() {
    const query = new URLSearchParams(location.search);
    const hash = location.hash.slice(1);
    const category = query.get("category") || (Object.hasOwn(categories, hash) ? hash : "all");
    const sort = query.get("sort") || "featured";
    state = {
      category: Object.hasOwn(categories, category) ? category : "all",
      query: (query.get("q") || "").slice(0, 120),
      sort: ["featured", "name", "category"].includes(sort) ? sort : "featured",
      favorites: query.get("favorites") === "1" || hash === "favorites",
      brand: query.get("brand") || "all", subtype: query.get("type") || "all",
      page: /^\d{1,4}$/.test(query.get("page") || "") ? Math.max(1,Number(query.get("page"))) : 1
    };
    elements.search.value = state.query;
    elements.sort.value = state.sort;
  }

  function syncUrl() {
    const query = new URLSearchParams();
    if (state.category !== "all") query.set("category", state.category);
    if (state.query) query.set("q", state.query);
    if (state.sort !== "featured") query.set("sort", state.sort);
    if (state.favorites) query.set("favorites", "1");
    if (state.brand !== "all") query.set("brand", state.brand);
    if (state.subtype !== "all") query.set("type", state.subtype);
    if (state.page > 1) query.set("page", String(state.page));
    const next = `${location.pathname}${query.size ? `?${query.toString()}` : ""}`;
    try { history.replaceState(null, "", next); } catch (_) { /* Local file previews may restrict History API. */ }
  }

  function visibleProducts() {
    const queries = state.query.trim().toLocaleLowerCase("en-US").split(/\s+/).filter(Boolean);
    const favorites = site.getFavorites();
    return products.filter((product) => {
      const searchable = [product.name, product.brand, product.model, product.categoryLabel, product.description, product.scenario, ...(product.tags || []), ...product.specs.flat()].join(" ").toLocaleLowerCase("en-US");
      return (state.category === "all" || product.category === state.category)
        && queries.every(query => searchable.includes(query)) && (!state.favorites || favorites.has(product.id))
        && (state.brand === "all" || product.brand === state.brand) && (state.subtype === "all" || product.subtype === state.subtype);
    }).sort((a, b) => {
      if (state.sort === "name") return a.name.localeCompare(b.name, "en-US", {numeric:true});
      if (state.sort === "category") return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      return products.indexOf(a) - products.indexOf(b);
    });
  }

  function card(product) {
    const detail = `product-detail.html?id=${encodeURIComponent(product.id)}`;
    const selected = compared.includes(product.id);
    return `<article class="catalog-card" data-product-id="${esc(product.id)}">
      <div class="catalog-card-visual"><a class="catalog-card-image" href="${detail}" aria-label="View ${esc(product.name)} details"><img src="${esc(product.image)}" alt="${esc(product.imageAlt || product.name + ' product image')}" width="800" height="600" loading="lazy" decoding="async" /></a><span class="catalog-card-badge">${esc(product.badge)}</span>${product.imageScope === 'series' ? '<span class="catalog-photo-scope">Series image</span>' : ''}<button class="catalog-favorite" type="button" data-favorite-product="${esc(product.id)}" aria-label="Save ${esc(product.name)}" aria-pressed="false"><i data-lucide="heart"></i></button></div>
      <div class="catalog-card-copy"><p class="catalog-card-category">${esc(product.brand || '')} / ${esc(types[product.subtype] || product.categoryLabel)}</p><h2 class="catalog-card-title"><a href="${detail}">${esc(product.name)}</a></h2><p class="catalog-model-code">Model ${esc(product.model || product.name)}</p><p class="catalog-card-description">${esc(product.description)}</p><div class="catalog-quick-specs">${product.specs.slice(0,2).map(([label,value]) => `<span title="${esc(label + ': ' + value)}">${esc(value)}</span>`).join('')}</div><div class="catalog-card-price"><strong>Pricing on request</strong></div><div class="catalog-card-footer"><button class="catalog-compare-button" type="button" data-compare-product="${esc(product.id)}" aria-label="${selected ? "Remove from comparison" : "Compare"}: ${esc(product.name)}" aria-pressed="${selected}"><i data-lucide="${selected ? "check-square" : "square"}"></i><span>${selected ? "Selected" : "Compare"}</span></button><a class="catalog-card-link" href="${detail}">View product <i data-lucide="arrow-up-right"></i></a></div></div>
    </article>`;
  }

  function renderFacets() {
    const relevant = products.filter(product => state.category === 'all' || product.category === state.category);
    const brands = [...new Set(relevant.map(product => product.brand).filter(Boolean))].sort((a,b) => a.localeCompare(b,'en-US'));
    if (!brands.includes(state.brand)) state.brand = 'all';
    elements.brand.innerHTML = '<option value="all">All brands</option>' + brands.map(brand => `<option value="${esc(brand)}">${esc(brand)} (${relevant.filter(p => p.brand === brand).length})</option>`).join('');
    elements.brand.value = state.brand;
    const scoped = relevant.filter(p => state.brand === 'all' || p.brand === state.brand);
    const subtypes = [...new Set(scoped.map(product => product.subtype).filter(Boolean))];
    if (!subtypes.includes(state.subtype)) state.subtype = 'all';
    elements.type.innerHTML = '<option value="all">All types</option>' + subtypes.map(type => `<option value="${esc(type)}">${esc(types[type] || type)} (${scoped.filter(p => p.subtype === type).length})</option>`).join('');
    elements.type.value = state.subtype;
    document.getElementById('storageCrossLink').hidden = state.category !== 'server';
  }

  function render() {
    renderFacets();
    const visible = visibleProducts();
    const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
    state.page = Math.min(state.page,pageCount);
    const offset = (state.page - 1) * pageSize;
    grid.innerHTML = visible.slice(offset,offset + pageSize).map(card).join("");
    grid.hidden = visible.length === 0;
    elements.empty.hidden = visible.length !== 0;
    const parts = [categories[state.category] || "All products"];
    if (state.favorites) parts.push("Saved products");
    if (state.query.trim()) parts.push(`“${state.query.trim()}”`);
    if (state.brand !== 'all') parts.push(state.brand);
    if (state.subtype !== 'all') parts.push(types[state.subtype] || state.subtype);
    elements.summary.textContent = `${parts.join(" · ")} · ${visible.length} ${visible.length === 1 ? "model" : "models"}${visible.length > pageSize ? ` · Showing ${offset + 1}–${Math.min(offset + pageSize,visible.length)}` : ''}`;
    const noFavorites = state.favorites && site.getFavorites().size === 0;
    elements.emptyTitle.textContent = noFavorites ? "Your shortlist is empty" : "No matching products";
    elements.emptyCopy.textContent = noFavorites ? "Select the heart on any product to save it to your shortlist." : "Try another keyword, brand or product type, or reset the filters to view all models.";
    elements.reset.hidden = state.category === "all" && !state.query && state.sort === "featured" && !state.favorites && state.brand === 'all' && state.subtype === 'all';
    elements.categories.forEach((button) => {
      const active = button.dataset.category === state.category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    elements.favorites.setAttribute("aria-pressed", String(state.favorites));
    elements.pagination.hidden = pageCount < 2;
    elements.pagination.innerHTML = pageCount < 2 ? '' : `<button type="button" data-catalog-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="Previous page"><i data-lucide="chevron-left"></i></button>${Array.from({length:pageCount},(_,i) => `<button type="button" data-catalog-page="${i+1}" ${state.page === i+1 ? 'aria-current="page"' : ''} aria-label="Page ${i+1}">${i+1}</button>`).join('')}<button type="button" data-catalog-page="${state.page + 1}" ${state.page === pageCount ? 'disabled' : ''} aria-label="Next page"><i data-lucide="chevron-right"></i></button><span>${pageSize} per page</span>`;
    document.querySelector('[data-category-count="all"]').textContent = products.length;
    site.updateFavoriteUI();
    site.refreshIcons();
    syncUrl();
  }

  function reset() {
    state = { category:"all", query:"", sort:"featured", favorites:false, brand:'all', subtype:'all', page:1 };
    elements.search.value = "";
    elements.sort.value = "featured";
    render();
  }

  function readComparison() {
    try {
      const saved = JSON.parse(localStorage.getItem(comparisonKey) || "[]");
      compared = Array.isArray(saved) ? [...new Set(saved)].filter((id) => byId.has(id)).slice(0, 3) : [];
    } catch (_) { compared = []; }
  }

  function persistComparison() {
    try { localStorage.setItem(comparisonKey, JSON.stringify(compared)); } catch (_) { /* Selection remains available for this page session. */ }
  }

  function updateComparison() {
    elements.bar.hidden = compared.length === 0;
    document.body.classList.toggle("has-comparison", compared.length > 0);
    elements.count.textContent = `${compared.length}/3`;
    elements.open.disabled = compared.length < 2;
    elements.open.title = compared.length < 2 ? "Select one more product to compare" : "Open comparison table";
    elements.selection.innerHTML = compared.map((id) => {
      const product = byId.get(id);
      return `<div class="compare-chip"><img src="${esc(product.image)}" alt="" width="36" height="36" /><span>${esc(product.name)}</span><button type="button" data-remove-compare="${esc(id)}" aria-label="Remove from comparison: ${esc(product.name)}"><i data-lucide="x"></i></button></div>`;
    }).join("");
    grid.querySelectorAll("[data-compare-product]").forEach((button) => {
      const selected = compared.includes(button.dataset.compareProduct);
      const product = byId.get(button.dataset.compareProduct);
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `${selected ? "Remove from comparison" : "Compare"}: ${product.name}`);
      button.innerHTML = `<i data-lucide="${selected ? "check-square" : "square"}"></i><span>${selected ? "Selected" : "Compare"}</span>`;
    });
    site.refreshIcons();
  }

  function toggleComparison(id) {
    if (!byId.has(id)) return;
    if (compared.includes(id)) {
      compared = compared.filter((saved) => saved !== id);
      site.showToast(`Removed from comparison: ${byId.get(id).name}`);
    } else {
      if (compared.length >= 3) { site.showToast("You can compare up to 3 products. Remove one before adding another."); return; }
      compared.push(id);
      site.showToast(compared.length === 1 ? "Added to comparison. Select one more product to compare specifications." : `Added to comparison: ${byId.get(id).name}`);
    }
    persistComparison();
    updateComparison();
  }

  function openComparison() {
    const selected = compared.map((id) => byId.get(id));
    if (selected.length < 2) return;
    const keys = [...new Set(selected.flatMap((product) => product.specs.map(([label]) => label)))];
    const cells = (getValue) => selected.map((product) => `<td>${esc(getValue(product))}</td>`).join("");
    elements.table.innerHTML = `<caption class="sr-only">Model comparison: ${selected.map((product) => esc(product.name)).join(", ")}</caption><thead><tr><th scope="col">Specifications</th>${selected.map((product) => `<th scope="col"><img src="${esc(product.image)}" alt="" width="240" height="140" /><a href="product-detail.html?id=${encodeURIComponent(product.id)}">${esc(product.name)}</a></th>`).join("")}</tr></thead><tbody><tr><th scope="row">Brand</th>${cells(product => product.brand)}</tr><tr><th scope="row">Model / part number</th>${cells(product => product.model)}</tr><tr><th scope="row">Category</th>${cells((product) => categories[product.category])}</tr>${keys.map((label) => `<tr><th scope="row">${esc(label)}</th>${cells((product) => product.specs.find(([key]) => key === label)?.[1] || "—")}</tr>`).join("")}<tr><th scope="row">Applications</th>${cells((product) => product.scenario)}</tr><tr><th scope="row">Manufacturer documentation</th>${selected.map(product => `<td><a class="compare-consult-link" href="${esc(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">View specifications <i data-lucide="external-link"></i></a></td>`).join('')}</tr><tr><th scope="row">Next step</th>${selected.map((product) => `<td><a class="compare-consult-link" href="contact.html?type=product&amp;product=${encodeURIComponent(product.id)}#formTitle">Enquire about this model <i data-lucide="arrow-up-right"></i></a></td>`).join("")}</tr></tbody>`;
    document.getElementById("compareHint").textContent = selected.every((product) => product.category === selected[0].category) ? "Compare model specifications. Check manufacturer documentation for optional configurations and maximum capabilities." : "Your selection includes different product categories. Some specifications apply only to certain products.";
    previousFocus = document.activeElement;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    elements.dialog.showModal();
    site.refreshIcons();
    document.getElementById("closeCompareButton").focus();
  }

  elements.categories.forEach((button) => button.addEventListener("click", () => { state.category = button.dataset.category; state.page = 1; state.brand = 'all'; state.subtype = 'all'; render(); }));
  elements.search.addEventListener("input", () => { state.query = elements.search.value; state.page = 1; render(); });
  elements.sort.addEventListener("change", () => { state.sort = elements.sort.value; state.page = 1; render(); });
  elements.favorites.addEventListener("click", () => { state.favorites = !state.favorites; state.page = 1; render(); });
  elements.brand.addEventListener('change', () => { state.brand = elements.brand.value; state.subtype = 'all'; state.page = 1; render(); });
  elements.type.addEventListener('change', () => { state.subtype = elements.type.value; state.page = 1; render(); });
  elements.pagination.addEventListener('click', event => { const button = event.target.closest('[data-catalog-page]'); if (!button || button.disabled) return; state.page = Number(button.dataset.catalogPage); render(); elements.summary.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}); elements.pagination.querySelector('[aria-current="page"]')?.focus({preventScroll:true}); });
  elements.reset.addEventListener("click", reset);
  document.getElementById("emptyResetButton").addEventListener("click", () => { reset(); elements.search.focus(); });
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-compare-product]");
    if (button) toggleComparison(button.dataset.compareProduct);
  });
  elements.selection.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-compare]");
    if (!button) return;
    toggleComparison(button.dataset.removeCompare);
    (elements.selection.querySelector("button") || elements.favorites).focus();
  });
  document.getElementById("clearCompareButton").addEventListener("click", () => {
    compared = []; persistComparison(); updateComparison(); site.showToast("Comparison cleared."); elements.favorites.focus();
  });
  elements.open.addEventListener("click", openComparison);
  document.getElementById("closeCompareButton").addEventListener("click", () => elements.dialog.close());
  elements.dialog.addEventListener("click", (event) => {
    if (event.target !== elements.dialog) return;
    const bounds = elements.dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) elements.dialog.close();
  });
  elements.dialog.addEventListener("close", () => {
    document.documentElement.style.overflow = previousOverflow;
    if (previousFocus?.isConnected) previousFocus.focus();
  });
  document.addEventListener("cl:favorites-changed", () => {
    if (!state.favorites) return;
    const active = document.activeElement?.dataset.favoriteProduct;
    render();
    if (active) (grid.querySelector(`[data-favorite-product="${active}"]`) || elements.favorites).focus();
  });
  window.addEventListener("popstate", () => { readState(); render(); });
  window.addEventListener("storage", (event) => {
    if (event.key === comparisonKey || event.key === null) {
      readComparison(); updateComparison();
      if (elements.dialog.open) elements.dialog.close();
    }
  });
  readState(); readComparison(); render(); updateComparison();
})();
