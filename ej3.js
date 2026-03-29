
function contarParImp(numeros) {
    const resultado = { pares: 0, impares: 0 }; 
    for (let num of numeros) {
        if (num % 2 === 0) {
            resultado.pares++;
        } else {
            resultado.impares++;
        }
    }
    return resultado;
}
console.log(contarParImp([1, 2, 3, 4, 5, 6]));

