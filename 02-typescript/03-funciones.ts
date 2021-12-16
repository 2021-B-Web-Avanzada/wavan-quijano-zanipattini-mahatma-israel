function sumarNumeros(
    numeroInicial: number,
    ...numerosInfinitos: number[]
): number {
    return numeroInicial;
}

sumarNumeros(1, 2, 3, 4, 5);

function imprimir(mensaje: string): void {
    console.log("Hola", + mensaje);
}

const arregloNumeros: number[] = [1, 2];
const arregloNumeros2: Array<number> = [1, 2];
const arregloNumeros3: (number | string | boolean)[] = [1, "dos", true];
const arregloNumeros4: Array<number | string | boolean> = [1, "dos", true];
let arregloNumeros5: number[] | string[] = [1, 2];
arregloNumeros5 = ["uno", "dos"];