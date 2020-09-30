class Juego{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tablero = new Tablero(this.ctx);
        this.fichas = [];
        this.turno = 1;
        this.fichaActual = null;
        this.posInicialX;
        this.posInicialY;
        this.jugador1 = new Jugador (this.ctx, 'Jugador 1', 1);
        this.jugador2 = new Jugador (this.ctx, 'Jugador 2', 2);
        this.cantidadFichas = 44;
        this.isFichaClickeada = false;
        this.isJuegoFinalizado = false;
        this.dibujarFichas();
        this.iniciarJuego();
    }

    dibujarFichasJugador(xTmpInit, cara, jugador) {
        var tmpY = 200;
        for (var fila = 0; fila < 5; fila++) {
            let tmpX = xTmpInit;
            for(var columna = 0; columna < 4; columna++) {
                let ficha = new Ficha (tmpX, tmpY, cara, jugador);
                ficha.setContext(this.ctx);
                this.fichas.push(ficha);
                tmpX += 40;
            }
            tmpY += 40;
        } 
    }
    dibujarFichas(){
        this.dibujarFichasJugador(80, 'jugador1', this.jugador1);
        this.dibujarFichasJugador(925, 'jugador2', this.jugador2);
    }

    

    iniciarJuego() {
        this.tablero.dibujarTablero();       
    }

    prepareJuego(){        
        this.tablero.dibujarTablero();       
        this.setFichas();
        this.marcarTurnoActual();
    }

    setFichas() {
        for (var i = 0; i < this.fichas.length; i++){
            this.fichas[i].dibujar();
        }
    }

    marcarTurnoActual() {
        if (this.turno === 1){
            document.querySelector('#jugador1').classList.add('turno');
            document.querySelector('#jugador2').classList.remove('turno');
        }
        else if(this.turno === 2) {
            document.querySelector('#jugador2').classList.add('turno');
            document.querySelector('#jugador1').classList.remove('turno');
        }
        else{
            document.querySelector('#jugador1').classList.remove('turno');
            document.querySelector('#jugador2').classList.remove('turno');
        }
    }

    isClickedFicha(x, y) {       
        for (var i=0; i<this.fichas.length; i++) {
                let fichaTmp = this.fichas[i];
            if (fichaTmp.isClicked(x, y) && fichaTmp.getJugador() === this.turno && fichaTmp.getEstado() !== 'inactiva' && !this.isJuegoFinalizado) {
                this.fichaActual = fichaTmp;
                this.isFichaClickeada = true;
                this.fichas.splice(i,1);     
                this.posInicialX = this.fichaActual.x;
                this.posInicialY = this.fichaActual.y;    
                return true;
            }                
        }
    }

    hayFichaClickeada() {
        return this.isFichaClickeada;
    }

    moveFicha(x, y) {
        this.fichaActual.x = x;
        this.fichaActual.y = y;
        this.fichas.push(this.fichaActual);
        this.prepareJuego();
    }

    resetFichaClickeada() {
        this.fichaActual = null;
        this.isFichaClickeada = false;
    }

    insertarFicha(x, y){

        if(this.tablero.pudoInsertarFicha(x, y, this.fichaActual)){
            this.cantidadFichas--;
            if (this.hayGanador()) {
                var mensajeGanador = document.querySelector('#info-ganador');
                if(this.turno === 1)
                    mensajeGanador.innerHTML = 'Ganó el Jugador 1!!!';
                else
                    mensajeGanador.innerHTML = 'Ganó el Jugador 2!!!';
                mensajeGanador.classList.remove('oculto');
                this.isJuegoFinalizado = true;
            }
            else if(this.cantidadFichas === 0){
                this.isJuegoFinalizado = true;
                let alerta = document.querySelector('#info-empate');
                alerta.classList.remove('oculto');
            }
            else
                if (this.turno === 1) 
                this.turno=2
                else
                 this.turno=1;
        }
        else{
            this.fichaActual.x = this.posInicialX;
            this.fichaActual.y = this.posInicialY;
            this.fichas.push(this.fichaActual);
        }
        this.resetFichaClickeada();
        this.prepareJuego();
    }

    hayGanador(){
        let hayGanador = false;
        if(this.tablero.comprobarVertical() || this.tablero.comprobarHorizontal() ||
        this.tablero.comprobarHorizontal() || this.tablero.comprobarDiagonal()) 
            hayGanador = true;
        return hayGanador;
    }
}