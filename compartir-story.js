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
            titulo: 'Departamento Semipiso de Tres Ambientes',
            ubicacion: 'Sarmiento 2333, Mar del Plata',
            precio: 'USD 135.000',
            tipo: 'Venta',
            dormitorios: '2 dorm',
            banos: '1 baño',
            superficie: '57 m²',
            imagenes: ['Sarmiento2333/SAR1.jpeg', 'Sarmiento2333/SAR2.jpeg'],
            thumb: 'Sarmiento2333/SAR1.jpeg',
            estado: 'vendida',
            destacada: false
        },
        '5': {
            id: '5',
            titulo: 'Cochera Fija en Edificio Histórico',
            ubicacion: 'Corrientes 2048, Mar del Plata',
            precio: 'USD 18.000',
            tipo: 'Venta',
            dormitorios: '1 vehículo',
            banos: 'Cubierta',
            superficie: '12.5 m²',
            imagenes: ['Corrientes2048/C1.jpg', 'Corrientes2048/C2.jpg'],
            thumb: 'Corrientes2048/C1.jpg',
            estado: 'disponible',
            destacada: false
        },
        '6': {
            id: '6',
            titulo: 'Departamento Semipiso Dos Ambientes - ESTILO CHAUVIN',
            ubicacion: 'Matheu 3800, Chauvín, Mar del Plata',
            precio: 'USD 130.000',
            tipo: 'Venta',
            dormitorios: '1 dorm',
            banos: '1 baño',
            superficie: '50 m²',
            imagenes: ['Chauvin4455/CH1.jpg', 'Chauvin4455/CH2.jpg', 'Chauvin4455/CH3.jpg'],
            thumb: 'Chauvin4455/CH1.jpg',
            estado: 'disponible',
            destacada: true
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
                font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
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
                                <div style="width: 32px; height: 32px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #c5a059; border-radius: 50%; animation: spinStory 0.8s linear infinite;"></div>
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
                            <button id="btnDescargarStory" class="story-action-item" type="button" style="border-color: #c5a059; color: #855d14;">
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

    // Dibujar la placa vertical (1080x1920)
    async function dibujarPlacaCanvas(canvas, prop) {
        const ctx = canvas.getContext('2d');
        const W = 1080;
        const H = 1920;

        // 1. Fondo degradado de lujo (Bordeaux a negro)
        const bgGrad = ctx.createLinearGradient(0, 0, W, H);
        bgGrad.addColorStop(0, '#2d0f19');
        bgGrad.addColorStop(0.45, '#19080e');
        bgGrad.addColorStop(1, '#0c0407');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Resplandor dorado circular en la parte superior
        const glowGrad = ctx.createRadialGradient(W / 2, 550, 40, W / 2, 550, 650);
        glowGrad.addColorStop(0, 'rgba(197, 160, 89, 0.15)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, W, H);

        // Marco perimetral dorado elegante
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.3)';
        ctx.lineWidth = 3;
        ctx.strokeRect(36, 36, W - 72, H - 72);

        // 2. Cabecera de Marca
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 50px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText('BRECCIA', W / 2, 130);

        ctx.fillStyle = '#c5a059';
        ctx.font = '600 22px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText('INMUEBLES & NEGOCIOS', W / 2, 172);

        // Línea divisoria dorada
        const lineGrad = ctx.createLinearGradient(W / 2 - 220, 0, W / 2 + 220, 0);
        lineGrad.addColorStop(0, 'rgba(197, 160, 89, 0)');
        lineGrad.addColorStop(0.5, 'rgba(197, 160, 89, 0.85)');
        lineGrad.addColorStop(1, 'rgba(197, 160, 89, 0)');
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W / 2 - 220, 202);
        ctx.lineTo(W / 2 + 220, 202);
        ctx.stroke();

        // 3. Badges horizontales (Operación y Destacada)
        let badges = [];
        if (prop.destacada) {
            badges.push({ text: '⭐ DESTACADA', bg: '#c5a059', color: '#1e1418', border: '#dfba73' });
        }
        badges.push({
            text: (prop.tipo || 'Venta').toUpperCase(),
            bg: prop.tipo === 'Alquiler' ? '#1e40af' : '#6b2c3e',
            color: '#ffffff',
            border: 'rgba(255,255,255,0.25)'
        });

        // Calcular ancho y dibujar badges centrados
        ctx.font = 'bold 22px "Outfit", "Segoe UI", sans-serif';
        let totalBadgesW = badges.reduce((acc, b) => acc + ctx.measureText(b.text).width + 48, 0) + (badges.length - 1) * 16;
        let startBadgeX = (W - totalBadgesW) / 2;
        badges.forEach(b => {
            const bWidth = ctx.measureText(b.text).width + 48;
            ctx.fillStyle = b.bg;
            drawRoundRect(ctx, startBadgeX, 230, bWidth, 44, 22);
            ctx.fill();
            ctx.strokeStyle = b.border;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.fillStyle = b.color;
            ctx.textAlign = 'center';
            ctx.fillText(b.text, startBadgeX + bWidth / 2, 260);
            startBadgeX += bWidth + 16;
        });

        // 4. Imagen de la propiedad
        const imgX = 80;
        const imgY = 300;
        const imgW = 920;
        const imgH = 760;
        const imgRadius = 32;

        let fotoUrl = prop.thumb || (prop.imagenes && prop.imagenes.length > 0 ? prop.imagenes[0] : 'favicon-V3.ico');

        // Cargar imagen de manera segura
        try {
            await new Promise((resolve) => {
                const img = new Image();
                if (/^https?:\/\//i.test(fotoUrl) && !fotoUrl.includes(window.location.hostname)) {
                    img.crossOrigin = 'anonymous';
                }
                img.onload = () => {
                    ctx.save();
                    drawRoundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
                    ctx.clip();

                    const hRatio = imgW / img.width;
                    const vRatio = imgH / img.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const centerShiftX = (imgW - img.width * ratio) / 2;
                    const centerShiftY = (imgH - img.height * ratio) / 2;

                    ctx.drawImage(img, 0, 0, img.width, img.height,
                        imgX + centerShiftX, imgY + centerShiftY, img.width * ratio, img.height * ratio);

                    // Si está vendida o alquilada, overlay oscuro sobre la imagen
                    const est = prop.estado || 'disponible';
                    if (est === 'vendida' || est === 'alquilada') {
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
                        ctx.fillRect(imgX, imgY, imgW, imgH);
                    }

                    ctx.restore();

                    // Marco fino alrededor de la foto
                    ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
                    ctx.lineWidth = 3;
                    drawRoundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
                    ctx.stroke();

                    resolve();
                };
                img.onerror = () => {
                    // Fallback con degradado si la foto falla
                    ctx.fillStyle = '#2d1420';
                    drawRoundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
                    ctx.fill();
                    ctx.fillStyle = '#c5a059';
                    ctx.font = 'bold 36px "Outfit", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('BRECCIA INMUEBLES', imgX + imgW / 2, imgY + imgH / 2);
                    resolve();
                };
                img.src = fotoUrl;
            });
        } catch (e) {
            console.warn('Error cargando imagen para placa Story:', e);
        }

        // 5. Cartel / Ribbon diagonal si está Vendida / Alquilada / Reservada
        const estadoProp = prop.estado || 'disponible';
        if (estadoProp && estadoProp !== 'disponible') {
            const configRibbon = {
                vendida: { texto: 'VENDIDA', bg: '#ef4444' },
                alquilada: { texto: 'ALQUILADA', bg: '#3b82f6' },
                reservada: { texto: 'RESERVADA', bg: '#f59e0b' }
            }[estadoProp] || { texto: estadoProp.toUpperCase(), bg: '#ef4444' };

            ctx.save();
            ctx.beginPath();
            drawRoundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
            ctx.clip();

            ctx.translate(imgX + imgW - 130, imgY + 80);
            ctx.rotate((38 * Math.PI) / 180);
            ctx.fillStyle = configRibbon.bg;
            ctx.fillRect(-200, -28, 400, 56);

            ctx.fillStyle = '#ffffff';
            ctx.font = '900 24px "Outfit", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(configRibbon.texto, 0, 8);
            ctx.restore();
        }

        // 6. Tarjeta Principal con Información y Precio
        const cardY = 1090;
        const cardH = 510;
        const cardW = 920;
        const cardX = 80;

        ctx.fillStyle = 'rgba(20, 10, 14, 0.88)';
        drawRoundRect(ctx, cardX, cardY, cardW, cardH, 28);
        ctx.fill();

        ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX, cardY, cardW, cardH, 28);
        ctx.stroke();

        // Título de la propiedad
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px "Outfit", "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        envolverTexto(ctx, prop.titulo || 'Propiedad Exclusiva', W / 2, cardY + 70, 840, 52, 2);

        // Ubicación
        ctx.fillStyle = '#c5a059';
        ctx.font = '600 28px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText(`📍 ${prop.ubicacion || 'Mar del Plata, Buenos Aires'}`, W / 2, cardY + 185);

        // Precio
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 68px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText(prop.precio || 'Consultar', W / 2, cardY + 275);

        // Especificaciones
        let specs = [];
        if (prop.dormitorios) specs.push(prop.dormitorios);
        if (prop.banos) specs.push(prop.banos);
        if (prop.superficie) specs.push(prop.superficie);

        if (specs.length > 0) {
            ctx.font = '600 24px "Outfit", "Segoe UI", sans-serif';
            let specsTotalW = specs.reduce((acc, s) => acc + ctx.measureText(s).width + 36, 0) + (specs.length - 1) * 14;
            let startSpecX = (W - specsTotalW) / 2;
            specs.forEach(s => {
                const sW = ctx.measureText(s).width + 36;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
                drawRoundRect(ctx, startSpecX, cardY + 340, sW, 46, 12);
                ctx.fill();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.fillStyle = '#e2e8f0';
                ctx.textAlign = 'center';
                ctx.fillText(s, startSpecX + sW / 2, cardY + 372);
                startSpecX += sW + 14;
            });
        }

        // Mensaje de estado
        if (estadoProp === 'vendida') {
            ctx.fillStyle = '#f43f5e';
            ctx.font = 'bold 24px "Outfit", "Segoe UI", sans-serif';
            ctx.fillText('¡PROPIEDAD VENDIDA POR BRECCIA!', W / 2, cardY + 445);
        } else {
            ctx.fillStyle = '#c5a059';
            ctx.font = '600 24px "Outfit", "Segoe UI", sans-serif';
            ctx.fillText('⭐ EXCELENTE OPORTUNIDAD', W / 2, cardY + 445);
        }

        // 7. Pie de Contacto e Instagram
        const footerY = 1660;
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 30px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText('📲 Consultanos por Mensaje Directo o WhatsApp', W / 2, footerY);

        ctx.fillStyle = '#c5a059';
        ctx.font = 'bold 26px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText('Instagram: @breccianegocios • breccianegocios.com.ar', W / 2, footerY + 50);

        // Indicador de Sticker de enlace
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        drawRoundRect(ctx, (W - 540) / 2, footerY + 90, 540, 54, 27);
        ctx.fill();
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 22px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText('🔗 Tocá el sticker de enlace para ver más', W / 2, footerY + 125);
    }

    // ABRIR MODAL COMPARTIR
    window.abrirModalCompartir = async function (id, esEstatica) {
        let prop = null;
        const strId = String(id);

        // 1. Si se pasó directamente el objeto de la propiedad
        if (typeof esEstatica === 'object' && esEstatica !== null) {
            prop = { ...esEstatica };
        } else {
            // 2. Diccionario local estático garantizado
            if (BRECCIA_STATIC_PROPERTIES[strId]) {
                prop = { ...BRECCIA_STATIC_PROPERTIES[strId] };
            }

            // 3. Mapas globales existentes
            if (!prop && window.STATIC_PROPERTIES_MAP && window.STATIC_PROPERTIES_MAP[strId]) {
                prop = { ...window.STATIC_PROPERTIES_MAP[strId] };
            }
            if (!prop && window.propiedadesDetalle && window.propiedadesDetalle[strId]) {
                prop = { ...window.propiedadesDetalle[strId] };
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
