# Tienda UCJC - Descubrimiento

Repositorio del micro-frontend de **Descubrimiento** para el proyecto conjunto *Tienda UCJC*.

---

## 1. Información del Equipo

- **Pieza:** Descubrimiento (Catálogo, búsqueda y ficha de producto).
- **Custom Element:** `<ucjc-descubrimiento>`
- **Responsable:** Daniel Molina Vitón
- **Integrantes:**
  - Daniel Molina Vitón (Responsable)
  - [Nombre y Apellidos Integrante 2]
  - [Nombre y Apellidos Integrante 3]
  - [Nombre y Apellidos Integrante 4]
  - [Nombre y Apellidos Integrante 5]

---

## 2. Borrador de Contrato de Eventos (Propuesta v1)

## 5. Borrador de Eventos (Emitidos y Consumidos)

### Eventos Emitidos
* **`cart:item-added` (v1.0.0)**
  * **Descripción:** Se dispara cuando el usuario hace clic en el botón "Añadir al carrito" desde la ficha o el catálogo de productos.
  * **Payload (`detail`):**
    ```json
    {
      "productId": "prod_12345",
      "title": "Camiseta UCJC Edición Especial",
      "price": 19.99,
      "quantity": 1,
      "currency": "EUR"
    }
    ```

### Eventos Consumidos
* **`session:changed` (v1.0.0)**
  * **Origen:** Micro-frontend de Identidad (`<ucjc-identidad>`).
  * **Propósito:** Permite personalizar la experiencia de navegación (ej. mostrar precios especiales, estado de favoritos o saludo personalizado).
  * **Payload esperado (`detail`):**
    ```json
    {
      "isAuthenticated": true,
      "userId": "usr_98765"
    }
    ```# Especificación de Eventos del DOM: Microfrontend Descubrimiento

La comunicación entre microfrontends se realiza exclusivamente mediante eventos del DOM (`window.dispatchEvent` / `window.addEventListener`) utilizando `CustomEvent`.

## Reglas Generales

* **Formato de nombres:** `ucjc:dominio:accion` (ej. `ucjc:cart:add-item`).
* **Control de versiones:** Todos los *payloads* incluyen el campo obligatorio `version` para permitir la evolución del contrato sin romper la compatibilidad.

---

## Tabla Resumen

| Evento | Tipo | Emisor | Receptor |
| :--- | :--- | :--- | :--- |
| `ucjc:cart:add-item` | Emitido | Descubrimiento | Compra |
| `ucjc:session:changed` | Consumido | Identidad | Descubrimiento |
| `ucjc:cart:updated` | Consumido *(Opcional)* | Compra | Descubrimiento |

---

## Eventos Emitidos (Outbound)

### `ucjc:cart:add-item`

* **Descripción:** Emitido cuando el usuario pulsa «Añadir al carrito» desde el catálogo o la ficha de producto.
* **Destinatario:** Compra
* **Payload (`event.detail`):**

```json
{
  "version": 1,
  "productId": "prod-101",
  "sku": "TSHIRT-BLUE-M",
  "name": "Camiseta Técnica UCJC",
  "price": 19.99,
  "currency": "EUR",
  "quantity": 1,
  "imageUrl": "[https://example.com/images/prod-101.jpg](https://example.com/images/prod-101.jpg)"
}