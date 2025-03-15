document.addEventListener("DOMContentLoaded", () => {
  function initHeader() {
    const menuToggle = document.getElementById("menuToggle");
    const navList = document.getElementById("navList");

    if (menuToggle && navList) {
      console.log("Header inicializado correctamente");

      menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        navList.classList.toggle("active");
        console.log(
          "Menú toggle: " +
            (navList.classList.contains("active") ? "abierto" : "cerrado")
        );
      });

      document.addEventListener("click", (event) => {
        if (
          !navList.contains(event.target) &&
          !menuToggle.contains(event.target) &&
          navList.classList.contains("active")
        ) {
          navList.classList.remove("active");
          console.log("Menú cerrado por clic externo");
        }
      });

      const currentPath = window.location.pathname;
      console.log("Ruta actual: " + currentPath);

      const links = navList.querySelectorAll("a");
      links.forEach((link) => {
        link.classList.remove("active");

        const linkPath = link.getAttribute("href");

        if (linkPath === currentPath) {
          link.classList.add("active");
          console.log("Enlace activo (coincidencia exacta): " + linkPath);
        }
        else if (
          currentPath.includes("/pages/") &&
          linkPath.includes(currentPath.split("/").pop())
        ) {
          link.classList.add("active");
          console.log("Enlace activo (página interna): " + linkPath);
        }
        // Caso especial para la página de inicio
        else if (
          (currentPath === "/" || currentPath === "/index.html") &&
          (linkPath === "/index.html" || linkPath === "/")
        ) {
          link.classList.add("active");
          console.log("Enlace activo (página de inicio): " + linkPath);
        }
      });

      // Cargar el contador del carrito desde localStorage
      const cartCount = document.getElementById("cartCount");
      if (cartCount) {
        try {
          const itemsInCart = localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems")).length
            : 0;
          cartCount.textContent = itemsInCart;
          console.log("Contador de carrito actualizado: " + itemsInCart);
        } catch (error) {
          console.error("Error al cargar el contador del carrito:", error);
          cartCount.textContent = "0";
        }
      }
    } else {
      console.error("No se encontraron elementos del menú");
    }
  }

  if (document.querySelector("header")) {
    console.log("Header ya está en el DOM, inicializando...");
    initHeader();
  } else {
    console.log("Header aún no está en el DOM, configurando observador...");

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector("header")) {
        console.log("Header detectado en el DOM");
        observer.disconnect();
        initHeader();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      if (document.querySelector("header")) {
        console.log("Header encontrado en verificación de respaldo");
        if (!document.querySelector(".nav-list.active")) {
          initHeader();
        }
      }
    }, 1000);
  }
});
