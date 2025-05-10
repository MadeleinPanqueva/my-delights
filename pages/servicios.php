<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Servicios de Catering y Eventos | My Delights Restaurante</title>
  <meta name="description" content="Contrata nuestros servicios de catering para eventos corporativos, familiares y celebraciones especiales. Menús personalizados y servicio de primera calidad." />
  <meta name="keywords" content="catering, eventos, banquetes corporativos, celebraciones, servicio de comida, bufetes, fiestas" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Servicios de Catering para Eventos | My Delights" />
  <meta property="og:description" content="Soluciones gastronómicas para todos tus eventos y momentos especiales. Catering corporativo y familiar." />
  <meta property="og:image" content="../images/categorias/categoria3.jpg" />
  <meta property="og:url" content="https://mydelights.com/pages/servicios.php" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://mydelights.com/pages/servicios.php" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
  <link rel="stylesheet" href="../css/servicios.css" />
  <link rel="stylesheet" href="../css/normalize.css" />
  <link rel="stylesheet" href="../css/main.css" />
  <link rel="icon" href="../images/favicon.ico" type="image/x-icon" />
</head>

<body>
  <div id="header-container"></div>

  <main class="services-page" itemscope itemtype="https://schema.org/Service">
    <meta itemprop="serviceType" content="Catering y Eventos" />
    <meta itemprop="provider" itemscope itemtype="https://schema.org/Restaurant">
    <meta itemprop="name" content="My Delights" />
    <section class="services-hero">
      <div class="container">
        <h1 itemprop="name">Nuestros Servicios</h1>
        <p itemprop="description">
          Soluciones gastronómicas para todos tus eventos y momentos
          especiales
        </p>
      </div>
    </section>

    <section class="services-container">
      <div class="service-grid">
        <div class="service-card" itemscope itemtype="https://schema.org/Service">
          <i class="fas fa-utensils"></i>
          <h2 itemprop="name">Banquetes Corporativos</h2>
          <p itemprop="description">
            Servicio de catering profesional para eventos empresariales. Menús
            personalizados y servicio de primera.
          </p>
          <button class="btn schedule-btn" data-service="Banquetes Corporativos" aria-label="Agendar servicio de Banquetes Corporativos">
            Agendar Servicio
          </button>
        </div>

        <div class="service-card" itemscope itemtype="https://schema.org/Service">
          <i class="fas fa-home"></i>
          <h2 itemprop="name">Eventos Familiares</h2>
          <p itemprop="description">
            Celebraciones únicas con menús adaptados a tus necesidades. Desde
            cumpleaños hasta reuniones familiares.
          </p>
          <button class="btn schedule-btn" data-service="Eventos Familiares" aria-label="Agendar servicio de Eventos Familiares">
            Agendar Servicio
          </button>
        </div>

        <div class="service-card" itemscope itemtype="https://schema.org/Service">
          <i class="fas fa-birthday-cake"></i>
          <h2 itemprop="name">Bufetes Especiales</h2>
          <p itemprop="description">
            Buffets temáticos y personalizados para todo tipo de
            celebraciones. Variedad gastronómica excepcional.
          </p>
          <button class="btn schedule-btn" data-service="Bufetes Especiales" aria-label="Agendar servicio de Bufetes Especiales">
            Agendar Servicio
          </button>
        </div>
      </div>
    </section>

    <div id="scheduleModal" class="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle">
      <div class="modal-content" role="document">
        <span class="close-btn" aria-label="Cerrar">&times;</span>
        <h2 id="modalTitle">Agendar Servicio</h2>
        <form id="scheduleForm">
          <div class="form-group">
            <label for="fullName">Nombre Completo</label>
            <input type="text" id="fullName" placeholder="Nombre Completo" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" placeholder="Correo Electrónico" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input type="tel" id="phone" placeholder="Teléfono" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="serviceType">Tipo de Servicio</label>
            <select id="serviceType" required aria-required="true">
              <option value="">Seleccionar Tipo de Servicio</option>
              <option value="Banquetes Corporativos">
                Banquetes Corporativos
              </option>
              <option value="Eventos Familiares">Eventos Familiares</option>
              <option value="Bufetes Especiales">Bufetes Especiales</option>
            </select>
          </div>
          <div class="form-group">
            <label for="eventDate">Fecha del Evento</label>
            <input type="date" id="eventDate" placeholder="Fecha del Evento" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="details">Detalles adicionales</label>
            <textarea id="details" placeholder="Detalles adicionales" rows="4"></textarea>
          </div>
          <button type="submit" class="btn">Enviar Solicitud</button>
        </form>
      </div>
    </div>
  </main>

  <div id="footer-container"></div>

  <script src="../js/services.js"></script>
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

      loadComponent("../components/header.php", "header-container").then(
        () => {
          console.log("Header cargado, verificando scripts...");

          if (
            !document.querySelector('script[src="../js/components/header.js"]')
          ) {
            console.log("Cargando script del header...");
            const headerScript = document.createElement("script");
            headerScript.src = "../js/components/header.js";
            document.body.appendChild(headerScript);
          }
        }
      );

      if (document.getElementById("footer-container")) {
        loadComponent("../components/footer.php", "footer-container").then(
          () => {
            console.log("Footer cargado, verificando scripts...");

            if (
              !document.querySelector(
                'script[src="../js/components/footer.js"]'
              )
            ) {
              console.log("Cargando script del footer...");
              const footerScript = document.createElement("script");
              footerScript.src = "../js/components/footer.js";
              document.body.appendChild(footerScript);
            }
          }
        );
      }
    });
  </script>
</body>

</html>