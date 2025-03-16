// Función para redirigir a la página de inicio de sesión
function redirectToLoginPage(returnUrl = null) {
  // Corregimos la forma en que formamos la URL para evitar doble codificación
  let redirectUrl = "/pages/login.html";

  if (returnUrl) {
    try {
      // Decodificar primero para evitar doble codificación
      returnUrl = decodeURIComponent(returnUrl);
    } catch (e) {
      console.error("Error decodificando URL:", e);
    }

    redirectUrl += `?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  console.log("Redirigiendo a:", redirectUrl);
  window.location.href = redirectUrl;
}

// Función para verificar la sesión del usuario
function checkUserSession() {
  // Definir páginas protegidas
  const protectedPages = [
    "carrito.html",
    "perfil.html",
    "ordenes.html",
    "checkout.html",
  ];

  // Verificar si estamos en una página protegida
  const currentPath = window.location.pathname;
  const isProtectedPage = protectedPages.some((page) =>
    currentPath.includes(page)
  );

  if (isProtectedPage) {
    const userSession = getUserSession();

    if (!userSession) {
      // Si no hay sesión válida, redirigir al login
      redirectToLoginPage(currentPath);
      return false;
    }

    // Si hay sesión, mostrar la información del usuario
    displayUserInfo(userSession);
  }

  // Inicializar el carrito sólo si estamos en la página del carrito y hay sesión
  if (currentPath.includes("carrito.html")) {
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }

    const userSession = getUserSession();
    if (userSession) {
      renderCartItems();
      initCartControls();
      initDeliveryOptions();
      initPromoCodeForm();
    }
  }

  // Actualizar contador del carrito en todas las páginas
  updateCartCount();

  return true;
}

function displayUserInfo(userSession) {
  const userInfoContainer = document.getElementById("userInfoContainer");

  if (userInfoContainer && userSession) {
    let customerTypeText = "";

    switch (userSession.customerType) {
      case "nuevo":
        customerTypeText = "Cliente Nuevo";
        break;
      case "casual":
        customerTypeText = "Cliente Casual";
        break;
      case "permanente":
        customerTypeText = "Cliente Permanente";
        break;
      case "credito":
        customerTypeText = "Cliente Permanente con Crédito";
        break;
      default:
        customerTypeText = "Cliente";
    }

    userInfoContainer.innerHTML = `
      <div class="user-info">
        <span class="user-name">${userSession.name}</span>
        <span class="user-type">${customerTypeText}</span>
      </div>
    `;
  }
}

function getUserSession() {
  const sessionData = localStorage.getItem("userSession");

  if (!sessionData) return null;

  try {
    const session = JSON.parse(sessionData);

    // Verificar si la sesión ha expirado
    if (session.sessionExpiry && new Date().getTime() > session.sessionExpiry) {
      localStorage.removeItem("userSession");
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error al obtener la sesión del usuario:", error);
    localStorage.removeItem("userSession"); // Eliminar sesión corrupta
    return null;
  }
}

function confirmDialog(message, onConfirm, onCancel) {
  const content = document.createElement("div");
  content.innerHTML = `<p>${message}</p>`;

  return createModal("Confirmar", content, [
    {
      text: "Cancelar",
      className: "btn btn-secondary",
      onClick: () => {
        document.getElementById("customModal").remove();
        onCancel && onCancel();
      },
    },
    {
      text: "Confirmar",
      className: "btn btn-primary",
      onClick: () => {
        document.getElementById("customModal").remove();
        onConfirm && onConfirm();
      },
    },
  ]);
}

function showToast(title, message, type = "success") {
  let toastContainer = document.querySelector(".toast-container");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-header">
      <div class="title">${title}</div>
      <button class="close-btn">&times;</button>
    </div>
    <div class="toast-body">${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);

  const closeBtn = toast.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 300);
    });
  }
}

// Función para cerrar sesión
function logout() {
  confirmDialog(
    "¿Estás seguro de que deseas cerrar sesión?",
    () => {
      localStorage.removeItem("userSession");
      showToast(
        "Sesión cerrada",
        "Has cerrado sesión correctamente.",
        "success"
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    () => {
      console.log("Logout cancelled");
    }
  );
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
}

function renderCartItems() {
  const cartContainer = document.getElementById("cartItemsContainer");
  const cartSummary = document.getElementById("cartSummary");
  const emptyCartMessage = document.getElementById("emptyCartMessage");

  if (!cartContainer || !cartSummary) return;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
    if (emptyCartMessage) {
      emptyCartMessage.style.display = "block";
    }
    cartContainer.innerHTML = "";
    renderCartSummary(0);
    return;
  }

  if (emptyCartMessage) {
    emptyCartMessage.style.display = "none";
  }

  let cartHTML = "";
  let cartTotal = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;

    cartHTML += `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <span class="cart-item-price">$${formatPrice(item.price)}</span>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
        <div class="cart-item-total">
          <span>$${formatPrice(itemTotal)}</span>
        </div>
        <button class="remove-btn" data-id="${item.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  });

  cartContainer.innerHTML = cartHTML;
  renderCartSummary(cartTotal);
}

function renderCartSummary(subtotal) {
  const cartSummary = document.getElementById("cartSummary");
  if (!cartSummary) return;

  const userSession = getUserSession();
  // Si no hay sesión, usar tipo de cliente "nuevo" por defecto
  const customerType = userSession ? userSession.customerType : "nuevo";

  const deliveryOption = document.querySelector("#deliveryOption:checked");
  const isDelivery = deliveryOption !== null;

  const {
    discount,
    discountAmount,
    deliveryFee,
    ivaPortion,
    total,
    discountExplanation,
  } = calculateTotals(subtotal, customerType, isDelivery);

  let summaryHTML = `
    <div class="summary-row">
      <span>Subtotal (IVA incluido)</span>
      <span>$${formatPrice(subtotal)}</span>
    </div>
  `;

  if (discount > 0) {
    summaryHTML += `
      <div class="summary-row discount">
        <span>Descuento (${discount}%)</span>
        <span>-$${formatPrice(discountAmount)}</span>
      </div>
      <div class="discount-explanation">
        <small>${discountExplanation}</small>
      </div>
    `;
  }

  if (deliveryFee > 0) {
    summaryHTML += `
      <div class="summary-row">
        <span>Envío a domicilio (2%)</span>
        <span>$${formatPrice(deliveryFee)}</span>
      </div>
    `;
  }

  summaryHTML += `
    <div class="summary-row iva-info">
      <span>IVA incluido (19%)</span>
      <span>$${formatPrice(ivaPortion)}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>$${formatPrice(total)}</span>
    </div>
  `;

  // Solo mostrar botón de checkout si hay sesión activa
  if (userSession) {
    summaryHTML += `
      <button id="checkoutBtn" class="btn btn-primary btn-block ${
        total === 0 ? "disabled" : ""
      }">
        Proceder al pago
      </button>`;
  } else {
    summaryHTML += `
      <button id="loginToCheckoutBtn" class="btn btn-primary btn-block">
        Iniciar sesión para continuar
      </button>`;
  }

  cartSummary.innerHTML = summaryHTML;

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn && total > 0) {
    checkoutBtn.addEventListener("click", proceedToCheckout);
  }

  const loginToCheckoutBtn = document.getElementById("loginToCheckoutBtn");
  if (loginToCheckoutBtn) {
    loginToCheckoutBtn.addEventListener("click", () => {
      redirectToLoginPage(window.location.pathname);
    });
  }
}

