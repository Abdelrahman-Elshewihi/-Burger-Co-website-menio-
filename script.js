'use strict';

/* ==========================================================================
   ⚙️ CONFIGURATION
   الإعدادات العامة للمشروع — عدّل من هنا فقط
   ========================================================================== */

// ==========================================
// 📲 رقم WhatsApp الخاص بالكاشير
// ضع الرقم بالصيغة الدولية بدون +
// مثال مصر: 201XXXXXXXXX
// ==========================================
const DEFAULT_CASHIER_NUMBER = '201025857442';

// رمز دخول الأدمن (Frontend-only — راجع README لملاحظات الأمان)
const ADMIN_PIN = '2007';

// المفاتيح المستخدمة في localStorage
const STORAGE_KEYS = {
  menu: 'burgerco_menu_data',
  theme: 'burgerco_theme',
  lang: 'burgerco_lang',
  cashier: 'burgerco_cashier_number',
  logo: 'burgerco_logo_url'
};

/* ==========================================================================
   🌍 نصوص الترجمة — AR / EN
   ========================================================================== */
const I18N = {
  ar: {
    brandName: 'Burger & Co.',
    heroEyebrow: 'اطلب أونلاين',
    heroTitle: 'شوي. صوص. سعادة.',
    heroSub: 'تصفح المنيو، اختر حجمك، وابعت طلبك على واتساب في ثواني.',
    cartTitle: 'سلة الطلبات',
    cartEmptyMsg: 'السلة فاضية دلوقتي 🍔',
    tableNumber: 'رقم الطاولة',
    total: 'الإجمالي',
    sendOrder: 'إرسال الطلب عبر واتساب',
    selectSize: 'اختر الحجم',
    addToCart: 'أضف للسلة',
    adminLogin: 'تسجيل دخول الأدمن',
    pinLabel: 'أدخل الرمز السري',
    login: 'دخول',
    adminSecurityNote: 'ملاحظة: هذا القفل لتنظيم الواجهة فقط وليس نظام حماية حقيقي.',
    adminDashboard: 'لوحة تحكم الأدمن',
    logout: 'خروج',
    tabProducts: 'المنتجات',
    tabCategories: 'التصنيفات',
    tabSettings: 'الإعدادات',
    addProduct: '+ إضافة منتج',
    addCategory: '+ إضافة تصنيف',
    cashierNumberLabel: 'رقم واتساب الكاشير (دولي، بدون +)',
    logoLabel: 'رابط شعار المطعم (اختياري)',
    save: 'حفظ',
    editProduct: 'تعديل المنتج',
    productNameAr: 'اسم المنتج (عربي)',
    productNameEn: 'اسم المنتج (إنجليزي)',
    productCategory: 'التصنيف',
    productImage: 'رابط الصورة',
    sizesPrices: 'الأحجام والأسعار (EGP)',
    addSize: '+ إضافة حجم',
    enabled: 'مفعل',
    delete: 'حذف',
    footerText: 'Burger & Co. — Made with 🔥 in Damietta',
    emptyCategoryMsg: 'لا يوجد منتجات في هذا التصنيف حاليًا',
    wrongPin: 'الرمز غير صحيح',
    emptyCartError: 'السلة فاضية، أضف منتج الأول',
    tableRequiredError: 'من فضلك أدخل رقم الطاولة',
    cashierMissingError: 'رقم واتساب الكاشير غير مضبوط',
    addedToast: 'اتضاف للسلة ✅',
    savedToast: 'تم الحفظ ✅',
    deletedToast: 'تم الحذف',
    settingsSaved: 'تم حفظ الإعدادات ✅',
    newCategoryPlaceholder: 'اسم التصنيف',
    newProductTitle: 'إضافة منتج جديد',
    order: 'Order',
    table: 'Table',
    prepTime: 'من فضلك اذكر الوقت المتوقع للتحضير',
    thankYou: 'شكرًا لكم!'
  },
  en: {
    brandName: 'Burger & Co.',
    heroEyebrow: 'Order online',
    heroTitle: 'Grill. Sauce. Joy.',
    heroSub: 'Browse the menu, pick your size, and send your order on WhatsApp in seconds.',
    cartTitle: 'Your Cart',
    cartEmptyMsg: 'Your cart is empty 🍔',
    tableNumber: 'Table Number',
    total: 'Total',
    sendOrder: 'Send Order via WhatsApp',
    selectSize: 'Select Size',
    addToCart: 'Add to Cart',
    adminLogin: 'Admin Login',
    pinLabel: 'Enter PIN',
    login: 'Login',
    adminSecurityNote: 'Note: this lock is a UI access control, not real server-side security.',
    adminDashboard: 'Admin Dashboard',
    logout: 'Logout',
    tabProducts: 'Products',
    tabCategories: 'Categories',
    tabSettings: 'Settings',
    addProduct: '+ Add Product',
    addCategory: '+ Add Category',
    cashierNumberLabel: 'Cashier WhatsApp number (international, no +)',
    logoLabel: 'Restaurant logo URL (optional)',
    save: 'Save',
    editProduct: 'Edit Product',
    productNameAr: 'Product name (Arabic)',
    productNameEn: 'Product name (English)',
    productCategory: 'Category',
    productImage: 'Image URL',
    sizesPrices: 'Sizes & Prices (EGP)',
    addSize: '+ Add Size',
    enabled: 'Enabled',
    delete: 'Delete',
    footerText: 'Burger & Co. — Made with 🔥 in Damietta',
    emptyCategoryMsg: 'No products in this category yet',
    wrongPin: 'Incorrect PIN',
    emptyCartError: 'Your cart is empty — add a product first',
    tableRequiredError: 'Please enter a table number',
    cashierMissingError: 'Cashier WhatsApp number is not set',
    addedToast: 'Added to cart ✅',
    savedToast: 'Saved ✅',
    deletedToast: 'Deleted',
    settingsSaved: 'Settings saved ✅',
    newCategoryPlaceholder: 'Category name',
    newProductTitle: 'Add New Product',
    order: 'Order',
    table: 'Table',
    prepTime: 'Please provide the estimated preparation time.',
    thankYou: 'Thank you!'
  }
};

