import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const db = getDatabase(app);
//verificar que el usuario este ya registrado
const userEmail = localStorage.getItem('userEmail');
//const Email = userEmail.replace('_', '.');
if (!userEmail) {
  window.location.href = 'login.html';
}
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('userEmail');
  window.location.href = 'login.html';
});

document.getElementById('profile-btn').addEventListener('click', () => {
  window.location.href = 'profile.html'; 
});

document.getElementById('view-appointments-btn').addEventListener('click', () => {
  window.location.href = 'view.html';
});
document.getElementById('mapa-btn').addEventListener('click', () => {
  window.location.href = 'mapa.html';
});

function saveAppointment(date, time, specialty) {
    const sanitizedEmail = userEmail.replace('.', '_');
   
    const appointmentId = `Cita_con_${specialty.replace(/ /g, '_')}_en_fecha_${date}_a_las_${time.replace(':', '-')}`;

    const newAppointmentData = {
      fecha: date,
      hora: time,
      especialidad: specialty,
    };
  
    const appointmentRef = ref(db, `usuarios/${sanitizedEmail}/citas/${appointmentId}`);
  
    set(appointmentRef, newAppointmentData)
      .then(() => {
        alert('Cita registrada con éxito');
        sendEmailNotification(userEmail, date, time, specialty);  // Llamada a la función para enviar el correo
      
        //window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error('Error registrando la cita: ', error);
      });
  }
  
 
  function sendEmailNotification(userEmail, date, time, specialty) {
    const emailParams = {
      user_email: userEmail,
      date: date,
      time: time,
      specialty: specialty
    };
  
    emailjs.send('service_k9tuazq', 'template_dlnj0w4', emailParams)
      .then((response) => {
        console.log('Correo enviado con éxito', response.status, response.text);
        alert('EMAIL ENVIADO con éxito');
      })
      .catch((error) => {
        console.error('Error enviando el correo: ', error);
        alert('EMAIL SIN éxito', error);
      });
  }
  

  

//Envío del formulario
document.getElementById('appointment-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const specialty = document.getElementById('appointment-specialty').value;
  
    saveAppointment(date, time, specialty);
  });
    



