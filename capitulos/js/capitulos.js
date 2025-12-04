const CAPITULO = 1;
const startTime = Date.now();

// Registrar apertura del capítulo
registrarEvento("abierto");

// Registrar tiempo al salir
window.addEventListener("beforeunload", () => {
    const segundos = Math.floor((Date.now() - startTime) / 1000);
    registrarEvento("tiempo_lectura", { segundos });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnPractica = document.getElementById("btn-practica");
    const btnTecnica = document.getElementById("btn-tecnica");
    const btnCompletar = document.getElementById("btn-completar");

    if (btnPractica) {
        btnPractica.addEventListener("click", () => {
            registrarEvento("practica_iniciada");
            mostrarMensaje("Has iniciado una práctica rápida. Respira con el robot 10s.");
            animarRobot(10);
        });
    }

    if (btnTecnica) {
        btnTecnica.addEventListener("click", () => {
            registrarEvento("tecnica_respiracion");
            mostrarMensaje("Técnica aplicada ✔ — Inhala 4s, retén 2s, exhala 6s.");
            animarRobot(12);
        });
    }

    if (btnCompletar) {
        btnCompletar.addEventListener("click", () => {
            registrarEvento("completado");
            mostrarMensaje("¡Capítulo marcado como completado! 🎉");
        });
    }
});

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
    if (msg) msg.textContent = texto;
}

// Animar robot grande
function animarRobot(segundos) {
    const robot = document.getElementById("robot-practica");
    if (!robot) return;

    robot.src = "/assets/robot/respirando.gif";
    robot.offsetHeight; // Forzar repaint
    mostrarMensaje("El robot está respirando... 🧘");

    setTimeout(() => {
        robot.src = "/assets/robot/neutral.png";
        mostrarMensaje("¡Práctica finalizada! 🎉");
    }, segundos * 1000);
}
