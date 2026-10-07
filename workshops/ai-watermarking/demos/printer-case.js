/* EFF's photographed DocuColor sample, revealed in three presenter-controlled steps.
   This displays EFF's documented readout. It does not claim to extract bits from pixels. */
(function (root) {
  'use strict';
  const steps = [
    {
      title: 'Looks blank enough.',
      text: 'There are tiny yellow dots in this photograph.',
      caption: 'White light · EFF microscope photograph · 10×',
      image: '../assets/printer-eff-white-light.jpg',
      alt: 'An EFF microscope photograph of a pale sheet of paper with extremely faint yellow tracking dots under white light.'
    },
    {
      title: 'Now look under blue light.',
      text: 'The yellow dots turn dark. The pattern repeats across the page.',
      caption: 'Blue light · EFF 10× source, enlarged here',
      image: '../assets/printer-eff-blue-light.jpg',
      alt: 'The same Xerox DocuColor 12 page under blue light, showing a rectangular pattern of dark tracking dots.'
    },
    {
      title: 'A printer ID. And a timestamp.',
      text: 'EFF decoded this sample in 2005.',
      caption: 'EFF’s annotated grid · dots enlarged by EFF',
      image: '../assets/printer-eff-decoding-guide.png',
      alt: 'EFF annotated decoding guide showing the dot columns for time, date and serial number, with the sample readout 2005-06-21 12:50, serial 21052857 or 052857.'
    }
  ];

  function mount(stage) {
    stage.querySelectorAll('.printer-case').forEach(host => {
      if (host.dataset.mounted) return;
      host.dataset.mounted = 'true';
      host.dataset.step = '0';
      host.innerHTML = `<div class="printer-case-layout">
        <figure class="printer-case-figure">
          <div class="printer-case-images">${steps.map((step, index) => `<img class="printer-case-image ${index === 0 ? 'is-visible' : ''}" src="${step.image}" alt="${step.alt}" data-printer-image="${index}"${index ? ' aria-hidden="true"' : ''}>`).join('')}</div>
          <figcaption data-printer-caption>${steps[0].caption}</figcaption>
        </figure>
        <div class="printer-case-explanation" aria-live="polite">
          <p class="printer-case-heading" data-printer-heading>${steps[0].title}</p>
          <p class="printer-case-copy" data-printer-copy>${steps[0].text}</p>
          <div class="printer-case-readout" hidden>
            <div><span>PRINTER SERIAL</span><strong>21052857</strong><small>or 052857, depending on serial format</small></div>
            <div class="printer-case-date"><div><span>DATE</span><strong>21 Jun 2005</strong></div><div><span>TIME</span><strong>12:50</strong></div></div>
            <p>From the printer’s clock. This identifies a device, not who pressed Print.</p>
          </div>
        </div>
      </div>
      <div class="printer-case-controls" role="group" aria-label="Reveal printer tracking dots">
        <button type="button" data-printer-step="0" aria-pressed="true">1. White light</button>
        <button type="button" data-printer-step="1" aria-pressed="false">2. Magnify + blue light</button>
        <button type="button" data-printer-step="2" aria-pressed="false">3. Read the code</button>
        <a href="https://w2.eff.org/Privacy/printers/docucolor/" target="_blank" rel="noopener">Open EFF’s decoding guide ↗</a>
      </div>`;

      const show = index => {
        const step = steps[index];
        host.dataset.step = String(index);
        host.querySelector('[data-printer-heading]').textContent = step.title;
        host.querySelector('[data-printer-copy]').textContent = step.text;
        host.querySelector('[data-printer-caption]').textContent = step.caption;
        host.querySelector('.printer-case-readout').hidden = index !== 2;
        host.querySelectorAll('[data-printer-image]').forEach(img => {
          const visible = Number(img.dataset.printerImage) === index;
          img.classList.toggle('is-visible', visible);
          img.setAttribute('aria-hidden', String(!visible));
        });
        host.querySelectorAll('[data-printer-step]').forEach(button => {
          button.setAttribute('aria-pressed', String(Number(button.dataset.printerStep) === index));
        });
      };
      host.querySelectorAll('[data-printer-step]').forEach(button => {
        button.addEventListener('click', () => show(Number(button.dataset.printerStep)));
      });
    });
  }
  root.PrinterCase = { mount };
})(window);
