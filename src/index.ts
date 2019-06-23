import { decode } from './utils/jwt';

const encodedElement = document.getElementById('encoded');
const decodedElement = document.getElementById('decoded');

const handleEncodedChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.innerText) {
    decodedElement.innerText = null;
    return;
  }

  const segments = input.innerText.split('.');
  input.innerHTML = `
    <span class="jwt-segment">${segments[0]}</span><span>.</span><span class="jwt-segment">${segments[1]}</span><span>.</span><span class="jwt-segment">${segments[2]}</span>
  `;

  const decodedJwt = decode(input.innerText);
  decodedElement.innerHTML = `
    <section class="decoded-header">
      <h2 class="section-header">Header</h2>
      <div class="section-body">${JSON.stringify(
        decodedJwt.header,
        null,
        2,
      )}</div>
    </section>
    <section class="decoded-header">
      <h2 class="section-header">Payload</h2>
      <div class="section-body">${JSON.stringify(
        decodedJwt.body,
        null,
        2,
      )}</div>
    </section>
    <section class="decoded-header">
      <h2 class="section-header">Signature</h2>
      <div class="section-body">${decodedJwt.signature}</div>
    </section>
  `;
};

const initEvents = () => {
  encodedElement.addEventListener('input', handleEncodedChange);
};

initEvents();
