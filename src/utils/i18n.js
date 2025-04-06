/**
 * Sistema de internacionalización mejorado para el portfolio
 * Proporciona funciones para cargar y aplicar traducciones
 */

// Función para cargar traducciones
export async function loadTranslations(lang) {
  try {
    const response = await fetch(`/src/i18n/${lang}.json`);
    if (!response.ok) {
      console.error(`Error al cargar traducciones para ${lang}: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error al cargar traducciones para ${lang}:`, error);
    return null;
  }
}

// Función para aplicar traducciones a elementos con data-i18n
export function applyTranslations(translations) {
  if (!translations) return;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (!key) return;
    
    // Navegar por el objeto de traducciones usando la notación de puntos
    const value = key.split('.').reduce((obj, k) => obj && obj[k], translations);
    
    if (value) {
      element.textContent = value;
    }
  });
}

// Función para cambiar el idioma
export function changeLanguage(lang) {
  if (!['es', 'en', 'fr'].includes(lang)) {
    console.error(`Idioma no soportado: ${lang}`);
    return;
  }
  
  localStorage.setItem('language', lang);
  updateActiveLanguageButton(lang);
  
  loadTranslations(lang)
    .then(translations => {
      if (translations) {
        applyTranslations(translations);
      }
    });
}

// Función para actualizar los botones de idioma
export function updateActiveLanguageButton(lang) {
  const buttons = {
    es: document.getElementById('es-btn'),
    en: document.getElementById('en-btn'),
    fr: document.getElementById('fr-btn')
  };
  
  // Quitar clase activa de todos los botones
  Object.values(buttons).forEach(btn => {
    if (btn) {
      btn.classList.remove('bg-primary', 'text-white');
      btn.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
    }
  });
  
  // Añadir clase activa al botón del idioma actual
  const activeBtn = buttons[lang];
  if (activeBtn) {
    activeBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
    activeBtn.classList.add('bg-primary', 'text-white');
  }
}

// Función para inicializar el sistema de traducciones
export function initI18n() {
  const currentLang = localStorage.getItem('language') || 'es';
  
  // Inicializar botones de idioma
  document.getElementById('es-btn')?.addEventListener('click', () => changeLanguage('es'));
  document.getElementById('en-btn')?.addEventListener('click', () => changeLanguage('en'));
  document.getElementById('fr-btn')?.addEventListener('click', () => changeLanguage('fr'));
  
  // Aplicar traducciones iniciales
  changeLanguage(currentLang);
  
  return currentLang;
}
