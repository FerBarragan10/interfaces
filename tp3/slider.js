
window.onload = function () {
    // Variables
    const IMAGENES = [
        'images/scenas/tapa.jpg',
        'images/scenas/dobby.png',
        'images/scenas/autovolador.png',
        'images/scenas/duelo.png',
        'images/scenas/grafitis.jpg',
        'images/scenas/quidicth.png',
        'images/scenas/escenaAragog.jpg',
        'images/scenas/diarioTomRidle.png',
        'images/scenas/camara-secreta.png',
        'images/scenas/basilisco.jpg',
        'images/scenas/Harryderrota.png',
        'images/scenas/tomRiddleMuere.png',
        'images/scenas/dumbledore.png',
        'images/scenas/dobbyLibre.png',


    ];
    const TIEMPO_INTERVALO_MILESIMAS_SEG = 3000;
    let posicionActual = 0;
    let botonRetroceder = document.querySelector('#retroceder');
    let botonAvanzar = document.querySelector('#avanzar');
    let imagen = document.querySelector('#imagen');
    let botonPlay = document.querySelector('#play');
    let botonStop = document.querySelector('#stop');
    let intervalo;

    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    function pasarFoto() {
        if(posicionActual >= IMAGENES.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function retrocederFoto() {
        if(posicionActual <= 0) {
            posicionActual = IMAGENES.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen () {
        imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
    }

    /**
     * Activa el autoplay de la imagen
     */
    function playIntervalo() {
        intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
        // Desactivamos los botones de control
        botonAvanzar.setAttribute('disabled', true);
        botonRetroceder.setAttribute('disabled', true);
        botonPlay.setAttribute('disabled', true);
        botonStop.removeAttribute('disabled');

    }

    /**
     * Para el autoplay de la imagen
     */
    function stopIntervalo() {
        clearInterval(intervalo);
        // Activamos los botones de control
        botonAvanzar.removeAttribute('disabled');
        botonRetroceder.removeAttribute('disabled');
        botonPlay.removeAttribute('disabled');
        botonStop.setAttribute('disabled', true);
    }

    // Eventos
    botonAvanzar.addEventListener('click', pasarFoto);
    botonRetroceder.addEventListener('click', retrocederFoto);
    botonPlay.addEventListener('click', playIntervalo);
    botonStop.addEventListener('click', stopIntervalo);
    // Iniciar
    renderizarImagen();
} 