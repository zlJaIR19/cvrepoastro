// Language switcher functionality
document.addEventListener('DOMContentLoaded', () => {
  // Default language (Spanish)
  let currentLanguage = localStorage.getItem('language') || 'es';
  
  // Load translations
  let translations = {};
  
  // Function to fetch translations
  async function fetchTranslations(lang) {
    try {
      const response = await fetch(`../locales/${lang}.json`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
      return null;
    }
  }
  
  // Initialize language
  async function initLanguage() {
    // Load all translations
    const languages = ['es', 'en', 'fr'];
    for (const lang of languages) {
      translations[lang] = await fetchTranslations(lang);
    }
    
    // Apply current language
    applyLanguage(currentLanguage);
    
    // Update active language button
    updateLanguageButtons();
  }
  
  // Apply translations to the page
  function applyLanguage(lang) {
    if (!translations[lang]) {
      console.error(`Translations for ${lang} not loaded`);
      return;
    }
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const keys = element.getAttribute('data-i18n').split('.');
      let value = translations[lang];
      
      // Navigate through the nested keys
      for (const key of keys) {
        if (value && value[key]) {
          value = value[key];
        } else {
          value = null;
          break;
        }
      }
      
      if (value) {
        element.textContent = value;
      }
    });
    
    // Update language-specific attributes
    document.querySelectorAll('[data-i18n-key]').forEach(element => {
      const attrKey = element.getAttribute('data-i18n-key');
      const keys = attrKey.split('.');
      let value = translations[lang];
      
      for (const key of keys) {
        if (value && value[key]) {
          value = value[key];
        } else {
          value = null;
          break;
        }
      }
      
      if (value) {
        element.textContent = value;
      }
    });
    
    // Save language preference
    localStorage.setItem('language', lang);
    currentLanguage = lang;
  }
  
  // Update language buttons to show active language
  function updateLanguageButtons() {
    document.querySelectorAll('.language-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === currentLanguage) {
        btn.classList.add('bg-blue-500', 'text-white');
        btn.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
      } else {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
      }
    });
  }
  
  // Add click event to language buttons
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
      updateLanguageButtons();
    });
  });
  
  // Initialize
  initLanguage();
});
