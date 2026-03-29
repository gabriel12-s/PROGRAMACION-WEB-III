function contarVocales(texto){
    const resultado = { a: 0, e: 0, i:0, o:0,u:0};
    texto = texto.toLowerCase();
     for(let l of texto){
        if (l in resultado){
            resultado[l]++;
        }
     }
     return resultado;
}
console.log(contarVocales("eeeei"))

