// Handle active navigation links based on scroll position
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function setActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      if (
        scrollPosition >= sectionTop - 100 && 
        scrollPosition < sectionTop + sectionHeight - 100
      ) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1); // Remove the # from href
      
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Set active link on page load
  setActiveLink();
  
  // Set active link on scroll
  window.addEventListener('scroll', setActiveLink);
});
