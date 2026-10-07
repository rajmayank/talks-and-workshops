/* Select corresponding pixels without changing their example values. */
(() => {
  'use strict';
  const signed = value => value > 0 ? `+${value}` : String(value).replace('-', '−');
  document.querySelectorAll('.pixel-residual-demo').forEach(demo => {
    const slide = demo.closest('.slide');
    const cells = [...demo.querySelectorAll('[data-pixel]')];
    function select(index) {
      const read = panel => demo.querySelector(`[data-pixel-panel="${panel}"] [data-pixel="${index}"]`).dataset.rgb.split(',').map(Number);
      const original = read('original');
      const encoded = read('encoded');
      const residual = encoded.map((value, channel) => value - original[channel]);
      cells.forEach(cell => {
        const selected = Number(cell.dataset.pixel) === index;
        cell.classList.toggle('is-selected', selected);
        cell.setAttribute('aria-pressed', String(selected));
      });
      slide.querySelector('[data-pixel-position]').textContent = `Pixel (${Math.floor(index / 3) + 1}, ${index % 3 + 1})`;
      for (const [name, values] of Object.entries({original, encoded, residual})) {
        slide.querySelector(`[data-pixel-term="${name}"]`).textContent = `(${values.map(value => name === 'residual' ? signed(value) : value).join(', ')})`;
      }
    }
    demo.addEventListener('click', event => {
      const cell = event.target.closest('[data-pixel]');
      if (cell && demo.contains(cell)) select(Number(cell.dataset.pixel));
    });
    select(0);
  });
})();
