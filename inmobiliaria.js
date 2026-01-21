// ============================================
// CARRUSEL DE SERVICIOS INMOBILIARIOS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
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
    
    window.moveCarousel = function(carouselId, direction) {
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
    window.moveCarousel = function(carouselId, direction) {
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

    window.goToSlide = function(carouselId, slideIndex) {
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
});

    // ============================================
    // FILTROS
    // ============================================
    document.querySelectorAll('.filter-btn-prop').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn-prop').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tipo = this.dataset.tipo;
            document.querySelectorAll('.propiedad-card').forEach(prop => {
                if (tipo === 'todas' || prop.dataset.tipo === tipo) {
                    prop.classList.remove('hidden');
                } else {
                    prop.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // MODAL CONSULTA
    // ============================================
    let propiedadActual = {};

    window.abrirModalConsulta = function(nombre, ubicacion, precio) {
        propiedadActual = { nombre, ubicacion, precio };
        document.getElementById('propiedadInfoModal').innerHTML = `
            <h4>${nombre}</h4>
            <p>📍 ${ubicacion} • 💰 ${precio}</p>
        `;
        document.getElementById('modalConsulta').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.cerrarModalConsulta = function() {
        document.getElementById('modalConsulta').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('formConsulta').reset();
        document.getElementById('successMessage').classList.remove('show');
    }

    document.getElementById('modalConsulta').addEventListener('click', function(e) {
        if (e.target === this) window.cerrarModalConsulta();
    });

    window.enviarConsulta = async function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        const formData = new FormData(e.target);
        const datos = {
            access_key: "TU_WEB3FORMS_ACCESS_KEY",
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
    1: {
        titulo: "Departamento Tipo Semipiso de Tres (3) Ambientes",
        ubicacion: "Plaza Colon, Mar del Plata",
        precio: "USD 175.000",
        tipo: "Venta",
        dormitorios: "2",
        banos: "2",
        superficie: "69 m²",
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
        imagenes: Array.from({length: 40}, (_, i) => `FotosGascon2356/g${i + 1}.jpg`)
    },
    2: {
        titulo: "Departamento Frente al Mar",
        ubicacion: "Av. Costanera, Mar del Plata",
        precio: "$450.000/mes",
        tipo: "Alquiler",
        dormitorios: "2",
        banos: "1",
        superficie: "65 m²",
        descripcion: "Hermoso departamento con vista panorámica al mar. Ubicado sobre la avenida costanera, este departamento ofrece una experiencia única con vistas directas al océano. Cuenta con amplios ventanales que permiten disfrutar del paisaje marino desde el living-comedor. La propiedad está totalmente equipada y amoblada, lista para habitar. Ideal para quienes buscan la experiencia de vivir frente al mar con todas las comodidades.",
        caracteristicas: [
            "Vista panorámica al mar",
            "Totalmente amoblado",
            "Cocina equipada",
            "Balcón con vista al océano",
            "Ubicación privilegiada",
            "Luminoso y ventilado",
            "Cerca de restaurantes y comercios",
            "Acceso a playa"
        ],
        imagenes: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
        ]
    },
    3: {
        titulo: "Oficina Centro Comercial",
        ubicacion: "Centro, Mar del Plata",
        precio: "USD 95.000",
        tipo: "Venta",
        dormitorios: "2 privados",
        banos: "1",
        superficie: "45 m²",
        descripcion: "Moderna oficina ubicada en el corazón comercial de Mar del Plata. Perfecta para profesionales o pequeñas empresas que buscan un espacio de trabajo en una zona de alto tránsito. La oficina cuenta con dos espacios privados ideales para consultorios o despachos, recepción, baño completo y kitchenette. Edificio con buena administración, seguridad y servicios completos. Excelente oportunidad de inversión.",
        caracteristicas: [
            "Dos espacios privados",
            "Recepción amplia",
            "Kitchenette equipada",
            "Baño completo",
            "Aire acondicionado",
            "Luminosa",
            "Edificio con seguridad",
            "Ubicación céntrica",
            "Cerca de transporte público",
            "Zona comercial"
        ],
        imagenes: [
            'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'
        ]
    },
    4: {
        titulo: "Casa Playa Serena",
        ubicacion: "Playa Serena, Mar del Plata",
        precio: "Consultar",
        tipo: "Alquiler Temporario",
        dormitorios: "4",
        banos: "2",
        superficie: "220 m²",
        descripcion: "Amplia casa familiar ideal para vacaciones en una de las zonas más tranquilas de Mar del Plata. La propiedad ofrece espacios generosos tanto en interiores como exteriores, perfecta para disfrutar en familia o con amigos. Cuenta con jardín con parrilla, quincho y pileta. Los dormitorios son amplios y luminosos. A pocas cuadras de la playa. Disponible para temporada de verano.",
        caracteristicas: [
            "Cuatro dormitorios amplios",
            "Dos baños completos",
            "Jardín con parrilla",
            "Quincho techado",
            "Pileta",
            "Garage para dos autos",
            "Living-comedor espacioso",
            "Cocina completa",
            "Cerca de la playa",
            "Zona tranquila y segura"
        ],
        imagenes: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80'
        ]
    }
};

    let propiedadActualDetalle = {};
    let imagenActualDetalle = 0;
    let imagenesDetalle = [];

    window.abrirDetallePropiedad = function(idPropiedad) {
        console.log('Abriendo detalle propiedad:', idPropiedad);
        
        const propiedad = propiedadesDetalle[idPropiedad];
        if (!propiedad) {
            console.error('Propiedad no encontrada:', idPropiedad);
            return;
        }
        
        propiedadActualDetalle = propiedad;
        imagenesDetalle = propiedad.imagenes;
        imagenActualDetalle = 0;
        
        // Llenar info
        document.getElementById('detalleBadge').textContent = propiedad.tipo;
        document.getElementById('detalleTitulo').textContent = propiedad.titulo;
        document.getElementById('detalleUbicacion').textContent = propiedad.ubicacion;
        document.getElementById('detallePrecio').textContent = propiedad.precio;
        document.getElementById('detalleDormitorios').textContent = propiedad.dormitorios;
        document.getElementById('detalleBanos').textContent = propiedad.banos;
        document.getElementById('detalleSuperficie').textContent = propiedad.superficie;
        document.getElementById('detalleDescripcion').textContent = propiedad.descripcion;
        
        // Características
        const caracEl = document.getElementById('detalleCaracteristicas');
        caracEl.innerHTML = propiedad.caracteristicas.map(c => `<li>${c}</li>`).join('');
        
        // Cargar miniaturas PRIMERO
        cargarMiniaturas();
        
        // Luego actualizar la imagen principal
        actualizarImagenDetalle();
        
        // Mostrar modal
        document.getElementById('modalDetalle').classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Modal detalle abierto correctamente');
    }

    window.cerrarDetallePropiedad = function() {
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

    window.irAImagenDetalle = function(index) {
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
    document.getElementById('modalDetalle').addEventListener('click', function(e) {
        if (e.target === this) window.cerrarDetallePropiedad();
    });

    // ============================================
    // CLICKS EN TARJETAS
    // ============================================
    document.querySelectorAll('.propiedad-card').forEach(card => {
        card.addEventListener('click', function(event) {
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
    document.addEventListener('keydown', function(e) {
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

    console.log('Todo inicializado correctamente');