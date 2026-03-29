function obtenerUsuario() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Usuario obtenido");
            resolve("Gabriel");
        }, 1000);
    });
}
function obtenerUsuarioCallback(callback) {
    obtenerUsuario()
        .then(resultado => {
            callback(null, resultado);   
        })
        .catch(error => {
            callback(error, null);      
        });
}
obtenerUsuarioCallback((error, usuario) => {
    if (error) {
        console.error("Error:", error);
        return;
    }
    
    console.log("Usuario recibido:", usuario);
    console.log("Proceso completado con callback");
});

