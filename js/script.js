const whatsappNumber = "20 10 08995927";


// ── Data ──
const categories = {
  restaurants: {
    emoji: '🍔', title: 'مطاعم', sub: 'أحدث عروض المطاعم',
    color: '#FF6B35',
    offers: [
      { name: 'بيتزا كبيرة سوبريم', place: 'بيتزا بلازا', emoji: '🍕', bg: '#2D1810', price: '٦٥ ج', old: '٩٠ ج', badge: 'خصم ٢٨٪' },
      { name: 'وجبة برجر دبل', place: 'بيرجر هاوس', emoji: '🍔', bg: '#1A1A0D', price: '٤٥ ج', old: '٦٠ ج', badge: 'الأكثر طلباً' },
      { name: 'كشري بورشن كبير', place: 'أبو طارق', emoji: '🍜', bg: '#0D1A10', price: '٢٥ ج', old: '٣٥ ج', badge: 'خصم ٢٩٪' },
      { name: 'فراخ مشوية كاملة', place: 'شيف فارم', emoji: '🍗', bg: '#1A1005', price: '١٢٠ ج', old: '١٥٠ ج', badge: 'عرض محدود' },
    ]
  },
  grocery: {
    emoji: '🛒', title: 'بقالة', sub: 'أفضل عروض البقالة',
    color: '#4CAF50',
    offers: [
      { name: 'أرز مصري ٥ كيلو', place: 'أسواق المحروسة', emoji: '🌾', bg: '#0D1A0D', price: '٨٥ ج', old: '١١٠ ج', badge: 'خصم ٢٣٪' },
      { name: 'زيت عافية ١.٨ لتر', place: 'سوبر ماركت النصر', emoji: '🫙', bg: '#1A1A0A', price: '٧٠ ج', old: '٩٠ ج', badge: 'وفر ٢٠ ج' },
      { name: 'سكر ناعم ٢ كيلو', place: 'أسواق المحروسة', emoji: '🍬', bg: '#1A0D0D', price: '٣٠ ج', old: '٤٠ ج', badge: 'عرض الأسبوع' },
    ]
  },
  dairy: {
    emoji: '🥛', title: 'ألبان', sub: 'عروض الألبان والأجبان',
    color: '#42A5F5',
    offers: [
      { name: 'لبن كاملة الدسم ١ لتر', place: 'منتجات بيتي', emoji: '🥛', bg: '#0A1020', price: '١٨ ج', old: '٢٢ ج', badge: 'طازج يومياً' },
      { name: 'جبنة روم قديمة ٢٥٠ج', place: 'مصنع الجودة', emoji: '🧀', bg: '#1A1505', price: '٤٠ ج', old: '٥٥ ج', badge: 'خصم ٢٧٪' },
      { name: 'زبادي طبيعي ٦ حبات', place: 'ألبان الحياة', emoji: '🥣', bg: '#0D1A15', price: '٣٥ ج', old: '٤٥ ج', badge: 'بدون حافظ' },
    ]
  }
};

let currentPage = 'page-home';
let pageHistory = [];

// ── Particles ──
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      --drift: ${(Math.random() - 0.5) * 100}px;
      animation-duration: ${4 + Math.random() * 6}s;
      animation-delay: ${Math.random() * 6}s;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}

// ── Cursor ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('button, .order-card, .cat-card, .offer-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(2)'; ring.style.opacity = '0.4'; });
  el.addEventListener('mouseleave', () => { ring.style.opacity = '1'; });
});

// ── Page Navigation ──
function goTo(pageId) {
  const trans = document.getElementById('transition');
  trans.className = 'page-transition enter';

  setTimeout(() => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    pageHistory.push(currentPage);
    currentPage = pageId;
    updateNavDots();
    trans.className = 'page-transition exit';
    animatePageIn(pageId);
    window.scrollTo(0, 0);
  }, 400);
}

function goBack() {
  if (pageHistory.length > 0) {
    const prev = pageHistory.pop();
    const trans = document.getElementById('transition');
    trans.className = 'page-transition enter';
    setTimeout(() => {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById(prev).classList.add('active');
      currentPage = prev;
      updateNavDots();
      trans.className = 'page-transition exit';
      animatePageIn(prev);
    }, 400);
  }
}

