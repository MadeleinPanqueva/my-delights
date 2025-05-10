<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Delights - Restaurante Gourmet de Alta Cocina | Delivery Premium</title>
  <meta name="description"
    content="My Delights ofrece la mejor experiencia culinaria en la ciudad con platos gourmet elaborados por chefs expertos. Gastronomía de autor y cocina de vanguardia con servicio a domicilio premium." />
  <meta name="keywords"
    content="restaurante gourmet, alta cocina, gastronomía de autor, menú degustación, cocina de vanguardia, platos gourmet, delivery premium, experiencia gastronómica, chef ejecutivo" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="My Delights - Restaurante Gourmet de Alta Cocina" />
  <meta property="og:description"
    content="Disfruta de la mejor experiencia gastronómica con ingredientes frescos seleccionados y técnicas culinarias de vanguardia. Delivery premium disponible." />
  <meta property="og:image" content="./images/banners/logo.png" />
  <meta property="og:url" content="https://mydelights.com" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://mydelights.com" />
  <link rel="stylesheet" href="./css/normalize.css" />
  <link rel="stylesheet" href="./css/main.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  <link rel="icon" href="./images/favicon.ico" type="image/x-icon" />
</head>

<body>
  <div id="header-container"></div>

  <main itemscope itemtype="https://schema.org/Restaurant">
    <meta itemprop="name" content="My Delights" />
    <meta itemprop="image" content="./images/banners/logo.png" />
    <meta itemprop="priceRange" content="$$-$$$" />
    <meta itemprop="servesCuisine" content="Gourmet, Alta Cocina, Contemporánea" />
    <section class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <h1 itemprop="slogan">Descubre el arte de la alta gastronomía</h1>
          <p itemprop="description">
            En My Delights te ofrecemos una experiencia culinaria excepcional con
            ingredientes frescos seleccionados y técnicas de vanguardia
          </p>
          <div class="cta-buttons">
            <a href="pages/menu-carta.php" class="btn btn-primary">Ver Menú Gourmet</a>
            <a href="#promociones" class="btn btn-secondary">Promociones Exclusivas</a>
          </div>
        </div>
      </div>
    </section>

    <section class="categories section-padding">
      <div class="container">
        <h2 class="section-title">Nuestras especialidades culinarias</h2>
        <div class="category-grid">
          <div class="category-card" itemprop="hasMenu" itemscope itemtype="https://schema.org/Menu">
            <img src="images/categorias/categoria1.jpg"
              alt="Alta Cocina Gourmet - Creaciones exclusivas de nuestro chef ejecutivo con técnicas de vanguardia"
              itemprop="image" loading="lazy" width="300" height="200" />
            <h3 itemprop="name">Alta Cocina Gourmet</h3>
            <p itemprop="description">
              Descubre nuestras creaciones exclusivas preparadas por chefs
              con técnicas de vanguardia y presentaciones artísticas.
            </p>
            <a href="pages/menu-carta.php" class="btn btn-sm">Explorar Menú</a>
          </div>
          <div class="category-card" itemprop="hasMenu" itemscope itemtype="https://schema.org/Menu">
            <img src="images/categorias/categoria2.jpg"
              alt="Gastronomía Ejecutiva - Menús gourmet diarios elaborados con ingredientes premium de temporada"
              itemprop="image" loading="lazy" width="300" height="200" />
            <h3 itemprop="name">Gastronomía Ejecutiva</h3>
            <p itemprop="description">
              Menús gourmet diarios elaborados con ingredientes premium de temporada y el toque distintivo de My
              Delights.
            </p>
            <a href="pages/menu-corriente.php" class="btn btn-sm">Explorar Menú</a>
          </div>
          <div class="category-card" itemscope itemtype="https://schema.org/Service">
            <img src="images/categorias/categoria3.jpg"
              alt="Catering Premium - Servicio gastronómico de lujo para eventos corporativos y celebraciones especiales"
              itemprop="image" loading="lazy" width="300" height="200" />
            <h3 itemprop="name">Catering Premium</h3>
            <p itemprop="description">
              Servicio gastronómico de lujo para eventos corporativos y celebraciones especiales con atención
              personalizada.
            </p>
            <a href="pages/servicios.php" class="btn btn-sm">Conocer Servicios</a>
          </div>
        </div>
      </div>
    </section>

    <section id="promociones" class="promotions section-padding">
      <div class="container">
        <h2 class="section-title">Promociones Especiales</h2>
        <div class="promotion-grid">
          <div class="promotion-card" itemscope itemtype="https://schema.org/Offer">
            <div class="discount-badge">-20%</div>
            <img src="images/banners/promo1.jpg" alt="Promoción Familiar - Pack con 20% de descuento" itemprop="image"
              loading="lazy" width="300" height="200" />
            <div class="promotion-content">
              <h3 itemprop="name">Pack Familiar</h3>
              <p itemprop="description">
                Disfruta de nuestro menú familiar con 20% de descuento. Válido
                de lunes a jueves.
              </p>
              <meta itemprop="discount" content="20%" />
              <a href="#" class="btn btn-sm btn-promo" data-promo-code="FAMILIA20">Obtener código</a>
            </div>
          </div>
          <div class="promotion-card" itemscope itemtype="https://schema.org/Offer">
            <div class="discount-badge">2x1</div>
            <img src="images/banners/promo2.jpg" alt="Promoción 2x1 en postres los martes" itemprop="image"
              loading="lazy" width="300" height="200" />
            <div class="promotion-content">
              <h3 itemprop="name">Martes de 2x1</h3>
              <p itemprop="description">
                Todos los martes disfruta de nuestros postres con promoción
                2x1. ¡No te lo pierdas!
              </p>
              <meta itemprop="offers" content="2x1" />
              <a href="#" class="btn btn-sm btn-promo" data-promo-code="MARTES2X1">Obtener código</a>
            </div>
          </div>
          <div class="promotion-card" itemscope itemtype="https://schema.org/Offer">
            <div class="discount-badge">NUEVO</div>
            <img src="images/banners/promo3.jpg" alt="Nuevo Menú Ejecutivo para almuerzos de negocios" itemprop="image"
              loading="lazy" width="300" height="200" />
            <div class="promotion-content">
              <h3 itemprop="name">Menú Ejecutivo</h3>
              <p itemprop="description">
                Prueba nuestro nuevo menú ejecutivo. Perfecto para tus
                almuerzos de negocios.
              </p>
              <a href="pages/menu-corriente.php" class="btn btn-sm">Ver menú</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials section-padding">
      <div class="container">
        <h2 class="section-title">Lo que dicen nuestros clientes</h2>
        <div class="testimonial-grid">
          <div class="testimonial-card" itemscope itemtype="https://schema.org/Review">
            <div class="rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
              <meta itemprop="ratingValue" content="5" />
              <meta itemprop="bestRating" content="5" />
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p itemprop="reviewBody">
              "La mejor experiencia gastronómica que he tenido. Los platos son
              deliciosos y el servicio es excepcional."
            </p>
            <div class="client-info">
              <h4 itemprop="author" itemscope itemtype="https://schema.org/Person">
                <span itemprop="name">Ana Martínez</span>
              </h4>
              <span>Cliente habitual</span>
            </div>
          </div>

          <div class="testimonial-card" itemscope itemtype="https://schema.org/Review">
            <div class="rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
              <meta itemprop="ratingValue" content="4.5" />
              <meta itemprop="bestRating" content="5" />
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
            </div>
            <p itemprop="reviewBody">
              "Contratamos el servicio de catering para nuestro evento
              empresarial y quedamos encantados. Comida deliciosa y
              presentación impecable."
            </p>
            <div class="client-info">
              <h4 itemprop="author" itemscope itemtype="https://schema.org/Person">
                <span itemprop="name">Carlos Rodríguez</span>
              </h4>
              <span>Gerente de Eventos</span>
            </div>
          </div>

          <div class="testimonial-card" itemscope itemtype="https://schema.org/Review">
            <div class="rating" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
              <meta itemprop="ratingValue" content="5" />
              <meta itemprop="bestRating" content="5" />
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p itemprop="reviewBody">
              "El menú ejecutivo es perfecto para mis almuerzos de trabajo.
              Excelente relación calidad-precio. ¡Lo recomiendo totalmente!"
            </p>
            <div class="client-info">
              <h4 itemprop="author" itemscope itemtype="https://schema.org/Person">
                <span itemprop="name">Laura Sánchez</span>
              </h4>
              <span>Ejecutiva de Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="newsletter section-padding">
      <div class="container">
        <div class="newsletter-content">
          <h2>¡No te pierdas nuestras novedades!</h2>
          <p>
            Suscríbete a nuestro boletín para recibir las últimas noticias,
            promociones y eventos especiales.
          </p>
          <form id="newsletterForm" class="newsletter-form">
            <div class="form-group">
              <label for="emailNewsletter" class="sr-only">Tu correo electrónico</label>
              <input type="email" id="emailNewsletter" placeholder="Tu correo electrónico" required
                aria-required="true" />
              <button type="submit" class="btn btn-primary">
                Suscribirme
              </button>
            </div>
            <div class="form-check">
              <input type="checkbox" id="termsNewsletter" required aria-required="true" />
              <label for="termsNewsletter">Acepto recibir comunicaciones comerciales</label>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <div id="footer-container"></div>

  <div class="modal" id="promoModal" aria-hidden="true" role="dialog">
    <div class="modal-content" role="document">
      <span class="close-modal" aria-label="Cerrar">&times;</span>
      <h3>Tu código promocional</h3>
      <div class="promo-code-display" id="promoCodeDisplay" aria-live="polite"></div>
      <p>Utiliza este código durante tu compra para aplicar el descuento</p>
      <button class="btn btn-primary" id="copyPromoBtn">Copiar código</button>
    </div>
  </div>

  <script src="js/main.js"></script>

  <script>
    async function loadComponent(url, containerId) {
      try {
        console.log(`Intentando cargar componente desde: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error cargando ${url}: ${response.status}`);
        }

        const html = await response.text();
        const container = document.getElementById(containerId);

        if (container) {
          container.innerHTML = html;
          console.log(`Componente ${url} cargado correctamente`);

          const event = new CustomEvent("componentLoaded", {
            detail: { id: containerId, url: url },
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
      console.log("DOM cargado, iniciando carga de componentes");

      loadComponent("./components/header.php", "header-container").then(() => {

        setTimeout(() => {
          const menuToggle = document.getElementById("menuToggle") || document.querySelector(".menu-toggle");
          const navList = document.getElementById("navList") || document.querySelector(".nav-list");
          const menuOverlay = document.getElementById("menuOverlay") || document.querySelector(".menu-overlay");

          console.log("Elementos encontrados después de timeout:", {
            menuToggle: menuToggle ? true : false,
            navList: navList ? true : false,
            menuOverlay: menuOverlay ? true : false
          });

          if (menuToggle && navList) {
            menuToggle.addEventListener("click", function (e) {
              e.preventDefault();

              navList.classList.toggle("active");
              menuToggle.classList.toggle("active");
              if (menuOverlay) menuOverlay.classList.toggle("active");

              if (navList.classList.contains("active")) {
                document.body.style.overflow = "hidden";
              } else {
                document.body.style.overflow = "";
              }
            });

            if (menuOverlay) {
              menuOverlay.addEventListener("click", function () {
                navList.classList.remove("active");
                menuToggle.classList.remove("active");
                menuOverlay.classList.remove("active");
                document.body.style.overflow = "";
              });
            }
          } else {
            console.error("No se encontraron los elementos del menú móvil");
          }
        }, 500);
      });

      if (document.getElementById("footer-container")) {
        loadComponent("./components/footer.php", "footer-container").then(
          () => {
            console.log("Footer cargado, verificando scripts...");

            if (
              !document.querySelector(
                'script[src="./js/components/footer.js"]'
              )
            ) {
              console.log("Cargando script del footer...");
              const footerScript = document.createElement("script");
              footerScript.src = "./js/components/footer.js";
              document.body.appendChild(footerScript);
            }
          }
        );
      }
    });
  </script>
</body>

</html>