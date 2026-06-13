// ── Global Config & Dynamic Constants ──
const WHATSAPP_PHONE = '201009764342'; // 📱 رقم الجوال المتغير الخاص بالدعم / الاستلام

// ── State & Global Config ──
let currentPage = 'page-home';
let pageHistory = [];
let buyStores = []; // تم الاحتفاظ بالتعريف هنا وحذفه من الأسفل لمنع تكرار التعريف الإجباري

// Firebase & Offers State
let firebaseCategories = [];
let firebaseOffers = [];
window.firebaseCategories = firebaseCategories;
window.firebaseOffers = firebaseOffers;

// ── Particles ──
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  container.innerHTML = '';
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
  if (cursor && ring) {
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  }
  requestAnimationFrame(animCursor);
}
animCursor();

function initCursorHoverEvents() {
  document.querySelectorAll('button, .order-card, .cat-card, .offer-card, .btn-main').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor && ring) {
        cursor.style.transform += ' scale(2)';
        ring.style.opacity = '0.4';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor && ring) {
        ring.style.opacity = '1';
      }
    });
  });
}

// ── Page Navigation ──
function goTo(pageId) {
  if (pageHistory.length > 0 && pageHistory[pageHistory.length - 1] === pageId) {
    pageHistory.pop();
  }

  const trans = document.getElementById('transition');
  if (!trans) return;

  trans.className = 'page-transition enter';

  setTimeout(() => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');

    if (pageId === 'page-offers') {
      pageHistory = ['page-home'];
    } else if (pageId === 'page-offers-detail') {
      pageHistory = ['page-home', 'page-offers'];
    } else {
      pageHistory.push(currentPage);
    }

    currentPage = pageId;
    updateNavDots();
    trans.className = 'page-transition exit';
    animatePageIn(pageId);
    window.scrollTo(0, 0);
  }, 400);
}

function goBack() {
  if (currentPage === 'page-offers') {
    pageHistory = [];
    const trans = document.getElementById('transition');
    if (trans) trans.className = 'page-transition enter';

    setTimeout(() => {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const homeTarget = document.getElementById('page-home');
      if (homeTarget) homeTarget.classList.add('active');
      currentPage = 'page-home';
      updateNavDots();
      if (trans) trans.className = 'page-transition exit';
      animatePageIn('page-home');
    }, 400);
    return;
  }

  if (pageHistory.length > 0) {
    const prev = pageHistory.pop();
    const trans = document.getElementById('transition');
    if (trans) trans.className = 'page-transition enter';

    setTimeout(() => {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(prev);
      if (target) target.classList.add('active');
      currentPage = prev;
      updateNavDots();
      if (trans) trans.className = 'page-transition exit';
      animatePageIn(prev);
    }, 400);
  }
}

function updateNavDots() {
  const pages = ['page-home', 'page-order-type', 'page-buy', 'page-delivery', 'page-offers', 'page-offers-detail', 'page-dist'];
  document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.classList.toggle('active', pages[i] === currentPage);
  });
}

function animatePageIn(pageId) {
  if (pageId === 'page-order-type') animateOrderCards();
  if (pageId === 'page-offers') animateCatCards();
  if (pageId === 'page-offers-detail') animateOfferCards();
  if (pageId === 'page-dist') animateFormSections('#page-dist');
  if (pageId === 'page-buy') animateFormSections('#page-buy');
  if (pageId === 'page-delivery') animateFormSections('#page-delivery');
}

