document.addEventListener('DOMContentLoaded', () => {
  const footerInterval = setInterval(() => {
    const footer = document.querySelector('.main-footer');
    
    if (footer) {
      clearInterval(footerInterval);
      console.log('Footer inicializado correctamente');
      
      const currentYear = new Date().getFullYear();
      const copyrightText = footer.querySelector('.footer-bottom p');
      
      if (copyrightText) {
        copyrightText.textContent = copyrightText.textContent.replace('2025', currentYear);
        console.log('Año del copyright actualizado a: ' + currentYear);
      }
      
      const socialLinks = footer.querySelectorAll('.social-media a');
      
      socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          if (link.getAttribute('href') === '#') {
            e.preventDefault();
            console.log('Clic en enlace de red social: ' + link.getAttribute('aria-label'));
          }
        });
      });
    } else {
      console.log('Esperando la carga del footer...');
    }
  }, 100);
});