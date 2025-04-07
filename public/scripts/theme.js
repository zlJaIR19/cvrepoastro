// Simple theme toggle functionality for the portfolio site

// Make functions available globally immediately
window.toggleTheme = function() {
  const isDark = document.documentElement.classList.contains('dark');
  window.setTheme(!isDark);
};

window.setTheme = function(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  
  // Update icons
  updateIcons(isDark);
};

// Function to update the theme icons
function updateIcons(isDark) {
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

// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark') {
    window.setTheme(true);
  } else if (savedTheme === 'light') {
    window.setTheme(false);
  } else {
    window.setTheme(prefersDark);
  }
  
  // Add listener for system preference changes
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        window.setTheme(e.matches);
      }
    });
  } catch (error) {
    console.error('Error setting up theme listener:', error);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme);

// Initialize immediately to prevent flash
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
