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

function openAddressModal(addressId = null) {
  const modalContent = document.createElement("div");
  modalContent.innerHTML = `
    <form id="addressForm">
      <input type="hidden" id="addressId" value="${
        addressId !== null ? addressId : ""
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

  if (addressId !== null) {
    const addresses = JSON.parse(localStorage.getItem("userAddresses")) || [];
    const address = addresses[addressId];

    if (address) {
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
  }

  return createModal(
    addressId !== null ? "Editar Dirección" : "Agregar Nueva Dirección",
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

          const addresses =
            JSON.parse(localStorage.getItem("userAddresses")) || [];

          if (newAddress.isDefault) {
            addresses.forEach((address) => {
              address.isDefault = false;
            });
          }

          if (addressId !== "") {
            addresses[addressId] = newAddress;
          } else {
            if (addresses.length === 0) {
              newAddress.isDefault = true;
            }

            addresses.push(newAddress);
          }

          localStorage.setItem("userAddresses", JSON.stringify(addresses));

          document.getElementById("customModal").remove();

          const addressesList = document.getElementById("addressesList");
          if (addressesList) {
            loadAddresses();
          }

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

function savePreferences() {
  const preferences = {
    notifications: {
      email: document.getElementById("emailNotif").checked,
      promos: document.getElementById("promoNotif").checked,
      orderStatus: document.getElementById("orderStatusNotif").checked,
    },
    foodPreferences: {
      favorites: Array.from(
        document.getElementById("favoriteFoods").selectedOptions
      ).map((option) => option.value),
      dietaryRestrictions: [
        document.getElementById("glutenFree").checked ? "gluten-free" : null,
        document.getElementById("lactoseFree").checked ? "lactose-free" : null,
        document.getElementById("vegan").checked ? "vegan" : null,
        document.getElementById("vegetarian").checked ? "vegetarian" : null,
      ].filter(Boolean),
    },
  };

  try {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));

    showToast(
      "Preferencias Guardadas",
      "Tus preferencias han sido actualizadas correctamente.",
      "success"
    );
  } catch (error) {
    showToast(
      "Error",
      "No se pudieron guardar las preferencias. Inténtalo de nuevo.",
      "error"
    );
  }
}

function getOrderStatusLabel(status) {
  const statusLabels = {
    pending: "Pendiente",
    processing: "En Proceso",
    completed: "Completado",
    cancelled: "Cancelado",
  };
  return statusLabels[status] || status;
}

function showOrderDetails(order) {
  const content = document.createElement("div");
  content.innerHTML = `
    <h4>Detalles del Pedido</h4>
    <div class="order-details">
      <p>Fecha: ${new Date(order.date).toLocaleString()}</p>
      <p>Estado: ${getOrderStatusLabel(order.status)}</p>
      
      <h5>Productos</h5>
      <ul>
        ${order.items
          .map(
            (item) => `
          <li>
            ${item.name} - Cantidad: ${item.quantity} - 
            Precio: $${(item.price * item.quantity).toLocaleString()}
          </li>
        `
          )
          .join("")}
      </ul>
      
      <p>Total: $${order.items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toLocaleString()}</p>
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

function loadPurchaseHistory() {
  const ordersList = document.getElementById("ordersList");
  const noOrdersMessage = document.getElementById("noOrdersMessage");

  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

  if (orderHistory.length === 0) {
    noOrdersMessage.style.display = "block";
    ordersList.innerHTML = "";
    return;
  }

  noOrdersMessage.style.display = "none";

  ordersList.innerHTML = "";

  orderHistory.forEach((order, index) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    const totalItems = order.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    orderCard.innerHTML = `
      <div class="order-header">
        <div>
          <span class="order-number">Pedido #${index + 1}</span>
          <span class="order-date">${new Date(
            order.date
          ).toLocaleDateString()}</span>
        </div>
        <div class="order-status ${order.status}">${getOrderStatusLabel(
      order.status
    )}</div>
      </div>
      
      <div class="order-summary">
        <div>Número de Items: ${totalItems}</div>
        <div>Total: $${totalPrice.toLocaleString()}</div>
      </div>
      
      <div class="order-actions">
        <button class="btn btn-sm view-order-details" data-order-index="${index}">
          Ver Detalles
        </button>
      </div>
    `;

    ordersList.appendChild(orderCard);
  });

  const viewDetailsButtons = ordersList.querySelectorAll(".view-order-details");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const orderIndex = button.dataset.orderIndex;
      showOrderDetails(orderHistory[orderIndex]);
    });
  });
}

function logout() {
  confirmDialog(
    "¿Estás seguro de que deseas cerrar sesión?",
    () => {
      localStorage.removeItem("userSession");
      localStorage.removeItem("userPreferences");
      localStorage.removeItem("orderHistory");

      window.location.href = "/pages/login.html";
    },
    () => {
      console.log("Logout cancelled");
    }
  );
}
function loadAddresses() {
  const addressesList = document.getElementById("addressesList");
  const noAddressesMessage = document.getElementById("noAddressesMessage");

  const addresses = JSON.parse(localStorage.getItem("userAddresses")) || [];

  if (addresses.length === 0) {
    noAddressesMessage.style.display = "block";
    addressesList.innerHTML = "";
    return;
  }

  noAddressesMessage.style.display = "none";
  addressesList.innerHTML = "";

  addresses.forEach((address, index) => {
    const addressCard = document.createElement("div");
    addressCard.classList.add("address-card");
    if (address.isDefault) addressCard.classList.add("default");

    addressCard.innerHTML = `
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
    `;

    addressesList.appendChild(addressCard);
  });

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

function deleteAddress(addressIndex) {
  confirmDialog(
    "¿Estás seguro de que deseas eliminar esta dirección?",
    () => {
      const addresses = JSON.parse(localStorage.getItem("userAddresses")) || [];

      const wasDefault = addresses[addressIndex].isDefault;

      addresses.splice(addressIndex, 1);

      if (wasDefault && addresses.length > 0) {
        addresses[0].isDefault = true;
      }

      localStorage.setItem("userAddresses", JSON.stringify(addresses));

      loadAddresses();

      showToast(
        "Dirección Eliminada",
        "La dirección ha sido eliminada correctamente.",
        "success"
      );
    },
    () => {
      console.log("Eliminación de dirección cancelada");
    }
  );
}

function setDefaultAddress(addressIndex) {
  const addresses = JSON.parse(localStorage.getItem("userAddresses")) || [];

  addresses.forEach((addr) => {
    addr.isDefault = false;
  });

  addresses[addressIndex].isDefault = true;

  localStorage.setItem("userAddresses", JSON.stringify(addresses));

  loadAddresses();

  showToast(
    "Dirección Predeterminada",
    "Se ha establecido la nueva dirección predeterminada.",
    "success"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const preferencesForm = document.getElementById("userPreferencesForm");
  if (preferencesForm) {
    preferencesForm.addEventListener("submit", (e) => {
      e.preventDefault();
      savePreferences();
    });
  }

  loadPurchaseHistory();

  loadAddresses();

  const addAddressBtn = document.getElementById("addAddressBtn");
  if (addAddressBtn) {
    addAddressBtn.addEventListener("click", () => {
      openAddressModal();
    });
  }

  const addFirstAddressBtn = document.getElementById("addFirstAddressBtn");
  if (addFirstAddressBtn) {
    addFirstAddressBtn.addEventListener("click", () => {
      openAddressModal();
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }
});

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

injectModalStyles();
