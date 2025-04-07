/**
 * Sistema de gestión de temas unificado para el portfolio
 * Proporciona funciones para cambiar entre modo claro y oscuro
 * Versión mejorada para funcionar consistentemente en diferentes navegadores
 */

// Función para inicializar el tema basado en la preferencia guardada o del sistema
export function initTheme() {
  // Obtener elementos del DOM
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  
  // Comprobar si hay una preferencia guardada
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema inicial
  if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
    updateThemeIcons(true);
  } else if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
    updateThemeIcons(false);
  } else {
    // Si no hay preferencia guardada, usar la preferencia del sistema
    if (prefersDark) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    updateThemeIcons(prefersDark);
  }
  
  // Añadir listener para el botón de cambio de tema
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleTheme);
  }
  
  // Añadir listener para cambios en la preferencia del sistema
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // Solo cambiar automáticamente si el usuario no ha establecido una preferencia
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          htmlElement.classList.add('dark');
        } else {
          htmlElement.classList.remove('dark');
        }
        updateThemeIcons(e.matches);
      }
    });
  } catch (error) {
    console.error('Error al añadir listener para cambios en preferencia del sistema:', error);
  }
}

// Función para cambiar entre temas
export function toggleTheme() {
  const htmlElement = document.documentElement;
  const isDark = htmlElement.classList.contains('dark');
  
  if (isDark) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.add('dark');
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
