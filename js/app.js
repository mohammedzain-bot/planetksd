/**
 * PLANET KSD — Ultra-Luxury Dark Apple Store Client Script
 * Features: Dynamic Storage/Color State, Cart Management, Quick View Modal, Live Search, WhatsApp Concierge
 */

// Product Catalog Data
const PRODUCTS = {
  'iphone-17-pro-max': {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    tagline: 'Titanium. Quad-Prism Camera. Beyond.',
    chip: 'A19 Pro (3nm Gen 2)',
    screen: '6.9" Super Retina XDR ProMotion 120Hz',
    camera: '48MP Quad-Prism 10x Optical Telephoto',
    battery: 'Up to 34 hours video playback',
    basePrice: 144900,
    currentStorage: '256GB',
    currentColor: 'Desert Gold Titanium',
    image: 'assets/images/hero-iphone17.jpg',
    storagePricing: {
      '256GB': { price: 144900, emi: 6899 },
      '512GB': { price: 164900, emi: 7850 },
      '1TB': { price: 184900, emi: 8799 }
    },
    colors: [
      { name: 'Desert Gold Titanium', hex: '#C8A36A' },
      { name: 'Natural Titanium', hex: '#9A968D' },
      { name: 'Black Titanium', hex: '#242426' },
      { name: 'White Titanium', hex: '#EAEAEF' }
    ]
  },
  'iphone-17-pro': {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    tagline: 'Pro Performance. Precision Unibody.',
    chip: 'A19 Pro (3nm Gen 2)',
    screen: '6.3" Super Retina XDR ProMotion 120Hz',
    camera: '48MP Triple Lens with Spatial Video',
    battery: 'Up to 29 hours video playback',
    basePrice: 129900,
    currentStorage: '128GB',
    currentColor: 'Natural Titanium',
    image: 'assets/images/iphone17-pro.jpg',
    storagePricing: {
      '128GB': { price: 129900, emi: 6199 },
      '256GB': { price: 139900, emi: 6660 },
      '512GB': { price: 159900, emi: 7610 },
      '1TB': { price: 179900, emi: 8560 }
    },
    colors: [
      { name: 'Natural Titanium', hex: '#9A968D' },
      { name: 'Desert Gold Titanium', hex: '#C8A36A' },
      { name: 'Deep Obsidian', hex: '#1B1B1E' },
      { name: 'White Titanium', hex: '#EAEAEF' }
    ]
  },
  'iphone-17': {
    id: 'iphone-17',
    name: 'iPhone 17',
    tagline: 'Color-Infused. Supercharged by A19.',
    chip: 'A19 Bionic Neural Engine',
    screen: '6.1" Super Retina XDR Ceramic Shield 2.0',
    camera: '48MP Fusion Camera + 2x Telephoto',
    battery: 'Up to 26 hours video playback',
    basePrice: 89900,
    currentStorage: '128GB',
    currentColor: 'Ultramarine Navy',
    image: 'assets/images/featured-iphone17.jpg',
    storagePricing: {
      '128GB': { price: 89900, emi: 4299 },
      '256GB': { price: 99900, emi: 4760 },
      '512GB': { price: 119900, emi: 5710 }
    },
    colors: [
      { name: 'Ultramarine Navy', hex: '#34495E' },
      { name: 'Teal Emerald', hex: '#315C53' },
      { name: 'Soft Gold Pink', hex: '#D7A79D' },
      { name: 'Obsidian Black', hex: '#1C1C1F' }
    ]
  },
  'iphone-air': {
    id: 'iphone-air',
    name: 'iPhone Air',
    tagline: 'Impossibly Thin. Breakthrough Battery.',
    chip: 'A19 Pro Ultra-Efficiency',
    screen: '6.6" Ultra-Thin OLED Bezel-Free',
    camera: '48MP Single Prism Sensor with LiDAR',
    battery: 'All-day battery with fast MagSafe 30W',
    basePrice: 79900,
    currentStorage: '128GB',
    currentColor: 'Starlight Gold',
    image: 'assets/images/hero-iphone17.jpg',
    storagePricing: {
      '128GB': { price: 79900, emi: 3799 },
      '256GB': { price: 89900, emi: 4280 },
      '512GB': { price: 109900, emi: 5230 }
    },
    colors: [
      { name: 'Starlight Gold', hex: '#E2D3B8' },
      { name: 'Space Gray', hex: '#38383C' },
      { name: 'Pure Platinum', hex: '#DCDFE4' }
    ]
  },
  'previous-iphones': {
    id: 'previous-iphones',
    name: 'iPhone 16 Pro & Series',
    tagline: 'Flagship Power. Unbeatable Kerala Deals.',
    chip: 'A18 Pro Hexa-Core',
    screen: '6.3" ProMotion XDR Display',
    camera: '48MP Pro System with 5x Telephoto',
    battery: 'Up to 27 hours video playback',
    basePrice: 54900,
    currentStorage: '128GB',
    currentColor: 'Black Titanium',
    image: 'assets/images/featured-iphone17.jpg',
    storagePricing: {
      '128GB': { price: 54900, emi: 2699 },
      '256GB': { price: 64900, emi: 3099 },
      '512GB': { price: 84900, emi: 4049 }
    },
    colors: [
      { name: 'Black Titanium', hex: '#1E1E22' },
      { name: 'Natural Titanium', hex: '#9A968D' },
      { name: 'Blue Titanium', hex: '#2C3545' }
    ]
  }
};