/* ==========================================================================
   💰 MENU DATA — التصنيفات والمنتجات والأسعار
   عدّل الأسعار والمنتجات من هنا فقط (أو من Admin Dashboard)
   ========================================================================== */
function getDefaultMenuData(){
  return {
    categories: [
      { id: 'main', nameAr: 'الأطباق الرئيسية', nameEn: 'Main Dishes' },
      { id: 'side', nameAr: 'الأطباق الجانبية', nameEn: 'Side Dishes' },
      { id: 'drinks', nameAr: 'المشروبات', nameEn: 'Drinks' }
    ],
    products: [
      {
        id: 'burger',
        nameAr: 'برجر',
        nameEn: 'Burger',
        categoryId: 'main',
        enabled: true,
        sizes: [
          { id: 'small', labelAr: 'صغير', labelEn: 'Small', price: 10, image: 'assets/images/burger-small.jpg' },
          { id: 'medium', labelAr: 'وسط', labelEn: 'Medium', price: 20, image: 'assets/images/burger-medium.jpg' },
          { id: 'large', labelAr: 'كبير', labelEn: 'Large', price: 25, image: 'assets/images/burger-large.jpg' }
        ]
      },
      {
        id: 'fries',
        nameAr: 'بطاطس',
        nameEn: 'Fries',
        categoryId: 'side',
        enabled: true,
        sizes: [
          { id: 'small', labelAr: 'صغير', labelEn: 'Small', price: 3, image: 'assets/images/fries-small.jpg' },
          { id: 'medium', labelAr: 'وسط', labelEn: 'Medium', price: 5, image: 'assets/images/fries-medium.jpg' },
          { id: 'large', labelAr: 'كبير', labelEn: 'Large', price: 10, image: 'assets/images/fries-large.jpg' }
        ]
      },
      {
        id: 'cola_black',
        nameAr: 'كولا بلاك',
        nameEn: 'Cola Black',
        categoryId: 'drinks',
        enabled: true,
        sizes: [
          { id: 'reg', labelAr: 'عادي', labelEn: 'Regular', price: 8, image: 'assets/images/cola-black.jpg' }
        ]
      },
      {
        id: 'cola_lemon',
        nameAr: 'كولا ليمون',
        nameEn: 'Cola Lemon',
        categoryId: 'drinks',
        enabled: true,
        sizes: [
          { id: 'reg', labelAr: 'عادي', labelEn: 'Regular', price: 7, image: 'assets/images/cola-lemon.jpg' }
        ]
      },
      {
        id: 'cola_orange',
        nameAr: 'كولا برتقال',
        nameEn: 'Cola Orange',
        categoryId: 'drinks',
        enabled: true,
        sizes: [
          { id: 'reg', labelAr: 'عادي', labelEn: 'Regular', price: 6, image: 'assets/images/cola-orange.jpg' }
        ]
      }
    ]
  };
}

/* ==========================================================================
   🧠 APPLICATION STATE
   الحالة الحالية للتطبيق
   ========================================================================== */
