# TechBot AI 🤖

Chatbot inteligente para e-commerce de tecnología, construido con TypeScript vanilla, Vite e integración con la API de Groq (Llama 3.3). Diseñado con arquitectura modular escalable y enfoque en accesibilidad.

<img width="1330" height="756" alt="Captura de pantalla 2026-05-25 a la(s) 9 08 33 p m" src="https://github.com/user-attachments/assets/c34a34ca-0b19-4847-942d-459f92cbb0ce" />


---
## 🌐 Demo
   [Ver proyecto en vivo](https://sebwebx.github.io/bot-ai/)

## ✨ Características

- 💬 **Chat en tiempo real** con IA conversacional (Llama 3.3 70B)
- 🎨 **Diseño elegante** con paleta morada y experiencia tipo Claude/ChatGPT
- ♿ **Accesibilidad** completa con ARIA labels y navegación por teclado
- 📱 **Responsive Design** adaptado para móvil, tablet y desktop
- 🔒 **Variables de entorno** para proteger credenciales sensibles
- 🏗️ **Arquitectura modular** con separación de responsabilidades

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura semántica con ARIA |
| **CSS3** | Estilos con metodología BEM y `@layer` |
| **TypeScript** | Lógica con tipado estático |
| **Vite** | Build tool y servidor de desarrollo |
| **Groq API** | Modelo Llama 3.3 70B |
| **Git/GitHub** | Control de versiones con Conventional Commits |

---

## 🚀 Instalación

### Requisitos previos
- Node.js 20+
- npm 10+
- API Key de [Groq Console](https://console.groq.com)

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/SebWebX/bot-ai.git
cd bot-ai

# 2. Instala dependencias
npm install

# 3. Configura variables de entorno
cp .env.example .env
# Edita .env y agrega tu GROQ_API_KEY

# 4. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📁 Estructura del Proyecto

```
bot-ai/
├── src/
│   ├── styles/
│   │   ├── base/
│   │   │   ├── _reset.css         # Reset CSS moderno
│   │   │   ├── _tokens.css        # Design tokens
│   │   │   └── _typography.css    # Tipografía base
│   │   ├── components/
│   │   │   ├── _input.css         # Estilos del input
│   │   │   ├── _messages.css      # Estilos de mensajes
│   │   │   ├── _sidebar.css       # Estilos del sidebar
│   │   │   └── _topbar.css        # Estilos del header
│   │   └── main.css               # Punto de entrada CSS
│   └── ts/
│       ├── api.ts                 # Comunicación con Groq
│       ├── main.ts                # Coordinador principal
│       ├── types.ts               # Tipos e interfaces
│       └── ui.ts                  # Manipulación del DOM
├── .env.example                   # Plantilla de variables
├── index.html                     # HTML semántico
├── tsconfig.json                  # Configuración TypeScript
└── package.json
```

---

## 🧠 Decisiones Técnicas

### Arquitectura modular
Cada archivo TypeScript tiene una **responsabilidad única**:
- `types.ts` → Define los tipos
- `api.ts` → Solo comunicación con Groq
- `ui.ts` → Solo manipulación del DOM
- `main.ts` → Coordina los módulos

### CSS con `@layer`
Uso de **CSS Cascade Layers** para control explícito de la prioridad de estilos:
```css
@layer reset, tokens, typography, components;
```

### Metodología BEM
Clases consistentes y escalables:
```html
<div class="chat__message chat__message--user">
```

### Design Tokens
Variables CSS centralizadas en `_tokens.css` para mantener consistencia visual y facilitar cambios globales.

### Accesibilidad
- Atributos `aria-label` en elementos interactivos
- `aria-live="polite"` en el área de mensajes para lectores de pantalla
- Etiqueta `<time>` semántica para horarios
- Navegación funcional por teclado (Enter para enviar)

### Seguridad
- API Key protegida en `.env` (excluido de Git)
- `.env.example` como plantilla pública
- ⚠️ **Nota:** Para producción real se requeriría un backend que actúe como proxy, ya que en el frontend la key es visible en el cliente. Este proyecto es un prototipo de portafolio.

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | `#534AB7` | Botones, burbujas usuario |
| Primary Dark | `#26215C` | Fondo sidebar |
| Primary Mid | `#3C3489` | Estados activos |
| Primary Light | `#EEEDFE` | Fondos suaves |
| Accent | `#7F77DD` | Detalles y acentos |
| Status Online | `#5DCAA5` | Indicador de estado |

---

## 📝 Mejoras Futuras

- [ ] Persistencia de conversaciones con localStorage
- [ ] Múltiples chats simultáneos en sidebar
- [ ] Backend con Node.js + Express para proteger la API Key
- [ ] Modo oscuro / claro
- [ ] Soporte para markdown en respuestas del bot
- [ ] Tests unitarios con Vitest

---

## 👤 Autor

**Sebastian Enriquez** ([@SebWebX](https://github.com/SebWebX))

Desarrollador frontend con Maestría en Calidad y Productividad, enfocado en construir interfaces escalables y accesibles.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.