function calculateTotals(subtotal, customerType, isDelivery) {
  let discount = 0;
  let discountExplanation = "";

  switch (customerType) {
    case "nuevo":
      if (subtotal >= 250000) {
        discount = 2;
        discountExplanation = "Descuento por compra mayor a $250.000";
      }
      break;

    case "casual":
      discount = 2;
      discountExplanation = "Descuento por cliente casual";

      if (subtotal >= 200000) {
        discount = 6;
        discountExplanation =
          "Descuento por cliente casual + compra mayor a $200.000";
      }
      break;

    case "permanente":
    case "credito":
      discount = 4;
      discountExplanation = "Descuento por cliente permanente";

      if (subtotal >= 150000) {
        discount = 10;
        discountExplanation =
          "Descuento por cliente permanente + compra mayor a $150.000";
      }
      break;

    default:
      discount = 0;
  }

  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = isDelivery ? Math.round(subtotal * 0.02) : 0;

  const ivaPortion = Math.round((subtotal * 0.19) / 1.19);

  const total = subtotal - discountAmount + deliveryFee;

  return {
    discount,
    discountAmount,
    deliveryFee,
    ivaPortion,
    total,
    discountExplanation,
  };
}

function initCartControls() {
  const cartContainer = document.getElementById("cartItemsContainer");
  if (!cartContainer) return;

  cartContainer.addEventListener("click", (e) => {
    const target = e.target;
    const itemId = target.dataset.id;

    if (!itemId) return;

    if (target.classList.contains("decrease")) {
      updateItemQuantity(itemId, -1);
    } else if (target.classList.contains("increase")) {
      updateItemQuantity(itemId, 1);
    } else if (
      target.classList.contains("remove-btn") ||
      target.parentElement.classList.contains("remove-btn")
    ) {
      removeCartItem(
        target.classList.contains("remove-btn")
          ? itemId
          : target.parentElement.dataset.id
      );
    }
  });

  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }
}

