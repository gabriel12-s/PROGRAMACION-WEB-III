function obtenerUsuario(callback) {
    setTimeout(() => {
        console.log("Usuario obtenido");
        callback();
    }, 1000);
}

function obtenerPosts(callback) {
    setTimeout(() => {
        console.log("Posts obtenidos");
        callback();
    }, 1000);
}

function obtenerComentarios(callback) {
    setTimeout(() => {
        console.log("Comentarios obtenidos");
        callback();
    }, 1000);
}

obtenerUsuario(() => {
    obtenerPosts(() => {
        obtenerComentarios(() => {
           
        });
    });
});


