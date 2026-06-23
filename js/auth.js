/**
 * GestorFPQRS — Módulo de Autenticación
 * Login simulado, gestión de sesión y protección de rutas
 */

const Auth = {
  /**
   * Verificar credenciales contra datos simulados
   */
  login(correo, contrasena, recordar) {
    const usuario = APP_DATA.usuarios.find(
      u => u.correo === correo && u.contrasena === contrasena
    );

    if (!usuario) return null;

    const sesion = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    };

    const storage = recordar ? localStorage : sessionStorage;
    storage.setItem('gestor_sesion', JSON.stringify(sesion));

    return sesion;
  },

  /**
   * Cerrar sesión
   */
  logout() {
    sessionStorage.removeItem('gestor_sesion');
    localStorage.removeItem('gestor_sesion');
    window.location.href = 'login.html';
  },

  /**
   * Obtener sesión actual
   */
  getSesion() {
    const sesion = sessionStorage.getItem('gestor_sesion') || localStorage.getItem('gestor_sesion');
    return sesion ? JSON.parse(sesion) : null;
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    return this.getSesion() !== null;
  },

  /**
   * Proteger una página (redirigir a login si no está autenticado)
   */
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  /**
   * Renderizar info del usuario en el sidebar
   */
  renderUserInfo() {
    const sesion = this.getSesion();
    if (!sesion) return;

    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');

    if (nameEl) nameEl.textContent = sesion.nombre;
    if (roleEl) roleEl.textContent = sesion.rol;
  }
};

/* ========== Login Page Logic ========== */
$(document).ready(function () {
  // Solo ejecutar en la página de login
  if ($('#login-form').length === 0) return;

  // Si ya está autenticado, redirigir a bandeja
  if (Auth.isAuthenticated()) {
    window.location.href = 'bandeja.html';
    return;
  }

  // Toggle visibilidad de contraseña
  $('#toggle-password').on('click', function () {
    const input = $('#contrasena');
    const isPassword = input.attr('type') === 'password';
    input.attr('type', isPassword ? 'text' : 'password');
    
    const icon = isPassword ? 'eye-off' : 'eye';
    $(this).html(`<i data-lucide="${icon}" style="width:16px;height:16px;"></i>`);
  });

  // Click en cuentas demo para autocompletar
  $('.demo-account-row').on('click', function () {
    const correo = $(this).data('correo');
    const contrasena = $(this).data('contrasena');
    $('#correo').val(correo);
    $('#contrasena').val(contrasena);

    // Efecto visual
    $('.demo-account-row').removeClass('bg-light');
    $(this).addClass('bg-light');
  });

  // Submit del formulario de login
  $('#login-form').on('submit', function (e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const recordar = document.getElementById('recordarme').checked;

    // Limpiar errores previos
    $('#login-error').addClass('d-none');

    if (!correo || !contrasena) {
      $('#login-error')
        .text('Por favor ingrese correo y contraseña.')
        .removeClass('d-none');
      return;
    }

    // Simular delay de carga
    const $btn = $(this).find('button[type="submit"]');
    const btnText = $btn.html();
    $btn.prop('disabled', true).html(
      '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Verificando...'
    );

    setTimeout(() => {
      const sesion = Auth.login(correo, contrasena, recordar);

      if (sesion) {
        window.location.href = 'bandeja.html';
      } else {
        $btn.prop('disabled', false).html(btnText);
        $('#login-error')
          .text('Credenciales incorrectas. Verifique su correo y contraseña.')
          .removeClass('d-none');
        $('#contrasena').val('').focus();
      }
    }, 800);
  });
});
