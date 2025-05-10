/**
 * My Delights - Header Component
 * Script para gestionar la funcionalidad del menú, especialmente en dispositivos móviles
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Iniciando header");

  function initHeader() {
    const menuToggle = document.getElementById("menuToggle");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const navList = document.getElementById("navList");
    const menuOverlay = document.getElementById("menuOverlay");

    // Verifica si los elementos existen
    if (!menuToggle || !navList || !menuOverlay) {
      console.error("Error: Elementos del menú no encontrados", {
        menuToggle: !!menuToggle,
        navList: !!navList,
        menuOverlay: !!menuOverlay,
      });
      return;
    }

    console.log("Elementos del header encontrados correctamente");

    // Registrar el estado inicial
    let menuState = {
      isOpen: false,
      viewportWidth: window.innerWidth,
      isMobile: window.innerWidth <= 992,
    };

    console.log("Estado inicial del menú", menuState);

    // Función para abrir el menú
    function openMenu() {
      navList.classList.add("active");
      menuToggle.classList.add("active");
      menuOverlay.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // Previene el scroll de la página

      menuState.isOpen = true;
      console.log("Menú abierto");
    }

    // Función para cerrar el menú
    function closeMenu() {
      navList.classList.remove("active");
      menuToggle.classList.remove("active");
      menuOverlay.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = ""; // Restaura el scroll

      menuState.isOpen = false;
      console.log("Menú cerrado");
    }

    // Event listener para el botón de menú
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("Click en menú", {
        estado: menuState.isOpen ? "abierto" : "cerrado",
      });

      menuState.isOpen ? closeMenu() : openMenu();
    });

    // Event listener para el botón de cierre (X)
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Click en botón de cierre");
        closeMenu();
      });
    } else {
      console.warn("Botón de cierre no encontrado");
    }

    // Event listener para el overlay
    menuOverlay.addEventListener("click", () => {
      console.log("Click en overlay");
      closeMenu();
    });

    // Event listener para clics fuera del menú
    document.addEventListener("click", (event) => {
      if (
        menuState.isOpen &&
        !navList.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        console.log("Click fuera del menú");
        closeMenu();
      }
    });

    // Cerrar el menú con la tecla ESC
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuState.isOpen) {
        console.log("Tecla ESC presionada");
        closeMenu();
      }
    });

    // Gestionar cambios de tamaño de ventana
    window.addEventListener("resize", () => {
      const newWidth = window.innerWidth;
      const wasMobile = menuState.isMobile;
      const isMobileNow = newWidth <= 992;

      menuState.viewportWidth = newWidth;
      menuState.isMobile = isMobileNow;

      // Si cambia de móvil a desktop, restaurar estado
      if (wasMobile && !isMobileNow && menuState.isOpen) {
        console.log("Cambio a desktop", {
          ancho: newWidth,
        });
        closeMenu();
      }
    });

    // Detectar la página actual y marcar el enlace correspondiente
    const currentPath = window.location.pathname;
    console.log("Ruta actual", { path: currentPath });

    const links = navList.querySelectorAll("a");
    links.forEach((link) => {
      link.classList.remove("active");
      const linkPath = link.getAttribute("href");

      // Lógica para determinar el enlace activo
      let isActive = false;

      if (linkPath === currentPath) {
        isActive = true;
        console.log("Enlace activo (coincidencia exacta)", { link: linkPath });
      } else if (
        currentPath.includes("/pages/") &&
        linkPath.includes(currentPath.split("/").pop())
      ) {
        isActive = true;
        console.log("Enlace activo (página interna)", { link: linkPath });
      } else if (
        (currentPath === "/" || currentPath === "/index.php") &&
        (linkPath === "/index.php" || linkPath === "/")
      ) {
        isActive = true;
        console.log("Enlace activo (página de inicio)", { link: linkPath });
      }

      if (isActive) {
        link.classList.add("active");
        console.log("Enlace activo", { ruta: linkPath });
      }
    });

    // Actualizar contador del carrito
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
      try {
        const itemsInCart = localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems")).length
          : 0;
        cartCount.textContent = itemsInCart;
        console.log("Carrito actualizado", { items: itemsInCart });
      } catch (error) {
        console.error("Error en carrito", { error });
        cartCount.textContent = "0";
      }
    }
  }

  // Verificar si el header ya está en el DOM
  if (document.querySelector("header")) {
    console.log("Header encontrado");
    initHeader();
  } else {
    console.log("Header aún no está en el DOM, configurando observador");

    // Usar MutationObserver para detectar cuando se añade el header
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector("header")) {
        console.log("Header detectado");
        observer.disconnect();
        initHeader();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Backup en caso de que el observer falle
    setTimeout(() => {
      if (
        document.querySelector("header") &&
        !document.querySelector(".nav-list.active")
      ) {
        console.log("Header encontrado (backup)");
        initHeader();
      }
    }, 1000);
  }
});
