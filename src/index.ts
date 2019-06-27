import './styles/index.css';
import { decode } from './utils/jwt';
import { Jwt } from './types/jwt';

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

  const decodedJwt = decode(value);
  render(value, decodedJwt);

  const decodedSegmentElements = document.querySelectorAll('.jwt-segment');
  console.log(decodedSegmentElements);
  decodedSegmentElements.forEach(decodedSegmentElement => {
    const segment = decodedSegmentElement.getAttribute('data-segment');
    const decodedSection = document.querySelector(
      `.decoded-header[data-segment=${segment}]`,
    );

    decodedSegmentElement.addEventListener('mouseover', event => {
      decodedSection.classList.add('highlighted');
    });

    decodedSegmentElement.addEventListener('mouseout', () => {
      decodedSection.classList.remove('highlighted');
    });
  });
};

const renderEncoded = (jwt: string) => {
  const [header, payload, signature] = jwt.split('.');
  encodedElement.innerHTML = '';
  encodedElement.innerHTML = `
    <span class="jwt-segment" data-segment="header">${header}</span>.<span class="jwt-segment" data-segment="payload">${payload}</span>.<span class="jwt-segment" data-segment="signature">${signature}</span>
  `;
};

const renderDecoded = (jwt: Jwt) => {
  const { header, body, signature } = jwt;
  decodedElement.innerHTML = `
    <section class="decoded-header" data-segment="header">
      <h2 class="section-header">Header</h2>
      <div class="section-body">${JSON.stringify(header, null, 2)}</div>
    </section>
    <section class="decoded-header" data-segment="payload">
      <h2 class="section-header">Payload</h2>
      <div class="section-body">${JSON.stringify(body, null, 2)}</div>
    </section>
    <section class="decoded-header" data-segment="signature">
      <h2 class="section-header">Signature</h2>
      <div class="section-body">${signature}</div>
    </section>
  `;
};

const render = (encodedJwt: string, decodedJwt: Jwt) => {
  renderDecoded(decodedJwt);
  renderEncoded(encodedJwt);
};

const handleEncodedPaste = event => {
  event.preventDefault();
  const value = event.clipboardData.getData('text');
  handleEncodedChange(value);
};

const initEvents = () => {
  encodedElement.addEventListener('paste', handleEncodedPaste);
};

const initServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};

initEvents();
initServiceWorker();
