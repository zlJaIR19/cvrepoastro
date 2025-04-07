// Traducciones
const translations = {
  es: {
    "nav": {
      "about": "Sobre mí",
      "education": "Educación",
      "experience": "Experiencia",
      "skills": "Habilidades",
      "courses": "Cursos",
      "furtherInfo": "Información"
    },
    "experience": {
      "title": "Experiencia",
      "responsibilities": "Responsabilidades",
      "projects": "Proyectos",
      "achievements": "Logros"
    }
  },
  en: {
    "nav": {
      "about": "About me",
      "education": "Education",
      "experience": "Experience",
      "skills": "Skills",
      "courses": "Courses",
      "furtherInfo": "Information"
    },
    "experience": {
      "title": "Experience",
      "responsibilities": "Responsibilities",
      "projects": "Projects",
      "achievements": "Achievements"
    }
  },
  fr: {
    "nav": {
      "about": "À propos",
      "education": "Éducation",
      "experience": "Expérience",
      "skills": "Compétences",
      "courses": "Cours",
      "furtherInfo": "Information"
    },
    "experience": {
      "title": "Expérience",
      "responsibilities": "Responsabilités",
      "projects": "Projets",
      "achievements": "Réalisations"
    }
  }
};

// Función para inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  initLanguage();
  initMobileMenu();
});

// Inicializar modo oscuro
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  
  if (!darkModeToggle || !moonIcon || !sunIcon) return;
  
  // Actualizar icono basado en el tema actual
  updateDarkModeIcon();
  
  // Añadir evento de clic al botón de modo oscuro
  darkModeToggle.addEventListener('click', function() {
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
  
  // Función para actualizar el icono de modo oscuro
  function updateDarkModeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

// Inicializar idioma
function initLanguage() {
  const esBtn = document.getElementById('es-btn');
  const enBtn = document.getElementById('en-btn');
  const frBtn = document.getElementById('fr-btn');
  
  if (!esBtn || !enBtn || !frBtn) return;
  
  // Obtener idioma actual
  const currentLang = localStorage.getItem('language') || 'es';
  
  // Aplicar traducciones
  applyTranslations(currentLang);
  
  // Actualizar botones de idioma
  updateLanguageButtons(currentLang);
  
  // Añadir eventos de clic a los botones de idioma
  [esBtn, enBtn, frBtn].forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      localStorage.setItem('language', lang);
      
      // Aplicar traducciones
      applyTranslations(lang);
      
      // Actualizar botones
      updateLanguageButtons(lang);
    });
  });
  
  // Aplicar traducciones
  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const keys = key.split('.');
      
      let value = translations[lang];
      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }
      
      if (value) {
        element.textContent = value;
      }
    });
  }
  
  // Actualizar botones de idioma
  function updateLanguageButtons(lang) {
    // Quitar clase activa de todos los botones
    [esBtn, enBtn, frBtn].forEach(btn => {
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

// Inicializar menú móvil
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Cerrar menú móvil al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  });
}
