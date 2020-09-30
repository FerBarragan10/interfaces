document.addEventListener("DOMContentLoaded", function(e) {

    let miCanvas = document.querySelector('#tablero');
    let inicioJuego = document.querySelector('#inicio');
    let juego = new Juego(miCanvas);


    inicioJuego.addEventListener('click',function(e){
        juego = new Juego(miCanvas);
        juego.prepareJuego();
        initEvents();
        document.getElementById('info-ganador').classList.add('oculto');
        document.getElementById('info-empate').classList.add('oculto');
    });

    function initEvents() {
        miCanvas.onmousedown = function (e) {
            let x = e.layerX - e.currentTarget.offsetLeft;
            let y = e.layerY - e.currentTarget.offsetTop;            
            juego.isClickedFicha(x, y);
        }
        
        miCanvas.onmousemove = function (e) {
            let x = e.layerX - e.currentTarget.offsetLeft;
            let y = e.layerY - e.currentTarget.offsetTop;   
            if (juego.hayFichaClickeada())
                juego.moveFicha(x, y);
        }

        miCanvas.onmouseup = function (e) {
            let x = e.layerX - e.currentTarget.offsetLeft;
            let y = e.layerY - e.currentTarget.offsetTop;
            if (juego.hayFichaClickeada()){
                juego.insertarFicha(x,y);    
            }
        };
    }
});

