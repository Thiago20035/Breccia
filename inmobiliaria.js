
// ============================================
// CARRUSEL DE SERVICIOS INMOBILIARIOS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('Página cargada');

    // Carrusel de servicios
    let currentSlideInmo = 0;
    const trackInmo = document.getElementById('carouselTrackInmo');
    const indicatorsInmo = document.querySelectorAll('.indicator-inmo');
    const totalSlidesInmo = document.querySelectorAll('.carousel-slide-inmo').length;

    function updateCarouselInmo() {
        trackInmo.style.transform = `translateX(-${currentSlideInmo * 100}%)`;
        indicatorsInmo.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlideInmo);
            if (index === currentSlideInmo) {
                indicator.style.animation = 'none';
                setTimeout(() => { indicator.style.animation = ''; }, 10);
            }
        });
    }

    function nextSlideInmo() {
        currentSlideInmo = (currentSlideInmo + 1) % totalSlidesInmo;
        updateCarouselInmo();
    }

    function prevSlideInmo() {
        currentSlideInmo = (currentSlideInmo - 1 + totalSlidesInmo) % totalSlidesInmo;
        updateCarouselInmo();
    }

    document.getElementById('nextBtnInmo').addEventListener('click', nextSlideInmo);
    document.getElementById('prevBtnInmo').addEventListener('click', prevSlideInmo);
    indicatorsInmo.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlideInmo = index;
            updateCarouselInmo();
        });
    });

    let autoplayIntervalInmo = setInterval(nextSlideInmo, 5000);
    const carouselContainerInmo = document.querySelector('.carousel-container-inmo');
    carouselContainerInmo.addEventListener('mouseenter', () => clearInterval(autoplayIntervalInmo));
    carouselContainerInmo.addEventListener('mouseleave', () => {
        autoplayIntervalInmo = setInterval(nextSlideInmo, 5000);
    });

    // ============================================
    // CARRUSEL DE IMÁGENES PROPIEDADES
    // ============================================
    const carouselStates = {};

    window.moveCarousel = function (carouselId, direction) {
        const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
        if (!carousel) return;

        const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
        const totalItems = carousel.children.length;

        if (!carouselStates[carouselId]) carouselStates[carouselId] = 0;

        carouselStates[carouselId] += direction;

        if (carouselStates[carouselId] < 0) {
            carouselStates[carouselId] = totalItems - 1;
        } else if (carouselStates[carouselId] >= totalItems) {
            carouselStates[carouselId] = 0;
        }

        carousel.style.transform = `translateX(-${carouselStates[carouselId] * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === carouselStates[carouselId]);
        });
        window.moveCarousel = function (carouselId, direction) {
            const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
            if (!carousel) return;

            const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
            const totalItems = carousel.children.length;

            if (!carouselStates[carouselId]) carouselStates[carouselId] = 0;

            carouselStates[carouselId] += direction;

            if (carouselStates[carouselId] < 0) {
                carouselStates[carouselId] = totalItems - 1;
            } else if (carouselStates[carouselId] >= totalItems) {
                carouselStates[carouselId] = 0;
            }

            carousel.style.transform = `translateX(-${carouselStates[carouselId] * 100}%)`;

            // Actualizar dots y reiniciar animación
            dots.forEach((dot, index) => {
                const isActive = index === carouselStates[carouselId];
                dot.classList.toggle('active', isActive);

                // Reiniciar animación en el dot activo
                if (isActive) {
                    dot.style.animation = 'none';
                    setTimeout(() => {
                        dot.style.animation = '';
                    }, 10);
                }
            });
        }
    }

    window.goToSlide = function (carouselId, slideIndex) {
        const carousel = document.querySelector(`[data-carousel="${carouselId}"]`);
        if (!carousel) return;

        const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
        carouselStates[carouselId] = slideIndex;
        carousel.style.transform = `translateX(-${slideIndex * 100}%)`;

        // Actualizar dots y reiniciar animación
        dots.forEach((dot, index) => {
            const isActive = index === slideIndex;
            dot.classList.toggle('active', isActive);

            // Reiniciar animación en el dot activo
            if (isActive) {
                dot.style.animation = 'none';
                setTimeout(() => {
                    dot.style.animation = '';
                }, 10);
            }
        });
    }

    // Autoplay al hover
    // Autoplay SIEMPRE ACTIVO (no se pausa al hover)
    // Autoplay SOLO al hover
    let autoplayIntervals = {};
    document.querySelectorAll('.propiedad-image-container').forEach((container, index) => {
        container.addEventListener('mouseenter', () => {
            // Iniciar autoplay cuando entra el cursor
            autoplayIntervals[index] = setInterval(() => window.moveCarousel(index, 1), 2500);
        });
        container.addEventListener('mouseleave', () => {
            // Detener autoplay cuando sale el cursor
            if (autoplayIntervals[index]) {
                clearInterval(autoplayIntervals[index]);
                delete autoplayIntervals[index];
            }
        });
    });

    // Cargar propiedades dinámicas creadas desde el Panel Admin
    if (typeof cargarPropiedadesDinamicas === 'function') {
        cargarPropiedadesDinamicas();
    }

    // Aplicar ribbons de estado a las propiedades estáticas (hardcodeadas en el HTML)
    aplicarRibbonsEstaticas();

    // Aplicar orden personalizado y ribbons de propiedades destacadas
    aplicarOrdenYDestacados();
});

// ============================================
// RIBBONS PARA PROPIEDADES ESTÁTICAS
// Lee el estado de localStorage y aplica el ribbon sobre cada card
// ============================================
function aplicarRibbonsEstaticas() {
    const estadosEstaticas = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
    const overridesEstaticas = JSON.parse(localStorage.getItem('breccia_estaticas_overrides') || '{}');

    const ribbonConfig = {
        reservada: { label: 'RESERVADA', cls: 'ribbon-reservada' },
        alquilada: { label: 'ALQUILADA', cls: 'ribbon-alquilada' },
        vendida:   { label: 'VENDIDA',   cls: 'ribbon-vendida'   }
    };

    document.querySelectorAll('.propiedad-card[data-propiedad-id]').forEach(card => {
        const propId = card.dataset.propiedadId;
        if (!propId || !/^\d+$/.test(propId)) return;

        // Si la propiedad fue editada desde el Panel Admin, reflejar cambios en la tarjeta
        if (overridesEstaticas[propId]) {
            const ov = overridesEstaticas[propId];
            if (ov.titulo) {
                const titleEl = card.querySelector('h3');
                if (titleEl) titleEl.textContent = ov.titulo;
            }
            if (ov.precio) {
                const precioEl = card.querySelector('.propiedad-precio');
                if (precioEl) precioEl.textContent = ov.precio;
            }
            if (ov.ubicacion) {
                const ubiEl = card.querySelector('.propiedad-ubicacion span:last-child');
                if (ubiEl) ubiEl.textContent = ov.ubicacion;
            }
            if (typeof propiedadesDetalle !== 'undefined' && propiedadesDetalle[propId]) {
                Object.assign(propiedadesDetalle[propId], ov);
            }
        }

        const estado = estadosEstaticas[propId] || 'disponible';
        const ribbonInfo = ribbonConfig[estado];
        const container = card.querySelector('.propiedad-image-container');
        if (!container) return;

        // Eliminar ribbons anteriores si existen
        container.querySelectorAll('.prop-estado-ribbon, .prop-estado-overlay').forEach(el => el.remove());

        if (ribbonInfo) {
            const ribbon = document.createElement('div');
            ribbon.className = `prop-estado-ribbon ${ribbonInfo.cls}`;
            ribbon.innerHTML = `<span>${ribbonInfo.label}</span>`;

            const overlay = document.createElement('div');
            overlay.className = 'prop-estado-overlay';

            container.appendChild(ribbon);
            container.appendChild(overlay);
        }

        // Actualizar botón de consultar: deshabilitar si está vendida / alquilada / reservada
        const btnConsultar = card.querySelector('.consultar-btn');
        if (btnConsultar) {
            if (estado === 'vendida') {
                btnConsultar.textContent = 'Vendida';
                btnConsultar.classList.add('btn-deshabilitado');
                btnConsultar.disabled = true;
                btnConsultar.setAttribute('title', 'Esta propiedad ya fue vendida');
                btnConsultar.onclick = (e) => { e.stopPropagation(); e.preventDefault(); };
            } else if (estado === 'alquilada') {
                btnConsultar.textContent = 'Alquilada';
                btnConsultar.classList.add('btn-deshabilitado');
                btnConsultar.disabled = true;
                btnConsultar.setAttribute('title', 'Esta propiedad ya fue alquilada');
                btnConsultar.onclick = (e) => { e.stopPropagation(); e.preventDefault(); };
            } else if (estado === 'reservada') {
                btnConsultar.textContent = 'Reservada';
                btnConsultar.classList.add('btn-deshabilitado');
                btnConsultar.disabled = true;
                btnConsultar.setAttribute('title', 'Esta propiedad se encuentra reservada');
                btnConsultar.onclick = (e) => { e.stopPropagation(); e.preventDefault(); };
            } else {
                btnConsultar.textContent = 'Consultar';
                btnConsultar.classList.remove('btn-deshabilitado');
                btnConsultar.disabled = false;
                btnConsultar.removeAttribute('title');
                const t = card.querySelector('h3')?.textContent || '';
                const u = card.querySelector('.propiedad-ubicacion span:last-child')?.textContent || '';
                const p = card.querySelector('.propiedad-precio')?.textContent || '';
                btnConsultar.onclick = (e) => {
                    e.stopPropagation();
                    abrirModalConsulta(t, u, p);
                };
            }
        }

        // Botón flotante para compartir en historia de Instagram
        if (container && !container.querySelector('.btn-card-share')) {
            const btnShare = document.createElement('button');
            btnShare.className = 'btn-card-share';
            btnShare.title = 'Compartir en Historia de Instagram';
            btnShare.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>';
            btnShare.onclick = (e) => {
                e.stopPropagation();
                if (typeof abrirModalCompartir === 'function') abrirModalCompartir(propId, true);
            };
            container.appendChild(btnShare);
        }
    });
}

// ============================================
// ORDEN Y DESTACADOS EN LA CUADRÍCULA
// ============================================
function aplicarOrdenYDestacados() {
    const grid = document.getElementById('propiedadesGrid');
    if (!grid) return;

    const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');
    const ordenIds = JSON.parse(localStorage.getItem('breccia_propiedades_orden') || '[]');

    const cards = Array.from(grid.querySelectorAll('.propiedad-card[data-propiedad-id]'));
    if (cards.length === 0) return;

    cards.forEach(card => {
        const id = String(card.dataset.propiedadId || '');
        const container = card.querySelector('.propiedad-image-container');

        // Manejar ribbon de Destacada
        const ribbonExistente = container ? container.querySelector('.prop-destacada-ribbon') : null;
        if (destacadas[id]) {
            card.classList.add('es-destacada');
            if (container && !ribbonExistente) {
                const ribbon = document.createElement('div');
                ribbon.className = 'prop-destacada-ribbon';
                ribbon.innerHTML = '<span>⭐</span> <span>DESTACADA</span>';
                container.appendChild(ribbon);
            }
        } else {
            card.classList.remove('es-destacada');
            if (ribbonExistente) ribbonExistente.remove();
        }
    });

    // Reordenar DOM de tarjetas respetando destacadas primero y el orden personalizado
    cards.sort((a, b) => {
        const idA = String(a.dataset.propiedadId || '');
        const idB = String(b.dataset.propiedadId || '');

        const isDestA = !!destacadas[idA];
        const isDestB = !!destacadas[idB];

        // 1. Destacadas van primero
        if (isDestA && !isDestB) return -1;
        if (!isDestA && isDestB) return 1;

        // 2. Orden personalizado guardado
        const idxA = ordenIds.indexOf(idA);
        const idxB = ordenIds.indexOf(idB);

        const posA = idxA !== -1 ? idxA : 9999;
        const posB = idxB !== -1 ? idxB : 9999;

        return posA - posB;
    });

    // Re-insertar en el nuevo orden en el DOM
    cards.forEach(card => grid.appendChild(card));
}

// ============================================
// FILTROS
// ============================================
// ============================================
// FILTROS
// ============================================
document.querySelectorAll('.filter-btn-prop').forEach(btn => {
    btn.addEventListener('click', function () {
        console.log('Filtro clickeado:', this.dataset.tipo);
        
        document.querySelectorAll('.filter-btn-prop').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const categoria = this.dataset.tipo;
        
        let visibleCount = 0;
        document.querySelectorAll('.propiedad-card').forEach(prop => {
            const propCategoria = prop.dataset.categoria;  // ✅ Usar data-categoria
            
            if (categoria === 'todas' || propCategoria === categoria) {  // ✅ Comparar con data-categoria
                prop.classList.remove('hidden');
                visibleCount++;
            } else {
                prop.classList.add('hidden');
            }
        });
        
        console.log('Propiedades visibles:', visibleCount);
    });
});

// ============================================
// MODAL CONSULTA
// ============================================
let propiedadActual = {};

window.abrirModalConsulta = function (nombre, ubicacion, precio) {
    propiedadActual = { nombre, ubicacion, precio };
    document.getElementById('propiedadInfoModal').innerHTML = `
            <h4>${nombre}</h4>
            <p><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${ubicacion} • <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px; margin-left:6px;"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>${precio}</p>
        `;
    document.getElementById('modalConsulta').classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.cerrarModalConsulta = function () {
    document.getElementById('modalConsulta').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('formConsulta').reset();
    document.getElementById('successMessage').classList.remove('show');
}

document.getElementById('modalConsulta').addEventListener('click', function (e) {
    if (e.target === this) window.cerrarModalConsulta();
});

window.enviarConsulta = async function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const formData = new FormData(e.target);
    const datos = {
        access_key: "f4521112-daef-4171-b0b7-0a994aeb27f3",
        subject: `Consulta de Propiedad: ${propiedadActual.nombre}`,
        from_name: `${formData.get('nombre')} ${formData.get('apellido')}`,
        email: formData.get('email'),
        message: `
CONSULTA DE PROPIEDAD
====================
PROPIEDAD:
- Nombre: ${propiedadActual.nombre}
- Ubicación: ${propiedadActual.ubicacion}
- Precio: ${propiedadActual.precio}

DATOS DEL INTERESADO:
- Nombre: ${formData.get('nombre')} ${formData.get('apellido')}
- Email: ${formData.get('email')}
- Teléfono: ${formData.get('telefono')}
- Tipo de Consulta: ${formData.get('tipoConsulta')}

MENSAJE:
${formData.get('mensaje') || 'Sin mensaje adicional'}

Fecha: ${new Date().toLocaleString('es-AR')}
            `.trim()
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(datos)
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('successMessage').classList.add('show');
            document.getElementById('formConsulta').reset();
            setTimeout(() => window.cerrarModalConsulta(), 3000);
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        alert('Hubo un error al enviar la consulta. Por favor, intenta nuevamente o contáctanos por teléfono al 495-7908.');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Consulta';
    }
}

// ============================================
// MODAL DETALLE - ARREGLADO
// ============================================
const propiedadesDetalle = {
    // PROPIEDAD 1: Gascón 2356
    1: {
        titulo: "Departamento Tipo Semipiso de Tres (3) Ambientes",
        ubicacion: "Gascón 2356, Plaza Colón",
        precio: "USD 169.000",
        tipo: "Venta",
        dormitorios: "2",
        banos: "2",
        superficie: "69 m²",
        // Campos estándar para departamentos
        esLote: false,
        descripcion: "Impecable departamento tipo semipiso de tres (3) ambientes con cochera doble. Ubicado en una excelente zona como lo es próximo a la Plaza Colón, al entorno al Shopping Paseo Aldrey y a la comercial calle Alberti. Consta de un amplio living-comedor con pisos cerámicos con salida al balcón sobre la calle Gascón, cómoda cocina semi-integrada muy bien equipada con espacio para conexión lavarropas y práctica barra que separa visualmente ambos espacios, dormitorio principal en suite con gran vestidor y funcional espacio de escritorio cerrado muy luminoso, segundo dormitorio con placard, toilette de recepción con ducha y cochera doble cubierta con acceso con control remoto. Su superficie total es de 69 m² y su calefacción es por radiadores. Es una propiedad muy luminosa porque tanto el living como los 2 dormitorios cuentan con vistas abiertas. El consorcio posee una antigüedad de 10 años y está muy bien administrado. Sus expensas son bajas (a enero 2026 $ 130.000.-) La propiedad cuenta con un diseño muy moderno y funcional. Ideal para un matrimonio solo y/o pareja joven con un hijo/a. El barrio por su cercanía a la calle Alberti cuenta con numerosos negocios de cercanías como farmacias, polirrubros, panaderías, café, despensas, verdulerías y transporte público de pasajeros (taxis y colectivos).",
        caracteristicas: [
            "Cocina equipada con mobiliario moderno",
            "Living comedor amplio con salida a balcón",
            "Dormitorio principal en suite con vestidor",
            "Segundo dormitorio con placard",
            "Toilette de recepción con ducha",
            "Cochera doble cubierta con control remoto",
            "Calefacción por radiadores",
            "Pisos cerámicos",
            "Vistas abiertas en living y dormitorios",
            "Consorcio bien administrado",
            "Expensas bajas",
            "Diseño moderno y funcional"
        ],
        imagenes: Array.from({ length: 40 }, (_, i) => `FotosGascon2356/G${i + 1}.jpg`)
    },

    // PROPIEDAD 2: Arenales 2445
    2: {
        titulo: "Departamento de Dos Ambientes",
        ubicacion: "Arenales 2445, Mar del Plata",
        precio: "Consultar",
        tipo: "Venta",
        dormitorios: "1",
        banos: "1",
        superficie: "40 m²",
        // Campos estándar para departamentos
        esLote: false,
        descripcion: "Ubicado en una zona privilegiada de Mar del Plata a 200 metros de la Plaza Colón, de la Av. Colón y de la comercial calle Alberti. Se trata de un departamento de 2 ambientes al lateral y al contrafrente, luminoso y muy cómodo. Consta de amplio living-comedor con pisos cerámicos, dormitorio con placard, cómoda cocina y baño completo. Superficie cubierta de 40 m² y sus expensas son bajas. Muy buen estado de conservación y mantenimiento. ¡Oportunidad de inversión para futura renta! Ideal para alquilarlo por temporada de verano y luego a estudiantes. El barrio cuenta con una gran variedad de negocios tales como farmacias, café, almacenes, panaderías, peluquerías, Rapipagos, rotiserías y transporte público de pasajeros (taxis, colectivos). Caminando 15 minutos se llega a la gastronómica calle Olavarría y la comercial calle Güemes.",
        caracteristicas: [
            "Amplio living-comedor con pisos cerámicos",
            "Dormitorio con placard",
            "Cocina cómoda y funcional",
            "Baño completo",
            "A 200 metros de Plaza Colón",
            "Cerca de Av. Colón y calle Alberti",
            "Departamento lateral y al contrafrente",
            "Muy luminoso",
            "Expensas bajas",
            "Excelente estado de conservación",
            "Ideal para inversión y renta",
            "Perfecto para alquiler temporario",
            "Apto para estudiantes",
            "Zona con todos los servicios",
            "Farmacias, cafés y comercios cercanos",
            "Transporte público accesible",
            "A 15 min. caminando de calle Olavarría",
            "Cerca de la comercial calle Güemes"
        ],
        imagenes: Array.from({ length: 12 }, (_, i) => `Arenales2445/PA${i + 1}.jpg`)
    },

    // PROPIEDAD 3: Francia 3741
    3: {
        titulo: "Lote con Construcción en Parque Luro",
        ubicacion: "Francia 3741, Parque Luro",
        precio: "Consultar",
        tipo: "Venta",
        // Campos personalizados para lote
        esLote: true,
        dimensiones: "10x33m",
        construccion: "70 m²",
        superficieTotal: "330 m²",
        descripcion: "¡Excelente oportunidad de inversión en la zona del residencial barrio de Parque Luro! Ubicado a 100 metros de la comercial Av. Jara. Se trata de una construcción al fondo de 70 m² a reciclar sobre un lote de 10 metros de frente por 33 metros de profundidad. IDEAL para desarrollo de dúplex, complejo de unidades tipo P.H. o para vivienda familiar. Es una zona residencial con mucha población estable y el barrio cuenta con muchos comercios de cercanías como mercados, panaderías, centros de pago, negocios de ropa, farmacias, etc. La zona norte de la ciudad de Mar del Plata está tomando mucho impulso como un lugar muy buscado por los marplatenses para vivir todo el año. ¡No deje de consultar por esta oportunidad!",
        caracteristicas: [
            "Lote de 10m x 33m (330 m²)",
            "Construcción existente de 70 m²",
            "A 100 metros de Av. Jara",
            "Zona residencial Parque Luro",
            "Ideal para desarrollo inmobiliario",
            "Perfecto para dúplex",
            "Apto para complejo de P.H.",
            "Opción para vivienda familiar",
            "A reciclar completamente",
            "Barrio con población estable",
            "Comercios de cercanía",
            "Mercados y panaderías cercanas",
            "Centros de pago accesibles",
            "Farmacias y negocios de ropa",
            "Zona norte en desarrollo",
            "Muy buscado para vivir todo el año",
            "Excelente oportunidad de inversión",
            "Alto potencial de revalorización"
        ],
        imagenes: ['Francia371/F3.jpg', 'Francia371/F4.jpg']
    },

    4: {
        titulo: "Departamento de 4 Ambientes con Gran Patio",
        ubicacion: "San Juan y Avellaneda, Mar del Plata",
        precio: "USD 85.000",
        tipo: "Venta",
        dormitorios: "3",
        banos: "1",
        superficie: "Consultar",
        esLote: false,
        descripcion: "Ubicado en la zona de San Juan y Avellaneda, esta unidad se caracteriza por ser muy cómoda para una familia numerosa y por contar con un amplio patio propio con plantas. La propiedad cuenta con una superficie total de 129,71 m², de los cuales 68,56 m² son cubiertos, lo que brinda un excelente equilibrio entre espacios interiores y exteriores. Al ingresar nos encontramos con un living-comedor con salida directa al patio, cómoda cocina con espacio de lavadero para lavarropas, baño completo y tres (3) dormitorios con pisos de parquet y placard. El patio es de uso exclusivo, ideal para colocar mesa, sombrilla y sillas, y disfrutar de un agradable espacio verde al aire libre. La unidad se ubica al frente y lateral del edificio, lo que permite una excelente luminosidad natural durante todo el día.",
        caracteristicas: [
            "Living-comedor con salida al patio",
            "Tres dormitorios con pisos de parquet",
            "Todos los dormitorios con placard",
            "Baño completo",
            "Cocina con espacio para lavadero",
            "Patio propio amplio con plantas",
            "Ideal para familia numerosa",
            "Perfecto para colocar mesa y sombrillas",
            "Espacio verde propio",
            "Unidad al frente y lateral",
            "Muy luminoso todo el día",
            "Zona de San Juan y Avellaneda",
            "Excelente ubicación",
            "Pisos de parquet en dormitorios",
            "Espacio de lavadero integrado"
        ],
        imagenes: Array.from({ length: 27 }, (_, i) => `SanJuan3052/SJ${i + 2}.jpg`)
    },
    // AGREGAR DENTRO DEL OBJETO propiedadesDetalle en inmobiliaria.js
    // Agregar DESPUÉS de la propiedad 4 (San Juan 3052)

    5: {
        titulo: "Cocheras en Edificio Céntrico - 2 Unidades Disponibles",
        ubicacion: "Corrientes entre Rivadavia y Belgrano, Centro",
        precio: "USD 13.000 c/u",
        tipo: "Venta",
        // Campos personalizados para cocheras
        esCochera: true,
        unidades: "702 y 703",
        expensas: "$70.000",
        antiguedad: "45 años",
        descripcion: "Cochera para un (1) vehículo en edificio de cocheras en el centro de Mar del Plata, en la calle Corrientes entre Rivadavia y Belgrano. Se puede acceder tanto por rampa como por ascensor (montacarga). El edificio cuenta con seguridad las 24 horas. Unidades Nº 702 y 703. Valor U$S 13.000.- CADA UNA. Se escuchan ofertas por una unidad o por las 2 cocheras. Escribanía designada. Ideal para profesionales y/o comerciantes con actividades en ese radio de ubicación. Tranquilidad por seguridad y que siempre tendrá su propio lugar para estacionar sin dar tantas vueltas para encontrar espacio. Expensas: $70.000",
        caracteristicas: [
            "2 cocheras disponibles (Unidades 702 y 703)",
            "USD 13.000 cada una",
            "Se escuchan ofertas por ambas",
            "Acceso por rampa o ascensor montacarga",
            "Seguridad 24 horas",
            "Ubicación céntrica privilegiada",
            "Calle Corrientes entre Rivadavia y Belgrano",
            "Ideal para profesionales",
            "Perfecto para comerciantes de la zona",
            "Lugar propio garantizado",
            "Sin vueltas para estacionar",
            "Edificio exclusivo de cocheras",
            "Expensas: $70.000",
            "Antigüedad: 45 años",
            "Escribanía designada",
            "Agua corriente",
            "Cloacas",
            "Electricidad",
            "Edificio bien mantenido"
        ],
        imagenes: Array.from({ length: 9 }, (_, i) => `LeblonCochera/L${i + 1}.jpeg`)
    },
};

let propiedadActualDetalle = {};
let imagenActualDetalle = 0;
let imagenesDetalle = [];

window.abrirDetallePropiedad = function (idPropiedad) {
    console.log('Abriendo detalle propiedad:', idPropiedad);

    const propiedad = propiedadesDetalle[idPropiedad];
    if (!propiedad) {
        console.error('Propiedad no encontrada:', idPropiedad);
        return;
    }

    propiedadActualDetalle = propiedad;
    imagenesDetalle = propiedad.imagenes;
    imagenActualDetalle = 0;

    // Llenar info básica
    document.getElementById('detalleBadge').textContent = propiedad.tipo;
    document.getElementById('detalleTitulo').textContent = propiedad.titulo;
    document.getElementById('detalleUbicacion').textContent = propiedad.ubicacion;
    document.getElementById('detallePrecio').textContent = propiedad.precio;

    // Actualizar specs según el tipo de propiedad
    const specsContainer = document.querySelector('.detalle-specs');

    if (propiedad.esCochera) {
        // Para cocheras: mostrar unidades, expensas y antigüedad
        specsContainer.innerHTML = `
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect></svg></span>
                    <div>
                        <strong>Unidades</strong>
                        <p>${propiedad.unidades}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
                    <div>
                        <strong>Expensas</strong>
                        <p>${propiedad.expensas}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                    <div>
                        <strong>Antigüedad</strong>
                        <p>${propiedad.antiguedad}</p>
                    </div>
                </div>
            `;
    } else if (propiedad.esLote) {
        // Para lotes: mostrar dimensiones, construcción y superficie total
        specsContainer.innerHTML = `
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L3 21"></path><path d="M15 3h6v6"></path><path d="M3 15v6h6"></path></svg></span>
                    <div>
                        <strong>Dimensiones</strong>
                        <p>${propiedad.dimensiones}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg></span>
                    <div>
                        <strong>Construcción</strong>
                        <p>${propiedad.construccion}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h4"></path><path d="M3 15h4"></path><path d="M9 3v4"></path><path d="M15 3v4"></path></svg></span>
                    <div>
                        <strong>Superficie</strong>
                        <p>${propiedad.superficieTotal}</p>
                    </div>
                </div>
            `;
    } else {
        // Para propiedades normales: mostrar dormitorios, baños y superficie
        specsContainer.innerHTML = `
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v3"></path></svg></span>
                    <div>
                        <strong>Dormitorios</strong>
                        <p>${propiedad.dormitorios}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M12 4v4"></path><path d="M7 4h10"></path></svg></span>
                    <div>
                        <strong>Baños</strong>
                        <p>${propiedad.banos}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <span class="spec-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h4"></path><path d="M3 15h4"></path><path d="M9 3v4"></path><path d="M15 3v4"></path></svg></span>
                    <div>
                        <strong>Superficie</strong>
                        <p>${propiedad.superficie}</p>
                    </div>
                </div>
            `;
    }

    // Descripción
    document.getElementById('detalleDescripcion').textContent = propiedad.descripcion;

    // Características
    const caracEl = document.getElementById('detalleCaracteristicas');
    caracEl.innerHTML = propiedad.caracteristicas.map(c => `<li>${c}</li>`).join('');

    // Estado de la propiedad y configuración del botón Consultar en Detalle
    const estadosEstaticas = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
    const estadoProp = estadosEstaticas[String(idPropiedad)] || propiedad.estado || 'disponible';
    const btnDetalleConsulta = document.querySelector('.consultar-btn-detalle');

    if (btnDetalleConsulta) {
        if (estadoProp === 'vendida') {
            btnDetalleConsulta.textContent = 'Propiedad Vendida';
            btnDetalleConsulta.classList.add('btn-deshabilitado');
            btnDetalleConsulta.disabled = true;
            btnDetalleConsulta.onclick = (e) => { e.preventDefault(); };
        } else if (estadoProp === 'alquilada') {
            btnDetalleConsulta.textContent = 'Propiedad Alquilada';
            btnDetalleConsulta.classList.add('btn-deshabilitado');
            btnDetalleConsulta.disabled = true;
            btnDetalleConsulta.onclick = (e) => { e.preventDefault(); };
        } else if (estadoProp === 'reservada') {
            btnDetalleConsulta.textContent = 'Propiedad Reservada';
            btnDetalleConsulta.classList.add('btn-deshabilitado');
            btnDetalleConsulta.disabled = true;
            btnDetalleConsulta.onclick = (e) => { e.preventDefault(); };
        } else {
            btnDetalleConsulta.textContent = 'Consultar por esta propiedad';
            btnDetalleConsulta.classList.remove('btn-deshabilitado');
            btnDetalleConsulta.disabled = false;
            btnDetalleConsulta.onclick = () => {
                cerrarDetallePropiedad();
                setTimeout(() => {
                    abrirModalConsulta(
                        document.getElementById('detalleTitulo').textContent,
                        document.getElementById('detalleUbicacion').textContent,
                        document.getElementById('detallePrecio').textContent
                    );
                }, 350);
            };
        }
    }

    // Botón de Compartir Story de Instagram en Modal de Detalle
    const btnShareModal = document.getElementById('btnCompartirDetalleModal');
    if (btnShareModal) {
        btnShareModal.onclick = () => {
            const esEstatica = /^\d+$/.test(String(idPropiedad)) && parseInt(idPropiedad) <= 5;
            if (typeof window.abrirModalCompartir === 'function') {
                window.abrirModalCompartir(idPropiedad, esEstatica);
            }
        };
    }

    // Cargar miniaturas PRIMERO
    cargarMiniaturas();

    // Luego actualizar la imagen principal
    actualizarImagenDetalle();

    // Mostrar modal
    document.getElementById('modalDetalle').classList.add('active');
    document.body.style.overflow = 'hidden';

    console.log('Modal detalle abierto correctamente');
}

window.cerrarDetallePropiedad = function () {
    document.getElementById('modalDetalle').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function actualizarImagenDetalle() {
    console.log('Actualizando imagen:', imagenActualDetalle, imagenesDetalle[imagenActualDetalle]);

    const img = document.getElementById('imagenPrincipal');
    if (img) {
        img.style.backgroundImage = `url('${imagenesDetalle[imagenActualDetalle]}')`;
    }

    const contador = document.getElementById('contadorImagenes');
    if (contador) {
        contador.textContent = `${imagenActualDetalle + 1} / ${imagenesDetalle.length}`;
    }

    // Actualizar miniaturas activas
    document.querySelectorAll('.miniatura').forEach((mini, index) => {
        mini.classList.toggle('active', index === imagenActualDetalle);
    });
}

function cargarMiniaturas() {
    const miniaturas = document.getElementById('miniaturas');
    if (!miniaturas) return;

    miniaturas.innerHTML = imagenesDetalle.map((img, index) => `
            <div class="miniatura ${index === 0 ? 'active' : ''}" 
                 style="background-image: url('${img}')" 
                 onclick="irAImagenDetalle(${index})"></div>
        `).join('');

    console.log('Miniaturas cargadas:', imagenesDetalle.length);
}

window.irAImagenDetalle = function (index) {
    console.log('Ir a imagen:', index);
    imagenActualDetalle = index;
    actualizarImagenDetalle();
}

function navegarImagenDetalle(direccion) {
    imagenActualDetalle += direccion;
    if (imagenActualDetalle < 0) {
        imagenActualDetalle = imagenesDetalle.length - 1;
    } else if (imagenActualDetalle >= imagenesDetalle.length) {
        imagenActualDetalle = 0;
    }
    actualizarImagenDetalle();
}

// Botones de navegación
const detallePrevBtn = document.getElementById('detallePrevBtn');
const detalleNextBtn = document.getElementById('detalleNextBtn');
if (detallePrevBtn) detallePrevBtn.addEventListener('click', () => navegarImagenDetalle(-1));
if (detalleNextBtn) detalleNextBtn.addEventListener('click', () => navegarImagenDetalle(1));

// Click fuera del modal
document.getElementById('modalDetalle').addEventListener('click', function (e) {
    if (e.target === this) window.cerrarDetallePropiedad();
});

// ============================================
// CLICKS EN TARJETAS
// ============================================
document.querySelectorAll('.propiedad-card').forEach(card => {
    card.addEventListener('click', function (event) {
        // Evitar abrir modal si se hizo click en botones o controles del carrusel
        if (event.target.closest('.consultar-btn') ||
            event.target.closest('.carousel-nav') ||
            event.target.closest('.carousel-dot')) {
            return;
        }

        const propiedadId = this.dataset.propiedadId;
        if (propiedadId) {
            event.preventDefault();
            console.log('Click en tarjeta propiedad:', propiedadId);
            window.abrirDetallePropiedad(parseInt(propiedadId));
        }
    });
});

// ============================================
// TECLADO
// ============================================
document.addEventListener('keydown', function (e) {
    const modalDetalle = document.getElementById('modalDetalle');
    const modalConsulta = document.getElementById('modalConsulta');

    if (modalDetalle.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navegarImagenDetalle(-1);
        if (e.key === 'ArrowRight') navegarImagenDetalle(1);
        if (e.key === 'Escape') window.cerrarDetallePropiedad();
    } else if (modalConsulta.classList.contains('active')) {
        if (e.key === 'Escape') window.cerrarModalConsulta();
    }
});
// ============================================
// MODAL DE CONTACTO GENERAL
// ============================================

window.abrirModalContactoGeneral = function () {
    document.getElementById('modalContactoGeneral').classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.cerrarModalContactoGeneral = function () {
    document.getElementById('modalContactoGeneral').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('formContactoGeneral').reset();
    document.getElementById('successMessageGeneral').classList.remove('show');
}

// Cerrar al hacer click fuera del modal
document.getElementById('modalContactoGeneral').addEventListener('click', function (e) {
    if (e.target === this) window.cerrarModalContactoGeneral();
});

// Enviar formulario
window.enviarContactoGeneral = async function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtnGeneral');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const formData = new FormData(e.target);
    const datos = {
        access_key: "f4521112-daef-4171-b0b7-0a994aeb27f3", // Reemplazar con tu key
        subject: "Consulta desde Servicios Inmobiliarios",
        from_name: `${formData.get('nombre')} ${formData.get('apellido')}`,
        email: formData.get('email'),
        to: "administracion@breccianegocios.com.ar",
        message: `
CONSULTA GENERAL - SERVICIOS INMOBILIARIOS
==========================================

DATOS DEL CONTACTO:
- Nombre: ${formData.get('nombre')} ${formData.get('apellido')}
- Email: ${formData.get('email')}
- Teléfono: ${formData.get('telefono')}
- Motivo: ${formData.get('motivoConsulta')}

MENSAJE:
${formData.get('mensaje')}

Fecha: ${new Date().toLocaleString('es-AR')}
            `.trim()
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('successMessageGeneral').classList.add('show');
            document.getElementById('formContactoGeneral').reset();
            setTimeout(() => window.cerrarModalContactoGeneral(), 3000);
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por email a administracion@breccianegocios.com.ar');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensaje';
    }
}

// Cerrar con tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modalGeneral = document.getElementById('modalContactoGeneral');
        if (modalGeneral && modalGeneral.classList.contains('active')) {
            window.cerrarModalContactoGeneral();
        }
    }
});
console.log('Todo inicializado correctamente');

// ============================================
// CARGA Y RENDERIZADO DE PROPIEDADES DINÁMICAS
// ============================================
async function cargarPropiedadesDinamicas() {
    if (!window.propiedadesDB) return;

    try {
        const dinamicas = await window.propiedadesDB.getAll();
        if (!dinamicas || dinamicas.length === 0) return;

        const grid = document.getElementById('propiedadesGrid');
        if (!grid) return;

        dinamicas.forEach((prop) => {
            const propId = String(prop.id);
            const carouselId = `dyn_${propId}`;

            // 1. Registrar datos en propiedadesDetalle para el modal de detalle
            propiedadesDetalle[propId] = {
                titulo: prop.titulo || 'Sin título',
                ubicacion: prop.ubicacion || 'Sin ubicación',
                precio: prop.precio || 'Consultar',
                tipo: prop.tipo || 'Venta',
                dormitorios: prop.dormitorios || '',
                banos: prop.banos || '',
                superficie: prop.superficie || '',
                esLote: !!prop.esLote,
                dimensiones: prop.dimensiones || '',
                construccion: prop.construccion || '',
                superficieTotal: prop.superficieTotal || '',
                esCochera: !!prop.esCochera,
                unidades: prop.unidades || '',
                expensas: prop.expensas || '',
                antiguedad: prop.antiguedad || '',
                descripcion: prop.descripcion || 'Sin descripción disponible.',
                caracteristicas: prop.caracteristicas || [],
                imagenes: (prop.imagenes && prop.imagenes.length > 0) ? prop.imagenes : ['favicon-V3.ico']
            };

            const imagenes = propiedadesDetalle[propId].imagenes;

            // 2. Construir HTML de items del carrusel
            const carouselItemsHTML = imagenes.map(img =>
                `<div class="propiedad-carousel-item" style="background-image: url('${img}');"></div>`
            ).join('');

            const dotsHTML = imagenes.map((_, i) =>
                `<span class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="event.stopPropagation(); goToSlide('${carouselId}', ${i})"></span>`
            ).join('');

            // Detalles mini en tarjeta
            let detallesHTML = '';
            if (prop.esLote) {
                detallesHTML = `
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L3 21"></path><path d="M15 3h6v6"></path><path d="M3 15v6h6"></path></svg></span><span>${escapeHTMLInmo(prop.dimensiones || 'Lote')}</span></div>
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg></span><span>${escapeHTMLInmo(prop.construccion || '-')}</span></div>
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h4"></path><path d="M3 15h4"></path><path d="M9 3v4"></path><path d="M15 3v4"></path></svg></span><span>${escapeHTMLInmo(prop.superficieTotal || '-')}</span></div>
                `;
            } else if (prop.esCochera) {
                detallesHTML = `
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="8" rx="2"></rect><path d="M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"></path></svg></span><span>${escapeHTMLInmo(prop.unidades || 'Cochera')}</span></div>
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span><span>${escapeHTMLInmo(prop.antiguedad || 'Seguridad')}</span></div>
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span><span>${escapeHTMLInmo(prop.expensas || '-')}</span></div>
                `;
            } else {
                detallesHTML = `
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v3"></path></svg></span><span>${escapeHTMLInmo(prop.dormitorios || '1 dorm')}</span></div>
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M12 4v4"></path><path d="M7 4h10"></path></svg></span><span>${escapeHTMLInmo(prop.banos || '1 baño')}</span></div>
                    <div class="detalle-item"><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h4"></path><path d="M3 15h4"></path><path d="M9 3v4"></path><path d="M15 3v4"></path></svg></span><span>${escapeHTMLInmo(prop.superficie || '-')}</span></div>
                `;
            }

            // Crear card element
            const card = document.createElement('div');
            card.className = 'propiedad-card';
            card.setAttribute('data-tipo', (prop.tipo || 'venta').toLowerCase());
            card.setAttribute('data-categoria', (prop.categoria || 'departamento').toLowerCase());
            card.setAttribute('data-propiedad-id', propId);

            // ── Ribbon de estado ──────────────────────────────────────────
            const estadoProp = prop.estado || 'disponible';
            const ribbonConfig = {
                reservada: { label: 'RESERVADA', cls: 'ribbon-reservada' },
                alquilada: { label: 'ALQUILADA', cls: 'ribbon-alquilada' },
                vendida:   { label: 'VENDIDA',   cls: 'ribbon-vendida'   }
            };
            const ribbonInfo = ribbonConfig[estadoProp];
            const ribbonHTML = ribbonInfo
                ? `<div class="prop-estado-ribbon ${ribbonInfo.cls}"><span>${ribbonInfo.label}</span></div>`
                : '';
            const overlayHTML = ribbonInfo
                ? `<div class="prop-estado-overlay"></div>`
                : '';

            // ── Botón de Consulta / Estado Bloqueado ────────────────────────
            const estaBloqueada = (estadoProp === 'vendida' || estadoProp === 'alquilada' || estadoProp === 'reservada');
            const textoBoton = estadoProp === 'vendida' ? 'Vendida' :
                               estadoProp === 'alquilada' ? 'Alquilada' :
                               estadoProp === 'reservada' ? 'Reservada' : 'Consultar';
            const botonConsultaHTML = estaBloqueada
                ? `<button class="consultar-btn btn-deshabilitado" disabled title="Esta propiedad ya está ${estadoProp}">${textoBoton}</button>`
                : `<button class="consultar-btn" onclick="event.stopPropagation(); abrirModalConsulta('${escapeHTMLInmo(prop.titulo).replace(/'/g, "\\'")}', '${escapeHTMLInmo(prop.ubicacion).replace(/'/g, "\\'")}', '${escapeHTMLInmo(prop.precio).replace(/'/g, "\\'")}')">Consultar</button>`;

            card.innerHTML = `
                <div class="propiedad-image-container">
                    <div class="propiedad-carousel" data-carousel="${carouselId}">
                        ${carouselItemsHTML}
                    </div>
                    ${imagenes.length > 1 ? `
                        <button class="carousel-nav prev" onclick="event.stopPropagation(); moveCarousel('${carouselId}', -1)">‹</button>
                        <button class="carousel-nav next" onclick="event.stopPropagation(); moveCarousel('${carouselId}', 1)">›</button>
                        <div class="carousel-dots">
                            ${dotsHTML}
                        </div>
                    ` : ''}
                    <button class="btn-card-share" title="Compartir en Historia de Instagram" onclick="event.stopPropagation(); window.abrirModalCompartir('${propId}', false)">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </button>
                    <div class="propiedad-badge">${escapeHTMLInmo(prop.tipo || 'Venta')}</div>
                    ${ribbonHTML}
                    ${overlayHTML}
                </div>
                <div class="propiedad-content">
                    <h3>${escapeHTMLInmo(prop.titulo)}</h3>
                    <div class="propiedad-ubicacion">
                        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span>
                        <span>${escapeHTMLInmo(prop.ubicacion)}</span>
                    </div>
                    <div class="propiedad-detalles">
                        ${detallesHTML}
                    </div>
                    <div class="propiedad-precio">${escapeHTMLInmo(prop.precio)}</div>
                    ${botonConsultaHTML}
                </div>
            `;

            // Event listener para abrir detalle
            card.addEventListener('click', function(e) {
                if (e.target.closest('.consultar-btn') ||
                    e.target.closest('.carousel-nav') ||
                    e.target.closest('.carousel-dot') ||
                    e.target.closest('.btn-card-share')) {
                    return;
                }
                e.preventDefault();
                window.abrirDetallePropiedad(propId);
            });

            // Autoplay al hover
            const imgContainer = card.querySelector('.propiedad-image-container');
            if (imgContainer && imagenes.length > 1) {
                let intervalId = null;
                imgContainer.addEventListener('mouseenter', () => {
                    intervalId = setInterval(() => window.moveCarousel(carouselId, 1), 2500);
                });
                imgContainer.addEventListener('mouseleave', () => {
                    if (intervalId) clearInterval(intervalId);
                });
            }

            grid.appendChild(card);
        });

        // Reordenar todas las tarjetas (estáticas + dinámicas) según orden y destacados
        aplicarOrdenYDestacados();

        console.log(`${dinamicas.length} propiedades dinámicas cargadas correctamente.`);
    } catch (e) {
        console.error('Error al cargar propiedades dinámicas:', e);
    }
}

function escapeHTMLInmo(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}


