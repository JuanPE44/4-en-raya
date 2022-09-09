
// variables globales

const tablero = document.querySelector('.tablero');

let jugadorActual = 'O';
let win = false;
let animacion = false;



// se crea la matriz del tablero

let matrizTablero = []
for (let i = 0; i < 7; i++) {
	matrizTablero[i] = [];	
}



// se crea la matriz codigo de tres dimensiones

let matrizIds = []
for (let i = 0; i < 7; i++) {
	matrizIds[i] = [];	
}

// se rellena la matriz con los respectivos ids

for (let j = 0; j<7; j++) {
	for (let i = 0; i < 7; i++) {
		matrizIds[i][j] = '' + i + '' + j;
	}
}



// crea las casillas y las agrega al tablero

const crearCasilla = (id1,id2) => {
    const div = document.createElement('div');
    div.classList.add('casilla');
    div.id = id1.toString() + id2.toString();
    tablero.appendChild(div);
    return div;
}


const clickCasilla = () => {
    tablero.querySelectorAll('.casilla').forEach(casilla => {
        casilla.addEventListener('click', ()=> {
            let idCasilla = casilla.id;
            
            pintar(idCasilla[1])            
        })
    })
    
}

const animacionPintar = (id2,j) => {
  
    
    for(let i=0;i<=j;i++) {
          
        console.log('entro')   
        jugadorActual === 'O' ? clase = 'casilla-X' : clase ='casilla-O';
        
        setTimeout(()=>{
            setTimeout(()=>{
                matrizTablero[i][id2].classList.remove(clase)
            },500+ i*50) 
            matrizTablero[i][id2].classList.add(clase)
        },300 + i*50)      
    }
   
}

const pintar = (id2) => {
    let pinto = false;
    let num = 2;
    console.log(animacion)
    for(let i=6;i>=0;i--) {
        if(pinto===false && matrizTablero[i][id2].innerHTML === '' && animacion === false) {                         
            
            animacionPintar(id2,i)
            animacion = true
            setTimeout(()=> {
                jugadorActual === 'X' ? jugadorActual = 'O' : jugadorActual = 'X';
               
                pintarCasilla(i,id2);
                rFilas()
                rColumnas()
                rDiagonal0()
                rDiagonal1()
                animacion= false;
            },1500 - 5* num++)
        } 
    }
}

const pintarWin = (pintar) => {
    console.log('array pintar: '+pintar)
    for(let i=0;i<4;i++) {
        const div = document.getElementById(pintar[i]);
        div.classList.add('casilla-ganador');
    }	
    
}

const pintarCasilla = (id1,id2) => {
    const casilla = document.getElementById(id1.toString()+id2.toString());
    jugadorActual === 'X' ? casilla.classList.add('casilla-X') : casilla.classList.add('casilla-O');
    casilla.innerHTML = jugadorActual === 'X' ? 'X' : 'O';
    console.log(jugadorActual)
}


// funciones



const tresIguales = (casillas) => {
    
    let eAnt = '';
    let contenidoAnt = '';
    let contX = 1;
    let contO = 1;
    let pintarX = [];
    let pintarO = [];
	casillas.forEach(e => {
        
        
        let contenido = e.innerHTML
        if(contenido===contenidoAnt && contenido!==' ' && contenidoAnt!=='') {
            
            if(contenido==='X') {
                pintarX.push(eAnt.id)
                contX++;
                
            }
            if(contenido==='O') {
                pintarO.push(eAnt.id)
                contO++;
                
            }
            if(contX===4 || contO===4){  
                if (jugadorActual === 'X') {
                    pintarX.push(e.id);
                    pintarWin(pintarX)
                } else {
                    pintarO.push(e.id)
                    pintarWin(pintarO);
                }                     
             
                
                return win = true;                
            }
        }    
        contenidoAnt = contenido;    
        eAnt=e;    
        
    })
    pintarX = [];
    pintarO = [];
}

const rColumnas = () => {
	let casillas = [];

    for (let j=0;j<7;j++) {
		for (let i=0;i<7;i++) {
			casillas.push(matrizTablero[i][j]);
            
		}
      
		tresIguales(casillas)
     
	    casillas = [];
        
	    
	}

}

const rFilas = () => {
	let casillas = [];

	for (let i=0;i<7;i++) {
		for (let j=0;j<7;j++) {
			casillas.push(matrizTablero[i][j]);

		}
	   tresIguales(casillas)
        
       casillas = [];

	}
}

const rDiagonal0 = () => {
	let casillas = [];

    for (let i=1-matrizTablero.length;i<matrizTablero.length;i++) {        
        for (let x= -Math.min(0, i), y= Math.max(0, i); x < matrizTablero.length && y < matrizTablero.length; x++, y++) {
            casillas.push(matrizTablero[y][x]);     
    
        }
        tresIguales(casillas);
       
        casillas = [];
       
    }
    
	
}

const rDiagonal1 = () => {
	let casillas = [];
	
    for (let i=1-matrizTablero.length;i<matrizTablero.length;i++) {        
        for (let x= -Math.min(0, i), y= Math.max(0, i); x < matrizTablero.length && y < matrizTablero.length; x++, y++) {
            casillas.push(matrizTablero[y][matrizTablero.length-1-x]);      
          
        }        
        tresIguales(casillas);
      
        casillas = [];
   
    }
    
}




const god = () => {
    
    for(let i=0;i<7;i++) {
        for(let j=0;j<7;j++) {
            
            matrizTablero[i][j] = crearCasilla(i,j);

        }
    }

    clickCasilla()
    
}

god();

