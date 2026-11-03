# Registro de tiempos de desarrollo — TIEMPO.md

Este documento recoge la dedicación al microfrontend
Descubrimiento del proyecto tienda-ucjc-descubrimiento.

Los tiempos iniciales conservan el registro existente.
Los tiempos posteriores son aproximaciones retrospectivas
y el reparto de responsables es una propuesta para revisión del equipo.

## Tareas iniciales

| Punto | Tarea | Tiempo registrado |
| :---: | :--- | :---: |
| 1 | Formación del equipo, asignación del responsable y comunicación a coordinación | 1 min |
| 2 | Creación del repositorio e invitación al profesor | 5 min |
| 3 | Redacción inicial del README con pieza, integrantes, responsable y Custom Element | 5 min |
| 4 | Inicialización con Vite y renderizado básico del Custom Element | 15 min |
| 5 | Borrador de eventos y definición inicial de payloads | 30 min |
| 6 | Creación del archivo TIEMPO.md | 5 min |
| **Total** | **Tareas iniciales** | **1 h 01 min** |

## Desglose inicial

1. Organización del equipo, designación de Daniel Molina Vitón
   como responsable y comunicación de los datos del proyecto.

2. Creación del repositorio tienda-ucjc-descubrimiento
   e invitación de colaboración al profesor.

3. Redacción de los datos identificativos del equipo
   y del Custom Element `<ucjc-descubrimiento>`.

4. Configuración del entorno con Vite, ejecución de
   `npm run dev` y comprobación del renderizado inicial.

5. Preparación del borrador de eventos
   `ucjc:cart:add-item`, `ucjc:session:changed`
   y `ucjc:cart:updated`.
   Estos nombres corresponden al borrador inicial,
   anterior a la adaptación al contrato definitivo.

6. Creación del registro de tiempos y cálculo
   de la dedicación inicial.

## Desarrollo y preparación de la entrega

Los tiempos de esta tabla son aproximaciones retrospectivas,
no mediciones exactas. Los responsables indican un reparto propuesto
que deberá validar el equipo.

| Punto | Tarea | Responsable propuesto | Tiempo aproximado |
| :---: | :--- | :--- | :---: |
| 7 | Catálogo con productos fijos y ficha de detalle | Juan Cruz Romero | 1 h |
| 8 | Búsqueda, filtros y ordenación del catálogo | Jaime Moraleda Lorán | 1 h |
| 9 | Adaptación del evento de añadir al carrito y comprobación del payload | Mario González Baranda | 30 min |
| 10 | Actualización del README y del registro de tiempos | Jaime Nicolás Mas | 30 min |
| 11 | Preparación de la página de demostración, compilación de remote.js y configuración del workflow | Jaime Nicolás Mas | 45 min |
| **Total** | **Desarrollo y preparación** | **Equipo Descubrimiento** | **3 h 45 min** |

## Comprobaciones pendientes de cierre

| Tarea | Responsable propuesto | Tiempo previsto |
| :--- | :--- | :---: |
| Comprobar el despliegue y las URL de GitHub Pages | Jaime Nicolás Mas | 15 min |
| Comprobar la integración dentro del shell y la comunicación con Compra | Daniel Molina Vitón y Mario González Baranda | 30 min |
| Revisar la entrega y crear el tag v0.2.0 | Daniel Molina Vitón | 15 min |
| **Total** | **Equipo Descubrimiento** | **1 h** |

Las comprobaciones anteriores se marcarán como completadas
cuando se hayan realizado, sustituyendo la previsión
por el tiempo empleado.

## Relación con los contratos

### Responsabilidades de Descubrimiento

Según la hoja A, nuestra pieza se encarga de:

- Mostrar la lista de productos.
- Buscar productos por texto.
- Mostrar los detalles de los productos.

Quedan fuera de nuestra responsabilidad:

- Inicio de sesión: equipo de Identidad.
- Gestión del carrito: equipo de Compra.
- Procesamiento del pago: equipo de Datos/Pedidos.

### Comunicación con otros equipos

La hoja B de Carrito recoge el intercambio de identificador
de producto, precio, nombre y cantidad.

La implementación actual emite el evento:

`ucjc:descubrimiento:anadir-al-carrito@1`

Con los siguientes campos:

| Campo | Tipo |
| :--- | :--- |
| productoId | string |
| nombre | string |
| precio | number |
| cantidad | number |

La hoja B de Identidad contempla recibir información
del identificador y tipo de usuario.

Las hojas B contienen nombres de eventos provisionales.
Los nombres exactos y los tipos de los campos deben coincidir
con el contrato definitivo compartido entre los equipos.

## Resumen

| Bloque | Tiempo |
| :--- | :---: |
| Tareas iniciales registradas | 1 h 01 min |
| Desarrollo y preparación: aproximación retrospectiva | 3 h 45 min |
| Subtotal registrado y aproximado | 4 h 46 min |
| Comprobaciones pendientes: previsión | 1 h |
| Total previsto de todas las tareas | 5 h 46 min |

Los totales anteriores suman la duración de las tareas
consideradas en secuencia; no son horas por persona.
Si hubo trabajo simultáneo, esta suma no representa
el tiempo transcurrido del equipo y deberá ajustarse
para completar el apartado real de la hoja C.

## Estimación de la hoja C

La hoja C pide estimaciones en horas de equipo,
no horas individuales acumuladas.

Para la semana 1 aparecen estas estimaciones:

| Miembro | Estimación de horas de equipo |
| :--- | :---: |
| Daniel Molina Vitón | 3 h |
| Mario González Baranda | 2 h |
| Juan Cruz Romero | 2 h |
| Jaime Moraleda Lorán | 2 h |
| Jaime Nicolás Mas | 2 h |

La mediana de las estimaciones es 2 horas.
Las 11 horas anotadas en la hoja corresponden a la suma,
no a la mediana.

El tiempo real de cada semana y la tarea con mayor desviación
se completarán en la hoja C tras revisar el trabajo del equipo.