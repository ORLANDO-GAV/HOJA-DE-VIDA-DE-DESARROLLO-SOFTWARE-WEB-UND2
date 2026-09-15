// ==========================================================
// script.js
// Lógica de navegación entre páginas y del formulario
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  marcarPestanaActiva();
  activarTransicionEntrePaginas();
  activarFormularioContacto();
});

/**
 * Detecta en qué página estamos (por el archivo HTML actual)
 * y le agrega la clase "activo" al enlace del menú correspondiente.
 */
function marcarPestanaActiva() {
  const enlaces = document.querySelectorAll('nav a');
  let archivoActual = window.location.pathname.split('/').pop();

  if (archivoActual === '' || archivoActual === undefined) {
    archivoActual = 'index.html';
  }

  enlaces.forEach((enlace) => {
    const archivoEnlace = enlace.getAttribute('href').split('/').pop();
    if (archivoEnlace === archivoActual) {
      enlace.classList.add('activo');
    } else {
      enlace.classList.remove('activo');
    }
  });
}

/**
 * Agrega un pequeño efecto de fundido de salida cuando el usuario
 * hace clic en un enlace del menú, antes de cargar la nueva página.
 * Esto es lo que da la sensación de "cambio de pestaña" animado.
 */
function activarTransicionEntrePaginas() {
  const pagina = document.querySelector('.pagina');
  const enlaces = document.querySelectorAll('nav a');

  enlaces.forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
      const destino = enlace.getAttribute('href');

      // Si el enlace ya es la página activa, no hacemos nada especial
      if (enlace.classList.contains('activo')) {
        return;
      }

      evento.preventDefault();

      pagina.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      pagina.style.opacity = '0';
      pagina.style.transform = 'translateY(-8px)';

      setTimeout(() => {
        window.location.href = destino;
      }, 220);
    });
  });
}

/**
 * Valida y "envía" el formulario de contacto sin recargar la página.
 * Como esto es un sitio estático (sin backend), la lógica muestra
 * un mensaje de éxito o de error según los campos.
 */
function activarFormularioContacto() {
  const formulario = document.getElementById('form-contacto');
  if (!formulario) return; // Solo existe en contacto.html

  const mensajeEstado = document.getElementById('mensaje-estado');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');

    let esValido = true;

    [nombre, correo, mensaje].forEach((campo) => campo.classList.remove('campo-error'));

    if (nombre.value.trim() === '') {
      nombre.classList.add('campo-error');
      esValido = false;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());
    if (!correoValido) {
      correo.classList.add('campo-error');
      esValido = false;
    }

    if (mensaje.value.trim() === '') {
      mensaje.classList.add('campo-error');
      esValido = false;
    }

    if (!esValido) {
      mensajeEstado.textContent = 'Por favor completa todos los campos correctamente.';
      mensajeEstado.className = 'mensaje-estado error';
      return;
    }

    // Aquí, en un proyecto real, se enviaría el formulario a un servidor.
    mensajeEstado.textContent = `¡Gracias, ${nombre.value.trim()}! Tu mensaje fue registrado.`;
    mensajeEstado.className = 'mensaje-estado exito';
    formulario.reset();
  });
}
