# Tienda UCJC - Descubrimiento

Repositorio del micro-frontend de **Descubrimiento** para el proyecto conjunto *Tienda UCJC*.

---

## 1. Información del Equipo

- **Pieza:** Descubrimiento (Catálogo, búsqueda y ficha de producto).
- **Custom Element:** `<ucjc-descubrimiento>`
- **Responsable:** Daniel Molina Vitón
- **Integrantes:**
  - Daniel Molina Vitón (Responsable)
  - Mario González Baranda
  - Juan Cruz Romero
  - Jaime Moraleda Loran
  - Jaime Nicolás Mas

---

## 2. Borrador de Contrato de Eventos (Propuesta v1)

La comunicación se realiza exclusivamente mediante eventos desacoplados del DOM (`window.dispatchEvent` / `window.addEventListener`) utilizando `CustomEvent`.

### Eventos Emitidos (Outbound)

#### 1. `ucjc:cart:add-item`
Emitido cuando el usuario pulsa en «Añadir al carrito» desde el catálogo o la ficha de producto.
- **Destinatario principal:** Micro-frontend de *Compra*.
- **Payload (`event.detail`):**
```json
{
  "productId": "prod-101",
  "name": "Camiseta Técnica UCJC",
  "price": 19.99,
  "currency": "EUR",
  "quantity": 1,
  "sku": "TSHIRT-BLUE-M",
  "imageUrl": "[https://example.com/images/prod-101.jpg](https://example.com/images/prod-101.jpg)"
}