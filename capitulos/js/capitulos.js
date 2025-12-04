/* ==========================================
   CONFIG
   (Cada capítulo define window.CAP_NUM)
========================================== */
const CAPITULO = window.CAP_NUM || 1;
const startTime = Date.now();

/* ==========================================
   REGISTRO AUTOMÁTICO
========================================== */
registrarEvento("abierto");

// Guardar tiempo de lectura al salir
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

    // --- PRÁCTICA ---
    if (btnPractica) {
        btnPractica.addEventListener("click", () => {
            registrarEvento("practica_iniciada");

            if (CAPITULO === 2) {
                // Mindfulness
                mostrarMensaje("Iniciaste una práctica de mindfulness 🧘‍♂️");
                mostrarRobot("meditando");
            } else {
                mostrarMensaje("Has iniciado una práctica rápida. Respira con el robot 10s.");
                animarRespiracion(10);
            }
        });
    }

    // --- TÉCNICA ---
    if (btnTecnica) {
        btnTecnica.addEventListener("click", () => {
            registrarEvento("tecnica_respiracion");

            if (CAPITULO === 2) {
                mostrarMensaje("Mindfulness guiado ✔ Concéntrate 12 segundos.");
                mostrarRobot("meditando", 12);
            } else {
                mostrarMensaje("Técnica aplicada ✔ — Inhala 4s, retén 2s, exhala 6s.");
                animarRespiracion(12);
            }
        });
    }

    // --- COMPLETAR ---
    if (btnCompletar) {
        btnCompletar.addEventListener("click", () => {
            registrarEvento("completado");
            mostrarMensaje("¡Capítulo marcado como completado! 🎉");
        });
    }
});

/* ==========================================
   FUNCIONES ÚTILES
========================================== */
function registrarEvento(tipo, extra = {}) {
    const evento = {
        capitulo: CAPITULO,
        tipo,
        fecha: new Date().toISOString(),
        ...extra
    };
    guardarLocal(evento);
}

function guardarLocal(evento) {
    const data = JSON.parse(localStorage.getItem("impacto") || "[]");
    data.push(evento);
    localStorage.setItem("impacto", JSON.stringify(data));
}

function mostrarMensaje(texto) {
    const msg = document.getElementById("mensaje-estado");
    if (msg) msg.textContent = texto;
}

/* ==========================================
   ROBOT — RESPIRACIÓN (GIF)
========================================== */
function animarRespiracion(segundos) {
    const robot = document.getElementById("robot-practica");
    if (!robot) return;

    robot.src = "/assets/robot/respirando.gif";
    robot.classList.add("robot-animado");
    mostrarMensaje("El robot está respirando... 🧘");

    setTimeout(() => {
        robot.src = "/assets/robot/neutral.png";
        robot.classList.remove("robot-animado");
        mostrarMensaje("¡Práctica finalizada! 🎉");
    }, segundos * 1000);
}

/* ==========================================
   ROBOT — MEDITACIÓN (PNG)
========================================== */
function mostrarRobot(tipo, tiempo = 0) {
    const robot = document.getElementById("robot-practica");
    if (!robot) return;

    if (tipo === "meditando") {
        robot.src = "/assets/robot/meditando.png";
    }

    if (tiempo > 0) {
        setTimeout(() => {
            robot.src = "/assets/robot/neutral.png";
            mostrarMensaje("¡Práctica finalizada! 🎉");
        }, tiempo * 1000);
    }
}
