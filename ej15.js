function obtenerUsuarioCallback(callback) {
    setTimeout(() => {
        console.log("Usuario obtenido (con callback)");
        callback(null, "Gabriel");   
    }, 1000);
}
function obtenerUsuarioPromesa() {
    return new Promise((resolve, reject) => {
        obtenerUsuarioCallback((error, resultado) => {
            if (error) {
                reject(error);        
            } else {
                resolve(resultado);   
            }
        });
    });
}
obtenerUsuarioPromesa()
    .then(usuario => {
        console.log("Usuario recibido:", usuario);
        console.log("Proceso completado con promesa");
    })
    .catch(error => {
        console.error(" Error:", error);
    });

    