(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`ropa`,nombre:`Ropa`},{id:`deporte`,nombre:`Deporte`},{id:`material`,nombre:`Material`},{id:`regalos`,nombre:`Regalos`}],t=[`XS`,`S`,`M`,`L`,`XL`],n=[{id:`prod-101`,nombre:`Camiseta Técnica UCJC`,categoria:`deporte`,precioEUR:19.99,precioUSD:21.99,precioGBP:16.68,descuentoBF:20,tallas:[`S`,`M`,`L`,`XL`]},{id:`prod-102`,nombre:`Sudadera con capucha`,categoria:`ropa`,precioEUR:39.95,precioUSD:43.95,precioGBP:33.34,descuentoBF:30,tallas:[`XS`,`S`,`M`,`L`,`XL`]},{id:`prod-103`,nombre:`Chaqueta cortavientos`,categoria:`ropa`,precioEUR:45,precioUSD:49.5,precioGBP:37.55,descuentoBF:25,tallas:[`M`,`L`,`XL`]},{id:`prod-104`,nombre:`Equipación oficial fútbol`,categoria:`deporte`,precioEUR:55,precioUSD:60.5,precioGBP:45.9,descuentoBF:35,tallas:[`S`,`M`,`L`]},{id:`prod-105`,nombre:`Mochila UCJC`,categoria:`material`,precioEUR:29.9,precioUSD:32.89,precioGBP:24.95,descuentoBF:20,tallas:[]},{id:`prod-106`,nombre:`Cuaderno A4`,categoria:`material`,precioEUR:4.5,precioUSD:4.95,precioGBP:3.76,descuentoBF:15,tallas:[]},{id:`prod-107`,nombre:`Taza de graduación`,categoria:`regalos`,precioEUR:9.95,precioUSD:10.95,precioGBP:8.3,descuentoBF:40,tallas:[]},{id:`prod-108`,nombre:`Llavero metálico`,categoria:`regalos`,precioEUR:5,precioUSD:5.5,precioGBP:4.17,descuentoBF:10,tallas:[]}],r=`
  /* ==========================================================
     1. TOKENS (todo el diseño sale de aquí)
     ========================================================== */
  :host {
    /* Marca UCJC */
    --azul: #16307a;
    --azul-claro: #2f6bff;
    --azul-suave: #eef3ff;
    --oro: #e9b10c;

    /* Superficies y texto */
    --fondo: #f6f7f9;
    --superficie: #ffffff;
    --gris: #eff1f5;
    --borde: #e4e7ec;
    --borde-fuerte: #cfd5df;
    --texto: #0b1324;
    --texto-2: #5b6578;
    --texto-3: #8f98a8;

    /* Sistema */
    --r-sm: 8px;
    --r-md: 12px;
    --r-lg: 18px;
    --r-full: 999px;
    --sombra-sm: 0 1px 2px rgba(11, 19, 36, .06);
    --sombra-md: 0 12px 28px -12px rgba(11, 19, 36, .22);
    --sombra-lg: 0 28px 60px -18px rgba(11, 19, 36, .35);
    --rapido: 160ms cubic-bezier(.22, 1, .36, 1);
    --medio: 240ms cubic-bezier(.22, 1, .36, 1);

    display: block;
    min-height: 100vh;
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
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
      radial-gradient(120% 140% at 0% 0%, rgba(47, 107, 255, .35), transparent 55%),
      var(--azul);
    box-shadow: 0 1px 0 rgba(255, 255, 255, .06), 0 8px 24px -16px rgba(11, 19, 36, .6);
  }
  .lateral { display: flex; align-items: center; min-height: 2.5rem; color: white; }
  .lateral-izq { justify-content: flex-start; }
  .lateral-der { justify-content: flex-end; }
  .hueco {
    padding: .45rem .9rem;
    border: 1px solid rgba(255, 255, 255, .18);
    border-radius: var(--r-full);
    background: rgba(255, 255, 255, .08);
    color: rgba(255, 255, 255, .9);
    font-size: .85rem;
    font-weight: 500;
  }

  .barra-busqueda {
    display: flex;
    align-items: center;
    gap: .25rem;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    padding: .3rem .3rem .3rem 2.6rem;
    border-radius: var(--r-full);
    /* Lupa dibujada con SVG en el fondo: no hace falta tocar el HTML */
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' stroke='%238f98a8' stroke-width='2' stroke-linecap='round' viewBox='0 0 24 24'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E")
      no-repeat 1rem center,
      white;
    transition: box-shadow var(--rapido);
  }
  .barra-busqueda:focus-within { box-shadow: 0 0 0 4px rgba(47, 107, 255, .4); }
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
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--rapido), transform var(--rapido);
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
    transition: background var(--rapido), color var(--rapido), box-shadow var(--rapido);
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
    color: white;
    background:
      repeating-linear-gradient(-45deg, rgba(233, 177, 12, .07) 0 12px, transparent 12px 24px),
      #0c0c0e;
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
    background: linear-gradient(90deg, #fff 30%, #f6d365);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .bf-titulo span { color: #a1a1aa; font-size: .85rem; }
  .boton-black-friday {
    padding: .65rem 1.25rem;
    border: 1px solid var(--oro);
    border-radius: var(--r-full);
    background: var(--oro);
    color: #111;
    font-weight: 800;
    letter-spacing: .02em;
    cursor: pointer;
    transition: transform var(--rapido), box-shadow var(--rapido), background var(--rapido);
  }
  .boton-black-friday:hover { box-shadow: 0 0 0 5px rgba(233, 177, 12, .22), 0 0 24px rgba(233, 177, 12, .35); }
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
    border-bottom: 1px solid #dbe4ff;
    color: var(--azul);
    font-size: .85rem;
    font-weight: 500;
  }
  .btn-admin {
    padding: .5rem 1rem;
    border: none;
    border-radius: var(--r-full);
    background: var(--azul);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--rapido), transform var(--rapido);
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
    transition: background var(--rapido), color var(--rapido), border-color var(--rapido), transform var(--rapido);
  }
  .navegacion button:hover { border-color: var(--borde-fuerte); color: var(--texto); }
  .navegacion button:active { transform: scale(.96); }
  .navegacion button[aria-current="true"] {
    background: var(--texto);
    border-color: var(--texto);
    color: white;
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
    transition: background var(--rapido), color var(--rapido);
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
    transition: background var(--rapido), border-color var(--rapido), color var(--rapido), transform var(--rapido);
  }
  .tallas button:hover { border-color: var(--borde-fuerte); color: var(--texto); }
  .tallas button:active { transform: scale(.94); }
  .tallas button[aria-pressed="true"] { background: var(--texto); border-color: var(--texto); color: white; }

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
    transition: background var(--rapido);
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
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%235b6578' stroke-width='2' stroke-linecap='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")
      no-repeat right .85rem center,
      var(--superficie);
    font-size: .85rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color var(--rapido);
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
    transition: transform var(--medio), box-shadow var(--medio), border-color var(--medio);
    animation: entrar 320ms cubic-bezier(.22, 1, .36, 1) both;
  }
  .tarjeta:nth-child(2) { animation-delay: 30ms; }
  .tarjeta:nth-child(3) { animation-delay: 60ms; }
  .tarjeta:nth-child(4) { animation-delay: 90ms; }
  .tarjeta:nth-child(n+5) { animation-delay: 120ms; }
  .tarjeta:hover {
    transform: translateY(-4px);
    border-color: var(--borde-fuerte);
    box-shadow: var(--sombra-md);
  }

  /* Imagen: el texto "Imagen" se oculta y se muestra un icono de bolsa */
  .tarjeta .imagen {
    aspect-ratio: 4 / 5;
    border-radius: calc(var(--r-lg) - .45rem);
    font-size: 0;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' fill='none' stroke='%23b4bccb' stroke-width='1.4' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='M5 8h14l-1 12H6L5 8Z'/%3E%3Cpath d='M9 8V6a3 3 0 0 1 6 0v2'/%3E%3C/svg%3E")
      no-repeat center,
      linear-gradient(160deg, #f3f5f9, #e6eaf1);
    transition: transform var(--medio);
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
    transition: background var(--rapido), color var(--rapido), border-color var(--rapido), transform var(--rapido);
  }
  .tarjeta .acciones button:active { transform: scale(.96); }
  .btn-ver { flex: 0 0 auto; min-width: 4.5rem; border: 1px solid var(--borde); background: var(--superficie); color: var(--texto); }
  .btn-ver:hover { border-color: var(--borde-fuerte); background: var(--gris); }
  .btn-anadir { flex: 1; border: 1px solid var(--azul); background: var(--azul); color: white; }
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
    transition: background var(--rapido), color var(--rapido), border-color var(--rapido);
  }
  .btn-editar { background: #fff8eb; color: #b45309; border: 1px solid #fde4b3; }
  .btn-editar:hover { background: #f59e0b; border-color: #f59e0b; color: white; }
  .btn-eliminar { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
  .btn-eliminar:hover { background: #dc2626; border-color: #dc2626; color: white; }

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
  .precio-rebajado { color: #c81e1e !important; font-weight: 800; }
  .descuento-bf {
    align-self: center;
    padding: .12rem .5rem;
    border-radius: var(--r-full);
    background: #c81e1e;
    color: white;
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
    background: rgba(11, 19, 36, .5);
    backdrop-filter: blur(6px);
    animation: aparecer 180ms ease-out;
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
    border-radius: 22px;
    background: var(--superficie);
    box-shadow: var(--sombra-lg);
    animation: subir 260ms cubic-bezier(.22, 1, .36, 1);
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
    transition: border-color var(--rapido), box-shadow var(--rapido);
  }
  .modal-contenido input:focus, .modal-contenido select:focus {
    outline: none;
    border-color: var(--azul-claro);
    box-shadow: 0 0 0 3px rgba(47, 107, 255, .2);
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
    transition: background var(--rapido);
  }
  .btn-cerrar-modal:hover { background: var(--borde); }

  /* ==========================================================
     10. FOCO Y ANIMACIONES
     ========================================================== */
  button:focus-visible, input:focus-visible, select:focus-visible {
    outline: 2px solid var(--azul-claro);
    outline-offset: 2px;
  }

  @keyframes entrar { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @keyframes aparecer { from { opacity: 0; } to { opacity: 1; } }
  @keyframes subir { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }

  /* ==========================================================
     11. TEMA BLACK FRIDAY (limitado al Shadow DOM)
     ========================================================== */
  :host([data-black-friday]) {
    --azul: #f2f2f2; --azul-claro: var(--oro); --azul-suave: #17171a;
    --fondo: #0b0b0d; --superficie: #141417; --gris: #1d1d21;
    --borde: #27272c; --borde-fuerte: #3a3a41;
    --texto: #f4f4f5; --texto-2: #a1a1aa; --texto-3: #71717a;
    background: var(--fondo);
    color: var(--texto);
  }
  :host([data-black-friday]) .barra-superior {
    background: radial-gradient(120% 140% at 0% 0%, rgba(233, 177, 12, .18), transparent 55%), #050506;
  }
  :host([data-black-friday]) .barra-busqueda { background-color: #1d1d21; }
  :host([data-black-friday]) .barra-busqueda button,
  :host([data-black-friday]) .btn-anadir,
  :host([data-black-friday]) .btn-admin { background: var(--oro); border-color: var(--oro); color: #111; }
  :host([data-black-friday]) .btn-anadir:hover,
  :host([data-black-friday]) .btn-admin:hover { background: #f6c935; border-color: #f6c935; }
  :host([data-black-friday]) .selector-moneda button[aria-pressed="true"] { color: var(--oro); }
  :host([data-black-friday]) .navegacion button[aria-current="true"],
  :host([data-black-friday]) .tallas button[aria-pressed="true"] { background: var(--oro); border-color: var(--oro); color: #111; }
  :host([data-black-friday]) .tarjeta .imagen {
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' fill='none' stroke='%2352525b' stroke-width='1.4' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='M5 8h14l-1 12H6L5 8Z'/%3E%3Cpath d='M9 8V6a3 3 0 0 1 6 0v2'/%3E%3C/svg%3E")
      no-repeat center,
      linear-gradient(160deg, #1d1d21, #26262b);
  }
  :host([data-black-friday]) .tarjeta:hover { box-shadow: 0 16px 36px -14px rgba(0, 0, 0, .8), 0 0 0 1px rgba(233, 177, 12, .25); }
  :host([data-black-friday]) .precio-rebajado,
  :host([data-black-friday]) .modal-contenido .precio { color: var(--oro) !important; }
  :host([data-black-friday]) .descuento-bf { background: var(--oro); color: #111; }
  :host([data-black-friday]) .barra-admin { color: var(--texto-2); border-color: var(--borde); }
  :host([data-black-friday]) .limpiar { color: var(--oro); }
  :host([data-black-friday]) .boton-black-friday { background: transparent; color: var(--oro); }
  :host([data-black-friday]) .boton-black-friday:hover { background: rgba(233, 177, 12, .12); }

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

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`,i=`ucjc:descubrimiento:anadir-al-carrito@1`,a=`ucjc:identidad:sesion-cambiada@1`,o={EUR:60,USD:70,GBP:50},s=.8345,c=`
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
`,l=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.estado=this.estadoInicial()}estadoInicial(){return{busqueda:``,categoria:`todo`,precioMax:o.EUR,moneda:`EUR`,modoBlackFriday:!1,tallas:[],orden:`relevancia`,productoSeleccionado:null,usuarioActivo:null,esAdmin:!1,listaProductos:n.map(e=>({...e,tallas:[...e.tallas]}))}}precioBaseProducto(e){return this.estado.moneda===`USD`?e.precioUSD:this.estado.moneda===`GBP`?e.precioGBP??Math.floor(Math.round(e.precioEUR*100)*s+1e-9)/100:e.precioEUR}precioProducto(e){let t=this.precioBaseProducto(e);if(!this.estado.modoBlackFriday)return t;let n=Number(e.descuentoBF)||0;return Math.round(t*(100-n))/100}precioEnEuros(e){let t=e.precioEUR;if(!this.estado.modoBlackFriday)return t;let n=Number(e.descuentoBF)||0;return Math.round(t*(100-n))/100}detallePrecio(e){let t=this.formatearPrecio(this.precioProducto(e));return!this.estado.modoBlackFriday||!e.descuentoBF?`<span class="precio">${t}</span>`:`<span class="precio-anterior">${this.formatearPrecio(this.precioBaseProducto(e))}</span>
      <span class="precio precio-rebajado">${t}</span>
      <span class="descuento-bf">-${e.descuentoBF}%</span>`}formatearPrecio(e){return new Intl.NumberFormat(`es-ES`,{style:`currency`,currency:this.estado.moneda}).format(e)}connectedCallback(){this.pintarEstructura(),this.conectarEventos(),this.escucharSesion(),this.pintarProductos()}escucharSesion(){window.addEventListener(a,e=>{let{autenticado:t=!1,usuario:n=null}=e.detail||{};this.estado.usuarioActivo=t&&n?n:null,this.estado.esAdmin=!1,this.actualizarBarraAdmin(),this.pintarProductos()})}pintarEstructura(){this.shadowRoot.innerHTML=`
      <style>${r}${c}</style>

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
                  <label>Precio (£): <input type="number" min="0" step="0.01" name="precioGBP" value="${r?``:n.precioGBP??``}" required style="width:100%; padding:0.4rem;" /></label>
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
                <div class="precios-modal">${this.detallePrecio(n)}</div>
                <p><strong>Categoría:</strong> ${n.categoria}</p>
                <p><strong>Tallas disponibles:</strong> ${n.tallas.length>0?n.tallas.join(`, `):`Única`}</p>
                <p>Vista detallada del producto dentro del micro-frontend de Descubrimiento.</p>
                ${this.estado.esAdmin?`<button type="button" class="btn-admin" data-accion="pasar-a-editar" style="margin-top:0.5rem;">Modificar / Editar este producto</button>`:``}
                <button type="button" class="btn-cerrar-modal" data-accion="cerrar">Cerrar</button>
              `}
        </div>
      </div>
    `}conectarEventos(){let e=this.shadowRoot;e.querySelector(`.boton-black-friday`).addEventListener(`click`,()=>{this.estado.modoBlackFriday=!this.estado.modoBlackFriday;let t=this.estado.modoBlackFriday;this.toggleAttribute(`data-black-friday`,t);let n=e.querySelector(`.boton-black-friday`);n.textContent=t?`Desactivar Black Friday`:`Activar Black Friday`,n.setAttribute(`aria-pressed`,String(t)),this.pintarProductos(),this.actualizarModal()}),e.querySelector(`.selector-moneda`).addEventListener(`click`,t=>{let n=t.target.closest(`button[data-moneda]`);if(!n)return;this.estado.moneda=n.dataset.moneda,this.estado.precioMax=o[this.estado.moneda],e.querySelectorAll(`.selector-moneda button`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.moneda===this.estado.moneda)));let r=e.querySelector(`input[name="precio"]`);r.max=this.estado.precioMax,r.value=this.estado.precioMax,e.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),this.pintarProductos(),this.actualizarModal()}),e.querySelector(`.barra-busqueda`).addEventListener(`submit`,e=>{e.preventDefault(),this.estado.busqueda=e.target.q.value.trim().toLowerCase(),this.pintarProductos()}),e.querySelector(`.navegacion`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-categoria]`);t&&this.cambiarCategoria(t.dataset.categoria)}),e.querySelectorAll(`input[name="categoria"]`).forEach(e=>e.addEventListener(`change`,()=>this.cambiarCategoria(e.value))),e.querySelector(`input[name="precio"]`).addEventListener(`input`,t=>{this.estado.precioMax=Number(t.target.value),e.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),this.pintarProductos()}),e.querySelector(`.tallas`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-talla]`);if(!t)return;let n=t.dataset.talla,r=this.estado.tallas.includes(n);this.estado.tallas=r?this.estado.tallas.filter(e=>e!==n):[...this.estado.tallas,n],t.setAttribute(`aria-pressed`,String(!r)),this.pintarProductos()}),e.querySelector(`select[name="orden"]`).addEventListener(`change`,e=>{this.estado.orden=e.target.value,this.pintarProductos()}),e.querySelector(`.limpiar`).addEventListener(`click`,()=>this.limpiarFiltros()),e.addEventListener(`click`,e=>{e.target.closest(`[data-accion="nuevo-producto"]`)&&(this.estado.productoSeleccionado={id:`nuevo`,nombre:``,precioEUR:0,precioUSD:0,precioGBP:0,categoria:`ropa`,tallas:[]},this.actualizarModal())}),e.querySelector(`.rejilla`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-accion]`);if(!t)return;let n=t.dataset.id,r=this.estado.listaProductos.find(e=>e.id===n);t.dataset.accion===`anadir`&&this.anadirAlCarrito(r),t.dataset.accion===`ver`&&(this.estado.productoSeleccionado={...r,editando:!1},this.actualizarModal()),t.dataset.accion===`editar`&&(this.estado.productoSeleccionado={...r,editando:!0},this.actualizarModal()),t.dataset.accion===`eliminar`&&confirm(`¿Estás seguro de eliminar "${r.nombre}"?`)&&(this.estado.listaProductos=this.estado.listaProductos.filter(e=>e.id!==n),this.pintarProductos(),this.mostrarAviso(`🗑️ Producto eliminado: ${r.nombre}`,`eliminado`))}),e.querySelector(`#modal-container`).addEventListener(`click`,e=>{e.target.closest(`.modal-contenido`)&&!e.target.closest(`[data-accion="cerrar"]`)?e.target.closest(`[data-accion="pasar-a-editar"]`)&&(this.estado.productoSeleccionado.editando=!0,this.actualizarModal()):(this.estado.productoSeleccionado=null,this.actualizarModal())}),e.querySelector(`#modal-container`).addEventListener(`submit`,e=>{if(e.preventDefault(),e.target.id===`form-producto`){let t=new FormData(e.target),n=t.get(`nombre`),r=parseFloat(t.get(`precioEUR`)),i=parseFloat(t.get(`precioUSD`)),a=parseFloat(t.get(`precioGBP`));if(![r,i,a].every(e=>Number.isFinite(e)&&e>=0))return;let o=t.get(`categoria`);if(this.estado.productoSeleccionado.id===`nuevo`){let e={id:`prod-${Date.now()}`,nombre:n,precioEUR:r,precioUSD:i,precioGBP:a,categoria:o,tallas:[`M`,`L`]};this.estado.listaProductos.push(e)}else{let e=this.estado.productoSeleccionado.id,t=this.estado.listaProductos.find(t=>t.id===e);t&&(t.nombre=n,t.precioEUR=r,t.precioUSD=i,t.precioGBP=a,t.categoria=o)}this.estado.productoSeleccionado=null,this.actualizarModal(),this.pintarProductos()}})}cambiarCategoria(e){this.estado.categoria=e;let t=this.shadowRoot;t.querySelectorAll(`.navegacion button`).forEach(t=>t.setAttribute(`aria-current`,String(t.dataset.categoria===e))),t.querySelector(`input[name="categoria"][value="${e}"]`).checked=!0,this.pintarProductos()}limpiarFiltros(){let{moneda:e,listaProductos:t,usuarioActivo:n,modoBlackFriday:r}=this.estado;this.estado={...this.estadoInicial(),moneda:e,listaProductos:t,usuarioActivo:n,modoBlackFriday:r,precioMax:o[e]};let i=this.shadowRoot;i.querySelector(`input[name="q"]`).value=``,i.querySelector(`input[name="precio"]`).max=this.estado.precioMax,i.querySelector(`input[name="precio"]`).value=this.estado.precioMax,i.querySelector(`.valor-precio`).textContent=this.formatearPrecio(this.estado.precioMax),i.querySelector(`select[name="orden"]`).value=`relevancia`,i.querySelectorAll(`.tallas button`).forEach(e=>e.setAttribute(`aria-pressed`,`false`)),this.cambiarCategoria(`todo`)}productosFiltrados(){let{busqueda:e,categoria:t,precioMax:n,tallas:r,orden:i,listaProductos:a}=this.estado,o=a.filter(i=>(t===`todo`||i.categoria===t)&&this.precioProducto(i)<=n&&(!e||i.nombre.toLowerCase().includes(e))&&(r.length===0||r.some(e=>i.tallas.includes(e))));return i===`precio-asc`&&o.sort((e,t)=>this.precioProducto(e)-this.precioProducto(t)),i===`precio-desc`&&o.sort((e,t)=>this.precioProducto(t)-this.precioProducto(e)),i===`nombre`&&o.sort((e,t)=>e.nombre.localeCompare(t.nombre)),o}pintarProductos(){let e=this.productosFiltrados(),t=this.shadowRoot;t.querySelector(`.contador`).textContent=`${e.length} producto${e.length===1?``:`s`}`,t.querySelector(`.rejilla`).innerHTML=e.length?e.map(e=>`
          <article class="tarjeta">
            <div class="imagen">Imagen</div>
            <div class="info">
              <h4>${e.nombre}</h4>
              <div class="precios-tarjeta">${this.detallePrecio(e)}</div>
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
        `).join(``):`<p class="vacio">No hay productos con estos filtros.</p>`}anadirAlCarrito(e){window.dispatchEvent(new CustomEvent(i,{detail:{productoId:e.id,nombre:e.nombre,precio:this.precioEnEuros(e),cantidad:1}})),console.log(`Emitido ${i} 🛒`,e.nombre),this.mostrarAviso(`✅ Producto añadido: ${e.nombre} — ${this.formatearPrecio(this.precioProducto(e))}`,`anadido`)}mostrarAviso(e,t){let n=this.shadowRoot.querySelector(`.aviso`);n.textContent=e,n.className=`aviso ${t} visible`,clearTimeout(this.temporizadorAviso),this.temporizadorAviso=setTimeout(()=>n.classList.remove(`visible`),2500)}};customElements.get(`ucjc-descubrimiento`)||customElements.define(`ucjc-descubrimiento`,l);