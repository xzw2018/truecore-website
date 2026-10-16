(() => {
  'use strict';
  const grid = document.getElementById('featuredGrid');
  if (!grid || !window.CLSite) return;
  const escape = window.CLSite.escapeHTML;
  const products = window.CL_PRODUCTS || [];
  const labels = {server:'COMPUTE / SERVER',switch:'NETWORK / SWITCH',storage:'ENTERPRISE / STORAGE',accessory:'HARDWARE / COMPONENTS'};
  function render(category) {
    const selected = category === 'all' ? ['server','switch','storage','accessory'].map(type => products.find(p => p.category === type)).filter(Boolean) : products.filter(p => p.category === category).slice(0,4);
    grid.innerHTML = selected.map(p => `<article class="featured-card"><div class="featured-media"><a href="product-detail.html?id=${encodeURIComponent(p.id)}" aria-label="View ${escape(p.name)}"><img src="${escape(p.image)}" alt="${escape(p.imageAlt || p.name + ' product image')}" loading="lazy" width="720" height="480"></a><span class="featured-tag">${escape(p.brand || p.badge)}</span><button class="icon-button" type="button" data-favorite-product="${escape(p.id)}" aria-label="Save ${escape(p.name)}" aria-pressed="false"><i data-lucide="heart"></i></button></div><div class="featured-info"><small>${labels[p.category] || 'NETWORK EQUIPMENT'}</small><h3><a href="product-detail.html?id=${encodeURIComponent(p.id)}">${escape(p.name)}</a></h3><p>${escape(p.description)}</p><a class="featured-bottom" href="product-detail.html?id=${encodeURIComponent(p.id)}"><span>View product</span><i data-lucide="arrow-up-right"></i></a></div></article>`).join('');
    window.CLSite.updateFavoriteUI(); window.CLSite.refreshIcons();
  }
  document.querySelectorAll('[data-home-category]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-home-category]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    render(button.dataset.homeCategory);
  }));
  render('all');
})();
