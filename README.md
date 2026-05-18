# Agregados

## Mejoras de estilos

Se agregaron mejoras visuales en `index.css`:

- **Hover en las cards de producto**: al pasar el cursor por encima, la card se agranda, con una transition suave.
- **Feedback al click en los botones `+` y `-`**: al estar presionados (`:active`) se oscurecen.

## Mejoras en cómo se muestran los montos en las vistas `formato.js`

Se agrega un archivo `formato.js` en el root del proyecto.

- Convierte un número a un string con el formato de precio argentino. Ejemplos:

- `formatearPrecio(12000)` → `"$12.000"`
- `formatearPrecio(43500)` → `"$43.500"`
- `formatearPrecio(0)` → `"$0"`

Evidencia del resultado (se pueden ver los montos formateados)

<img width="1889" height="628" alt="image" src="https://github.com/user-attachments/assets/95da54f4-6898-4c77-a941-f2284a8019af" />

<img width="1915" height="352" alt="image" src="https://github.com/user-attachments/assets/1bc07ac2-4a32-45a6-b783-70cd526db1cb" />


Se incluye desde ambas vistas mediante `<script src="...formato.js"></script>` antes de su JS principal, por lo que la función queda disponible globalmente
