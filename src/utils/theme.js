/**
 * Sistema de gestión de temas unificado para el portfolio
 * Proporciona funciones para cambiar entre modo claro y oscuro
 * Versión mejorada para funcionar consistentemente en diferentes navegadores
 */

// Función para inicializar el tema basado en la preferencia guardada o del sistema
export function initTheme() {
  // Make toggleTheme available globally for inline onclick handlers
  window.toggleTheme = toggleTheme;
  
  // Aplicar tema inicial basado en localStorage o preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // Si no hay preferencia guardada, usar la preferencia del sistema
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Update icons based on current theme
  updateThemeIcons();
  
  // Añadir listener para cambios en la preferencia del sistema
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      // Solo cambiar automáticamente si el usuario no ha establecido una preferencia
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        updateThemeIcons();
      }
    });
  } catch (error) {
    console.error('Error al añadir listener para cambios en preferencia del sistema:', error);
  }
}

// Función para cambiar entre temas
export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  
  if (isDark) {
    // Switch to light theme
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark theme
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  
  // Update icons based on new theme state
  updateThemeIcons();
  
  // Add smooth transition
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

// Función para actualizar los iconos del tema
export function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
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
