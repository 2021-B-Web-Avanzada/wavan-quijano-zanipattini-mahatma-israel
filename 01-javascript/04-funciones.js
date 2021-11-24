function soloNumeros(a, b, c) {
    return a + b - c;
}

function soloLetras(a, b, c) {
    console.log(a, b, c);
}

const funcion1 = () => {};
var funcion2 = () => {};
let function3 = () => {};

funcion1();
funcion2();
function3();

const function4 = (x) => x + 1;

const function5 = x => x + 1;

const function8 = (x, y, z) => x + y + z;

function4();
function5()

// Parametros infinitos
function sumarNumeros(...otrosNumeros) {
    let total = 0;
    otrosNumeros.forEach(
        (valorActual) => {
            total = total + valorActual;
        }
    );
    return total;
}

sumarNumeros(1, 2, 3, 4, 5, 6, 7, 8, 9);