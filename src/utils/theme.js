/**
 * Sistema de gestión de temas mejorado para el portfolio
 * Proporciona funciones para cambiar entre modo claro y oscuro
 */

// Función para inicializar el tema basado en la preferencia guardada o del sistema
export function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema inicial
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcons(false);
  }
  
  // Añadir listener para el botón de cambio de tema
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleTheme);
  }
  
  // Añadir listener para cambios en la preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      // Solo cambiar automáticamente si el usuario no ha establecido una preferencia
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      updateThemeIcons(e.matches);
    }
  });
}

// Función para cambiar entre temas
export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  
  updateThemeIcons(!isDark);
  
  // Añadir una animación suave de transición
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

// Función para actualizar los iconos del tema
export function updateThemeIcons(isDark) {
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  
  if (moonIcon && sunIcon) {
    if (isDark) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}
