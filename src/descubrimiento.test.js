import { beforeEach, describe, expect, it, vi } from 'vitest';
import mod from './main.js';

describe('ucjc-descubrimiento', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('exporta metadatos de carga', () => {
    expect(mod).toEqual({ nombre: 'descubrimiento', version: '0.2.0' });
  });

  it('registra el CE y emite anadir-al-carrito@1', async () => {
    expect(customElements.get('ucjc-descubrimiento')).toBeTruthy();
    const el = document.createElement('ucjc-descubrimiento');
    document.body.appendChild(el);
    await Promise.resolve();
    const spy = vi.fn();
    window.addEventListener('ucjc:descubrimiento:anadir-al-carrito@1', spy);
    const btn = el.shadowRoot.querySelector('[data-accion="anadir"], .btn-anadir, button');
    // Prefer explicit product add buttons from catalog
    const addBtns = [...el.shadowRoot.querySelectorAll('button')].filter((b) =>
      /añadir|anadir|carrito/i.test(b.textContent || '')
    );
    const target = addBtns[0] || btn;
    expect(target).toBeTruthy();
    target.click();
    expect(spy).toHaveBeenCalled();
    const d = spy.mock.calls[0][0].detail;
    expect(d).toHaveProperty('productoId');
    expect(d).toHaveProperty('nombre');
    expect(d).toHaveProperty('precio');
    expect(d).toHaveProperty('cantidad');
  });
});
