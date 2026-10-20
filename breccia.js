// ============================================
// BRECCIA — núcleo compartido por las 3 páginas
// ============================================
(function () {
    'use strict';

    const WEB3FORMS_KEY = 'f4521112-daef-4171-b0b7-0a994aeb27f3';
    const TZ = 'America/Argentina/Buenos_Aires';
    const OFFICE = { days: [1, 2, 3, 4, 5], open: 9 * 60, close: 13 * 60 + 30 };

    // ============================================
    // SPRITE DE ÍCONOS (una sola fuente para todo el sitio)
    // ============================================
    const ICONS = {
        arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
        'arrow-ur': '<path d="M7 17 17 7M8 7h9v9"/>',
        'arrow-l': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
        phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
        mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
        pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        building: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
        home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
        chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
        card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
        doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
        alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
        activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
        wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
        scale: '<path d="M12 3v18M5 7h14M8 21h8"/><path d="m5 7-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
        monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
        clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 12h6M9 16h4"/>',
        key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
        briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        bed: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
        bath: '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.68 3 4 3.68 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M2 12h20M7 19v2M17 19v2"/>',
        area: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h4M3 15h4M9 3v4M15 3v4"/>',
        car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
        tree: '<path d="M12 22v-7"/><path d="M17 8A5 5 0 0 0 7 8a4 4 0 0 0-1 7.9h12A4 4 0 0 0 17 8z"/>',
        shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
        calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
        coins: '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/>',
        hammer: '<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        x: '<path d="M18 6 6 18M6 6l12 12"/>',
        'chev-l': '<path d="m15 18-6-6 6-6"/>',
        'chev-r': '<path d="m9 18 6-6-6-6"/>',
        search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
        heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
        zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
        users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
        lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        check: '<path d="M20 6 9 17l-5-5"/>',
        instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
        send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
        plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
        whatsapp: '<path fill="currentColor" stroke="none" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"/>'
    };

    function injectSprite() {
        if (document.getElementById('breccia-sprite')) return;
        const symbols = Object.entries(ICONS)
            .map(([name, body]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${body}</symbol>`)
            .join('');
        const holder = document.createElement('div');
        holder.innerHTML = `<svg id="breccia-sprite" xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${symbols}</svg>`;
        document.body.prepend(holder.firstChild);
    }

    function icon(name, cls = '') {
        return `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
    }

    // ============================================
    // HEADER + BARRA DE PROGRESO
    // ============================================
    function initScroll() {
        const header = document.querySelector('.site-header');
        const progress = document.getElementById('scroll-progress');
        let ticking = false;

        function update() {
            const y = window.scrollY;
            header?.classList.toggle('is-scrolled', y > 24);
            if (progress) {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        update();
    }

    // ============================================
    // MENÚ MÓVIL
    // ============================================
    function initMenu() {
        const toggle = document.querySelector('.menu-toggle');
        const links = document.getElementById('nav-links');
        if (!toggle || !links) return;

        const setOpen = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
            links.classList.toggle('is-open', open);
            document.body.classList.toggle('menu-open', open);
        };

        toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
        links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
        window.matchMedia('(min-width: 1041px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
    }

    // ============================================
    // REVEAL AL HACER SCROLL
    // ============================================
    function initReveal(root = document) {
        const items = root.querySelectorAll('[data-reveal]:not(.is-visible)');
        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => io.observe(el));
    }

    // ============================================
    // CONTADORES
    // ============================================
    // [data-stat="edificios|unidades"] se calcula desde edificios.js si está cargado
    function applyStats() {
        const list = window.BRECCIA_EDIFICIOS;
        if (!Array.isArray(list)) return;
        const stats = {
            edificios: list.length,
            unidades: list.reduce((sum, ed) => sum + ed.unidades, 0)
        };
        document.querySelectorAll('[data-stat]').forEach(el => {
            const value = stats[el.dataset.stat];
            if (value == null) return;
            el.dataset.count = value;
            el.textContent = value.toLocaleString('es-AR') + (el.dataset.suffix || '');
        });
    }

    function initCounters() {
        applyStats();
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const run = (el) => {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const format = n => n.toLocaleString('es-AR') + suffix;
            if (reduced) { el.textContent = format(target); return; }
            const start = performance.now();
            const duration = 1800;
            const step = (now) => {
                const p = Math.min((now - start) / duration, 1);
                el.textContent = format(Math.round((1 - Math.pow(1 - p, 3)) * target));
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    run(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(el => io.observe(el));
    }

    // ============================================
    // HORA DE MAR DEL PLATA + ESTADO DE OFICINA
    // ============================================
    function nowInMdp() {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
        }).formatToParts(new Date());
        const get = type => parts.find(p => p.type === type)?.value;
        const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
        return { day, h: +get('hour'), m: +get('minute'), s: +get('second') };
    }

    function officeStatus() {
        const { day, h, m } = nowInMdp();
        const mins = h * 60 + m;
        const workday = OFFICE.days.includes(day);
        if (workday && mins >= OFFICE.open && mins < OFFICE.close) {
            return { open: true, text: 'Oficina abierta · hasta 13:30' };
        }
        if (workday && mins < OFFICE.open) return { open: false, text: 'Oficina cerrada · abre hoy 9:00' };
        const nextIsMonday = day === 5 || day === 6 || day === 0;
        return { open: false, text: nextIsMonday ? 'Oficina cerrada · abre el lunes 9:00' : 'Oficina cerrada · abre mañana 9:00' };
    }

    function initLive() {
        const offices = document.querySelectorAll('[data-office]');
        const clocks = document.querySelectorAll('[data-clock]');

        const tick = () => {
            const status = officeStatus();
            offices.forEach(el => {
                el.classList.toggle('is-open', status.open);
                const label = el.querySelector('[data-office-text]') || el;
                label.textContent = status.text;
            });
            const { h, m } = nowInMdp();
            const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            clocks.forEach(el => { el.textContent = time; });
        };
        tick();
        setInterval(tick, 30000);

        document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
    }

    // ============================================
    // MODALES
    // ============================================
    let lastFocus = null;

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        lastFocus = document.activeElement;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        const focusable = modal.querySelector('input, select, textarea, button:not(.modal-close)') || modal.querySelector('.modal-close');
        setTimeout(() => focusable?.focus({ preventScroll: true }), 60);
    }

    function closeModal(id) {
        const modal = typeof id === 'string' ? document.getElementById(id) : id;
        if (!modal || !modal.classList.contains('is-open')) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        if (!document.querySelector('.modal.is-open')) {
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
        }
        modal.dispatchEvent(new CustomEvent('modal:close'));
        lastFocus?.focus?.({ preventScroll: true });
    }

    function initModals() {
        document.addEventListener('click', e => {
            const opener = e.target.closest('[data-open-modal]');
            if (opener) {
                e.preventDefault();
                const modalId = opener.dataset.openModal;
                const preset = opener.dataset.preset;
                if (preset) {
                    const select = document.querySelector(`#${modalId} select`);
                    if (select) select.value = preset;
                }
                openModal(modalId);
                return;
            }
            const closer = e.target.closest('[data-close-modal]');
            if (closer) { closeModal(closer.closest('.modal')); return; }
            if (e.target.classList?.contains('modal')) closeModal(e.target);
        });

        document.addEventListener('keydown', e => {
            const open = [...document.querySelectorAll('.modal.is-open')].pop();
            if (!open) return;
            if (e.key === 'Escape') closeModal(open);
            if (e.key === 'Tab') { // trampa de foco simple
                const nodes = [...open.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')]
                    .filter(n => n.offsetParent !== null);
                if (!nodes.length) return;
                const first = nodes[0], last = nodes[nodes.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    }

    // ============================================
    // TOAST
    // ============================================
    let toastTimer;
    function toast(message) {
        let el = document.querySelector('.toast');
        if (!el) {
            el = document.createElement('div');
            el.className = 'toast';
            el.setAttribute('role', 'status');
            document.body.appendChild(el);
        }
        el.textContent = message;
        el.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
    }

    // ============================================
    // FORMULARIOS (Web3Forms)
    // ============================================
    async function sendForm({ subject, fromName, email, message }) {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject,
                from_name: fromName,
                email,
                message
            })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Error en el envío');
        return result;
    }

    function setStatus(form, type, text) {
        const status = form.querySelector('.form-status');
        if (!status) return;
        status.className = `form-status is-${type}`;
        status.innerHTML = `${icon(type === 'success' ? 'check' : 'alert')}<span>${text}</span>`;
        status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function clearStatus(form) {
        const status = form.querySelector('.form-status');
        if (status) status.className = 'form-status';
    }

    // Formularios genéricos: <form data-form data-subject="...">
    // Arma el mensaje a partir de las etiquetas de cada campo.
    function initForms() {
        document.querySelectorAll('form[data-form]').forEach(form => {
            form.addEventListener('submit', async e => {
                e.preventDefault();
                if (form.botcheck?.checked) return;
                const btn = form.querySelector('[type="submit"]');
                const label = btn.innerHTML;
                btn.disabled = true;
                btn.textContent = 'Enviando…';
                clearStatus(form);

                const data = new FormData(form);
                const lines = [];
                form.querySelectorAll('.field').forEach(field => {
                    const input = field.querySelector('input, select, textarea');
                    const name = field.querySelector('label')?.textContent.replace('*', '').trim();
                    if (input && name) lines.push(`- ${name}: ${(data.get(input.name) || '—').toString().trim() || '—'}`);
                });
                const subject = form.dataset.subject || 'Consulta desde la web';
                const message = `${subject.toUpperCase()}\n${'='.repeat(subject.length)}\n\n${lines.join('\n')}\n\nPágina: ${document.title}\nFecha: ${new Date().toLocaleString('es-AR')}`;

                try {
                    await sendForm({
                        subject,
                        fromName: [data.get('nombre'), data.get('apellido')].filter(Boolean).join(' '),
                        email: data.get('email'),
                        message
                    });
                    form.reset();
                    setStatus(form, 'success', form.dataset.success || 'Recibimos tu mensaje. Te contactamos a la brevedad.');
                    const modal = form.closest('.modal');
                    if (modal) setTimeout(() => closeModal(modal), 3200);
                } catch (err) {
                    console.error(err);
                    setStatus(form, 'error', 'No pudimos enviar el mensaje. Probá de nuevo o llamanos al 495-7908.');
                } finally {
                    btn.disabled = false;
                    btn.innerHTML = label;
                }
            });

            form.closest('.modal')?.addEventListener('modal:close', () => clearStatus(form));
        });
    }

    // ============================================
    // SELLO CIRCULAR: reparte el espaciado para cerrar el círculo exacto
    // ============================================
    function fitSeals() {
        document.querySelectorAll('.estate-seal text').forEach(text => {
            const r = 45;
            text.style.letterSpacing = '0px';
            const chars = text.textContent.length;
            const gap = (2 * Math.PI * r - text.getComputedTextLength()) / chars;
            text.style.letterSpacing = `${Math.max(gap, 0)}px`;
        });
    }

    // ============================================
    // ATAJO AL PANEL ADMIN (Ctrl + Shift + A  o  Alt + A)
    // ============================================
    document.addEventListener('keydown', e => {
        const isA = e.key === 'A' || e.key === 'a';
        if (isA && ((e.ctrlKey && e.shiftKey) || (e.altKey && !e.ctrlKey))) {
            e.preventDefault();
            window.location.href = 'admin.html';
        }
    });

    // ============================================
    // INIT
    // ============================================
    document.documentElement.classList.add('js');
    injectSprite();

    document.addEventListener('DOMContentLoaded', () => {
        initScroll();
        initMenu();
        initReveal();
        initCounters();
        initLive();
        initModals();
        initForms();
        (document.fonts?.ready || Promise.resolve()).then(fitSeals);
    });

    // API pública para los scripts de cada página
    window.Breccia = { icon, openModal, closeModal, toast, sendForm, setStatus, clearStatus, initReveal };
})();
