
class Jugador {
    constructor(xo,color,msgWin){
        this.xo = xo;
        this.color = color;
        this.puntaje = 1;
        this.puntajeTotal = 0;
        this.ganarArray = [];
        this.txt = msgWin;
    }
}

const j1 = new Jugador('j1','#f00','Gano el jugador 1');
const j2 = new Jugador('j2','#0j0','Gano el jugador 2');


class Tablero {
    constructor(filas,columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.tablero = [];
        this.jugador = j2;
        this.win = false;
        this.contColumnas = [6,6,6,6,6,6,6];
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
                let c = new Casilla('casilla',i.toString()+j.toString())
                let casilla = c.crearCasilla();
                tablero[i][j] = casilla;
                divTablero.appendChild(casilla);
            }
        }
        this.tablero = tablero;
    }

    jugadorActual() {
        this.jugador === j2 ? this.jugador = j1 : this.jugador = j2;
        console.log(this.jugador.xo);
    }

    recorrerTablero() {
        
        let fila = [];
        let columna = [];
        let diagonal0 = [];
        let diagonal1 = []; 
        
        
        for(let i=0;i<this.filas;i++) {
            for(let j=0;j<this.columnas;j++) {
                fila.push(this.tablero[i][j]);
                columna.push(this.tablero[j][i]);

            }

            // this.cuatroIguales(fila);
            this.cuatroIguales(columna);
            fila = [];
            columna = [];
        }

        for (let i = 1 - this.tablero.length; i < this.tablero.length; i++) {
            for (let x = -Math.min(0, i), y = Math.max(0, i); x < this.tablero.length && y < this.tablero.length; x++, y++) {
                diagonal0.push(this.tablero[y][x]);
                diagonal1.push(this.tablero[y][this.tablero.length - 1 - x]);
    
            }
            // this.cuatroIguales(diagonal0);
            // this.cuatroIguales(diagonal1);
    
            diagonal0 = [];
            diagonal1 = [];
        }
    }

    cuatroIguales(casillas) {

        let XOant = '';
        let eAnt;

        casillas.forEach(e => {
            
            let XO = e.innerHTML;
            
            if(XO === XOant && XOant !== '') {
                if(this.jugador.puntaje===1) {this.jugador.ganarArray.push(eAnt);}
                this.jugador.puntaje++;                
                this.jugador.ganarArray.push(e);
                 
                if(this.jugador.puntaje === 4) {
                    console.log('gano!!! '+this.jugador.xo);
                    this.pintarWin(this.jugador.ganarArray);
                }
                
            } 
            eAnt = e;
            XOant = XO;
        });
        this.jugador.puntaje = 1;
        this.jugador.ganarArray = [];     
    }

    pintarWin(ganarArray) {
        console.log(ganarArray)
        ganarArray.forEach(e=>{
            e.style.background = '#00f'
        })
    }

   
}

/* let XOanterior='';
        let cont= 1;

        casillas.forEach(e=> {
            let XO = e.innerHTML;
            
            if(XO===XOanterior && XOanterior!=='') {
                console.log('entro')
                cont++;
                if(cont===4) {
                    this.win = true;
                    console.log('gano!!!')                 
                }                
            }
            XOanterior=XO;
        }) */

const t = new Tablero(7,7);

class Casilla {
    constructor(clase,id) {
        this.clase = clase;
        this.id = id;
        this.elemento = '';
        this.pinto = false;
        
    }

    crearCasilla() {
        let casilla = document.createElement('div');
        casilla.classList.add(this.clase);
        casilla.id = this.id;
        casilla.innerHTML = '';
        casilla.addEventListener('click',()=>{
            this.clickCasilla();
        });
        this.elemento = casilla
        return casilla;
    }

    clickCasilla() {
        t.jugadorActual()
        this.pintarCasilla();
        t.recorrerTablero();
    }

    pintarCasilla() {
        t.jugador.xo;
        let id2 = this.elemento.id

        let i = parseInt(t.contColumnas[id2[1]]);
        if (t.win === false && i >= 0) {
            parseInt(t.contColumnas[id2[1]]--); 
            let casilla = document.getElementById(i.toString()+id2[1].toString());

            casilla.classList.add(t.jugador.xo);            
            casilla.innerHTML = t.jugador.xo;
        }

    }
}

t.rellenarTablero();