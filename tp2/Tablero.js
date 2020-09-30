class Tablero{
    constructor(ctx){
        this.ctx = ctx;
        this.filas=7;
        this.columnas=6;
        this.ranuras = [];
        this.ranurasX = [];
        this.ranurasY = [];
        this.limiteY = 93;
        this.direccionGanador = '';
        this.cuatroEnLinea = false;
        this.hayGanador = false;
        this.jugador=0;
        this.inicioRanuraGanadora = {'x':0, 'y':0};
        this.finalRanuraGanadora = {'x':0, 'y':0};
        this.initRanuras();
    }
    dibujarTablero() {
        this.ctx.fillStyle = "#d2cf76";
        this.ctx.fillRect(0,0,1100,450);            
        this.ctx.fillStyle="#ecd008";
        this.ctx.fillRect(260,95,600,460);
        for (let columna = 0; columna < this.ranurasX.length; columna++) {
            for (let fila = 0; fila < this.ranurasY.length; fila++) {
               let ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                ficha.dibujar();
            }   
        }
    }

    initRanuras() {
        let diferenciaX = 95;
        let fxInit = 320;
        let fy = 130;
        let diferenciaY = 65;
        for (let y = 0; y < this.filas; y++) {
            let fx = fxInit;
            this.ranuras[fy+'-fila'] = [];
            for (let x = 0; x < this.columnas; x++) {
                let ficha = new Ficha (fx, fy, 'ranuras', 0);
                ficha.setContext(this.ctx);  
                this.ranuras[fy+'-fila'][fx+'-columna'] = ficha;
                this.ranurasX.push(fx);
                fx += diferenciaX;
            } 
            this.ranurasY.push(fy);
            fy += diferenciaY;           
        }
    }
    pudoInsertarFicha(x, y, fichaActual) {
        if (y < this.limiteY && x > 250 && x < 850)
            return this.buscarRanura(x, fichaActual);
        return false;
    } 

    buscarRanura(x, fichaActual) {
        for(var i = 0; i < this.filas; i++) {
            if (this.ranurasX[i] > x - 25 && this.ranurasX[i] < x + 25){
                return this.insertarFicha(this.ranurasX[i], fichaActual);
            }                    
        };
        return false;
    }

    insertarFicha(x, fichaActual) {
        var posTmpY = -1;
        var pudoInsertar = false;        

        for (let y = 0; y < this.ranurasY.length; y++) {
            var tmpy = this.ranurasY[y];
            if (this.ranuras[tmpy+'-fila'][x+'-columna'].getJugador() === 0){
                posTmpY = tmpy;
                pudoInsertar = true;
            }
        }
        if (posTmpY !== -1) {
            fichaActual.setX(x);
            fichaActual.setY(posTmpY);
            fichaActual.setEstado('inactiva');
            this.ranuras[posTmpY+'-fila'][x+'-columna'] = fichaActual;
        }        
        return pudoInsertar;  
    }

    comprobarVertical() {
        let contador = 0;
        for (let columna = 0; columna < this.columnas; columna++) {
            contador = 0;
            for (let fila = 0; fila < this.filas; fila++) {
                var ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                var valor = ficha.getJugador();
                if (valor === 0) {
                    contador = 0;
                   
                }
                else if (valor !== this.jugador){
                    this.jugador = valor;
                    contador = 1;
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                }
                else
                    contador++;
                
                if (contador === 4){                    
                    this.hayGanador = true; 
                    this.direccionGanador = 'vertical';
                    this.finalRanuraGanadora.x = columna;
                    this.finalRanuraGanadora.y = fila;                  
                    return this.hayGanador;
                }                
            }
        }
        this.finalRanuraGanadora.x = 0;
        this.finalRanuraGanadora.y = 0;
        return this.hayGanador;
    }

    comprobarHorizontal() {
        let contador = 0;
        for (let fila = 0; fila < this.filas; fila++) {
            contador = 0;
            for (let columna = 0; columna < this.columnas; columna++) {
                let ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                let valor = ficha.getJugador();
                if (valor === 0) {
                    contador = 0;
                }
                else if (valor !== this.jugador){
                    this.jugador = valor;
                    contador = 1;
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                }
                else
                    contador++;
                
                if (contador === 4){
                    this.hayGanador = true;
                    this.direccionGanador = 'horizontal';
                    this.finalRanuraGanadora.x = columna;
                    this.finalRanuraGanadora.y = fila;
                    return this.hayGanador;
                }
            }
        }
        this.finalRanuraGanadora.x = -1;
        this.finalRanuraGanadora.y = -1;
        return this.hayGanador;
    }

   

    comprobarDiagonalDerecha() {
        for (let fila = 3; fila < this.filas; fila++) {
            for (let columna = 0; columna < 3; columna++) {
                let valorTmpY = fila;
                let valorTmpX = columna;
                let valor = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                if (valor !== 0) {
                    for (let indice = 0; indice < 3; indice++) {
                        valorTmpY--;
                        valorTmpX++;
                        let valorTmp = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                        if (valor !== valorTmp)
                           break;    
                        if (indice === 2)
                           this.cuatroEnLinea = true;   
                    }
                }

                if (this.cuatroEnLinea){
                    this.hayGanador = true;
                    this.direccionGanador = 'diagonalDerecha';
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                    this.finalRanuraGanadora.x = valorTmpX;
                    this.finalRanuraGanadora.y = valorTmpY;
                    return hayGanador;
                }
            }
        }
        this.finalRanuraGanadora.x = -1;
        this.finalRanuraGanadora.y = -1;
        return this.hayGanador;
    }

    comprobarDiagonalIzquierda() {
        for (let fila = 6; fila > 2; fila--) {
            for (let columna = 5; columna > 2; columna--) {
                let valorTmpY = fila;
                let valorTmpX = columna;
                let valor = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                if (valor !== 0) {
                    for (let indice = 0; indice < 3; indice++) {
                        valorTmpY--;
                        valorTmpX--;
                        let valorTmp = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                        if (valor !== valorTmp)
                            break;
                        if (indice === 2)
                        this.cuatroEnLinea = true;
                    }
                }

                if (this.cuatroEnLinea){
                    this.hayGanador = true;
                    this.direccionGanador = 'diagonalIzquierda';
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                    this.finalRanuraGanadora.x = valorTmpX;
                    this.finalRanuraGanadora.y = valorTmpY;                    
                    return hayGanador;
                }
            }
        }
        this.finalRanuraGanadora.x = 0;
        this.finalRanuraGanadora.y = 0;
        return this.hayGanador;
    }

    comprobarDiagonal(){
        if (this.comprobarDiagonalDerecha() || this.comprobarDiagonalIzquierda())
            this.hayGanador = true;
        return this.hayGanador;
    }
}