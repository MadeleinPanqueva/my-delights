document.addEventListener("DOMContentLoaded", () => {
  initCategoryTabs();
  initAddToCartButtons();
});

function initCategoryTabs() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const categoryContents = document.querySelectorAll(".menu-category");

  if (categoryButtons.length === 0 || categoryContents.length === 0) {
    console.warn("Elementos de categoría no encontrados");
    return;
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const categoryToShow = button.dataset.category;

      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      categoryContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(categoryToShow).classList.add("active");

      const menuContent = document.querySelector(".menu-content");
      const navHeight = document.querySelector(".menu-navigation").offsetHeight;

      window.scrollTo({
        top: menuContent.offsetTop - navHeight - 20,
        behavior: "smooth",
      });
    });
  });
}

function initAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartNotification = document.getElementById("cartNotification");
  const itemAddedName = document.getElementById("itemAddedName");
  const continueShoppingBtn = document.querySelector(".continue-shopping");

  if (addToCartButtons.length === 0) {
    console.warn("Botones de añadir al carrito no encontrados");
    return;
  }

  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  }

  updateCartCount();

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseInt(button.dataset.price),
        quantity: 1,
      };

      addToCart(product);
      showCartNotification(product.name);
    });
  });

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      hideCartNotification();
    });
  }
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

function showCartNotification(itemName) {
  const cartNotification = document.getElementById("cartNotification");
  const itemAddedName = document.getElementById("itemAddedName");

  if (!cartNotification || !itemAddedName) return;

  itemAddedName.textContent = itemName;
  cartNotification.classList.add("show");

  setTimeout(() => {
    hideCartNotification();
  }, 5000);
}

function hideCartNotification() {
  const cartNotification = document.getElementById("cartNotification");
  if (!cartNotification) return;

  cartNotification.classList.remove("show");
}

function calculateCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
