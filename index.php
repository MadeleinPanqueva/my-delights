<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Delights - Restaurante de Comida Gourmet</title>
  <meta name="description"
    content="My Delights ofrece la mejor experiencia culinaria con platos gourmet y comida corriente de alta calidad. Realiza tu pedido online." />
  <link rel="stylesheet" href="./css/normalize.css" />
  <link rel="stylesheet" href="./css/main.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
</head>

<body>
  <header id="header-container"></header>

  <main>
    <!-- Hero -->
    <section class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <h2>Descubre el placer de la buena comida</h2>
          <p>
            En My Delights te ofrecemos la mejor experiencia gastronómica con
            ingredientes frescos y de calidad
          </p>
          <div class="cta-buttons">
            <a href="pages/menu-carta.php" class="btn btn-primary">Ver Menú</a>
            <a href="#promociones" class="btn btn-secondary">Promociones</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="categories section-padding" aria-labelledby="categorias-title">
      <div class="container">
        <h2 class="section-title" id="categorias-title">Nuestras especialidades</h2>
        <div class="category-grid">
          <div class="category-card">
            <img src="images/categorias/categoria1.jpg" alt="Plato gourmet con presentación elegante" loading="lazy" />
            <h3>Platos Gourmet</h3>
            <p>Descubre nuestra selección de platos preparados por chefs expertos.</p>
            <a href="pages/menu-carta.php" class="btn btn-sm">Ver más</a>
          </div>
          <div class="category-card">
            <img src="images/categorias/categoria2.jpg" alt="Comida corriente servida en plato tradicional" loading="lazy" />
            <h3>Comida Corriente</h3>
            <p>Deliciosa comida casera con el toque especial de My Delights.</p>
            <a href="pages/menu-corriente.php" class="btn btn-sm">Ver más</a>
          </div>
          <div class="category-card">
            <img src="images/categorias/categoria3.jpg" alt="Montaje elegante para eventos" loading="lazy" />
            <h3>Eventos</h3>
            <p>Hacemos de tu evento una experiencia gastronómica inolvidable.</p>
            <a href="pages/servicios.php" class="btn btn-sm">Ver más</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Promociones -->
    <section id="promociones" class="promotions section-padding" aria-labelledby="promociones-title">
      <div class="container">
        <h2 class="section-title" id="promociones-title">Promociones Especiales</h2>
        <div class="promotion-grid">
          <div class="promotion-card">
            <div class="discount-badge">-20%</div>
            <img src="images/banners/promo1.jpg" alt="Combo familiar con descuento" loading="lazy" />
            <div class="promotion-content">
              <h3>Pack Familiar</h3>
              <p>Disfruta de nuestro menú familiar con 20% de descuento. Válido de lunes a jueves.</p>
              <a href="#" class="btn btn-sm btn-promo" data-promo-code="FAMILIA20">Obtener código</a>
            </div>
          </div>
          <div class="promotion-card">
            <div class="discount-badge">2x1</div>
            <img src="images/banners/promo2.jpg" alt="Postres en promoción 2x1" loading="lazy" />
            <div class="promotion-content">
              <h3>Martes de 2x1</h3>
              <p>Todos los martes disfruta de nuestros postres con promoción 2x1. ¡No te lo pierdas!</p>
              <a href="#" class="btn btn-sm btn-promo" data-promo-code="MARTES2X1">Obtener código</a>
            </div>
          </div>
          <div class="promotion-card">
            <div class="discount-badge">NUEVO</div>
            <img src="images/banners/promo3.jpg" alt="Menú ejecutivo para almuerzos de negocios" loading="lazy" />
            <div class="promotion-content">
              <h3>Menú Ejecutivo</h3>
              <p>Prueba nuestro nuevo menú ejecutivo. Perfecto para tus almuerzos de negocios.</p>
              <a href="pages/menu-corriente.php" class="btn btn-sm">Ver menú</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="testimonials section-padding" aria-labelledby="testimonios-title">
      <div class="container">
        <h2 class="section-title" id="testimonios-title">Lo que dicen nuestros clientes</h2>
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <div class="rating" aria-label="5 estrellas">
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
            </div>
            <p>"La mejor experiencia gastronómica que he tenido. Los platos son deliciosos y el servicio es excepcional."</p>
            <div class="client-info">
              <h4>Ana Martínez</h4>
              <span>Cliente habitual</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="rating" aria-label="4.5 estrellas">
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star-half-alt" aria-hidden="true"></i>
            </div>
            <p>"Contratamos el servicio de catering para nuestro evento empresarial y quedamos encantados."</p>
            <div class="client-info">
              <h4>Carlos Rodríguez</h4>
              <span>Gerente de Eventos</span>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="rating" aria-label="5 estrellas">
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
              <i class="fas fa-star" aria-hidden="true"></i>
            </div>
            <p>"El menú ejecutivo es perfecto para mis almuerzos de trabajo. Excelente relación calidad-precio."</p>
            <div class="client-info">
              <h4>Laura Sánchez</h4>
              <span>Ejecutiva de Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter section-padding" aria-labelledby="newsletter-title">
      <div class="container">
        <div class="newsletter-content">
          <h2 id="newsletter-title">¡No te pierdas nuestras novedades!</h2>
          <p>Suscríbete a nuestro boletín para recibir las últimas noticias, promociones y eventos especiales.</p>
          <form id="newsletterForm" class="newsletter-form" novalidate>
            <div class="form-group">
              <label for="emailNewsletter" class="sr-only">Correo electrónico</label>
              <input type="email" id="emailNewsletter" placeholder="Tu correo electrónico" required />
              <button type="submit" class="btn btn-primary">Suscribirme</button>
            </div>
            <div class="form-check">
              <input type="checkbox" id="termsNewsletter" required />
              <label for="termsNewsletter">Acepto recibir comunicaciones comerciales</label>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer id="footer-container"></footer>

  <!-- Modal Promoción -->
  <div class="modal" id="promoModal" role="dialog" aria-modal="true" aria-labelledby="promoCodeDisplay">
    <div class="modal-content">
      <button class="close-modal" aria-label="Cerrar modal">&times;</button>
      <h3>Tu código promocional</h3>
      <div class="promo-code-display" id="promoCodeDisplay"></div>
      <p>Utiliza este código durante tu compra para aplicar el descuento</p>
      <button class="btn btn-primary" id="copyPromoBtn">Copiar código</button>
    </div>
  </div>

  <script src="js/main.js" defer></script>

  <script defer>
    async function loadComponent(url, containerId) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error cargando ${url}: ${response.status}`);

        const html = await response.text();
        const container = document.getElementById(containerId);

        if (container) {
          container.innerHTML = html;
          const event = new CustomEvent("componentLoaded", {
            detail: { id: containerId, url }
          });
          document.dispatchEvent(event);
        } else {
          console.error(`Contenedor #${containerId} no encontrado`);
        }
      } catch (error) {
        console.error(`Error al cargar componente ${url}:`, error);
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      loadComponent("./components/header.php", "header-container").then(() => {
        if (!document.querySelector('script[src="./js/components/header.js"]')) {
          const headerScript = document.createElement("script");
          headerScript.src = "./js/components/header.js";
          document.body.appendChild(headerScript);
        }
      });

      if (document.getElementById("footer-container")) {
        loadComponent("./components/footer.php", "footer-container").then(() => {
          if (!document.querySelector('script[src="./js/components/footer.js"]')) {
            const footerScript = document.createElement("script");
            footerScript.src = "./js/components/footer.js";
            document.body.appendChild(footerScript);
          }
        });
      }
    });
  </script>
</body>

</html>
