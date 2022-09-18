
class Jugador {
    constructor(xo,color,txt){
        this.xo = xo;
        this.color = color;
        this.puntaje = 1;
        this.puntajeTotal = 0;
        this.ganarArray = [];
        this.elementoTxt = document.querySelector('.txt-'+xo);
        this.txt = txt
    }
}

const j1 = new Jugador('j1','#f00','JUGADOR 1: ');
const j2 = new Jugador('j2','#0j0','JUGADOR 2: ');


class Tablero {
    constructor(filas,columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.tablero = [];
        this.jugador = j2;
        this.win = false;
        this.contColumnas = [6,6,6,6,6,6,6];
        this.pintando = false;
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

    pintarColumna(id2,i) {
        
        for (let j=0;j<i;j++) {
            setTimeout(() => {
                setTimeout(() => {
                    this.tablero[j][id2[1]].classList.remove(this.jugador.xo);
                    
                }, 200 + j * 50)
                this.tablero[j][id2[1]].classList.add(this.jugador.xo);
            }, j * 50)
        }  
    }

    jugadorActual() {
        this.jugador === j2 ? this.jugador = j1 : this.jugador = j2;
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

            this.cuatroIguales(fila);
            this.cuatroIguales(columna);
            fila = [];
            columna = [];
        }

        for (let i = 1 - this.tablero.length; i < this.tablero.length; i++) {
            for (let x = -Math.min(0, i), y = Math.max(0, i); x < this.tablero.length && y < this.tablero.length; x++, y++) {
                diagonal0.push(this.tablero[y][x]);
                diagonal1.push(this.tablero[y][this.tablero.length - 1 - x]);
    
            }
            this.cuatroIguales(diagonal0);
            this.cuatroIguales(diagonal1);
    
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
                    this.jugador.puntajeTotal++;
                    this.jugador.elementoTxt.innerHTML = this.jugador.txt + this.jugador.puntajeTotal;
                    this.pintarWin(this.jugador.ganarArray);
                    this.contColumnas = [6,6,6,6,6,6,6];
                    this.win = true;
                }
                
            }
            if(XO!==XOant) {
                this.jugador.puntaje = 1;
                this.jugador.ganarArray = []; 
            }             
            eAnt = e;
            XOant = XO;             
        });
        
        this.jugador.ganarArray = []; 
           
    }

    pintarWin(ganarArray) {
        ganarArray.forEach(e=>{
            e.classList.add('casilla-win');
        })
        this.animacionWin();
    }

    animacionWin() {
        for (let i = 1 - this.tablero.length; i < this.tablero.length; i++) {
            for (let x = -Math.min(0, i), y = Math.max(0, i); x < this.tablero.length && y < this.tablero.length; x++, y++) {
                setTimeout(() => {
                    this.tablero[y][x].classList.remove('casilla');
                    this.tablero[y][x].classList.remove('j1');
                    this.tablero[y][x].classList.remove('j2');
                    this.tablero[y][x].innerHTML = '';
                    this.win = false;
                }, 1000 + y * 100)
                setTimeout(() => {
                    this.tablero[y][x].classList.add('casilla');
                    this.tablero[y][x].classList.remove('casilla-win');
                }, 2000 + x * 100)
    
            }
        }
    }
}

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
        if(t.win === false && t.pintando === false) {
            t.jugadorActual()
            this.pintarCasilla();
            
        }
       
    }

    pintarCasilla() {

        let id2 = this.elemento.id
        let i = parseInt(t.contColumnas[id2[1]]);
        t.pintando = true;
        
        if (i >= 0) {
            
            t.pintarColumna(id2,i);
            parseInt(t.contColumnas[id2[1]]--); 
            
            let casilla = document.getElementById(i.toString()+id2[1].toString());
            
            setTimeout(()=>{
                casilla.classList.add(t.jugador.xo);            
                casilla.innerHTML = t.jugador.xo;  
                t.recorrerTablero();              
            },100 + i * 50)

            setTimeout(()=>{t.pintando = false;},1000 - i * 50);
            
        }

    }
}

t.rellenarTablero();