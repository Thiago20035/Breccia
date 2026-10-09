/**
 * Lógica del Panel de Administración - Breccia Inmuebles
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Estado del Formulario
    let editandoId = null;
    let editandoEsEstatica = false;
    let fotosCargadas = []; // Array de DataURLs de imágenes
    let caracteristicasLista = []; // Array de strings de características

    // Mapa base de las 5 propiedades estáticas del sitio
    const STATIC_PROPERTIES_MAP = {
        '1': {
            id: '1',
            titulo: 'Departamento Tipo Semipiso de Tres (3) Ambientes',
            ubicacion: 'Gascón 2356, Plaza Colón',
            precio: 'USD 169.000',
            tipo: 'Venta',
            categoria: 'departamento',
            dormitorios: '2',
            banos: '2',
            superficie: '69 m²',
            descripcion: 'Impecable departamento tipo semipiso de tres (3) ambientes con cochera doble. Ubicado en una excelente zona como lo es próximo a la Plaza Colón, al entorno al Shopping Paseo Aldrey y a la comercial calle Alberti.',
            caracteristicas: [
                'Cocina equipada con mobiliario moderno',
                'Living comedor amplio con salida a balcón',
                'Dormitorio principal en suite con vestidor',
                'Segundo dormitorio con placard',
                'Toilette de recepción con ducha',
                'Cochera doble cubierta con control remoto',
                'Calefacción por radiadores'
            ],
            thumb: 'FotosGascon2356/G35.jpg',
            imagenes: ['FotosGascon2356/G35.jpg'],
            estado: 'vendida',
            esEstatica: true
        },
        '2': {
            id: '2',
            titulo: 'Departamento en Arenales',
            ubicacion: 'Arenales 2445, Mar del Plata',
            precio: 'USD 55.000',
            tipo: 'Venta',
            categoria: 'departamento',
            dormitorios: '1',
            banos: '1',
            superficie: '40 m²',
            descripcion: 'Ubicado en una zona privilegiada de Mar del Plata a 200 metros de la Plaza Colón, de la Av. Colón y de la comercial calle Alberti. Se trata de un departamento de 2 ambientes al lateral y al contrafrente, luminoso y muy cómodo.',
            caracteristicas: [
                'Amplio living-comedor con pisos cerámicos',
                'Dormitorio con placard',
                'Cocina cómoda y funcional',
                'Baño completo',
                'A 200 metros de Plaza Colón'
            ],
            thumb: 'Arenales2445/PA3.jpg',
            imagenes: ['Arenales2445/PA3.jpg'],
            esEstatica: true
        },
        '3': {
            id: '3',
            titulo: 'Lote con Construcción en Parque Luro',
            ubicacion: 'Francia 371, Parque Luro',
            precio: 'USD 120.000',
            tipo: 'Venta',
            categoria: 'lote',
            esLote: true,
            dimensiones: '10x33m',
            construccion: '70 m²',
            superficieTotal: '330 m²',
            descripcion: '¡Excelente oportunidad de inversión en la zona del residencial barrio de Parque Luro! Ubicado a 100 metros de la comercial Av. Jara. Se trata de una construcción al fondo de 70 m² a reciclar sobre un lote de 10 metros de frente por 33 metros de profundidad.',
            caracteristicas: [
                'Lote de 10m x 33m (330 m²)',
                'Construcción existente de 70 m²',
                'A 100 metros de Av. Jara',
                'Zona residencial Parque Luro',
                'Ideal para desarrollo inmobiliario'
            ],
            thumb: 'Francia371/F3.jpg',
            imagenes: ['Francia371/F3.jpg', 'Francia371/F4.jpg'],
            esEstatica: true
        },
        '4': {
            id: '4',
            titulo: 'Departamento de 4 Ambientes con Gran Patio',
            ubicacion: 'San Juan y Avellaneda, Mar del Plata',
            precio: 'USD 85.000',
            tipo: 'Venta',
            categoria: 'departamento',
            dormitorios: '3',
            banos: '1',
            superficie: '129 m²',
            descripcion: 'Ubicado en la zona de San Juan y Avellaneda, esta unidad se caracteriza por ser muy cómoda para una familia numerosa y por contar con un amplio patio propio con plantas.',
            caracteristicas: [
                'Living-comedor con salida al patio',
                'Tres dormitorios con pisos de parquet',
                'Todos los dormitorios con placard',
                'Baño completo',
                'Patio propio amplio con plantas'
            ],
            thumb: 'SanJuan3052/SJ8.jpg',
            imagenes: ['SanJuan3052/SJ8.jpg'],
            estado: 'vendida',
            esEstatica: true
        },
        '5': {
            id: '5',
            titulo: 'Cocheras en Edificio Céntrico',
            ubicacion: 'Corrientes entre Rivadavia',
            precio: 'USD 13.000 c/u',
            tipo: 'Venta',
            categoria: 'cochera',
            esCochera: true,
            unidades: 'Cocheras fijas',
            expensas: 'Bajas',
            antiguedad: 'Seguridad 24hs',
            descripcion: 'Cocheras en edificio céntrico con excelente acceso y seguridad.',
            caracteristicas: [
                'Portón automático',
                'Seguridad 24hs',
                'Excelente ubicación céntrica'
            ],
            thumb: 'LeblonCochera/L1.jpeg',
            imagenes: ['LeblonCochera/L1.jpeg'],
            esEstatica: true
        }
    };
    window.STATIC_PROPERTIES_MAP = STATIC_PROPERTIES_MAP;

    // ─────────────────────────────────────────────────────────────────
    // 1. ACCESO — protegido por Cloudflare Access (Zero Trust)
    //    No hay credenciales en este archivo. La autenticación
    //    ocurre a nivel de red antes de que esta página cargue.
    // ─────────────────────────────────────────────────────────────────

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // Cierra la sesión de Cloudflare Access y redirige al inicio
            window.location.href = 'https://breccianegocios.com.ar/cdn-cgi/access/logout';
        });
    }

    cargarPanel();


    // 2. NAVEGACIÓN POR PESTAÑAS
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetEl = document.getElementById(targetTab);
            if (targetEl) targetEl.classList.add('active');

            if (targetTab === 'tabListado') {
                renderPropiedadesTabla();
            }
        });
    });

    window.cambiarTab = function (tabId) {
        const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (btn) btn.click();
    };

    // 3. CARGAR DATOS Y DASHBOARD
    async function cargarPanel() {
        await renderStats();
        await renderPropiedadesTabla();
        setupFormListeners();
    }

    async function renderStats() {
        const dinámicas = await window.propiedadesDB.getAll();
        const estaticasCount = 5; // Las 5 propiedades harcodeadas
        const total = dinámicas.length + estaticasCount;

        const ventasCount = dinámicas.filter(p => p.tipo === 'Venta').length + 5; // Hardcoded are all Venta
        const alquileresCount = dinámicas.filter(p => p.tipo === 'Alquiler').length;

        let totalFotos = 0;
        dinámicas.forEach(p => totalFotos += (p.imagenes ? p.imagenes.length : 0));

        document.getElementById('statTotal').textContent = total;
        document.getElementById('statVentas').textContent = ventasCount;
        document.getElementById('statAlquileres').textContent = alquileresCount;
        document.getElementById('statFotos').textContent = totalFotos;
    }

    // 4. RENDERIZADO DE TABLA DE PROPIEDADES
    async function renderPropiedadesTabla() {
        const tbody = document.getElementById('tablaPropiedadesBody');
        if (!tbody) return;

        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:2rem;">Cargando propiedades...</td></tr>';

        const dinámicas = await window.propiedadesDB.getAll();
        const searchVal = (document.getElementById('searchProp')?.value || '').toLowerCase();
        const catVal = document.getElementById('filterCategoria')?.value || 'todas';

        // Estados y Overrides de propiedades estáticas
        const estadosGuardados = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
        const overridesEstaticas = JSON.parse(localStorage.getItem('breccia_estaticas_overrides') || '{}');
        const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');
        let ordenIds = JSON.parse(localStorage.getItem('breccia_propiedades_orden') || '[]');

        // Propiedades estáticas combinadas con posibles modificaciones
        const hardcodedList = Object.keys(STATIC_PROPERTIES_MAP).map(id => {
            const base = STATIC_PROPERTIES_MAP[id];
            const override = overridesEstaticas[id] || {};
            return {
                ...base,
                ...override,
                estado: estadosGuardados[id] || base.estado || 'disponible',
                esEstatica: true
            };
        });

        let combinadas = [
            ...dinámicas.map(p => ({
                ...p,
                thumb: (p.imagenes && p.imagenes.length > 0) ? p.imagenes[0] : null,
                esEstatica: false
            })),
            ...hardcodedList
        ];

        // Sincronizar ordenIds con todos los IDs existentes
        combinadas.forEach(p => {
            const pid = String(p.id);
            if (!ordenIds.includes(pid)) ordenIds.push(pid);
        });
        // Filtrar IDs que ya no existan
        ordenIds = ordenIds.filter(id => combinadas.some(p => String(p.id) === String(id)));
        localStorage.setItem('breccia_propiedades_orden', JSON.stringify(ordenIds));

        // Ordenar: primero destacadas, y dentro de cada grupo por el orden personalizado
        combinadas.sort((a, b) => {
            const idA = String(a.id);
            const idB = String(b.id);
            const destA = !!destacadas[idA];
            const destB = !!destacadas[idB];
            if (destA !== destB) return destB ? 1 : -1;
            const idxA = ordenIds.indexOf(idA);
            const idxB = ordenIds.indexOf(idB);
            return (idxA !== -1 ? idxA : 9999) - (idxB !== -1 ? idxB : 9999);
        });

        // Filtros visuales (búsqueda / categoría)
        let filtradas = [...combinadas];
        if (searchVal) {
            filtradas = filtradas.filter(p =>
                (p.titulo && p.titulo.toLowerCase().includes(searchVal)) ||
                (p.ubicacion && p.ubicacion.toLowerCase().includes(searchVal))
            );
        }

        if (catVal !== 'todas') {
            filtradas = filtradas.filter(p => p.categoria === catVal);
        }

        if (filtradas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" style="text-align:center; padding:2rem; color:#64748b;">No se encontraron propiedades.</td></tr>';
            return;
        }

        tbody.innerHTML = filtradas.map((prop, idxFiltrada) => {
            const propIdStr = String(prop.id);
            const thumbUrl = prop.thumb || (prop.imagenes && prop.imagenes.length > 0 ? prop.imagenes[0] : 'favicon-V3.ico');
            const badgeTipoClass = prop.tipo === 'Venta' ? 'badge-venta' : 'badge-alquiler';
            const badgeOrigen = prop.esEstatica
                ? '<span class="badge-estatico">Estática (HTML)</span>'
                : '<span class="badge-dinamico">Panel Admin</span>';

            // Estado actual
            const estadoProp = prop.estado || 'disponible';
            const esDest = !!destacadas[propIdStr];

            // Posición en la lista completa
            const posGlobal = combinadas.findIndex(p => String(p.id) === propIdStr);
            const esPrimero = posGlobal === 0;
            const esUltimo = posGlobal === combinadas.length - 1;

            // SELECTOR DIRECTO DE ESTADO (en la misma columna)
            const selectorEstadoHTML = `
                <div class="estado-select-container">
                    <select class="select-estado-directo estado-${estadoProp}" onchange="cambiarEstadoDirecto('${prop.id}', this.value, ${prop.esEstatica})" title="Cambiar estado comercial de la propiedad">
                        <option value="disponible" ${estadoProp === 'disponible' ? 'selected' : ''}>🟢 Disponible</option>
                        <option value="reservada" ${estadoProp === 'reservada' ? 'selected' : ''}>🔒 Reservada</option>
                        <option value="alquilada" ${estadoProp === 'alquilada' ? 'selected' : ''}>🏠 Alquilada</option>
                        <option value="vendida" ${estadoProp === 'vendida' ? 'selected' : ''}>✔️ Vendida</option>
                    </select>
                </div>
            `;

            // Botón modal de cambio rápido
            const cambioEstadoBtn = `
                <button class="btn-action estado" onclick="cambiarEstadoPropiedad('${prop.id}', ${prop.esEstatica})" title="Cambiar estado (Modal rápido)">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l3 3"/></svg>
                </button>`;

            // Botón poner primera
            const btnPonerPrimera = `
                <button class="btn-action top" onclick="ponerPrimeraPropiedad('${prop.id}')" title="Poner en 1° lugar de la web">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><polyline points="5 12 12 5 19 12"/><line x1="5" y1="2" x2="19" y2="2"/></svg>
                </button>`;

            // Botón Instagram Story
            const btnInstagramStory = `
                <button class="btn-action instagram" onclick="abrirStoryInstagram('${prop.id}', ${prop.esEstatica})" title="Crear / Compartir Story de Instagram">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </button>`;

            const acciones = prop.esEstatica
                ? `
                    ${btnPonerPrimera}
                    ${btnInstagramStory}
                    <a href="inmobiliaria.html" target="_blank" class="btn-action view" title="Ver en Web"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>
                    <button class="btn-action edit" onclick="editarPropiedad('${prop.id}', true)" title="Editar propiedad"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
                    ${cambioEstadoBtn}
                `
                : `
                    ${btnPonerPrimera}
                    ${btnInstagramStory}
                    <a href="inmobiliaria.html" target="_blank" class="btn-action view" title="Ver en Web"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>
                    <button class="btn-action edit" onclick="editarPropiedad('${prop.id}', false)" title="Editar propiedad"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
                    ${cambioEstadoBtn}
                    <button class="btn-action delete" onclick="eliminarPropiedad('${prop.id}', '${(prop.titulo || '').replace(/'/g, "\\'")}')" title="Eliminar"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                `;

            return `
                <tr>
                    <td style="text-align: center;">
                        <div class="orden-badge-container">
                            <span class="badge-orden" title="Posición en el catálogo">#${posGlobal + 1}</span>
                            <div class="orden-arrows">
                                <button type="button" class="btn-orden-arr" onclick="moverOrdenPropiedad('${prop.id}', -1)" ${esPrimero ? 'disabled' : ''} title="Subir orden">▲</button>
                                <button type="button" class="btn-orden-arr" onclick="moverOrdenPropiedad('${prop.id}', 1)" ${esUltimo ? 'disabled' : ''} title="Bajar orden">▼</button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <img src="${thumbUrl}" class="prop-thumb" alt="Miniatura" onerror="this.src='favicon-V3.ico'">
                    </td>
                    <td>
                        <strong>${escapeHTML(prop.titulo)}</strong><br>
                        <small style="color:#64748b;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${escapeHTML(prop.ubicacion || '')}</small>
                    </td>
                    <td>
                        <span style="text-transform:capitalize;">${prop.categoria || 'N/A'}</span>
                    </td>
                    <td>
                        <span class="badge-tipo ${badgeTipoClass}">${prop.tipo || 'Venta'}</span>
                    </td>
                    <td><strong>${escapeHTML(prop.precio || 'Consultar')}</strong></td>
                    <td>${selectorEstadoHTML}</td>
                    <td style="text-align: center;">
                        <button type="button" class="btn-destacada-pill ${esDest ? 'active' : ''}" onclick="toggleDestacadaPropiedad('${prop.id}', ${prop.esEstatica})" title="${esDest ? 'Quitar destacada' : 'Marcar como destacada (aparece primera con cinta dorada)'}">
                            <span>⭐</span>
                            <span>${esDest ? 'Destacada' : 'Normal'}</span>
                        </button>
                    </td>
                    <td>${badgeOrigen}</td>
                    <td>
                        <div class="action-btns">${acciones}</div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    window._renderPropiedadesTabla = renderPropiedadesTabla;

    // Métodos globales de Orden, Destacadas y Compartir
    window.moverOrdenPropiedad = async function (id, direccion) {
        let ordenIds = JSON.parse(localStorage.getItem('breccia_propiedades_orden') || '[]');
        const strId = String(id);
        const idx = ordenIds.indexOf(strId);
        if (idx === -1) return;
        const nuevoIdx = idx + direccion;
        if (nuevoIdx < 0 || nuevoIdx >= ordenIds.length) return;
        // Intercambiar
        const temp = ordenIds[idx];
        ordenIds[idx] = ordenIds[nuevoIdx];
        ordenIds[nuevoIdx] = temp;
        localStorage.setItem('breccia_propiedades_orden', JSON.stringify(ordenIds));
        showToast(`Orden actualizado (#${nuevoIdx + 1})`, 'success');
        await renderPropiedadesTabla();
    };

    window.ponerPrimeraPropiedad = async function (id) {
        let ordenIds = JSON.parse(localStorage.getItem('breccia_propiedades_orden') || '[]');
        const strId = String(id);
        ordenIds = ordenIds.filter(x => x !== strId);
        ordenIds.unshift(strId);
        localStorage.setItem('breccia_propiedades_orden', JSON.stringify(ordenIds));
        showToast('Propiedad fijada en el 1° lugar de la web', 'success');
        await renderPropiedadesTabla();
    };

    window.toggleDestacadaPropiedad = async function (id, esEstatica) {
        const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');
        const strId = String(id);
        const nuevoEstado = !destacadas[strId];
        if (nuevoEstado) {
            destacadas[strId] = true;
            // Ponerla al principio del orden para que sea la primera destacada
            let ordenIds = JSON.parse(localStorage.getItem('breccia_propiedades_orden') || '[]');
            ordenIds = ordenIds.filter(x => x !== strId);
            ordenIds.unshift(strId);
            localStorage.setItem('breccia_propiedades_orden', JSON.stringify(ordenIds));
            showToast('⭐ Propiedad marcada como DESTACADA', 'success');
        } else {
            delete destacadas[strId];
            showToast('Propiedad desmarcada de destacadas', 'info');
        }
        localStorage.setItem('breccia_propiedades_destacadas', JSON.stringify(destacadas));
        await renderPropiedadesTabla();
    };

    window.abrirStoryInstagram = async function (id, esEstatica) {
        if (typeof window.abrirModalCompartir === 'function') {
            window.abrirModalCompartir(id, esEstatica);
        } else {
            showToast('Iniciando generador de historias de Instagram...', 'info');
        }
    };

    // Filtros de tabla
    document.getElementById('searchProp')?.addEventListener('input', renderPropiedadesTabla);
    document.getElementById('filterCategoria')?.addEventListener('change', renderPropiedadesTabla);

    // 5. FORMULARIO AGREGAR / EDITAR
    function setupFormListeners() {
        const selectCategoria = document.getElementById('propCategoria');
        if (selectCategoria) {
            selectCategoria.addEventListener('change', toggleCamposSegunCategoria);
        }

        // Subida de fotos
        const inputFotos = document.getElementById('propFotosInput');
        const dropzone = document.getElementById('dropzoneFotos');

        if (inputFotos) {
            inputFotos.addEventListener('change', (e) => manejarSubidaFotos(e.target.files));
        }

        if (dropzone) {
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });
            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('dragover');
            });
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files) {
                    manejarSubidaFotos(e.dataTransfer.files);
                }
            });
        }

        // Agregar características
        const btnAddTag = document.getElementById('btnAddCaracteristica');
        const inputTag = document.getElementById('inputCaracteristica');
        if (btnAddTag && inputTag) {
            const agregarTag = () => {
                const val = inputTag.value.trim();
                if (val && !caracteristicasLista.includes(val)) {
                    caracteristicasLista.push(val);
                    inputTag.value = '';
                    renderCaracteristicasTags();
                }
            };

            btnAddTag.addEventListener('click', agregarTag);
            inputTag.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    agregarTag();
                }
            });
        }

        // Submit Formulario
        const formProp = document.getElementById('formPropiedad');
        if (formProp) {
            formProp.addEventListener('submit', guardarPropiedadHandler);
        }
    }

    function toggleCamposSegunCategoria() {
        const cat = document.getElementById('propCategoria').value;
        const camposVivienda = document.getElementById('camposVivienda');
        const camposLote = document.getElementById('camposLote');
        const camposCochera = document.getElementById('camposCochera');

        camposVivienda.style.display = 'none';
        camposLote.style.display = 'none';
        camposCochera.style.display = 'none';

        if (cat === 'lote') {
            camposLote.style.display = 'grid';
        } else if (cat === 'cochera') {
            camposCochera.style.display = 'grid';
        } else {
            camposVivienda.style.display = 'grid';
        }
    }

    async function manejarSubidaFotos(files) {
        if (!files || files.length === 0) return;

        showToast('Procesando imágenes...', 'info');
        let agregadas = 0;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                try {
                    const compressedBase64 = await PropiedadesDB.compressImage(file, 1200, 1200, 0.85);
                    fotosCargadas.push(compressedBase64);
                    agregadas++;
                } catch (err) {
                    console.error('Error al comprimir foto:', err);
                }
            }
        }
        renderFotosPreview();
        showToast(`${agregadas} fotos agregadas a la galería.`, 'success');
    }

    function renderFotosPreview() {
        const container = document.getElementById('previewFotosGrid');
        const badgeCount = document.getElementById('galleryCountBadge');
        const actionsBar = document.getElementById('galleryActionsBar');

        if (badgeCount) {
            badgeCount.textContent = `${fotosCargadas.length} foto${fotosCargadas.length === 1 ? '' : 's'} cargada${fotosCargadas.length === 1 ? '' : 's'}`;
        }

        if (actionsBar) {
            actionsBar.style.display = fotosCargadas.length > 0 ? 'flex' : 'none';
        }

        if (!container) return;

        if (fotosCargadas.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = fotosCargadas.map((foto, index) => {
            const esPortada = index === 0;
            const starSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            return `
                <div class="preview-item ${esPortada ? 'es-portada' : ''}">
                    <img src="${foto}" alt="Foto ${index + 1}">
                    ${esPortada ? `<div class="badge-portada">${starSvg} <span>Portada</span></div>` : ''}
                    <div class="preview-index-tag">#${index + 1}</div>

                    <div class="preview-actions-overlay">
                        <div class="preview-top-controls">
                            ${!esPortada ? `<button type="button" class="btn-make-cover" onclick="hacerPortadaFoto(${index})" title="Establecer como foto principal">${starSvg} <span>Portada</span></button>` : '<span></span>'}
                            <button type="button" class="btn-remove-photo" onclick="eliminarFoto(${index})" title="Eliminar foto">✕</button>
                        </div>
                        <div class="preview-reorder-controls">
                            ${index > 0 ? `<button type="button" class="btn-reorder" onclick="reordenarFoto(${index}, -1)" title="Mover a la izquierda">◄</button>` : ''}
                            ${index < fotosCargadas.length - 1 ? `<button type="button" class="btn-reorder" onclick="reordenarFoto(${index}, 1)" title="Mover a la derecha">►</button>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    window.hacerPortadaFoto = function (index) {
        if (index <= 0 || index >= fotosCargadas.length) return;
        const [foto] = fotosCargadas.splice(index, 1);
        fotosCargadas.unshift(foto);
        renderFotosPreview();
        showToast('Foto establecida como Portada', 'success');
    };

    window.reordenarFoto = function (index, direccion) {
        const nuevoIndex = index + direccion;
        if (nuevoIndex < 0 || nuevoIndex >= fotosCargadas.length) return;
        const temp = fotosCargadas[index];
        fotosCargadas[index] = fotosCargadas[nuevoIndex];
        fotosCargadas[nuevoIndex] = temp;
        renderFotosPreview();
    };

    window.eliminarFoto = function (index) {
        fotosCargadas.splice(index, 1);
        renderFotosPreview();
    };

    window.eliminarTodasLasFotos = function () {
        if (fotosCargadas.length === 0) return;
        if (confirm('¿Desea eliminar todas las fotos de esta galería?')) {
            fotosCargadas = [];
            renderFotosPreview();
            showToast('Todas las fotos han sido eliminadas.', 'info');
        }
    };

    function renderCaracteristicasTags() {
        const container = document.getElementById('tagsCaracteristicas');
        if (!container) return;

        container.innerHTML = caracteristicasLista.map((carac, index) => `
            <div class="tag-item">
                <span>${escapeHTML(carac)}</span>
                <span class="tag-remove" onclick="eliminarCaracteristica(${index})">×</span>
            </div>
        `).join('');
    }

    window.eliminarCaracteristica = function (index) {
        caracteristicasLista.splice(index, 1);
        renderCaracteristicasTags();
    };

    async function guardarPropiedadHandler(e) {
        e.preventDefault();
        const btnSave = document.getElementById('btnGuardarPropiedad');
        btnSave.disabled = true;
        btnSave.textContent = 'Guardando...';

        try {
            const cat = document.getElementById('propCategoria').value;
            const nuevoEstado = document.getElementById('propEstado').value || 'disponible';
            const esDestacada = document.getElementById('propDestacada')?.checked || false;

            // CASO 1: Edición de propiedad estática
            if (editandoEsEstatica && editandoId) {
                // Guardar estado en breccia_estado_estaticas
                const estados = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
                estados[String(editandoId)] = nuevoEstado;
                localStorage.setItem('breccia_estado_estaticas', JSON.stringify(estados));

                // Guardar destacada
                const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');
                if (esDestacada) {
                    destacadas[String(editandoId)] = true;
                } else {
                    delete destacadas[String(editandoId)];
                }
                localStorage.setItem('breccia_propiedades_destacadas', JSON.stringify(destacadas));

                // Guardar modificaciones de datos en breccia_estaticas_overrides
                const overrides = JSON.parse(localStorage.getItem('breccia_estaticas_overrides') || '{}');
                overrides[String(editandoId)] = {
                    titulo: document.getElementById('propTitulo').value.trim(),
                    precio: document.getElementById('propPrecio').value.trim(),
                    ubicacion: document.getElementById('propUbicacion').value.trim(),
                    tipo: document.getElementById('propTipo').value,
                    categoria: cat,
                    descripcion: document.getElementById('propDescripcion').value.trim(),
                    dormitorios: document.getElementById('propDormitorios')?.value.trim() || '',
                    banos: document.getElementById('propBanos')?.value.trim() || '',
                    superficie: document.getElementById('propSuperficie')?.value.trim() || '',
                    dimensiones: document.getElementById('propDimensiones')?.value.trim() || '',
                    construccion: document.getElementById('propConstruccion')?.value.trim() || '',
                    superficieTotal: document.getElementById('propSuperficieTotal')?.value.trim() || '',
                    caracteristicas: [...caracteristicasLista],
                    imagenes: [...fotosCargadas]
                };
                localStorage.setItem('breccia_estaticas_overrides', JSON.stringify(overrides));

                showToast('Propiedad actualizada con éxito.', 'success');
                resetFormulario();
                await cargarPanel();
                cambiarTab('tabListado');
                return;
            }

            // CASO 2: Propiedades dinámicas (Panel Admin / IndexedDB)
            const nuevoId = editandoId || ('dyn_' + Date.now());
            const propiedadData = {
                id: nuevoId,
                titulo: document.getElementById('propTitulo').value.trim(),
                tipo: document.getElementById('propTipo').value,
                estado: nuevoEstado,
                categoria: cat,
                ubicacion: document.getElementById('propUbicacion').value.trim(),
                precio: document.getElementById('propPrecio').value.trim(),
                descripcion: document.getElementById('propDescripcion').value.trim(),
                caracteristicas: [...caracteristicasLista],
                imagenes: [...fotosCargadas],
                esLote: cat === 'lote',
                esCochera: cat === 'cochera'
            };

            if (cat === 'lote') {
                propiedadData.dimensiones = document.getElementById('propDimensiones').value.trim();
                propiedadData.construccion = document.getElementById('propConstruccion').value.trim();
                propiedadData.superficieTotal = document.getElementById('propSuperficieTotal').value.trim();
            } else if (cat === 'cochera') {
                propiedadData.unidades = document.getElementById('propUnidadesCochera').value.trim();
                propiedadData.expensas = document.getElementById('propExpensasCochera').value.trim();
                propiedadData.antiguedad = document.getElementById('propAntiguedadCochera').value.trim();
            } else {
                propiedadData.dormitorios = document.getElementById('propDormitorios').value.trim();
                propiedadData.banos = document.getElementById('propBanos').value.trim();
                propiedadData.superficie = document.getElementById('propSuperficie').value.trim();
            }

            await window.propiedadesDB.save(propiedadData);

            // Guardar destacada para dinámicas
            const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');
            if (esDestacada) {
                destacadas[String(nuevoId)] = true;
                let ordenIds = JSON.parse(localStorage.getItem('breccia_propiedades_orden') || '[]');
                ordenIds = ordenIds.filter(x => x !== String(nuevoId));
                ordenIds.unshift(String(nuevoId));
                localStorage.setItem('breccia_propiedades_orden', JSON.stringify(ordenIds));
            } else {
                delete destacadas[String(nuevoId)];
            }
            localStorage.setItem('breccia_propiedades_destacadas', JSON.stringify(destacadas));

            showToast(editandoId ? 'Propiedad actualizada con éxito.' : 'Nueva propiedad creada con éxito.', 'success');

            resetFormulario();
            await cargarPanel();
            cambiarTab('tabListado');
        } catch (err) {
            console.error('Error al guardar:', err);
            showToast('Error al guardar la propiedad.', 'error');
        } finally {
            btnSave.disabled = false;
            btnSave.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>Guardar Propiedad`;
        }
    }

    // Editar propiedad (dinámica o estática)
    window.editarPropiedad = async function (id, esEstatica) {
        let prop = null;

        if (esEstatica) {
            const base = STATIC_PROPERTIES_MAP[String(id)];
            if (!base) {
                showToast('No se encontró la propiedad estática.', 'error');
                return;
            }
            const overrides = JSON.parse(localStorage.getItem('breccia_estaticas_overrides') || '{}');
            const estados = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
            prop = {
                ...base,
                ...(overrides[String(id)] || {}),
                estado: estados[String(id)] || base.estado || 'disponible',
                esEstatica: true
            };
            editandoEsEstatica = true;
            editandoId = String(id);
        } else {
            prop = await window.propiedadesDB.getById(id);
            editandoEsEstatica = false;
            if (prop) editandoId = prop.id;
        }

        if (!prop) {
            showToast('No se encontró la propiedad a editar.', 'error');
            return;
        }

        document.getElementById('formTituloHeader').textContent = esEstatica
            ? `Editar Propiedad Estática: ${prop.titulo}`
            : `Editar Propiedad #${prop.id}`;

        document.getElementById('propTitulo').value = prop.titulo || '';
        document.getElementById('propTipo').value = prop.tipo || 'Venta';
        document.getElementById('propEstado').value = prop.estado || 'disponible';
        document.getElementById('propCategoria').value = prop.categoria || 'departamento';
        document.getElementById('propUbicacion').value = prop.ubicacion || '';
        document.getElementById('propPrecio').value = prop.precio || '';

        // Sincronizar checkbox de propiedad destacada
        const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');
        const chkDestacada = document.getElementById('propDestacada');
        if (chkDestacada) {
            chkDestacada.checked = !!destacadas[String(id)];
        }
        document.getElementById('propDescripcion').value = prop.descripcion || '';

        toggleCamposSegunCategoria();

        if (prop.esLote) {
            document.getElementById('propDimensiones').value = prop.dimensiones || '';
            document.getElementById('propConstruccion').value = prop.construccion || '';
            document.getElementById('propSuperficieTotal').value = prop.superficieTotal || '';
        } else if (prop.esCochera) {
            document.getElementById('propUnidadesCochera').value = prop.unidades || '';
            document.getElementById('propExpensasCochera').value = prop.expensas || '';
            document.getElementById('propAntiguedadCochera').value = prop.antiguedad || '';
        } else {
            document.getElementById('propDormitorios').value = prop.dormitorios || '';
            document.getElementById('propBanos').value = prop.banos || '';
            document.getElementById('propSuperficie').value = prop.superficie || '';
        }

        caracteristicasLista = [...(prop.caracteristicas || [])];
        renderCaracteristicasTags();

        fotosCargadas = [...(prop.imagenes || (prop.thumb ? [prop.thumb] : []))];
        renderFotosPreview();

        cambiarTab('tabFormulario');
    };

    // Cambiar estado directo desde el select de la tabla
    window.cambiarEstadoDirecto = async function (id, nuevoEstado, esEstatica) {
        try {
            if (esEstatica) {
                const estados = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
                estados[String(id)] = nuevoEstado;
                localStorage.setItem('breccia_estado_estaticas', JSON.stringify(estados));
            } else {
                const prop = await window.propiedadesDB.getById(id);
                if (prop) {
                    prop.estado = nuevoEstado;
                    await window.propiedadesDB.save(prop);
                }
            }

            const labels = {
                disponible: 'Disponible',
                reservada: 'Reservada',
                alquilada: 'Alquilada',
                vendida: 'Vendida'
            };
            showToast(`Estado cambiado a: ${labels[nuevoEstado] || nuevoEstado}`, 'success');

            // Actualizar la tabla sin recargar toda la página
            await renderPropiedadesTabla();
        } catch (e) {
            console.error('Error al cambiar estado directo:', e);
            showToast('Error al actualizar el estado.', 'error');
        }
    };

    let idAEliminar = null;

    window.eliminarPropiedad = function (id, titulo) {
        idAEliminar = id;
        const modal = document.getElementById('modalConfirmarEliminar');
        const nombreEl = document.getElementById('modalNombrePropiedad');
        if (nombreEl) {
            nombreEl.textContent = titulo ? `"${titulo}"` : 'esta propiedad';
        }
        if (modal) {
            modal.style.display = 'flex';
        }
    };

    function cerrarModalEliminar() {
        const modal = document.getElementById('modalConfirmarEliminar');
        if (modal) modal.style.display = 'none';
        idAEliminar = null;
    }

    document.getElementById('btnCerrarModalEliminar')?.addEventListener('click', cerrarModalEliminar);
    document.getElementById('btnCancelarEliminar')?.addEventListener('click', cerrarModalEliminar);

    document.getElementById('btnConfirmarEliminar')?.addEventListener('click', async () => {
        if (!idAEliminar) return;
        try {
            await window.propiedadesDB.delete(idAEliminar);
            showToast('Propiedad eliminada correctamente.', 'success');
            cerrarModalEliminar();
            await cargarPanel();
        } catch (e) {
            console.error('Error al eliminar la propiedad:', e);
            showToast('Error al eliminar la propiedad.', 'error');
            cerrarModalEliminar();
        }
    });

    window.resetFormulario = function () {
        editandoId = null;
        editandoEsEstatica = false;
        document.getElementById('formTituloHeader').textContent = 'Crear Nueva Propiedad';
        document.getElementById('formPropiedad').reset();
        // Reset estado a disponible
        const estadoEl = document.getElementById('propEstado');
        if (estadoEl) estadoEl.value = 'disponible';
        const chkDestacada = document.getElementById('propDestacada');
        if (chkDestacada) chkDestacada.checked = false;
        caracteristicasLista = [];
        fotosCargadas = [];
        renderCaracteristicasTags();
        renderFotosPreview();
        toggleCamposSegunCategoria();
    };

    // 6. RESPALDOS JSON Y CLAVE
    document.getElementById('btnExportarJSON')?.addEventListener('click', async () => {
        try {
            const jsonStr = await window.propiedadesDB.exportJSON();
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `breccia_propiedades_backup_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Respaldo JSON descargado correctamente.', 'success');
        } catch (e) {
            showToast('Error al exportar datos.', 'error');
        }
    });

    document.getElementById('btnImportarJSON')?.addEventListener('click', () => {
        document.getElementById('inputFileImport').click();
    });

    document.getElementById('inputFileImport')?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const count = await window.propiedadesDB.importJSON(event.target.result);
                showToast(`Se importaron ${count} propiedades correctamente.`, 'success');
                await cargarPanel();
            } catch (err) {
                showToast('El archivo de respaldo JSON no es válido.', 'error');
            }
        };
        reader.readAsText(file);
    });

    document.getElementById('formCambiarPass')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const p1 = document.getElementById('newPass').value.trim();
        const p2 = document.getElementById('confirmPass').value.trim();

        if (!p1 || p1 !== p2) {
            showToast('Las contraseñas no coinciden.', 'error');
            return;
        }

        localStorage.setItem('breccia_admin_pass', p1);
        showToast('Contraseña cambiada con éxito.', 'success');
        document.getElementById('formCambiarPass').reset();
    });

    // Utilidad: Escapar HTML
    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Utilidad: Toast Notifications
    function showToast(message, type = 'info') {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span>${escapeHTML(message)}</span>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
});

// ─────────────────────────────────────────────────────────────────
// MODAL CAMBIO RÁPIDO DE ESTADO (estáticas + dinámicas)
// ─────────────────────────────────────────────────────────────────
window.cambiarEstadoPropiedad = async function (id, esEstatica) {
    // Determinar estado actual según tipo
    let estadoActual = 'disponible';
    let tituloPropiedad = `Propiedad #${id}`;

    if (esEstatica) {
        const estadosEstaticas = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
        estadoActual = estadosEstaticas[id] || 'disponible';
        // Recuperar título de la fila de la tabla
        const filaActiva = document.querySelector(`[onclick*="cambiarEstadoPropiedad('${id}'"]`)?.closest('tr');
        if (filaActiva) {
            const strong = filaActiva.querySelector('td:nth-child(2) strong');
            if (strong) tituloPropiedad = strong.textContent;
        }
    } else {
        const prop = await window.propiedadesDB.getById(id);
        if (!prop) return;
        estadoActual = prop.estado || 'disponible';
        tituloPropiedad = prop.titulo || tituloPropiedad;
    }

    // Crear modal si no existe
    let modal = document.getElementById('modalCambioEstado');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalCambioEstado';
        modal.className = 'modal-overlay';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="modal-card" style="max-width:420px;">
                <div class="modal-header">
                    <h3 style="display:flex;align-items:center;gap:8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l3 3"/></svg>
                        Cambiar Estado
                    </h3>
                    <button class="modal-close" onclick="document.getElementById('modalCambioEstado').style.display='none'">&times;</button>
                </div>
                <div class="modal-body">
                    <p id="modalEstadoPropNombre" style="font-weight:600;color:#0f172a;margin-bottom:1.25rem;font-size:0.95rem;"></p>
                    <div class="estado-options-grid">
                        <button class="estado-option-btn" data-estado="disponible">
                            <span class="estado-icon">✅</span>
                            <span>Disponible</span>
                        </button>
                        <button class="estado-option-btn" data-estado="reservada">
                            <span class="estado-icon">🔒</span>
                            <span>Reservada</span>
                        </button>
                        <button class="estado-option-btn" data-estado="alquilada">
                            <span class="estado-icon">🏠</span>
                            <span>Alquilada</span>
                        </button>
                        <button class="estado-option-btn" data-estado="vendida">
                            <span class="estado-icon">✔️</span>
                            <span>Vendida</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // Marcar opción actual
    modal.querySelectorAll('.estado-option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.estado === estadoActual);
    });

    // Título
    const propNombreEl = modal.querySelector('#modalEstadoPropNombre');
    if (propNombreEl) propNombreEl.textContent = `"${tituloPropiedad}"`;

    // Handler de selección
    modal.querySelectorAll('.estado-option-btn').forEach(btn => {
        btn.onclick = async () => {
            const nuevoEstado = btn.dataset.estado;

            if (esEstatica) {
                // Guardar en localStorage
                const estadosEstaticas = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
                estadosEstaticas[id] = nuevoEstado;
                localStorage.setItem('breccia_estado_estaticas', JSON.stringify(estadosEstaticas));
            } else {
                // Guardar en IndexedDB
                const prop = await window.propiedadesDB.getById(id);
                if (prop) {
                    prop.estado = nuevoEstado;
                    await window.propiedadesDB.save(prop);
                }
            }

            modal.style.display = 'none';

            const labels = { disponible: 'Disponible', reservada: 'Reservada', alquilada: 'Alquilada', vendida: 'Vendida' };
            const toastContainer = document.getElementById('toastContainer') || (() => {
                const c = document.createElement('div');
                c.id = 'toastContainer'; c.className = 'toast-container';
                document.body.appendChild(c); return c;
            })();
            const toast = document.createElement('div');
            toast.className = 'toast success';
            toast.innerHTML = `<span>✓</span><span>Estado actualizado a <strong>${labels[nuevoEstado]}</strong></span>`;
            toastContainer.appendChild(toast);
            setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3500);

            // Recargar tabla de inmediato
            if (window._renderPropiedadesTabla) {
                await window._renderPropiedadesTabla();
            } else {
                location.reload();
            }
        };
    });

    modal.style.display = 'flex';
};
