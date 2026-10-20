// ============================================
// ADMINISTRACIÓN — directorio de edificios
// ============================================
(function () {
    'use strict';

    // Datos en edificios.js (padrón de consorcios administrados)
    const edificios = (window.BRECCIA_EDIFICIOS || []).map((ed, i) => ({ ...ed, orden: i }));

    const ZONAS = { todas: 'Todas', centro: 'Centro', 'playa grande': 'Playa Grande', camet: 'Camet' };
    const ITEMS_PER_PAGE = 12;
    const { icon } = window.Breccia;

    const state = { query: '', zona: 'todas', sort: 'default', page: 1 };

    const grid = document.getElementById('edificiosGrid');
    const pager = document.getElementById('pagination');
    const summary = document.getElementById('bldSummary');
    const chips = document.getElementById('zoneChips');
    const search = document.getElementById('searchEdificio');
    const sort = document.getElementById('sortEdificios');

    const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const bldTotal = document.getElementById('bldTotal');
    if (bldTotal) bldTotal.textContent = edificios.length;

    // ============================================
    // FILTRO + ORDEN
    // ============================================
    function filtered() {
        const q = normalize(state.query.trim());
        const list = edificios.filter(ed =>
            (state.zona === 'todas' || ed.zona === state.zona) &&
            (!q || normalize(`${ed.nombre} ${ed.direccion}`).includes(q))
        );
        const sorters = {
            default: (a, b) => a.orden - b.orden,
            nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es'),
            unidades: (a, b) => b.unidades - a.unidades,
            pisos: (a, b) => b.pisos - a.pisos
        };
        return list.sort(sorters[state.sort]);
    }

    function renderChips() {
        if (!chips) return;
        chips.innerHTML = Object.entries(ZONAS).map(([key, label]) => {
            const count = key === 'todas' ? edificios.length : edificios.filter(ed => ed.zona === key).length;
            return `<button type="button" class="chip" data-zona="${key}" aria-pressed="${state.zona === key}">${label}<span class="chip-count">${count}</span></button>`;
        }).join('');
    }

    function render() {
        if (!grid) return;
        const list = filtered();
        const totalPages = Math.max(1, Math.ceil(list.length / ITEMS_PER_PAGE));
        state.page = Math.min(state.page, totalPages);
        const start = (state.page - 1) * ITEMS_PER_PAGE;
        const page = list.slice(start, start + ITEMS_PER_PAGE);

        if (!list.length) {
            grid.style.border = '0';
            grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><strong>No encontramos edificios</strong>Probá con otra calle o nombre, o elegí "Todas" las zonas.</div>`;
        } else {
            grid.style.border = '';
            grid.innerHTML = page.map((ed, i) => {
                const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ed.direccion}, Mar del Plata`)}`;
                const pisos = ed.pisos > 0 ? `<span class="bld-pill"><strong>${ed.pisos}</strong> ${ed.pisos === 1 ? 'piso' : 'pisos'}</span>` : '';
                return `
                <article class="bld" style="animation-delay:${i * 30}ms">
                    <span class="bld-index">${String(ed.orden + 1).padStart(2, '0')}</span>
                    <span class="bld-zone">${ZONAS[ed.zona]}</span>
                    <h3>${escape(ed.nombre)}</h3>
                    <span class="bld-addr">${icon('pin')}${escape(ed.direccion)}</span>
                    <div class="bld-meta">
                        <span class="bld-pill"><strong>${ed.unidades}</strong> unidades</span>
                        ${pisos}
                    </div>
                    <a class="bld-map" href="${maps}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${escape(ed.direccion)} en el mapa">${icon('arrow-ur', 'icon--sm')}</a>
                </article>`;
            }).join('');
        }

        if (summary) {
            const shown = list.length ? `${start + 1}–${start + page.length}` : '0';
            summary.textContent = `Mostrando ${shown} de ${list.length} edificios`;
        }
        renderPager(totalPages);
    }

    function renderPager(totalPages) {
        if (!pager) return;
        if (totalPages <= 1) { pager.innerHTML = ''; return; }
        const p = state.page;
        let html = `<button type="button" data-page="${p - 1}" ${p === 1 ? 'disabled' : ''} aria-label="Página anterior">${icon('chev-l', 'icon--sm')}</button>`;
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - p) <= 1) {
                html += `<button type="button" data-page="${i}" ${i === p ? 'aria-current="page"' : ''}>${String(i).padStart(2, '0')}</button>`;
            } else if (Math.abs(i - p) === 2) {
                html += `<span class="gap">…</span>`;
            }
        }
        html += `<button type="button" data-page="${p + 1}" ${p === totalPages ? 'disabled' : ''} aria-label="Página siguiente">${icon('chev-r', 'icon--sm')}</button>`;
        pager.innerHTML = html;
    }

    // ============================================
    // EVENTOS
    // ============================================
    let searchTimer;
    search?.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            state.query = search.value;
            state.page = 1;
            render();
        }, 120);
    });

    chips?.addEventListener('click', e => {
        const btn = e.target.closest('[data-zona]');
        if (!btn) return;
        state.zona = btn.dataset.zona;
        state.page = 1;
        renderChips();
        render();
    });

    sort?.addEventListener('change', () => {
        state.sort = sort.value;
        state.page = 1;
        render();
    });

    pager?.addEventListener('click', e => {
        const btn = e.target.closest('[data-page]');
        if (!btn || btn.disabled) return;
        state.page = parseInt(btn.dataset.page, 10);
        render();
        document.getElementById('edificios')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // ============================================
    // AVATARES CON INICIALES
    // ============================================
    document.querySelectorAll('[data-initials]').forEach(el => {
        const words = el.textContent.trim().split(/\s+/);
        el.textContent = (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
        el.setAttribute('aria-hidden', 'true');
    });

    renderChips();
    render();
})();
