import { CATEGORIAS, TALLAS, PRODUCTOS } from './productos.js';
import { ESTILOS } from './estilos.js';

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
      productoSeleccionado: null,
      usuarioActivo: null,
      esAdmin: false,
      listaProductos: [...PRODUCTOS],
    };
  }

  connectedCallback() {
    this.pintarEstructura();
    this.conectarEventos();
    this.escucharSesion();
    this.pintarProductos();
  }

  // Escuchar cambios de sesión del equipo de Identidad
  escucharSesion() {
    window.addEventListener('ucjc:session:changed', (e) => {
      const detalle = e.detail || {};
      this.estado.usuarioActivo = detalle.user || null;
      this.estado.esAdmin = detalle.role === 'admin' || detalle.esAdmin === true;
      
      this.actualizarBarraAdmin();
      this.pintarProductos();
    });
  }

  pintarEstructura() {
    this.shadowRoot.innerHTML = `
      <style>${ESTILOS}</style>

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

      <div id="modal-container"></div>
    `;

    this.actualizarBarraAdmin();
    this.actualizarModal();
  }

  actualizarBarraAdmin() {
    const contenedorAdmin = this.shadowRoot.querySelector('#admin-bar-container');
    if (!this.estado.esAdmin) {
      contenedorAdmin.innerHTML = '';
      return;
    }

    contenedorAdmin.innerHTML = `
      <div class="barra-admin">
        <span>⚙️ Panel de Administración activo (${this.estado.usuarioActivo?.name || 'Admin'})</span>
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

    // Nota: Eliminado el onclick inline para dejar que el evento suba correctamente al listener global
    contenedorModal.innerHTML = `
      <div class="modal-overlay" data-accion="cerrar">
        <div class="modal-contenido" role="dialog" aria-modal="true">
          <h3>${esNuevo ? 'Añadir Nuevo Producto' : prod.nombre}</h3>
          ${
            this.estado.esAdmin && (esNuevo || prod.editando)
              ? `
                <form id="form-producto" style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <label>Nombre: <input type="text" name="nombre" value="${esNuevo ? '' : prod.nombre}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Precio (€): <input type="number" step="0.01" name="precio" value="${esNuevo ? '' : prod.precio}" required style="width:100%; padding:0.4rem;" /></label>
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
                <p class="precio">${prod.precio.toFixed(2).replace('.', ',')} €</p>
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

    raiz.addEventListener('click', (e) => {
      const btnAdmin = e.target.closest('[data-accion="nuevo-producto"]');
      if (btnAdmin) {
        this.estado.productoSeleccionado = { id: 'nuevo', nombre: '', precio: 0, categoria: 'ropa', tallas: [] };
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
        }
      }
    });

    // Gestión limpia de eventos del modal (Cierre por botón o fondo, y edición)
    raiz.querySelector('#modal-container').addEventListener('click', (e) => {
      // Si hacen clic en la caja blanca de dentro del modal, no cerramos
      if (e.target.closest('.modal-contenido') && !e.target.closest('[data-accion="cerrar"]')) {
        // Comprobamos si es el botón de pasar a editar dentro del modal
        const accionEditar = e.target.closest('[data-accion="pasar-a-editar"]');
        if (accionEditar) {
          this.estado.productoSeleccionado.editando = true;
          this.actualizarModal();
        }
        return;
      }

      // En cualquier otro caso (fondo sombreado o botón con data-accion="cerrar"), cerramos el modal
      this.estado.productoSeleccionado = null;
      this.actualizarModal();
    });

    raiz.querySelector('#modal-container').addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target.id === 'form-producto') {
        const formData = new FormData(e.target);
        const nombre = formData.get('nombre');
        const precio = parseFloat(formData.get('precio'));
        const categoria = formData.get('categoria');

        if (this.estado.productoSeleccionado.id === 'nuevo') {
          const nuevoProd = {
            id: `prod-${Date.now()}`,
            nombre,
            precio,
            categoria,
            tallas: ['M', 'L'],
          };
          this.estado.listaProductos.push(nuevoProd);
        } else {
          const idActual = this.estado.productoSeleccionado.id;
          const prod = this.estado.listaProductos.find((p) => p.id === idActual);
          if (prod) {
            prod.nombre = nombre;
            prod.precio = precio;
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
    this.estado = this.estadoInicial();
    const raiz = this.shadowRoot;
    raiz.querySelector('input[name="q"]').value = '';
    raiz.querySelector('input[name="precio"]').value = PRECIO_MAXIMO;
    raiz.querySelector('.valor-precio').textContent = `${PRECIO_MAXIMO} €`;
    raiz.querySelector('select[name="orden"]').value = 'relevancia';
    raiz.querySelectorAll('.tallas button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    this.cambiarCategoria('todo');
  }

  productosFiltrados() {
    const { busqueda, categoria, precioMax, tallas, orden, listaProductos } = this.estado;
    const lista = listaProductos.filter((p) =>
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
    console.log('Emitido ucjc:cart:add-item 🛒', producto.nombre);
  }
}

if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', UcjcDescubrimiento);
}