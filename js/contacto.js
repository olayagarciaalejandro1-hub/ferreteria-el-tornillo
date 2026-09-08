/**
 * Ferretería El Tornillo - Lógica de Interacción y Validación de Contacto
 * JavaScript Vanilla (Sin librerías externas)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos del formulario y alertas
  const form = document.getElementById('formulario-contacto');
  const inputNombre = document.getElementById('nombre');
  const inputMensaje = document.getElementById('mensaje');
  const alertBox = document.getElementById('mensaje-estado');
  const hintNombre = document.getElementById('hint-nombre');

  // Menú móvil
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // ---------------------------------------------------------------------------
  // 1. Control del Menú Móvil (Responsivo)
  // ---------------------------------------------------------------------------
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Funciones auxiliares para mostrar y limpiar mensajes
  // ---------------------------------------------------------------------------
  function mostrarAviso(tipo, mensaje) {
    if (!alertBox) return;

    alertBox.hidden = false;
    alertBox.className = 'alert-box'; // Limpiar clases anteriores

    if (tipo === 'warning') {
      alertBox.classList.add('alert-warning');
      alertBox.innerHTML = `<span>⚠️</span> <div><strong>Atención:</strong> ${mensaje}</div>`;
    } else if (tipo === 'success') {
      alertBox.classList.add('alert-success');
      alertBox.innerHTML = `<span>✅</span> <div><strong>¡Éxito!</strong> ${mensaje}</div>`;
    }
  }

  function limpiarAviso() {
    if (!alertBox) return;
    alertBox.hidden = true;
    alertBox.className = 'alert-box';
    alertBox.innerHTML = '';
  }

  function marcarErrorNombre(mensajeError) {
    inputNombre.classList.add('input-error');
    if (hintNombre) {
      hintNombre.classList.add('hint-error');
      hintNombre.textContent = mensajeError;
    }
  }

  function limpiarErrorNombre() {
    inputNombre.classList.remove('input-error');
    if (hintNombre) {
      hintNombre.classList.remove('hint-error');
      hintNombre.textContent = 'Debe tener al menos 2 caracteres.';
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Validación en tiempo real al escribir
  // ---------------------------------------------------------------------------
  inputNombre.addEventListener('input', () => {
    const valor = inputNombre.value.trim();
    if (valor.length >= 2) {
      limpiarErrorNombre();
      // Si el mensaje actual es de advertencia por el nombre, lo ocultamos
      if (alertBox.classList.contains('alert-warning')) {
        limpiarAviso();
      }
    }
  });

  if (inputMensaje) {
    inputMensaje.addEventListener('input', () => {
      if (inputMensaje.value.trim().length > 0 && alertBox.classList.contains('alert-warning')) {
        limpiarAviso();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Manejo del Evento de Envío (Submit)
  // ---------------------------------------------------------------------------
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevenir recarga de la página

      const nombre = inputNombre.value.trim();
      const mensaje = inputMensaje ? inputMensaje.value.trim() : '';

      // Validación requerida: El nombre debe tener al menos 2 caracteres
      if (nombre.length < 2) {
        const errorMsg = 'Debes ingresar un nombre válido con al menos 2 caracteres.';
        mostrarAviso('warning', errorMsg);
        marcarErrorNombre(errorMsg);
        inputNombre.focus();
        return;
      }

      // Validación adicional: Mensaje no puede estar completamente vacío
      if (mensaje.length === 0) {
        mostrarAviso('warning', 'Por favor, escribe tu mensaje o consulta antes de enviar.');
        if (inputMensaje) inputMensaje.focus();
        return;
      }

      // Si todo es válido: mostrar mensaje de éxito y resetear formulario
      limpiarErrorNombre();
      mostrarAviso(
        'success',
        `¡Gracias por comunicarte con nosotros, ${nombre}! Hemos recibido tu consulta y te responderemos a la brevedad.`
      );

      form.reset();
    });
  }
});
