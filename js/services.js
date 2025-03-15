document.addEventListener('DOMContentLoaded', () => {
  const scheduleButtons = document.querySelectorAll('.schedule-btn');
  const modal = document.getElementById('scheduleModal');
  const closeBtn = document.querySelector('.close-btn');
  const scheduleForm = document.getElementById('scheduleForm');

  scheduleButtons.forEach(button => {
      button.addEventListener('click', () => {
          const serviceType = button.getAttribute('data-service');
          const serviceSelect = document.getElementById('serviceType');
          
          serviceSelect.value = serviceType;
          
          modal.style.display = 'block';
      });
  });

  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.style.display = 'none';
      }
  });

  scheduleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = scheduleForm.querySelector('input[placeholder="Nombre Completo"]').value;
      const email = scheduleForm.querySelector('input[placeholder="Correo Electrónico"]').value;
      const phone = scheduleForm.querySelector('input[placeholder="Teléfono"]').value;
      const serviceType = document.getElementById('serviceType').value;
      const eventDate = scheduleForm.querySelector('input[type="date"]').value;
      const additionalDetails = scheduleForm.querySelector('textarea').value;


      console.log({
          name,
          email,
          phone,
          serviceType,
          eventDate,
          additionalDetails
      });

      alert('Solicitud de servicio enviada. Nos pondremos en contacto pronto.');

      modal.style.display = 'none';

      scheduleForm.reset();
  });
});