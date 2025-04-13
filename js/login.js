// Función para iniciar sesión
function loginUser(email, password) {
  try {
    // Obtener usuarios registrados
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    // Buscar usuario por email
    const user = registeredUsers.find(user => user.email === email);
    
    // Verificar si existe el usuario y la contraseña es correcta
    if (!user || user.password !== password) {
      return { success: false, message: "Credenciales incorrectas" };
    }
    
    // Crear sesión de usuario
    createUserSession(user);
    
    return { success: true, user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return { success: false, message: "Error de sistema" };
  }
}

// Función para registrar un nuevo usuario
function registerUser(userData) {
  try {
    // Obtener usuarios registrados
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    // Verificar si ya existe un usuario con ese email
    if (registeredUsers.some(user => user.email === userData.email)) {
      return { success: false, message: "Ya existe un usuario con ese correo" };
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: generateUserId(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      cedula: userData.cedula || "",
      sexo: userData.sexo || "",
      nacimiento: userData.nacimiento || "",
      direccion: userData.direccion || "",
      phone: userData.phone || "",
      customerType: "nuevo",
      createdAt: new Date().toISOString(),
    };
    
    // Agregar usuario a la lista
    registeredUsers.push(newUser);
    
    // Guardar lista actualizada
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    // Crear sesión del nuevo usuario
    createUserSession(newUser);
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return { success: false, message: "Error de sistema" };
  }
}

// Función para crear o actualizar la sesión del usuario
function createUserSession(userData) {
  // Asegurar que todos los campos necesarios estén presentes
  const userSession = {
    id: userData.id,
    name: userData.name || "",
    email: userData.email || "",
    cedula: userData.cedula || "",
    sexo: userData.sexo || "",
    nacimiento: userData.nacimiento || "",
    direccion: userData.direccion || "",
    phone: userData.phone || "",
    customerType: userData.customerType || "nuevo",
    createdAt: userData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sessionExpiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 horas
  };
  
  // Guardar la sesión en localStorage
  localStorage.setItem("userSession", JSON.stringify(userSession));
  
  return userSession;
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem("userSession");
  window.location.href = "/pages/login.php";
}

// Función para redireccionar al login
function redirectToLoginPage(returnUrl) {
  window.location.href = `/pages/login.php?returnUrl=${encodeURIComponent(returnUrl || window.location.pathname)}`;
}

// Función para generar ID único para usuarios
function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Función para obtener la sesión actual del usuario
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