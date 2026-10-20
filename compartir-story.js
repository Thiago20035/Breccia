/**
 * Módulo de Generación y Compartir en Historias de Instagram (Story 9:16)
 * Breccia Inmuebles & Negocios
 */

(function () {
    // Mapa de respaldo completo con todas las propiedades estáticas
    const BRECCIA_STATIC_PROPERTIES = {
        '1': {
            id: '1',
            titulo: 'Departamento Tipo Semipiso de Tres (3) Ambientes',
            ubicacion: 'Gascón 2356, Mar del Plata',
            precio: 'USD 169.000',
            tipo: 'Venta',
            dormitorios: '2 dorm',
            banos: '2 baños',
            superficie: '69 m²',
            imagenes: ['FotosGascon2356/G35.jpg', 'FotosGascon2356/G36.jpg', 'FotosGascon2356/G37.jpg'],
            thumb: 'FotosGascon2356/G35.jpg',
            estado: 'vendida',
            destacada: true
        },
        '2': {
            id: '2',
            titulo: 'Departamento en Arenales',
            ubicacion: 'Arenales 2445, Mar del Plata',
            precio: 'USD 55.000',
            tipo: 'Venta',
            dormitorios: '1 dorm',
            banos: '1 baños',
            superficie: '40 m²',
            imagenes: ['Arenales2445/PA5.jpg', 'Arenales2445/PA8.jpg', 'Arenales2445/PA9.jpg'],
            thumb: 'Arenales2445/PA5.jpg',
            estado: 'disponible',
            destacada: false
        },
        '3': {
            id: '3',
            titulo: 'Lote con Construcción en Parque Luro',
            ubicacion: 'Francia 371, Parque Luro',
            precio: 'USD 120.000',
            tipo: 'Venta',
            dormitorios: '10x33m',
            banos: '70 m² const.',
            superficie: '330 m² lote',
            imagenes: ['Francia371/F3.jpg', 'Francia371/F4.jpg'],
            thumb: 'Francia371/F3.jpg',
            estado: 'disponible',
            destacada: false
        },
        '4': {
            id: '4',
            titulo: 'Departamento de 4 Ambientes con Gran Patio',
            ubicacion: 'San Juan y Avellaneda, Mar del Plata',
            precio: 'USD 85.000',
            tipo: 'Venta',
            dormitorios: '3 dorm',
            banos: '1 baño',
            superficie: '129 m²',
            imagenes: ['SanJuan3052/SJ8.jpg', 'SanJuan3052/SJ28.jpg', 'SanJuan3052/SJ21.jpg'],
            thumb: 'SanJuan3052/SJ8.jpg',
            estado: 'vendida',
            destacada: false
        },
        '5': {
            id: '5',
            titulo: 'Cocheras en Edificio Céntrico - 2 Unidades Disponibles',
            ubicacion: 'Corrientes entre Rivadavia y Belgrano, Centro',
            precio: 'USD 13.000 c/u',
            tipo: 'Venta',
            dormitorios: '2 cocheras',
            banos: 'Seguridad 24 hs',
            superficie: 'UF 702 / 703',
            imagenes: ['LeblonCochera/L1.jpeg', 'LeblonCochera/L3.jpeg', 'LeblonCochera/L2.jpeg'],
            thumb: 'LeblonCochera/L1.jpeg',
            estado: 'disponible',
            destacada: false
        },
        '6': {
            id: '6',
            titulo: 'ESTILO CHAUVIN | Departamentos de 2 Ambientes con Balcón y Parrilla',
            ubicacion: 'Catamarca 4455, Mar del Plata',
            precio: 'Consultar precio y financiación',
            tipo: 'Venta',
            dormitorios: '1 dorm',
            banos: '1 baño',
            superficie: 'Desde 45 m²',
            imagenes: ['Chauvin4455/C1.png', 'Chauvin4455/C2.png', 'Chauvin4455/C3.png'],
            thumb: 'Chauvin4455/C1.png',
            estado: 'disponible',
            destacada: false
        }
    };

    // Inyectar estilos autónomos para garantizar funcionamiento en cualquier HTML
    function inyectarEstilosStory() {
        if (document.getElementById('estilosStoryAutonomos')) return;
        const style = document.createElement('style');
        style.id = 'estilosStoryAutonomos';
        style.textContent = `
            #modalCompartirStory.modal-story-overlay {
                position: fixed !important;
                inset: 0 !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(10, 5, 8, 0.82) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                z-index: 999999 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 1rem !important;
                box-sizing: border-box !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            #modalCompartirStory .story-card {
                background: #ffffff !important;
                border-radius: 22px !important;
                box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45) !important;
                width: 100% !important;
                max-width: 760px !important;
                max-height: 94vh !important;
                overflow-y: auto !important;
                padding: 1.5rem !important;
                position: relative !important;
                border: 1px solid rgba(226, 232, 240, 0.9) !important;
                animation: animPopStory 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
                box-sizing: border-box !important;
            }

            @keyframes animPopStory {
                from { transform: scale(0.94); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }

            @keyframes spinStory {
                to { transform: rotate(360deg); }
            }

            #modalCompartirStory .story-header {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                padding-bottom: 0.85rem !important;
                border-bottom: 1px solid #e2e8f0 !important;
                margin-bottom: 1rem !important;
            }

            #modalCompartirStory .story-header h3 {
                display: flex !important;
                align-items: center !important;
                gap: 10px !important;
                font-size: 1.25rem !important;
                font-weight: 700 !important;
                color: #0f172a !important;
                margin: 0 !important;
            }

            #modalCompartirStory .story-close-btn {
                background: #f1f5f9 !important;
                border: none !important;
                font-size: 1.6rem !important;
                color: #64748b !important;
                cursor: pointer !important;
                line-height: 1 !important;
                width: 36px !important;
                height: 36px !important;
                border-radius: 50% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.2s ease !important;
            }
            #modalCompartirStory .story-close-btn:hover {
                background: #e2e8f0 !important;
                color: #0f172a !important;
            }

            #modalCompartirStory .story-layout {
                display: flex !important;
                gap: 1.5rem !important;
                align-items: center !important;
                justify-content: center !important;
            }

            @media (max-width: 720px) {
                #modalCompartirStory .story-layout {
                    flex-direction: column !important;
                }
                #modalCompartirStory .story-card {
                    padding: 1rem !important;
                    max-height: 96vh !important;
                }
            }

            #modalCompartirStory .story-preview-box {
                flex: 0 0 auto !important;
                width: 220px !important;
                height: 391px !important;
                background: #111 !important;
                border-radius: 18px !important;
                overflow: hidden !important;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4) !important;
                border: 3px solid #1e1e1e !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                position: relative !important;
            }

            @media (max-width: 480px) {
                #modalCompartirStory .story-preview-box {
                    width: 170px !important;
                    height: 302px !important;
                }
            }

            #modalCompartirStory .story-preview-box canvas {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                display: block !important;
            }

            #modalCompartirStory .story-buttons-list {
                flex: 1 !important;
                display: flex !important;
                flex-direction: column !important;
                gap: 0.75rem !important;
                width: 100% !important;
            }

            #modalCompartirStory .story-action-item {
                display: flex !important;
                align-items: center !important;
                gap: 12px !important;
                padding: 0.85rem 1.15rem !important;
                border-radius: 14px !important;
                border: 1.5px solid #e2e8f0 !important;
                background: #ffffff !important;
                cursor: pointer !important;
                font-size: 0.92rem !important;
                font-weight: 600 !important;
                color: #1e293b !important;
                transition: all 0.2s ease !important;
                text-align: left !important;
                text-decoration: none !important;
                box-sizing: border-box !important;
                width: 100% !important;
            }

            #modalCompartirStory .story-action-item:hover {
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08) !important;
            }

            #modalCompartirStory .btn-ig-gradient {
                background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045) !important;
                color: #ffffff !important;
                border: none !important;
                box-shadow: 0 5px 18px rgba(225, 48, 108, 0.35) !important;
            }
            #modalCompartirStory .btn-ig-gradient:hover {
                box-shadow: 0 8px 24px rgba(225, 48, 108, 0.5) !important;
            }

            #modalCompartirStory .btn-wsp-green {
                background: #25d366 !important;
                color: #ffffff !important;
                border-color: #25d366 !important;
                box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25) !important;
            }
            #modalCompartirStory .btn-wsp-green:hover {
                background: #20bd5a !important;
            }

            #modalCompartirStory .story-toast {
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%);
                background: #0f172a;
                color: #ffffff;
                padding: 12px 24px;
                border-radius: 50px;
                font-size: 0.9rem;
                font-weight: 600;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                z-index: 1000000;
                display: flex;
                align-items: center;
                gap: 8px;
                animation: toastIn 0.3s ease;
            }
            @keyframes toastIn {
                from { opacity: 0; transform: translate(-50%, 20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
        `;
        document.head.appendChild(style);
    }

    // Helper: Toast de notificación
    function mostrarToast(mensaje, duracion = 3500) {
        const toast = document.createElement('div');
        toast.className = 'story-toast';
        toast.innerHTML = `<span>✨</span><span>${mensaje}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duracion);
    }

    // Inyectar modal en el DOM si no existe
    function asegurarModalCompartir() {
        inyectarEstilosStory();

        let modal = document.getElementById('modalCompartirStory');
        if (modal) return modal;

        modal = document.createElement('div');
        modal.id = 'modalCompartirStory';
        modal.className = 'modal-story-overlay';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="story-card">
                <div class="story-header">
                    <h3>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d946ef" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        <span>Compartir en Historia de Instagram</span>
                    </h3>
                    <button class="story-close-btn" id="btnCerrarModalStory" aria-label="Cerrar">&times;</button>
                </div>
                <div style="padding: 0.5rem 0;">
                    <p style="color: #64748b; font-size: 0.88rem; margin: 0 0 1.1rem 0; line-height: 1.45;">
                        Placa vertical optimizada en alta definición (1080x1920 / 9:16) con diseño corporativo Breccia, lista para Instagram Stories, Estados de WhatsApp o enviar a clientes.
                    </p>
                    <div class="story-layout">
                        <div class="story-preview-box">
                            <canvas id="storyCanvas" width="1080" height="1920"></canvas>
                            <div id="storyLoading" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; gap: 10px; font-size: 0.85rem;">
                                <div style="width: 32px; height: 32px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #f2cdd7; border-radius: 50%; animation: spinStory 0.8s linear infinite;"></div>
                                <span>Generando placa...</span>
                            </div>
                        </div>
                        <div class="story-buttons-list">
                            <!-- Botón 1: Instagram Principal -->
                            <button id="btnCompartirNativoStory" class="story-action-item btn-ig-gradient" type="button">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                <div>
                                    <div style="font-weight: 700; font-size: 0.98rem;">Publicar en Historia de Instagram</div>
                                    <small style="opacity: 0.92; font-size: 0.74rem; display: block; margin-top: 2px;">Descarga la placa vertical y abre Instagram</small>
                                </div>
                            </button>

                            <!-- Botón 2: Descargar Placa -->
                            <button id="btnDescargarStory" class="story-action-item" type="button" style="border-color: #6b2c3e; color: #6b2c3e;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                <div>
                                    <div style="font-weight: 700;">Descargar Historia (1080x1920)</div>
                                    <small style="color: #64748b; font-size: 0.74rem; display: block; margin-top: 2px;">Guardar imagen PNG en alta resolución</small>
                                </div>
                            </button>

                            <!-- Botón 3: WhatsApp -->
                            <button id="btnCompartirWspStory" class="story-action-item btn-wsp-green" type="button">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                                <div>
                                    <div style="font-weight: 700;">Compartir en WhatsApp</div>
                                    <small style="opacity: 0.92; font-size: 0.74rem; display: block; margin-top: 2px;">Enviar ficha comercial con enlace web</small>
                                </div>
                            </button>

                            <!-- Botón 4: Copiar Enlace Directo -->
                            <button id="btnCopiarLinkStory" class="story-action-item" type="button">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                <div>
                                    <div style="font-weight: 700;">Copiar Enlace Directo</div>
                                    <small style="color: #64748b; font-size: 0.74rem; display: block; margin-top: 2px;">Para pegar en el Sticker de Enlace de Instagram</small>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#btnCerrarModalStory').onclick = () => {
            modal.style.display = 'none';
        };
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        return modal;
    }

    // Helper: envolver texto en múltiples líneas para Canvas
    function envolverTexto(ctx, text, x, y, maxWidth, lineHeight, maxLines = 2) {
        if (!text) return;
        const words = text.split(' ');
        let line = '';
        let linesCount = 0;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line.trim(), x, y);
                line = words[n] + ' ';
                y += lineHeight;
                linesCount++;
                if (linesCount >= maxLines - 1 && n < words.length - 1) {
                    line = words.slice(n).join(' ');
                    while (ctx.measureText(line + '...').width > maxWidth && line.length > 0) {
                        line = line.substring(0, line.length - 1);
                    }
                    ctx.fillText(line.trim() + '...', x, y);
                    return;
                }
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line.trim(), x, y);
    }

    // Helper: rectángulo con bordes redondeados
    function drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    // Dibujar la placa vertical (1080x1920) — estilo editorial Breccia:
    // marfil + bordó, foto en arco, sello con monograma, Cormorant + Inter.
    async function dibujarPlacaCanvas(canvas, prop) {
        const ctx = canvas.getContext('2d');
        const W = 1080;
        const H = 1920;
        const C = {
            ivory: '#fbf7f4', paper: '#f4ece8', ink: '#1a1214', muted: '#7a6c70',
            brand: '#6b2c3e', brand2: '#8b3a4f', deep: '#34131d', rose: '#f2cdd7',
            line: 'rgba(107, 44, 62, 0.22)'
        };
        const SERIF = '"Cormorant Garamond", Garamond, "Times New Roman", serif';
        const SANS = '"Inter", "Segoe UI", Arial, sans-serif';

        // Esperar las tipografías del sitio (si la página las tiene cargadas)
        try {
            await Promise.all([
                document.fonts.load(`600 80px ${SERIF}`),
                document.fonts.load(`italic 500 60px ${SERIF}`),
                document.fonts.load(`500 28px ${SANS}`),
                document.fonts.load(`600 24px ${SANS}`)
            ]);
        } catch (e) { /* sigue con las alternativas */ }

        const estado = prop.estado || 'disponible';
        const cerrada = ['vendida', 'alquilada', 'reservada'].includes(estado);
        const ESTADO_TXT = { vendida: 'Vendida', alquilada: 'Alquilada', reservada: 'Reservada' };

        // Texto con espaciado entre letras (tracking), alineado al centro o a la izquierda
        function tracked(text, x, y, spacing, align = 'center') {
            const chars = [...text];
            const widths = chars.map(ch => ctx.measureText(ch).width);
            const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
            let cx = align === 'center' ? x - total / 2 : x;
            const prev = ctx.textAlign;
            ctx.textAlign = 'left';
            chars.forEach((ch, i) => { ctx.fillText(ch, cx, y); cx += widths[i] + spacing; });
            ctx.textAlign = prev;
            return total;
        }

        // Ajusta el tamaño de fuente hasta que el texto entre en maxWidth
        function fitFont(text, weight, family, size, minSize, maxWidth) {
            let s = size;
            do { ctx.font = `${weight} ${s}px ${family}`; s -= 2; } while (ctx.measureText(text).width > maxWidth && s >= minSize);
            return s + 2;
        }

        // ── 1. Fondo marfil con resplandor bordó muy suave ─────────────────
        ctx.fillStyle = C.ivory;
        ctx.fillRect(0, 0, W, H);
        const glow = ctx.createRadialGradient(W * 0.85, 120, 20, W * 0.85, 120, 820);
        glow.addColorStop(0, 'rgba(139, 58, 79, 0.10)');
        glow.addColorStop(1, 'rgba(139, 58, 79, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // Marco interior fino
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, 40, 40, W - 80, H - 80, 34);
        ctx.stroke();

        // ── 2. Marca ───────────────────────────────────────────────────────
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = C.brand;
        ctx.font = `600 64px ${SERIF}`;
        tracked('BRECCIA', W / 2, 232, 22);
        ctx.fillStyle = C.muted;
        ctx.font = `600 19px ${SANS}`;
        tracked('INMUEBLES Y NEGOCIOS', W / 2, 274, 7);

        // ── 3. Foto en arco ────────────────────────────────────────────────
        const ax = 110, ay = 320, aw = W - 220, ah = 830;
        const r = aw / 2;
        function archPath() {
            ctx.beginPath();
            ctx.moveTo(ax, ay + ah);
            ctx.lineTo(ax, ay + r);
            ctx.arc(ax + r, ay + r, r, Math.PI, 0);
            ctx.lineTo(ax + aw, ay + ah - 26);
            ctx.quadraticCurveTo(ax + aw, ay + ah, ax + aw - 26, ay + ah);
            ctx.lineTo(ax + 26, ay + ah);
            ctx.quadraticCurveTo(ax, ay + ah, ax, ay + ah - 26);
            ctx.closePath();
        }

        const fotoUrl = prop.thumb || (prop.imagenes && prop.imagenes.length > 0 ? prop.imagenes[0] : '');
        ctx.save();
        archPath();
        ctx.clip();
        ctx.fillStyle = C.paper;
        ctx.fillRect(ax, ay, aw, ah);
        if (fotoUrl) {
            try {
                const img = await new Promise((resolve, reject) => {
                    const im = new Image();
                    if (/^https?:\/\//i.test(fotoUrl) && !fotoUrl.includes(window.location.hostname)) im.crossOrigin = 'anonymous';
                    im.onload = () => resolve(im);
                    im.onerror = reject;
                    im.src = fotoUrl;
                });
                const ratio = Math.max(aw / img.width, ah / img.height);
                const dw = img.width * ratio, dh = img.height * ratio;
                if (cerrada) ctx.filter = 'grayscale(0.85) brightness(0.92)';
                ctx.drawImage(img, ax + (aw - dw) / 2, ay + (ah - dh) * 0.45, dw, dh);
                ctx.filter = 'none';
            } catch (e) {
                ctx.fillStyle = C.brand;
                ctx.font = `600 120px ${SERIF}`;
                ctx.textAlign = 'center';
                ctx.fillText('B', ax + aw / 2, ay + ah / 2 + 40);
            }
        }
        // Velado bordó inferior para dar profundidad
        const veil = ctx.createLinearGradient(0, ay + ah * 0.55, 0, ay + ah);
        veil.addColorStop(0, 'rgba(52, 19, 29, 0)');
        veil.addColorStop(1, 'rgba(52, 19, 29, 0.55)');
        ctx.fillStyle = veil;
        ctx.fillRect(ax, ay, aw, ah);

        // Etiquetas sobre la foto
        ctx.font = `600 20px ${SANS}`;
        const etiquetas = [];
        if (prop.destacada) etiquetas.push({ t: '★  DESTACADA', bg: C.ivory, fg: C.brand });
        etiquetas.push({ t: (prop.tipo || 'Venta').toUpperCase(), bg: C.brand, fg: '#ffffff' });
        let ex = ax + 46;
        const ey = ay + ah - 92;
        etiquetas.forEach(e => {
            const tw = [...e.t].reduce((a, ch) => a + ctx.measureText(ch).width + 4, -4) + 52;
            ctx.fillStyle = e.bg;
            drawRoundRect(ctx, ex, ey, tw, 50, 25);
            ctx.fill();
            ctx.fillStyle = e.fg;
            tracked(e.t, ex + 26, ey + 33, 4, 'left');
            ex += tw + 12;
        });

        // Estado cerrado: placa central
        if (cerrada) {
            const label = ESTADO_TXT[estado].toUpperCase();
            ctx.font = `600 30px ${SANS}`;
            const lw = [...label].reduce((a, ch) => a + ctx.measureText(ch).width + 12, -12) + 110;
            const lx = ax + (aw - lw) / 2, ly = ay + ah / 2 - 20;
            ctx.fillStyle = 'rgba(251, 247, 244, 0.95)';
            drawRoundRect(ctx, lx, ly, lw, 80, 40);
            ctx.fill();
            ctx.fillStyle = C.brand;
            tracked(label, W / 2, ly + 51, 12);
        }
        ctx.restore();

        // Contorno del arco
        ctx.strokeStyle = 'rgba(107, 44, 62, 0.18)';
        ctx.lineWidth = 2;
        archPath();
        ctx.stroke();

        // ── 4. Sello circular con monograma ────────────────────────────────
        const sx = ax + aw - 110, sy = ay + ah, sr = 96;
        ctx.fillStyle = C.ivory;
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = C.line; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.stroke();
        const sello = 'ADMINISTRACIÓN · INMOBILIARIA · MAR DEL PLATA · ';
        ctx.font = `600 15px ${SANS}`;
        ctx.fillStyle = C.brand;
        ctx.textAlign = 'center';
        const step = (Math.PI * 2) / [...sello].length;
        [...sello].forEach((ch, i) => {
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(-Math.PI / 2 + i * step);
            ctx.fillText(ch, 0, -sr + 30);
            ctx.restore();
        });
        ctx.fillStyle = C.brand;
        ctx.beginPath(); ctx.arc(sx, sy, 44, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = `600 54px ${SERIF}`;
        ctx.textBaseline = 'middle';
        ctx.fillText('B', sx, sy + 2);
        ctx.textBaseline = 'alphabetic';

        // ── 5. Información ─────────────────────────────────────────────────
        ctx.textAlign = 'center';
        const cat = prop.categoria ? String(prop.categoria).charAt(0).toUpperCase() + String(prop.categoria).slice(1) : 'Propiedad';
        ctx.fillStyle = C.brand2;
        ctx.font = `600 21px ${SANS}`;
        tracked(`${cat.toUpperCase()}  ·  MAR DEL PLATA`, W / 2, 1262, 6);

        // Título: hasta 2 líneas, con "…" solo si de verdad no entra
        function wrapLines(text, maxWidth, maxLines) {
            const words = text.split(/\s+/);
            const lines = [];
            let line = '';
            words.forEach(w => {
                const test = line ? `${line} ${w}` : w;
                if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
                else line = test;
            });
            if (line) lines.push(line);
            if (lines.length > maxLines) {
                const kept = lines.slice(0, maxLines);
                let last = kept[maxLines - 1];
                while (ctx.measureText(`${last}…`).width > maxWidth && last.length) last = last.slice(0, -1).trimEnd();
                kept[maxLines - 1] = `${last}…`;
                return kept;
            }
            return lines;
        }
        ctx.fillStyle = C.ink;
        const titulo = prop.titulo || 'Propiedad exclusiva';
        ctx.font = `600 66px ${SERIF}`;
        let lineas = wrapLines(titulo, 860, 2);
        if (lineas.length === 2 && ctx.measureText(lineas[1]).width > 860 * 0.98) {
            ctx.font = `600 58px ${SERIF}`;
            lineas = wrapLines(titulo, 860, 2);
        }
        let y = 1340;
        lineas.forEach(l => { ctx.fillText(l, W / 2, y); y += 72; });

        // Ubicación
        y += 8;
        ctx.fillStyle = C.muted;
        ctx.font = `500 27px ${SANS}`;
        ctx.fillText(prop.ubicacion || 'Mar del Plata, Buenos Aires', W / 2, y);

        // Ornamento: línea — rombo — línea
        const oy = y + 46;
        ctx.strokeStyle = C.line; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(W / 2 - 150, oy); ctx.lineTo(W / 2 - 18, oy); ctx.moveTo(W / 2 + 18, oy); ctx.lineTo(W / 2 + 150, oy); ctx.stroke();
        ctx.fillStyle = C.brand;
        ctx.save(); ctx.translate(W / 2, oy); ctx.rotate(Math.PI / 4); ctx.fillRect(-6, -6, 12, 12); ctx.restore();

        // Precio (o estado). Cifras en Inter fina (Cormorant usa números
        // de estilo antiguo y canvas no permite cambiarlos); texto en serif.
        const precio = cerrada ? `${ESTADO_TXT[estado]} por Breccia` : (prop.precio || 'Consultar');
        const py = oy + 100;
        ctx.fillStyle = cerrada ? C.muted : C.brand;
        if (!cerrada && /\d/.test(precio)) fitFont(precio, '300', SANS, 86, 44, 880);
        else fitFont(precio, cerrada ? 'italic 500' : '600', SERIF, 92, 48, 880);
        ctx.fillText(precio, W / 2, py);

        // Especificaciones separadas por líneas finas
        const specs = [prop.dormitorios, prop.banos, prop.superficie].filter(Boolean).map(s => String(s).toUpperCase());
        if (specs.length) {
            ctx.font = `600 21px ${SANS}`;
            const gap = 64;
            const widths = specs.map(s => [...s].reduce((a, ch) => a + ctx.measureText(ch).width + 4, -4));
            const total = widths.reduce((a, b) => a + b, 0) + gap * (specs.length - 1);
            let x = W / 2 - total / 2;
            ctx.fillStyle = C.ink;
            specs.forEach((s, i) => {
                tracked(s, x, py + 72, 4, 'left');
                x += widths[i];
                if (i < specs.length - 1) {
                    ctx.strokeStyle = C.line; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(x + gap / 2, py + 48); ctx.lineTo(x + gap / 2, py + 80); ctx.stroke();
                    x += gap;
                }
            });
        }

        // ── 6. Franja bordó de contacto ────────────────────────────────────
        const by = 1742, bh = 118;
        const band = ctx.createLinearGradient(80, 0, W - 80, 0);
        band.addColorStop(0, C.deep);
        band.addColorStop(1, C.brand);
        ctx.fillStyle = band;
        drawRoundRect(ctx, 80, by, W - 160, bh, 59);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
        ctx.font = `600 18px ${SANS}`;
        tracked('CONSULTÁ POR MENSAJE DIRECTO O WHATSAPP', W / 2, by + 46, 4);
        ctx.fillStyle = '#ffffff';
        ctx.font = `500 30px ${SANS}`;
        ctx.fillText('@breccianegocios  ·  breccianegocios.com.ar', W / 2, by + 88);
    }

    // ABRIR MODAL COMPARTIR
    window.abrirModalCompartir = async function (id, esEstatica) {
        let prop = null;
        const strId = String(id);

        // 1. Si se pasó directamente el objeto de la propiedad
        if (typeof esEstatica === 'object' && esEstatica !== null) {
            prop = { ...esEstatica };
        } else {
            // 2. Datos vivos del sitio (inmobiliaria.js) o del panel (admin.js)
            if (window.propiedadesDetalle && window.propiedadesDetalle[strId]) {
                prop = { ...window.propiedadesDetalle[strId] };
            }
            if (!prop && window.STATIC_PROPERTIES_MAP && window.STATIC_PROPERTIES_MAP[strId]) {
                prop = { ...window.STATIC_PROPERTIES_MAP[strId] };
            }

            // 3. Diccionario local estático (respaldo)
            if (!prop && BRECCIA_STATIC_PROPERTIES[strId]) {
                prop = { ...BRECCIA_STATIC_PROPERTIES[strId] };
            }

            // 4. Buscar en IndexedDB
            if (!prop && window.propiedadesDB) {
                try {
                    prop = await window.propiedadesDB.getById(id);
                } catch (e) {}
            }

            // 5. Fallback del DOM (inspeccionar la tarjeta HTML)
            if (!prop) {
                const cardEl = document.querySelector(`.propiedad-card[data-propiedad-id="${strId}"]`);
                if (cardEl) {
                    const imgEl = cardEl.querySelector('.propiedad-carousel-item');
                    let bgImg = '';
                    if (imgEl && imgEl.style.backgroundImage) {
                        const m = imgEl.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
                        if (m) bgImg = m[1];
                    }
                    prop = {
                        titulo: cardEl.querySelector('h3')?.textContent?.trim() || 'Propiedad Breccia',
                        ubicacion: cardEl.querySelector('.propiedad-ubicacion span:last-child')?.textContent?.trim() || 'Mar del Plata',
                        precio: cardEl.querySelector('.propiedad-precio')?.textContent?.trim() || 'Consultar',
                        tipo: cardEl.querySelector('.propiedad-badge')?.textContent?.trim() || 'Venta',
                        thumb: bgImg,
                        imagenes: bgImg ? [bgImg] : [],
                        destacada: cardEl.classList.contains('es-destacada')
                    };
                }
            }
        }

        // Si aún no se encontró, fallback genérico
        if (!prop) {
            prop = {
                titulo: 'Propiedad en Mar del Plata',
                ubicacion: 'Mar del Plata, Buenos Aires',
                precio: 'Consultar',
                tipo: 'Venta',
                imagenes: ['favicon-V3.ico']
            };
        }

        // Combinar con overrides y estados de localStorage
        try {
            const overrides = JSON.parse(localStorage.getItem('breccia_estaticas_overrides') || '{}');
            const estados = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
            const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');

            if (overrides[strId]) Object.assign(prop, overrides[strId]);
            if (estados[strId]) prop.estado = estados[strId];
            if (destacadas[strId] !== undefined) prop.destacada = !!destacadas[strId];
        } catch (e) {}

        const modal = asegurarModalCompartir();
        const canvas = modal.querySelector('#storyCanvas');
        const loadingEl = modal.querySelector('#storyLoading');

        modal.style.display = 'flex';
        loadingEl.style.display = 'flex';

        // Dibujar en el canvas
        try {
            await dibujarPlacaCanvas(canvas, prop);
        } catch (err) {
            console.error('Error al dibujar placa Canvas:', err);
        } finally {
            loadingEl.style.display = 'none';
        }

        const safeTitle = (prop.titulo || 'propiedad').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const urlPropiedad = `${window.location.origin}${window.location.pathname.replace('admin.html', 'inmobiliaria.html')}#prop-${id}`;

        // Generar y descargar la imagen
        const ejecutarDescargaStory = () => {
            try {
                const dataUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `historia_breccia_${safeTitle}.png`;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => a.remove(), 100);
                return true;
            } catch (e) {
                console.error('Error en descarga de placa:', e);
                return false;
            }
        };

        // 1. Botón Descargar Story
        modal.querySelector('#btnDescargarStory').onclick = () => {
            ejecutarDescargaStory();
            mostrarToast('📥 ¡Historia descargada en alta resolución!');
        };

        // 2. Botón Principal: Instagram
        modal.querySelector('#btnCompartirNativoStory').onclick = async () => {
            // Paso A: Descargar la imagen de inmediato para tenerla en la galería / fotos
            ejecutarDescargaStory();

            // Paso B: Intentar Web Share API con archivo si el dispositivo lo soporta
            let compartioPorShare = false;
            try {
                if (canvas.toBlob && navigator.canShare) {
                    const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
                    if (blob) {
                        const file = new File([blob], `story_${safeTitle}.png`, { type: 'image/png' });
                        if (navigator.canShare({ files: [file] })) {
                            await navigator.share({
                                files: [file],
                                title: `Breccia Inmuebles - ${prop.titulo}`,
                                text: `¡Mirá esta propiedad en Breccia Inmuebles! ${prop.titulo} - ${prop.precio}`
                            });
                            compartioPorShare = true;
                            return;
                        }
                    }
                }
            } catch (e) {
                if (e.name === 'AbortError') return;
                console.log('Web Share no disponible o cancelado, procediendo con apertura directa de Instagram');
            }

            // Paso C: Si no se usó Share Sheet, abrir Instagram directamente
            mostrarToast('📸 Placa guardada en tus fotos. Abriendo Instagram...');
            
            // En dispositivos móviles intentar abrir la app de Instagram
            const esMovil = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (esMovil) {
                // Intentar deep link a la cámara de historias de Instagram
                setTimeout(() => {
                    window.location.href = 'instagram://story-camera';
                    // Fallback a la web si no tiene la app instalada
                    setTimeout(() => {
                        window.open('https://www.instagram.com/', '_blank');
                    }, 1200);
                }, 200);
            } else {
                // En PC de escritorio abrir Instagram en nueva pestaña
                setTimeout(() => {
                    window.open('https://www.instagram.com/', '_blank');
                }, 300);
            }
        };

        // 3. Botón WhatsApp
        modal.querySelector('#btnCompartirWspStory').onclick = () => {
            const msg = encodeURIComponent(
                `🏢 *BRECCIA INMUEBLES & NEGOCIOS*\n\n` +
                `*${prop.titulo}*\n` +
                `📍 Ubicación: ${prop.ubicacion || 'Mar del Plata'}\n` +
                `💰 Precio: ${prop.precio || 'Consultar'}\n` +
                `📌 Operación: ${prop.tipo || 'Venta'}\n` +
                (prop.estado && prop.estado !== 'disponible' ? `⚠️ Estado: *${prop.estado.toUpperCase()}*\n` : '') +
                `\n🌐 Ver ficha completa aquí:\n${urlPropiedad}`
            );
            window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
        };

        // 4. Copiar Enlace
        modal.querySelector('#btnCopiarLinkStory').onclick = async () => {
            try {
                await navigator.clipboard.writeText(urlPropiedad);
                mostrarToast('📋 ¡Enlace copiado! Pegalo en el Sticker de Instagram');
            } catch (e) {
                prompt('Copiá este enlace para Instagram:', urlPropiedad);
            }
        };
    };
})();
