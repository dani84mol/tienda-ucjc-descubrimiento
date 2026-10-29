import { CATEGORIAS, TALLAS, PRODUCTOS } from './productos.js';
import { ESTILOS } from './estilos.js';

/*
  Estructura de la página:

  ┌──────────────────────────────────────────────┐
  │  [ Buscar productos...            ] [Buscar] │  ← barra de búsqueda
  ├──────────────────────────────────────────────┤
  │  Todo | Ropa | Deporte | Material | Regalos  │  ← navegación por categorías
  ├────────────┬─────────────────────────────────┤
  │ FILTROS    │  8 productos       [Ordenar ▼]  │
  │ Categoría  │  ┌──────┐ ┌──────┐ ┌──────┐     │
  │ Precio     │  │ foto │ │ foto │ │ foto │     │  ← rejilla de productos
  │ Talla      │  │[Ver] │ │[Ver] │ │[Ver] │     │
  │ [Limpiar]  │  │[Añad]│ │[Añad]│ │[Añad]│     │
  └────────────┴─────────────────────────────────┘

  El login y el carrito NO van aquí: son de los equipos de Identidad y Compra.
*/

const PRECIO_MAXIMO = 60;

class UcjcDescubrimiento extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.estado = this.estadoInicial();
  }

  estadoInicial() {
    return {
      busqueda: '',
      categoria: 'todo',
      precioMax: PRECIO_MAXIMO,
      tallas: [],
      orden: 'relevancia',
    };
  }

  connectedCallback() {
    this.pintarEstructura();
    this.conectarEventos();
    this.pintarProductos();
  }

  // ---------- Estructura fija de la página ----------
  pintarEstructura() {
    this.shadowRoot.innerHTML = `
      <style>${ESTILOS}</style>

      <form class="barra-busqueda" role="search">
        <input type="search" name="q" placeholder="Buscar productos..." aria-label="Buscar productos" />
        <button type="submit">Buscar</button>
      </form>

      <nav class="navegacion" aria-label="Categorías">
        <button data-categoria="todo" aria-current="true">Todo</button>
        ${CATEGORIAS.map((c) => `<button data-categoria="${c.id}">${c.nombre}</button>`).join('')}
      </nav>

      <div class="cuerpo">
        <aside class="filtros" aria-label="Filtros">
          <section>
            <h3>Categoría</h3>
            ${CATEGORIAS.map((c) => `
              <label><input type="radio" name="categoria" value="${c.id}" /> ${c.nombre}</label>
            `).join('')}
            <label><input type="radio" name="categoria" value="todo" checked /> Todas</label>
          </section>

          <section>
            <h3>Precio máximo: <span class="valor-precio">${PRECIO_MAXIMO} €</span></h3>
            <input type="range" name="precio" min="0" max="${PRECIO_MAXIMO}" step="5" value="${PRECIO_MAXIMO}" aria-label="Precio máximo" />
          </section>

          <section>
            <h3>Talla</h3>
            <div class="tallas">
              ${TALLAS.map((t) => `<button type="button" data-talla="${t}" aria-pressed="false">${t}</button>`).join('')}
            </div>
          </section>

          <button type="button" class="limpiar">Limpiar filtros</button>
        </aside>

        <main>
          <div class="cabecera-resultados">
            <p class="contador" aria-live="polite"></p>
            <select name="orden" aria-label="Ordenar">
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre (A-Z)</option>
            </select>
          </div>
          <div class="rejilla"></div>
        </main>
      </div>
    `;
  }

  // ---------- Botones y filtros ----------
  conectarEventos() {
    const raiz = this.shadowRoot;

    raiz.querySelector('.barra-busqueda').addEventListener('submit', (e) => {
      e.preventDefault();
      this.estado.busqueda = e.target.q.value.trim().toLowerCase();
      this.pintarProductos();
    });

    raiz.querySelector('.navegacion').addEventListener('click', (e) => {
      const boton = e.target.closest('[data-categoria]');
      if (boton) this.cambiarCategoria(boton.dataset.categoria);
    });

    raiz.querySelectorAll('input[name="categoria"]').forEach((radio) =>
      radio.addEventListener('change', () => this.cambiarCategoria(radio.value))
    );

    raiz.querySelector('input[name="precio"]').addEventListener('input', (e) => {
      this.estado.precioMax = Number(e.target.value);
      raiz.querySelector('.valor-precio').textContent = `${e.target.value} €`;
      this.pintarProductos();
    });

    raiz.querySelector('.tallas').addEventListener('click', (e) => {
      const boton = e.target.closest('[data-talla]');
      if (!boton) return;
      const talla = boton.dataset.talla;
      const activa = this.estado.tallas.includes(talla);
      this.estado.tallas = activa
        ? this.estado.tallas.filter((t) => t !== talla)
        : [...this.estado.tallas, talla];
      boton.setAttribute('aria-pressed', String(!activa));
      this.pintarProductos();
    });

    raiz.querySelector('select[name="orden"]').addEventListener('change', (e) => {
      this.estado.orden = e.target.value;
      this.pintarProductos();
    });

    raiz.querySelector('.limpiar').addEventListener('click', () => this.limpiarFiltros());

    raiz.querySelector('.rejilla').addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-accion]');
      if (!boton) return;
      const producto = PRODUCTOS.find((p) => p.id === boton.dataset.id);
      if (boton.dataset.accion === 'anadir') this.anadirAlCarrito(producto);
      if (boton.dataset.accion === 'ver') console.log('Ficha de producto (pendiente):', producto.id);
    });
  }

  cambiarCategoria(categoria) {
    this.estado.categoria = categoria;
    const raiz = this.shadowRoot;
    raiz.querySelectorAll('.navegacion button').forEach((b) =>
      b.setAttribute('aria-current', String(b.dataset.categoria === categoria))
    );
    raiz.querySelector(`input[name="categoria"][value="${categoria}"]`).checked = true;
    this.pintarProductos();
  }

  limpiarFiltros() {
    this.estado = this.estadoInicial();
    const raiz = this.shadowRoot;
    raiz.querySelector('input[name="q"]').value = '';
    raiz.querySelector('input[name="precio"]').value = PRECIO_MAXIMO;
    raiz.querySelector('.valor-precio').textContent = `${PRECIO_MAXIMO} €`;
    raiz.querySelector('select[name="orden"]').value = 'relevancia';
    raiz.querySelectorAll('.tallas button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    this.cambiarCategoria('todo');
  }

  // ---------- Lista de productos ----------
  productosFiltrados() {
    const { busqueda, categoria, precioMax, tallas, orden } = this.estado;

    const lista = PRODUCTOS.filter((p) =>
      (categoria === 'todo' || p.categoria === categoria) &&
      p.precio <= precioMax &&
      (!busqueda || p.nombre.toLowerCase().includes(busqueda)) &&
      (tallas.length === 0 || tallas.some((t) => p.tallas.includes(t)))
    );

    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio);
    if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio);
    if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return lista;
  }

  pintarProductos() {
    const lista = this.productosFiltrados();
    const raiz = this.shadowRoot;

    raiz.querySelector('.contador').textContent =
      `${lista.length} producto${lista.length === 1 ? '' : 's'}`;

    raiz.querySelector('.rejilla').innerHTML = lista.length
      ? lista.map((p) => `
          <article class="tarjeta">
            <div class="imagen">Imagen</div>
            <div class="info">
              <h4>${p.nombre}</h4>
              <span class="precio">${p.precio.toFixed(2).replace('.', ',')} €</span>
              <div class="acciones">
                <button class="btn-ver" data-accion="ver" data-id="${p.id}">Ver</button>
                <button class="btn-anadir" data-accion="anadir" data-id="${p.id}">Añadir</button>
              </div>
            </div>
          </article>
        `).join('')
      : `<p class="vacio">No hay productos con estos filtros.</p>`;
  }

  // ---------- Evento del contrato hacia Compra ----------
  anadirAlCarrito(producto) {
    window.dispatchEvent(new CustomEvent('ucjc:cart:add-item', {
      detail: {
        version: 1,
        productId: producto.id,
        sku: producto.id,
        name: producto.nombre,
        price: producto.precio,
        currency: 'EUR',
        quantity: 1,
        imageUrl: '',
      },
    }));
    console.log('Emitido ucjc:cart:add-item →', producto.nombre);
  }
}

// Registrar el Custom Element si no está registrado
if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', UcjcDescubrimiento);
}
