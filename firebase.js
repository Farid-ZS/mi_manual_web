// ========================================
// CONFIGURACIÓN DE FIREBASE
// ========================================
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto real.
// 
// Para obtener tu configuración:
// 1. Ve a Firebase Console: https://console.firebase.google.com/
// 2. Crea un proyecto (si no tienes uno)
// 3. Ve a "Configuración del proyecto" (ícono de engranaje)
// 4. En "Tus apps", selecciona "Web" (</>) y registra tu app
// 5. Copia los valores que aparecen aquí abajo

const firebaseConfig = {
    apiKey: "AIzaSyDEXAMPLE_REPLACE_WITH_YOUR_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// ========================================
// INICIALIZACIÓN CON FALLBACK
// ========================================
let db = null;
let firebaseActivo = false;

// Verificar si las credenciales son reales (no placeholders)
const esConfiguracionReal = 
    firebaseConfig.apiKey && 
    !firebaseConfig.apiKey.includes("EXAMPLE") && 
    !firebaseConfig.apiKey.includes("REPLACE");

if (typeof firebase !== 'undefined' && esConfiguracionReal) {
    try {
        const app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        firebaseActivo = true;
        console.log("✅ Firebase inicializado correctamente");
    } catch (error) {
        console.warn("⚠️ Error al inicializar Firebase:", error.message);
        console.log("📦 Usando almacenamiento local (localStorage) como respaldo");
        firebaseActivo = false;
    }
} else {
    console.log("📦 Firebase no configurado. Usando localStorage");
    firebaseActivo = false;
}

// ========================================
// EXPORTAR ESTADO (para otros scripts)
// ========================================
window.firebaseDB = db;
window.firebaseActivo = firebaseActivo;
