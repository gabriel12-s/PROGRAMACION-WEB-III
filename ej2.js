function invertir(frase) {
    let palabras = frase.split(" ");                
    let resultado = palabras.map(palabra => {
        return palabra.split("").reverse().join("");
    });
    return resultado.join(" ");
}
console.log(invertir("Hola Mundo"));
