import './styles/index.css';
import { decode, split } from './utils/jwt';
import { DecodedJwt, EncodedJwt } from './types/jwt';

// Containers
const encodedElement = document.getElementById('encoded');
const decodedElement = document.getElementById('decoded');

// Encoded segments
const decodedSegmentElements = document.querySelectorAll('.jwt-segment');
const encodedHeader = document.querySelector(
  '.jwt-segment[data-segment="header"]',
);
const encodedPayload = document.querySelector(
  '.jwt-segment[data-segment="payload"]',
);
const encodedSignature = document.querySelector(
  '.jwt-segment[data-segment="signature"]',
);

// Decoded segments
const decodedHeader = document.querySelector(
  '.decoded-body[data-segment="header"]',
);
const decodedPayload = document.querySelector(
  '.decoded-body[data-segment="payload"]',
);
const decodedSignature = document.querySelector(
  '.decoded-body[data-segment="signature"]',
);

const renderToken = (jwtString: string) => {
  const encodedJwt = split(jwtString);

  if (!encodedJwt.header || !encodedJwt.payload || !encodedJwt.signature) {
    decodedElement.innerText = '';
    return;
  }

  const decodedJwt = decode(encodedJwt);
  render(encodedJwt, decodedJwt);
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
  encodedElement.addEventListener('paste', handleEncodedPaste);
  decodedSegmentElements.forEach(decodedSegmentElement => {
    const segment = decodedSegmentElement.getAttribute('data-segment');
    const decodedSection = document.querySelector(
      `.decoded-header[data-segment=${segment}]`,
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
