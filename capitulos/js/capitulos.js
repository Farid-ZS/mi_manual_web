/* ==========================================
   CONFIG GLOBAL
========================================== */
const CAPITULO = window.CAP_NUM || 1;
const startTime = Date.now();

/* ==========================================
   REGISTRO AUTOMÁTICO
========================================== */
registrarEvento("abierto");

window.addEventListener("beforeunload", () => {
    const segundos = Math.floor((Date.now() - startTime) / 1000);
    registrarEvento("tiempo_lectura", { segundos });
});

/* ==========================================
   ACCIONES DEL CAPÍTULO
========================================== */
document.addEventListener("DOMContentLoaded", () => {

    const btnPractica = document.getElementById("btn-practica");
    const btnTecnica = document.getElementById("btn-tecnica");
    const btnCompletar = document.getElementById("btn-completar");

    /* ============================
        PRÁCTICA
    ============================ */
    if (btnPractica) {
        btnPractica.addEventListener("click", () => {
            registrarEvento("practica_iniciada");

            /* ====== CAPÍTULO 5 (GESTIÓN EMOCIONAL) ====== */
            if (CAPITULO === 5) {
                mostrarMensaje(
                    "💛 ALFABETO EMOCIONAL\n\n" +
                    "1️⃣ Haz una pausa de 5–10 segundos.\n" +
                    "2️⃣ Identifica tu emoción EXACTA (no 'mal').\n" +
                    "3️⃣ Selecciona el matiz correcto: frustración, ansiedad, calma...\n" +
                    "4️⃣ Evalúa intensidad del 1 al 10.\n" +
                    "5️⃣ Pregunta: “¿Qué me quiere decir esta emoción?”"
                );
                mostrarRobot("pensando");
            }

            /* ====== CAP 3, 2, 4 (resto de capítulos) ====== */
            else if (CAPITULO === 3) {
                mostrarMensaje(
                    "✨ ANCLAJE DE ESTADOS POSITIVOS\n\n" +
                    "1️⃣ Recuerda un momento de fuerza.\n" +
                    "2️⃣ Revive detalles sensoriales.\n" +
                    "3️⃣ Cuando sientas el pico emocional aprieta tu mano."
                );
                mostrarRobot("pensando");
            }
            else if (CAPITULO === 2) {
                mostrarMensaje("Iniciaste una práctica de mindfulness 🧘‍♂️");
                mostrarRobot("meditando");
            }
            else if (CAPITULO === 4) {
                mostrarMensaje(
                    "🗣️ MENSAJE ASERTIVO EN ‘YO’\n\n" +
                    "Ejemplo:\n" +
                    "“Yo me siento preocupado cuando hay retrasos, porque afecta mi tiempo”."
                );
                mostrarRobot("pensando");
            }
            else {
                mostrarMensaje("Respira con el robot 10s.");
                animarRespiracion(10);
            }
        });
    }

    /* ============================
        TÉCNICA
    ============================ */
    if (btnTecnica) {
        btnTecnica.addEventListener("click", () => {
            registrarEvento("tecnica_activada");

            /* ====== CAPÍTULO 5 (GESTIÓN EMOCIONAL) ====== */
            if (CAPITULO === 5) {
                mostrarMensaje(
                    "🥗 DIETA EMOCIONAL SALUDABLE\n\n" +
                    "1️⃣ Reduce estímulos que drenan (ruido, noticias negativas, exceso redes).\n" +
                    "2️⃣ Aumenta estímulos nutritivos: descanso, luz solar, música.\n" +
                    "3️⃣ Practica 1 alimento emocional: agradecimiento, pausa consciente.\n" +
                    "4️⃣ Repite a diario."
                );
                mostrarRobot("pensando");
            }

            /* ====== OTROS CAPÍTULOS ====== */
            else if (CAPITULO === 3) {
                mostrarMensaje(
                    "🔄 REENCUADRE COGNITIVO\n\n" +
                    "Cambia el significado del pensamiento limitante."
                );
                mostrarRobot("pensando");
            }
            else if (CAPITULO === 4) {
                mostrarMensaje(
                    "🧠 DISCO RAYADO\n\n" +
                    "Repite tu punto con calma:\n" +
                    "“Entiendo tu posición, pero mi decisión es…”"
                );
                mostrarRobot("pensando");
            }
            else if (CAPITULO === 2) {
                mostrarMensaje("Mindfulness guiado por 12 segundos.");
                mostrarRobot("meditando", 12);
            }
            else {
                mostrarMensaje("Inhala 4s, retén 2s, exhala 6s.");
                animarRespiracion(12);
            }
        });
    }

    /* ============================
        COMPLETAR
    ============================ */
    if (btnCompletar) {
        btnCompletar.addEventListener("click", () => {
            registrarEvento("completado");
            mostrarMensaje("¡Capítulo completado! 🎉");
        });
    }
});

/* ==========================================
   FUNCIONES
========================================== */
function registrarEvento(tipo, extra = {}) {
    const evento = { capitulo: CAPITULO, tipo, fecha: new Date().toISOString(), ...extra };
    guardarLocal(evento);
}

function guardarLocal(evento) {
    const data = JSON.parse(localStorage.getItem("impacto") || "[]");
    data.push(evento);
    localStorage.setItem("impacto", JSON.stringify(data));
}

function mostrarMensaje(texto) {
    const msg = document.getElementById("mensaje-estado");
    if (msg) msg.innerText = texto;
}

/* ==========================================
   ROBOT
========================================== */
function animarRespiracion(segundos) {
    const robot = document.getElementById("robot-practica");
    if (!robot) return;

    robot.src = "/assets/robot/respirando.gif";
    mostrarMensaje("El robot está respirando... 🧘");

    setTimeout(() => {
        robot.src = "/assets/robot/neutral.png";
        mostrarMensaje("¡Práctica finalizada! 🎉");
    }, segundos * 1000);
}

function mostrarRobot(tipo, tiempo = 0) {
    const robot = document.getElementById("robot-practica");
    if (!robot) return;

    const rutas = {
        meditando: "/assets/robot/meditando.png",
        pensando: "/assets/robot/pensando.png",
        neutral: "/assets/robot/neutral.png",
    };

    robot.src = rutas[tipo] || rutas.neutral;

    if (tiempo > 0) {
        setTimeout(() => {
            robot.src = rutas.neutral;
            mostrarMensaje("¡Práctica finalizada! 🎉");
        }, tiempo * 1000);
    }
}
