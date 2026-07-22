/**
 * api/chat.ts
 * Función serverless que actúa como proxy entre el frontend y la API de Groq.
 * Protege la API Key evitando exponerla al cliente.
 */

export default async function handler(request: Request): Promise<Response> {

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
  
    try {
      const body = await request.json();
  
      const respuesta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: body.messages
        })
      });
  
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
  
      const datos = await respuesta.json();
  
      return new Response(JSON.stringify(datos), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
  
    } catch (error) {
      console.error('Error en el proxy:', error);
      return new Response(JSON.stringify({ error: 'Error del servidor' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  export const config = {
    runtime: 'edge'
  };