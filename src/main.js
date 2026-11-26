import { CATEGORIAS, TALLAS, PRODUCTOS } from './productos.js';
import { ESTILOS } from './estilos.js';

export const EVENTO_ANADIR_AL_CARRITO = 'ucjc:descubrimiento:anadir-al-carrito@1';
// Contrato firmado: Descubrimiento informa a Compra y Datos del estado de la campaña.
export const EVENTO_CAMPANA_CAMBIADA = 'ucjc:descubrimiento:campana-cambiada@1';
export const EVENTO_SESION_CAMBIADA = 'ucjc:identidad:sesion-cambiada@1';

const PRECIO_MAXIMO = { EUR: 60, USD: 70, GBP: 50 };
const TASA_GBP = 0.8345;

const ESTILOS_AVISO = `
  .aviso {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translate(-50%, 1rem);
    padding: .75rem 1.25rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .2);
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s, transform .25s;
    z-index: 2000;
  }
  .aviso.visible { opacity: 1; transform: translate(-50%, 0); }
  .aviso.anadido { background: #15803d; }
  .aviso.eliminado { background: #b91c1c; }
`;

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
      precioMax: PRECIO_MAXIMO.EUR,
      moneda: 'EUR',
      modoBlackFriday: false,
      tallas: [],
      orden: 'relevancia',
      productoSeleccionado: null,
      usuarioActivo: null,
      esAdmin: false,
      listaProductos: PRODUCTOS.map((p) => ({ ...p, tallas: [...p.tallas] })),
    };
  }

  precioBaseProducto(producto) {
    if (this.estado.moneda === 'USD') return producto.precioUSD;
    if (this.estado.moneda === 'GBP') {
      return producto.precioGBP ?? Math.floor(Math.round(producto.precioEUR * 100) * TASA_GBP + 1e-9) / 100;
    }
    return producto.precioEUR;
  }

  precioProducto(producto) {
    const base = this.precioBaseProducto(producto);
    if (!this.estado.modoBlackFriday) return base;
    const descuento = Number(producto.descuentoBF) || 0;
    return Math.round(base * (100 - descuento)) / 100;
  }

  precioEnEuros(producto) {
    const base = producto.precioEUR;
    if (!this.estado.modoBlackFriday) return base;
    const descuento = Number(producto.descuentoBF) || 0;
    return Math.round(base * (100 - descuento)) / 100;
  }

  detallePrecio(producto) {
    const actual = this.formatearPrecio(this.precioProducto(producto));
    if (!this.estado.modoBlackFriday || !producto.descuentoBF) {
      return `<span class="precio">${actual}</span>`;
    }
    return `<span class="precio-anterior">${this.formatearPrecio(this.precioBaseProducto(producto))}</span>
      <span class="precio precio-rebajado">${actual}</span>
      <span class="descuento-bf">-${producto.descuentoBF}%</span>`;
  }

  formatearPrecio(precio) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: this.estado.moneda }).format(precio);
  }

  notificarCampana() {
    window.dispatchEvent(new CustomEvent(EVENTO_CAMPANA_CAMBIADA, {
      detail: {
        activa: this.estado.modoBlackFriday,
        codigo: 'black-friday-2026',
        etiqueta: 'Black Friday UCJC',
        momento: new Date().toISOString(),
      },
    }));
  }

  connectedCallback() {
    this.pintarEstructura();
    this.conectarEventos();
    this.escucharSesion();
    this.pintarProductos();
    // El contrato exige anunciar el estado inicial de la campaña.
    this.notificarCampana();
  }

  escucharSesion() {
    window.addEventListener(EVENTO_SESION_CAMBIADA, (e) => {
      const { autenticado = false, usuario = null } = e.detail || {};
      this.estado.usuarioActivo = autenticado && usuario ? usuario : null;
      this.estado.esAdmin = false;

      this.actualizarBarraAdmin();
      this.pintarProductos();
    });
  }

  pintarEstructura() {
    this.shadowRoot.innerHTML = `
      <style>${ESTILOS}${ESTILOS_AVISO}</style>

      <header class="barra-superior">
        <div class="lateral lateral-izq">
          <slot name="usuario"><span class="hueco">Usuario</span></slot>
        </div>
        <form class="barra-busqueda" role="search">
          <input type="search" name="q" placeholder="Buscar productos..." aria-label="Buscar productos" />
          <button type="submit">Buscar</button>
        </form>
        <div class="lateral lateral-der">
          <slot name="carrito"><span class="hueco">Carrito</span></slot>
        </div>
      </header>

      <div class="selector-moneda" role="group" aria-label="Seleccionar moneda">
        <span>Moneda:</span>
        <button type="button" data-moneda="EUR" aria-pressed="true">€ EUR</button>
        <button type="button" data-moneda="USD" aria-pressed="false">$ USD</button>
        <button type="button" data-moneda="GBP" aria-pressed="false">£ GBP</button>
      </div>
      <section class="franja-black-friday" aria-label="Promoción Black Friday">
        <div class="bf-titulo">
          <strong>BLACK FRIDAY</strong>
          <span>Descuentos especiales de la tienda UCJC</span>
        </div>
        <button type="button" class="boton-black-friday" aria-pressed="false">Activar Black Friday</button>
      </section>
      <div id="admin-bar-container"></div>

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
            <h3>Precio máximo: <span class="valor-precio">${this.formatearPrecio(this.estado.precioMax)}</span></h3>
            <input type="range" name="precio" min="0" max="${PRECIO_MAXIMO.EUR}" step="5" value="${PRECIO_MAXIMO.EUR}" aria-label="Precio máximo" />
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

      <div id="modal-container"></div>

      <div class="aviso" role="status" aria-live="polite"></div>
    `;

    this.actualizarBarraAdmin();
    this.actualizarModal();
  }

  actualizarBarraAdmin() {
    const contenedorAdmin = this.shadowRoot.querySelector('#admin-bar-container');
    const usuario = this.estado.usuarioActivo;

    if (!this.estado.esAdmin) {
      contenedorAdmin.innerHTML = `
        <div class="barra-admin" role="status">
          <span>${usuario
            ? `👤 Sesión iniciada: ${usuario.nombre || usuario.email}`
            : 'Navegando como invitado'}</span>
        </div>
      `;
      return;
    }

    contenedorAdmin.innerHTML = `
      <div class="barra-admin">
        <span>⚙️ Panel de Administración activo (${usuario?.nombre || usuario?.email || 'Admin'})</span>
        <button type="button" class="btn-admin" data-accion="nuevo-producto">+ Añadir Producto</button>
      </div>
    `;
  }

  actualizarModal() {
    const contenedorModal = this.shadowRoot.querySelector('#modal-container');
    const prod = this.estado.productoSeleccionado;

    if (!prod) {
      contenedorModal.innerHTML = '';
      return;
    }

    const esNuevo = prod.id === 'nuevo';

    contenedorModal.innerHTML = `
      <div class="modal-overlay" data-accion="cerrar">
        <div class="modal-contenido" role="dialog" aria-modal="true">
          <h3>${esNuevo ? 'Añadir Nuevo Producto' : prod.nombre}</h3>
          ${
            this.estado.esAdmin && (esNuevo || prod.editando)
              ? `
                <form id="form-producto" style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <label>Nombre: <input type="text" name="nombre" value="${esNuevo ? '' : prod.nombre}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Precio (€): <input type="number" step="0.01" name="precioEUR" value="${esNuevo ? '' : prod.precioEUR}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Precio ($): <input type="number" min="0" step="0.01" name="precioUSD" value="${esNuevo ? '' : prod.precioUSD}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Precio (£): <input type="number" min="0" step="0.01" name="precioGBP" value="${esNuevo ? '' : (prod.precioGBP ?? '')}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Categoría: 
                    <select name="categoria" style="width:100%; padding:0.4rem;">
                      ${CATEGORIAS.map((c) => `<option value="${c.id}" ${prod.categoria === c.id ? 'selected' : ''}>${c.nombre}</option>`).join('')}
                    </select>
                  </label>
                  <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <button type="submit" class="btn-admin" style="flex:1;">Guardar</button>
                    <button type="button" class="btn-cerrar-modal" data-accion="cerrar" style="flex:1; margin-top:0;">Cancelar</button>
                  </div>
                </form>
              `
              : `
                <div class="precios-modal">${this.detallePrecio(prod)}</div>
                <p><strong>Categoría:</strong> ${prod.categoria}</p>
                <p><strong>Tallas disponibles:</strong> ${prod.tallas.length > 0 ? prod.tallas.join(', ') : 'Única'}</p>
                <p>Vista detallada del producto dentro del micro-frontend de Descubrimiento.</p>
                ${
                  this.estado.esAdmin
                    ? `<button type="button" class="btn-admin" data-accion="pasar-a-editar" style="margin-top:0.5rem;">Modificar / Editar este producto</button>`
                    : ''
                }
                <button type="button" class="btn-cerrar-modal" data-accion="cerrar">Cerrar</button>
              `
          }
        </div>
      </div>
    `;
  }

  conectarEventos() {
    const raiz = this.shadowRoot;

    raiz.querySelector('.boton-black-friday').addEventListener('click', () => {
      this.estado.modoBlackFriday = !this.estado.modoBlackFriday;
      const activo = this.estado.modoBlackFriday;
      this.toggleAttribute('data-black-friday', activo);
      const boton = raiz.querySelector('.boton-black-friday');
      boton.textContent = activo ? 'Desactivar Black Friday' : 'Activar Black Friday';
      boton.setAttribute('aria-pressed', String(activo));
      this.pintarProductos();
      this.actualizarModal();
      // Compra recibe el nuevo estado para mostrar Black Friday.
      this.notificarCampana();
    });

    raiz.querySelector('.selector-moneda').addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-moneda]');
      if (!boton) return;
      this.estado.moneda = boton.dataset.moneda;
      this.estado.precioMax = PRECIO_MAXIMO[this.estado.moneda];
      raiz.querySelectorAll('.selector-moneda button').forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.moneda === this.estado.moneda))
      );
      const rango = raiz.querySelector('input[name="precio"]');
      rango.max = this.estado.precioMax;
      rango.value = this.estado.precioMax;
      raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
      this.pintarProductos();
      this.actualizarModal();
    });

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
      raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
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

    raiz.addEventListener('click', (e) => {
      const btnAdmin = e.target.closest('[data-accion="nuevo-producto"]');
      if (btnAdmin) {
        this.estado.productoSeleccionado = { id: 'nuevo', nombre: '', precioEUR: 0, precioUSD: 0, precioGBP: 0, categoria: 'ropa', tallas: [] };
        this.actualizarModal();
      }
    });

    raiz.querySelector('.rejilla').addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-accion]');
      if (!boton) return;
      const id = boton.dataset.id;
      const producto = this.estado.listaProductos.find((p) => p.id === id);

      if (boton.dataset.accion === 'anadir') this.anadirAlCarrito(producto);
      if (boton.dataset.accion === 'ver') {
        this.estado.productoSeleccionado = { ...producto, editando: false };
        this.actualizarModal();
      }
      if (boton.dataset.accion === 'editar') {
        this.estado.productoSeleccionado = { ...producto, editando: true };
        this.actualizarModal();
      }
      if (boton.dataset.accion === 'eliminar') {
        if (confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) {
          this.estado.listaProductos = this.estado.listaProductos.filter((p) => p.id !== id);
          this.pintarProductos();
          this.mostrarAviso(`🗑️ Producto eliminado: ${producto.nombre}`, 'eliminado');
        }
      }
    });

    raiz.querySelector('#modal-container').addEventListener('click', (e) => {
      if (e.target.closest('.modal-contenido') && !e.target.closest('[data-accion="cerrar"]')) {
        const accionEditar = e.target.closest('[data-accion="pasar-a-editar"]');
        if (accionEditar) {
          this.estado.productoSeleccionado.editando = true;
          this.actualizarModal();
        }
        return;
      }

      this.estado.productoSeleccionado = null;
      this.actualizarModal();
    });

    raiz.querySelector('#modal-container').addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target.id === 'form-producto') {
        const formData = new FormData(e.target);
        const nombre = formData.get('nombre');
        const precioEUR = parseFloat(formData.get('precioEUR'));
        const precioUSD = parseFloat(formData.get('precioUSD'));
        const precioGBP = parseFloat(formData.get('precioGBP'));
        if (![precioEUR, precioUSD, precioGBP].every((p) => Number.isFinite(p) && p >= 0)) return;
        const categoria = formData.get('categoria');

        if (this.estado.productoSeleccionado.id === 'nuevo') {
          const nuevoProd = {
            id: `prod-${Date.now()}`,
            nombre,
            precioEUR,
            precioUSD,
            precioGBP,
            categoria,
            tallas: ['M', 'L'],
          };
          this.estado.listaProductos.push(nuevoProd);
        } else {
          const idActual = this.estado.productoSeleccionado.id;
          const prod = this.estado.listaProductos.find((p) => p.id === idActual);
          if (prod) {
            prod.nombre = nombre;
            prod.precioEUR = precioEUR;
            prod.precioUSD = precioUSD;
            prod.precioGBP = precioGBP;
            prod.categoria = categoria;
          }
        }

        this.estado.productoSeleccionado = null;
        this.actualizarModal();
        this.pintarProductos();
      }
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
    const { moneda, listaProductos, usuarioActivo, modoBlackFriday } = this.estado;
    this.estado = { ...this.estadoInicial(), moneda, listaProductos, usuarioActivo, modoBlackFriday, precioMax: PRECIO_MAXIMO[moneda] };
    const raiz = this.shadowRoot;
    raiz.querySelector('input[name="q"]').value = '';
    raiz.querySelector('input[name="precio"]').max = this.estado.precioMax;
    raiz.querySelector('input[name="precio"]').value = this.estado.precioMax;
    raiz.querySelector('.valor-precio').textContent = this.formatearPrecio(this.estado.precioMax);
    raiz.querySelector('select[name="orden"]').value = 'relevancia';
    raiz.querySelectorAll('.tallas button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    this.cambiarCategoria('todo');
  }

  productosFiltrados() {
    const { busqueda, categoria, precioMax, tallas, orden, listaProductos } = this.estado;
    const lista = listaProductos.filter((p) =>
      (categoria === 'todo' || p.categoria === categoria) &&
      this.precioProducto(p) <= precioMax &&
      (!busqueda || p.nombre.toLowerCase().includes(busqueda)) &&
      (tallas.length === 0 || tallas.some((t) => p.tallas.includes(t)))
    );

    if (orden === 'precio-asc') lista.sort((a, b) => this.precioProducto(a) - this.precioProducto(b));
    if (orden === 'precio-desc') lista.sort((a, b) => this.precioProducto(b) - this.precioProducto(a));
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
              <div class="precios-tarjeta">${this.detallePrecio(p)}</div>
              <div class="acciones">
                <button class="btn-ver" data-accion="ver" data-id="${p.id}">Ver</button>
                <button class="btn-anadir" data-accion="anadir" data-id="${p.id}">Añadir</button>
              </div>
              ${
                this.estado.esAdmin
                  ? `
                    <div class="acciones-tarjeta-admin">
                      <button class="btn-editar" data-accion="editar" data-id="${p.id}">Editar</button>
                      <button class="btn-eliminar" data-accion="eliminar" data-id="${p.id}">Eliminar</button>
                    </div>
                  `
                  : ''
              }
            </div>
          </article>
        `).join('')
      : `<p class="vacio">No hay productos con estos filtros.</p>`;
  }

  anadirAlCarrito(producto) {
    // Reafirmar la campaña justo antes del precio: útil si Compra se ha montado después.
    this.notificarCampana();
    window.dispatchEvent(new CustomEvent(EVENTO_ANADIR_AL_CARRITO, {
      detail: {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: this.precioEnEuros(producto),
        cantidad: 1,
      },
    }));
    console.log(`Emitido ${EVENTO_ANADIR_AL_CARRITO} 🛒`, producto.nombre);
    this.mostrarAviso(`✅ Producto añadido: ${producto.nombre} — ${this.formatearPrecio(this.precioProducto(producto))}`, 'anadido');
  }

  mostrarAviso(texto, tipo) {
    const aviso = this.shadowRoot.querySelector('.aviso');
    aviso.textContent = texto;
    aviso.className = `aviso ${tipo} visible`;
    clearTimeout(this.temporizadorAviso);
    this.temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 2500);
  }
}

if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', UcjcDescubrimiento);
}

export default {
  nombre: 'descubrimiento',
  version: '0.2.1'
};