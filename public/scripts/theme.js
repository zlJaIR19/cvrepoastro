// Theme management for Tailwind CSS dark mode
// Uses Tailwind's class-based dark mode system with a slider toggle

// Make sure the script is loaded
console.log("Theme script loaded");

// Global theme toggler function - exposed to window
window.toggleTheme = function() {
  console.log("Toggle theme called");
  const isDark = document.documentElement.classList.contains('dark');
  console.log("Current dark mode state:", isDark);
  
  if (isDark) {
    // Switch to light mode
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    console.log("Switched to light mode");
    
    // Force update critical styles immediately
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#1f2937';
  } else {
    // Switch to dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    console.log("Switched to dark mode");
    
    // Force update critical styles immediately
    document.body.style.backgroundColor = '#111827';
    document.body.style.color = '#e5e7eb';
  }
  
  // Update toggle button text if it exists
  const lightTextElements = document.querySelectorAll('.dark\\:hidden');
  const darkTextElements = document.querySelectorAll('.hidden.dark\\:inline');
  
  if (lightTextElements.length > 0 && darkTextElements.length > 0) {
    if (isDark) {
      // Switching from dark to light
      lightTextElements.forEach(el => el.classList.remove('hidden'));
      darkTextElements.forEach(el => el.classList.add('hidden'));
    } else {
      // Switching from light to dark
      lightTextElements.forEach(el => el.classList.add('hidden'));
      darkTextElements.forEach(el => el.classList.remove('hidden'));
    }
  }
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, initializing theme");
  
  // Apply theme based on saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  console.log("Saved theme:", savedTheme, "System prefers dark:", prefersDark);
  
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  
  if (isDark) {
    document.documentElement.classList.add('dark');
    
    // Update toggle button state
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      const toggleDot = toggleBtn.querySelector('span:not(.sr-only)');
      if (toggleDot) {
        toggleDot.classList.add('translate-x-6');
        toggleDot.classList.remove('translate-x-1');
      }
    }
    
    // Update text display
    const lightTextElements = document.querySelectorAll('.dark\\:hidden');
    const darkTextElements = document.querySelectorAll('.hidden.dark\\:inline');
    
    if (lightTextElements.length > 0 && darkTextElements.length > 0) {
      lightTextElements.forEach(el => el.classList.add('hidden'));
      darkTextElements.forEach(el => el.classList.remove('hidden'));
    }
  } else {
    document.documentElement.classList.remove('dark');
    
    // Update toggle button state
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      const toggleDot = toggleBtn.querySelector('span:not(.sr-only)');
      if (toggleDot) {
        toggleDot.classList.remove('translate-x-6');
        toggleDot.classList.add('translate-x-1');
      }
    }
    
    // Update text display
    const lightTextElements = document.querySelectorAll('.dark\\:hidden');
    const darkTextElements = document.querySelectorAll('.hidden.dark\\:inline');
    
    if (lightTextElements.length > 0 && darkTextElements.length > 0) {
      lightTextElements.forEach(el => el.classList.remove('hidden'));
      darkTextElements.forEach(el => el.classList.add('hidden'));
    }
  }
  
  // Listen for system preference changes
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addEventListener('change', (e) => {
    // Only update if user hasn't explicitly set a preference
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
});

// Apply theme immediately to avoid flash
(function() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    
    // Add a style tag to immediately apply critical dark mode styles
    const style = document.createElement('style');
    style.textContent = `
      html.dark body { background-color: #111827 !important; color: #e5e7eb !important; }
      html.dark nav { background-color: #111827 !important; }
      html.dark .bg-white { background-color: #1f2937 !important; }
      html.dark .dark\\:hidden { display: none !important; }
      html.dark .hidden.dark\\:inline { display: inline !important; }
      html:not(.dark) .dark\\:hidden { display: inline !important; }
      html:not(.dark) .hidden.dark\\:inline { display: none !important; }
    `;
    document.head.appendChild(style);
  } else {
    document.documentElement.classList.remove('dark');
    
    // Add a style tag to immediately apply critical light mode styles
    const style = document.createElement('style');
    style.textContent = `
      html:not(.dark) body { background-color: #ffffff !important; color: #1f2937 !important; }
      html:not(.dark) nav { background-color: #ffffff !important; }
      html:not(.dark) .dark\\:hidden { display: inline !important; }
      html:not(.dark) .hidden.dark\\:inline { display: none !important; }
    `;
    document.head.appendChild(style);
  }
})();
