import { decode } from './jwt';

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
    <span>${segments[0]}</span><span>.</span><span>${segments[1]}</span><span>.</span><span>${segments[2]}</span>
  `;

  const decodedJwt = decode(input.innerText);
  // decodedElement.innerText = JSON.stringify(decodedJwt, null, 2);
  decodedElement.innerHTML = `
    <section class="decoded-header">
      <h2>Header</h2>
      <div>${JSON.stringify(decodedJwt.header, null, 2)}</div>
    </section>
    <section class="decoded-header">
      <h2>Body</h2>
      <div>${JSON.stringify(decodedJwt.body, null, 2)}</div>
    </section>
    <section class="decoded-header">
      <h2>Signature</h2>
      <div>${decodedJwt.signature}</div>
    </section>
  `;
};

const initEvents = () => {
  encodedElement.addEventListener('input', handleEncodedChange);
};

initEvents();
