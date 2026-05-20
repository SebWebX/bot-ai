/**
 * ui.ts
 * Módulo encargado de la manipulación del DOM.
 * Renderiza mensajes, indicadores y controla el scroll.
 */


import type {Message} from './types';

function getElements(){
    const contenedor = document.querySelector<HTMLElement>('.chat__messages');
    const chatInput = document.querySelector<HTMLInputElement>('.chat__inputbar-field');
    const btnEnviar =  document.querySelector<HTMLButtonElement>('.chat__inputbar-send');

    return{contenedor, chatInput, btnEnviar};
}

export function renderMessage(message: Message): void{
  const {contenedor} = getElements();

  if(!contenedor) return;
  const div = document.createElement('div');
  div.className = `chat__message chat__message--${message.role === 'bot' ? 'bot' : 'user'}`;

  const avatar = document.createElement('div');
  avatar.className = 'chat__message-avatar';
  avatar.innerHTML = message.role === 'bot' 
  ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="3.5" stroke="#534AB7" stroke-width="1"/>
      <path d="M6 3.5v2.5l1.5 1.5" stroke="#534AB7" stroke-width="1" stroke-linecap="round"/>
    </svg>`
  : `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="4.5" r="2" fill="#534AB7"/>
      <path d="M1.5 11c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="#534AB7" stroke-width="1" stroke-linecap="round"/>
    </svg>`;

   const body = document.createElement('div');
   body.className = 'chat__message-body';

   const bubble = document.createElement('span');
   bubble.className = 'chat__message-bubble';
   bubble.textContent = message.content;

   const time = document.createElement('time');
   time.className = 'chat__message-time';
   time.textContent = new Date().toLocaleTimeString('es-Mx', {
    hour: '2-digit',
    minute: '2-digit'
   });

   body.appendChild(bubble);
   body.appendChild(time);

   div.appendChild(avatar);
   div.appendChild(body);

   contenedor.appendChild(div);
}

export function scrollToBottom(): void{
  const {contenedor} = getElements();
  if(!contenedor) return;

  contenedor.scrollTop = contenedor.scrollHeight;
}

export function showTypingIndicator(): void{
  const {contenedor} = getElements();
  if(!contenedor) return;

  const div = document.createElement('div');
  div.className = 'chat__message chat__message--bot';
  div.id = 'typing-indicator';

  const avatar = document.createElement('div');
    avatar.className = 'chat__message-avatar';
    avatar.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="3.5" stroke="#534AB7" stroke-width="1"/>
    <path d="M6 3.5v2.5l1.5 1.5" stroke="#534AB7" stroke-width="1" stroke-linecap="round"/>
    </svg>`;

  const body = document.createElement('div');
  body.className = 'chat__message-body';
  const bubble = document.createElement('span');
  bubble.className = 'chat__message-bubble'
  bubble.textContent = "Escribiendo..."

  body.appendChild(bubble);
  div.appendChild(avatar);
  div.appendChild(body);
  contenedor.appendChild(div);
}

export function hideTypingIndicator(): void{
  const indicator = document.getElementById('typing-indicator');

  if(!indicator) return;

  indicator.remove();
}

export function clearInput(): void{
  const {chatInput} = getElements();

  if(!chatInput) return;

  chatInput.value = '';
}