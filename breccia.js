// ============================================
// INTERSECTION OBSERVER - OPTIMIZADO
// ============================================
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
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
    const clickableElements = document.querySelectorAll('a, button, .service-card, .propiedad-card, .team-card');
    clickableElements.forEach(el => {
        el.style.minHeight = '44px';
    });

    let lastTap = 0;
    document.addEventListener('touchend', function (e) {
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

        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();

            const headerHeight = document.querySelector('header')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

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

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-btn');
    
    if (hamburger) {
        console.log('Botón hamburguesa encontrado');
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}

// ============================================
// DROPDOWN EN MÓVIL
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const navDropdown = document.querySelector('.nav-dropdown');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Manejar dropdown
    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                navDropdown.classList.toggle('active');
                console.log('Dropdown toggle - menú permanece abierto');
                return false;
            }
        });
    }

    // Cerrar menú SOLO cuando se hace click en enlaces (NO en dropdown trigger)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si es el dropdown trigger en móvil, NO cerrar
            if (this.classList.contains('dropdown-trigger') && window.innerWidth <= 768) {
                return;
            }
            
            // Si es un enlace del dropdown menu, cerrar el menú
            if (this.closest('.dropdown-menu')) {
                setTimeout(closeMobileMenu, 100);
                return;
            }
            
            // Si es cualquier otro enlace normal, cerrar el menú
            if (!this.classList.contains('dropdown-trigger')) {
                setTimeout(closeMobileMenu, 100);
            }
        });
    });

    // Resize handler
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navDropdown) {
            navDropdown.classList.remove('active');
        }
    });
});

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

window.addEventListener('click', function (e) {
    const modal = document.getElementById('portalModal');
    if (e.target === modal) {
        closePortalModal();
    }
});

document.addEventListener('keydown', function (e) {
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

    alert('Funcionalidad de login en desarrollo. Usuario: ' + usuario);

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
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }

        if (window.innerWidth <= 768 && !document.querySelector('.hamburger-btn')) {
            initMobileMenu();
        }

        preventIOSZoom();
    }, 250);
});

// ============================================
// ACCESIBILIDAD - NAVEGACIÓN POR TECLADO
// ============================================
document.addEventListener('keydown', (e) => {
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