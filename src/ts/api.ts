/**
 * api.ts
 * Módulo encargado de la comunicación con la API de Groq.
 * Envía el historial de mensajes y retorna la respuesta del modelo.
 */

import type {Message} from './types';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
export async function sendMessage(messages: Message[]): Promise <string>{
  try{
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
              {
                  role: 'system',
                  content: 'Eres TechBot, asistente virtual de TechStore, una tienda especializada en gadgets tecnológicos. Respondes siempre en español con tono profesional pero amigable. Puedes ayudar con preguntas frecuentes, búsqueda de productos, rastreo de pedidos y recomendaciones personalizadas. Mantén tus respuestas claras y concisas.'
              },
              ...messages.map(msg => ({
                  role: msg.role === 'bot' ? 'assistant' : 'user',
                  content: msg.content
              }))
          ]
      })
  });
   if(!respuesta.ok){
    throw new Error(`Error HTTP: ${respuesta.status}`);
   }
   const datos = await respuesta.json();

   return datos.choices[0].message.content;
  } catch (error){
    console.error("Error al contactar Groq:", error);
    throw error;
  }
}