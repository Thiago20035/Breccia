/**
 * Lógica del Panel de Administración - Breccia Inmuebles
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Estado del Formulario
    let editandoId = null;
    let fotosCargadas = []; // Array de DataURLs de imágenes
    let caracteristicasLista = []; // Array de strings de características

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

    window.cambiarTab = function(tabId) {
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

        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem;">Cargando propiedades...</td></tr>';

        const dinámicas = await window.propiedadesDB.getAll();
        const searchVal = (document.getElementById('searchProp')?.value || '').toLowerCase();
        const catVal = document.getElementById('filterCategoria')?.value || 'todas';

        // Propiedades harcodeadas para referencia en la tabla
        const hardcodedList = [
            { id: 1, titulo: 'Departamento Tipo Semipiso de Tres (3) Ambientes', ubicacion: 'Gascón 2356', precio: 'USD 169.000', tipo: 'Venta', categoria: 'departamento', thumb: 'FotosGascon2356/G35.jpg', esEstatica: true },
            { id: 2, titulo: 'Departamento en Arenales', ubicacion: 'Arenales 2445', precio: 'USD 55.000', tipo: 'Venta', categoria: 'departamento', thumb: 'Arenales2445/PA3.jpg', esEstatica: true },
            { id: 3, titulo: 'Lote con Construcción en Parque Luro', ubicacion: 'Francia 371', precio: 'USD 120.000', tipo: 'Venta', categoria: 'lote', thumb: 'Francia371/F3.jpg', esEstatica: true },
            { id: 4, titulo: 'Departamento de 4 Ambientes con Gran Patio', ubicacion: 'San Juan y Avellaneda', precio: 'USD 85.000', tipo: 'Venta', categoria: 'departamento', thumb: 'SanJuan3052/SJ8.jpg', esEstatica: true },
            { id: 5, titulo: 'Cocheras en Edificio Céntrico', ubicacion: 'Corrientes entre Rivadavia', precio: 'USD 13.000 c/u', tipo: 'Venta', categoria: 'cochera', thumb: 'LeblonCochera/L1.jpeg', esEstatica: true }
        ];

        let combinadas = [
            ...dinámicas.map(p => ({
                ...p,
                thumb: (p.imagenes && p.imagenes.length > 0) ? p.imagenes[0] : null,
                esEstatica: false
            })),
            ...hardcodedList
        ];

        // Filtros
        if (searchVal) {
            combinadas = combinadas.filter(p =>
                (p.titulo && p.titulo.toLowerCase().includes(searchVal)) ||
                (p.ubicacion && p.ubicacion.toLowerCase().includes(searchVal))
            );
        }

        if (catVal !== 'todas') {
            combinadas = combinadas.filter(p => p.categoria === catVal);
        }

        if (combinadas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem; color:#64748b;">No se encontraron propiedades.</td></tr>';
            return;
        }

        tbody.innerHTML = combinadas.map(prop => {
            const thumbUrl = prop.thumb || 'favicon-V3.ico';
            const badgeTipoClass = prop.tipo === 'Venta' ? 'badge-venta' : 'badge-alquiler';
            const badgeOrigen = prop.esEstatica
                ? '<span class="badge-estatico">Estática (HTML)</span>'
                : '<span class="badge-dinamico">Panel Admin</span>';

            const acciones = prop.esEstatica
                ? `<a href="inmobiliaria.html" target="_blank" class="btn-action view" title="Ver en Web"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>`
                : `
                    <a href="inmobiliaria.html" target="_blank" class="btn-action view" title="Ver en Web"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></a>
                    <button class="btn-action edit" onclick="editarPropiedad('${prop.id}')" title="Editar"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></button>
                    <button class="btn-action delete" onclick="eliminarPropiedad('${prop.id}', '${(prop.titulo || '').replace(/'/g, "\\'")}')" title="Eliminar"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                `;

            return `
                <tr>
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
                    <td>${badgeOrigen}</td>
                    <td>
                        <div class="action-btns">${acciones}</div>
                    </td>
                </tr>
            `;
        }).join('');
    }

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

            const propiedadData = {
                id: editandoId || ('dyn_' + Date.now()),
                titulo: document.getElementById('propTitulo').value.trim(),
                tipo: document.getElementById('propTipo').value,
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

    window.editarPropiedad = async function (id) {
        const prop = await window.propiedadesDB.getById(id);
        if (!prop) {
            showToast('No se encontró la propiedad a editar.', 'error');
            return;
        }

        editandoId = prop.id;
        document.getElementById('formTituloHeader').textContent = `Editar Propiedad #${prop.id}`;

        document.getElementById('propTitulo').value = prop.titulo || '';
        document.getElementById('propTipo').value = prop.tipo || 'Venta';
        document.getElementById('propCategoria').value = prop.categoria || 'departamento';
        document.getElementById('propUbicacion').value = prop.ubicacion || '';
        document.getElementById('propPrecio').value = prop.precio || '';
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

        fotosCargadas = [...(prop.imagenes || [])];
        renderFotosPreview();

        cambiarTab('tabFormulario');
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
        document.getElementById('formTituloHeader').textContent = 'Crear Nueva Propiedad';
        document.getElementById('formPropiedad').reset();
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
