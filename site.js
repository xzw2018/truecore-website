(() => {
  'use strict';
  const products = window.CL_PRODUCTS || [];
  const ids = new Set(products.map(p => p.id));
  const aliases = window.CL_PRODUCT_ALIASES || {};
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const brand = `<svg class="brand-symbol" viewBox="0 0 40 40" aria-hidden="true"><path d="M29 3H17L3 17v20h17l8-8H12v-8l10-10h7z" fill="currentColor"/><path d="M25 20h12v17H24l7-7h-6z" fill="#a7c6ff"/></svg><span>chenglian</span>`;
  const page = document.body.dataset.page;
  const nav = [['home','index.html','Home'],['products','products.html','Products'],['solutions','solutions.html','Solutions'],['support','support.html','Support'],['insights','insights.html','Guides'],['about','about.html','About us']];
  const navLinks = () => nav.map(([key,href,title]) => `<a href="${href}" data-nav-page="${key}" ${page === key || (page === 'product-detail' && key === 'products') ? 'aria-current="page"':''}>${title}</a>`).join('');
  const header = document.getElementById('site-header');
  if (header) {
    header.style.display = 'contents';
    header.innerHTML = `<a class="skip-link" href="#main-content">Skip to main content</a><header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" aria-label="chenglian Home">${brand}</a><nav class="desktop-nav" aria-label="Main navigation">${navLinks()}</nav><div class="header-actions"><button class="icon-button" id="headerSearchButton" type="button" aria-label="Search products" aria-haspopup="dialog" aria-controls="headerSearch">${icon('search')}</button><a class="icon-button header-favorites" href="products.html?favorites=1" aria-label="View saved products">${icon('heart')}<span class="favorite-count" data-favorite-count hidden>0</span></a><a class="button button-primary" href="contact.html">Contact us ${icon('arrow-up-right')}</a><button class="icon-button menu-button" id="menuButton" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">${icon('menu')}</button></div></div></header><nav class="mobile-nav" id="mobileMenu" aria-label="Mobile navigation" hidden>${navLinks()}<a class="button button-primary" href="contact.html">Contact us ${icon('arrow-up-right')}</a></nav><dialog class="search-dialog" id="headerSearch" aria-labelledby="searchTitle"><div class="search-dialog-head"><h2 id="searchTitle">Search the portfolio</h2><button class="icon-button" id="closeSearchButton" type="button" aria-label="Close search">${icon('x')}</button></div><form id="globalSearchForm" role="search"><div class="global-search-field"><input type="search" id="headerSearchInput" aria-label="Product keywords" placeholder="Search brand, model or drive capacity…" maxlength="100" autocomplete="off"><button class="button button-primary" type="submit">Search ${icon('arrow-right')}</button></div></form><div class="search-suggestions"><span>Quick links</span><a href="products.html?category=server">Servers</a><a href="products.html?category=switch">Switches</a><a href="products.html?category=storage">Server drives</a></div><p class="search-dialog-note">Search by brand, full model number, capacity or port speed.</p></dialog>`;
  }
  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = `<footer class="site-footer"><div class="container"><div class="footer-main"><div class="footer-brand-block"><a class="brand" href="index.html" aria-label="chenglian Home">${brand}</a><p class="footer-brand-copy">Servers, networking and components.<br>Product selection and support for business infrastructure.</p></div><div class="footer-col"><h3>Products & solutions</h3><a href="products.html?category=server">Servers</a><a href="products.html?category=switch">Network switches</a><a href="products.html?category=storage">Server drives</a><a href="products.html?category=accessory">Components</a><a href="solutions.html">Infrastructure solutions</a></div><div class="footer-col"><h3>Services & resources</h3><a href="support.html">Support</a><a href="insights.html">Buying guides</a><a href="products.html?favorites=1">Saved products</a><a href="contact.html?type=technical#formTitle">Technical advice</a></div><div class="footer-col"><h3>About chenglian</h3><a href="about.html">About us</a><a href="about.html#departments">How we work</a><a href="contact.html?type=business#formTitle">Business enquiries</a><a href="contact.html">Contact us</a></div></div><div class="footer-bottom"><div><p>© ${new Date().getFullYear()} chenglian. All rights reserved.</p><p class="footer-note">Specifications, pricing and availability are confirmed by quotation. Contact us to discuss your requirements.</p></div><span class="footer-status"><span class="status-dot"></span>COMPUTE / CONNECT / EXPAND</span></div></div></footer>`;
  if (!document.querySelector('link[rel="icon"]')) { const favicon = document.createElement('link'); favicon.rel = 'icon'; favicon.href = 'assets/favicon.svg'; favicon.type = 'image/svg+xml'; document.head.append(favicon); }
  const toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role','status'); toast.setAttribute('aria-live','polite'); toast.hidden = true; document.body.append(toast);
  let toastTimer;
  function showToast(message) { clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false; toastTimer = setTimeout(() => toast.hidden = true,3500); }
  function readFavorites() { try { const value = JSON.parse(localStorage.getItem('chenglian-favorites') || '[]'); return new Set(Array.isArray(value) ? value.map(id => aliases[id] || id).filter(id => ids.has(id)):[]); } catch { return new Set(); } }
  let favorites = readFavorites();
  function getFavorites() { return new Set(favorites); }
  function updateFavoriteUI() {
    document.querySelectorAll('[data-favorite-count]').forEach(el => { el.textContent = favorites.size; el.hidden = !favorites.size; });
    document.querySelectorAll('[data-favorite-product]').forEach(el => { const id = el.dataset.favoriteProduct; const active = favorites.has(id); el.setAttribute('aria-pressed',String(active)); const product = products.find(p => p.id === id); el.setAttribute('aria-label',`${active ? 'Unsave':'Save'} ${product?.name || 'hardware'}`); el.classList.toggle('is-favorite',active); });
  }
  function toggleFavorite(id) {
    if (!ids.has(id)) return;
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    let saved = true; try { localStorage.setItem('chenglian-favorites',JSON.stringify([...favorites])); } catch { saved = false; }
    updateFavoriteUI(); document.dispatchEvent(new CustomEvent('cl:favorites-changed',{detail:{id,favorites:[...favorites]}}));
    showToast(saved ? (favorites.has(id) ? 'Product added to your shortlist.':'Product removed from saved items.') : 'Shortlist updated for this session. Your browser has blocked persistent storage.');
    return favorites.has(id);
  }
  const refreshIcons = () => window.lucide?.createIcons({attrs:{'aria-hidden':'true'}});
  window.CLSite = {getFavorites,toggleFavorite,updateFavoriteUI,refreshIcons,showToast,getProduct:id=>products.find(p=>p.id===(aliases[id] || id)),formatPrice:value=>typeof value==='number'&&Number.isFinite(value)?`¥${value.toLocaleString('en-US')}`:'Request a quote',escapeHTML};
  document.addEventListener('click', event => { const button = event.target.closest('[data-favorite-product]'); if(button) { event.preventDefault(); toggleFavorite(button.dataset.favoriteProduct); } });
  window.addEventListener('storage',event => { if(event.key==='chenglian-favorites') { favorites=readFavorites(); updateFavoriteUI(); document.dispatchEvent(new CustomEvent('cl:favorites-changed')); } });
  const menu = document.getElementById('mobileMenu'); const menuButton = document.getElementById('menuButton'); const search = document.getElementById('headerSearch'); const searchButton = document.getElementById('headerSearchButton');
  function closeMenu(focus=false) { if(!menu)return; menu.hidden=true; menuButton?.setAttribute('aria-expanded','false'); menuButton?.setAttribute('aria-label','Open menu'); document.body.classList.remove('is-locked'); if(focus)menuButton?.focus(); }
  menuButton?.addEventListener('click',()=>{ if(!menu.hidden) return closeMenu(true); menu.hidden=false; menuButton.setAttribute('aria-expanded','true'); menuButton.setAttribute('aria-label','Close menu'); document.body.classList.add('is-locked'); menu.querySelector('a')?.focus(); });
  menu?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',event=>{if(menu?.hidden !== false)return; if(event.key==='Escape'){closeMenu(true);return;} if(event.key==='Tab'){const items=[menuButton,...menu.querySelectorAll('a')]; const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
  window.matchMedia('(min-width:961px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  searchButton?.addEventListener('click',()=>{closeMenu();search.showModal();searchButton.setAttribute('aria-expanded','true');document.getElementById('headerSearchInput').focus();});
  document.getElementById('closeSearchButton')?.addEventListener('click',()=>search.close());
  search?.addEventListener('close',()=>{searchButton.setAttribute('aria-expanded','false');searchButton.focus();});
  search?.addEventListener('click',event=>{if(event.target===search){const r=search.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)search.close();}});
  document.getElementById('globalSearchForm')?.addEventListener('submit',event=>{event.preventDefault();const q=document.getElementById('headerSearchInput').value.trim();location.href=`products.html${q?'?q='+encodeURIComponent(q):''}`;});
  const back = document.createElement('button'); back.type='button'; back.id='backToTop'; back.className='back-to-top'; back.setAttribute('aria-label','Back to top'); back.innerHTML=icon('arrow-up');back.hidden=true;document.body.append(back);back.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));
  const scroll=()=>back.hidden=window.scrollY<600;window.addEventListener('scroll',scroll,{passive:true});scroll();
  refreshIcons();updateFavoriteUI();
})();

