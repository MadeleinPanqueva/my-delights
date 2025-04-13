<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Delights - Iniciar Sesión o Registrarse</title>
    <meta
      name="description"
      content="Inicia sesión o regístrate en My Delights para acceder a descuentos exclusivos y gestionar tus pedidos."
    />

    <link rel="stylesheet" href="/css/normalize.css" />
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/login.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    />

    <style>
      html,
      body,
      #header-container,
      header,
      main {
        margin-top: 0 !important;
        padding-top: 0 !important;
      }

      body {
        overflow-x: hidden;
      }

      .register-fields {
        display: none;
      }

      .toggle-mode {
        margin-top: 15px;
        text-align: center;
        cursor: pointer;
        color: #007bff;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div id="header-container"></div>

    <main class="login-page">
      <section class="login-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="login-container">
                <div class="login-header">
                  <h1 id="formTitle">Iniciar Sesión</h1>
                  <p id="formSubtitle">
                    Accede a tu cuenta para disfrutar de descuentos exclusivos
                  </p>
                </div>

                <div class="login-form">
                  <form id="loginForm">
                    <!-- Campos de Registro -->
                    <div class="register-fields">
                      <div class="mb-3">
                        <label for="cedula" class="form-label">Cédula</label>
                        <input type="text" class="form-control" id="cedula" />
                      </div>
                      <div class="mb-3">
                        <label for="sexo" class="form-label">Sexo</label>
                        <select id="sexo" class="form-control">
                          <option value="">Selecciona</option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="fechaNacimiento" class="form-label"
                          >Fecha de Nacimiento</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          id="fechaNacimiento"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="direccion" />
                      </div>
                      <div class="mb-3">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="telefono" />
                      </div>
                    </div>

                    <!-- Email y contraseña -->
                    <div class="mb-3">
                      <label for="email" class="form-label">Correo Electrónico</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <div class="password-input">
                        <label for="password" class="form-label">Contraseña</label>
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          required
                        />
                        <button
                          type="button"
                          class="toggle-password"
                          tabindex="-1"
                        >
                          <i class="far fa-eye"></i>
                        </button>
                      </div>
                    </div>

                    <div class="mb-3 form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="rememberMe"
                      />
                      <label class="form-check-label" for="rememberMe"
                        >Recordarme</label
                      >
                    </div>

                    <div
                      class="login-error-message"
                      id="loginErrorMessage"
                    ></div>

                    <button type="submit" class="btn btn-primary btn-block" id="submitBtn">
                      Iniciar Sesión
                    </button>
                  </form>

                  <div class="toggle-mode" id="toggleMode">
                    ¿No tienes cuenta? Regístrate aquí
                  </div>
                </div>

                <div class="demo-login-section">
                  <h5>Acceso rápido para pruebas</h5>
                  <div class="demo-buttons">
                    <button
                      class="btn btn-sm btn-outline-secondary demo-login"
                      data-type="nuevo"
                    >
                      Cliente Nuevo
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary demo-login"
                      data-type="casual"
                    >
                      Cliente Casual
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary demo-login"
                      data-type="permanente"
                    >
                      Cliente Permanente
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary demo-login"
                      data-type="credito"
                    >
                      Cliente con Crédito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div id="footer-container"></div>

    <script src="/js/main.js"></script>
    <script src="/js/validation.js"></script>

    <script>
      async function loadComponent(url, containerId) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Error cargando ${url}: ${response.status}`);
          const html = await response.text();
          const container = document.getElementById(containerId);
          if (container) {
            container.style.margin = "0";
            container.style.padding = "0";
            container.style.display = "block";
            container.innerHTML = html;
            const event = new CustomEvent("componentLoaded", {
              detail: { id: containerId, url: url },
            });
            document.dispatchEvent(event);
            const headerElement = container.querySelector("header");
            if (headerElement) {
              headerElement.style.margin = "0";
              headerElement.style.padding = headerElement.style.padding || "15px 0";
            }
          }
        } catch (error) {
          console.error(`Error al cargar componente ${url}:`, error);
        }
      }

      document.addEventListener("DOMContentLoaded", () => {
        loadComponent("/components/header.html", "header-container").then(() => {
          if (!document.querySelector('script[src="/js/components/header.js"]')) {
            const headerScript = document.createElement("script");
            headerScript.src = "/js/components/header.js";
            document.body.appendChild(headerScript);
          }
        });

        loadComponent("/components/footer.html", "footer-container").then(() => {
          if (!document.querySelector('script[src="/js/components/footer.js"]')) {
            const footerScript = document.createElement("script");
            footerScript.src = "/js/components/footer.js";
            document.body.appendChild(footerScript);
          }
        });

        const toggleMode = document.getElementById("toggleMode");
        const registerFields = document.querySelector(".register-fields");
        const title = document.getElementById("formTitle");
        const subtitle = document.getElementById("formSubtitle");
        const submitBtn = document.getElementById("submitBtn");

        let isRegistering = false;

        toggleMode.addEventListener("click", () => {
          isRegistering = !isRegistering;
          registerFields.style.display = isRegistering ? "block" : "none";
          title.textContent = isRegistering ? "Registrarse" : "Iniciar Sesión";
          subtitle.textContent = isRegistering
            ? "Crea una cuenta para empezar a disfrutar de My Delights"
            : "Accede a tu cuenta para disfrutar de descuentos exclusivos";
          submitBtn.textContent = isRegistering ? "Registrarse" : "Iniciar Sesión";
          toggleMode.textContent = isRegistering
            ? "¿Ya tienes cuenta? Inicia sesión aquí"
            : "¿No tienes cuenta? Regístrate aquí";
        
        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const email = document.getElementById("email").value.trim();
          const password = document.getElementById("password").value.trim();

          if (!email || !password) {
            document.getElementById("loginErrorMessage").textContent = "Email y contraseña son obligatorios.";
            return;
          }

          if (isRegistering) {
            // Registro de nuevo usuario
            const newUser = {
              id: Date.now().toString(),
              name: email.split("@")[0],
              email: email,
              password: password,
              cedula: document.getElementById("cedula").value.trim(),
              sexo: document.getElementById("sexo").value,
              nacimiento: document.getElementById("fechaNacimiento").value,
              direccion: document.getElementById("direccion").value.trim(),
              phone: document.getElementById("telefono").value.trim(),
              createdAt: new Date().toISOString(),
              customerType: "nuevo"
            };

            let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const existingUser = users.find(u => u.email === newUser.email);
            if (existingUser) {
              document.getElementById("loginErrorMessage").textContent = "Este correo ya está registrado.";
              return;
            }

            users.push(newUser);
            localStorage.setItem("registeredUsers", JSON.stringify(users));
            localStorage.setItem("userSession", JSON.stringify(newUser));

            window.location.href = "/pages/perfil.html";
          } else {
            // Inicio de sesión
            let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
              localStorage.setItem("userSession", JSON.stringify(user));
              window.location.href = "/pages/perfil.html";
            } else {
              document.getElementById("loginErrorMessage").textContent = "Correo o contraseña incorrectos.";
            }
          }
        });

        });
      });
    </script>
  </body>
</html>
