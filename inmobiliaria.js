// ============================================
// INMOBILIARIA — propiedades, ficha y consultas
// ============================================
(function () {
    'use strict';

    const { icon, openModal, closeModal, toast, sendForm, setStatus, clearStatus } = window.Breccia;
    const WHATSAPP = '5492235771240';

    const range = (from, to, path, skip = []) =>
        Array.from({ length: to - from + 1 }, (_, i) => from + i).filter(n => !skip.includes(n)).map(path);

    // ============================================
    // DATOS DE PROPIEDADES (fuente única: tarjetas, filtros y ficha salen de acá)
    // Para sumar una propiedad, agregá un objeto a esta lista.
    // ============================================
    const propiedades = [
        {
            id: 1,
            categoria: 'departamento',
            operacion: 'Venta',
            titulo: 'Departamento tipo semipiso de tres (3) ambientes',
            ubicacion: 'Gascón 2356, Plaza Colón',
            precio: 'USD 169.000',
            cardSpecs: [['bed', '2 dorm.'], ['bath', '2 baños'], ['area', '69 m²'], ['car', 'Cochera doble']],
            specs: [['bed', 'Dormitorios', '2'], ['bath', 'Baños', '2'], ['area', 'Superficie', '69 m²']],
            portada: ['G35', 'G15', 'G18', 'G3', 'G13'].map(n => `FotosGascon2356/${n}.jpg`),
            imagenes: range(1, 40, n => `FotosGascon2356/G${n}.jpg`),
            descripcion: "Impecable departamento tipo semipiso de tres (3) ambientes con cochera doble. Ubicado en una excelente zona como lo es próximo a la Plaza Colón, al entorno al Shopping Paseo Aldrey y a la comercial calle Alberti. Consta de un amplio living-comedor con pisos cerámicos con salida al balcón sobre la calle Gascón, cómoda cocina semi-integrada muy bien equipada con espacio para conexión lavarropas y práctica barra que separa visualmente ambos espacios, dormitorio principal en suite con gran vestidor y funcional espacio de escritorio cerrado muy luminoso, segundo dormitorio con placard, toilette de recepción con ducha y cochera doble cubierta con acceso con control remoto. Su superficie total es de 69 m² y su calefacción es por radiadores. Es una propiedad muy luminosa porque tanto el living como los 2 dormitorios cuentan con vistas abiertas. El consorcio posee una antigüedad de 10 años y está muy bien administrado. Sus expensas son bajas (a enero 2026 $ 130.000.-) La propiedad cuenta con un diseño muy moderno y funcional. Ideal para un matrimonio solo y/o pareja joven con un hijo/a. El barrio por su cercanía a la calle Alberti cuenta con numerosos negocios de cercanías como farmacias, polirrubros, panaderías, café, despensas, verdulerías y transporte público de pasajeros (taxis y colectivos).",
            caracteristicas: [
                "Cocina equipada con mobiliario moderno", "Living comedor amplio con salida a balcón",
                "Dormitorio principal en suite con vestidor", "Segundo dormitorio con placard",
                "Toilette de recepción con ducha", "Cochera doble cubierta con control remoto",
                "Calefacción por radiadores", "Pisos cerámicos", "Vistas abiertas en living y dormitorios",
                "Consorcio bien administrado", "Expensas bajas", "Diseño moderno y funcional"
            ]
        },
        {
            id: 2,
            categoria: 'departamento',
            operacion: 'Venta',
            titulo: 'Departamento de dos ambientes',
            ubicacion: 'Arenales 2445, Mar del Plata',
            precio: 'USD 55.000',
            cardSpecs: [['bed', '1 dorm.'], ['bath', '1 baño'], ['area', '40 m²']],
            specs: [['bed', 'Dormitorios', '1'], ['bath', 'Baños', '1'], ['area', 'Superficie', '40 m²']],
            portada: ['PA3', 'PA5', 'PA8', 'PA9'].map(n => `Arenales2445/${n}.jpg`),
            imagenes: range(1, 11, n => `Arenales2445/PA${n}.jpg`),
            descripcion: "Ubicado en una zona privilegiada de Mar del Plata a 200 metros de la Plaza Colón, de la Av. Colón y de la comercial calle Alberti. Se trata de un departamento de 2 ambientes al lateral y al contrafrente, luminoso y muy cómodo. Consta de amplio living-comedor con pisos cerámicos, dormitorio con placard, cómoda cocina y baño completo. Superficie cubierta de 40 m² y sus expensas son bajas. Muy buen estado de conservación y mantenimiento. ¡Oportunidad de inversión para futura renta! Ideal para alquilarlo por temporada de verano y luego a estudiantes. El barrio cuenta con una gran variedad de negocios tales como farmacias, café, almacenes, panaderías, peluquerías, Rapipagos, rotiserías y transporte público de pasajeros (taxis, colectivos). Caminando 15 minutos se llega a la gastronómica calle Olavarría y la comercial calle Güemes.",
            caracteristicas: [
                "Amplio living-comedor con pisos cerámicos", "Dormitorio con placard", "Cocina cómoda y funcional",
                "Baño completo", "A 200 metros de Plaza Colón", "Cerca de Av. Colón y calle Alberti",
                "Departamento lateral y al contrafrente", "Muy luminoso", "Expensas bajas",
                "Excelente estado de conservación", "Ideal para inversión y renta", "Perfecto para alquiler temporario",
                "Apto para estudiantes", "Zona con todos los servicios", "Farmacias, cafés y comercios cercanos",
                "Transporte público accesible", "A 15 min. caminando de calle Olavarría", "Cerca de la comercial calle Güemes"
            ]
        },
        {
            id: 3,
            categoria: 'lote',
            operacion: 'Venta',
            titulo: 'Lote con construcción en Parque Luro',
            ubicacion: 'Francia 371, Parque Luro',
            precio: 'USD 120.000',
            cardSpecs: [['area', '10 × 33 m'], ['hammer', '70 m² const.'], ['layers', '330 m² lote']],
            specs: [['area', 'Dimensiones', '10 × 33 m'], ['hammer', 'Construcción', '70 m²'], ['layers', 'Superficie', '330 m²']],
            portada: ['Francia371/F3.jpg', 'Francia371/F4.jpg'],
            imagenes: ['Francia371/F3.jpg', 'Francia371/F4.jpg'],
            descripcion: "¡Excelente oportunidad de inversión en la zona del residencial barrio de Parque Luro! Ubicado a 100 metros de la comercial Av. Jara. Se trata de una construcción al fondo de 70 m² a reciclar sobre un lote de 10 metros de frente por 33 metros de profundidad. IDEAL para desarrollo de dúplex, complejo de unidades tipo P.H. o para vivienda familiar. Es una zona residencial con mucha población estable y el barrio cuenta con muchos comercios de cercanías como mercados, panaderías, centros de pago, negocios de ropa, farmacias, etc. La zona norte de la ciudad de Mar del Plata está tomando mucho impulso como un lugar muy buscado por los marplatenses para vivir todo el año. ¡No deje de consultar por esta oportunidad!",
            caracteristicas: [
                "Lote de 10m x 33m (330 m²)", "Construcción existente de 70 m²", "A 100 metros de Av. Jara",
                "Zona residencial Parque Luro", "Ideal para desarrollo inmobiliario", "Perfecto para dúplex",
                "Apto para complejo de P.H.", "Opción para vivienda familiar", "A reciclar completamente",
                "Barrio con población estable", "Comercios de cercanía", "Mercados y panaderías cercanas",
                "Centros de pago accesibles", "Farmacias y negocios de ropa", "Zona norte en desarrollo",
                "Muy buscado para vivir todo el año", "Excelente oportunidad de inversión", "Alto potencial de revalorización"
            ]
        },
        {
            id: 4,
            categoria: 'departamento',
            operacion: 'Venta',
            titulo: 'Departamento de 4 ambientes con gran patio',
            ubicacion: 'San Juan y Avellaneda, Mar del Plata',
            precio: 'USD 85.000',
            cardSpecs: [['bed', '3 dorm.'], ['bath', '1 baño'], ['tree', 'Patio propio']],
            specs: [['bed', 'Dormitorios', '3'], ['bath', 'Baños', '1'], ['area', 'Superficie', '129,71 m²']],
            portada: ['SJ8', 'SJ28', 'SJ21', 'SJ24', 'SJ19'].map(n => `SanJuan3052/${n}.jpg`),
            imagenes: range(2, 28, n => `SanJuan3052/SJ${n}.jpg`, [17]),
            descripcion: "Ubicado en la zona de San Juan y Avellaneda, esta unidad se caracteriza por ser muy cómoda para una familia numerosa y por contar con un amplio patio propio con plantas. La propiedad cuenta con una superficie total de 129,71 m², de los cuales 68,56 m² son cubiertos, lo que brinda un excelente equilibrio entre espacios interiores y exteriores. Al ingresar nos encontramos con un living-comedor con salida directa al patio, cómoda cocina con espacio de lavadero para lavarropas, baño completo y tres (3) dormitorios con pisos de parquet y placard. El patio es de uso exclusivo, ideal para colocar mesa, sombrilla y sillas, y disfrutar de un agradable espacio verde al aire libre. La unidad se ubica al frente y lateral del edificio, lo que permite una excelente luminosidad natural durante todo el día.",
            caracteristicas: [
                "Living-comedor con salida al patio", "Tres dormitorios con pisos de parquet", "Todos los dormitorios con placard",
                "Baño completo", "Cocina con espacio para lavadero", "Patio propio amplio con plantas",
                "Ideal para familia numerosa", "Perfecto para colocar mesa y sombrillas", "Espacio verde propio",
                "Unidad al frente y lateral", "Muy luminoso todo el día", "Zona de San Juan y Avellaneda",
                "Excelente ubicación", "Pisos de parquet en dormitorios", "Espacio de lavadero integrado"
            ]
        },
        {
            id: 5,
            categoria: 'cochera',
            operacion: 'Venta',
            titulo: 'Cocheras en edificio céntrico — 2 unidades disponibles',
            ubicacion: 'Corrientes entre Rivadavia y Belgrano, Centro',
            precio: 'USD 13.000 c/u',
            cardSpecs: [['car', '2 cocheras'], ['shield', 'Seguridad 24 hs'], ['building', 'UF 702 / 703']],
            specs: [['building', 'Unidades', '702 y 703'], ['coins', 'Expensas', '$70.000'], ['calendar', 'Antigüedad', '45 años']],
            portada: ['L1', 'L3', 'L2', 'L5', 'L9'].map(n => `LeblonCochera/${n}.jpeg`),
            imagenes: range(1, 9, n => `LeblonCochera/L${n}.jpeg`),
            descripcion: "Cochera para un (1) vehículo en edificio de cocheras en el centro de Mar del Plata, en la calle Corrientes entre Rivadavia y Belgrano. Se puede acceder tanto por rampa como por ascensor (montacarga). El edificio cuenta con seguridad las 24 horas. Unidades Nº 702 y 703. Valor U$S 13.000.- CADA UNA. Se escuchan ofertas por una unidad o por las 2 cocheras. Escribanía designada. Ideal para profesionales y/o comerciantes con actividades en ese radio de ubicación. Tranquilidad por seguridad y que siempre tendrá su propio lugar para estacionar sin dar tantas vueltas para encontrar espacio. Expensas: $70.000",
            caracteristicas: [
                "2 cocheras disponibles (Unidades 702 y 703)", "USD 13.000 cada una", "Se escuchan ofertas por ambas",
                "Acceso por rampa o ascensor montacarga", "Seguridad 24 horas", "Ubicación céntrica privilegiada",
                "Calle Corrientes entre Rivadavia y Belgrano", "Ideal para profesionales", "Perfecto para comerciantes de la zona",
                "Lugar propio garantizado", "Sin vueltas para estacionar", "Edificio exclusivo de cocheras",
                "Expensas: $70.000", "Antigüedad: 45 años", "Escribanía designada", "Agua corriente", "Cloacas",
                "Electricidad", "Edificio bien mantenido"
            ]
        }
    ];

    const CATEGORIAS = {
        todas: 'Todas', departamento: 'Departamentos', casa: 'Casas', lote: 'Lotes', cochera: 'Cocheras', local: 'Locales'
    };
    const SINGULAR = { departamento: 'Departamento', casa: 'Casa', lote: 'Lote', cochera: 'Cochera', local: 'Local' };

    const precioNumero = p => {
        const digits = p.precio.replace(/[^\d]/g, '');
        return digits ? parseInt(digits, 10) : Infinity;
    };
    const byId = id => propiedades.find(p => p.id === id);
    const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const linkTo = p => `${location.origin}${location.pathname}#propiedad-${p.id}`;
    const waLink = p => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero consultar por: ${p.titulo} (${p.ubicacion}) — ${p.precio}. ${linkTo(p)}`)}`;

    // ============================================
    // LISTADO
    // ============================================
    const state = { categoria: 'todas', sort: 'default' };
    const grid = document.getElementById('propiedadesGrid');
    const chips = document.getElementById('propChips');
    const summary = document.getElementById('propSummary');
    const sortSelect = document.getElementById('propSort');
    const slideIndex = {};
    const autoplay = {};

    function renderChips() {
        chips.innerHTML = Object.entries(CATEGORIAS).map(([key, label]) => {
            const count = key === 'todas' ? propiedades.length : propiedades.filter(p => p.categoria === key).length;
            return `<button type="button" class="chip" data-cat="${key}" aria-pressed="${state.categoria === key}" ${count ? '' : 'disabled'}>${label}<span class="chip-count">${count}</span></button>`;
        }).join('');
    }

    function cardHTML(p, i) {
        const slides = p.portada.map((src, n) =>
            `<div class="prop-slide" ${n === 0 ? `style="background-image:url('${src}')"` : `data-bg="${src}"`}></div>`).join('');
        const dots = p.portada.length > 1 ? p.portada.map((_, n) => `<span class="${n === 0 ? 'is-active' : ''}"></span>`).join('') : '';
        const nav = p.portada.length > 1 ? `
            <button type="button" class="prop-nav prop-nav--prev" data-dir="-1" aria-label="Foto anterior">${icon('chev-l', 'icon--sm')}</button>
            <button type="button" class="prop-nav prop-nav--next" data-dir="1" aria-label="Foto siguiente">${icon('chev-r', 'icon--sm')}</button>` : '';
        return `
        <article class="prop" data-id="${p.id}" style="animation-delay:${i * 60}ms">
            <div class="prop-media">
                <div class="prop-track">${slides}</div>
                <div class="prop-badges"><span class="badge badge--signal">${p.operacion}</span><span class="badge">${SINGULAR[p.categoria]}</span></div>
                <span class="badge prop-count">${p.imagenes.length} fotos</span>
                ${nav}
                <div class="prop-dots" aria-hidden="true">${dots}</div>
            </div>
            <div class="prop-body">
                <h3><a href="#propiedad-${p.id}" data-open-sheet="${p.id}">${escape(p.titulo)}</a></h3>
                <span class="prop-loc">${icon('pin')}${escape(p.ubicacion)}</span>
                <ul class="prop-specs">${p.cardSpecs.map(([ic, txt]) => `<li>${icon(ic)}${escape(txt)}</li>`).join('')}</ul>
                <div class="prop-foot">
                    <div class="prop-price"><small>Precio</small>${escape(p.precio)}</div>
                    <div class="prop-actions">
                        <a class="icon-btn" href="${waLink(p)}" target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp" data-stop>${icon('whatsapp')}</a>
                        <button type="button" class="icon-btn icon-btn--signal" data-consultar="${p.id}" aria-label="Consultar por esta propiedad">${icon('mail')}</button>
                    </div>
                </div>
            </div>
        </article>`;
    }

    function renderGrid() {
        let list = propiedades.filter(p => state.categoria === 'todas' || p.categoria === state.categoria);
        if (state.sort === 'asc') list = [...list].sort((a, b) => precioNumero(a) - precioNumero(b));
        if (state.sort === 'desc') list = [...list].sort((a, b) => (precioNumero(b) === Infinity ? -1 : precioNumero(b)) - (precioNumero(a) === Infinity ? -1 : precioNumero(a)));

        grid.innerHTML = list.length
            ? list.map(cardHTML).join('')
            : `<div class="empty" style="grid-column:1/-1"><strong>No hay propiedades en esta categoría por ahora</strong>Dejanos tu búsqueda y te avisamos cuando ingrese algo.</div>`;
        list.forEach(p => { slideIndex[p.id] = 0; });
        summary.textContent = `${list.length} ${list.length === 1 ? 'propiedad' : 'propiedades'}`;
    }

    // Carrusel de cada tarjeta
    function loadSlides(card) {
        card.querySelectorAll('.prop-slide[data-bg]').forEach(s => {
            s.style.backgroundImage = `url('${s.dataset.bg}')`;
            s.removeAttribute('data-bg');
        });
    }

    function moveCard(card, dir) {
        const id = +card.dataset.id;
        const total = card.querySelectorAll('.prop-slide').length;
        if (total < 2) return;
        loadSlides(card);
        slideIndex[id] = (slideIndex[id] + dir + total) % total;
        card.querySelector('.prop-track').style.transform = `translateX(-${slideIndex[id] * 100}%)`;
        card.querySelectorAll('.prop-dots span').forEach((d, n) => d.classList.toggle('is-active', n === slideIndex[id]));
    }

    grid.addEventListener('click', e => {
        const card = e.target.closest('.prop');
        if (!card) return;
        const nav = e.target.closest('.prop-nav');
        if (nav) { e.preventDefault(); moveCard(card, +nav.dataset.dir); return; }
        const consult = e.target.closest('[data-consultar]');
        if (consult) { e.preventDefault(); abrirConsulta(+consult.dataset.consultar); return; }
        if (e.target.closest('[data-stop]')) return;
        e.preventDefault();
        abrirFicha(+card.dataset.id);
    });

    // Autoplay al pasar el mouse (solo dispositivos con hover)
    if (window.matchMedia('(hover: hover)').matches) {
        grid.addEventListener('mouseover', e => {
            const card = e.target.closest('.prop');
            if (!card || autoplay[card.dataset.id]) return;
            loadSlides(card);
            autoplay[card.dataset.id] = setInterval(() => moveCard(card, 1), 2200);
        });
        grid.addEventListener('mouseout', e => {
            const card = e.target.closest('.prop');
            if (!card || card.contains(e.relatedTarget)) return;
            clearInterval(autoplay[card.dataset.id]);
            delete autoplay[card.dataset.id];
        });
    }

    // Swipe en tarjetas
    let touchX = null, touchCard = null;
    grid.addEventListener('touchstart', e => {
        touchCard = e.target.closest('.prop-media')?.closest('.prop') || null;
        touchX = e.touches[0].clientX;
    }, { passive: true });
    grid.addEventListener('touchend', e => {
        if (!touchCard || touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) {
            moveCard(touchCard, dx < 0 ? 1 : -1);
            touchCard.dataset.swiped = '1';
            setTimeout(() => delete touchCard?.dataset.swiped, 50);
        }
        touchX = null;
    });
    grid.addEventListener('click', e => {
        if (e.target.closest('.prop')?.dataset.swiped) { e.stopImmediatePropagation(); e.preventDefault(); }
    }, true);

    chips.addEventListener('click', e => {
        const btn = e.target.closest('[data-cat]');
        if (!btn || btn.disabled) return;
        state.categoria = btn.dataset.cat;
        renderChips();
        renderGrid();
    });

    sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        renderGrid();
    });

    // ============================================
    // FICHA DE PROPIEDAD
    // ============================================
    const sheet = {
        modal: document.getElementById('modalDetalle'),
        img: document.getElementById('imagenPrincipal'),
        main: document.getElementById('sheetMain'),
        counter: document.getElementById('contadorImagenes'),
        thumbs: document.getElementById('miniaturas'),
        desc: document.getElementById('detalleDescripcion'),
        more: document.getElementById('detalleMas'),
        current: null,
        index: 0
    };

    function abrirFicha(id, { updateHash = true } = {}) {
        const p = byId(id);
        if (!p) return;
        sheet.current = p;
        sheet.index = 0;

        document.getElementById('detalleBadge').textContent = p.operacion;
        document.getElementById('detalleCategoria').textContent = SINGULAR[p.categoria];
        document.getElementById('detalleTitulo').textContent = p.titulo;
        document.getElementById('detalleUbicacion').textContent = p.ubicacion;
        document.getElementById('detallePrecio').textContent = p.precio;
        document.getElementById('detalleSpecs').innerHTML = p.specs.map(([ic, label, value]) =>
            `<div class="sheet-spec">${icon(ic)}<small>${label}</small><strong>${escape(value)}</strong></div>`).join('');
        document.getElementById('detalleCaracteristicas').innerHTML = p.caracteristicas.map(c => `<li>${escape(c)}</li>`).join('');
        document.getElementById('detalleWhatsapp').href = waLink(p);

        sheet.desc.textContent = p.descripcion;
        sheet.desc.classList.add('is-clamped');
        sheet.more.hidden = false;
        sheet.more.textContent = 'Leer descripción completa';

        sheet.thumbs.innerHTML = p.imagenes.map((src, n) =>
            `<button type="button" class="sheet-thumb" data-index="${n}" aria-label="Foto ${n + 1}"><img src="${src}" alt="" loading="lazy" decoding="async"></button>`).join('');
        mostrarImagen(0, true);

        openModal('modalDetalle');
        sheet.modal.querySelector('.sheet-info').scrollTop = 0;
        if (updateHash) history.replaceState(null, '', `#propiedad-${p.id}`);
        requestAnimationFrame(() => {
            // Ocultar "leer más" si el texto ya entra completo
            if (sheet.desc.scrollHeight <= sheet.desc.clientHeight + 2) sheet.more.hidden = true;
        });
    }

    function mostrarImagen(n, instant = false) {
        const imgs = sheet.current.imagenes;
        sheet.index = (n + imgs.length) % imgs.length;
        const src = imgs[sheet.index];
        const apply = () => {
            sheet.img.style.backgroundImage = `url('${src}')`;
            sheet.img.classList.remove('is-fading');
        };
        if (instant) apply();
        else {
            sheet.img.classList.add('is-fading');
            const pre = new Image();
            pre.onload = pre.onerror = () => setTimeout(apply, 120);
            pre.src = src;
        }
        // precargar la siguiente
        new Image().src = imgs[(sheet.index + 1) % imgs.length];

        sheet.counter.textContent = `${sheet.index + 1} / ${imgs.length}`;
        const navs = sheet.modal.querySelectorAll('.sheet-nav');
        navs.forEach(b => { b.hidden = imgs.length < 2; });
        sheet.thumbs.querySelectorAll('.sheet-thumb').forEach((t, i) => {
            const active = i === sheet.index;
            t.classList.toggle('is-active', active);
            if (active) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: instant ? 'auto' : 'smooth' });
        });
    }

    document.getElementById('detallePrevBtn').addEventListener('click', () => mostrarImagen(sheet.index - 1));
    document.getElementById('detalleNextBtn').addEventListener('click', () => mostrarImagen(sheet.index + 1));
    sheet.thumbs.addEventListener('click', e => {
        const t = e.target.closest('.sheet-thumb');
        if (t) mostrarImagen(+t.dataset.index);
    });

    sheet.more.addEventListener('click', () => {
        const clamped = sheet.desc.classList.toggle('is-clamped');
        sheet.more.textContent = clamped ? 'Leer descripción completa' : 'Mostrar menos';
    });

    // Swipe en la galería
    let galleryX = null;
    sheet.main.addEventListener('touchstart', e => { galleryX = e.touches[0].clientX; }, { passive: true });
    sheet.main.addEventListener('touchend', e => {
        if (galleryX === null) return;
        const dx = e.changedTouches[0].clientX - galleryX;
        if (Math.abs(dx) > 40) mostrarImagen(sheet.index + (dx < 0 ? 1 : -1));
        galleryX = null;
    });

    document.addEventListener('keydown', e => {
        if (!sheet.modal.classList.contains('is-open') || document.getElementById('modalConsulta').classList.contains('is-open')) return;
        if (e.key === 'ArrowLeft') mostrarImagen(sheet.index - 1);
        if (e.key === 'ArrowRight') mostrarImagen(sheet.index + 1);
    });

    sheet.modal.addEventListener('modal:close', () => {
        if (location.hash.startsWith('#propiedad-')) history.replaceState(null, '', location.pathname + location.search);
    });

    document.getElementById('detalleConsultar').addEventListener('click', () => {
        const id = sheet.current.id;
        closeModal('modalDetalle');
        setTimeout(() => abrirConsulta(id), 250);
    });

    document.getElementById('detalleCompartir').addEventListener('click', async () => {
        const p = sheet.current;
        const data = { title: p.titulo, text: `${p.titulo} — ${p.precio} · Breccia Inmuebles`, url: linkTo(p) };
        try {
            if (navigator.share) await navigator.share(data);
            else { await navigator.clipboard.writeText(data.url); toast('Link copiado al portapapeles'); }
        } catch (err) {
            if (err.name !== 'AbortError') toast('No se pudo compartir');
        }
    });

    // Deep link: inmobiliaria.html#propiedad-3 abre la ficha directamente
    function abrirDesdeHash() {
        const match = location.hash.match(/^#propiedad-(\d+)$/);
        if (match && byId(+match[1])) abrirFicha(+match[1], { updateHash: false });
    }
    window.addEventListener('hashchange', abrirDesdeHash);

    // ============================================
    // CONSULTA DE PROPIEDAD
    // ============================================
    let propiedadActual = null;
    const formConsulta = document.getElementById('formConsulta');

    function abrirConsulta(id) {
        const p = byId(id);
        if (!p) return;
        propiedadActual = p;
        document.getElementById('propiedadInfoModal').innerHTML = `
            <span class="modal-ref-thumb" style="background-image:url('${p.portada[0]}')"></span>
            <div><strong>${escape(p.titulo)}</strong><span>${escape(p.ubicacion)} · ${escape(p.precio)}</span></div>`;
        clearStatus(formConsulta);
        openModal('modalConsulta');
    }

    formConsulta.addEventListener('submit', async e => {
        e.preventDefault();
        if (formConsulta.botcheck.checked || !propiedadActual) return;
        const btn = document.getElementById('submitBtn');
        const label = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = 'Enviando…';

        const f = new FormData(formConsulta);
        const p = propiedadActual;
        try {
            await sendForm({
                subject: `Consulta de Propiedad: ${p.titulo}`,
                fromName: `${f.get('nombre')} ${f.get('apellido')}`,
                email: f.get('email'),
                message: `
CONSULTA DE PROPIEDAD
====================
PROPIEDAD:
- Nombre: ${p.titulo}
- Ubicación: ${p.ubicacion}
- Precio: ${p.precio}
- Link: ${linkTo(p)}

DATOS DEL INTERESADO:
- Nombre: ${f.get('nombre')} ${f.get('apellido')}
- Email: ${f.get('email')}
- Teléfono: ${f.get('telefono')}
- Tipo de Consulta: ${f.get('tipoConsulta')}

MENSAJE:
${f.get('mensaje') || 'Sin mensaje adicional'}

Fecha: ${new Date().toLocaleString('es-AR')}`.trim()
            });
            formConsulta.reset();
            setStatus(formConsulta, 'success', 'Tu consulta fue enviada correctamente. Te contactaremos a la brevedad.');
            setTimeout(() => closeModal('modalConsulta'), 3200);
        } catch (err) {
            console.error(err);
            setStatus(formConsulta, 'error', 'Hubo un error al enviar la consulta. Intentá nuevamente o llamanos al 495-7908.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = label;
        }
    });

    // ============================================
    // CONTACTO GENERAL
    // ============================================
    const formGeneral = document.getElementById('formContactoGeneral');
    document.getElementById('modalContactoGeneral').addEventListener('modal:close', () => clearStatus(formGeneral));
    document.getElementById('modalConsulta').addEventListener('modal:close', () => clearStatus(formConsulta));

    formGeneral.addEventListener('submit', async e => {
        e.preventDefault();
        if (formGeneral.botcheck.checked) return;
        const btn = document.getElementById('submitBtnGeneral');
        const label = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = 'Enviando…';

        const f = new FormData(formGeneral);
        try {
            await sendForm({
                subject: 'Consulta desde Servicios Inmobiliarios',
                fromName: `${f.get('nombre')} ${f.get('apellido')}`,
                email: f.get('email'),
                message: `
CONSULTA GENERAL - SERVICIOS INMOBILIARIOS
==========================================

DATOS DEL CONTACTO:
- Nombre: ${f.get('nombre')} ${f.get('apellido')}
- Email: ${f.get('email')}
- Teléfono: ${f.get('telefono')}
- Motivo: ${f.get('motivoConsulta')}

MENSAJE:
${f.get('mensaje')}

Fecha: ${new Date().toLocaleString('es-AR')}`.trim()
            });
            formGeneral.reset();
            setStatus(formGeneral, 'success', 'Tu mensaje fue enviado correctamente. Te contactaremos a la brevedad.');
            setTimeout(() => closeModal('modalContactoGeneral'), 3200);
        } catch (err) {
            console.error(err);
            setStatus(formGeneral, 'error', 'Hubo un error al enviar el mensaje. Intentá nuevamente o escribinos a administracion@breccianegocios.com.ar');
        } finally {
            btn.disabled = false;
            btn.innerHTML = label;
        }
    });

    // ============================================
    // INIT
    // ============================================
    renderChips();
    renderGrid();
    document.addEventListener('DOMContentLoaded', abrirDesdeHash);
})();
