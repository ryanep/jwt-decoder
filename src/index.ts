import './styles/index.css';
import { DecodedJwt, EncodedJwt } from './types/jwt';
import { decode, split, isValid } from './utils/jwt';

const encodedElement = document.getElementById('encoded');
const encodedHeader = document.getElementById('encoded-header');
const encodedPayload = document.getElementById('encoded-payload');
const encodedSignature = document.getElementById('encoded-signature');
const decodedHeader = document.getElementById('decoded-header');
const decodedPayload = document.getElementById('decoded-payload');
const decodedSignature = document.getElementById('decoded-signature');

const decodedSegmentElements = document.querySelectorAll('.jwt-segment');
const copyButtons = document.querySelectorAll('.section-header-button');

const copyToClipboard = (value: string) => {
  const textbox = document.createElement('textarea');

  let stringValue = '';
  try {
    const val = JSON.parse(value);
    stringValue = JSON.stringify(val, null, 2);
  } catch (error) {
    stringValue = value;
  }

  textbox.value = stringValue;
  textbox.classList.add('copy-textbox');
  document.body.appendChild(textbox);
  textbox.select();
  document.execCommand('copy');
  document.body.removeChild(textbox);
};

copyButtons.forEach(copyButton => {
  copyButton.addEventListener('click', async (event: Event) => {
    const button = event.currentTarget as HTMLElement;
    const buttonCopyId = button.getAttribute('data-copy');
    const copyTarget = document.getElementById(buttonCopyId);
    copyToClipboard(copyTarget.innerText);
  });
});

const displayInvalidState = (jwtString: string) => {
  encodedElement.classList.add('invalid');
  encodedHeader.innerHTML = jwtString;
  encodedPayload.innerHTML = '';
  encodedSignature.innerHTML = '';
  decodedHeader.innerHTML = '';
  decodedPayload.innerHTML = '';
  decodedSignature.innerHTML = '';
};

const renderToken = (jwtString: string) => {
  try {
    const encodedJwt = split(jwtString.replace(/\s/g, ''));

    if (!isValid(encodedJwt)) {
      displayInvalidState(jwtString);
      return;
    }

    encodedElement.classList.remove('invalid');
    const decodedJwt = decode(encodedJwt);
    render(encodedJwt, decodedJwt);
  } catch {
    displayInvalidState(jwtString);
  }
};

const renderEncoded = (jwt: EncodedJwt) => {
  const { header, payload, signature } = jwt;
  encodedHeader.innerHTML = header;
  encodedPayload.innerHTML = payload;
  encodedSignature.innerHTML = signature;
};

const renderDecoded = (jwt: DecodedJwt) => {
  const { header, payload, signature } = jwt;
  decodedHeader.innerHTML = JSON.stringify(header, null, 2);
  decodedPayload.innerHTML = JSON.stringify(payload, null, 2);
  decodedSignature.innerHTML = signature;
};

const render = (encodedJwt: EncodedJwt, decodedJwt: DecodedJwt) => {
  renderDecoded(decodedJwt);
  renderEncoded(encodedJwt);
};

const handleEncodedPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const jwt = event.clipboardData.getData('text');
  renderToken(jwt);
};

const initEvents = () => {
  window.addEventListener('paste', handleEncodedPaste);
  decodedSegmentElements.forEach(decodedSegmentElement => {
    const segment = decodedSegmentElement.getAttribute('data-segment');
    const decodedSection = document.querySelector(
      `.section[data-segment=${segment}]`,
    );

    decodedSegmentElement.addEventListener('mouseover', () => {
      decodedSection.classList.add('highlighted');
    });

    decodedSegmentElement.addEventListener('mouseout', () => {
      decodedSection.classList.remove('highlighted');
    });
  });
};

const initServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};

initEvents();
initServiceWorker();
