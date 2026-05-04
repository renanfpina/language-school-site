/* ============================================================
   LingoUp Academy — Internationalization (i18n)
   Supported locales: en-us · pt-br · zh-cn
   System: data-i18n (text) and data-i18n-attr (attributes)
   ============================================================ */

'use strict';

const I18N_STORAGE_KEY = 'lingoup-lang';
const I18N_DEFAULT     = 'en-us';

/* ----------------------------------------------------------
   loadTranslations — fetch JSON file for a given locale
   ---------------------------------------------------------- */
async function loadTranslations(lang) {
  try {
    const res = await fetch(`assets/i18n/${lang}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`i18n: could not load locale "${lang}"`, err);
    return {};
  }
}

/* ----------------------------------------------------------
   getNestedValue — resolve a dot-separated key from an object
   e.g. "nav.home" → obj.nav.home
   ---------------------------------------------------------- */
function getNestedValue(obj, key) {
  return key.split('.').reduce(
    (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
    obj
  );
}

/* ----------------------------------------------------------
   applyTranslations — inject translations into the DOM
   ---------------------------------------------------------- */
function applyTranslations(translations) {
  // Text content:  <span data-i18n="nav.home">Home</span>
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = getNestedValue(translations, el.dataset.i18n);
    if (value !== undefined) el.textContent = value;
  });

  // HTML attributes:  data-i18n-attr="aria-label:nav.open_menu,placeholder:form.name_ph"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(',').forEach(pair => {
      const [attr, key] = pair.trim().split(':');
      const value = getNestedValue(translations, key);
      if (value !== undefined) el.setAttribute(attr, value);
    });
  });

  // Sync the html[lang] attribute
  const localeLangMap = { 'en-us': 'en', 'pt-br': 'pt-BR', 'zh-cn': 'zh-CN' };
  const activeLang = localStorage.getItem(I18N_STORAGE_KEY) || I18N_DEFAULT;
  document.documentElement.lang = localeLangMap[activeLang] || 'en';
}

/* ----------------------------------------------------------
   setLanguage — load, apply and persist a locale
   ---------------------------------------------------------- */
async function setLanguage(lang) {
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  localStorage.setItem(I18N_STORAGE_KEY, lang);

  // Update active state on all language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

/* ----------------------------------------------------------
   initI18n — attach button listeners and load saved locale
   Called by main.js after partials are injected.
   ---------------------------------------------------------- */
function initI18n() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  const savedLang = localStorage.getItem(I18N_STORAGE_KEY) || I18N_DEFAULT;
  setLanguage(savedLang);
}
