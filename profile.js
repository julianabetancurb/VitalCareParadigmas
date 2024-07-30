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
    const db = getDatabase();
    
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      window.location.href = 'login.html'; 
    }

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('userEmail');
      window.location.href = 'login.html';
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
    

    document.getElementById('profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const celular = document.getElementById('celular').value;
      const cedula = document.getElementById('cedula').value;
      const eps = document.getElementById('eps').value;

      const userRef = ref(db, 'usuarios/' + userEmail.replace('.', '_'));
      const userData = {
        nombre,
        celular,
        cedula,
        eps,
      };

      update(userRef, userData)
    .then(() => {
      alert('Perfil actualizado exitosamente.');
      window.location.href = 'index.html'; 
    })
    .catch((error) => {
      console.error('Error al actualizar el perfil:', error);
    });
});