function initDeliveryOptions() {
  const pickupOption = document.getElementById("pickupOption");
  const deliveryOption = document.getElementById("deliveryOption");

  if (!pickupOption || !deliveryOption) {
    console.error("No se encontraron las opciones de entrega");
    return;
  }

  if (!pickupOption.checked && !deliveryOption.checked) {
    pickupOption.checked = true;
  }

  pickupOption.addEventListener("change", () => {
    if (pickupOption.checked) {
      updateCartSummary();
    }
  });

  deliveryOption.addEventListener("change", () => {
    if (deliveryOption.checked) {
      updateCartSummary();
    }
  });

  function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    renderCartSummary(subtotal);
  }
}

function initPromoCodeForm() {
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoCodeInput = document.getElementById("promoCodeInput");
  const promoCodeMessage = document.getElementById("promoCodeMessage");

  if (!applyPromoBtn || !promoCodeInput || !promoCodeMessage) return;

  applyPromoBtn.addEventListener("click", () => {
    const promoCode = promoCodeInput.value.trim().toUpperCase();

    if (!promoCode) {
      showPromoMessage("Por favor, ingresa un código promocional", true);
      return;
    }

    const validPromoCodes = {
      FAMILIA20: {
        discount: 20,
        minPurchase: 0,
        description: "Descuento familiar",
      },
      MARTES2X1: {
        discount: 50,
        minPurchase: 25000,
        description: "Martes 2x1 en postres",
      },
      WELCOME10: {
        discount: 10,
        minPurchase: 0,
        description: "Bienvenida a nuevos clientes",
      },
    };

    if (validPromoCodes[promoCode]) {
      const promo = validPromoCodes[promoCode];
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      if (subtotal >= promo.minPurchase) {
        localStorage.setItem(
          "activePromoCode",
          JSON.stringify({
            code: promoCode,
            ...promo,
          })
        );

        showPromoMessage(
          `Código "${promoCode}" aplicado: ${promo.description}`
        );

        renderCartSummary(subtotal);
      } else {
        showPromoMessage(
          `Compra mínima de $${formatPrice(
            promo.minPurchase
          )} para usar este código`,
          true
        );
      }
    } else {
      showPromoMessage("Código promocional inválido o expirado", true);
    }
  });

  function showPromoMessage(message, isError = false) {
    promoCodeMessage.textContent = message;
    promoCodeMessage.className =
      "promo-code-message" + (isError ? " error" : "");
  }
}

function updateItemQuantity(itemId, change) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) return;

  cartItems[itemIndex].quantity += change;

  if (cartItems[itemIndex].quantity <= 0) {
    cartItems.splice(itemIndex, 1);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  updateCartCount();
  renderCartItems();
}

function removeCartItem(itemId) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const updatedCart = cartItems.filter((item) => item.id !== itemId);

  localStorage.setItem("cartItems", JSON.stringify(updatedCart));

  updateCartCount();
  renderCartItems();
}

function clearCart() {
  confirmDialog("¿Estás seguro que deseas vaciar el carrito?", () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    updateCartCount();
    renderCartItems();
    showToast("Carrito vaciado", "Tu carrito ha sido vaciado.", "success");
  });
}

function proceedToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const userSession = getUserSession();
  const isDelivery = document.getElementById("deliveryOption").checked;

  if (!cartItems.length || !userSession) {
    showToast(
      "Error",
      "Ha ocurrido un error. Por favor, intenta nuevamente.",
      "error"
    );
    return;
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const { discount, discountAmount, deliveryFee, ivaPortion, total } =
    calculateTotals(subtotal, userSession.customerType, isDelivery);

  const orderData = {
    customer: {
      id: userSession.id,
      name: userSession.name,
      email: userSession.email,
      type: userSession.customerType,
    },
    items: cartItems,
    delivery: isDelivery,
    summary: {
      subtotal,
      discount,
      discountAmount,
      deliveryFee,
      ivaPortion,
      total,
    },
    orderDate: new Date().toISOString(),
    status: "pending",
  };

  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
  orderHistory.push(orderData);
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

  localStorage.setItem("lastOrder", JSON.stringify(orderData));

  localStorage.setItem("cartItems", JSON.stringify([]));

  showToast(
    "Pedido procesado",
    `Tu pedido por $${formatPrice(total)} ha sido procesado correctamente.`,
    "success"
  );

  setTimeout(() => {
    window.location.href = "/pages/orden-confirmacion.html";
  }, 1500);
}

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );

  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += product.quantity || 1;
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  updateCartCount();

  showToast(
    "Producto agregado",
    `${product.name} se ha agregado al carrito.`,
    "success"
  );

  return cartItems;
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updateUIBasedOnSession(userSession) {
  const loginButtons = document.querySelectorAll(".login-button");
  const userMenus = document.querySelectorAll(".user-menu");
  const userNameElements = document.querySelectorAll(".user-name-display");

  if (userSession) {
    // Usuario con sesión activa
    loginButtons.forEach((btn) => (btn.style.display = "none"));
    userMenus.forEach((menu) => (menu.style.display = "block"));
    userNameElements.forEach((el) => {
      el.textContent = userSession.name;
      el.style.display = "block";
    });
  } else {
    // Sin sesión activa
    loginButtons.forEach((btn) => (btn.style.display = "block"));
    userMenus.forEach((menu) => (menu.style.display = "none"));
    userNameElements.forEach((el) => (el.style.display = "none"));
  }
}

function injectModalStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .custom-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .custom-modal.modal-show {
      opacity: 1;
      pointer-events: auto;
    }

    .custom-modal .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
    }

    .custom-modal .modal-box {
      background: white;
      border-radius: 10px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      transform: scale(0.7);
      opacity: 0;
      transition: all 0.3s ease;
    }

    .custom-modal.modal-show .modal-box {
      transform: scale(1);
      opacity: 1;
    }

    .custom-modal .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }

    .custom-modal .modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #888;
    }

    .custom-modal .modal-content {
      padding: 20px;
    }

    .custom-modal .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 15px;
      border-top: 1px solid #eee;
    }

    .custom-modal .form-group {
      margin-bottom: 15px;
    }

    .custom-modal .form-group label {
      display: block;
      margin-bottom: 5px;
    }

    .custom-modal .form-group input,
    .custom-modal .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1100;
    }

    .toast {
      background-color: #333;
      color: white;
      border-radius: 5px;
      padding: 15px;
      margin-bottom: 10px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .toast.show {
      opacity: 1;
    }

    .toast.success {
      background-color: #28a745;
    }

    .toast.error {
      background-color: #dc3545;
    }
  `;
  document.head.appendChild(style);
}

// Evento principal al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  injectModalStyles();

  // Inicializar el carrito, pero no crea usuarios falsos
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  }

  updateCartCount();

  // Obtener sesión del usuario (si existe)
  const userSession = getUserSession();

  // Configurar diferentes comportamientos según la página
  if (window.location.pathname.includes("login.html")) {
    // Configurar eventos específicos para la página de login
    setupLoginPageEvents();
    return;
  } else if (window.location.pathname.includes("perfil.html")) {
    // Configurar eventos específicos para la página de perfil
    if (!userSession) {
      redirectToLoginPage(window.location.pathname);
      return;
    }
    setupProfilePage(userSession);
  } else if (window.location.pathname.includes("registro.html")) {
    // Configurar eventos específicos para la página de registro
    setupRegistrationPage();
    return;
  }

  // Verificar acceso a páginas protegidas
  const protectedPages = [
    "carrito.html",
    "perfil.html",
    "checkout.html",
    "ordenes.html",
  ];

  const isProtectedPage = protectedPages.some((page) =>
    window.location.pathname.includes(page)
  );

  if (isProtectedPage) {
    if (!userSession) {
      redirectToLoginPage(window.location.pathname);
    } else {
      displayUserInfo(userSession);

      if (window.location.pathname.includes("carrito.html")) {
        renderCartItems();
        initCartControls();
        initDeliveryOptions();
        initPromoCodeForm();
      }
    }
  }

  // Configurar botones de login, registro y logout en la navegación
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      redirectToLoginPage();
    });
  }

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/pages/registro.html";
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  // Actualizar interfaz basada en el estado de la sesión
  updateUIBasedOnSession(userSession);
});

// Configurar eventos específicos para la página de perfil
function setupProfilePage(userSession) {
  displayUserInfo(userSession);

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    const nameInput = document.getElementById("profileName");
    const phoneInput = document.getElementById("profilePhone");
    const emailInput = document.getElementById("profileEmail");

    if (nameInput) nameInput.value = userSession.name || "";
    if (phoneInput) nameInput.value = userSession.phone || "";
    if (emailInput) emailInput.value = userSession.email || "";

    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();

      updateUserProfile(userSession.id, {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
      });

      showToast(
        "Perfil actualizado",
        "Los cambios han sido guardados correctamente.",
        "success"
      );
    });
  }

  // Cargar direcciones si es necesario
  const addressesContainer = document.getElementById("addressesList");
  if (addressesContainer) {
    loadAddresses();
  }

  // Cargar historial de pedidos si es necesario
  const ordersContainer = document.getElementById("ordersList");
  if (ordersContainer) {
    loadPurchaseHistory();
  }
}

// Función para actualizar el perfil del usuario
function updateUserProfile(userId, updatedData) {
  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    // Actualizar datos del usuario
    users[userIndex] = {
      ...users[userIndex],
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    // Guardar cambios
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    // Actualizar sesión actual
    const sessionData = JSON.parse(localStorage.getItem("userSession"));
    if (sessionData && sessionData.id === userId) {
      // Actualizar solo los campos permitidos en la sesión (como el nombre)
      const updatedSession = {
        ...sessionData,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("userSession", JSON.stringify(updatedSession));
    }

    return true;
  }

  return false;
}

// Configurar eventos en la página de login
function setupLoginPageEvents() {
  const urlParams = new URLSearchParams(window.location.search);
  let returnUrl = urlParams.get("returnUrl");

  // Asegurar que la URL de retorno sea válida
  if (returnUrl) {
    try {
      // Decodificar para evitar problemas con doble codificación
      returnUrl = decodeURIComponent(returnUrl);
    } catch (e) {
      console.error("Error decodificando URL de retorno:", e);
      returnUrl = "/";
    }
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const errorMessage = document.getElementById("loginErrorMessage");

      // Limpiar mensaje de error previo
      if (errorMessage) {
        errorMessage.textContent = "";
      }

      if (!emailInput.value || !passwordInput.value) {
        if (errorMessage) {
          errorMessage.textContent = "Por favor, completa todos los campos.";
        }
        return;
      }

      // Verificar credenciales
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const user = users.find(
        (u) =>
          u.email === emailInput.value && u.password === passwordInput.value
      );

      if (user) {
        // Crear sesión con los datos del usuario
        const sessionData = {
          id: user.id,
          name: user.name,
          email: user.email,
          customerType: user.customerType || "nuevo",
          sessionExpiry: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 horas
        };

        localStorage.setItem("userSession", JSON.stringify(sessionData));

        showToast(
          "Sesión iniciada",
          "Has iniciado sesión correctamente.",
          "success"
        );

        // Redirigir después de un breve retardo
        setTimeout(() => {
          if (returnUrl) {
            window.location.href = returnUrl;
          } else {
            window.location.href = "/";
          }
        }, 1000);
      } else {
        if (errorMessage) {
          errorMessage.textContent =
            "Correo electrónico o contraseña incorrectos.";
        }
      }
    });
  }

  // Configurar botones de demo para pruebas rápidas
  const demoButtons = document.querySelectorAll(".demo-login");
  demoButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const customerType = this.dataset.type;

      const demoUser = createDemoUser(customerType);

      const sessionData = {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        customerType: demoUser.customerType,
        sessionExpiry: new Date().getTime() + 24 * 60 * 60 * 1000,
      };

      localStorage.setItem("userSession", JSON.stringify(sessionData));

      showToast(
        "Demo iniciada",
        `Has iniciado sesión como ${demoUser.name} (${getCustomerTypeText(
          customerType
        )})`,
        "success"
      );

      setTimeout(() => {
        if (returnUrl) {
          window.location.href = returnUrl;
        } else {
          window.location.href = "/";
        }
      }, 1000);
    });
  });

  // Configurar toggle para mostrar/ocultar contraseña
  const togglePasswordBtn = document.querySelector(".toggle-password");
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      const icon = this.querySelector("i");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }
}

// Configurar eventos en la página de registro
function setupRegistrationPage() {
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const passwordConfirmInput = document.getElementById("passwordConfirm");
      const errorMessage = document.getElementById("registrationErrorMessage");

      // Limpiar mensaje de error previo
      if (errorMessage) {
        errorMessage.textContent = "";
      }

      // Validaciones básicas
      if (!nameInput.value || !emailInput.value || !passwordInput.value) {
        if (errorMessage) {
          errorMessage.textContent = "Por favor, completa todos los campos.";
        }
        return;
      }

      if (passwordInput.value !== passwordConfirmInput.value) {
        if (errorMessage) {
          errorMessage.textContent = "Las contraseñas no coinciden.";
        }
        return;
      }

      // Verificar si el email ya está registrado
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

      if (users.some((user) => user.email === emailInput.value)) {
        if (errorMessage) {
          errorMessage.textContent =
            "Este correo electrónico ya está registrado.";
        }
        return;
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        customerType: "nuevo", // Tipo de cliente por defecto
        createdAt: new Date().toISOString(),
      };

      // Guardar usuario
      users.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Crear sesión automáticamente
      const sessionData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        customerType: newUser.customerType,
        sessionExpiry: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 horas
      };

      localStorage.setItem("userSession", JSON.stringify(sessionData));

      showToast(
        "Registro exitoso",
        "Tu cuenta ha sido creada correctamente.",
        "success"
      );

      // Redirigir a la página principal
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    });
  }

  // Configurar toggle para contraseñas
  const togglePasswordBtns = document.querySelectorAll(".toggle-password");

  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const inputId = this.dataset.for;
      const passwordInput = document.getElementById(inputId);
      const icon = this.querySelector("i");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });
}

// Función para crear un usuario demo
function createDemoUser(customerType) {
  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  // Verificar si ya existe el usuario demo
  const existingUser = users.find(
    (u) => u.email === `demo.${customerType}@example.com`
  );
  if (existingUser) {
    return existingUser;
  }

  // Crear un nuevo usuario demo
  const newUser = {
    id: Date.now().toString(),
    name: `Usuario ${getCustomerTypeText(customerType)}`,
    email: `demo.${customerType}@example.com`,
    password: "demo123",
    customerType: customerType,
    createdAt: new Date().toISOString(),
    isDemo: true,
  };

  users.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(users));

  return newUser;
}

// Función para obtener texto descriptivo del tipo de cliente
function getCustomerTypeText(customerType) {
  switch (customerType) {
    case "nuevo":
      return "Cliente Nuevo";
    case "casual":
      return "Cliente Casual";
    case "permanente":
      return "Cliente Permanente";
    case "credito":
      return "Cliente con Crédito";
    default:
      return "Cliente";
  }
}

function loadAddresses() {
  const addressesList = document.getElementById("addressesList");
  const noAddressesMessage = document.getElementById("noAddressesMessage");

  if (!addressesList) return;

  const userSession = getUserSession();

  if (!userSession) {
    console.error("No hay sesión de usuario activa");
    return;
  }

  const userId = userSession.id;
  const userAddresses =
    JSON.parse(localStorage.getItem(`addresses_${userId}`)) || [];

  if (userAddresses.length === 0) {
    if (noAddressesMessage) {
      noAddressesMessage.style.display = "block";
    }
    addressesList.innerHTML = "";
    return;
  }

  if (noAddressesMessage) {
    noAddressesMessage.style.display = "none";
  }

  let addressesHTML = "";

  userAddresses.forEach((address, index) => {
    addressesHTML += `
      <div class="address-card ${address.isDefault ? "default" : ""}">
        ${
          address.isDefault
            ? '<div class="default-badge">Predeterminada</div>'
            : ""
        }
        <div class="address-alias">${address.alias}</div>
        <div class="address-details">${address.street}, ${address.city} ${
      address.postalCode || ""
    }</div>
        ${
          address.instructions
            ? `<div class="address-instructions">${address.instructions}</div>`
            : ""
        }
        <div class="address-actions">
          <button class="btn btn-sm edit-address" data-address-index="${index}">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button class="btn btn-sm delete-address" data-address-index="${index}">
            <i class="fas fa-trash"></i> Eliminar
          </button>
          ${
            !address.isDefault
              ? `
            <button class="btn btn-sm set-default" data-address-index="${index}">
              <i class="fas fa-check"></i> Predeterminar
            </button>
          `
              : ""
          }
        </div>
      </div>
    `;
  });

  addressesList.innerHTML = addressesHTML;

  // Configurar eventos para los botones de acción
  addressesList.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-address");
    const deleteBtn = e.target.closest(".delete-address");
    const defaultBtn = e.target.closest(".set-default");

    if (editBtn) {
      const addressIndex = editBtn.dataset.addressIndex;
      openAddressModal(addressIndex);
    }

    if (deleteBtn) {
      const addressIndex = deleteBtn.dataset.addressIndex;
      deleteAddress(addressIndex);
    }

    if (defaultBtn) {
      const addressIndex = defaultBtn.dataset.addressIndex;
      setDefaultAddress(addressIndex);
    }
  });
}

// Función para cargar el historial de compras
function loadPurchaseHistory() {
  const ordersList = document.getElementById("ordersList");
  const noOrdersMessage = document.getElementById("noOrdersMessage");

  if (!ordersList) return;

  // Obtener el historial de pedidos
  const userSession = getUserSession();

  if (!userSession) {
    console.error("No hay sesión de usuario activa");
    return;
  }

  const userId = userSession.id;
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

  // Filtrar pedidos del usuario actual
  const userOrders = orderHistory.filter(
    (order) => order.customer && order.customer.id === userId
  );

  if (userOrders.length === 0) {
    if (noOrdersMessage) {
      noOrdersMessage.style.display = "block";
    }
    ordersList.innerHTML = "";
    return;
  }

  if (noOrdersMessage) {
    noOrdersMessage.style.display = "none";
  }

  let ordersHTML = "";

  userOrders.forEach((order, index) => {
    const totalItems = order.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice = order.summary
      ? order.summary.total
      : order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    ordersHTML += `
      <div class="order-card">
        <div class="order-header">
          <div>
            <span class="order-number">Pedido #${index + 1}</span>
            <span class="order-date">${new Date(
              order.orderDate
            ).toLocaleDateString()}</span>
          </div>
          <div class="order-status ${order.status}">${getOrderStatusLabel(
      order.status
    )}</div>
        </div>
        
        <div class="order-summary">
          <div>Número de Items: ${totalItems}</div>
          <div>Total: $${formatPrice(totalPrice)}</div>
        </div>
        
        <div class="order-actions">
          <button class="btn btn-sm view-order-details" data-order-index="${index}">
            Ver Detalles
          </button>
        </div>
      </div>
    `;
  });

  ordersList.innerHTML = ordersHTML;

  // Configurar eventos para los botones de detalle
  const viewDetailsButtons = ordersList.querySelectorAll(".view-order-details");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const orderIndex = button.dataset.orderIndex;
      showOrderDetails(userOrders[orderIndex]);
    });
  });
}

// Función para mostrar detalles de un pedido
function showOrderDetails(order) {
  const content = document.createElement("div");
  content.innerHTML = `
    <h4>Detalles del Pedido</h4>
    <div class="order-details">
      <p>Fecha: ${new Date(order.orderDate).toLocaleString()}</p>
      <p>Estado: ${getOrderStatusLabel(order.status)}</p>
      
      <h5>Productos</h5>
      <ul>
        ${order.items
          .map(
            (item) => `
          <li>
            ${item.name} - Cantidad: ${item.quantity} - 
            Precio: $${formatPrice(item.price * item.quantity)}
          </li>
        `
          )
          .join("")}
      </ul>
      
      <p>Total: $${formatPrice(
        order.summary
          ? order.summary.total
          : order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )
      )}</p>
    </div>
  `;

  createModal("Detalles del Pedido", content, [
    {
      text: "Cerrar",
      className: "btn btn-secondary",
      onClick: () => {
        document.getElementById("customModal").remove();
      },
    },
  ]);
}

// Función para obtener la etiqueta de estado de un pedido
function getOrderStatusLabel(status) {
  const statusLabels = {
    pending: "Pendiente",
    processing: "En Proceso",
    shipped: "Enviado",
    delivered: "Entregado",
    completed: "Completado",
    cancelled: "Cancelado",
  };
  return statusLabels[status] || status;
}

// Función para abrir el modal de direcciones
function openAddressModal(addressIndex = null) {
  const userSession = getUserSession();

  if (!userSession) {
    console.error("No hay sesión de usuario activa");
    return;
  }

  const userId = userSession.id;
  const userAddresses =
    JSON.parse(localStorage.getItem(`addresses_${userId}`)) || [];

  const modalContent = document.createElement("div");
  modalContent.innerHTML = `
    <form id="addressForm">
      <input type="hidden" id="addressId" value="${
        addressIndex !== null ? addressIndex : ""
      }">
      
      <div class="form-group">
        <label for="addressAlias">Alias de Dirección*</label>
        <input type="text" id="addressAlias" required>
      </div>
      
      <div class="form-group">
        <label for="addressStreet">Calle*</label>
        <input type="text" id="addressStreet" required>
      </div>
      
      <div class="form-group">
        <label for="addressCity">Ciudad*</label>
        <input type="text" id="addressCity" required>
      </div>
      
      <div class="form-group">
        <label for="addressPostalCode">Código Postal</label>
        <input type="text" id="addressPostalCode">
      </div>
      
      <div class="form-group">
        <label for="addressInstructions">Instrucciones de Entrega</label>
        <textarea id="addressInstructions"></textarea>
      </div>
      
      <div class="form-group">
        <label>
          <input type="checkbox" id="addressDefault">
          Establecer como dirección predeterminada
        </label>
      </div>
    </form>
  `;

  if (addressIndex !== null && userAddresses[addressIndex]) {
    const address = userAddresses[addressIndex];

    // Agregar un pequeño retardo para asegurar que los elementos del DOM están disponibles
    setTimeout(() => {
      document.getElementById("addressAlias").value = address.alias || "";
      document.getElementById("addressStreet").value = address.street || "";
      document.getElementById("addressCity").value = address.city || "";
      document.getElementById("addressPostalCode").value =
        address.postalCode || "";
      document.getElementById("addressInstructions").value =
        address.instructions || "";
      document.getElementById("addressDefault").checked =
        address.isDefault || false;
    }, 50);
  }

  return createModal(
    addressIndex !== null ? "Editar Dirección" : "Agregar Nueva Dirección",
    modalContent,
    [
      {
        text: "Cancelar",
        className: "btn btn-secondary",
        onClick: () => document.getElementById("customModal").remove(),
      },
      {
        text: "Guardar",
        className: "btn btn-primary",
        onClick: () => {
          const addressId = document.getElementById("addressId").value;
          const addressAlias = document
            .getElementById("addressAlias")
            .value.trim();
          const addressStreet = document
            .getElementById("addressStreet")
            .value.trim();
          const addressCity = document
            .getElementById("addressCity")
            .value.trim();
          const addressPostalCode = document
            .getElementById("addressPostalCode")
            .value.trim();
          const addressInstructions = document
            .getElementById("addressInstructions")
            .value.trim();
          const addressDefault =
            document.getElementById("addressDefault").checked;

          if (!addressAlias || !addressStreet || !addressCity) {
            showToast(
              "Error",
              "Por favor, completa los campos obligatorios.",
              "error"
            );
            return;
          }

          const newAddress = {
            alias: addressAlias,
            street: addressStreet,
            city: addressCity,
            postalCode: addressPostalCode,
            instructions: addressInstructions,
            isDefault: addressDefault,
          };

          // Si la dirección se marca como predeterminada, quitar la marca de las demás
          if (newAddress.isDefault) {
            userAddresses.forEach((address) => {
              address.isDefault = false;
            });
          }

          if (addressId !== "") {
            // Actualizar dirección existente
            userAddresses[addressId] = newAddress;
          } else {
            // Agregar nueva dirección
            if (userAddresses.length === 0) {
              newAddress.isDefault = true; // Primera dirección es predeterminada
            }
            userAddresses.push(newAddress);
          }

          localStorage.setItem(
            `addresses_${userId}`,
            JSON.stringify(userAddresses)
          );
          document.getElementById("customModal").remove();
          loadAddresses(); // Recargar la lista de direcciones

          showToast(
            "Dirección guardada",
            "La dirección ha sido guardada correctamente.",
            "success"
          );
        },
      },
    ]
  );
}

// Función para eliminar una dirección
function deleteAddress(addressIndex) {
  const userSession = getUserSession();

  if (!userSession) {
    console.error("No hay sesión de usuario activa");
    return;
  }

  const userId = userSession.id;

  confirmDialog("¿Estás seguro de que deseas eliminar esta dirección?", () => {
    const userAddresses =
      JSON.parse(localStorage.getItem(`addresses_${userId}`)) || [];
    const wasDefault = userAddresses[addressIndex].isDefault;

    userAddresses.splice(addressIndex, 1);

    // Si se eliminó la dirección predeterminada y hay otras direcciones,
    // establecer la primera como predeterminada
    if (wasDefault && userAddresses.length > 0) {
      userAddresses[0].isDefault = true;
    }

    localStorage.setItem(`addresses_${userId}`, JSON.stringify(userAddresses));
    loadAddresses(); // Recargar la lista de direcciones

    showToast(
      "Dirección Eliminada",
      "La dirección ha sido eliminada correctamente.",
      "success"
    );
  });
}

// Función para establecer una dirección como predeterminada
function setDefaultAddress(addressIndex) {
  const userSession = getUserSession();

  if (!userSession) {
    console.error("No hay sesión de usuario activa");
    return;
  }

  const userId = userSession.id;
  const userAddresses =
    JSON.parse(localStorage.getItem(`addresses_${userId}`)) || [];

  // Quitar la marca de predeterminada de todas las direcciones
  userAddresses.forEach((address) => {
    address.isDefault = false;
  });

  // Establecer la nueva dirección predeterminada
  userAddresses[addressIndex].isDefault = true;

  localStorage.setItem(`addresses_${userId}`, JSON.stringify(userAddresses));
  loadAddresses(); // Recargar la lista de direcciones

  showToast(
    "Dirección Predeterminada",
    "Se ha establecido la nueva dirección predeterminada.",
    "success"
  );
}

// Función para crear un modal genérico
function createModal(title, content, buttons = []) {
  const existingModal = document.getElementById("customModal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.id = "customModal";
  modal.classList.add("custom-modal");

  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-box">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-content"></div>
      <div class="modal-footer"></div>
    </div>
  `;

  const modalContentContainer = modal.querySelector(".modal-content");
  if (typeof content === "string") {
    modalContentContainer.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    modalContentContainer.appendChild(content);
  }

  const modalFooter = modal.querySelector(".modal-footer");
  buttons.forEach((button) => {
    const btn = document.createElement("button");
    btn.textContent = button.text;
    btn.className = button.className || "btn";
    btn.addEventListener("click", button.onClick);
    modalFooter.appendChild(btn);
  });

  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  function closeModal() {
    modal.classList.add("modal-hide");
    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    modal.classList.add("modal-show");
  });

  return modal;
}
