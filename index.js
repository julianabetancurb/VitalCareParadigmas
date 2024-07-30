import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, set, onValue, remove, query, orderByChild, equalTo, get } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const db = getDatabase()
const userEmail = localStorage.getItem('userEmail');
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

document.getElementById('appointments-btn').addEventListener('click', () => {
  window.location.href = 'appointment.html';
});
document.getElementById('view-appointments-btn').addEventListener('click', () => {
  window.location.href = 'view.html';
});
document.getElementById('mapa-btn').addEventListener('click', () => {
  window.location.href = 'mapa.html';
});


function saveUser(email) {  
  const userRef = ref(db, 'usuarios/' + email.replace('.', '_'));

  // Verificar si el usuario ya existe
  get(userRef)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        const newUserData = {
          nombre: "",
          celular: "",
          cedula: "",
          eps: "",
          historialClinico: [ 
            {
              nombre: "nombre paciente", 
              fechaNacimiento: "fecha paciente", 
              alergias: "acetaminofen",
              enfermedades: "ser guapo" 
            }
          ]
        };
        set(userRef, newUserData)
        .then(() => {
          console.log('Perfil de usuario creado exitosamente.');
        })
        .catch((error) => {
          console.error('Error al crear el perfil de usuario:', error);
        });
    } else {
      console.log('Usuario ya existe.');
    }
  })
  .catch((error) => {
    console.error('Error al verificar existencia del usuario:', error);
  });
}

saveUser(localStorage.getItem('userEmail'));