// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos con clases de animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    const modal = document.getElementById('portalModal');
    if (e.target === modal) {
        closePortalModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePortalModal();
    }
});

// Manejar login del portal
function handlePortalLogin(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    
    // Aquí conectarías con tu sistema de autenticación
    // Por ahora mostramos un mensaje
    alert('Funcionalidad de login en desarrollo. Usuario: ' + usuario);
    
    // Limpiar formulario
    document.getElementById('portalForm').reset();
}
