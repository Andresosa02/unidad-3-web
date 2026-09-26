// Validación del formulario con Bootstrap
// (basado en el ejemplo oficial: https://getbootstrap.com/docs/5.3/forms/validation/)

const formulario = document.getElementById('formInscripcion');

// Creamos el modal de Bootstrap a partir del <div id="modalExito"> del HTML
const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
const textoModal = document.getElementById('textoModal');

formulario.addEventListener('submit', (evento) => {
    // Evitamos que la página se recargue al enviar
    evento.preventDefault();

    // checkValidity() revisa los atributos HTML5: required, pattern, type="email", min, max...
    if (formulario.checkValidity()) {
        // Personalizamos el mensaje con el nombre y la categoría que escribió el usuario
        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria');
        const textoCategoria = categoria.options[categoria.selectedIndex].text;
        textoModal.textContent = `Bienvenido, ${nombre}. Juegas en la categoría ${textoCategoria}.`;

        modalExito.show();
        lanzarConfeti();

        formulario.classList.remove('was-validated');
        formulario.reset();
    } else {
        // was-validated hace que Bootstrap pinte los campos en rojo (mal) o verde (bien)
        formulario.classList.add('was-validated');
    }
});

// Al presionar "Limpiar" también quitamos los colores de validación
formulario.addEventListener('reset', () => {
    formulario.classList.remove('was-validated');
});

// Confeti con los colores de la página, disparado desde las dos esquinas de abajo
function lanzarConfeti() {
    const colores = ['#0f7a3d', '#ffc93c', '#ffffff'];
    const duracion = 2000; // milisegundos
    const fin = Date.now() + duracion;

    // requestAnimationFrame repite la función en cada cuadro de animación hasta que pase el tiempo
    (function disparar() {
        // zIndex alto para que el confeti salga por encima del modal
        confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors: colores, zIndex: 2000 });
        confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors: colores, zIndex: 2000 });

        if (Date.now() < fin) {
            requestAnimationFrame(disparar);
        }
    })();
}
