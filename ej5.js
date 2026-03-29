function esPalindromo(cadena) {
    let limpia = cadena.toLowerCase();
    let invertida = limpia.split('').reverse().join('');
    return limpia === invertida;
}
console.log(esPalindromo("oruro"));     
console.log(esPalindromo("hola"));      
