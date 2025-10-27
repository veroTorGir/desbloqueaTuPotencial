// --- Datos simulados de usuarios ---
const usuarios = [
  { email: 'abc123@example.com', password: '123456' },
  { email: 'vero@example.com', password: 'miClaveSegura' },
];

// --- Estado de sesión ---
let usuarioActivo = null;

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('continue-btn');
  if (btn) btn.addEventListener('click', iniciarSesion);
  actualizarNavbar();
});

// --- Función para iniciar sesión ---
function iniciarSesion() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (usuario) {
    usuarioActivo = usuario;
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario)); // Guardar sesión
    alert('✅ Inicio de sesión exitoso. Bienvenido ' + email);
    actualizarNavbar();
    mostrarBienvenida();
  } else {
    alert('❌ Correo o contraseña incorrectos.');
  }
}

// --- Mostrar bienvenida ---
function mostrarBienvenida() {
  document.getElementById('main-content').innerHTML = `
    <div style="text-align:center;margin-top:100px;">
      <h2>¡Bienvenido ${usuarioActivo.email}!</h2>
      <p>Has iniciado sesión correctamente.</p>
    </div>
  `;
}

// --- Cerrar sesión ---
function cerrarSesion() {
  usuarioActivo = null;
  localStorage.removeItem('usuarioActivo');
  alert('🔒 Sesión cerrada.');
  window.location.reload();
}

// --- Actualizar texto del navbar ---
function actualizarNavbar() {
  const loginLink = document.getElementById('login-link');
  const usuarioGuardado = localStorage.getItem('usuarioActivo');

  if (usuarioGuardado) {
    usuarioActivo = JSON.parse(usuarioGuardado);
    loginLink.textContent = 'Cerrar Sesión';
    loginLink.onclick = cerrarSesion;
  } else {
    loginLink.textContent = 'Iniciar Sesión';
    loginLink.onclick = () => navigate('iniciar-sesion');
  }
}

// --- Navegación entre vistas ---
function navigate(view) {
  const main = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('.navbar a');

  navLinks.forEach((link) => link.classList.remove('active'));
  const activeLink = [...navLinks].find((link) =>
    link.textContent.toLowerCase().includes(view.replace('-', ' '))
  );
  if (activeLink) activeLink.classList.add('active');

  switch (view) {
    case 'contenido':
      main.innerHTML =
        "<h2 style='text-align:center;margin-top:100px;'>Vista de Contenido (en construcción)</h2>";
      break;
    case 'cronograma':
      main.innerHTML =
        "<h2 style='text-align:center;margin-top:100px;'>Vista de Cronograma (en construcción)</h2>";
      break;
    case 'prioridades':
      main.innerHTML =
        "<h2 style='text-align:center;margin-top:100px;'>Vista de Prioridades (en construcción)</h2>";
      break;
    case 'registrarse':
      main.innerHTML = `
        <div class="login-container">
          <h2>Crear cuenta</h2>
          <input type="email" id="nuevoEmail" placeholder="Correo electrónico">
          <input type="password" id="nuevoPassword" placeholder="Contraseña">
          <button id="btnRegistro">Registrarse</button>
        </div>
      `;
      document
        .getElementById('btnRegistro')
        .addEventListener('click', registrarUsuario);
      break;
    default:
      // Vista de inicio de sesión
      window.location.reload();
  }
}

// --- Registro de nuevos usuarios ---
function registrarUsuario() {
  const email = document.getElementById('nuevoEmail').value.trim();
  const password = document.getElementById('nuevoPassword').value.trim();

  if (!email || !password) {
    alert('Por favor completa todos los campos');
    return;
  }

  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    alert('Ese correo ya está registrado');
    return;
  }

  usuarios.push({ email, password });
  alert('✅ Cuenta creada correctamente. Ahora puedes iniciar sesión.');
  navigate('iniciar-sesion');
}
