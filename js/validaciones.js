document.addEventListener('DOMContentLoaded', function () {
  inicializarValidacionRegistro();
});


function mostrarError(input, mensaje) {
  const campo = input.closest('.form-field');
  const spanError = document.getElementById('error-' + input.id);

  if (mensaje) {
    if (campo) campo.classList.add('has-error');
    if (spanError) spanError.textContent = mensaje;
  } else {
    if (campo) campo.classList.remove('has-error');
    if (spanError) spanError.textContent = '';
  }
}

function inicializarValidacionRegistro() {
  const form = document.getElementById('form-registro');
  if (!form) return; 

  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-confirm');
  const mensajeExito = document.getElementById('mensaje-exito-registro');

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validadores = {
    nombre: function (valor) {
      if (valor.trim().length < 2) {
        return 'Ingresa tu nombre completo (mínimo 2 caracteres).';
      }
      return '';
    },
    correo: function (valor) {
      if (!regexCorreo.test(valor.trim())) {
        return 'Ingresa un correo válido, por ejemplo nombre@dominio.com.';
      }
      return '';
    },
    password: function (valor) {
      if (valor.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres.';
      }
      return '';
    },
    'password-confirm': function (valor) {
      if (valor !== password.value) {
        return 'Las contraseñas no coinciden.';
      }
      return '';
    }
  };

  function validarCampo(input) {
    const validar = validadores[input.id];
    if (!validar) return true;

    const mensaje = validar(input.value);
    mostrarError(input, mensaje);
    return mensaje === '';
  }

  const campos = [nombre, correo, password, passwordConfirm];

  campos.forEach(function (input) {
    input.addEventListener('blur', function () {
      validarCampo(input);
    });

    input.addEventListener('input', function () {
      const campo = input.closest('.form-field');
      if (campo && campo.classList.contains('has-error')) {
        validarCampo(input);
      }
    });
  });

  password.addEventListener('input', function () {
    const campoConfirm = passwordConfirm.closest('.form-field');
    if (campoConfirm && campoConfirm.classList.contains('has-error')) {
      validarCampo(passwordConfirm);
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const resultados = campos.map(validarCampo);
    const formularioValido = resultados.every(Boolean);

    if (formularioValido) {
      form.hidden = true;
      if (mensajeExito) mensajeExito.hidden = false;
    } else {

      const primerInvalido = campos.find(function (input) {
        const campo = input.closest('.form-field');
        return campo && campo.classList.contains('has-error');
      });
      if (primerInvalido) primerInvalido.focus();
    }
  });
}
