
function obtenerUsuario() {
    return new Promise(resolve => setTimeout(() => {
        console.log("Usuario obtenido");
        resolve();
    }, 1000));
}

function obtenerPosts() {
    return new Promise(resolve => setTimeout(() => {
        console.log("Posts obtenidos");
        resolve();
    }, 1000));
}

async function procesarPedido() {
    await obtenerUsuario();
    await obtenerPosts();
    console.log("Pedido completado");
}

procesarPedido();


