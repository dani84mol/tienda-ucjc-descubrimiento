import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
globalThis.CustomEvent = dom.window.CustomEvent;

const {
  EVENTO_ANADIR_AL_CARRITO,
  EVENTO_CAMPANA_CAMBIADA,
  EVENTO_MONEDA_CAMBIADA,
} = await import('../src/main.js');

after(() => {
  dom.window.close();
});

test('anadirAlCarrito emite ucjc:descubrimiento:anadir-al-carrito@1 con el detail correcto', () => {
  const componente = document.createElement('ucjc-descubrimiento');
  const producto = {
    id: 'prod-test-001',
    nombre: 'Producto de prueba',
    precioEUR: 24.50,
  };

  let eventoRecibido = null;
  const escucharEvento = (evento) => { eventoRecibido = evento; };
  window.addEventListener(EVENTO_ANADIR_AL_CARRITO, escucharEvento);

  componente.notificarCampana = () => {};
  componente.notificarMoneda = () => {};
  componente.precioEnEuros = (p) => {
    assert.equal(p, producto);
    return 24.50;
  };
  componente.precioProducto = () => 24.50;
  componente.formatearPrecio = () => '24,50 €';
  componente.mostrarAviso = () => {};

  try {
    componente.anadirAlCarrito(producto);
  } finally {
    window.removeEventListener(EVENTO_ANADIR_AL_CARRITO, escucharEvento);
  }

  assert.ok(eventoRecibido, 'No se ha emitido anadir-al-carrito@1');
  assert.equal(eventoRecibido.type, 'ucjc:descubrimiento:anadir-al-carrito@1');
  assert.deepEqual(eventoRecibido.detail, {
    productoId: 'prod-test-001',
    nombre: 'Producto de prueba',
    precio: 24.50,
    cantidad: 1,
  });
});

test('notificarCampana emite ucjc:descubrimiento:campana-cambiada@1 con el detail correcto', () => {
  const componente = document.createElement('ucjc-descubrimiento');
  componente.estado.modoBlackFriday = true;

  let eventoRecibido = null;
  const escucharEvento = (evento) => { eventoRecibido = evento; };
  window.addEventListener(EVENTO_CAMPANA_CAMBIADA, escucharEvento);

  try {
    componente.notificarCampana();
  } finally {
    window.removeEventListener(EVENTO_CAMPANA_CAMBIADA, escucharEvento);
  }

  assert.ok(eventoRecibido, 'No se ha emitido campana-cambiada@1');
  assert.equal(eventoRecibido.type, 'ucjc:descubrimiento:campana-cambiada@1');
  assert.equal(eventoRecibido.detail.activa, true);
  assert.equal(eventoRecibido.detail.codigo, 'black-friday-2026');
  assert.equal(eventoRecibido.detail.etiqueta, 'Black Friday UCJC');
  assert.ok(!Number.isNaN(Date.parse(eventoRecibido.detail.momento)), 'momento debe ser ISO 8601 válido');
});

test('notificarMoneda emite ucjc:descubrimiento:moneda-cambiada@1 con el detail correcto', () => {
  const componente = document.createElement('ucjc-descubrimiento');
  componente.estado.moneda = 'GBP';

  let eventoRecibido = null;
  const escucharEvento = (evento) => { eventoRecibido = evento; };
  window.addEventListener(EVENTO_MONEDA_CAMBIADA, escucharEvento);

  try {
    componente.notificarMoneda();
  } finally {
    window.removeEventListener(EVENTO_MONEDA_CAMBIADA, escucharEvento);
  }

  assert.ok(eventoRecibido, 'No se ha emitido moneda-cambiada@1');
  assert.equal(eventoRecibido.type, 'ucjc:descubrimiento:moneda-cambiada@1');
  assert.equal(eventoRecibido.detail.moneda, 'GBP');
  assert.ok(!Number.isNaN(Date.parse(eventoRecibido.detail.momento)), 'momento debe ser ISO 8601 válido');
});