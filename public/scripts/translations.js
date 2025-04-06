// Translations object
const translations = {
  es: {
    "nav": {
      "home": "Inicio",
      "about": "Sobre mí",
      "education": "Educación",
      "experience": "Experiencia",
      "skills": "Habilidades",
      "languages": "Idiomas",
      "courses": "Cursos",
      "furtherInfo": "Información",
      "contact": "Contacto"
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
      "home": "Home",
      "about": "About me",
      "education": "Education",
      "experience": "Experience",
      "skills": "Skills",
      "languages": "Languages",
      "courses": "Courses",
      "furtherInfo": "Information",
      "contact": "Contact"
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
      "home": "Accueil",
      "about": "À propos",
      "education": "Éducation",
      "experience": "Expérience",
      "skills": "Compétences",
      "languages": "Langues",
      "courses": "Cours",
      "furtherInfo": "Information",
      "contact": "Contact"
    },
    "experience": {
      "title": "Expérience",
      "responsibilities": "Responsabilités",
      "projects": "Projets",
      "achievements": "Réalisations"
    }
  }
};

// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
  // Default language (Spanish)
  let currentLanguage = localStorage.getItem('language') || 'es';
  
  // Apply translations to the page
  function applyLanguage(lang) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(function(element) {
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
    
    // Save language preference
    localStorage.setItem('language', lang);
    currentLanguage = lang;
  }
  
  // Update language buttons to show active language
  function updateLanguageButtons() {
    document.querySelectorAll('.language-btn').forEach(function(btn) {
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
  document.querySelectorAll('.language-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const lang = btn.getAttribute('data-lang');
      currentLanguage = lang;
      applyLanguage(lang);
      updateLanguageButtons();
    });
  });
  
  // Initialize
  applyLanguage(currentLanguage);
  updateLanguageButtons();
  
  // Log for debugging
  console.log("Translations initialized with language:", currentLanguage);
});

// Dark mode functionality
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  
  if (darkModeToggle) {
    // Check current theme
    const isDark = htmlElement.classList.contains('dark');
    updateDarkModeIcon(isDark);
    
    // Toggle dark/light mode
    darkModeToggle.addEventListener('click', function() {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateDarkModeIcon(false);
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateDarkModeIcon(true);
      }
    });
  }
  
  // Update icon based on current theme
  function updateDarkModeIcon(isDark) {
    if (!darkModeToggle) return;
    
    const moonIcon = darkModeToggle.querySelector('.moon-icon');
    const sunIcon = darkModeToggle.querySelector('.sun-icon');
    
    if (!moonIcon || !sunIcon) return;
    
    if (isDark) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
});

// Add this to ensure the script runs even if DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(function() {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }, 1);
}
