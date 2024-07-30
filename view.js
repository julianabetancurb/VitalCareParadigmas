import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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

const userEmail = localStorage.getItem('userEmail');
if (!userEmail) {
  window.location.href = 'login.html';
}

document.getElementById('appointments-btn').addEventListener('click', () => {
  window.location.href = 'appointment.html';
});
document.getElementById('profile-btn').addEventListener('click', () => {
  window.location.href = 'profile.html';
});
document.getElementById('mapa-btn').addEventListener('click', () => {
  window.location.href = 'mapa.html';
});
document.getElementById('back-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('userEmail');
  window.location.href = 'login.html';
});

const appointmentsList = document.getElementById('appointments-list');

function loadAppointments() {
  const userKey = userEmail.replace(/\./g, '_');
  const userRef = ref(db, 'usuarios/' + userKey + '/citas');

  onValue(userRef, (snapshot) => {
    appointmentsList.innerHTML = ''; // Limpia la lista antes de agregar los nuevos datos
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const appointment = childSnapshot.val();
        console.log('Appointment data:', appointment);

        // Usa los nombres de campos correctos
        const specialty = appointment.especialidad || 'No definida';
        const date = appointment.fecha || 'No definida';
        const time = appointment.hora || 'No definida';

        const appointmentElement = document.createElement('div');
        appointmentElement.className = 'appointment';
        appointmentElement.innerHTML = `
          <p>CITA</p>
          <p>Especialidad: ${specialty}</p>
          <p>Fecha: ${date}</p>
          <p>Hora: ${time}</p>
        `;
        appointmentsList.appendChild(appointmentElement);
      });
    } else {
      appointmentsList.innerHTML = '<p>No tienes citas programadas.</p>';
    }
  }, (error) => {
    console.error('Error al cargar las citas:', error);
  });
}

loadAppointments();
