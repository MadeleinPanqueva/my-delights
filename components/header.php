<header>
  <link rel="stylesheet" href="../css/components/header.css" />
  <link rel="stylesheet" href="../js/components/header.js" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
  />

  <div class="container">
    <div class="header-content">
      <div class="logo" itemscope itemtype="https://schema.org/Organization">
        <a href="../index.php" aria-label="Inicio - My Delights">
          <img src="../images/banners/logo.png" alt="Logo My Delights - Restaurante de comida gourmet" itemprop="logo" />
          <meta itemprop="name" content="My Delights" />
          <meta itemprop="description" content="Restaurante de comida gourmet y corriente de alta calidad con servicio a domicilio" />
        </a>
      </div>
      <nav class="main-nav" aria-label="Navegación principal">
        <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="navList">
          <i class="fas fa-bars"></i>
          <span class="sr-only">Menú</span>
        </button>
        <ul class="nav-list" id="navList">
          <li><a href="../index.php" title="Página de inicio">Inicio</a></li>
          <li><a href="../pages/menu-carta.php" title="Nuestro menú a la carta gourmet">Menú a la Carta</a></li>
          <li><a href="../pages/menu-corriente.php" title="Nuestro menú corriente diario">Menú Corriente</a></li>
          <li><a href="../pages/servicios.php" title="Servicios para eventos y catering">Servicios</a></li>
          <li class="cart-icon">
            <a href="../pages/carrito.php" aria-label="Ver carrito de compras">
              <i class="fas fa-shopping-cart"></i>
              <!-- <span class="cart-count" id="cartCount">0</span> -->
            </a>
          </li>
          <li class="user-profile">
            <a href="../pages/perfil.php" aria-label="Ver perfil de usuario">
              <i class="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>
<script src="../js/components/header.js"></script> 