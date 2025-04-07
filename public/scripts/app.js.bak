// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Inicializar el modo oscuro
  initDarkMode();
  
  // Inicializar el selector de idioma
  initLanguageSwitcher();
  
  // Inicializar el menú móvil
  initMobileMenu();
});

// Función para inicializar el modo oscuro
function initDarkMode() {
  console.log('Initializing dark mode');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  
  if (!darkModeToggle || !moonIcon || !sunIcon) {
    console.error('Dark mode elements not found');
    return;
  }
  
  // Actualizar el icono según el tema actual
  updateDarkModeIcon();
  
  // Añadir evento de clic al botón
  darkModeToggle.addEventListener('click', function() {
    console.log('Dark mode toggle clicked');
    const htmlElement = document.documentElement;
    
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    
    updateDarkModeIcon();
  });
  
  // Función para actualizar el icono
  function updateDarkModeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    console.log('Is dark mode:', isDark);
    
    if (isDark) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

// Función para inicializar el selector de idioma
function initLanguageSwitcher() {
  console.log('Initializing language switcher');
  
  // Traducciones
  const translations = {
    es: {
      "nav.about": "Sobre mí",
      "nav.education": "Educación",
      "nav.experience": "Experiencia",
      "nav.skills": "Habilidades",
      "nav.courses": "Cursos",
      "nav.furtherInfo": "Información",
      "experience.title": "Experiencia",
      "experience.responsibilities": "Responsabilidades",
      "experience.projects": "Proyectos",
      "experience.achievements": "Logros"
    },
    en: {
      "nav.about": "About me",
      "nav.education": "Education",
      "nav.experience": "Experience",
      "nav.skills": "Skills",
      "nav.courses": "Courses",
      "nav.furtherInfo": "Information",
      "experience.title": "Experience",
      "experience.responsibilities": "Responsibilities",
      "experience.projects": "Projects",
      "experience.achievements": "Achievements"
    },
    fr: {
      "nav.about": "À propos",
      "nav.education": "Éducation",
      "nav.experience": "Expérience",
      "nav.skills": "Compétences",
      "nav.courses": "Cours",
      "nav.furtherInfo": "Information",
      "experience.title": "Expérience",
      "experience.responsibilities": "Responsabilités",
      "experience.projects": "Projets",
      "experience.achievements": "Réalisations"
    }
  };
  
  // Obtener botones de idioma
  const esBtn = document.getElementById('es-btn');
  const enBtn = document.getElementById('en-btn');
  const frBtn = document.getElementById('fr-btn');
  
  if (!esBtn || !enBtn || !frBtn) {
    console.error('Language buttons not found');
    return;
  }
  
  // Obtener idioma actual o establecer español como predeterminado
  let currentLang = localStorage.getItem('language') || 'es';
  console.log('Current language:', currentLang);
  
  // Aplicar traducciones iniciales
  applyTranslations(currentLang);
  updateLanguageButtons(currentLang);
  
  // Añadir eventos de clic a los botones
  esBtn.addEventListener('click', function() {
    console.log('Spanish button clicked');
    setLanguage('es');
  });
  
  enBtn.addEventListener('click', function() {
    console.log('English button clicked');
    setLanguage('en');
  });
  
  frBtn.addEventListener('click', function() {
    console.log('French button clicked');
    setLanguage('fr');
  });
  
  // Función para establecer el idioma
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    applyTranslations(lang);
    updateLanguageButtons(lang);
  }
  
  // Función para aplicar traducciones
  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function(element) {
      const key = element.getAttribute('data-i18n');
      const translation = translations[lang][key];
      
      if (translation) {
        element.textContent = translation;
      }
    });
  }
  
  // Función para actualizar los botones de idioma
  function updateLanguageButtons(lang) {
    // Quitar clase activa de todos los botones
    [esBtn, enBtn, frBtn].forEach(function(btn) {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
    });
    
    // Añadir clase activa al botón del idioma actual
    let activeBtn;
    if (lang === 'es') activeBtn = esBtn;
    else if (lang === 'en') activeBtn = enBtn;
    else if (lang === 'fr') activeBtn = frBtn;
    
    if (activeBtn) {
      activeBtn.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-gray-200');
      activeBtn.classList.add('bg-blue-500', 'text-white');
    }
  }
}

// Función para inicializar el menú móvil
function initMobileMenu() {
  console.log('Initializing mobile menu');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileMenuBtn || !mobileMenu) {
    console.error('Mobile menu elements not found');
    return;
  }
  
  mobileMenuBtn.addEventListener('click', function() {
    console.log('Mobile menu button clicked');
    mobileMenu.classList.toggle('hidden');
  });
  
  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  });
}