function updateNavDots() {
  const pages = ['page-home', 'page-order-type', 'page-offers', 'page-offers-detail'];
  let activeIndex = pages.indexOf(currentPage);
  if (currentPage === 'page-buy' || currentPage === 'page-delivery') {
    activeIndex = 1;
  }
  const pages = ['page-home', 'page-order-type', 'page-offers', 'page-offers-detail', 'page-dist'];
  document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

function animatePageIn(pageId) {
  if (pageId === 'page-order-type') animateOrderCards();
  if (pageId === 'page-offers') animateCatCards();
  if (pageId === 'page-offers-detail') animateOfferCards();
  if (pageId === 'page-buy') initBuyPage();
  if (pageId === 'page-delivery') initDeliveryPage();
  if (pageId === 'page-dist') animateFormSections();
}

function animateFormSections() {
  document.querySelectorAll('#page-dist .form-section').forEach((sec, i) => {
    sec.classList.remove('show');
    setTimeout(() => {
      sec.classList.add('show');
    }, i * 150);
  });
}

// ── Animate Cards ──
function animateOrderCards() {
  document.querySelectorAll('.order-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = `card-in 0.55s cubic-bezier(.34,1.56,.64,1) ${i * 0.12}s both`;
    }, 50);
  });
}

function animateCatCards() {
  document.querySelectorAll('.cat-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = `card-in 0.55s cubic-bezier(.34,1.56,.64,1) ${i * 0.12}s both`;
    }, 50);
  });
}

function animateOfferCards() {
  document.querySelectorAll('.offer-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = `card-in 0.5s cubic-bezier(.34,1.56,.64,1) ${i * 0.1}s both`;
    }, 50);
  });
}

