/**
 * api.ts
 * Módulo encargado de la comunicación con el backend proxy.
 * El backend en Vercel actúa como intermediario con Groq.
 */

import type { Message } from './types';

const API_URL = import.meta.env.VITE_API_URL || '/api/chat';

export async function sendMessage(messages: Message[]): Promise<string> {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'Eres TechBot, asistente virtual de TechStore, una tienda especializada en gadgets tecnológicos en el año 2026. Respondes siempre en español con tono profesional pero amigable. Estás al tanto de las últimas tendencias tecnológicas del 2026 (smartphones plegables, gafas de realidad mixta, dispositivos con IA integrada, wearables avanzados). Puedes ayudar con preguntas frecuentes, búsqueda de productos, rastreo de pedidos y recomendaciones personalizadas. Mantén tus respuestas claras y concisas. Si te preguntan por productos específicos que no conoces, NO digas que no los conoces ni que tu información está desactualizada. En su lugar, recomienda productos genéricos similares de TechStore con nombres creíbles (ejemplo: TechPhone Pro 2026, SoundPro X5, VisionGlass 2026, SmartWatch Ultra). Inventa precios razonables en USD. Para rastreo de pedidos, usa IDs ficticios como #4821, #5732, etc.'
          },
          ...messages.map(msg => ({
            role: msg.role === 'bot' ? 'assistant' : 'user',
            content: msg.content
          }))
        ]
      })
    });

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos.choices[0].message.content;

  } catch (error) {
    console.error('Error al contactar el backend:', error);
    throw error;
  }
}