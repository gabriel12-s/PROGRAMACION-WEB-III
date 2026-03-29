
// Ejercicio 12: Callbacks Anidados

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
            console.log("Se acabo el proceso");
        });
    });
});



//Ejercicio 12: async/await
function obtenerUsuario() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Usuario obtenido");
            resolve();
        }, 1000);
    });
}
function obtenerPosts() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Posts obtenidos");
            resolve();
        }, 1000);
    });
}
function obtenerComentarios() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Comentarios obtenidos");
            resolve();
        }, 1000);
    });
}

async function procesarTodo() {
    await obtenerUsuario();
    await obtenerPosts();
    await obtenerComentarios();
    
}
procesarTodo();