const state = {
  lang: 'ar',
  theme: 'dark',
  menuData: null,
  cashierNumber: DEFAULT_CASHIER_NUMBER,
  logoUrl: '',
  cart: [],           // [{ productId, sizeId, qty }]
  activeCategoryId: null,
  cardIndexByCategory: {}, // { categoryId: currentIndex }
  adminLoggedIn: false,
  pendingSizeProduct: null,
  pendingSizeSelection: null,
  editingProductId: null, // null = new product
  editingSizes: []
};

/* ==========================================================================
   🧰 UTILITIES
   ========================================================================== */
function t(key){
  return (I18N[state.lang] && I18N[state.lang][key]) || I18N.ar[key] || key;
}
function productName(p){ return state.lang === 'ar' ? p.nameAr : p.nameEn; }
function categoryName(c){ return state.lang === 'ar' ? c.nameAr : c.nameEn; }
function sizeLabel(s){ return state.lang === 'ar' ? s.labelAr : s.labelEn; }
function formatPrice(n){ return `\u2066${n} EGP\u2069`; }
function uid(prefix){ return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function saveMenuData(){
  localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(state.menuData));
}
function loadMenuData(){
  const raw = localStorage.getItem(STORAGE_KEYS.menu);
  if (raw){
    try { return JSON.parse(raw); } catch(e){ /* fall through to default */ }
  }
  return getDefaultMenuData();
}

function showToast(msg){
  const toastEl = document.getElementById('toast');
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ==========================================================================
   🌍 LANGUAGE & DIRECTION
   AR / EN + RTL / LTR
   ========================================================================== */
function applyLanguage(){
  const html = document.documentElement;
  html.lang = state.lang;
  html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('langToggleLabel').textContent = state.lang === 'ar' ? 'EN' : 'AR';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  localStorage.setItem(STORAGE_KEYS.lang, state.lang);

  renderCategoryBar();
  renderSlider();
  renderCart();
}

function toggleLanguage(){
  state.lang = state.lang === 'ar' ? 'en' : 'ar';
  applyLanguage();
}

/* ==========================================================================
   🌙 THEME
   Light / Dark Mode
   ========================================================================== */
function applyTheme(){
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  const moon = document.getElementById('themeIconMoon');
  moon.style.transform = state.theme === 'light' ? 'rotate(180deg)' : 'rotate(0deg)';
}
function toggleTheme(){
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
}

/* ==========================================================================
   🎨 UI FUNCTIONS
   رسم وتحديث واجهة المستخدم
   ========================================================================== */
function renderCategoryBar(){
  const bar = document.getElementById('categoryBar');
  bar.innerHTML = '';
  state.menuData.categories.forEach(cat => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'category-chip' + (cat.id === state.activeCategoryId ? ' active' : '');
    chip.textContent = categoryName(cat);
    chip.setAttribute('role', 'tab');
    chip.addEventListener('click', () => {
      state.activeCategoryId = cat.id;
      renderCategoryBar();
      renderSlider();
    });
    bar.appendChild(chip);
  });
}

function getProductsForActiveCategory(){
  return state.menuData.products.filter(p => p.categoryId === state.activeCategoryId && p.enabled);
}

function renderSlider(){
  const stage = document.getElementById('sliderStage');
  const dotsWrap = document.getElementById('sliderDots');
  const products = getProductsForActiveCategory();
  stage.innerHTML = '';
  dotsWrap.innerHTML = '';

  const controls = document.querySelector('.slider-controls');

  if (products.length === 0){
    controls.style.display = 'none';
    const msg = document.createElement('p');
    msg.className = 'empty-category-msg';
    msg.textContent = t('emptyCategoryMsg');
    stage.appendChild(msg);
    return;
  }
  controls.style.display = 'flex';

  if (state.cardIndexByCategory[state.activeCategoryId] === undefined){
    state.cardIndexByCategory[state.activeCategoryId] = 0;
  }
  const current = state.cardIndexByCategory[state.activeCategoryId] % products.length;

  products.forEach((product, i) => {
    const card = buildDeckCard(product, i, current, products.length);
    stage.appendChild(card);
  });

  products.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'slider-dot' + (i === current ? ' active' : '');
    dotsWrap.appendChild(dot);
  });
}

