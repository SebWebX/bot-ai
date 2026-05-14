/**
 * api.ts
 * Módulo encargado de la comunicación con la API de Gemini.
 * Envía el historial de mensajes y retorna la respuesta del modelo.
 */

import type {Message} from './types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function sendMessage(messages: Message[]): Promise <string>{
  try{
  const respuesta = await fetch(`${API_URL}?key=${API_KEY}`,{
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify({
        contents: messages.map(msg =>({
          role: msg.role === 'bot' ? 'model' : 'user',
          parts: [{text: msg.content}]
        }))
      })
    })
   if(!respuesta.ok){
    throw new Error(`Error HTTP: ${respuesta.status}`);
   }
   const datos = await respuesta.json();

   return datos.candidates[0].content.parts[0].text;
  } catch (error){
    console.error("Error al contactar Gemini:", error);
    throw error;
  }
}