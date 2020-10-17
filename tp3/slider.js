/*let imagenes=['images/tapa.jpg','images/dobby.jpg','images/escenaAragog.jpg','images/grafitis.jpg','images/basilisco.jpg'];
let contador=0;


function carrousel(contenedor){
    contenedor.addEventListener('click', e=>{
        let atras=document.querySelector('.atras');
        let siguiente=document.querySelector('.siguiente');
        let img=document.querySelector('.img');

    
        tgt=e.target;
        img.src = imagenes[ contador++ ];
        if(tgt==atras){
            if(contador>0){
                img.src=imagenes[contador - 1 ];
                contador--;
            }else{
                img.src=imagenes[imagenes.length - 1 ];
                contador=imagenes.length - 1;
            }
        }else if(tgt==siguiente){
                if(contador<imagenes.length - 1){
                    img.src=imagenes[contador + 1];
                    contador++;
                }else{
                    img.src=imagenes[0];
                    contador=0;
                }

        }
    });
}
document.addEventListener('DOMContentLoaded',() => {
    let contenedor=document.querySelector('.contenedor');
    carrousel(contenedor);
})

*/
window.onload = function () {
    // Variables
    const IMAGENES = [
        'images/scenas/tapa.jpg',
        'images/scenas/dobby.jpg',
        'images/scenas/grafitis.jpg',
        'images/scenas/escenaAragog.jpg',
        'images/scenas/basilisco.jpg',
    ];
    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;
    let posicionActual = 0;
    let $botonRetroceder = document.querySelector('#retroceder');
    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagen = document.querySelector('#imagen');
    let $botonPlay = document.querySelector('#play');
    let $botonStop = document.querySelector('#stop');
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
        $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
    }

    /**
     * Activa el autoplay de la imagen
     */
    function playIntervalo() {
        intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
        // Desactivamos los botones de control
        $botonAvanzar.setAttribute('disabled', true);
        $botonRetroceder.setAttribute('disabled', true);
        $botonPlay.setAttribute('disabled', true);
        $botonStop.removeAttribute('disabled');

    }

    /**
     * Para el autoplay de la imagen
     */
    function stopIntervalo() {
        clearInterval(intervalo);
        // Activamos los botones de control
        $botonAvanzar.removeAttribute('disabled');
        $botonRetroceder.removeAttribute('disabled');
        $botonPlay.removeAttribute('disabled');
        $botonStop.setAttribute('disabled', true);
    }

    // Eventos
    $botonAvanzar.addEventListener('click', pasarFoto);
    $botonRetroceder.addEventListener('click', retrocederFoto);
    $botonPlay.addEventListener('click', playIntervalo);
    $botonStop.addEventListener('click', stopIntervalo);
    // Iniciar
    renderizarImagen();
} 