// Estilos del componente. Van dentro del Shadow DOM, así no chocan con los de otros equipos.
// Se conservan todas las clases y atributos que usa main.js; solo cambia la presentación.
export const ESTILOS = `
  /* ==========================================================
     1. TOKENS (consumen --ucjc-* de la tienda con valor de reserva)
     ========================================================== */
  :host {
    /* Marca UCJC */
    --azul: var(--ucjc-brand, #16307a);
    --azul-claro: var(--ucjc-brand-bright, #2f6bff);
    --azul-suave: var(--ucjc-brand-soft, #eef3ff);
    --oro: var(--ucjc-accent, #e9b10c);
    --oro-brillo: var(--ucjc-accent-bright, #f6d365);

    /* Superficies y texto */
    --fondo: var(--ucjc-bg, #f6f7f9);
    --superficie: var(--ucjc-panel, #ffffff);
    --gris: var(--ucjc-surface-alt, #eff1f5);
    --borde: var(--ucjc-border, #e4e7ec);
    --borde-fuerte: var(--ucjc-border-strong, #cfd5df);
    --texto: var(--ucjc-text, #0b1324);
    --texto-2: var(--ucjc-text-muted, #5b6578);
    --texto-3: var(--ucjc-text-subtle, #8f98a8);
    --texto-inverso: var(--ucjc-text-inverse, #ffffff);

    /* Semánticos (descuentos, edición, borrado y campaña) */
    --peligro: var(--ucjc-danger, #c81e1e);
    --peligro-suave: var(--ucjc-danger-soft, #fef2f2);
    --peligro-borde: var(--ucjc-danger-border, #fecaca);
    --aviso: var(--ucjc-warning, #b45309);
    --aviso-intenso: var(--ucjc-warning-bright, #f59e0b);
    --aviso-suave: var(--ucjc-warning-soft, #fff8eb);
    --aviso-borde: var(--ucjc-warning-border, #fde4b3);
    --campana-bg: var(--ucjc-campaign-bg, #0c0c0e);
    --campana-texto: var(--ucjc-campaign-text, #ffffff);
    --campana-texto-suave: var(--ucjc-campaign-text-muted, #a1a1aa);

    /* Sistema */
    --r-sm: var(--ucjc-radius-sm, 8px);
    --r-md: var(--ucjc-radius, 12px);
    --r-lg: var(--ucjc-radius-lg, 18px);
    --r-full: var(--ucjc-radius-full, 999px);
    --sombra-sm: var(--ucjc-shadow-sm, 0 1px 2px rgba(11, 19, 36, .06));
    --sombra-md: var(--ucjc-shadow-md, 0 12px 28px -12px rgba(11, 19, 36, .22));
    --sombra-lg: var(--ucjc-shadow-lg, 0 28px 60px -18px rgba(11, 19, 36, .35));
    --rapido: 160ms cubic-bezier(.22, 1, .36, 1);
    --medio: 240ms cubic-bezier(.22, 1, .36, 1);

    display: block;
    min-height: 100vh;
    font-family: var(--ucjc-font-sans, "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
    font-size: 15px;
    line-height: 1.5;
    color: var(--texto);
    background: var(--fondo);
    -webkit-font-smoothing: antialiased;
  }

  * { box-sizing: border-box; }
  button, input, select { font: inherit; color: inherit; }

  /* ==========================================================
     2. CABECERA: usuario | buscador | carrito
     ========================================================== */
  .barra-superior {
    position: sticky;
    top: 0;
    z-index: 50;
    display: grid;
    grid-template-columns: 180px 1fr 180px;
    align-items: center;
    gap: 1rem;
    padding: .85rem 2rem;
    background:
      radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--azul-claro) 35%, transparent), transparent 55%),
      var(--azul);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--texto-inverso) 6%, transparent),
      var(--sombra-md);
  }
  .lateral { display: flex; align-items: center; min-height: 2.5rem; color: var(--texto-inverso); }
  .lateral-izq { justify-content: flex-start; }
  .lateral-der { justify-content: flex-end; }
  .hueco {
    padding: .45rem .9rem;
    border: 1px solid color-mix(in srgb, var(--texto-inverso) 18%, transparent);
    border-radius: var(--r-full);
    background: color-mix(in srgb, var(--texto-inverso) 8%, transparent);
    color: color-mix(in srgb, var(--texto-inverso) 90%, transparent);
    font-size: .85rem;
    font-weight: 500;
  }

  .barra-busqueda {
    position: relative;
    display: flex;
    align-items: center;
    gap: .25rem;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    padding: .3rem .3rem .3rem 2.6rem;
    border-radius: var(--r-full);
    background: var(--superficie);
  }
  /* Lupa pintada con máscara para heredar exactamente el token --texto-3 */
  .barra-busqueda::before {
    content: "";
    position: absolute;
    left: 1rem;
    width: 18px;
    height: 18px;
    background-color: var(--texto-3);
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E") no-repeat center / contain;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E") no-repeat center / contain;
    pointer-events: none;
  }
  .barra-busqueda:focus-within {
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--azul-claro) 40%, transparent);
  }
  .barra-busqueda input {
    flex: 1;
    min-width: 0;
    padding: .55rem .4rem;
    border: none;
    background: transparent;
    color: var(--texto);
  }
  .barra-busqueda input::placeholder { color: var(--texto-3); }
  .barra-busqueda input:focus-visible { outline: none; }
  .barra-busqueda button {
    padding: .55rem 1.3rem;
    border: none;
    border-radius: var(--r-full);
    background: var(--azul);
    color: var(--texto-inverso);
    font-weight: 600;
    cursor: pointer;
  }
  .barra-busqueda button:hover { background: var(--azul-claro); }
  .barra-busqueda button:active { transform: scale(.96); }

  /* ==========================================================
     3. MONEDA (control segmentado)
     ========================================================== */
  .selector-moneda {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: .35rem;
    padding: .55rem 2rem;
    background: var(--superficie);
    border-bottom: 1px solid var(--borde);
    font-size: .8rem;
    color: var(--texto-3);
  }
  .selector-moneda span { margin-right: .35rem; }
  .selector-moneda button {
    padding: .3rem .75rem;
    border: 1px solid transparent;
    border-radius: var(--r-full);
    background: var(--gris);
    color: var(--texto-2);
    font-size: .8rem;
    font-weight: 600;
    cursor: pointer;
  }
  .selector-moneda button:hover { color: var(--texto); }
  .selector-moneda button[aria-pressed="true"] {
    background: var(--superficie);
    border-color: var(--borde);
    color: var(--azul);
    box-shadow: var(--sombra-sm);
  }

  /* ==========================================================
     4. FRANJA BLACK FRIDAY
     ========================================================== */
  .franja-black-friday {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.1rem 2rem;
    color: var(--campana-texto);
    background:
      repeating-linear-gradient(
        -45deg,
        color-mix(in srgb, var(--oro) 7%, transparent) 0 12px,
        transparent 12px 24px
      ),
      var(--campana-bg);
  }
  .franja-black-friday::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--oro), transparent);
  }
  .bf-titulo { display: flex; flex-direction: column; gap: .15rem; }
  .bf-titulo strong {
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: .22em;
    background: linear-gradient(90deg, var(--campana-texto) 30%, var(--oro-brillo));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .bf-titulo span { color: var(--campana-texto-suave); font-size: .85rem; }
  .boton-black-friday {
    padding: .65rem 1.25rem;
    border: 1px solid var(--oro);
    border-radius: var(--r-full);
    background: var(--oro);
    color: var(--campana-bg);
    font-weight: 800;
    letter-spacing: .02em;
    cursor: pointer;
  }
  .boton-black-friday:hover {
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--oro) 22%, transparent),
      0 0 24px color-mix(in srgb, var(--oro) 35%, transparent);
  }
  .boton-black-friday:active { transform: scale(.96); }

  /* ==========================================================
     5. BARRA DE SESIÓN / ADMINISTRACIÓN
     ========================================================== */
  .barra-admin {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: .6rem 2rem;
    background: var(--azul-suave);
    border-bottom: 1px solid var(--borde);
    color: var(--azul);
    font-size: .85rem;
    font-weight: 500;
  }
  .btn-admin {
    padding: .5rem 1rem;
    border: none;
    border-radius: var(--r-full);
    background: var(--azul);
    color: var(--texto-inverso);
    font-weight: 600;
    cursor: pointer;
  }
  .btn-admin:hover { background: var(--azul-claro); }
  .btn-admin:active { transform: scale(.96); }

  /* ==========================================================
     6. CATEGORÍAS
     ========================================================== */
  .navegacion {
    display: flex;
    gap: .4rem;
    overflow-x: auto;
    padding: .85rem 2rem;
    background: var(--superficie);
    border-bottom: 1px solid var(--borde);
    scrollbar-width: none;
  }
  .navegacion::-webkit-scrollbar { display: none; }
  .navegacion button {
    padding: .45rem 1rem;
    border: 1px solid var(--borde);
    border-radius: var(--r-full);
    background: var(--superficie);
    color: var(--texto-2);
    font-size: .9rem;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
  }
  .navegacion button:hover { border-color: var(--borde-fuerte); color: var(--texto); }
  .navegacion button:active { transform: scale(.96); }
  .navegacion button[aria-current="true"] {
    background: var(--texto);
    border-color: var(--texto);
    color: var(--superficie);
    font-weight: 600;
  }

  /* ==========================================================
     7. CUERPO: filtros + resultados
     ========================================================== */
  .cuerpo {
    display: grid;
    grid-template-columns: 236px 1fr;
    gap: 2.5rem;
    max-width: 1320px;
    margin: 0 auto;
    padding: 2rem 2rem 4rem;
  }

  /* Filtros: sin caja, secciones separadas por líneas finas */
  .filtros {
    position: sticky;
    top: 5.5rem;
    align-self: start;
    display: flex;
    flex-direction: column;
  }
  .filtros section { padding: 1.25rem 0; border-bottom: 1px solid var(--borde); }
  .filtros section:first-child { padding-top: 0; }
  .filtros h3 {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0 0 .75rem;
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--texto-3);
  }
  .valor-precio {
    font-size: .9rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: none;
    color: var(--texto);
    font-variant-numeric: tabular-nums;
  }
  .filtros label {
    display: flex;
    align-items: center;
    gap: .6rem;
    margin: 0 -.5rem;
    padding: .4rem .5rem;
    border-radius: var(--r-sm);
    color: var(--texto-2);
    cursor: pointer;
  }
  .filtros label:hover { background: var(--gris); color: var(--texto); }
  .filtros label:has(input:checked) { color: var(--texto); font-weight: 600; }
  .filtros input[type="radio"] { width: 1rem; height: 1rem; margin: 0; accent-color: var(--azul); }
  .filtros input[type="range"] { width: 100%; accent-color: var(--azul); cursor: pointer; }

  .tallas { display: grid; grid-template-columns: repeat(5, 1fr); gap: .4rem; }
  .tallas button {
    padding: .5rem 0;
    border: 1px solid var(--borde);
    border-radius: var(--r-sm);
    background: var(--superficie);
    color: var(--texto-2);
    font-size: .82rem;
    font-weight: 600;
    cursor: pointer;
  }
  .tallas button:hover { border-color: var(--borde-fuerte); color: var(--texto); }
  .tallas button:active { transform: scale(.94); }
  .tallas button[aria-pressed="true"] {
    background: var(--texto);
    border-color: var(--texto);
    color: var(--superficie);
  }

  .limpiar {
    margin-top: 1.25rem;
    padding: .6rem;
    border: none;
    border-radius: var(--r-sm);
    background: transparent;
    color: var(--azul-claro);
    font-weight: 600;
    text-align: left;
    cursor: pointer;
  }
  .limpiar:hover { background: var(--azul-suave); }

  /* Cabecera de resultados */
  .cabecera-resultados {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  .cabecera-resultados p {
    margin: 0;
    font-size: .9rem;
    font-weight: 600;
    color: var(--texto-2);
    font-variant-numeric: tabular-nums;
  }
  .cabecera-resultados select {
    appearance: none;
    padding: .5rem 2.2rem .5rem .9rem;
    border: 1px solid var(--borde);
    border-radius: var(--r-full);
    background-color: var(--superficie);
    color: var(--texto);
    font-size: .85rem;
    font-weight: 500;
    cursor: pointer;
  }
  .cabecera-resultados select:hover { border-color: var(--borde-fuerte); }

  /* ==========================================================
     8. REJILLA Y TARJETAS DE PRODUCTO
     ========================================================== */
  .rejilla {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem 1.25rem;
  }
  .tarjeta {
    display: flex;
    flex-direction: column;
    padding: .6rem;
    border: 1px solid var(--borde);
    border-radius: var(--r-lg);
    background: var(--superficie);
    box-shadow: var(--sombra-sm);
  }
  .tarjeta:hover {
    transform: translateY(-4px);
    border-color: var(--borde-fuerte);
    box-shadow: var(--sombra-md);
  }

  /* Imagen: el texto "Imagen" se oculta y se muestra un icono de bolsa con token */
  .tarjeta .imagen {
    position: relative;
    aspect-ratio: 4 / 5;
    border-radius: calc(var(--r-lg) - .45rem);
    font-size: 0;
    background: linear-gradient(160deg, var(--fondo), var(--gris));
  }
  .tarjeta .imagen::after {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 44px;
    height: 44px;
    background-color: var(--texto-3);
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.4' stroke-linejoin='round'%3E%3Cpath d='M5 8h14l-1 12H6L5 8Z'/%3E%3Cpath d='M9 8V6a3 3 0 0 1 6 0v2'/%3E%3C/svg%3E") no-repeat center / contain;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.4' stroke-linejoin='round'%3E%3Cpath d='M5 8h14l-1 12H6L5 8Z'/%3E%3Cpath d='M9 8V6a3 3 0 0 1 6 0v2'/%3E%3C/svg%3E") no-repeat center / contain;
  }
  .tarjeta:hover .imagen { transform: scale(1.015); }

  .tarjeta .info { display: flex; flex-direction: column; gap: .35rem; flex: 1; padding: .9rem .4rem .3rem; }
  .tarjeta h4 {
    margin: 0;
    font-size: .98rem;
    font-weight: 600;
    line-height: 1.35;
    letter-spacing: -.005em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tarjeta .precio {
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -.01em;
    color: var(--texto);
    font-variant-numeric: tabular-nums;
  }
  .tarjeta .acciones { display: flex; gap: .45rem; margin-top: auto; padding-top: .75rem; }
  .tarjeta .acciones button {
    padding: .6rem .5rem;
    border-radius: var(--r-md);
    font-size: .85rem;
    font-weight: 600;
    cursor: pointer;
  }
  .tarjeta .acciones button:active { transform: scale(.96); }
  .btn-ver { flex: 0 0 auto; min-width: 4.5rem; border: 1px solid var(--borde); background: var(--superficie); color: var(--texto); }
  .btn-ver:hover { border-color: var(--borde-fuerte); background: var(--gris); }
  .btn-anadir { flex: 1; border: 1px solid var(--azul); background: var(--azul); color: var(--texto-inverso); }
  .btn-anadir::before { content: "+ "; font-weight: 700; }
  .btn-anadir:hover { background: var(--azul-claro); border-color: var(--azul-claro); }

  .acciones-tarjeta-admin { display: flex; gap: .4rem; margin-top: .4rem; }
  .btn-editar, .btn-eliminar {
    flex: 1;
    padding: .42rem;
    border-radius: var(--r-sm);
    font-size: .78rem;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-editar { background: var(--aviso-suave); color: var(--aviso); border: 1px solid var(--aviso-borde); }
  .btn-editar:hover { background: var(--aviso-intenso); border-color: var(--aviso-intenso); color: var(--texto-inverso); }
  .btn-eliminar { background: var(--peligro-suave); color: var(--peligro); border: 1px solid var(--peligro-borde); }
  .btn-eliminar:hover { background: var(--peligro); border-color: var(--peligro); color: var(--texto-inverso); }

  .vacio {
    grid-column: 1 / -1;
    padding: 4rem 1rem;
    border: 1.5px dashed var(--borde-fuerte);
    border-radius: var(--r-lg);
    text-align: center;
    color: var(--texto-2);
    font-weight: 500;
  }

  /* Precios con descuento (Black Friday) */
  .precios-tarjeta, .precios-modal { display: flex; align-items: baseline; flex-wrap: wrap; gap: .25rem .55rem; }
  .precio-anterior { text-decoration: line-through; color: var(--texto-3); font-size: .85rem; }
  .tarjeta .precio.precio-rebajado,
  .modal-contenido .precio.precio-rebajado { color: var(--peligro); font-weight: 800; }
  .descuento-bf {
    align-self: center;
    padding: .12rem .5rem;
    border-radius: var(--r-full);
    background: var(--peligro);
    color: var(--texto-inverso);
    font-size: .7rem;
    font-weight: 800;
    letter-spacing: .02em;
  }

  /* ==========================================================
     9. MODAL (ficha y formulario de administración)
     ========================================================== */
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: 1rem;
    background: color-mix(in srgb, var(--texto) 50%, transparent);
    backdrop-filter: blur(6px);
  }
  .modal-contenido {
    display: flex;
    flex-direction: column;
    gap: .9rem;
    width: 100%;
    max-width: 520px;
    max-height: calc(100vh - 2rem);
    overflow-y: auto;
    padding: 2rem;
    border-radius: calc(var(--r-lg) + 4px);
    background: var(--superficie);
    box-shadow: var(--sombra-lg);
  }
  .modal-contenido h3 { margin: 0; font-size: 1.5rem; font-weight: 700; letter-spacing: -.015em; color: var(--texto); }
  .modal-contenido p { margin: 0; color: var(--texto-2); }
  .modal-contenido p strong { color: var(--texto); font-weight: 600; }
  .modal-contenido .precio { font-size: 1.6rem; font-weight: 800; letter-spacing: -.02em; color: var(--azul); }
  .modal-contenido label { display: flex; flex-direction: column; gap: .35rem; font-size: .82rem; font-weight: 600; color: var(--texto-2); }
  .modal-contenido input, .modal-contenido select {
    border: 1px solid var(--borde);
    border-radius: var(--r-sm);
    background: var(--superficie);
    color: var(--texto);
  }
  .modal-contenido input:focus, .modal-contenido select:focus {
    outline: none;
    border-color: var(--azul-claro);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--azul-claro) 20%, transparent);
  }

  .btn-cerrar-modal {
    margin-top: .5rem;
    padding: .7rem;
    border: 1px solid var(--borde);
    border-radius: var(--r-full);
    background: var(--gris);
    color: var(--texto);
    font-weight: 600;
    cursor: pointer;
  }
  .btn-cerrar-modal:hover { background: var(--borde); }

  /* ==========================================================
     10. FOCO Y ANIMACIONES (sin !important)
     ========================================================== */
  button:focus-visible, input:focus-visible, select:focus-visible {
    outline: 2px solid var(--azul-claro);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .barra-busqueda,
    .modal-contenido input,
    .modal-contenido select { transition: border-color var(--rapido), box-shadow var(--rapido); }
    .barra-busqueda button,
    .btn-admin { transition: background var(--rapido), transform var(--rapido); }
    .selector-moneda button { transition: background var(--rapido), color var(--rapido), box-shadow var(--rapido); }
    .boton-black-friday { transition: transform var(--rapido), box-shadow var(--rapido), background var(--rapido); }
    .navegacion button,
    .tallas button,
    .tarjeta .acciones button { transition: background var(--rapido), color var(--rapido), border-color var(--rapido), transform var(--rapido); }
    .filtros label { transition: background var(--rapido), color var(--rapido); }
    .limpiar,
    .btn-cerrar-modal { transition: background var(--rapido); }
    .cabecera-resultados select { transition: border-color var(--rapido); }
    .btn-editar,
    .btn-eliminar { transition: background var(--rapido), color var(--rapido), border-color var(--rapido); }
    .tarjeta {
      transition: transform var(--medio), box-shadow var(--medio), border-color var(--medio);
      animation: entrar 320ms cubic-bezier(.22, 1, .36, 1) both;
    }
    .tarjeta:nth-child(2) { animation-delay: 30ms; }
    .tarjeta:nth-child(3) { animation-delay: 60ms; }
    .tarjeta:nth-child(4) { animation-delay: 90ms; }
    .tarjeta:nth-child(n+5) { animation-delay: 120ms; }
    .tarjeta .imagen { transition: transform var(--medio); }
    .modal-overlay { animation: aparecer 180ms ease-out; }
    .modal-contenido { animation: subir 260ms cubic-bezier(.22, 1, .36, 1); }
  }

  @keyframes entrar { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @keyframes aparecer { from { opacity: 0; } to { opacity: 1; } }
  @keyframes subir { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }

  /* ==========================================================
     11. TEMA BLACK FRIDAY (solo tokens, sin colores a mano)
     ========================================================== */
  :host([data-black-friday]) .barra-superior {
    background:
      radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--oro) 18%, transparent), transparent 55%),
      var(--campana-bg);
  }
  :host([data-black-friday]) .barra-busqueda { background-color: var(--gris); }
  :host([data-black-friday]) .barra-busqueda button,
  :host([data-black-friday]) .btn-anadir,
  :host([data-black-friday]) .btn-admin {
    background: var(--oro);
    border-color: var(--oro);
    color: var(--campana-bg);
  }
  :host([data-black-friday]) .btn-anadir:hover,
  :host([data-black-friday]) .btn-admin:hover {
    background: var(--oro-brillo);
    border-color: var(--oro-brillo);
  }
  :host([data-black-friday]) .selector-moneda button[aria-pressed="true"] { color: var(--oro); }
  :host([data-black-friday]) .navegacion button[aria-current="true"],
  :host([data-black-friday]) .tallas button[aria-pressed="true"] {
    background: var(--oro);
    border-color: var(--oro);
    color: var(--campana-bg);
  }
  :host([data-black-friday]) .tarjeta:hover {
    box-shadow: var(--sombra-lg), 0 0 0 1px color-mix(in srgb, var(--oro) 25%, transparent);
  }
  :host([data-black-friday]) .tarjeta .precio.precio-rebajado,
  :host([data-black-friday]) .modal-contenido .precio { color: var(--oro); }
  :host([data-black-friday]) .descuento-bf { background: var(--oro); color: var(--campana-bg); }
  :host([data-black-friday]) .barra-admin { color: var(--texto-2); border-color: var(--borde); }
  :host([data-black-friday]) .limpiar { color: var(--oro); }
  :host([data-black-friday]) .boton-black-friday { background: transparent; color: var(--oro); }
  :host([data-black-friday]) .boton-black-friday:hover {
    background: color-mix(in srgb, var(--oro) 12%, transparent);
  }

  /* ==========================================================
     12. RESPONSIVE
     ========================================================== */
  @media (max-width: 960px) {
    .barra-superior { padding: .8rem 1.25rem; grid-template-columns: 140px 1fr 140px; }
    .selector-moneda, .franja-black-friday, .barra-admin, .navegacion { padding-left: 1.25rem; padding-right: 1.25rem; }
    .cuerpo { grid-template-columns: 200px 1fr; gap: 1.5rem; padding: 1.5rem 1.25rem 3rem; }
  }
  @media (max-width: 700px) {
    .barra-superior { position: static; grid-template-columns: 1fr 1fr; padding: .75rem 1rem; }
    .barra-busqueda { grid-column: 1 / -1; grid-row: 2; }
    .selector-moneda, .franja-black-friday, .barra-admin, .navegacion { padding-left: 1rem; padding-right: 1rem; }
    .cuerpo { grid-template-columns: 1fr; padding: 1rem 1rem 3rem; }
    .filtros { position: static; }
    .rejilla { grid-template-columns: repeat(2, 1fr); gap: .85rem; }
    .tarjeta { padding: .45rem; }
    .tarjeta .acciones { flex-direction: column; }
    .btn-ver { min-width: 0; }
  }
`;