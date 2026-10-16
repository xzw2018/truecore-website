(() => {
  'use strict';
  const site = window.CLSite;
  const products = window.CL_PRODUCTS || [];
  const root = document.getElementById('productDetail');
  if (!root || !site) return;
  const esc = site.escapeHTML;
  const requestedId = new URLSearchParams(location.search).get('id');
  const product = site.getProduct(requestedId);
  const breadcrumb = document.getElementById('productBreadcrumbName');
  const relatedSection = document.getElementById('relatedSection');
  if (!product) {
    document.title = 'Product not found · chenglian'; breadcrumb.textContent = 'Product not found';
    root.innerHTML = `<section class="detail-not-found"><p class="eyebrow">PRODUCT NOT FOUND</p><h1>This product could not be found.</h1><p>The link may have changed. Browse our catalogue of servers, switches, enterprise drives and components.</p><a class="button button-primary" href="products.html">Back to products <i data-lucide="arrow-right"></i></a></section>`;
    site.refreshIcons(); return;
  }
  const consult = `contact.html?type=product&amp;product=${encodeURIComponent(product.id)}#formTitle`;
  const categoryLink = `products.html?category=${encodeURIComponent(product.category)}`;
  const categories = window.CL_CATEGORIES || {};
  const types = window.CL_PRODUCT_TYPES || {};
  const source = product.sourceUrl ? `<a href="${esc(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">Manufacturer specifications <i data-lucide="external-link"></i></a>` : '';
  const pictureLabel = product.imageScope === 'series' ? 'Manufacturer series image' : 'Manufacturer product image';
  const imageNote = product.imageNote || 'Product appearance is shown for reference. Confirm the exact configuration before ordering.';
  const specItems = product.specs.map(([label,value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('');
  const purchasing = product.category === 'storage' ? 'Confirm capacity, SATA / SAS / NVMe interface, drive form factor and backplane support. Check the server model for compatible carriers, firmware and qualified drives.' : product.category === 'server' ? 'Confirm processor, memory, storage, networking and power requirements. The chassis image does not define the installed components; these must be specified in the bill of materials.' : product.category === 'switch' ? 'Confirm access and uplink speeds, transceiver specifications, power requirements and network features. Check the quotation for included optics, cables and software licences.' : 'Verify the full part number, interface, installation clearance and system compatibility list. A matching connector does not guarantee compatibility with every platform.';
  document.title = `${product.name} · chenglian`;
  document.querySelector('meta[name="description"]').content = `${product.name}: ${product.description} View product images, model specifications and manufacturer documentation, or discuss your requirements.`;
  breadcrumb.textContent = product.name;
  root.innerHTML = `<section class="detail-layout" aria-labelledby="productTitle">
    <div><figure class="detail-main-visual"><button type="button" class="detail-image-button" id="openProductImage" aria-label="Enlarge ${esc(product.name)} product image"><img src="${esc(product.image)}" alt="${esc(product.imageAlt || product.name + ' product image')}" width="800" height="600" fetchpriority="high"><span class="detail-zoom-label"><i data-lucide="maximize-2"></i> Enlarge image</span></button><figcaption>${esc(pictureLabel)}</figcaption></figure><div class="detail-image-caption"><span>${esc(product.brand || '')} / ${esc(types[product.subtype] || categories[product.category])}</span><a href="${categoryLink}">Browse ${esc(categories[product.category])} ↗</a></div><p class="detail-photo-note">${esc(imageNote)}</p></div>
    <div class="detail-copy"><p class="eyebrow">${esc(product.categoryLabel)}</p><h1 id="productTitle">${esc(product.name)}</h1><p class="detail-model-number"><span>Model / part number</span><strong>${esc(product.model || product.name)}</strong></p><p class="detail-lead">${esc(product.description)}</p><div class="detail-price"><strong>Pricing on request</strong><span>Configuration and lead time confirmed with your quote.</span></div><dl class="detail-key-specs">${product.specs.slice(0,4).map(([label,value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><div class="detail-actions"><a class="button button-primary" href="${consult}">Request a quote <i data-lucide="arrow-up-right"></i></a><button class="detail-favorite" type="button" data-favorite-product="${esc(product.id)}" aria-label="Save ${esc(product.name)}" aria-pressed="false"><i data-lucide="heart"></i></button></div><div class="detail-source-link">${source}</div></div>
    </section><nav class="detail-anchor-nav" aria-label="Product details navigation"><a href="#selectionOverview">Applications</a><a href="#configurationSpecs">Specifications</a><a href="#productSources">Documentation</a><a href="#relatedSection">Related hardware</a></nav>
    <section class="detail-info" id="selectionOverview"><div><p class="eyebrow">APPLICATIONS</p><h2>Typical applications.</h2><p>${esc(product.scenario)}</p>${product.category === 'server' ? '<a class="text-link detail-storage-link" href="products.html?category=storage">Explore server drives <i data-lucide="hard-drive"></i></a>' : ''}</div><div class="detail-scenario-box"><i data-lucide="clipboard-check"></i><div><h3>Before you order</h3><p>${esc(purchasing)}</p></div></div></section>
    <section class="detail-specifications" id="configurationSpecs"><p class="eyebrow">MODEL SPECIFICATIONS</p><h2>Specifications</h2><dl>${specItems}</dl><p class="catalog-example-note"><i data-lucide="info"></i> Optional configurations, slot counts and maximum performance are based on manufacturer documentation and do not describe a standard shipping configuration. Confirm capacity, interfaces and compatibility for your requirements.</p></section>
    <section class="detail-sources" id="productSources"><div><h2>Product documentation</h2><p>${esc(product.sourceTitle || product.name + ' manufacturer documentation')}</p><p>Documentation reviewed: ${esc(product.verifiedAt || '2026-10-16')}</p></div><div>${source}${product.imageSource ? `<a href="${esc(product.imageSource)}" target="_blank" rel="noopener noreferrer">View image source <i data-lucide="external-link"></i></a>` : ''}</div></section>
    <dialog class="product-image-dialog" id="productImageDialog" aria-labelledby="productImageTitle"><div><h2 id="productImageTitle">${esc(product.name)}</h2><button class="icon-button" type="button" id="closeProductImage" aria-label="Close enlarged image"><i data-lucide="x"></i></button></div><img src="${esc(product.image)}" alt="${esc(product.imageAlt || product.name + ' product image')}"><p>${esc(imageNote)}</p></dialog>`;
  let related = products.filter(item => item.id !== product.id).sort((a,b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0,3);
  if (product.category === 'server') { const disk = products.find(item => item.category === 'storage'); if (disk) related = [...related.slice(0,2),disk]; }
  document.getElementById('relatedProducts').innerHTML = related.map(item => `<a class="detail-related-card" href="product-detail.html?id=${encodeURIComponent(item.id)}"><img src="${esc(item.image)}" alt="${esc(item.imageAlt || item.name + ' product image')}" width="800" height="600" loading="lazy" decoding="async"><span class="detail-related-card-body"><span><small>${esc(item.brand || item.categoryLabel)}</small><strong>${esc(item.name)}</strong><em>View specifications</em></span><i data-lucide="arrow-up-right"></i></span></a>`).join('');
  relatedSection.hidden = false;
  const dialog = document.getElementById('productImageDialog'); const open = document.getElementById('openProductImage');
  open.addEventListener('click',() => dialog.showModal());
  document.getElementById('closeProductImage').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => open.focus());
  dialog.addEventListener('click',event => { if(event.target !== dialog) return;const box = dialog.getBoundingClientRect();if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); });
  site.updateFavoriteUI(); site.refreshIcons();
})();
