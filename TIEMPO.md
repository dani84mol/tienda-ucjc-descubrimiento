# Registro de tiempos de desarrollo — TIEMPO.md

Este documento recoge el tiempo dedicado al desarrollo del microfrontend **Descubrimiento** del proyecto `tienda-ucjc-descubrimiento`.

## Resumen de tareas iniciales

| Punto | Tarea / Entregable | Tiempo invertido |
| :---: | :--- | :---: |
| 1 | Formación del equipo, asignación de responsable y envío de correo a la coordinación | 1 min |
| 2 | Creación del repositorio en GitHub e invitación enviada al profesor César | 5 min |
| 3 | Redacción inicial del README.md: pieza, integrantes, responsable y Custom Element | 5 min |
| 4 | Inicialización del proyecto Vite y renderizado básico del Custom Element | 15 min |
| 5 | Redacción del borrador de eventos a emitir y consumir y definición de payloads | 30 min |
| 6 | Creación y formateo del archivo TIEMPO.md | 5 min |
| **Total** | **Tiempo total de las tareas iniciales** | **1 h 01 min** |

## Desglose de tareas iniciales

1. **Formación del equipo (1 min):** Organización del equipo, designación del responsable y envío del correo informativo con el nombre del equipo, integrantes, responsable y URL del repositorio.

2. **Creación del repositorio (5 min):** Creación y configuración del repositorio remoto en GitHub y envío de la invitación de colaboración al profesor César.

3. **README inicial (5 min):** Redacción de los datos identificativos: pieza asignada, miembros del equipo, responsable y nombre del Custom Element `<ucjc-descubrimiento>`.

4. **Inicialización con Vite (15 min):** Configuración del entorno base, arranque del servidor de desarrollo mediante `npm run dev` y comprobación de la renderización básica «Soy Descubrimiento».

5. **Borrador de eventos (30 min):** Elaboración del borrador inicial de eventos DOM `ucjc:cart:add-item`, `ucjc:session:changed` y `ucjc:cart:updated`, con sus emisores, receptores y payloads. Estos nombres corresponden al borrador inicial; la adaptación al contrato definitivo se registra por separado.

6. **Registro de tiempos (5 min):** Creación del archivo `TIEMPO.md` y registro de la dedicación a las tareas iniciales.

## Desarrollo y preparación de la entrega

Los responsables y tiempos pendientes se completarán con la dedicación real de cada integrante. Las tareas sin finalizar se registrarán al terminarlas.

| Punto | Tarea / Entregable | Responsable | Tiempo invertido |
| :---: | :--- | :--- | :---: |
| 7 | Desarrollo del catálogo con datos fijos, búsqueda, filtros, ordenación y ficha de producto | Por completar | Por completar |
| 8 | Adaptación al evento ucjc:descubrimiento:anadir-al-carrito@1 | Por completar | Por completar |
| 9 | Revisión y actualización del README para ajustarlo al proyecto | Jaime Nicolás Mas | Por completar |
| 10 | Preparación de la página de demostración y comprobación de remote.js | Por completar | Por completar |
| 11 | Corrección del workflow y comprobación del despliegue en GitHub Pages | Por completar | Por completar |
| 12 | Pruebas finales y creación del tag de entrega | Por completar | Por completar |

## Descripción de las tareas de entrega

7. **Catálogo con datos fijos:** Implementación del catálogo local en `src/productos.js`, búsqueda por nombre, filtros por categoría, precio y talla, ordenación y consulta de la ficha de producto.

8. **Evento del contrato definitivo:** Adaptación de la acción Añadir para emitir `ucjc:descubrimiento:anadir-al-carrito@1`, con los campos `productoId`, `nombre`, `precio` y `cantidad`.

9. **Actualización del README:** Sustitución del texto de plantilla por la descripción real del componente, tecnologías utilizadas, comandos de ejecución, estructura, evento e instrucciones de integración.

10. **Módulo y página de demostración:** Preparación de `public/index.html` para cargar `remote.js` y comprobación de la compilación mediante `npm run build` y `npm run preview`.

11. **Publicación en GitHub Pages:** Corrección del archivo `.github/workflows/deploy.yml`, configuración de Pages y comprobación de las URL de la página y del módulo publicado.

12. **Verificación y tag:** Comprobación del catálogo y del evento emitido en la versión publicada y creación del tag que identifica la entrega.

## Tiempo total

- **Tareas iniciales:** 61 minutos (1 h 01 min).
- **Desarrollo y preparación de la entrega:** pendiente de completar.
- **Dedicación total acumulada del equipo:** pendiente de calcular.

El total final se calculará sumando los tiempos registrados. Si varias personas trabajan simultáneamente, la suma representa la dedicación acumulada del equipo.