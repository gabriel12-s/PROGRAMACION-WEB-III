
function encontrarMayorYMenor(numeros) {
    if (numeros.length === 0) {
        return null; 
    }
    let mayor = numeros[0];
    let menor = numeros[0];
    for (let num of numeros) {
        if (num > mayor) {
            mayor = num;
        }
        if (num < menor) {
            menor = num;
        }
    }
    return { mayor, menor };
}
console.log(encontrarMayorYMenor([3, 1, 4, 1, 5, 9]));