// Global State
let cart = [];
let wishlist = new Set();

// Utility: Format Currency to INR ₹
function formatINR(number) {
  return '₹' + number.toLocaleString('en-IN');
}

// Update Card Storage Selection
function selectStorage(productId, storageSize, chipElement) {
  const product = PRODUCTS[productId];
  if (!product || !product.storagePricing[storageSize]) return;

  product.currentStorage = storageSize;
  const pricing = product.storagePricing[storageSize];

  // Update UI chips in the card
  const card = document.getElementById(`card-${productId}`);
  if (card) {
    const chips = card.querySelectorAll('.storage-chip');
    chips.forEach(c => c.classList.remove('active'));
    chipElement.classList.add('active');

    // Update Price and EMI
    const priceEl = card.querySelector('.product-price');
    const emiEl = card.querySelector('.product-emi');
    if (priceEl) priceEl.innerText = formatINR(pricing.price);
    
  }
}

// Update Card Color Selection
function selectColor(productId, colorName, dotElement) {
  const product = PRODUCTS[productId];
  if (!product) return;

  product.currentColor = colorName;

  const card = document.getElementById(`card-${productId}`);
  if (card) {
    const dots = card.querySelectorAll('.color-dot-ring');
    dots.forEach(d => d.classList.remove('active'));
    dotElement.classList.add('active');

    const colorLabel = card.querySelector('.color-label');
    if (colorLabel) colorLabel.innerText = colorName;
  }
}

// Add Item to Cart
function addToCart(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const storage = product.currentStorage;
  const color = product.currentColor;
  const pricing = product.storagePricing[storage] || { price: product.basePrice, emi: 5000 };

  const cartItemId = `${productId}-${storage}-${color}`;
  const existingItem = cart.find(item => item.id === cartItemId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      storage: storage,
      color: color,
      price: pricing.price,
      image: product.image,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`Added ${product.name} (${storage} • ${color}) to cart`);
  openCartDrawer();
}

// Add Accessory to Cart
function addAccessoryToCart(name, price, image) {
  const cartItemId = `acc-${name.toLowerCase().replace(/\s+/g, '-')}`;
  const existingItem = cart.find(item => item.id === cartItemId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: cartItemId,
      productId: 'accessory',
      name: name,
      storage: 'Standard',
      color: 'Titanium / Black',
      price: price,
      image: image,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`Added ${name} to cart`);
  openCartDrawer();
}

// Adjust Cart Quantity
function adjustCartQty(cartItemId, delta) {
  const itemIndex = cart.findIndex(item => item.id === cartItemId);
  if (itemIndex === -1) return;

  cart[itemIndex].qty += delta;
  if (cart[itemIndex].qty <= 0) {
    cart.splice(itemIndex, 1);
  }

  updateCartUI();
}

// Remove from Cart
function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.id !== cartItemId);
  updateCartUI();
  showToast('Item removed from cart');
}

