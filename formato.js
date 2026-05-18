// Funcion global en un archivo JS externo, para formatear los numeros como precios en formato argentino (ej: 12000 -> "$12.000")
function formatearPrecio(numero)
{
    return `$${numero.toLocaleString("es-AR")}`;
}
