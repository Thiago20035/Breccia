// ============================================
// INTERSECTION OBSERVER - OPTIMIZADO
// ============================================
const observerOptions = {
    threshold: 0.05, // Reducido para móviles
    rootMargin: '0px 0px -30px 0px' // Ajustado para mejor rendimiento
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
        // No removemos 'visible' para mantener animaciones en móviles
    });
}, observerOptions);

// ============================================
// INICIALIZACIÓN AL CARGAR PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Observar elementos animados
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Optimización para touch devices
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        optimizeForTouch();
    }
    
    // Prevenir zoom en inputs en iOS
    preventIOSZoom();
    
    // Mejorar rendimiento de scroll
    optimizeScrollPerformance();
    
    // Inicializar menú móvil
    if (window.innerWidth <= 768) {
        initMobileMenu();
    }
    
    // Inicializar lazy loading
    initLazyLoading();
});

// ============================================
// DETECCIÓN DE DISPOSITIVOS TOUCH
// ============================================
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// ============================================
// OPTIMIZACIONES PARA TOUCH
// ============================================
function optimizeForTouch() {
    // Mejorar área de click en móviles
    const clickableElements = document.querySelectorAll('a, button, .service-card, .propiedad-card, .team-card');
    clickableElements.forEach(el => {
        el.style.minHeight = '44px'; // Tamaño mínimo recomendado para touch
    });
    
    // Prevenir double-tap zoom en enlaces
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            e.preventDefault();
        }
        lastTap = currentTime;
    });
}

// ============================================
// PREVENIR ZOOM EN iOS
// ============================================
function preventIOSZoom() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Asegurar que el font-size sea mínimo 16px en móviles
        if (window.innerWidth < 768) {
            input.style.fontSize = '16px';
        }
    });
}

// ============================================
// SMOOTH SCROLL MEJORADO
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorar si es solo "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Calcular offset para header fijo
            const headerHeight = document.querySelector('header')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            closeMobileMenu();
        }
    });
});

// ============================================
// MENÚ MÓVIL HAMBURGUESA
// ============================================
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const body = document.body;
    const hamburger = document.querySelector('.hamburger-btn');
    
    if (nav) {
        nav.classList.toggle('mobile-active');
        body.classList.toggle('menu-open');
        hamburger?.classList.toggle('active');
        
        // Crear backdrop si no existe
        let backdrop = document.querySelector('.mobile-backdrop');
        if (!backdrop && nav.classList.contains('mobile-active')) {
            backdrop = document.createElement('div');
            backdrop.className = 'mobile-backdrop';
            backdrop.addEventListener('click', closeMobileMenu);
            document.body.appendChild(backdrop);
            setTimeout(() => backdrop.classList.add('active'), 10);
        } else if (backdrop && !nav.classList.contains('mobile-active')) {
            backdrop.classList.remove('active');
            setTimeout(() => backdrop.remove(), 300);
        }
    }
}

function closeMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const backdrop = document.querySelector('.mobile-backdrop');
    const body = document.body;
    const hamburger = document.querySelector('.hamburger-btn');
    
    if (nav?.classList.contains('mobile-active')) {
        nav.classList.remove('mobile-active');
        body.classList.remove('menu-open');
        hamburger?.classList.remove('active');
        
        if (backdrop) {
            backdrop.classList.remove('active');
            setTimeout(() => backdrop.remove(), 300);
        }
    }
}

// Agregar botón hamburguesa si no existe
function initMobileMenu() {
    const nav = document.querySelector('nav');
    if (!nav || document.querySelector('.hamburger-btn')) return;
    
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'hamburger-btn';
    hamburgerBtn.setAttribute('aria-label', 'Menú');
    hamburgerBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    nav.appendChild(hamburgerBtn);
}

// ============================================
// MODAL UTILITIES
// ============================================
function closePortalModal() {
    const modal = document.getElementById('portalModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openPortalModal() {
    const modal = document.getElementById('portalModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

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
        closeMobileMenu();
    }
});

// ============================================
// MANEJO DE LOGIN
// ============================================
function handlePortalLogin(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!usuario || !password) {
        alert('Por favor completá todos los campos');
        return;
    }
    
    // Aquí conectarías con tu sistema de autenticación
    alert('Funcionalidad de login en desarrollo. Usuario: ' + usuario);
    
    // Limpiar formulario
    const form = document.getElementById('portalForm');
    if (form) form.reset();
}

// ============================================
// OPTIMIZACIÓN DE RENDIMIENTO
// ============================================
function optimizeScrollPerformance() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// AJUSTES AL REDIMENSIONAR VENTANA
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Cerrar menú móvil si se redimensiona a desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        
        // Re-inicializar menú si se redimensiona a móvil
        if (window.innerWidth <= 768 && !document.querySelector('.hamburger-btn')) {
            initMobileMenu();
        }
        
        // Actualizar font-size en inputs
        preventIOSZoom();
    }, 250);
});

// ============================================
// ACCESIBILIDAD - NAVEGACIÓN POR TECLADO
// ============================================
document.addEventListener('keydown', (e) => {
    // Tab para navegar por elementos focuseables
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// PERFORMANCE: REDUCIR ANIMACIONES EN LOW-END
// ============================================
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    document.body.classList.add('low-performance');
}

// ============================================
// DETECCIÓN DE CONEXIÓN LENTA
// ============================================
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        document.body.classList.add('slow-connection');
    }
}

// ============================================
// CONFIRMACIÓN DE CARGA COMPLETA
// ============================================
window.addEventListener('load', () => {
    console.log('✓ Sitio cargado completamente');
    document.body.classList.add('loaded');
});
/* ============================================
   JAVASCRIPT PARA DROPDOWN
   Agregar al final de tu breccia.js
   ============================================ */

// Dropdown en móvil
document.addEventListener('DOMContentLoaded', function() {
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const navDropdown = document.querySelector('.nav-dropdown');
    
    if (dropdownTrigger && window.innerWidth <= 768) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            navDropdown.classList.toggle('active');
        });
    }
    
    // Recargar al cambiar tamaño de pantalla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navDropdown.classList.remove('active');
        }
    });
});