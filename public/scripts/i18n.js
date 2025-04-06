// Translations object - Simplified version for demonstration
let translations = {};

// Function to load translations
async function loadTranslations(lang) {
  try {
    // Añadimos un parámetro de tiempo para evitar la caché
    const response = await fetch(`/i18n/${lang}.json?nocache=${Date.now()}`);
    if (!response.ok) {
      throw new Error(`Error al cargar traducciones: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error cargando traducciones:', error);
    return {};
  }
}

// Initialize translations
async function initTranslations() {
  // Get saved language or default to Spanish
  const currentLang = localStorage.getItem('language') || 'es';
  
  // Load translations for current language
  translations = await loadTranslations(currentLang) || {};
  
  // Apply translations
  applyTranslations();
  
  // Update language buttons
  updateLanguageButtons(currentLang);
}

// Apply translations to the page
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getNestedTranslation(key);
    
    if (translation) {
      element.textContent = translation;
    }
  });
}

// Get nested translation by dot notation
function getNestedTranslation(key) {
  const keys = key.split('.');
  let result = translations;
  
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      return null;
    }
  }
  
  // If the result is an object, we don't want to use it as a translation
  if (typeof result === 'object') {
    return null;
  }
  
  return result;
}

// Update language buttons to show active language
function updateLanguageButtons(currentLang) {
  document.querySelectorAll('.language-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    
    if (btnLang === currentLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-current', 'false');
    }
  });
}

// Change language
async function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  translations = await loadTranslations(lang) || {};
  applyTranslations();
  updateLanguageButtons(lang);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTranslations();
  
  // Add click event to language buttons
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lang = btn.getAttribute('data-lang');
      await changeLanguage(lang);
    });
  });

  // Add click event to navigation links to reapply translations
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      // Pequeño retraso para asegurar que las traducciones se apliquen después de cualquier cambio en el DOM
      setTimeout(() => {
        applyTranslations();
      }, 100);
    });
  });
});
