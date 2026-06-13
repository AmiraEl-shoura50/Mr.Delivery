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

function submitBuyForm() {
  // 1. جلب بيانات العميل الأساسية
  const name = document.getElementById('buy-name').value;
  const phone = document.getElementById('buy-phone').value;
  const address = document.getElementById('buy-address').value;

  // التحقق من تعبئة البيانات الأساسية
  if (!name || !phone || !address) {
    alert("برجاء ملء جميع البيانات الأساسية أولاً!");
    return;
  }

  // 2. تجهيز نص الرسالة
  let message = `🛒 *طلب شراء جديد - مستر ديليفري*\n\n`;
  message += `👤 *الاسم:* ${name}\n`;
  message += `📱 *الرقم:* ${phone}\n`;
  message += `📍 *العنوان:* ${address}\n`;
  message += `──────────────────\n\n`;

  // 3. المرور على كل المحلات وبنودها داخل الفورم
  const storeBlocks = document.querySelectorAll('#buy-stores-container .store-block');
  
  storeBlocks.forEach((block, index) => {
    const storeName = block.querySelector('.store-name-input').value;
    message += `🏪 *المحل رقم ${index + 1}:* ${storeName || 'غير محدد'}\n`;
    message += `📋 *البنود المطلوبة:*\n`;

    // جلب كل حقول البنود النشطة داخل هذا المحل تحديداً
    const itemInputs = block.querySelectorAll('.store-item-input');
    let itemCounter = 1;
    
    itemInputs.forEach(input => {
      if (input.value.trim() !== "") {
        message += `  ${itemCounter}- ${input.value.trim()}\n`;
        itemCounter++;
      }
    });
    
    message += `──────────────────\n\n`;
  });

  // 4. تشفير الرسالة وفتح رابط الواتساب (باستخدام رقمك الثابت المتغير في أول الملف)
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
  
  // فتح الواتساب في نافذة جديدة
  window.open(whatsappUrl, '_blank');
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