
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

// Preparar un entorno de navegador simulado.
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
globalThis.CustomEvent = dom.window.CustomEvent;

// Importar el componente después de preparar el entorno.
const {
  EVENTO_ANADIR_AL_CARRITO,
} = await import('../src/main.js');

// Cerrar el entorno al finalizar las pruebas.
after(() => {
  dom.window.close();
});

test('anadirAlCarrito emite el evento con el detail correcto', () => {
  // Crear el componente real.
  const componente = document.createElement('ucjc-descubrimiento');

  // Producto de prueba.
  const producto = {
    id: 'prod-test-001',
    nombre: 'Producto de prueba',
    precioEUR: 24.50,
  };

  let eventoRecibido = null;

  // Escuchar el evento que emite Descubrimiento.
  const escucharEvento = (evento) => {
    eventoRecibido = evento;
  };

  window.addEventListener(
    EVENTO_ANADIR_AL_CARRITO,
    escucharEvento
  );

  // Aislar las funciones auxiliares que no forman parte
  // del contrato del evento que estamos comprobando.
  componente.notificarCampana = () => {};

  componente.precioEnEuros = (productoRecibido) => {
    assert.equal(productoRecibido, producto);
    return 24.50;
  };

  componente.precioProducto = () => 24.50;
  componente.formatearPrecio = () => '24,50 €';
  componente.mostrarAviso = () => {};

  try {
    // Ejecutar el método real del componente.
    componente.anadirAlCarrito(producto);
  } finally {
    window.removeEventListener(
      EVENTO_ANADIR_AL_CARRITO,
      escucharEvento
    );
  }

  // Comprobar que se ha emitido el evento.
  assert.ok(eventoRecibido, 'No se ha emitido el evento');

  // Comprobar el nombre del evento.
  assert.equal(
    eventoRecibido.type,
    'ucjc:descubrimiento:anadir-al-carrito@1'
  );

  // Comprobar el contenido completo de detail.
  assert.deepEqual(eventoRecibido.detail, {
    productoId: 'prod-test-001',
    nombre: 'Producto de prueba',
    precio: 24.50,
    cantidad: 1,
  });
});