// حساب موقع البطاقة داخل الـ Stack بناءً على المسافة من البطاقة الحالية
function buildDeckCard(product, index, current, total){
  const card = document.createElement('article');
  card.className = 'deck-card';

  let diff = index - current;
  if (diff < 0) diff += total;

  const priceInfo = getProductPriceInfo(product);
  const displayImage = product.sizes[0].image;

  card.innerHTML = `
    <div class="card-img-wrap">
      <span class="card-cat-tag">${categoryName(state.menuData.categories.find(c => c.id === product.categoryId))}</span>
      <img src="${displayImage}" alt="${productName(product)}" loading="lazy">
    </div>
    <div class="card-info">
      <h3 class="card-name">${productName(product)}</h3>
      <span class="card-price">${priceInfo}</span>
      <button class="card-cta" type="button">${product.sizes.length > 1 ? t('selectSize') : t('addToCart')}</button>
    </div>
  `;

  positionDeckCard(card, diff, total);

  const ctaBtn = card.querySelector('.card-cta');
  ctaBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleProductAction(product);
  });

  // الضغط على أي بطاقة غير الحالية ينقلها للمقدمة، والضغط على الحالية يفتح المنتج
  card.addEventListener('click', () => {
    if (diff === 0){
      handleProductAction(product);
    } else {
      state.cardIndexByCategory[state.activeCategoryId] = index;
      renderSlider();
    }
  });

  return card;
}

function positionDeckCard(card, diff, total){
  const maxVisible = 3;
  if (diff >= maxVisible){
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';
    card.style.transform = 'translateY(40px) scale(.8)';
    card.style.zIndex = '0';
    return;
  }
  const translateY = diff * 14;
  const scale = 1 - diff * 0.06;
  const rotate = diff === 0 ? 0 : -3 * diff;
  const opacity = diff === 0 ? 1 : diff === 1 ? 0.75 : 0.45;
  card.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
  card.style.opacity = String(opacity);
  card.style.zIndex = String(maxVisible - diff);
  card.style.pointerEvents = diff === 0 ? 'auto' : 'auto';
}

function getProductPriceInfo(product){
  // نستخدم Unicode isolate (LRM) لضمان عرض الأرقام والفاصل بترتيب صحيح داخل نص عربي RTL
  if (product.sizes.length === 1) return formatPrice(product.sizes[0].price);
  const prices = product.sizes.map(s => s.price);
  const min = Math.min(...prices), max = Math.max(...prices);
  return `\u2066${min} - ${max} EGP\u2069`;
}

function slideNext(){
  const products = getProductsForActiveCategory();
  if (products.length === 0) return;
  const current = state.cardIndexByCategory[state.activeCategoryId] || 0;
  state.cardIndexByCategory[state.activeCategoryId] = (current + 1) % products.length;
  renderSlider();
}
function slidePrev(){
  const products = getProductsForActiveCategory();
  if (products.length === 0) return;
  const current = state.cardIndexByCategory[state.activeCategoryId] || 0;
  state.cardIndexByCategory[state.activeCategoryId] = (current - 1 + products.length) % products.length;
  renderSlider();
}

function handleProductAction(product){
  if (product.sizes.length > 1){
    openSizeModal(product);
  } else {
    addToCart(product.id, product.sizes[0].id, 1);
    showToast(t('addedToast'));
  }
}

/* ==========================================================================
   📏 Size Selection Modal
   ========================================================================== */
