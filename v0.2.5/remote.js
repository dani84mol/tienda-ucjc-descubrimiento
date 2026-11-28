(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`ropa`,nombre:`Ropa`},{id:`deporte`,nombre:`Deporte`},{id:`material`,nombre:`Material`},{id:`regalos`,nombre:`Regalos`}],t=[`XS`,`S`,`M`,`L`,`XL`],n=[{id:`prod-101`,nombre:`Camiseta Técnica UCJC`,categoria:`deporte`,precioEUR:19.99,precioUSD:21.99,tallas:[`S`,`M`,`L`,`XL`]},{id:`prod-102`,nombre:`Sudadera con capucha`,categoria:`ropa`,precioEUR:39.95,precioUSD:43.95,tallas:[`XS`,`S`,`M`,`L`,`XL`]},{id:`prod-103`,nombre:`Chaqueta cortavientos`,categoria:`ropa`,precioEUR:45,precioUSD:49.5,tallas:[`M`,`L`,`XL`]},{id:`prod-104`,nombre:`Equipación oficial fútbol`,categoria:`deporte`,precioEUR:55,precioUSD:60.5,tallas:[`S`,`M`,`L`]},{id:`prod-105`,nombre:`Mochila UCJC`,categoria:`material`,precioEUR:29.9,precioUSD:32.89,tallas:[]},{id:`prod-106`,nombre:`Cuaderno A4`,categoria:`material`,precioEUR:4.5,precioUSD:4.95,tallas:[]},{id:`prod-107`,nombre:`Taza de graduación`,categoria:`regalos`,precioEUR:9.95,precioUSD:10.95,tallas:[]},{id:`prod-108`,nombre:`Llavero metálico`,categoria:`regalos`,precioEUR:5,precioUSD:5.5,tallas:[]}],r=`
  :host {
    --azul: #1e3a8a;
    --azul-claro: #3b82f6;
    --gris: #f3f4f6;
    --borde: #e5e7eb;
    --texto: #111827;
    display: block;
    font-family: system-ui, sans-serif;
    color: var(--texto);
  }

  * { box-sizing: border-box; }

  /* ---------- Barra superior: usuario | buscador | carrito ---------- */
  .barra-superior {
    display: grid;
    grid-template-columns: 160px 1fr 160px;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--azul);
  }
  .lateral { display: flex; align-items: center; min-height: 2.5rem; }
  .lateral-izq { justify-content: flex-start; }
  .lateral-der { justify-content: flex-end; }
  .hueco {
    padding: .5rem .9rem;
    border: 1px dashed rgba(255, 255, 255, .6);
    border-radius: 6px;
    color: white;
    font-size: .9rem;
  }
  .barra-busqueda {
    display: flex;
    gap: .5rem;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
  }
  .barra-busqueda input {
    flex: 1;
    padding: .6rem .8rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
  }
  .barra-busqueda button {
    padding: .6rem 1rem;
    border: none;
    border-radius: 6px;
    background: var(--azul-claro);
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .selector-moneda { display:flex; justify-content:flex-end; align-items:center; gap:.5rem; padding:.7rem 1rem; background:#eff6ff; }
  .selector-moneda button { padding:.5rem .85rem; border:1px solid var(--azul); border-radius:6px; background:white; color:var(--azul); cursor:pointer; font-weight:600; }
  .selector-moneda button[aria-pressed="true"] { background:var(--azul); color:white; }

  /* ---------- Navegación por categorías ---------- */
  .navegacion {
    display: flex;
    gap: .25rem;
    overflow-x: auto;
    padding: 0 1rem;
    background: white;
    border-bottom: 1px solid var(--borde);
  }
  .navegacion button {
    padding: .8rem 1rem;
    border: none;
    border-bottom: 3px solid transparent;
    background: none;
    font-size: .95rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .navegacion button[aria-current="true"] {
    border-bottom-color: var(--azul-claro);
    color: var(--azul);
    font-weight: 600;
  }

  /* ---------- Cuerpo: filtros + productos ---------- */
  .cuerpo {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 1.5rem;
    padding: 1rem;
  }

  .filtros {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .filtros h3 {
    margin: 0 0 .5rem;
    font-size: .9rem;
    text-transform: uppercase;
    color: #6b7280;
  }
  .filtros label { display: block; margin: .25rem 0; cursor: pointer; }
  .filtros select, .filtros input[type="range"] { width: 100%; }
  .tallas { display: flex; flex-wrap: wrap; gap: .35rem; }
  .tallas button {
    min-width: 2.5rem;
    padding: .35rem;
    border: 1px solid var(--borde);
    border-radius: 4px;
    background: white;
    cursor: pointer;
  }
  .tallas button[aria-pressed="true"] {
    background: var(--azul);
    border-color: var(--azul);
    color: white;
  }
  .limpiar {
    padding: .5rem;
    border: 1px solid var(--borde);
    border-radius: 6px;
    background: white;
    cursor: pointer;
  }

  .cabecera-resultados {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .cabecera-resultados p { margin: 0; color: #6b7280; }

  .rejilla {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
  .tarjeta {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--borde);
    border-radius: 8px;
    overflow: hidden;
    background: white;
  }
  .tarjeta .imagen {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    background: var(--gris);
    color: #9ca3af;
    font-size: .85rem;
  }
  .tarjeta .info { padding: .75rem; display: flex; flex-direction: column; gap: .4rem; flex: 1; }
  .tarjeta h4 { margin: 0; font-size: 1rem; }
  .tarjeta .precio { font-weight: 700; color: var(--azul); }
  .tarjeta .acciones { display: flex; gap: .4rem; margin-top: auto; }
  .tarjeta .acciones button {
    flex: 1;
    padding: .5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: .85rem;
  }
  .btn-ver { border: 1px solid var(--azul); background: white; color: var(--azul); }
  .btn-anadir { border: none; background: var(--azul); color: white; }

  .vacio { padding: 2rem; text-align: center; color: #6b7280; }

  button:focus-visible, input:focus-visible, select:focus-visible {
    outline: 2px solid var(--azul-claro);
    outline-offset: 2px;
  }

  /* ---------- Móvil: los filtros pasan arriba ---------- */
  @media (max-width: 700px) {
    .cuerpo { grid-template-columns: 1fr; }
    .barra-superior { grid-template-columns: 1fr 1fr; }
    .barra-busqueda { grid-column: 1 / -1; grid-row: 2; }
  }

  /* ---------- Ventana Modal (Detalle de Producto) ---------- */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5); /* Fondo sombreado en segundo plano */
    display: grid;
    place-items: center;
    z-index: 1000;
  }

  .modal-contenido {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal-contenido h3 {
    margin: 0;
    color: var(--azul);
    font-size: 1.5rem;
  }

  .modal-contenido .precio {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--azul);
  }

  .btn-cerrar-modal {
    margin-top: 1rem;
    padding: 0.6rem;
    background: var(--azul);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  /* ---------- Estilos de Administración / Roles ---------- */
  .barra-admin {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #eff6ff;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--borde);
  }

  .btn-admin {
    background: var(--azul-claro);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }

  .acciones-tarjeta-admin {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.5rem;
  }

  .btn-editar {
    background: #f59e0b;
    color: white;
    border: none;
    padding: 0.4rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    flex: 1;
  }

  .btn-eliminar {
    background: #ef4444;
    color: white;
    border: none;
    padding: 0.4rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    flex: 1;
  }
`,i=`ucjc:descubrimiento:anadir-al-carrito@1`,a=`ucjc:identidad:sesion-cambiada@1`,o={EUR:60,USD:70},s=`
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
`,c=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.estado=this.estadoInicial()}estadoInicial(){return{busqueda:``,categoria:`todo`,precioMax:o.EUR,moneda:`EUR`,tallas:[],orden:`relevancia`,productoSeleccionado:null,usuarioActivo:null,esAdmin:!1,listaProductos:n.map(e=>({...e,tallas:[...e.tallas]}))}}precioProducto(e){return this.estado.moneda===`USD`?e.precioUSD:e.precioEUR}formatearPrecio(e){return new Intl.NumberFormat(`es-ES`,{style:`currency`,currency:this.estado.moneda}).format(e)}connectedCallback(){this.pintarEstructura(),this.conectarEventos(),this.escucharSesion(),this.pintarProductos()}escucharSesion(){window.addEventListener(a,e=>{let{autenticado:t=!1,usuario:n=null}=e.detail||{};this.estado.usuarioActivo=t&&n?n:null,this.estado.esAdmin=!1,this.actualizarBarraAdmin(),this.pintarProductos()})}pintarEstructura(){this.shadowRoot.innerHTML=`
      <style>${r}${s}</style>

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
      </div>
      <div id="admin-bar-container"></div>

      <nav class="navegacion" aria-label="Categorías">
        <button data-categoria="todo" aria-current="true">Todo</button>
        ${e.map(e=>`<button data-categoria="${e.id}">${e.nombre}</button>`).join(``)}
      </nav>

      <div class="cuerpo">
        <aside class="filtros" aria-label="Filtros">
          <section>
            <h3>Categoría</h3>
            ${e.map(e=>`
              <label><input type="radio" name="categoria" value="${e.id}" /> ${e.nombre}</label>
            `).join(``)}
            <label><input type="radio" name="categoria" value="todo" checked /> Todas</label>
          </section>
          <section>
            <h3>Precio máximo: <span class="valor-precio">${this.formatearPrecio(this.estado.precioMax)}</span></h3>
            <input type="range" name="precio" min="0" max="${o.EUR}" step="5" value="${o.EUR}" aria-label="Precio máximo" />
          </section>
          <section>
            <h3>Talla</h3>
            <div class="tallas">
              ${t.map(e=>`<button type="button" data-talla="${e}" aria-pressed="false">${e}</button>`).join(``)}
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
    `,this.actualizarBarraAdmin(),this.actualizarModal()}actualizarBarraAdmin(){let e=this.shadowRoot.querySelector(`#admin-bar-container`),t=this.estado.usuarioActivo;e.innerHTML=this.estado.esAdmin?`
      <div class="barra-admin">
        <span>⚙️ Panel de Administración activo (${t?.nombre||t?.email||`Admin`})</span>
        <button type="button" class="btn-admin" data-accion="nuevo-producto">+ Añadir Producto</button>
      </div>
    `:`
        <div class="barra-admin" role="status">
          <span>${t?`👤 Sesión iniciada: ${t.nombre||t.email}`:`Navegando como invitado`}</span>
        </div>
      `}actualizarModal(){let t=this.shadowRoot.querySelector(`#modal-container`),n=this.estado.productoSeleccionado;if(!n){t.innerHTML=``;return}let r=n.id===`nuevo`;t.innerHTML=`
      <div class="modal-overlay" data-accion="cerrar">
        <div class="modal-contenido" role="dialog" aria-modal="true">
          <h3>${r?`Añadir Nuevo Producto`:n.nombre}</h3>
          ${this.estado.esAdmin&&(r||n.editando)?`
                <form id="form-producto" style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <label>Nombre: <input type="text" name="nombre" value="${r?``:n.nombre}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Precio (€): <input type="number" step="0.01" name="precioEUR" value="${r?``:n.precioEUR}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Precio ($): <input type="number" min="0" step="0.01" name="precioUSD" value="${r?``:n.precioUSD}" required style="width:100%; padding:0.4rem;" /></label>
                  <label>Categoría: 
                    <select name="categoria" style="width:100%; padding:0.4rem;">
                      ${e.map(e=>`<option value="${e.id}" ${n.categoria===e.id?`selected`:``}>${e.nombre}</option>`).join(``)}
                    </select>
                  </label>
                  <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <button type="submit" class="btn-admin" style="flex:1;">Guardar</button>
                    <button type="button" class="btn-cerrar-modal" data-accion="cerrar" style="flex:1; margin-top:0;">Cancelar</button>
                  </div>
                </form>
              `:`
                <p class="precio">${this.formatearPrecio(this.precioProducto(n))}</p>
                <p><strong>Categoría:</strong> ${n.categoria}</p>
                <p><strong>Tallas disponibles:</strong> ${n.tallas.length>0?n.tallas.join(`, `):`Única`}</p>
                <p>Vista detallada del producto dentro del micro-frontend de Descubrimiento.</p>
                ${this.estado.esAdmin?`<button type="button" class="btn-admin" data-accion="pasar-a-editar" style="margin-top:0.5rem;">Modificar / Editar este producto</button>`:``}
                <button type="button" class="btn-cerrar-modal" data-accion="cerrar">Cerrar</button>
              `}
        </div>
      </div>
    `}conectarEventos(){let e=this.shadowRoot;e.querySelector(`.selector-moneda`).addEventListener(`click`,t=>{let n=t.target.closest(`button[data-moneda]`);if(!n)return;this.estado.moneda=n.dataset.moneda,this.estado.precioMax=o[this.estado.moneda],e.querySelectorAll(`.selector-moneda button`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.moneda===this.estado.moneda)));let r=e.querySelector(`input[name="precio"]`);r.max=this.estado.precioMax,r.value=this.estado.precioMax,e.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),this.pintarProductos(),this.actualizarModal()}),e.querySelector(`.barra-busqueda`).addEventListener(`submit`,e=>{e.preventDefault(),this.estado.busqueda=e.target.q.value.trim().toLowerCase(),this.pintarProductos()}),e.querySelector(`.navegacion`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-categoria]`);t&&this.cambiarCategoria(t.dataset.categoria)}),e.querySelectorAll(`input[name="categoria"]`).forEach(e=>e.addEventListener(`change`,()=>this.cambiarCategoria(e.value))),e.querySelector(`input[name="precio"]`).addEventListener(`input`,t=>{this.estado.precioMax=Number(t.target.value),e.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),this.pintarProductos()}),e.querySelector(`.tallas`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-talla]`);if(!t)return;let n=t.dataset.talla,r=this.estado.tallas.includes(n);this.estado.tallas=r?this.estado.tallas.filter(e=>e!==n):[...this.estado.tallas,n],t.setAttribute(`aria-pressed`,String(!r)),this.pintarProductos()}),e.querySelector(`select[name="orden"]`).addEventListener(`change`,e=>{this.estado.orden=e.target.value,this.pintarProductos()}),e.querySelector(`.limpiar`).addEventListener(`click`,()=>this.limpiarFiltros()),e.addEventListener(`click`,e=>{e.target.closest(`[data-accion="nuevo-producto"]`)&&(this.estado.productoSeleccionado={id:`nuevo`,nombre:``,precioEUR:0,precioUSD:0,categoria:`ropa`,tallas:[]},this.actualizarModal())}),e.querySelector(`.rejilla`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-accion]`);if(!t)return;let n=t.dataset.id,r=this.estado.listaProductos.find(e=>e.id===n);t.dataset.accion===`anadir`&&this.anadirAlCarrito(r),t.dataset.accion===`ver`&&(this.estado.productoSeleccionado={...r,editando:!1},this.actualizarModal()),t.dataset.accion===`editar`&&(this.estado.productoSeleccionado={...r,editando:!0},this.actualizarModal()),t.dataset.accion===`eliminar`&&confirm(`¿Estás seguro de eliminar "${r.nombre}"?`)&&(this.estado.listaProductos=this.estado.listaProductos.filter(e=>e.id!==n),this.pintarProductos(),this.mostrarAviso(`🗑️ Producto eliminado: ${r.nombre}`,`eliminado`))}),e.querySelector(`#modal-container`).addEventListener(`click`,e=>{e.target.closest(`.modal-contenido`)&&!e.target.closest(`[data-accion="cerrar"]`)?e.target.closest(`[data-accion="pasar-a-editar"]`)&&(this.estado.productoSeleccionado.editando=!0,this.actualizarModal()):(this.estado.productoSeleccionado=null,this.actualizarModal())}),e.querySelector(`#modal-container`).addEventListener(`submit`,e=>{if(e.preventDefault(),e.target.id===`form-producto`){let t=new FormData(e.target),n=t.get(`nombre`),r=parseFloat(t.get(`precioEUR`)),i=parseFloat(t.get(`precioUSD`));if(![r,i].every(e=>Number.isFinite(e)&&e>=0))return;let a=t.get(`categoria`);if(this.estado.productoSeleccionado.id===`nuevo`){let e={id:`prod-${Date.now()}`,nombre:n,precioEUR:r,precioUSD:i,categoria:a,tallas:[`M`,`L`]};this.estado.listaProductos.push(e)}else{let e=this.estado.productoSeleccionado.id,t=this.estado.listaProductos.find(t=>t.id===e);t&&(t.nombre=n,t.precioEUR=r,t.precioUSD=i,t.categoria=a)}this.estado.productoSeleccionado=null,this.actualizarModal(),this.pintarProductos()}})}cambiarCategoria(e){this.estado.categoria=e;let t=this.shadowRoot;t.querySelectorAll(`.navegacion button`).forEach(t=>t.setAttribute(`aria-current`,String(t.dataset.categoria===e))),t.querySelector(`input[name="categoria"][value="${e}"]`).checked=!0,this.pintarProductos()}limpiarFiltros(){let{moneda:e,listaProductos:t,usuarioActivo:n}=this.estado;this.estado={...this.estadoInicial(),moneda:e,listaProductos:t,usuarioActivo:n,precioMax:o[e]};let r=this.shadowRoot;r.querySelector(`input[name="q"]`).value=``,r.querySelector(`input[name="precio"]`).max=this.estado.precioMax,r.querySelector(`input[name="precio"]`).value=this.estado.precioMax,r.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),r.querySelector(`select[name="orden"]`).value=`relevancia`,r.querySelectorAll(`.tallas button`).forEach(e=>e.setAttribute(`aria-pressed`,`false`)),this.cambiarCategoria(`todo`)}productosFiltrados(){let{busqueda:e,categoria:t,precioMax:n,tallas:r,orden:i,listaProductos:a}=this.estado,o=a.filter(i=>(t===`todo`||i.categoria===t)&&this.precioProducto(i)<=n&&(!e||i.nombre.toLowerCase().includes(e))&&(r.length===0||r.some(e=>i.tallas.includes(e))));return i===`precio-asc`&&o.sort((e,t)=>this.precioProducto(e)-this.precioProducto(t)),i===`precio-desc`&&o.sort((e,t)=>this.precioProducto(t)-this.precioProducto(e)),i===`nombre`&&o.sort((e,t)=>e.nombre.localeCompare(t.nombre)),o}pintarProductos(){let e=this.productosFiltrados(),t=this.shadowRoot;t.querySelector(`.contador`).textContent=`${e.length} producto${e.length===1?``:`s`}`,t.querySelector(`.rejilla`).innerHTML=e.length?e.map(e=>`
          <article class="tarjeta">
            <div class="imagen">Imagen</div>
            <div class="info">
              <h4>${e.nombre}</h4>
              <span class="precio">${this.formatearPrecio(this.precioProducto(e))}</span>
              <div class="acciones">
                <button class="btn-ver" data-accion="ver" data-id="${e.id}">Ver</button>
                <button class="btn-anadir" data-accion="anadir" data-id="${e.id}">Añadir</button>
              </div>
              ${this.estado.esAdmin?`
                    <div class="acciones-tarjeta-admin">
                      <button class="btn-editar" data-accion="editar" data-id="${e.id}">Editar</button>
                      <button class="btn-eliminar" data-accion="eliminar" data-id="${e.id}">Eliminar</button>
                    </div>
                  `:``}
            </div>
          </article>
        `).join(``):`<p class="vacio">No hay productos con estos filtros.</p>`}anadirAlCarrito(e){window.dispatchEvent(new CustomEvent(i,{detail:{productoId:e.id,nombre:e.nombre,precio:this.precioProducto(e),cantidad:1}})),console.log(`Emitido ${i} 🛒`,e.nombre),this.mostrarAviso(`✅ Producto añadido: ${e.nombre} — ${this.formatearPrecio(this.precioProducto(e))}`,`anadido`)}mostrarAviso(e,t){let n=this.shadowRoot.querySelector(`.aviso`);n.textContent=e,n.className=`aviso ${t} visible`,clearTimeout(this.temporizadorAviso),this.temporizadorAviso=setTimeout(()=>n.classList.remove(`visible`),2500)}};customElements.get(`ucjc-descubrimiento`)||customElements.define(`ucjc-descubrimiento`,c);