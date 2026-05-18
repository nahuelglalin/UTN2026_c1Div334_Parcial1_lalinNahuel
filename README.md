# Agregados

## Mejoras de estilos

Se agregaron mejoras visuales en `index.css`:

- **Hover en las cards de producto**: al pasar el cursor por encima, la card se agranda, con una transition suave.
- **Feedback al click en los botones `+` y `-`**: al estar presionados (`:active`) se oscurecen.

## ## Mejoras en cómo se muestran los montos en las vistas `formato.js`

Se agrega un archivo `formato.js` en el root del proyecto.

- Convierte un número a un string con el formato de precio argentino. Ejemplos:

- `formatearPrecio(12000)` → `"$12.000"`
- `formatearPrecio(43500)` → `"$43.500"`
- `formatearPrecio(0)` → `"$0"`

Se incluye desde ambas vistas mediante `<script src="...formato.js"></script>` antes de su JS principal, por lo que la función queda disponible globalmente
