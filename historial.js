import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBauODv9lVnfTu0Iobstdaz6w8Z-jsB_4g",
  authDomain: "vitalcaredb-8035d.firebaseapp.com",
  databaseURL: "https://vitalcaredb-8035d-default-rtdb.firebaseio.com",
  projectId: "vitalcaredb-8035d",
  storageBucket: "vitalcaredb-8035d.appspot.com",
  messagingSenderId: "14891523409",
  appId: "1:14891523409:web:8897e48e90a30db72dc770",
  measurementId: "G-QFBN6BLMZC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userEmail = user.email.replace('.', '_'); // Reemplazar '.' con '_' para evitar problemas en la clave
    const userRef = ref(db, 'usuarios/' + userEmail);

    // Cargar y mostrar el historial clínico
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const historialClinicoDiv = document.getElementById('historial-clinico-contenido');
        historialClinicoDiv.innerHTML = '';
        if (userData.historialClinico) {
          userData.historialClinico.forEach((historial) => {
            const historialElement = document.createElement('div');
            historialElement.innerHTML = `
              <p><strong>Nombre:</strong> ${historial.nombre}</p>
              <p><strong>Fecha de Nacimiento:</strong> ${historial.fechaNacimiento}</p>
              <p><strong>Alergias:</strong> ${historial.alergias}</p>
              <p><strong>Enfermedades:</strong> ${historial.enfermedades}</p>
            `;
            historialClinicoDiv.appendChild(historialElement);
          });
        } else {
          historialClinicoDiv.innerHTML = '<p>No hay historial clínico disponible.</p>';
        }
      } else {
        console.log('No se encontraron datos del usuario.');
      }
    }).catch((error) => {
      console.error('Error al obtener los datos del usuario:', error);
    });
  } else {
    window.location.href = 'login.html'; 
  }
});