// Update Cart Drawer UI
function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-count-badge');
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  countEls.forEach(el => {
    el.innerText = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  const cartListEl = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartEmptyEl = document.getElementById('cart-empty-state');
  const cartFooterEl = document.getElementById('cart-drawer-footer');

  if (!cartListEl) return;

  if (cart.length === 0) {
    cartListEl.innerHTML = '';
    if (cartEmptyEl) cartEmptyEl.style.display = 'block';
    if (cartFooterEl) cartFooterEl.style.display = 'none';
    if (cartSubtotalEl) cartSubtotalEl.innerText = '₹0';
    return;
  }

  if (cartEmptyEl) cartEmptyEl.style.display = 'none';
  if (cartFooterEl) cartFooterEl.style.display = 'block';

  let subtotal = 0;
  cartListEl.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="flex items-center gap-4 py-4 border-b border-[rgba(255,255,255,0.08)]">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded-xl bg-[rgba(255,255,255,0.03)] p-1 border border-[rgba(255,255,255,0.06)]" />
        <div class="flex-1 min-w-0">
          <h4 class="text-white text-sm font-semibold truncate">${item.name}</h4>
          <p class="text-[rgba(200,163,106,0.9)] text-xs font-medium">${item.storage} • ${item.color}</p>
          <p class="text-white text-sm font-bold mt-1">${formatINR(item.price)}</p>
        </div>
        <div class="flex flex-col items-end gap-2">
          <div class="flex items-center border border-[rgba(255,255,255,0.15)] rounded-full px-2 py-0.5 bg-[rgba(255,255,255,0.04)] text-xs">
            <button onclick="adjustCartQty('${item.id}', -1)" class="text-gray-400 hover:text-white px-1 font-bold">-</button>
            <span class="px-2 font-semibold text-white">${item.qty}</span>
            <button onclick="adjustCartQty('${item.id}', 1)" class="text-gray-400 hover:text-white px-1 font-bold">+</button>
          </div>
          <button onclick="removeFromCart('${item.id}')" class="text-xs text-red-400 hover:text-red-300">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  if (cartSubtotalEl) {
    cartSubtotalEl.innerText = formatINR(subtotal);
  }
}

// Toggle Wishlist
function toggleWishlist(productId, btnElement) {
  const icon = btnElement.querySelector('svg');
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    btnElement.classList.remove('text-red-500');
    btnElement.classList.add('text-white');
    if (icon) icon.setAttribute('fill', 'none');
    showToast('Removed from wishlist');
  } else {
    wishlist.add(productId);
    btnElement.classList.remove('text-white');
    btnElement.classList.add('text-red-500');
    if (icon) icon.setAttribute('fill', 'currentColor');
    showToast(`Added ${PRODUCTS[productId]?.name || 'product'} to wishlist`);
  }

  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    badge.innerText = wishlist.size;
    badge.style.display = wishlist.size > 0 ? 'flex' : 'none';
  }
}

