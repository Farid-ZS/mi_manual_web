# 🧠 Manual de Bienestar Universitario - DebugStress

Manual interactivo de técnicas de bienestar mental para estudiantes universitarios. Incluye ejercicios prácticos, chatbot asistente y dashboard de seguimiento.

## 🚀 Características

- **5 Capítulos Interactivos**: Estrés académico, Mindfulness, PNL, Comunicación Asertiva y Gestión Emocional
- **Chatbot Inteligente**: Asistente virtual con base de conocimientos por categorías
- **Dashboard de Impacto**: Visualización de estadísticas y progreso del usuario
- **Diseño Responsivo**: Interfaz moderna con efectos visuales y animaciones
- **Robot Animado**: Guía visual que acompaña las prácticas
- **Descarga PDF**: Manual completo disponible para lectura offline

## 📋 Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- (Opcional) Cuenta de Firebase para persistencia de datos en la nube

## 🔧 Instalación Local

1. Clona este repositorio:
```bash
git clone https://github.com/Farid-ZS/mi_manual_web.git
cd mi_manual_web
```

2. Abre `index.html` directamente en tu navegador o usa un servidor local:
```bash
# Con Python 3
python -m http.server 5500

# Con Node.js (http-server)
npx http-server -p 5500
```

3. Visita `http://localhost:5500` en tu navegador.

## 🔥 Configuración de Firebase (Opcional)

Si deseas que los datos se guarden en la nube en lugar de solo en el navegador:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Activa **Firestore Database** en modo de prueba
4. Ve a "Configuración del proyecto" → "Tus apps" → Agrega una app web
5. Copia las credenciales y reemplázalas en `firebase.js`:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcd1234"
};
```

6. (Opcional) Configura las reglas de seguridad en Firestore usando `firebase/firestore-rules.json`.

## 📦 Despliegue en Producción

### Opción 1: Vercel
```bash
npm i -g vercel
vercel
```

### Opción 2: Firebase Hosting
```bash
npm i -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Opción 3: GitHub Pages
1. Ve a tu repositorio en GitHub
2. Settings → Pages → Source: `main` branch
3. Tu sitio estará en `https://tu-usuario.github.io/mi_manual_web`

## 🎨 Estructura del Proyecto

```
mi_manual_web/
├── index.html              # Página principal
├── styles.css              # Estilos globales
├── main.js                 # Scripts principales (animaciones)
├── firebase.js             # Configuración de Firebase
├── assets/                 # Imágenes, logos, robots
│   ├── icons/
│   ├── robot/
│   ├── banner.png
│   └── logo.png
├── capitulos/              # Páginas de capítulos
│   ├── cap1.html a cap5.html
│   ├── css/capitulos.css
│   └── js/capitulos.js
├── chatbot/
│   ├── chatbot.js          # Lógica del chatbot
│   ├── bot-styles.css
│   └── knowledge.json      # Base de conocimientos
├── dashboard/              # Panel de estadísticas
│   ├── charts.html
│   ├── charts.css
│   └── impacto.js
└── README.md
```

## 🧪 Funcionalidades Técnicas

- **LocalStorage**: Guarda el progreso del usuario en el navegador
- **Intersection Observer**: Animaciones on-scroll
- **Chart.js**: Gráficos interactivos en el dashboard
- **CSS Variables**: Tema de colores centralizado (modo oscuro neón)
- **Responsive Design**: Breakpoints para mobile, tablet y desktop

## 🐛 Solución de Problemas

**Las imágenes no cargan en hosting remoto:**
- Verifica que las rutas comiencen con `/` para rutas absolutas
- En GitHub Pages, usa rutas relativas sin `/` inicial

**Firebase no funciona:**
- La app funciona sin Firebase usando localStorage
- Verifica que las credenciales sean correctas en `firebase.js`

**El chatbot no responde:**
- Verifica que `chatbot/knowledge.json` esté accesible
- Revisa la consola del navegador para errores

## 👥 Contribuidores

- **Equipo DebugStress** - Desarrollo y diseño

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

**¿Necesitas ayuda?** Abre un issue en GitHub o consulta con el chatbot integrado en la web. 🤖

