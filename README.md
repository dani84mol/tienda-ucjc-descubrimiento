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
  - [Nombre y Apellidos Integrante 5]

---

## 2. Borrador de Contrato de Eventos (Propuesta v1)

La comunicación se realiza exclusivamente mediante eventos del DOM (window.dispatchEvent / window.addEventListener) con CustomEvent.
Formato de los nombres: ucjc:dominio:accion (por ejemplo, ucjc:cart:add-item).
Versión: todos los payloads incluyen un campo version para poder evolucionar el contrato.
Resumen:
Evento	Tipo	Emisor	Receptor
ucjc:cart:add-item	Emitido	Descubrimiento	Compra
ucjc:session:changed	Consumido	Identidad	Descubrimiento
ucjc:cart:updated	Consumido (opcional)	Compra	Descubrimiento

2.1 Eventos Emitidos (Outbound)
Evento: ucjc:cart:add-item. Emitido cuando el usuario pulsa «Añadir al carrito» desde el catálogo o la ficha de producto.
Destinatario: Compra.
Payload (event.detail):

json
{
  "version": 1,
  "productId": "prod-101",
  "sku": "TSHIRT-BLUE-M",
  "name": "Camiseta Técnica UCJC",
  "price": 19.99,
  "currency": "EUR",
  "quantity": 1,
  "imageUrl": "https://example.com/images/prod-101.jpg"
}

2.2 Eventos Consumidos (Inbound)
Evento: ucjc:session:changed. Emitido por Identidad al iniciar o cerrar sesión. Descubrimiento lo usa para saludar al usuario y, en el futuro, mostrar precios para alumnos.
Emisor: Identidad.
Payload esperado (event.detail):

json
{
  "version": 1,
  "isAuthenticated": true,
  "userId": "user-123",
  "name": "Ana López",
  "role": "student"
}

Evento: ucjc:cart:updated. Emitido por Compra cuando cambia el carrito. Descubrimiento lo usa para marcar «Ya en tu carrito» en el catálogo y en la ficha.
Emisor: Compra.
Payload esperado (event.detail):

json
{
  "version": 1,
  "items": [
    {
      "productId": "prod-101",
      "sku": "TSHIRT-BLUE-M",
      "quantity": 2
    }
  ],
  "totalItems": 2
}

2.3 Dudas para negociar el lunes
¿Compra confirma que se ha añadido el producto (o avisa de un error, como falta de stock), o damos por hecho que siempre se añade?
¿El nombre ucjc:session:changed encaja con lo que propone Identidad?
¿El precio va en euros con decimales (19.99) o en céntimos (1999)?
