//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    const carritoString = localStorage.getItem("carrito");
    if (carritoString === null) {
        return [];
    }
    return JSON.parse(carritoString);
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para obtener el nombre y precio del producto desde el event.target 
function obtenerProductoDesdeEvento(e)
{
    const card = e.target.parentElement;
    const nombre = card.querySelector(".nombre-producto").textContent;

    // Limpio el simbolo "$" y los puntos de miles que agrega el formato argentino antes de parsear
    const precioTexto = card.querySelector(".precio-producto").textContent.replace("$", "").replace(/\./g, "");
    const precio = parseInt(precioTexto, 10);

    return { nombre, precio };
}

function sumarAlCarrito(e) 
{
    // Obtengo el nombre y precio del producto desde la card en la que esta el boton clickeado
    const productoClickeado = obtenerProductoDesdeEvento(e);

    // Obtengo el carrito del LocalStorage
    const carrito = obtenerCarrito();

    // Busco si el producto ya existia en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === productoClickeado.nombre);

    if (productoExistente === undefined) {
        // Si no existe, lo agrego con cantidad una cantidad de 1
        carrito.push({ nombre: productoClickeado.nombre, precio: productoClickeado.precio, cantidad: 1 });
    } else {
        // Si existe, incremento la prop cantidad
        productoExistente.cantidad = productoExistente.cantidad + 1;
    }

    // Imprimo en consola como quedo el carrito previo a subirlo al LocalStorage
    console.log(carrito);

    guardarCarrito(carrito);

    // Muestro alert indicando que el producto fue agregado al carrito
    alert(`Un/una: ${productoClickeado.nombre} fue agregado al carrito`);
}

function restarDelCarrito(e)
{
    // Obtengo el nombre del producto desde la card en la que esta el boton clickeado
    const productoClickeado = obtenerProductoDesdeEvento(e);

    // Obtengo el carrito del LocalStorage
    const carrito = obtenerCarrito();

    // Si el carrito esta totalmente vacio, solo muestro el alert y termino la función
    if (carrito.length === 0) {
        alert("No hay ningún producto guardado en el carrito");
        return;
    }

    // Busco si el producto ya existia en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === productoClickeado.nombre);

    if (productoExistente === undefined) {
        // Si el producto no existia previamente, solo muestro el alert
        alert(`No hay más ${productoClickeado.nombre} en el carrito`);
        return;
    }

    // Si existia, decremento la prop cantidad en 1
    productoExistente.cantidad = productoExistente.cantidad - 1;

    // Si la cantidad llego a 0, lo saco del array para que no quede almacenado
    if (productoExistente.cantidad === 0) {
        const indice = carrito.indexOf(productoExistente);
        carrito.splice(indice, 1);
    }

    guardarCarrito(carrito);

    // Muestro alert indicando que el producto fue eliminado/decrementado del carrito
    alert(`Un/una: ${productoClickeado.nombre} fue eliminado del carrito`);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));

    // Reformateo cada precio del catalogo al formato argentino (ej: "$12000" -> "$12.000")
    document.querySelectorAll(".precio-producto").forEach(elem => {
        const precio = parseInt(elem.textContent.replace("$", ""), 10);
        elem.textContent = formatearPrecio(precio);
    });
});
