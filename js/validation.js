document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initPasswordToggle();
  initDemoButtons();
  
  checkExistingSession();
});

function initLoginForm() {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('loginErrorMessage');
  
  if (!loginForm) return;
  
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
      showError('Por favor, completa todos los campos');
      return;
    }
    

    const userInfo = {
      id: 'user123',
      name: 'Usuario de Prueba',
      email: email,
      customerType: 'casual',
      createdAt: new Date().toISOString()
    };
    
    saveUserSession(userInfo, rememberMe);
    
    const returnUrl = getParameterByName('returnUrl') || '/index.html';
    window.location.href = returnUrl;
  });
  
  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
  }
}

function initPasswordToggle() {
  const toggleBtn = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  if (!toggleBtn || !passwordInput) return;
  
  toggleBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = type === 'password' ? 'far fa-eye' : 'far fa-eye-slash';
    }
  });
}

function initDemoButtons() {
  const demoButtons = document.querySelectorAll('.demo-login');
  
  demoButtons.forEach(button => {
    button.addEventListener('click', () => {
      const customerType = button.dataset.type;
      
      const userInfo = {
        id: `demo_${customerType}`,
        name: `Cliente ${capitalizeFirstLetter(customerType)}`,
        email: `demo_${customerType}@example.com`,
        customerType: customerType,
        createdAt: new Date().toISOString()
      };
      
      saveUserSession(userInfo, false);
      
      const returnUrl = getParameterByName('returnUrl') || '/index.html';
      window.location.href = returnUrl;
    });
  });
}

function checkExistingSession() {
  const userSession = getUserSession();
  
  if (userSession) {
    const returnUrl = getParameterByName('returnUrl') || '/index.html';
    window.location.href = returnUrl;
  }
}

function saveUserSession(userInfo, rememberMe) {
  const sessionInfo = {
    ...userInfo,
    timestamp: new Date().getTime(),
    sessionExpiry: rememberMe ? new Date().getTime() + (30 * 24 * 60 * 60 * 1000) : null // 30 días si rememberMe es true
  };
  
  localStorage.setItem('userSession', JSON.stringify(sessionInfo));
  
  window.userAuthenticated = true;
  window.currentUser = sessionInfo;
  
  const loginEvent = new CustomEvent('userLogin', { detail: sessionInfo });
  document.dispatchEvent(loginEvent);
}

function getUserSession() {
  const sessionData = localStorage.getItem('userSession');
  
  if (!sessionData) return null;
  
  try {
    const session = JSON.parse(sessionData);
    
    if (session.sessionExpiry && new Date().getTime() > session.sessionExpiry) {
      localStorage.removeItem('userSession');
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error al obtener la sesión del usuario:', error);
    return null;
  }
}


function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  
  if (!results) return null;
  if (!results[2]) return '';
  
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}