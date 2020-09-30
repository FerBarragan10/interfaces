class Ficha{
    constructor(x, y, cara, jugador){
        this.x = x;
        this.y = y;
        this.radio = 28;
        this.jugador = jugador;
        this.estado = '';
        this.imagen = new Image();
        this.getSrc(cara)
    }

    getSrc(cara) {
         if (cara === 'ranuras')
            this.imagen.src = 'images/FichaVacia.png';
        else if(cara === 'jugador1')
            this.imagen.src = 'images/Fichaj1.png';
        else if (cara === 'jugador2')
            this.imagen.src = 'images/Fichaj2.png';
        
    }

    getJugador(){
        if (this.jugador === 0)
            return this.jugador;
        else 
            return this.jugador.getNroJugador();
    }

    getNombre() {
        return this.jugador.getNombre();
    }

    getEstado() {
        return this.estado;
    }

    setContext(ctx){
        this.ctx = ctx;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setColor(cara){
        this.cara = cara;
    }

    setEstado(estado) {
        this.estado = estado;
    }

    isClicked(x, y) {
        let xLayer = x - this.x;
        let yLayer = y - this.y;
        return Math.sqrt(xLayer*xLayer + yLayer*yLayer) < this.radio;
    }

    dibujar(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI*2);
        this.ctx.fillStyle = '#d2cf76';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(this.imagen, this.x - this.radio - 6, this.y - this.radio - 6);
    }
}
	