function animateFormSections(pageSelector) {
  document.querySelectorAll(`${pageSelector} .form-section`).forEach((sec, i) => {
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

// ── Trigger Load & Navigation From Main Home Button ──
window.onOffersAndProductsClick = function () {
  pageHistory = ['page-home'];
  goTo('page-offers');

  if (typeof window.loadFirebaseData === 'function') {
    window.loadFirebaseData();
  } else {
    renderClientCategories();
  }
};

// ── Render Client Categories Dynamically from Firebase ──
window.renderClientCategories = function () {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  const cats = window.firebaseCategories || [];
  const offers = window.firebaseOffers || [];

  if (cats.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted)"><div style="font-size:2rem;margin-bottom:1rem">📂</div>جاري تحميل الأقسام...</div>`;
    return;
  }

  grid.innerHTML = cats.map((cat, i) => {
    const cnt = offers.filter(o => o.catId === cat.id).length;
    return `
      <div class="cat-card animate-card" onclick="openCategory('${cat.id}')" style="animation-delay: ${i * 0.1}s; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
        ${cat.imgUrl ? `
          <div class="cat-img-wrap" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 0.8rem; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid var(--card-border);">
            <img src="${cat.imgUrl}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s;" class="cat-img-el">
          </div>
        ` : `
          <div style="width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.8rem;">
            <span class="cat-emoji" style="font-size: 3rem; display: block; text-align: center;">${cat.emoji || '🍔'}</span>
          </div>
        `}
        <div class="cat-name" style="font-weight: 700; text-align: center; font-size: 1.05rem;">${cat.name}</div>
        <div class="cat-count" style="font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-top: 0.2rem;">${cnt} عرض متاح</div>
      </div>
    `;
  }).join('');

  initCursorHoverEvents();
};

// ── Open Category & Show Offers Dynamically ──
window.openCategory = function (catId) {
  const cats = window.firebaseCategories || [];
  const offers = window.firebaseOffers || [];
  const cat = cats.find(c => c.id === catId);
  if (!cat) return;

  const emojiEl = document.getElementById('detailEmoji');
  const titleEl = document.getElementById('detailTitle');
  const subEl = document.getElementById('detailSub');

  if (emojiEl) emojiEl.textContent = cat.emoji || '🍔';
  if (titleEl) titleEl.textContent = cat.name;
  if (subEl) subEl.textContent = `أحدث عروض قسم ${cat.name}`;

  const grid = document.getElementById('offersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const catOffers = offers.filter(o => o.catId === catId);
  if (catOffers.length === 0) {
    grid.innerHTML = `
      <div class="empty" style="grid-column:1/-1; width:100%; text-align:center; padding: 3rem 0;">
        <div class="empty-icon" style="font-size: 3rem; margin-bottom: 1rem;">🔥</div>
        <div class="empty-text" style="color: var(--text-muted);">لا توجد عروض نشطة في هذا القسم حالياً</div>
      </div>
    `;
    pageHistory = ['page-home', 'page-offers'];
    goTo('page-offers-detail');
    return;
  }

  catOffers.forEach((offer, i) => {
    const d = offer.old > 0 ? Math.round((1 - offer.price / offer.old) * 100) : 0;
    const card = document.createElement('div');
    card.className = 'offer-card';
    card.onclick = () => showToast('هذه العروض للعرض فقط 👁️');
    card.innerHTML = `
      <div class="offer-img" style="background:${cat.color || '#2D1810'}; height: 160px; position: relative; border-radius: 14px 14px 0 0; overflow: hidden;">
        ${offer.imageUrl ? `
          <img src="${offer.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" class="offer-img-el">
        ` : `
          <div class="offer-img-inner" style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 3rem;">${offer.emoji || '🍕'}</div>
        `}
        ${offer.badge ? `<div class="offer-badge" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; color: white;">${offer.badge}</div>` : ''}
        ${d > 0 ? `
          <div class="discount-badge" style="position: absolute; top: 10px; left: 10px; background: #FF4B12; color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; box-shadow: 0 4px 12px rgba(255,75,18,0.4);">خصم ${d}%</div>
        ` : ''}
      </div>
      <div class="offer-body" style="padding: 1rem;">
        <div class="offer-name" style="font-weight: 700; margin-bottom: 0.3rem;">${offer.name}</div>
        <div class="offer-place" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">📍 ${offer.place}</div>
        <div class="offer-price-row" style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="offer-price" style="font-weight: 700; color: #FF4B12;">${offer.price} ج</span>
          ${offer.old ? `<span class="offer-old-price" style="text-decoration: line-through; font-size: 0.85rem; color: var(--text-muted);">${offer.old} ج</span>` : ''}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  pageHistory = ['page-home', 'page-offers'];
  goTo('page-offers-detail');
};

// ── Toast ──
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Ripple Effect ──
function initRipples() {
  document.querySelectorAll('.btn-main').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });
}

// ── Input Field Styles Hover ──
function initInputsHoverAdjustments() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  document.querySelectorAll('input, textarea').forEach(el => {
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

// ── Input Validation Helpers ──
function validateEgyptianPhone(phone) {
  if (!phone) return { valid: false, msg: 'برجاء إدخال رقم التليفون' };
  const digitsOnly = /^\d+$/;
  if (!digitsOnly.test(phone)) {
    return { valid: false, msg: 'رقم التليفون يجب أن يحتوي على أرقام فقط' };
  }
  const egPhoneRegex = /^01[0125]\d{8}$/;
  if (!egPhoneRegex.test(phone)) {
    return { valid: false, msg: 'رقم غير صحيح. يجب أن يتكون من 11 رقماً ويبدأ بـ 010 أو 011 أو 012 أو 015' };
  }
  return { valid: true };
}

function validateShortAddress(address) {
  if (!address) return { valid: false, msg: 'برجاء إدخال العنوان' };
  if (address.length > 80) {
    return { valid: false, msg: `العنوان طويل جداً (${address.length} حرفاً). يرجى كتابة عنوان قصير (بحد أقصى 80 حرفاً)` };
  }
  if (address.length < 5) {
    return { valid: false, msg: 'برجاء إدخال عنوان واضح (أكثر من 5 أحرف)' };
  }
  return { valid: true };
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

// ── Save Order to Firestore Log ──
async function logOrderToFirebase(orderData) {
  if (window.db && window.addDoc && window.collection) {
    try {
      await window.addDoc(window.collection(window.db, 'orders'), {
        ...orderData,
        createdAt: window.serverTimestamp()
      });
      console.log('Order logged in Firebase successfully');
    } catch (e) {
      console.error('Error saving order to Firebase Firestore:', e);
    }
  } else {
    console.warn('Firebase module not loaded or initialized yet.');
  }
}

// ══════════════════════════════════════════════════════════════
// 🛍️ PURCHASE ORDER FORM LOGIC (page-buy)
// ══════════════════════════════════════════════════════════════
function initBuyForm() {
  const nameInput = document.getElementById('buy-name');
  const phoneInput = document.getElementById('buy-phone');
  const addressInput = document.getElementById('buy-address');

  if (!nameInput) return;

  nameInput.addEventListener('input', () => clearError('buy-name'));
  phoneInput.addEventListener('input', () => clearError('buy-phone'));
  addressInput.addEventListener('input', () => clearError('buy-address'));

  buyStores = [];
  addNewStoreField();
}

function addNewStoreField() {
  if (buyStores.length >= 3) {
    showToast('أقصى حد هو 3 محلات للطلب الواحد لتفادي التأخير ⚠️');
    return;
  }
  const storeId = 'store-' + Date.now() + Math.random().toString(36).substr(2, 5);
  buyStores.push({ id: storeId, name: '', items: [''] });
  renderBuyStores();
  initInputsHoverAdjustments();
}

function removeStoreField(storeId) {
  if (buyStores.length <= 1) {
    showToast('يجب إدخال محل واحد على الأقل 🏪');
    return;
  }
  buyStores = buyStores.filter(s => s.id !== storeId);
  renderBuyStores();
}

function addItemField(storeId) {
  const container = document.getElementById(`items-container-${storeId}`);
  if (!container) return;

  // إنشاء صف جديد للبند المضاف
  const row = document.createElement('div');
  row.className = 'item-row';
  row.style.cssText = "display: flex; gap: 10px; align-items: center; margin-bottom: 0.5rem;";

  // محتوى الصف الجديد: الحقل + أيقونة الحذف (السلة)
  row.innerHTML = `
    <div class="input-wrapper" style="flex: 1; margin: 0;">
      <input type="text" class="store-item-input" placeholder="أدخل بنداً آخر..." required>
      <i class="fa-solid fa-basket-shopping input-icon"></i>
      <span class="char-error-msg" style="color: red; display: none; font-size: 0.85rem; margin-top: 5px;">
        عذراً، يجب ألا يزيد بند الطلب عن 40 حرفاً!
      </span>
    </div>
    <button type="button" class="btn-remove-item" style="background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2); width: 45px; height: 45px; border-radius: 10px; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; flex-shrink: 0;">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;

  // تشغيل حدث الحذف عند الضغط على أيقونة السلة
  row.querySelector('.btn-remove-item').addEventListener('click', function() {
    row.remove();
  });

  // إضافة الصف الجديد داخل الحاوية
  container.appendChild(row);

  // إذا كنت تستخدمين دالة لتحديث تأثير الهوفر على الأزرار الجديدة
  if (typeof initCursorHoverEvents === 'function') {
    initCursorHoverEvents();
  }
}

// دالة مساعدة لتحديث الأرقام التلقائية (الـ Placeholder) في حال العميل مسح بند في النص
function updateItemsPlaceholder(storeId) {
  const container = document.getElementById(`items-container-${storeId}`);
  if (!container) return;

  const rows = container.querySelectorAll('.item-row');
  rows.forEach((row, index) => {
    const input = row.querySelector('.store-item-input');
    if (input) {
      if (index === 0) {
        input.placeholder = "1 - مثال: 2 ساندوتش شاورما لارج";
      } else {
        input.placeholder = `${index + 1} - مثال: أكتب البند التالي هنا`;
      }
    }
  });
}

window.removeItemField = function (storeId, itemIndex) {
  const store = buyStores.find(s => s.id === storeId);
  if (store) {
    if (store.items.length <= 1) {
      showToast('يجب كتابة بند واحد على الأقل للمحل 🛒');
      return;
    }
    store.items.splice(itemIndex, 1);
    renderBuyStores();
  }
};

window.updateStoreName = function (id, val) {
  const store = buyStores.find(s => s.id === id);
  if (store) {
    store.name = val;
    clearError(`store-name-${id}`);
  }
};

window.updateStoreItemValue = function (storeId, itemIndex, val) {
  const store = buyStores.find(s => s.id === storeId);
  if (store) {
    store.items[itemIndex] = val;
    clearError(`store-items-${storeId}`);
  }
};

function renderBuyStores() {
  const container = document.getElementById('buy-stores-container');
  if (!container) return;

  container.innerHTML = buyStores.map((store, index) => {
    const itemsHtml = store.items.map((itemValue, itemIdx) => {
      return `
        <div class="item-row" style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
          <div class="input-wrapper" style="flex: 1;">
            <input type="text" class="store-item-input" maxlength="70" value="${itemValue}" placeholder="مثال: ٢ ساندوتش شاورما لارج" oninput="updateStoreItemValue('${store.id}', ${itemIdx}, this.value)" required>
            <i class="fa-solid fa-basket-shopping input-icon"></i>
          </div>
          ${itemIdx === 0
          ? `<button type="button" class="btn-add-item" onclick="addItemField('${store.id}')" style="background: var(--primary, #ff9800); color: #fff; border: none; border-radius: 8px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem;">＋</button>`
          : `<button type="button" class="btn-remove-item" onclick="removeItemField('${store.id}', ${itemIdx})" style="background: #ef4444; color: #fff; border: none; border-radius: 8px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer;">×</button>`
        }
        </div>
      `;
    }).join('');

    return `
      <div class="store-card-item" id="card-${store.id}" style="border: 1px solid var(--card-border); padding: 1.5rem; border-radius: 18px; background: rgba(255,255,255,0.01); margin-bottom: 1.2rem; position: relative; backdrop-filter: blur(10px); opacity: 0; transform: translateY(10px); animation: err-fade-in 0.35s ease forwards;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem;">
          <span style="font-weight: 700; color: var(--accent); font-size: 0.95rem;"><i class="fa-solid fa-shop"></i> المحل رقم ${index + 1}</span>
          ${buyStores.length > 1 ? `<button type="button" onclick="removeStoreField('${store.id}')" style="background: none; border: none; color: var(--primary); cursor: pointer; font-size: 0.9rem;" title="حذف المحل"><i class="fa-solid fa-trash"></i> حذف</button>` : ''}
        </div>
        
        <div class="input-group">
          <label for="store-name-${store.id}">اسم المحل / المطعم <span class="required">*</span></label>
          <div class="input-wrapper">
            <input type="text" id="store-name-${store.id}" value="${store.name}" placeholder="مثال: مطعم أبو عمار، أو سوبرماركت التقوى" oninput="updateStoreName('${store.id}', this.value)" required>
            <i class="fa-solid fa-store input-icon"></i>
          </div>
          <span class="error-msg" id="error-store-name-${store.id}">برجاء إدخال اسم المحل</span>
        </div>

        <div class="input-group" style="margin-bottom: 0;">
          <label id="store-items-label-${store.id}">بند الطلب <span class="required">*</span></label>
          <div class="items-container" id="items-container-${store.id}">
            ${itemsHtml}
          </div>
          <span class="error-msg" id="error-store-items-${store.id}">برجاء كتابة البنود المطلوبة بحد أقصى 70 حرفاً لكل بند</span>
        </div>
      </div>
    `;
  }).join('');

  const addBtn = document.getElementById('btn-add-store');
  const limitNote = document.getElementById('buy-store-limit-note');
  if (addBtn && limitNote) {
    if (buyStores.length >= 3) {
      addBtn.style.display = 'none';
      limitNote.style.display = 'block';
    } else {
      addBtn.style.display = 'flex';
      limitNote.style.display = 'none';
    }
  }

  initCursorHoverEvents();
}
// ══════════════════════════════════════════════════════════════
// 🛍️ PURCHASE ORDER FORM LOGIC (النسخة المتوافقة تماماً مع الـ HTML الخاص بكِ)
// ══════════════════════════════════════════════════════════════

// دالة تهيئة حقول الشراء عند تحميل الصفحة
function initBuyForm() {
  // نقوم بتصفير المحلات الإضافية والإبقاء على المحل الأول فقط كبداية
  const container = document.getElementById('store-block-1')?.parentElement;
  if (container) {
    const blocks = container.querySelectorAll('.store-block');
    blocks.forEach((block, index) => {
      if (index > 0) block.remove(); // حذف أي محل زائد متبقي من زيارة سابقة
    });
  }
  
  // إظهار زر إضافة محل وإخفاء رسالة الحد الأقصى
  const addBtn = document.getElementById('btn-add-store');
  const limitNote = document.getElementById('buy-store-limit-note');
  if (addBtn) addBtn.style.display = 'block';
  if (limitNote) limitNote.style.display = 'none';
}

// 1️⃣ دالة إضافة بند جديد (مستطيل تحت مع أيقونة حذف)
function addItemField(storeId) {
  const container = document.getElementById(`items-container-${storeId}`);
  if (!container) return;

  // إنشاء صف البند الجديد
  const row = document.createElement('div');
  row.className = 'item-row';
  row.style.cssText = "display: flex; gap: 10px; align-items: center; margin-bottom: 0.5rem;";

  // إضافة الحقل ومعه أيقونة الحذف الحمرة النشطة
  row.innerHTML = `
    <div class="input-wrapper" style="flex: 1; margin: 0;">
      <input type="text" class="store-item-input" placeholder="أدخل بنداً آخر..." required>
      <i class="fa-solid fa-basket-shopping input-icon"></i>
      <span class="char-error-msg" style="color: red; display: none; font-size: 0.85rem; margin-top: 5px;">
        عذراً، يجب ألا يزيد بند الطلب عن 40 حرفاً!
      </span>
    </div>
    <button type="button" class="btn-remove-item" style="background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.2); width: 45px; height: 45px; border-radius: 10px; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; flex-shrink: 0;">
      <i class="fa-solid fa-trash-can"></i>
    </button>
  `;

  // تفعيل حدث الحذف عند الضغط على السلة
  row.querySelector('.btn-remove-item').addEventListener('click', function() {
    row.remove();
  });

  // إضافة البند داخل الحاوية الخاصة بالمحل
  container.appendChild(row);

  // تحديث تأثير الهوفر للماوس لو متاح في ملفك
  if (typeof initCursorHoverEvents === 'function') initCursorHoverEvents();
}

// 2️⃣ دالة إضافة محل جديد (بحد أقصى 3 محلات)
function addNewStoreField() {
  // جلب جميع المحلات الحالية في الصفحة للحساب
  const currentStores = document.querySelectorAll('.store-block');
  const count = currentStores.length;

  if (count >= 3) {
    showToast('أقصى حد هو 3 محلات للطلب الواحد لتفادي التأخير ⚠️');
    return;
  }

  const nextIndex = count + 1;
  const parentContainer = document.getElementById('store-block-1').parentElement;
  const addStoreBtn = document.getElementById('btn-add-store');

  // بناء عنصر المحل الجديد بنفس الهيكل الـ HTML الخاص بكِ تماماً
  const newStoreBlock = document.createElement('div');
  newStoreBlock.className = 'store-block';
  newStoreBlock.id = `store-block-${nextIndex}`;
  newStoreBlock.style.cssText = "margin-bottom: 1.5rem; padding: 1.5rem 1rem; background: rgba(255,255,255,0.01); border: 1px solid var(--card-border); border-radius: 14px; position: relative;";

  newStoreBlock.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h4 style="margin: 0; color: var(--primary); font-size: 0.95rem;">
        <i class="fa-solid fa-shop"></i> المحل رقم ${nextIndex}
      </h4>
      <button type="button" onclick="this.closest('.store-block').remove(); updateStoreNumbers();" style="background: none; border: none; color: #EF4444; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
        <i class="fa-solid fa-trash-can"></i> حذف المحل
      </button>
    </div>

    <div class="input-group" style="margin-bottom: 1.2rem;">
      <label>اسم المحل / المطعم <span class="required">*</span></label>
      <div class="input-wrapper">
        <input type="text" class="store-name-input" placeholder="مثال: مطعم أبو عمار، أو سوبرماركت التقوى" required>
        <i class="fa-solid fa-store input-icon"></i>
      </div>
    </div>

    <div class="input-group">
      <label>بند الطلب <span class="required">*</span></label>
      <div class="items-container" id="items-container-${nextIndex}">
        <div class="item-row" style="display: flex; gap: 10px; align-items: center; margin-bottom: 0.5rem;">
          <div class="input-wrapper" style="flex: 1; margin: 0;">
            <input type="text" class="store-item-input" placeholder="مثال: 2 ساندوتش شاورما لارج" required>
            <i class="fa-solid fa-basket-shopping input-icon"></i>
          </div>
        </div>
      </div>

      <button type="button" class="btn-add-item-block" onclick="addItemField(${nextIndex})"
        style="width: 100%; text-align: right; padding: 0.8rem 1rem; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: 14px; color: var(--text); font-family: 'Cairo', sans-serif; cursor: pointer; display: flex; align-items: center; justify-content: flex-start; gap: 0.5rem; margin-top: 0.5rem; transition: all 0.3s;">
        <i class="fa-solid fa-plus" style="font-size: 0.9rem; color: var(--primary);"></i>
        <span style="font-size: 0.95rem; color: var(--text-muted);">إضافة بند</span>
      </button>
    </div>
  `;

  // إدخال المحل الجديد في الـ DOM قبل زرار "محل جديد" مباشرة
  parentContainer.insertBefore(newStoreBlock, addStoreBtn);

  // تحديث حالة الأزرار والرسائل التحذيرية للعدد
  updateStoreNumbers();
  
  if (typeof initCursorHoverEvents === 'function') initCursorHoverEvents();
}

// دالة مساعدة لتحديث أرقام وإعدادات المحلات عند إضافة أو حذف محل
function updateStoreNumbers() {
  const storeBlocks = document.querySelectorAll('.store-block');
  const addBtn = document.getElementById('btn-add-store');
  const limitNote = document.getElementById('buy-store-limit-note');

  storeBlocks.forEach((block, index) => {
    const idx = index + 1;
    // تحديث الـ ID الخاص بالمربع وحاوية البنود وزر الإضافة ليظل الترقيم صحيحاً ومتناسقاً
    block.id = `store-block-${idx}`;
    const h4 = block.querySelector('h4');
    if (h4) h4.innerHTML = `<i class="fa-solid fa-shop"></i> المحل رقم ${idx}`;
    
    const container = block.querySelector('.items-container');
    if (container) container.id = `items-container-${idx}`;
    
    const addBlockBtn = block.querySelector('.btn-add-item-block');
    if (addBlockBtn) addBlockBtn.setAttribute('onclick', `addItemField(${idx})`);
  });

  // التحكم في إظهار زر "محل جديد" أو رسالة الحد الأقصى 3
  if (storeBlocks.length >= 3) {
    if (addBtn) addBtn.style.display = 'none';
    if (limitNote) limitNote.style.display = 'block';
  } else {
    if (addBtn) addBtn.style.display = 'block';
    if (limitNote) limitNote.style.display = 'none';
  }
}

// 3️⃣ دالة التحقق وإرسال رسالة الواتساب المضمونة
async function submitBuyForm() {
  const name = document.getElementById('buy-name').value.trim();
  const phone = document.getElementById('buy-phone').value.trim();
  const address = document.getElementById('buy-address').value.trim();

  // التحقق من الحقول الأساسية أولاً
  let isFormValid = true;
  if (!name) { showError('buy-name', 'برجاء إدخال الاسم'); isFormValid = false; } else { clearError('buy-name'); }
  
  const phoneCheck = validateEgyptianPhone(phone);
  if (!phoneCheck.valid) { showError('buy-phone', phoneCheck.msg); isFormValid = false; } else { clearError('buy-phone'); }
  
  const addressCheck = validateShortAddress(address);
  if (!addressCheck.valid) { showError('buy-address', addressCheck.msg); isFormValid = false; } else { clearError('buy-address'); }

  if (!isFormValid) {
    showToast("برجاء تصحيح البيانات الأساسية أولاً! ⚠️");
    return;
  }

  // بناء نص رسالة الواتساب وتجميع المحلات
  let message = `🛒 *طلب شراء جديد - مستر ديليفري*\n\n`;
  message += `👤 *الاسم:* ${name}\n`;
  message += `📱 *الرقم:* ${phone}\n`;
  message += `📍 *العنوان:* ${address}\n`;
  message += `──────────────────\n\n`;

  const storeBlocks = document.querySelectorAll('.store-block');
  let hasValidStores = true;

  storeBlocks.forEach((block, index) => {
    const nameInput = block.querySelector('.store-name-input');
    const storeName = nameInput ? nameInput.value.trim() : '';

    if (!storeName) {
      showToast(`برجاء كتابة اسم المحل رقم ${index + 1} 🏪`);
      if (nameInput) nameInput.style.borderColor = 'var(--primary)';
      hasValidStores = false;
      return;
    } else {
      if (nameInput) nameInput.style.borderColor = '';
    }

    message += `🏪 *المحل رقم ${index + 1}:* ${storeName}\n`;
    message += `📋 *البنود المطلوبة:*\n`;

    const itemInputs = block.querySelectorAll('.store-item-input');
    let itemCounter = 1;
    let hasItems = false;

    itemInputs.forEach(input => {
      const itemVal = input.value.trim();
      if (itemVal !== "") {
        message += `  ${itemCounter}- ${itemVal}\n`;
        itemCounter++;
        hasItems = true;
      }
    });

    if (!hasItems) {
      showToast(`برجاء كتابة بند واحد على الأقل للمحل رقم ${index + 1} 🛒`);
      hasValidStores = false;
      return;
    }

    message += `──────────────────\n\n`;
  });

  if (!hasValidStores) return;

  // جلب البيانات لرفعها للفايربيس لو الدالة مفعّلة عندك
  const firebaseStores = [];
  storeBlocks.forEach(block => {
    const storeName = block.querySelector('.store-name-input').value.trim();
    const items = Array.from(block.querySelectorAll('.store-item-input')).map(i => i.value.trim()).filter(i => i !== '');
    firebaseStores.push({ name: storeName, items: items });
  });

  const orderData = {
    type: 'buy',
    clientName: name,
    clientPhone: phone,
    clientAddress: address,
    stores: firebaseStores,
    status: 'pending'
  };
  await logOrderToFirebase(orderData);

  // تشفير الرسالة وفتح رابط الواتساب الصحيح والمجرب
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;

  showToast('تم حفظ طلبك بنجاح وجاري توجيهك للواتساب... 🚀');
  setTimeout(() => { 
    window.location.href = whatsappUrl; 
  }, 1000);
}
// ══════════════════════════════════════════════════════════════
// 📦 DELIVERY ORDER FORM LOGIC (page-delivery)
// ══════════════════════════════════════════════════════════════
function initDeliveryForm() {
  const sName = document.getElementById('delivery-sender-name');
  const sPhone = document.getElementById('delivery-sender-phone');
  const sAddr = document.getElementById('delivery-pickup-address');
  const rName = document.getElementById('delivery-receiver-name');
  const rPhone = document.getElementById('delivery-receiver-phone');
  const rAddr = document.getElementById('delivery-dropoff-address');
  const pkg = document.getElementById('delivery-package');

  if (!sName) return;

  sName.addEventListener('input', () => clearError('delivery-sender-name'));
  sPhone.addEventListener('input', () => clearError('delivery-sender-phone'));
  sAddr.addEventListener('input', () => clearError('delivery-pickup-address'));
  rName.addEventListener('input', () => clearError('delivery-receiver-name'));
  rPhone.addEventListener('input', () => clearError('delivery-receiver-phone'));
  rAddr.addEventListener('input', () => clearError('delivery-dropoff-address'));
  pkg.addEventListener('input', () => clearError('delivery-package'));
}

async function submitDeliveryForm() {
  const sName = document.getElementById('delivery-sender-name');
  const sPhone = document.getElementById('delivery-sender-phone');
  const sAddr = document.getElementById('delivery-pickup-address');
  const rName = document.getElementById('delivery-receiver-name');
  const rPhone = document.getElementById('delivery-receiver-phone');
  const rAddr = document.getElementById('delivery-dropoff-address');
  const pkg = document.getElementById('delivery-package');

  const sNameVal = sName.value.trim();
  const sPhoneVal = sPhone.value.trim();
  const sAddrVal = sAddr.value.trim();
  const rNameVal = rName.value.trim();
  const rPhoneVal = rPhone.value.trim();
  const rAddrVal = rAddr.value.trim();
  const pkgVal = pkg.value.trim();

  let isValid = true;

  if (!sNameVal) { showError('delivery-sender-name', 'برجاء إدخال اسم المرسِل'); isValid = false; } else { clearError('delivery-sender-name'); }
  const sPhoneCheck = validateEgyptianPhone(sPhoneVal);
  if (!sPhoneCheck.valid) { showError('delivery-sender-phone', sPhoneCheck.msg); isValid = false; } else { clearError('delivery-sender-phone'); }
  const sAddrCheck = validateShortAddress(sAddrVal);
  if (!sAddrCheck.valid) { showError('delivery-pickup-address', sAddrCheck.msg); isValid = false; } else { clearError('delivery-pickup-address'); }

  if (!rNameVal) { showError('delivery-receiver-name', 'برجاء إدخال اسم المستلم'); isValid = false; } else { clearError('delivery-receiver-name'); }
  const rPhoneCheck = validateEgyptianPhone(rPhoneVal);
  if (!rPhoneCheck.valid) { showError('delivery-receiver-phone', rPhoneCheck.msg); isValid = false; } else { clearError('delivery-receiver-phone'); }
  const rAddrCheck = validateShortAddress(rAddrVal);
  if (!rAddrCheck.valid) { showError('delivery-dropoff-address', rAddrCheck.msg); isValid = false; } else { clearError('delivery-dropoff-address'); }

  if (!pkgVal) { showError('delivery-package', 'برجاء وصف الشحنة المراد توصيلها'); isValid = false; } else { clearError('delivery-package'); }

  if (!isValid) {
    showToast('برجاء تصحيح الأخطاء في الحقول المطلوبة ⚠️');
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedDateTime = `${dateStr} في تمام الساعة ${timeStr}`;

  const orderData = {
    type: 'delivery',
    senderName: sNameVal,
    senderPhone: sPhoneVal,
    pickupAddress: sAddrVal,
    receiverName: rNameVal,
    receiverPhone: rPhoneVal,
    dropoffAddress: rAddrVal,
    packageDescription: pkgVal,
    status: 'pending'
  };
  await logOrderToFirebase(orderData);

  const msg = `📦 *طلب توصيل جديد — مستر ديليفري*

👤 *المرسِل:* ${sNameVal}
📞 *تليفون المرسِل:* ${sPhoneVal}
📍 *عنوان الاستلام (من):* ${sAddrVal}

👤 *المستلم:* ${rNameVal}
📞 *تليفون المستلم:* ${rPhoneVal}
📍 *عنوان التوصيل (إلى):* ${rAddrVal}

📦 *تفاصيل الشحنة:*
${pkgVal}

⏰ *وقت الطلب:* ${formattedDateTime}`;

  const encodedMsg = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;

  showToast('تم حفظ طلب التوصيل بنجاح وجاري توجيهك للواتساب... 🚀');
setTimeout(() => { window.location.href = whatsappUrl; }, 1000);
}

// ══════════════════════════════════════════════════════════════
// 🚚 SHIPMENT DISTRIBUTION LOGIC (page-dist)
// ══════════════════════════════════════════════════════════════
function initDistForm() {
  const insideInput = document.getElementById('orders-inside');
  const outsideInput = document.getElementById('orders-outside');
  const senderName = document.getElementById('sender-name');
  const senderPhone = document.getElementById('sender-phone');
  const senderAddress = document.getElementById('sender-address');

  if (!insideInput || !outsideInput) return;

  senderName.addEventListener('input', () => clearError('sender-name'));
  senderPhone.addEventListener('input', () => clearError('sender-phone'));
  if (senderAddress) senderAddress.addEventListener('input', () => clearError('sender-address'));
  insideInput.addEventListener('input', () => clearError('orders-inside'));
  outsideInput.addEventListener('input', () => clearError('orders-outside'));
}

async function submitDistForm() {
  const nameInput = document.getElementById('sender-name');
  const phoneInput = document.getElementById('sender-phone');
  const addressInput = document.getElementById('sender-address');
  const insideInput = document.getElementById('orders-inside');
  const outsideInput = document.getElementById('orders-outside');
  const distDetailsInput = document.getElementById('dist-details');

  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  const addressVal = addressInput ? addressInput.value.trim() : '';
  const insideVal = insideInput.value.trim();
  const outsideVal = outsideInput.value.trim();
  const distDetailsVal = distDetailsInput ? distDetailsInput.value.trim() : '';

  let isValid = true;

  if (!nameVal) { showError('sender-name', 'برجاء إدخال اسم المرسِل'); isValid = false; } else { clearError('sender-name'); }
  const phoneCheck = validateEgyptianPhone(phoneVal);
  if (!phoneCheck.valid) { showError('sender-phone', phoneCheck.msg); isValid = false; } else { clearError('sender-phone'); }

  if (!addressVal) {
    showError('sender-address', 'برجاء إدخال عنوان استلام الشحنة');
    isValid = false;
  } else {
    clearError('sender-address');
  }

  const insideCount = parseInt(insideVal);
  if (insideVal === '') { showError('orders-inside', 'برجاء إدخال عدد الأوردرات'); isValid = false; }
  else if (isNaN(insideCount) || insideCount < 0) { showError('orders-inside', 'يجب أن يكون الرقم 0 أو أكبر'); isValid = false; }
  else { clearError('orders-inside'); }

  const outsideCount = parseInt(outsideVal);
  if (outsideVal === '') { showError('orders-outside', 'برجاء إدخال عدد الأوردرات'); isValid = false; }
  else if (isNaN(outsideCount) || outsideCount < 0) { showError('orders-outside', 'يجب أن يكون الرقم 0 أو أكبر'); isValid = false; }
  else { clearError('orders-outside'); }

  if (!distDetailsVal) {
    if (document.getElementById('error-dist-details')) showError('dist-details', 'برجاء كتابة تفاصيل الشحنة');
    isValid = false;
  } else {
    if (document.getElementById('error-dist-details')) clearError('dist-details');
  }

  if (!isValid) {
    showToast('برجاء تصحيح الأخطاء في الحقول المطلوبة ⚠️');
    return;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
  const formattedDateTime = `${dateStr} في تمام الساعة ${timeStr}`;

  const orderData = {
    type: 'distribution',
    senderName: nameVal,
    senderPhone: phoneVal,
    senderAddress: addressVal,
    ordersInsideZayat: insideCount,
    ordersOutsideZayat: outsideCount,
    details: distDetailsVal,
    status: 'pending'
  };
  await logOrderToFirebase(orderData);

  const msg = `🚚 *طلب توزيع شحنة — مستر ديليفري*

👤 *المرسِل:* ${nameVal}
📞 *التليفون:* ${phoneVal}
📍 *عنوان الاستلام:* ${addressVal}

📦 *تفاصيل الشحنة:*
• أوردرات داخل الزيات: ${insideCount}
• أوردرات خارج الزيات: ${outsideCount}
📝 *الملاحظات/التفاصيل:* ${distDetailsVal}

⏰ *وقت الطلب:* ${formattedDateTime}`;

  const encodedMsg = encodeURIComponent(msg);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;

  showToast('تم حفظ طلب التوزيع بنجاح وجاري توجيهك للواتساب... 🚀');
setTimeout(() => { window.location.href = whatsappUrl; }, 1000);
}

// ── Init Systems ──
createParticles();
initDistForm();
initBuyForm();
initDeliveryForm();
initRipples();
initInputsHoverAdjustments();
initCursorHoverEvents();

// ── Firebase Realtime Sync Injection ──
window.loadFirebaseData = function () {
  if (window.firebaseCategories && window.firebaseCategories.length > 0) {
    renderClientCategories();
  }
};

(async () => {
  try {
    const { database } = await import('./api.js');
    const { ref, onValue } = await import("https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js");

    const db = database;

    onValue(ref(db, 'categories'), (snapshot) => {
      const data = snapshot.val();
      let firebaseCategories = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      window.firebaseCategories = firebaseCategories;
      if (currentPage === 'page-offers') renderClientCategories();
    }, (err) => console.warn('Categories offline or syntax error:', err));

    onValue(ref(db, 'offers'), (snapshot) => {
      const data = snapshot.val();
      let firebaseOffers = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      window.firebaseOffers = firebaseOffers;
      if (currentPage === 'page-offers') renderClientCategories();
    }, (err) => console.warn('Offers offline or syntax error:', err));

  } catch (e) {
    console.warn('Firebase module lazy load skipped or network offline', e);
  }
})();

// الاستماع لأي كتابة بتحصل جوه الـ input الخاص ببند الطلب
document.addEventListener('input', function (event) {
    // التأكد إن المستخدم بيكتب جوه الـ input الصح عن طريق الـ class
    if (event.target.classList.contains('store-item-input')) {
        const inputField = event.target;
        const wrapper = inputField.closest('.input-wrapper');
        const errorMsg = wrapper.querySelector('.char-error-msg');

        // الشرط: لو طول النص أكبر من 40 حرف
        if (inputField.value.length > 40) {
            errorMsg.style.display = 'block';       // إظهار رسالة الخطأ
            inputField.style.borderColor = 'red';   // تغيير لون حدود الـ input للأحمر كتنبيه
        } else {
            errorMsg.style.display = 'none';        // إخفاء الرسالة لو النص مسموح به
            inputField.style.borderColor = '';      // إعادة اللون الطبيعي للـ input
        }
    }
});