// Ejercicio 13: Promesas Anidadas
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

obtenerUsuario()
    .then(() => obtenerPosts())
    .then(() => obtenerComentarios())
    .then(() => {
        console.log(" Todo el proceso finalizó");
    });


// Ejercicio 13: Async/Await
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



