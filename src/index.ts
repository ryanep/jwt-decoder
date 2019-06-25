import './styles/index.css';
import { decode } from './utils/jwt';

const encodedElement = document.getElementById('encoded');
const decodedElement = document.getElementById('decoded');

const handleEncodedChange = (value: string) => {
  if (!value) {
    decodedElement.innerText = '';
    return;
  }

  const [header, payload, signature] = value.split('.');
  if (!header || !payload || !signature) {
    decodedElement.innerText = '';
    return;
  }

  encodedElement.innerHTML = '';
  encodedElement.innerHTML = `
    <span class="jwt-segment">${header}</span><span>.</span><span class="jwt-segment">${payload}</span><span>.</span><span class="jwt-segment">${signature}</span>
  `;

  const decodedJwt = decode(value);
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

const handleEncodedPaste = event => {
  event.preventDefault();
  const value = event.clipboardData.getData('text');
  handleEncodedChange(value);
};

const initEvents = () => {
  encodedElement.addEventListener('paste', handleEncodedPaste);
};

initEvents();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