// ── Open Category ──
function openCategory(key) {
  const cat = categories[key];
  document.getElementById('detailEmoji').textContent = cat.emoji;
  document.getElementById('detailTitle').textContent = cat.title;
  document.getElementById('detailSub').textContent = cat.sub;

  const grid = document.getElementById('offersGrid');
  grid.innerHTML = '';
  cat.offers.forEach(offer => {
    const card = document.createElement('div');
    card.className = 'offer-card';
    card.onclick = () => showToast('هذه العروض للعرض فقط 👁️');
    card.innerHTML = `
      <div class="offer-img" style="background:${offer.bg}">
        <div class="offer-img-inner">${offer.emoji}</div>
        <div class="offer-badge">${offer.badge}</div>
      </div>
      <div class="offer-body">
        <div class="offer-name">${offer.name}</div>
        <div class="offer-place">📍 ${offer.place}</div>
        <div class="offer-price-row">
          <span class="offer-price">${offer.price}</span>
          <span class="offer-old-price">${offer.old}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  goTo('page-offers-detail');
}

// ── Toast ──
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Ripple ──
document.querySelectorAll('.btn-main').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

// ── Init ──
createParticles();


// ══════════════════════════════
// FORM OPERATIONS & WHATSAPP API
// ══════════════════════════════

let storeCounter = 0;

function initBuyPage() {
  // Clear generic customer info inputs
  document.getElementById('buy-name').value = '';
  document.getElementById('buy-phone').value = '';
  document.getElementById('buy-address').value = '';
  
  // Clear and reset stores list container
  const container = document.getElementById('pdf-stores-container');
  container.innerHTML = '';
  
  // Add first store block by default
  addNewStore();
}

function initDeliveryPage() {
  document.getElementById('del-from').value = '';
  document.getElementById('del-from-phone').value = '';
  document.getElementById('del-to').value = '';
  document.getElementById('del-to-phone').value = '';
  document.getElementById('del-details').value = '';
}

function createStoreElement(storeId) {
  const block = document.createElement('div');
  block.className = 'pdf-store-block';
  block.id = storeId;
  
  block.innerHTML = `
    <div class="pdf-store-header">
      <span class="pdf-store-title">المحل <span class="store-num-display"></span> /</span>
      <button type="button" class="pdf-btn-remove-store" style="display:none;" onclick="removeStore('${storeId}')">
        <i class="fa-solid fa-trash"></i> حذف المحل
      </button>
    </div>
    
    <div class="pdf-form-group">
      <label class="pdf-label">اسم المحل /</label>
      <input type="text" class="pdf-input pdf-store-name" required placeholder="ادخل اسم المحل">
    </div>
    
    <div class="pdf-form-group">
      <label class="pdf-label">الطلب من المحل /</label>
      <div class="pdf-items-list">
        <!-- Item rows will go here dynamically -->
      </div>
      <button type="button" class="pdf-btn-add-item" onclick="addNewItemToStore('${storeId}')">+ اضافة بند</button>
    </div>
  `;
  
  return block;
}

function addNewStore() {
  const container = document.getElementById('pdf-stores-container');
  const storeBlocks = container.children;
  
  if (storeBlocks.length >= 3) {
    showToast('الحد الأقصى هو ٣ محلات للطلب ⚠️');
    return;
  }
  
  const storeId = `pdf-store-block-${storeCounter++}`;
  const storeEl = createStoreElement(storeId);
  container.appendChild(storeEl);
  
  // Add first item input row by default in the new store block
  addItemRow(storeEl);
  
  updateStoreLabels();
}

function removeStore(storeId) {
  const storeEl = document.getElementById(storeId);
  if (storeEl) {
    storeEl.remove();
    updateStoreLabels();
  }
}

function updateStoreLabels() {
  const container = document.getElementById('pdf-stores-container');
  const stores = Array.from(container.children);
  
  stores.forEach((storeBlock, idx) => {
    // Update store numbering display
    const numDisplay = storeBlock.querySelector('.store-num-display');
    if (numDisplay) {
      numDisplay.textContent = idx + 1;
    }
    
    // Show remove button for stores other than the first
    const removeBtn = storeBlock.querySelector('.pdf-btn-remove-store');
    if (removeBtn) {
      removeBtn.style.display = idx === 0 ? 'none' : 'flex';
    }
  });
  
  // Update visibility of Add Store Button & Limit Message
  const limitMsg = document.getElementById('pdf-limit-message');
  const addStoreSection = document.getElementById('pdf-add-store-section');
  
  if (stores.length >= 3) {
    if (limitMsg) limitMsg.style.display = 'block';
    if (addStoreSection) addStoreSection.style.display = 'none';
  } else {
    if (limitMsg) limitMsg.style.display = 'none';
    if (addStoreSection) addStoreSection.style.display = 'block';
  }
}

function addNewItemToStore(storeId) {
  const storeEl = document.getElementById(storeId);
  if (storeEl) {
    addItemRow(storeEl);
  }
}

function addItemRow(storeEl) {
  const itemsList = storeEl.querySelector('.pdf-items-list');
  const itemCount = itemsList.children.length;
  
  const row = document.createElement('div');
  row.className = 'pdf-item-row';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'pdf-input pdf-item-input';
  input.required = true;
  input.placeholder = 'الطلب من المحل /';
  
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'pdf-btn-remove-item';
  removeBtn.textContent = `- ${itemCount + 1}`;
  removeBtn.onclick = function() {
    removeItemRow(row, storeEl);
  };
  
  row.appendChild(input);
  row.appendChild(removeBtn);
  itemsList.appendChild(row);
  
  updateItemIndices(storeEl);
}

function removeItemRow(itemRowEl, storeEl) {
  const itemsList = storeEl.querySelector('.pdf-items-list');
  if (itemsList.children.length <= 1) {
    showToast('يجب كتابة طلب واحد على الأقل للمحل ⚠️');
    return;
  }
  itemRowEl.remove();
  updateItemIndices(storeEl);
}

function updateItemIndices(storeEl) {
  const itemsList = storeEl.querySelector('.pdf-items-list');
  Array.from(itemsList.children).forEach((row, idx) => {
    const btn = row.querySelector('.pdf-btn-remove-item');
    if (btn) {
      btn.textContent = `- ${idx + 1}`;
    }
  });
}

// Validation & Submission for Purchase Orders
function handleBuySubmit() {
  const name = document.getElementById('buy-name').value.trim();
  const phone = document.getElementById('buy-phone').value.trim();
  const address = document.getElementById('buy-address').value.trim();
  
  if (!name || !phone || !address) {
    showToast('برجاء ملء بيانات العميل كاملة ⚠️');
    return;
  }
  
  const storeBlocks = document.querySelectorAll('.pdf-store-block');
  if (storeBlocks.length === 0) {
    showToast('برجاء إضافة محل واحد على الأقل ⚠️');
    return;
  }
  
  const storesData = [];
  let isFormIncomplete = false;
  
  storeBlocks.forEach((block) => {
    const storeName = block.querySelector('.pdf-store-name').value.trim();
    if (!storeName) {
      isFormIncomplete = true;
      return;
    }
    
    const items = [];
    const itemInputs = block.querySelectorAll('.pdf-item-input');
    itemInputs.forEach(input => {
      const val = input.value.trim();
      if (!val) {
        isFormIncomplete = true;
      } else {
        items.push(val);
      }
    });
    
    if (items.length === 0) {
      isFormIncomplete = true;
    }
    
    storesData.push({
      name: storeName,
      items: items
    });
  });
  
  if (isFormIncomplete) {
    showToast('برجاء ملء جميع حقول المحلات والطلبات ⚠️');
    return;
  }
  
  // Format WhatsApp message
  const msg = formatBuyMessage(name, phone, address, storesData);
  sendWhatsAppMessage(msg);
}

// Formatting Purchase Order Message
function formatBuyMessage(name, phone, address, stores) {
  let msg = `*طلب شراء جديد 🛒*\n`;
  msg += `-------------------------\n`;
  msg += `*الاسم:* ${name}\n`;
  msg += `*الفون:* ${phone}\n`;
  msg += `*العنوان:* ${address}\n`;
  msg += `-------------------------\n`;
  msg += `*الطلبات والمحلات:*\n`;
  
  stores.forEach((store, idx) => {
    msg += `\n*(${idx + 1}) اسم المحل:* ${store.name}\n`;
    msg += `*الطلبات:*\n`;
    store.items.forEach((item) => {
      msg += `  - ${item}\n`;
    });
  });
  
  msg += `\n-------------------------\n`;
  msg += `تم الإرسال من موقع مستر ديليفري 🛵`;
  return msg;
}

// Validation & Submission for Delivery Orders
function handleDeliverySubmit() {
  const from = document.getElementById('del-from').value.trim();
  const fromPhone = document.getElementById('del-from-phone').value.trim();
  const to = document.getElementById('del-to').value.trim();
  const toPhone = document.getElementById('del-to-phone').value.trim();
  const details = document.getElementById('del-details').value.trim();
  
  if (!from || !fromPhone || !to || !toPhone || !details) {
    showToast('برجاء ملء جميع حقول التوصيل ⚠️');
    return;
  }
  
  const msg = formatDeliveryMessage(from, fromPhone, to, toPhone, details);
  sendWhatsAppMessage(msg);
}

// Formatting Delivery Order Message
function formatDeliveryMessage(from, fromPhone, to, toPhone, details) {
  let msg = `*طلب توصيل جديد 📦*\n`;
  msg += `-------------------------\n`;
  msg += `*هنستلم من:* ${from}\n`;
  msg += `*من الرقم دا:* ${fromPhone}\n`;
  msg += `-------------------------\n`;
  msg += `*هنوصله الى:* ${to}\n`;
  msg += `*على الرقم دا:* ${toPhone}\n`;
  msg += `-------------------------\n`;
  msg += `*الاوردر عبارة عن:*\n`;
  msg += `${details}\n`;
  msg += `-------------------------\n`;
  msg += `تم الإرسال من موقع مستر ديليفري 🛵`;
  return msg;
}

// Sending WhatsApp API Message
function sendWhatsAppMessage(text) {
  const cleanPhone = whatsappNumber.replace(/\D/g, ''); // strip any non-digit chars
  const encodedText = encodeURIComponent(text);
  const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  window.open(url, '_blank');
initDistForm();

// ── Shipment Distribution Form Logic ──
const PRICE_INSIDE = 15;
const PRICE_OUTSIDE = 25;
const WHATSAPP_PHONE = '201000000000'; // Placeholder client whatsapp number

function initDistForm() {
  const insideInput = document.getElementById('orders-inside');
  const outsideInput = document.getElementById('orders-outside');
  const senderName = document.getElementById('sender-name');
  const senderPhone = document.getElementById('sender-phone');

  if (!insideInput || !outsideInput) return;

  // Real-time calculation triggers
  insideInput.addEventListener('input', calculateTotal);
  outsideInput.addEventListener('input', calculateTotal);

  // Clear errors when the user starts typing
  senderName.addEventListener('input', () => clearError('sender-name'));
  senderPhone.addEventListener('input', () => clearError('sender-phone'));
  insideInput.addEventListener('input', () => clearError('orders-inside'));
  outsideInput.addEventListener('input', () => clearError('orders-outside'));

  // Custom cursor hover adjustments for form inputs
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  document.querySelectorAll('#page-dist input').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor && ring) {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
        ring.style.opacity = '0';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor && ring) {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.opacity = '1';
      }
    });
  });
}

function calculateTotal() {
  const insideInput = document.getElementById('orders-inside');
  const outsideInput = document.getElementById('orders-outside');
  const totalAmountEl = document.getElementById('total-amount');

  let insideCount = parseInt(insideInput.value) || 0;
  let outsideCount = parseInt(outsideInput.value) || 0;

  // Force non-negative numbers
  if (insideCount < 0) {
    insideInput.value = 0;
    insideCount = 0;
  }
  if (outsideCount < 0) {
    outsideInput.value = 0;
    outsideCount = 0;
  }

  const total = (insideCount * PRICE_INSIDE) + (outsideCount * PRICE_OUTSIDE);
  
  if (totalAmountEl.textContent !== String(total)) {
    totalAmountEl.textContent = total;
    // Animate total change with a quick pulse scale effect
    totalAmountEl.classList.add('pulse');
    setTimeout(() => totalAmountEl.classList.remove('pulse'), 250);
  }
}

function showError(fieldId, msg) {
  const errorEl = document.getElementById(`error-${fieldId}`);
  const inputEl = document.getElementById(fieldId);
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.add('show');
  }
  if (inputEl) {
    inputEl.style.borderColor = 'var(--primary)';
  }
}

function clearError(fieldId) {
  const errorEl = document.getElementById(`error-${fieldId}`);
  const inputEl = document.getElementById(fieldId);
  if (errorEl) {
    errorEl.classList.remove('show');
  }
  if (inputEl) {
    inputEl.style.borderColor = '';
  }
}

function submitDistForm() {
  const nameInput = document.getElementById('sender-name');
  const phoneInput = document.getElementById('sender-phone');
  const insideInput = document.getElementById('orders-inside');
  const outsideInput = document.getElementById('orders-outside');

  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  const insideVal = insideInput.value.trim();
  const outsideVal = outsideInput.value.trim();

  let isValid = true;

  // Validate Sender Name
  if (!nameVal) {
    showError('sender-name', 'برجاء إدخال اسم المرسِل');
    isValid = false;
  } else {
    clearError('sender-name');
  }

  // Validate Egyptian Phone Number (11 digits, starts with 010, 011, 012, or 015)
  const egPhoneRegex = /^01[0125]\d{8}$/;
  if (!phoneVal) {
    showError('sender-phone', 'برجاء إدخال رقم التليفون');
    isValid = false;
  } else if (!egPhoneRegex.test(phoneVal)) {
    showError('sender-phone', 'رقم تليفون غير صحيح (يجب أن يبدأ بـ 010، 011، 012 أو 015 ويتكون من 11 رقم)');
    isValid = false;
  } else {
    clearError('sender-phone');
  }

  // Validate inside orders count
  const insideCount = parseInt(insideVal);
  if (insideVal === '') {
    showError('orders-inside', 'برجاء إدخال عدد الأوردرات داخل الزيات');
    isValid = false;
  } else if (isNaN(insideCount) || insideCount < 0) {
    showError('orders-inside', 'يجب أن يكون الرقم 0 أو أكبر');
    isValid = false;
  } else {
    clearError('orders-inside');
  }

  // Validate outside orders count
  const outsideCount = parseInt(outsideVal);
  if (outsideVal === '') {
    showError('orders-outside', 'برجاء إدخال عدد الأوردرات خارج الزيات');
    isValid = false;
  } else if (isNaN(outsideCount) || outsideCount < 0) {
    showError('orders-outside', 'يجب أن يكون الرقم 0 أو أكبر');
    isValid = false;
  } else {
    clearError('orders-outside');
  }

  if (!isValid) {
    showToast('برجاء تصحيح الأخطاء في الحقول المطلوبة ⚠️');
    return;
  }

  const total = (insideCount * PRICE_INSIDE) + (outsideCount * PRICE_OUTSIDE);
  
  // Format Arabic Date & Time
  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedDateTime = `${dateStr} في تمام الساعة ${timeStr}`;

  // Construct structured WhatsApp message
  const msg = `🚚 *طلب توزيع شحنة — مستر ديليفري*

👤 المرسِل: ${nameVal}
📞 التليفون: ${phoneVal}

📦 تفاصيل الشحنة:
• أوردرات داخل الزيات: ${insideCount}
• أوردرات خارج الزيات: ${outsideCount}

💰 إجمالي الفاتورة: ${total} جنيه

⏰ وقت الطلب: ${formattedDateTime}`;

  const encodedMsg = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;

  // Redirect to WhatsApp
  window.open(whatsappUrl, '_blank');
}
