// Dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or use user's system preference
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme or detect system preference
  if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
    updateDarkModeIcon(true);
  } else if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
    updateDarkModeIcon(false);
  } else {
    // If no saved preference, check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      updateDarkModeIcon(true);
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      updateDarkModeIcon(false);
    }
  }
  
  // Toggle dark/light mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
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
  setTimeout(() => {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }, 1);
}
