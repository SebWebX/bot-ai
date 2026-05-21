/**
 * Main que conecta y coordina los demas modulos
 */

import '../styles/main.css';
import { sendMessage } from './api';
import { renderMessage, scrollToBottom, showTypingIndicator, hideTypingIndicator, clearInput } from './ui';
import type { Message } from './types';

const messages: Message[] = [];

async function handleSend(): Promise<void>{
    try{
        console.log('handleSend ejecutado');
        const input = document.querySelector<HTMLInputElement>('.chat__inputbar-field');
        if(!input) return;

        const texto = input.value.trim();
        if(texto === '') return;

        const userMessage: Message = {
            role: 'user',
            content: texto,
            time: new Date().toLocaleTimeString('es-MX', {hour: '2-digit', minute: '2-digit'})
        };

        messages.push(userMessage);
        renderMessage(userMessage);

        clearInput()
        showTypingIndicator()

        const respuesta = await sendMessage(messages);

        hideTypingIndicator()

        const botMessage: Message = {
            role: 'bot',
            content: respuesta, 
            time: new Date().toLocaleTimeString('es-MX', {hour: '2-digit', minute: '2-digit'})
        }

        messages.push(botMessage);
        renderMessage(botMessage);
        scrollToBottom();

    }catch(error){
        hideTypingIndicator();
        console.error('Error al enviar mensaje', error);

        renderMessage({
            role: 'bot',
            content: 'Lo siento, ocurrió un error. Por favor intenta de nuevo.',
            time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
          });
    }
}

const btnEnviar = document.querySelector<HTMLButtonElement>('.chat__inputbar-send');
btnEnviar?.addEventListener('click', handleSend);


const input = document.querySelector<HTMLInputElement>('.chat__inputbar-field');
input?.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        handleSend();
    }
  
});

const welcomeMessage: Message = {
    role: 'bot',
    content: '¡Hola! Soy TechBot, tu asistente de TechStore. ¿En qué puedo ayudarte hoy?',
    time: new Date().toLocaleTimeString('es-MX', {hour: '2-digit', minute: '2-digit'})
};

messages.push(welcomeMessage);
renderMessage(welcomeMessage);