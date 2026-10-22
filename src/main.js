class UcjcDescubrimiento extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section style="padding: 1rem; border: 2px dashed #3b82f6; border-radius: 8px; font-family: sans-serif;">
        <h2>Soy Descubrimiento</h2>
      </section>
    `;
  }
}

// Registrar el Custom Element si no está registrado
if (!customElements.get('ucjc-descubrimiento')) {
  customElements.define('ucjc-descubrimiento', UcjcDescubrimiento);
}