<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Catering Gourmet y Eventos Premium | Gastronomía Exclusiva | My Delights</title>
  <meta name="description" content="Servicio exclusivo de catering gourmet para eventos corporativos, celebraciones especiales y reuniones ejecutivas. Propuestas gastronómicas de autor, menús personalizados y servicio de alta categoría." />
  <meta name="keywords" content="catering gourmet, eventos exclusivos, gastronomía de autor para eventos, banquetes corporativos premium, cocktail gourmet, fine dining catering, chef a domicilio, eventos gastronómicos, experiencias culinarias" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Catering Gourmet y Eventos Premium | My Delights" />
  <meta property="og:description" content="Experiencias gastronómicas exclusivas para eventos corporativos y celebraciones especiales. Propuestas culinarias de autor adaptadas a cada ocasión." />
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
    <meta itemprop="serviceType" content="Catering Gourmet y Eventos Premium" />
    <meta itemprop="provider" itemscope itemtype="https://schema.org/Restaurant">
    <meta itemprop="name" content="My Delights" />
    <section class="services-hero">
      <div class="container">
        <h1 itemprop="name">Catering Gourmet y Eventos Premium</h1>
        <p itemprop="description">
          Experiencias gastronómicas exclusivas para sus eventos corporativos y 
          celebraciones especiales, con propuestas culinarias de autor
        </p>
      </div>
    </section>

    <section class="services-container">
      <div class="service-grid">
        <div class="service-card" itemscope itemtype="https://schema.org/Service">
          <i class="fas fa-utensils"></i>
          <h2 itemprop="name">Banquetes Corporativos Premium</h2>
          <p itemprop="description">
            Servicio de catering gourmet para eventos empresariales, congresos y reuniones ejecutivas.
            Menús de alta cocina personalizados con servicio de excelencia.
          </p>
          <button class="btn schedule-btn" data-service="Banquetes Corporativos Premium" aria-label="Agendar servicio de Banquetes Corporativos Premium">
            Solicitar Propuesta
          </button>
        </div>

        <div class="service-card" itemscope itemtype="https://schema.org/Service">
          <i class="fas fa-home"></i>
          <h2 itemprop="name">Eventos Sociales Exclusivos</h2>
          <p itemprop="description">
            Celebraciones únicas con propuestas gastronómicas de autor. Bodas, aniversarios,
            cumpleaños y reuniones familiares con un toque sofisticado.
          </p>
          <button class="btn schedule-btn" data-service="Eventos Sociales Exclusivos" aria-label="Agendar servicio de Eventos Sociales Exclusivos">
            Solicitar Propuesta
          </button>
        </div>

        <div class="service-card" itemscope itemtype="https://schema.org/Service">
          <i class="fas fa-birthday-cake"></i>
          <h2 itemprop="name">Cocktail y Bufets Gourmet</h2>
          <p itemprop="description">
            Estaciones gastronómicas temáticas y bufets de alta cocina para todo tipo de
            celebraciones. Creaciones culinarias vanguardistas servidas con elegancia.
          </p>
          <button class="btn schedule-btn" data-service="Cocktail y Bufets Gourmet" aria-label="Agendar servicio de Cocktail y Bufets Gourmet">
            Solicitar Propuesta
          </button>
        </div>
      </div>
    </section>

    <div id="scheduleModal" class="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle">
      <div class="modal-content" role="document">
        <span class="close-btn" aria-label="Cerrar">&times;</span>
        <h2 id="modalTitle">Solicite una Propuesta Gastronómica</h2>
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
            <label for="serviceType">Tipo de Servicio Gourmet</label>
            <select id="serviceType" required aria-required="true">
              <option value="">Seleccionar Tipo de Servicio</option>
              <option value="Banquetes Corporativos Premium">
                Banquetes Corporativos Premium
              </option>
              <option value="Eventos Sociales Exclusivos">Eventos Sociales Exclusivos</option>
              <option value="Cocktail y Bufets Gourmet">Cocktail y Bufets Gourmet</option>
            </select>
          </div>
          <div class="form-group">
            <label for="eventDate">Fecha del Evento</label>
            <input type="date" id="eventDate" placeholder="Fecha del Evento" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="guests">Número de Invitados</label>
            <input type="number" id="guests" placeholder="Número aproximado de invitados" required aria-required="true" />
          </div>
          <div class="form-group">
            <label for="details">Detalles del evento y requerimientos especiales</label>
            <textarea id="details" placeholder="Describe brevemente el tipo de evento y cualquier requerimiento especial" rows="4"></textarea>
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