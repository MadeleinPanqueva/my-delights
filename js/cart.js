document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();

  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  }

  updateCartCount();

  if (window.location.pathname.includes("carrito.html")) {
    renderCartItems();
    initCartControls();
    initDeliveryOptions();
    initPromoCodeForm();
  }
});

function checkUserSession() {
  if (window.location.pathname.includes("carrito.html")) {
    const userSession = getUserSession();

    if (!userSession) {
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/pages/login.html?returnUrl=${returnUrl}`;
      return;
    }

    displayUserInfo(userSession);
  }
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

  summaryHTML += `
    <button id="checkoutBtn" class="btn btn-primary btn-block ${
      total === 0 ? "disabled" : ""
    }">
      Proceder al pago
    </button>`;

  cartSummary.innerHTML = summaryHTML;

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn && total > 0) {
    checkoutBtn.addEventListener("click", proceedToCheckout);
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
  if (confirm("¿Estás seguro que deseas vaciar el carrito?")) {
    localStorage.setItem("cartItems", JSON.stringify([]));

    updateCartCount();
    renderCartItems();
  }
}

function proceedToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const userSession = getUserSession();
  const isDelivery = document.getElementById("deliveryOption").checked;

  if (!cartItems.length || !userSession) {
    alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
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

  alert(
    `Procesando pedido por un total de $${formatPrice(
      total
    )}. En un sistema real, serías redirigido a la pasarela de pago.`
  );

  localStorage.setItem("lastOrder", JSON.stringify(orderData));
  localStorage.setItem("cartItems", JSON.stringify([]));
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

  return cartItems;
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
