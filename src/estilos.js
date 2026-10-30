// Estilos del componente. Van dentro del Shadow DOM, así no chocan con los de otros equipos.
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
    /* Usuario y carrito arriba, buscador debajo ocupando todo el ancho */
    .barra-superior { grid-template-columns: 1fr 1fr; }
    .barra-busqueda { grid-column: 1 / -1; grid-row: 2; }
  }
`;
