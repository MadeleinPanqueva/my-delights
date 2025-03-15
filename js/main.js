function getUserSession() {
  const sessionData = localStorage.getItem("userSession");
  
  if (!sessionData) return null;
  
  try {
    const session = JSON.parse(sessionData);
    
    if (session.sessionExpiry && new Date().getTime() > session.sessionExpiry) {
      localStorage.removeItem("userSession");
      return null;
    }
    
    return session;
  } catch (error) {
    console.error("Error al obtener la sesión del usuario:", error);
    return null;
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  return totalItems;
}

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += product.quantity || 1;
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1
    });
  }
  
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
  updateCartCount();
  
  document.dispatchEvent(new CustomEvent('cartUpdated', { 
    detail: { cartItems, product }
  }));
  
  return cartItems;
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

async function loadComponent(url, containerId) {
  try {
    console.log(`Cargando componente desde: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error cargando ${url}: ${response.status}`);
    }

    const html = await response.text();
    const container = document.getElementById(containerId);

    if (container) {
      container.style.margin = "0";
      container.style.padding = "0";
      container.style.display = "block";

      container.innerHTML = html;
      console.log(`Componente ${url} cargado correctamente`);

      if (containerId === "header-container") {
        if (!document.querySelector('script[src="/js/components/header.js"]')) {
          console.log('Cargando script del header...');
          const headerScript = document.createElement('script');
          headerScript.src = '/js/components/header.js';
          document.body.appendChild(headerScript);
        }
      }

      if (containerId === "footer-container") {
        if (!document.querySelector('script[src="/js/components/footer.js"]')) {
          console.log('Cargando script del footer...');
          const footerScript = document.createElement('script');
          footerScript.src = '/js/components/footer.js';
          document.body.appendChild(footerScript);
        }
      }

      const event = new CustomEvent('componentLoaded', {
        detail: { id: containerId, url: url }
      });
      document.dispatchEvent(event);

      return true;
    } else {
      console.error(`Contenedor #${containerId} no encontrado`);
      return false;
    }
  } catch (error) {
    console.error(`Error al cargar componente ${url}:`, error);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado, iniciando aplicación');
  
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  }
  
  updateCartCount();
  
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');
  
  if (headerContainer) {
    loadComponent('/components/header.html', 'header-container');
  }
  
  if (footerContainer) {
    loadComponent('/components/footer.html', 'footer-container');
  }
});