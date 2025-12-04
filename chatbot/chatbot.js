/* ============================================================
      CHATBOT CON CATEGORÍAS + SUBMENÚ + 1.1 CORREGIDO
============================================================ */

let categorias = [];
let estado = {
    menu: "principal",
    categoriaSeleccionada: null
};

// === CARGAR JSON ===
fetch("/chatbot/knowledge.json")
    .then(r => r.json())
    .then(data => {
        categorias = data.categorias;
        addMessage("¡Hola! 👋 Bienvenido.\n\nAquí tienes el menú inicial:", "bot-msg");
        mostrarMenu();
    });


// === ELEMENTOS HTML ===
const btnChat = document.getElementById("chatbot-button");
const panel = document.getElementById("chatbot-panel");
const closeBtn = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const chatBody = document.getElementById("chat-body");
const userInput = document.getElementById("user-input");
const robotAvatar = document.getElementById("robot-avatar");

btnChat.onclick = () => panel.style.display = "flex";
closeBtn.onclick = () => panel.style.display = "none";

sendBtn.onclick = enviar;
userInput.addEventListener("keypress", e => { if (e.key === "Enter") enviar(); });


// =======================================================
//                      ENVÍO
// =======================================================
function enviar() {
    let text = userInput.value.trim().toLowerCase();
    if (!text) return;

    addMessage(text, "user-msg");
    userInput.value = "";

    robotAvatar.src = "/assets/robot/parpadeo.png";

    setTimeout(() => {
        procesar(text);
        robotAvatar.src = "/assets/robot/neutral.png";
    }, 400);
}


// =======================================================
//                AGREGAR MENSAJE AL CHAT
// =======================================================
function addMessage(text, type) {
    let p = document.createElement("p");
    p.classList.add(type);
    p.textContent = text;
    chatBody.appendChild(p);
    chatBody.scrollTop = chatBody.scrollHeight;
}


// =======================================================
//               LÓGICA DEL CHATBOT
// =======================================================
function procesar(text) {

    // === SI EL USUARIO QUIERE VOLVER AL MENÚ ===
    if (text.includes("menu")) {
        estado.menu = "principal";
        estado.categoriaSeleccionada = null;
        return mostrarMenu();
    }

    // === SI ESTAMOS EN EL MENÚ PRINCIPAL ===
    if (estado.menu === "principal") {

        // detectar "1", "01", "1.", "1-"…
        let match = text.match(/^(\d+)/);
        if (!match) return addMessage("Escribe un número para elegir una categoría.", "bot-msg");

        let num = parseInt(match[1]);
        let cat = categorias.find(c => c.id === num);

        if (!cat) return addMessage("Número inválido 😅", "bot-msg");

        estado.menu = "submenu";
        estado.categoriaSeleccionada = cat;

        return mostrarSubmenu(cat);
    }

    // === SI ESTÁ EN UN SUBMENÚ ===
    if (estado.menu === "submenu") {

        let cat = estado.categoriaSeleccionada;

        // Detectar formatos como: 1.1, 1-1, 1/1, 1 1, 1:1…
        let match = text.match(/(\d+)[\.\-\/\s:]+(\d+)/);

        if (match) {
            let idSub = parseInt(match[2]); // 1.2 → 2

            let item = cat.items.find(i => i.id === idSub);
            if (item) return addMessage(item.respuesta, "bot-msg");

            return addMessage("Subtema inválido 😅", "bot-msg");
        }

        // Si solo manda el subnúmero: “1”
        if (/^\d+$/.test(text)) {
            let num = parseInt(text);
            let item = cat.items.find(i => i.id === num);

            if (item) return addMessage(item.respuesta, "bot-msg");

            return addMessage("Opción no válida.", "bot-msg");
        }

        // Buscar por palabra clave
        for (let item of cat.items) {
            if (item.keywords.some(k => text.includes(k.toLowerCase()))) {
                return addMessage(item.respuesta, "bot-msg");
            }
        }

        return addMessage("No encontré ese subtema 😅", "bot-msg");
    }
}


// =======================================================
//                  MENÚ PRINCIPAL
// =======================================================
function mostrarMenu() {
    let msg = "📘 *Temas disponibles:*\n\n";

    categorias.forEach(cat => {
        msg += `${cat.id}. ${cat.titulo}\n`;
    });

    msg += `\n👉 Escribe un número (ej: 1)\n👉 O escribe "menu" para volver`;

    addMessage(msg, "bot-msg");
}


// =======================================================
//                     SUBMENÚ
// =======================================================
function mostrarSubmenu(cat) {
    let msg = `📙 *${cat.titulo} – subtemas:*\n\n`;

    cat.items.forEach(i => {
        msg += `${cat.id}.${i.id} — ${i.keywords[0]}\n`;
    });

    msg += `\n👉 Escribe un número (ej: ${cat.id}.1 o solo 1)\n👉 Escribe "menu" para regresar`;

    addMessage(msg, "bot-msg");
}