// Open / Close Cart Drawer
function openCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Open Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;

  const modalOverlay = document.getElementById('quickview-modal-overlay');
  const modalContent = document.getElementById('quickview-modal-content');
  if (!modalOverlay || !modalContent) return;

  const currentPricing = product.storagePricing[product.currentStorage] || { price: product.basePrice, emi: 5000 };

  modalContent.innerHTML = `
    <div class="relative p-6 sm:p-8">
      <button onclick="closeQuickView()" class="absolute top-5 right-5 text-gray-400 hover:text-white btn-icon-glass" style="width: 36px; height: 36px;">
        ✕
      </button>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="product-card-img-wrap h-80 flex items-center justify-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl">
          <img src="${product.image}" alt="${product.name}" class="max-h-72 max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(200,163,106,0.3)] animate-float" />
        </div>

        <div>
          <span class="badge-gold mb-2">Kerala Flagship Inventory</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${product.name}</h2>
          <p class="text-sm text-gray-400 mt-1 mb-4">${product.tagline}</p>

          <div class="flex items-baseline gap-3 my-4">
            <span class="text-3xl font-extrabold text-white">${formatINR(currentPricing.price)}</span>
            <span class="text-xs text-[var(--color-gold)] font-medium bg-[rgba(200,163,106,0.12)] px-2.5 py-1 rounded-full">
              EMI from ${formatINR(currentPricing.emi)}/mo
            </span>
          </div>

          <!-- Specs List -->
          <div class="space-y-2 border-y border-[rgba(255,255,255,0.08)] py-4 my-4 text-xs">
            <div class="flex justify-between"><span class="text-gray-400">Processor:</span> <span class="text-white font-medium">${product.chip}</span></div>
            <div class="flex justify-between"><span class="text-gray-400">Display:</span> <span class="text-white font-medium">${product.screen}</span></div>
            <div class="flex justify-between"><span class="text-gray-400">Camera System:</span> <span class="text-white font-medium">${product.camera}</span></div>
            <div class="flex justify-between"><span class="text-gray-400">Battery Life:</span> <span class="text-white font-medium">${product.battery}</span></div>
            <div class="flex justify-between"><span class="text-gray-400">Warranty:</span> <span class="text-[var(--color-gold)] font-medium">1 Year Apple India Official</span></div>
            <div class="flex justify-between"><span class="text-gray-400">Pickup:</span> <span class="text-emerald-400 font-medium">Ground Floor, Gulf Bazar, Kasaragod (671124)</span></div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <button onclick="addToCart('${product.id}'); closeQuickView();" class="btn-gold flex-1 py-3 text-sm">
              Add to Cart
            </button>
            <a href="https://wa.me/919697771771?text=${encodeURIComponent(`Hi PLANET KSD, I want to order the ${product.name} (${product.currentStorage} • ${product.currentColor}) at ₹${currentPricing.price.toLocaleString('en-IN')}. Please confirm stock at Ground Floor, Gulf Bazar, Kasaragod showroom.`)}" target="_blank" class="btn-glass flex-1 py-3 text-sm flex items-center justify-center gap-2">
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modalOverlay = document.getElementById('quickview-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Search Modal Overlay
function openSearch() {
  const overlay = document.getElementById('search-modal-overlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const input = document.getElementById('search-input');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
      handleSearchInput('');
    }
  }
}

function closeSearch() {
  const overlay = document.getElementById('search-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleSearchInput(query) {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  const q = query.trim().toLowerCase();
  const matched = Object.values(PRODUCTS).filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.tagline.toLowerCase().includes(q) || 
    p.chip.toLowerCase().includes(q)
  );

  if (matched.length === 0) {
    resultsContainer.innerHTML = `
      <div class="py-12 text-center text-gray-500">
        <p>No Apple models found matching "${query}"</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = matched.map(p => `
    <div onclick="openQuickView('${p.id}'); closeSearch();" class="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.06)] cursor-pointer transition">
      <img src="${p.image}" alt="${p.name}" class="w-12 h-12 object-contain bg-black/40 rounded-lg p-1 border border-white/10" />
      <div class="flex-1">
        <h4 class="text-white font-semibold text-sm">${p.name}</h4>
        <p class="text-xs text-gray-400">${p.tagline}</p>
      </div>
      <div class="text-right">
        <span class="text-white text-sm font-bold">${formatINR(p.basePrice)}</span>
        <p class="text-[10px] text-[var(--color-gold)]">In Stock Kerala</p>
      </div>
    </div>
  `).join('');
}

