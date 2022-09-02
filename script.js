
// variables globales

const tablero = document.querySelector('.tablero');

let jugadorActual = 'O';



// se crea la matriz del tablero

let matrizTablero = []
for (let i = 0; i < 7; i++) {
	matrizTablero[i] = [];	
}


// crea las casillas y las agrega al tablero

const crearCasilla = (id1,id2) => {
    const div = document.createElement('div');
    div.classList.add('casilla');
    div.id = id1.toString() + id2.toString();
    tablero.appendChild(div);
}


const clickCasilla = () => {
    tablero.querySelectorAll('.casilla').forEach(casilla => {
        casilla.addEventListener('click', ()=> {
            let idCasilla = casilla.id;
            
            pintar(idCasilla[1],casilla)
            rFilas()
            rColumnas()
            rDiagonal0()
            rDiagonal1()
        })
    })
    
}

const pintar = (id2,casilla) => {
    let pinto = false;
    for(let i=6;i>=0;i--) {
        if(pinto===false && matrizTablero[i][id2] === ' ') {             
            matrizTablero[i][id2] = jugadorActual;
            jugadorActual === 'X' ? jugadorActual = 'O' : jugadorActual = 'X';
            pinto = true;
            pintarCasilla(i,id2);
        } 
    }
    

}

const pintarCasilla = (id1,id2) => {
    const casilla = document.getElementById(id1.toString()+id2.toString());
    casilla.style.background = jugadorActual === 'X' ? '#f005' : '#0f05';
    casilla.innerHTML = jugadorActual === 'X' ? 'X' : 'O';
}


// funciones



const tresIguales = (array) => {
    console.log(array);
    let eAnt = '';
    let contX = 1;
    let contO = 1;
    
	array.forEach(e => {
        
        if(e===eAnt && e!==' ' && eAnt!=='') {
            if(e==='X') {
                contX++;
            }
            if(e==='O') {
                contO++;
            }
            if(contX===4 || contO===4){
                setTimeout(()=> {
                    jugadorActual === 'X' ? alert('gano X!') : alert('gano O')
                },500)
            }
        }
        
        eAnt=e;
        
    })
    console.log(jugadorActual)

}

const rColumnas = () => {
	let array = [];
	let pintar = [];
	for (let j=0;j<7;j++) {
		for (let i=0;i<7;i++) {
			array.push(matrizTablero[i][j]);

		}
        // hay que acomodar la comparacion
		tresIguales(array)
	    array = [];
	    pintar = [];
	}

}

const rFilas = () => {
	let array = [];
	let pintar = [];
	for (let i=0;i<7;i++) {
		for (let j=0;j<7;j++) {
			array.push(matrizTablero[i][j]);
		}
	    tresIguales(array)
	    array = [];
	    pintar = [];
	}
}

const rDiagonal0 = () => {
	let array = [];
	let pintar = [];
	for (let i=0;i<7;i++) {
	    array.push(matrizTablero[i][i]);
	}
	//tresIguales(array)
	array = [];
	pintar = [];
}

const rDiagonal1 = () => {
	let array = [];
	let pintar = [];
	let j = 2;
	for (let i=0;i<7;i++) {
	    array.push(matrizTablero[i][j]);
	    j--;		
	}
	// tresIguales(array)
	array = [];
	pintar = [];
}




const god = () => {
    
    for(let i=0;i<7;i++) {
        for(let j=0;j<7;j++) {
            matrizTablero[i][j] = ' ';
            crearCasilla(i,j);

        }
    }

    clickCasilla()
    
}

god();

