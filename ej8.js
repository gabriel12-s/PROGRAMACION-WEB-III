
function ejecutarCallback(callback) {
    setTimeout(callback, 2000);
}

ejecutarCallback(() => {
    console.log("¡Hola mundo!");
});