// Toast System
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="w-5 h-5 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span class="text-sm font-medium">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// WhatsApp Checkout Link Generation — Direct Orders to 9697771771
function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }

  let text = `*PLANET KSD — DIRECT CUSTOMER ORDER*\n`;
  text += `Store Address: Ground Floor, Gulf Bazar, New Bus Stand, Kasaragod, Kerala 671124\n`;
  text += `-------------------------------------------\n`;
  let subtotal = 0;

  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    text += `${idx + 1}. *${item.name}*\n   • Specs: ${item.storage} • ${item.color}\n   • Qty: ${item.qty} × ₹${item.price.toLocaleString('en-IN')}\n   • Subtotal: ₹${itemTotal.toLocaleString('en-IN')}\n\n`;
  });

  text += `-------------------------------------------\n`;
  text += `*GRAND TOTAL: ₹${subtotal.toLocaleString('en-IN')}*\n`;
  text += `-------------------------------------------\n`;
  text += `Please confirm my order and share invoice & delivery/pickup details.`;

  const waUrl = `https://wa.me/919697771771?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

// Scroll effects for Glass Navbar
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-navbar');
  if (!nav) return;
  if (window.scrollY > 30) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ==========================================================================
// Apple Video Frame Scroll Sequence Engine
// 214 high-precision frames with scroll-synced kinetic text features
// ==========================================================================
const HERO_CONFIG = {
  frameCount: 214,
  framePrefix: 'assets/images/herosection2_4k/ezgif-frame-',
  frameExt: '.jpg'
};

const heroFrames = [];
let currentFrameIndex = 1;
let isCanvasReady = false;

function initHeroCanvasSequence() {
  const canvas = document.getElementById('hero-sequence-canvas');
  const track = document.getElementById('hero-scroll-track');
  if (!canvas || !track) return;

  function getMobileAwareHeight() {
    // Use visualViewport on mobile to get stable height (excludes browser chrome)
    if (window.visualViewport) return window.visualViewport.height;
    return window.innerHeight;
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = window.innerWidth * dpr;
    canvas.height = getMobileAwareHeight() * dpr;
    renderCurrentFrame();
  }

  function getFramePath(index) {
    const padded = String(index).padStart(3, '0');
    return `${HERO_CONFIG.framePrefix}${padded}${HERO_CONFIG.frameExt}`;
  }

  // Preload frames progressively
  for (let i = 1; i <= HERO_CONFIG.frameCount; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      if (i === 1 && !isCanvasReady) {
        isCanvasReady = true;
        renderCurrentFrame();
      }
    };
    heroFrames[i] = img;
  }

  function renderCurrentFrame() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;

    // Fill matte black background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, cw, ch);

    // Enable high-quality bicubic interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Find nearest loaded frame
    let img = heroFrames[currentFrameIndex];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 25; offset++) {
        if (heroFrames[currentFrameIndex - offset]?.complete) {
          img = heroFrames[currentFrameIndex - offset];
          break;
        }
        if (heroFrames[currentFrameIndex + offset]?.complete) {
          img = heroFrames[currentFrameIndex + offset];
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const isMobile = window.innerWidth <= 768;
      const baseScale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const scale = baseScale * (isMobile ? 0.95 : 0.82);
      const nw = Math.round(img.naturalWidth * scale);
      const nh = Math.round(img.naturalHeight * scale);
      const nx = Math.round((cw - nw) / 2);
      const ny = Math.round((ch - nh) / 2);
      ctx.drawImage(img, nx, ny, nw, nh);
    }
  }

  // ==========================================================================
  // ==========================================================================
  // Ultra-Smooth Continuous RAF Scroll Engine
  // Runs every frame (60/120fps), interpolates progress with exponential ease-out
  // Blends between two adjacent frames for sub-frame smoothness
  // ==========================================================================
  let targetProgress = 0;
  let currentProgress = 0;
  let rafId = null;

  function updateScrollProgress() {
    const trackRect = track.getBoundingClientRect();
    const trackHeight = track.offsetHeight - window.innerHeight;
    if (trackHeight > 0) {
      targetProgress = Math.max(0, Math.min(1, -trackRect.top / trackHeight));
    }
  }

  function smoothstep(t) {
    // Cubic ease-out: feels like natural deceleration
    return t * t * (3 - 2 * t);
  }

  function continuousLoop() {
    const delta = targetProgress - currentProgress;

    // Exponential ease: fast approach, gentle landing
    if (Math.abs(delta) > 0.0001) {
      currentProgress += delta * 0.06;
    } else {
      currentProgress = targetProgress;
    }

    // Nearest frame for maximum performance
    const targetFrame = Math.min(
      HERO_CONFIG.frameCount,
      Math.max(1, Math.round(currentProgress * (HERO_CONFIG.frameCount - 1)) + 1)
    );

    if (currentFrameIndex !== targetFrame) {
      currentFrameIndex = targetFrame;
      renderFrame(targetFrame);
    }

    rafId = requestAnimationFrame(continuousLoop);
  }

  function renderFrame(idx) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, cw, ch);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const img = heroFrames[idx];

    // Draw primary frame
    if (img && img.complete && img.naturalWidth > 0) {
      const isMobile = window.innerWidth <= 768;
      const baseScale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const scale = baseScale * (isMobile ? 0.95 : 0.82);
      const nw = Math.round(img.naturalWidth * scale);
      const nh = Math.round(img.naturalHeight * scale);
      const nx = Math.round((cw - nw) / 2);
      const ny = Math.round((ch - nh) / 2);
      ctx.drawImage(img, nx, ny, nw, nh);
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', () => {
    resizeCanvas();
    updateScrollProgress();
  });

  // Handle mobile browser chrome appearing/disappearing (address bar)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      resizeCanvas();
      updateScrollProgress();
    });
  }

  resizeCanvas();
  updateScrollProgress();

  // Start the continuous animation loop immediately
  if (rafId) cancelAnimationFrame(rafId);
  continuousLoop();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initHeroCanvasSequence();
});