function openSizeModal(product){
  state.pendingSizeProduct = product;
  state.pendingSizeSelection = product.sizes[0].id;

  document.getElementById('sizeModalName').textContent = productName(product);
  document.getElementById('sizeModalImg').src = product.sizes[0].image;
  document.getElementById('sizeModalImg').alt = productName(product);

  const optionsWrap = document.getElementById('sizeOptions');
  optionsWrap.innerHTML = '';
  product.sizes.forEach(size => {
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'size-option' + (size.id === state.pendingSizeSelection ? ' selected' : '');
    opt.innerHTML = `<span>${sizeLabel(size)}</span><span class="size-price">${formatPrice(size.price)}</span>`;
    opt.addEventListener('click', () => {
      state.pendingSizeSelection = size.id;
      document.getElementById('sizeModalImg').src = size.image;
      optionsWrap.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
    optionsWrap.appendChild(opt);
  });

  openModal('sizeModalOverlay');
}

function confirmSizeSelection(){
  if (!state.pendingSizeProduct || !state.pendingSizeSelection) return;
  addToCart(state.pendingSizeProduct.id, state.pendingSizeSelection, 1);
  closeModal('sizeModalOverlay');
  showToast(t('addedToast'));
}

/* ==========================================================================
   🛒 CART FUNCTIONS
   إدارة السلة
   ========================================================================== */
function addToCart(productId, sizeId, qty){
  const existing = state.cart.find(item => item.productId === productId && item.sizeId === sizeId);
  if (existing){
    existing.qty += qty;
  } else {
    state.cart.push({ productId, sizeId, qty: Math.max(1, qty) });
  }
  renderCart();
  bumpCartIcon();
}

function updateCartQty(productId, sizeId, delta){
  const item = state.cart.find(i => i.productId === productId && i.sizeId === sizeId);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1){
    state.cart = state.cart.filter(i => !(i.productId === productId && i.sizeId === sizeId));
  }
  renderCart();
}

function removeCartItem(productId, sizeId){
  state.cart = state.cart.filter(i => !(i.productId === productId && i.sizeId === sizeId));
  renderCart();
}

function findProduct(productId){
  return state.menuData.products.find(p => p.id === productId);
}
function findSize(product, sizeId){
  return product ? product.sizes.find(s => s.id === sizeId) : null;
}

function getCartLines(){
  return state.cart.map(item => {
    const product = findProduct(item.productId);
    const size = findSize(product, item.sizeId);
    if (!product || !size) return null;
    const unitPrice = Number(size.price) || 0;
    const qty = Math.max(1, Number(item.qty) || 1);
    return {
      product, size, qty,
      unitPrice,
      subtotal: Math.round((unitPrice * qty) * 100) / 100
    };
  }).filter(Boolean);
}

function getCartTotal(){
  return getCartLines().reduce((sum, line) => sum + line.subtotal, 0);
}

function renderCart(){
  const lines = getCartLines();
  const listEl = document.getElementById('cartList');
  const emptyEl = document.getElementById('cartEmpty');
  listEl.innerHTML = '';

  if (lines.length === 0){
    emptyEl.style.display = 'block';
  } else {
    emptyEl.style.display = 'none';
    lines.forEach(line => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${line.size.image}" alt="${productName(line.product)}">
        <div class="cart-item-info">
          <div class="cart-item-name">${productName(line.product)}</div>
          <div class="cart-item-size">${line.product.sizes.length > 1 ? sizeLabel(line.size) + ' · ' : ''}${formatPrice(line.unitPrice)}</div>
          <div class="cart-item-row">
            <div class="qty-control">
              <button class="qty-btn" data-action="dec" aria-label="decrease">−</button>
              <span>${line.qty}</span>
              <button class="qty-btn" data-action="inc" aria-label="increase">+</button>
            </div>
            <span class="cart-item-subtotal">${formatPrice(line.subtotal)}</span>
            <button class="remove-item-btn" data-action="remove" aria-label="remove">🗑</button>
          </div>
        </div>
      `;
      li.querySelector('[data-action="inc"]').addEventListener('click', () => updateCartQty(line.product.id, line.size.id, 1));
      li.querySelector('[data-action="dec"]').addEventListener('click', () => updateCartQty(line.product.id, line.size.id, -1));
      li.querySelector('[data-action="remove"]').addEventListener('click', () => removeCartItem(line.product.id, line.size.id));
      listEl.appendChild(li);
    });
  }

  const total = getCartTotal();
  document.getElementById('cartTotal').textContent = formatPrice(total);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = String(lines.reduce((s, l) => s + l.qty, 0));
}

function bumpCartIcon(){
  const countEl = document.getElementById('cartCount');
  countEl.classList.remove('bump');
  void countEl.offsetWidth; // restart animation
  countEl.classList.add('bump');
}

/* ==========================================================================
   📲 WHATSAPP FUNCTIONS
   إنشاء وإرسال الطلب
   ========================================================================== */
function buildWhatsappMessage(tableNumber){
  const lines = getCartLines();
  const total = getCartTotal();
  const sep = '━━━━━━━━━━━━━━';

  let msg = `🍔 Burger & Co. — New ${t('order')}\n\n`;
  msg += `🪑 ${t('table')}: ${tableNumber}\n\n`;
  msg += `📦 ${t('order')}:\n`;

  lines.forEach((line, i) => {
    const sizePart = line.product.sizes.length > 1 ? ` — ${sizeLabel(line.size)}` : '';
    msg += `${i + 1}. ${productName(line.product)}${sizePart} × ${line.qty}\n`;
    msg += `   ${line.unitPrice} EGP × ${line.qty} = ${line.subtotal} EGP\n\n`;
  });

  msg += `${sep}\n\n`;
  msg += `💰 ${t('total')}: ${total} EGP\n\n`;
  msg += `⏱️ ${t('prepTime')}\n\n`;
  msg += t('thankYou');
  return msg;
}

function handleSendOrder(){
  const errorEl = document.getElementById('cartError');
  errorEl.textContent = '';

  const lines = getCartLines();
  const tableInput = document.getElementById('tableNumberInput');
  const tableNumber = tableInput.value.trim();

  if (lines.length === 0){
    errorEl.textContent = t('emptyCartError');
    return;
  }
  if (!tableNumber){
    errorEl.textContent = t('tableRequiredError');
    return;
  }
  if (!state.cashierNumber || !/^\d{8,15}$/.test(state.cashierNumber)){
    errorEl.textContent = t('cashierMissingError');
    return;
  }

  const message = buildWhatsappMessage(tableNumber);
  const url = `https://wa.me/${state.cashierNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   🔐 ADMIN FUNCTIONS
   إدارة لوحة التحكم
   ========================================================================== */
function handleAdminLoginSubmit(){
  const pinInput = document.getElementById('adminPinInput');
  const errorEl = document.getElementById('adminLoginError');
  if (pinInput.value === ADMIN_PIN){
    state.adminLoggedIn = true;
    pinInput.value = '';
    errorEl.textContent = '';
    closeModal('adminLoginOverlay');
    openAdminDashboard();
  } else {
    errorEl.textContent = t('wrongPin');
  }
}

function openAdminDashboard(){
  populateSettingsForm();
  renderAdminProductList();
  renderAdminCategoryList();
  openModal('adminDashOverlay');
}

function switchAdminTab(tabName){
  document.querySelectorAll('.admin-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.getElementById('adminPanelProducts').classList.toggle('hidden', tabName !== 'products');
  document.getElementById('adminPanelCategories').classList.toggle('hidden', tabName !== 'categories');
  document.getElementById('adminPanelSettings').classList.toggle('hidden', tabName !== 'settings');
}

function renderAdminProductList(){
  const wrap = document.getElementById('adminProductList');
  wrap.innerHTML = '';
  state.menuData.products.forEach(product => {
    const cat = state.menuData.categories.find(c => c.id === product.categoryId);
    const row = document.createElement('div');
    row.className = 'admin-row' + (product.enabled ? '' : ' disabled');
    row.innerHTML = `
      <img src="${product.sizes[0].image}" alt="">
      <div class="admin-row-info">
        <div class="admin-row-name">${productName(product)}</div>
        <div class="admin-row-meta">${cat ? categoryName(cat) : ''} · ${getProductPriceInfo(product)}</div>
      </div>
      <div class="admin-row-actions">
        <button data-action="toggle" title="Enable/Disable">${product.enabled ? '👁' : '🚫'}</button>
        <button data-action="edit" title="Edit">✏️</button>
      </div>
    `;
    row.querySelector('[data-action="toggle"]').addEventListener('click', () => {
      product.enabled = !product.enabled;
      saveMenuData();
      renderAdminProductList();
      renderSlider();
    });
    row.querySelector('[data-action="edit"]').addEventListener('click', () => openProductEdit(product.id));
    wrap.appendChild(row);
  });
}

function renderAdminCategoryList(){
  const wrap = document.getElementById('adminCategoryList');
  wrap.innerHTML = '';
  state.menuData.categories.forEach(cat => {
    const row = document.createElement('div');
    row.className = 'admin-row';
    row.innerHTML = `
      <div class="admin-row-info" style="display:flex; gap:8px;">
        <input class="admin-cat-input" data-field="ar" value="${cat.nameAr}" placeholder="اسم عربي">
        <input class="admin-cat-input" data-field="en" value="${cat.nameEn}" placeholder="English name">
      </div>
      <div class="admin-row-actions">
        <button data-action="save" title="Save">💾</button>
        <button data-action="delete" title="Delete">🗑</button>
      </div>
    `;
    row.querySelector('[data-field="ar"]').addEventListener('change', e => { cat.nameAr = e.target.value; });
    row.querySelector('[data-field="en"]').addEventListener('change', e => { cat.nameEn = e.target.value; });
    row.querySelector('[data-action="save"]').addEventListener('click', () => {
      saveMenuData();
      applyLanguage();
      showToast(t('savedToast'));
    });
    row.querySelector('[data-action="delete"]').addEventListener('click', () => {
      const hasProducts = state.menuData.products.some(p => p.categoryId === cat.id);
      if (hasProducts){
        showToast(state.lang === 'ar' ? 'لا يمكن حذف تصنيف يحتوي منتجات' : 'Cannot delete a category with products');
        return;
      }
      state.menuData.categories = state.menuData.categories.filter(c => c.id !== cat.id);
      saveMenuData();
      renderAdminCategoryList();
      renderCategoryBar();
    });
    wrap.appendChild(row);
  });
}

function addNewCategory(){
  const name = prompt(t('newCategoryPlaceholder'));
  if (!name) return;
  state.menuData.categories.push({ id: uid('cat'), nameAr: name, nameEn: name });
  saveMenuData();
  renderAdminCategoryList();
  renderCategoryBar();
}

function openProductEdit(productId){
  state.editingProductId = productId;
  const categorySelect = document.getElementById('editCategory');
  categorySelect.innerHTML = state.menuData.categories.map(c => `<option value="${c.id}">${categoryName(c)}</option>`).join('');

  document.getElementById('productEditTitle').textContent = productId ? t('editProduct') : t('newProductTitle');
  document.getElementById('productEditDelete').style.display = productId ? 'block' : 'none';

  if (productId){
    const product = findProduct(productId);
    document.getElementById('editNameAr').value = product.nameAr;
    document.getElementById('editNameEn').value = product.nameEn;
    categorySelect.value = product.categoryId;
    document.getElementById('editImage').value = product.sizes[0].image;
    document.getElementById('editEnabled').checked = product.enabled;
    state.editingSizes = product.sizes.map(s => ({...s}));
  } else {
    document.getElementById('editNameAr').value = '';
    document.getElementById('editNameEn').value = '';
    document.getElementById('editImage').value = '';
    document.getElementById('editEnabled').checked = true;
    state.editingSizes = [{ id: uid('size'), labelAr: 'عادي', labelEn: 'Regular', price: 0, image: '' }];
  }
  renderEditSizesList();
  openModal('productEditOverlay');
}

function renderEditSizesList(){
  const wrap = document.getElementById('editSizesList');
  wrap.innerHTML = '';
  state.editingSizes.forEach((size, idx) => {
    const row = document.createElement('div');
    row.className = 'size-row';
    row.innerHTML = `
      <input type="text" data-field="labelAr" value="${size.labelAr}" placeholder="الحجم (عربي)">
      <input type="text" data-field="labelEn" value="${size.labelEn}" placeholder="Size (EN)">
      <input type="number" data-field="price" value="${size.price}" placeholder="EGP" min="0" step="0.5">
      <button type="button" data-action="removeSize">✕</button>
    `;
    row.querySelector('[data-field="labelAr"]').addEventListener('input', e => size.labelAr = e.target.value);
    row.querySelector('[data-field="labelEn"]').addEventListener('input', e => size.labelEn = e.target.value);
    row.querySelector('[data-field="price"]').addEventListener('input', e => size.price = Math.max(0, Number(e.target.value) || 0));
    row.querySelector('[data-action="removeSize"]').addEventListener('click', () => {
      if (state.editingSizes.length <= 1) return;
      state.editingSizes.splice(idx, 1);
      renderEditSizesList();
    });
    wrap.appendChild(row);
  });
}

function addEditSizeRow(){
  state.editingSizes.push({ id: uid('size'), labelAr: '', labelEn: '', price: 0, image: '' });
  renderEditSizesList();
}

function saveProductEdit(){
  const nameAr = document.getElementById('editNameAr').value.trim();
  const nameEn = document.getElementById('editNameEn').value.trim();
  const categoryId = document.getElementById('editCategory').value;
  const image = document.getElementById('editImage').value.trim();
  const enabled = document.getElementById('editEnabled').checked;

  if (!nameAr || !nameEn || state.editingSizes.length === 0) return;

  // تطبيق نفس رابط الصورة الرئيسي على أي حجم بدون صورة خاصة به
  const sizes = state.editingSizes.map(s => ({
    ...s,
    image: s.image || image || 'assets/images/burger-medium.jpg'
  }));

  if (state.editingProductId){
    const product = findProduct(state.editingProductId);
    Object.assign(product, { nameAr, nameEn, categoryId, enabled, sizes });
  } else {
    state.menuData.products.push({
      id: uid('prod'), nameAr, nameEn, categoryId, enabled, sizes
    });
  }

  saveMenuData();
  closeModal('productEditOverlay');
  renderAdminProductList();
  renderCategoryBar();
  renderSlider();
  showToast(t('savedToast'));
}

function deleteProductEdit(){
  if (!state.editingProductId) return;
  state.menuData.products = state.menuData.products.filter(p => p.id !== state.editingProductId);
  saveMenuData();
  closeModal('productEditOverlay');
  renderAdminProductList();
  renderSlider();
  showToast(t('deletedToast'));
}

function populateSettingsForm(){
  document.getElementById('cashierNumberInput').value = state.cashierNumber || '';
  document.getElementById('logoUrlInput').value = state.logoUrl || '';
}

function saveAdminSettings(){
  const cashier = document.getElementById('cashierNumberInput').value.trim();
  const logo = document.getElementById('logoUrlInput').value.trim();
  state.cashierNumber = cashier || DEFAULT_CASHIER_NUMBER;
  state.logoUrl = logo;
  localStorage.setItem(STORAGE_KEYS.cashier, state.cashierNumber);
  localStorage.setItem(STORAGE_KEYS.logo, state.logoUrl);

  if (logo){
    document.querySelector('.brand-flame').outerHTML = `<img src="${logo}" alt="logo" style="width:26px;height:26px;border-radius:50%;object-fit:cover;">`;
  }

  const confirmEl = document.getElementById('settingsSaveConfirm');
  confirmEl.textContent = t('settingsSaved');
  setTimeout(() => confirmEl.textContent = '', 2500);
}

function logoutAdmin(){
  state.adminLoggedIn = false;
  closeModal('adminDashOverlay');
}

/* ==========================================================================
   🪟 Modal helpers
   ========================================================================== */
function openModal(id){
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id){
  document.getElementById(id).classList.remove('open');
  const anyOpen = document.querySelectorAll('.modal-overlay.open, .cart-drawer.open').length > 0;
  if (!anyOpen) document.body.style.overflow = '';
}

function openCart(){
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ==========================================================================
   🪑 قراءة رقم الطاولة من الـ URL
   ========================================================================== */
function readTableFromUrl(){
  const params = new URLSearchParams(window.location.search);
  const table = params.get('table');
  if (table){
    document.getElementById('tableNumberInput').value = table;
  }
}

/* ==========================================================================
   🚀 التهيئة — Event Listeners + أول رسم للواجهة
   ========================================================================== */
function init(){
  // استرجاع البيانات المحفوظة
  state.menuData = loadMenuData();
  state.lang = localStorage.getItem(STORAGE_KEYS.lang) || 'ar';
  state.theme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  state.cashierNumber = localStorage.getItem(STORAGE_KEYS.cashier) || DEFAULT_CASHIER_NUMBER;
  state.logoUrl = localStorage.getItem(STORAGE_KEYS.logo) || '';
  state.activeCategoryId = state.menuData.categories[0] ? state.menuData.categories[0].id : null;

  applyTheme();
  applyLanguage();
  readTableFromUrl();

  if (state.logoUrl){
    document.querySelector('.brand-flame').outerHTML = `<img src="${state.logoUrl}" alt="logo" style="width:26px;height:26px;border-radius:50%;object-fit:cover;">`;
  }

  // Header controls
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('cartToggle').addEventListener('click', openCart);

  // Cart drawer
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('sendOrderBtn').addEventListener('click', handleSendOrder);

  // Slider controls
  document.getElementById('sliderNext').addEventListener('click', slideNext);
  document.getElementById('sliderPrev').addEventListener('click', slidePrev);

  // Size modal
  document.getElementById('sizeModalClose').addEventListener('click', () => closeModal('sizeModalOverlay'));
  document.getElementById('sizeModalOverlay').addEventListener('click', e => { if (e.target.id === 'sizeModalOverlay') closeModal('sizeModalOverlay'); });
  document.getElementById('sizeModalAdd').addEventListener('click', confirmSizeSelection);

  // Admin login
  document.getElementById('adminLockBtn').addEventListener('click', () => {
    if (state.adminLoggedIn) openAdminDashboard();
    else openModal('adminLoginOverlay');
  });
  document.getElementById('adminLoginClose').addEventListener('click', () => closeModal('adminLoginOverlay'));
  document.getElementById('adminLoginOverlay').addEventListener('click', e => { if (e.target.id === 'adminLoginOverlay') closeModal('adminLoginOverlay'); });
  document.getElementById('adminLoginSubmit').addEventListener('click', handleAdminLoginSubmit);
  document.getElementById('adminPinInput').addEventListener('keydown', e => { if (e.key === 'Enter') handleAdminLoginSubmit(); });

  // Admin dashboard
  document.getElementById('adminDashClose').addEventListener('click', () => closeModal('adminDashOverlay'));
  document.getElementById('adminLogoutBtn').addEventListener('click', logoutAdmin);
  document.querySelectorAll('.admin-tab').forEach(btn => btn.addEventListener('click', () => switchAdminTab(btn.dataset.tab)));
  document.getElementById('addProductBtn').addEventListener('click', () => openProductEdit(null));
  document.getElementById('addCategoryBtn').addEventListener('click', addNewCategory);
  document.getElementById('saveSettingsBtn').addEventListener('click', saveAdminSettings);

  // Product edit modal
  document.getElementById('productEditClose').addEventListener('click', () => closeModal('productEditOverlay'));
  document.getElementById('addSizeRowBtn').addEventListener('click', addEditSizeRow);
  document.getElementById('productEditSave').addEventListener('click', saveProductEdit);
  document.getElementById('productEditDelete').addEventListener('click', deleteProductEdit);

  // Keyboard: close top-most modal with Escape
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    ['productEditOverlay','adminDashOverlay','adminLoginOverlay','sizeModalOverlay'].forEach(id => {
      const el = document.getElementById(id);
      if (el.classList.contains('open')) closeModal(id);
    });
    if (document.getElementById('cartDrawer').classList.contains('open')) closeCart();
  });
}

document.addEventListener('DOMContentLoaded', init);
