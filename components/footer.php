<footer class="main-footer">
  <link rel="stylesheet" href="../css/components/footer.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
  />
  <div class="container">
    <div class="footer-content">
      <div class="footer-info" itemscope itemtype="https://schema.org/Restaurant">
        <div class="footer-logo">
          <h2 itemprop="name">My Delights</h2>
        </div>
        <p itemprop="description">
          Ofrecemos la mejor experiencia gastronómica con ingredientes frescos y
          de alta calidad.
        </p>
        <div class="social-media">
          <a href="#" aria-label="Facebook de My Delights" rel="noopener" itemprop="sameAs"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a href="#" aria-label="Instagram de My Delights" rel="noopener" itemprop="sameAs"
            ><i class="fab fa-instagram"></i
          ></a>
          <a href="#" aria-label="Twitter de My Delights" rel="noopener" itemprop="sameAs"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="TikTok de My Delights" rel="noopener" itemprop="sameAs"><i class="fab fa-tiktok"></i></a>
        </div>
      </div>
      <nav class="footer-links" aria-label="Enlaces rápidos del sitio">
        <h3>Enlaces rápidos</h3>
        <ul>
          <li><a href="../index.php" title="Página de inicio">Inicio</a></li>
          <li><a href="../pages/menu-carta.php" title="Explore nuestro menú a la carta">Menú a la Carta</a></li>
          <li><a href="../pages/menu-corriente.php" title="Conoce nuestro menú corriente diario">Menú Corriente</a></li>
          <li><a href="../pages/servicios.php" title="Descubra nuestros servicios para eventos">Servicios</a></li>
        </ul>
      </nav>
      <div class="footer-contact" itemscope itemtype="https://schema.org/LocalBusiness">
        <h3>Contacto</h3>
        <address>
          <ul>
            <li itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
              <i class="fas fa-map-marker-alt"></i> <span itemprop="streetAddress">Av. Gastronómica #123</span>, <span itemprop="addressLocality">Ciudad</span>
            </li>
            <li>
              <i class="fas fa-phone"></i> <a href="tel:+1234567890" itemprop="telephone">+1 234 567 890</a>
            </li>
            <li>
              <i class="fas fa-envelope"></i> <a href="mailto:info@mydelights.com" itemprop="email">info@mydelights.com</a>
            </li>
            <li itemprop="openingHoursSpecification" itemscope itemtype="https://schema.org/OpeningHoursSpecification">
              <meta itemprop="dayOfWeek" content="Monday Tuesday Wednesday Thursday Friday Saturday Sunday">
              <i class="fas fa-clock"></i> <span itemprop="opens">11:00</span> - <span itemprop="closes">23:00</span>
            </li>
          </ul>
        </address>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="current-year">2025</span> My Delights. Todos los derechos reservados.</p>
      <div class="legal-links">
        <a href="#" title="Términos y condiciones de uso">Términos y condiciones</a>
        <a href="#" title="Política de privacidad del sitio">Política de privacidad</a>
      </div>
    </div>
  </div>
  <script>
    document.getElementById('current-year').textContent = new Date().getFullYear();
  </script>
</footer>
<script src="../js/components/footer.js"></script> 