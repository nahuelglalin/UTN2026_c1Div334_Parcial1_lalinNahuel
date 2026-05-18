function obtenerCarrito() 
{
    const carritoString = localStorage.getItem("carrito");
    if (carritoString === null) {
        return [];
    }
    return JSON.parse(carritoString);
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");

    // Leo el carrito del LocalStorage
    const carrito = obtenerCarrito();

    // Acumulador del monto total a pagar
    let total = 0;

    // Por cada producto del carrito, creo una fila con sus 3 celdas (nombre, cantidad, precio)
    carrito.forEach(producto => {
        total = total + producto.cantidad * producto.precio;

        const fila = document.createElement("tr");

        // Le agrego una class para que, en caso de que se limpie el carrito, pueda actualizar la vista
        fila.classList.add("fila-producto");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = producto.nombre;

        const celdaCantidad = document.createElement("td");
        celdaCantidad.textContent = producto.cantidad;

        const celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = formatearPrecio(producto.precio);

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaPrecio);

        tabla.appendChild(fila);
    });

    // Una vez recorrido todo el carrito, actualizo el h2 con el monto total a pagar
    const valorFinal = document.getElementById("valor-final");
    valorFinal.textContent = `El valor final a pagar es de: ${formatearPrecio(total)}`;
}

function limpiarCarrito()
{
    // Limpio el localStorage (carrito)
    localStorage.clear();

    // Actualizo la vista con el carrito vacio
    const filasProductos = document.querySelectorAll(".fila-producto");
    filasProductos.forEach(fila => fila.remove());

    // Reseteo el monto total a pagar a $0 ya que el carrito quedo vacio
    const valorFinal = document.getElementById("valor-final");
    valorFinal.textContent = `El valor final a pagar es de: ${formatearPrecio(0)}`;

    // Muestro el alert indicando que el carrito fue limpiado correctamente
    alert("Carrito limpiado correctamente");
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});