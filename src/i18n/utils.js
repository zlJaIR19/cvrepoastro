import es from './es.json';
import en from './en.json';

// Objeto con todas las traducciones disponibles
const translations = { es, en };

// Función para obtener el idioma actual desde la URL o localStorage
export function getCurrentLanguage(url) {
  // Si estamos en el navegador, intentamos obtener el idioma de localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedLang = localStorage.getItem('language');
    if (savedLang && Object.keys(translations).includes(savedLang)) {
      return savedLang;
    }
  }
  
  // Si no hay idioma guardado o no estamos en el navegador, intentamos obtenerlo de la URL
  if (url) {
    const urlLang = url.pathname.split('/')[1];
    if (urlLang && Object.keys(translations).includes(urlLang)) {
      return urlLang;
    }
  }
  
  // Si no se encuentra en ningún lado, devolvemos el idioma por defecto
  return 'es';
}

// Función para obtener una traducción específica
export function getTranslation(lang, key) {
  const language = Object.keys(translations).includes(lang) ? lang : 'es';
  
  // Dividimos la clave por puntos para acceder a objetos anidados
  const keys = key.split('.');
  let translation = translations[language];
  
  // Recorremos el objeto de traducciones siguiendo la ruta de claves
  for (const k of keys) {
    if (translation && translation[k] !== undefined) {
      translation = translation[k];
    } else {
      // Si no encontramos la clave, devolvemos la clave original
      return key;
    }
  }
  
  // Si la traducción es un objeto, devolvemos la clave original
  if (typeof translation === 'object') {
    return key;
  }
  
  return translation;
}

// Función para obtener el objeto i18n con funciones de utilidad
export function getI18n(url) {
  const lang = getCurrentLanguage(url);
  
  return {
    lang,
    t: (key) => getTranslation(lang, key),
    isDefault: lang === 'es',
    changeLanguageUrl: (newLang) => {
      if (typeof window === 'undefined') return '#';
      
      const currentPath = window.location.pathname;
      const currentLang = getCurrentLanguage({ pathname: currentPath });
      
      // Si la URL actual ya tiene un idioma, lo reemplazamos
      if (Object.keys(translations).includes(currentLang)) {
        return currentPath.replace(`/${currentLang}`, `/${newLang}`);
      }
      
      // Si no tiene idioma, añadimos el nuevo al principio
      return `/${newLang}${currentPath}`;
    }
  };
}
