// Estilos del componente. Van dentro del Shadow DOM, así no chocan con los de otros equipos[cite: 2].
export const ESTILOS = `
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

  /* Tema Black Friday: estilos limitados al Shadow DOM */
  .franja-black-friday { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:.8rem; padding:1rem 1.2rem; color:white; background:#171717; border-bottom:3px solid #eab308; }
  .bf-titulo { display:flex; flex-direction:column; gap:.2rem; }
  .bf-titulo strong { font-size:1.15rem; letter-spacing:.13em; }
  .bf-titulo span { color:#d4d4d4; font-size:.85rem; }
  .boton-black-friday { background:#eab308; color:#151515; padding:.65rem 1rem; border:1px solid #eab308; border-radius:8px; font-weight:800; cursor:pointer; }
  .precios-tarjeta,.precios-modal { display:flex; align-items:center; flex-wrap:wrap; gap:.4rem .6rem; }
  .precio-anterior { text-decoration:line-through; color:#737373; font-size:.9rem; }
  .precio-rebajado { color:#b91c1c !important; font-weight:800; }
  .descuento-bf { color:white; background:#b91c1c; padding:.2rem .45rem; border-radius:4px; font-size:.75rem; font-weight:800; }
  :host([data-black-friday]) { --azul:#111; --azul-claro:#b91c1c; --gris:#242424; --borde:#444; --texto:#eee; background:#101010; color:#eee; }
  :host([data-black-friday]) .barra-superior { background:#080808; }
  :host([data-black-friday]) .selector-moneda { background:#242424; color:#fff; }
  :host([data-black-friday]) .selector-moneda button { background:#292929; color:#fff; border-color:#eab308; }
  :host([data-black-friday]) .selector-moneda button[aria-pressed="true"] { background:#eab308; color:#111; }
  :host([data-black-friday]) .navegacion { background:#181818; border-color:#444; }
  :host([data-black-friday]) .navegacion button { color:#eee; }
  :host([data-black-friday]) .navegacion button[aria-current="true"] { color:#facc15; border-bottom-color:#facc15; }
  :host([data-black-friday]) .tarjeta { background:#222; color:#fff; border-color:#444; }
  :host([data-black-friday]) .tarjeta .imagen { background:#303030; }
  :host([data-black-friday]) .precio-rebajado { color:#facc15 !important; }
  :host([data-black-friday]) .precio-anterior { color:#a3a3a3; }
  :host([data-black-friday]) .filtros h3,:host([data-black-friday]) .contador { color:#d4d4d4; }
  :host([data-black-friday]) .tallas button,:host([data-black-friday]) .limpiar { background:#262626; color:#fff; border-color:#555; }
  :host([data-black-friday]) .tallas button[aria-pressed="true"] { background:#b91c1c; }
  :host([data-black-friday]) .modal-contenido { background:#242424; color:#fff; }
  :host([data-black-friday]) .modal-contenido h3 { color:#facc15; }
  :host([data-black-friday]) .barra-admin { background:#222; color:#eee; border-color:#444; }
  :host([data-black-friday]) .btn-anadir { background:#eab308; color:#111; }
  :host([data-black-friday]) .btn-ver { background:#333; color:#fff; border-color:#888; }
  :host([data-black-friday]) .boton-black-friday { background:#333; color:#facc15; }

`;
