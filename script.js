
class Jugador {
    constructor(xo,color,msgWin){
        this.xo = xo;
        this.color = color;
        this.puntaje = 0;
        this.txt = msgWin;
    }
}
class Tablero {
    constructor(filas,columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.tablero = [];
    }

    crearTablero() {
        let tablero = [];
        for (let i=0;i<this.filas;i++) {
            tablero[i] = [];	
        }
        return tablero
    }

    rellenarTablero() {
        const divTablero = document.getElementById('tablero');
        let tablero = this.crearTablero();
        for(let i=0;i<this.filas;i++) {
            for(let j=0;j<this.columnas;j++) {
                let c = new Casilla('casilla','#222',i.toString()+j.toString())
                let casilla = c.crearCasilla();
                tablero[i][j] = casilla;
                divTablero.appendChild(casilla);
            }
        }
        this.tablero = tablero;
    }
}

const t = new Tablero(7,7);

class Casilla {
    constructor(clase,color,id) {
        this.clase = clase;
        this.color = color;
        this.id = id;
    }

    crearCasilla() {
        let casilla = document.createElement('div');
        casilla.classList.add(this.clase);
        casilla.style.background = this.color;
        casilla.id = this.id;
    }
}

t.rellenarTablero();