const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const indexButton = document.getElementById('index-button');


loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Validar que solo se puedan registrar con correos válidos
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|icloud\.com)$/;
    if (!emailPattern.test(emailInput)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    localStorage.setItem('userEmail', emailInput);
    console.log('Login successful');
    window.location.href = 'index.html';
});

//botón de EPS cercana
indexButton.addEventListener('click', () => {
    window.location.href = 'mapa.html';
});

console.log(localStorage.getItem('userEmail'));
