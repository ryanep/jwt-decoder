import './styles/index.css';
import { decodeJwt, splitJwt } from './utils/jwt';
import { parseJson, formatJson } from './utils/json';
import { DecodedJwt, EncodedJwt } from './types/jwt';

const encodedElement = document.getElementById('encoded');
const encodedHeader = document.getElementById('encoded-header');
const encodedPayload = document.getElementById('encoded-payload');
const encodedSignature = document.getElementById('encoded-signature');
const decodedHeader = document.getElementById('decoded-header');
const decodedPayload = document.getElementById('decoded-payload');
const decodedSignature = document.getElementById('decoded-signature');
const decodedSegmentElements = document.querySelectorAll('.jwt-segment');
const copyButtons = document.querySelectorAll('.section-header-button');

export const init = (): void => {
  initEvents();
  initServiceWorker();
};

const initEvents = (): void => {
  window.addEventListener('paste', handleWindowPaste);
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

  copyButtons.forEach(copyButton => {
    copyButton.addEventListener('click', handleCopyButtonClick);
  });
};

const initServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};

const copyToClipboard = (value: string): void => {
  const json = parseJson<DecodedJwt>(value);
  const jsonString = formatJson(json);
  const textarea = document.createElement('textarea');
  textarea.value = jsonString ? jsonString : value;
  textarea.classList.add('copy-textbox');
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

const handleWindowPaste = (event: ClipboardEvent): void => {
  event.preventDefault();
  const jwtString = event.clipboardData.getData('text');
  const encodedJwt = splitJwt(jwtString.replace(/\s/g, ''));
  const decodedJwt = decodeJwt(encodedJwt);
  encodedJwt && decodedJwt
    ? renderValidState(encodedJwt, decodedJwt)
    : renderInvalidState(jwtString);
};

const handleCopyButtonClick = (event: Event): void => {
  const button = event.currentTarget as HTMLElement;
  const buttonCopyId = button.getAttribute('data-copy');
  const copyTarget = document.getElementById(buttonCopyId);
  copyToClipboard(copyTarget.innerText);
};

const renderEncoded = (jwt: EncodedJwt): void => {
  const { header, payload, signature } = jwt;
  encodedHeader.innerHTML = header;
  encodedPayload.innerHTML = payload;
  encodedSignature.innerHTML = signature;
};

const renderDecoded = (jwt: DecodedJwt): void => {
  const { header, payload, signature } = jwt;
  decodedHeader.innerHTML = formatJson(header);
  decodedPayload.innerHTML = formatJson(payload);
  decodedSignature.innerHTML = signature;
};

const renderValidState = (
  encodedJwt: EncodedJwt,
  decodedJwt: DecodedJwt,
): void => {
  encodedElement.classList.remove('invalid');
  renderDecoded(decodedJwt);
  renderEncoded(encodedJwt);
};

const renderInvalidState = (jwtString: string): void => {
  encodedElement.classList.add('invalid');
  encodedHeader.innerHTML = jwtString;
  encodedPayload.innerHTML = '';
  encodedSignature.innerHTML = '';
  decodedHeader.innerHTML = '';
  decodedPayload.innerHTML = '';
  decodedSignature.innerHTML = '';
};
