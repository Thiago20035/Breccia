/**
 * Módulo de Generación y Compartir en Historias de Instagram (Story 9:16)
 * Breccia Inmuebles & Negocios
 */

(function () {
    // Inyectar modal en el DOM si no existe
    function asegurarModalCompartir() {
        let modal = document.getElementById('modalCompartirStory');
        if (modal) return modal;

        modal = document.createElement('div');
        modal.id = 'modalCompartirStory';
        modal.className = 'modal-overlay';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="modal-card" style="max-width: 720px; width: 95%;">
                <div class="modal-header">
                    <h3 style="display: flex; align-items: center; gap: 10px;">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d946ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        <span>Compartir en Historia de Instagram</span>
                    </h3>
                    <button class="modal-close" id="btnCerrarModalStory">&times;</button>
                </div>
                <div class="modal-body" style="padding: 1rem 0;">
                    <p style="color: #64748b; font-size: 0.88rem; margin-bottom: 1rem;">
                        Placa vertical optimizada (1080x1920 / 9:16) con diseño corporativo Breccia, lista para publicar en Instagram Stories, Estados de WhatsApp o enviar a clientes.
                    </p>
                    <div class="modal-story-body">
                        <div class="story-preview-wrapper">
                            <canvas id="storyCanvas" width="1080" height="1920"></canvas>
                            <div id="storyLoading" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; gap: 10px; font-size: 0.85rem;">
                                <div style="width: 32px; height: 32px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #c5a059; border-radius: 50%; animation: spinStory 0.8s linear infinite;"></div>
                                <span>Generando placa...</span>
                            </div>
                        </div>
                        <div class="story-actions-panel">
                            <button id="btnDescargarStory" class="story-action-btn btn-ig-primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                <div>
                                    <div style="font-weight: 700;">Descargar Historia (Story 9:16)</div>
                                    <small style="opacity: 0.9; font-size: 0.75rem;">Guardar imagen en alta resolución (1080x1920 PNG)</small>
                                </div>
                            </button>

                            <button id="btnCompartirNativoStory" class="story-action-btn" style="border-color: #d946ef; color: #c026d3;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                                <div>
                                    <div style="font-weight: 700;">Publicar directo a Instagram / Apps</div>
                                    <small style="color: #64748b; font-size: 0.75rem;">Abrir menú de compartir del teléfono</small>
                                </div>
                            </button>

                            <button id="btnCompartirWspStory" class="story-action-btn btn-wsp">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                                <div>
                                    <div style="font-weight: 700;">Compartir en WhatsApp</div>
                                    <small style="opacity: 0.9; font-size: 0.75rem;">Enviar ficha comercial y link directo</small>
                                </div>
                            </button>

                            <button id="btnCopiarLinkStory" class="story-action-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                <div>
                                    <div style="font-weight: 700;">Copiar Enlace Directo</div>
                                    <small style="color: #64748b; font-size: 0.75rem;">Para pegar en el Sticker de Enlace de Instagram</small>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Inyectar estilo de animación spinner
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spinStory { to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);

        document.body.appendChild(modal);

        modal.querySelector('#btnCerrarModalStory').onclick = () => modal.style.display = 'none';
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        return modal;
    }

    // Helper: envolver texto en múltiples líneas para Canvas
    function envolverTexto(ctx, text, x, y, maxWidth, lineHeight, maxLines = 2) {
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
                    // Truncar con ellipsis si supera maxLines
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

        // Cargar imagen
        try {
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    ctx.save();
                    drawRoundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
                    ctx.clip();

                    // Object-fit: cover logic
                    const hRatio = imgW / img.width;
                    const vRatio = imgH / img.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const centerShiftX = (imgW - img.width * ratio) / 2;
                    const centerShiftY = (imgH - img.height * ratio) / 2;

                    ctx.drawImage(img, 0, 0, img.width, img.height,
                        imgX + centerShiftX, imgY + centerShiftY, img.width * ratio, img.height * ratio);

                    // Si está vendida o alquilada, overlay oscuro sobre la imagen
                    const est = prop.estado || 'disponible';
                    if (est === 'vendida' || est === 'alquilada' || est === 'reservada') {
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                        ctx.fillRect(imgX, imgY, imgW, imgH);
                    }

                    ctx.restore();

                    // Marco fino sobre la imagen
                    ctx.save();
                    drawRoundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
                    ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                    ctx.restore();

                    resolve();
                };
                img.onerror = () => {
                    // Fallback si la imagen no carga
                    ctx.save();
                    drawRoundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
                    ctx.fillStyle = '#1e1418';
                    ctx.fill();
                    ctx.restore();
                    resolve();
                };
                img.src = fotoUrl;
            });
        } catch (err) {
            console.error('Error cargando imagen en story:', err);
        }

        // 5. Estampa/Banda de Estado sobre la foto si corresponde
        const estadoProp = prop.estado || 'disponible';
        if (estadoProp === 'vendida' || estadoProp === 'alquilada' || estadoProp === 'reservada') {
            const estadoLabels = {
                vendida: { txt: 'VENDIDA', bg: '#6b2c3e', col: '#c5a059', border: '#c5a059' },
                alquilada: { txt: 'ALQUILADA', bg: '#1e40af', col: '#ffffff', border: '#60a5fa' },
                reservada: { txt: 'RESERVADA', bg: '#d97706', col: '#ffffff', border: '#fbbf24' }
            };
            const estInfo = estadoLabels[estadoProp];
            if (estInfo) {
                ctx.save();
                ctx.translate(imgX + imgW - 130, imgY + 80);
                ctx.rotate(0.35); // Inclinación elegante
                ctx.fillStyle = estInfo.bg;
                drawRoundRect(ctx, -140, -32, 280, 64, 12);
                ctx.fill();
                ctx.strokeStyle = estInfo.border;
                ctx.lineWidth = 3;
                ctx.stroke();

                ctx.textAlign = 'center';
                ctx.fillStyle = estInfo.col;
                ctx.font = 'bold 30px "Outfit", "Segoe UI", sans-serif';
                ctx.fillText(estInfo.txt, 0, 10);
                ctx.restore();
            }
        }

        // 6. Tarjeta de Información Comercial debajo de la foto
        const cardY = 1100;
        const cardW = 920;
        const cardH = 500;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        drawRoundRect(ctx, imgX, cardY, cardW, cardH, 24);
        ctx.fill();
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Precio en grande
        ctx.textAlign = 'center';
        ctx.fillStyle = '#c5a059';
        ctx.font = 'bold 64px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText(prop.precio || 'Consultar', W / 2, cardY + 85);

        // Título de la propiedad (hasta 2 líneas)
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 40px "Outfit", "Segoe UI", sans-serif';
        envolverTexto(ctx, prop.titulo || 'Propiedad en Venta', W / 2, cardY + 160, cardW - 80, 52, 2);

        // Ubicación
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 28px "Outfit", "Segoe UI", sans-serif';
        ctx.fillText(`📍 ${prop.ubicacion || 'Mar del Plata'}`, W / 2, cardY + 285);

        // Pastillas de especificaciones
        let specs = [];
        if (prop.esLote) {
            if (prop.dimensiones) specs.push(`📐 ${prop.dimensiones}`);
            if (prop.superficieTotal) specs.push(`🌿 ${prop.superficieTotal}`);
        } else if (prop.esCochera) {
            specs.push('🚗 Cochera');
            if (prop.unidades) specs.push(prop.unidades);
        } else {
            if (prop.dormitorios) specs.push(`🛏️ ${prop.dormitorios} dorm`);
            if (prop.banos) specs.push(`🚿 ${prop.banos} baños`);
            if (prop.superficie) specs.push(`📐 ${prop.superficie}`);
        }

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

        // Mensaje de estado en la tarjeta si está vendida
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

        // Si se pasó directamente el objeto de la propiedad
        if (typeof esEstatica === 'object' && esEstatica !== null) {
            prop = { ...esEstatica };
        } else if (esEstatica) {
            if (window.STATIC_PROPERTIES_MAP && window.STATIC_PROPERTIES_MAP[String(id)]) {
                prop = { ...window.STATIC_PROPERTIES_MAP[String(id)] };
            } else if (window.propiedadesDetalle && window.propiedadesDetalle[id]) {
                prop = { ...window.propiedadesDetalle[id] };
            }
            const overrides = JSON.parse(localStorage.getItem('breccia_estaticas_overrides') || '{}');
            const estados = JSON.parse(localStorage.getItem('breccia_estado_estaticas') || '{}');
            const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');

            prop = {
                ...prop,
                ...(overrides[String(id)] || {}),
                estado: estados[String(id)] || (prop ? prop.estado : 'disponible'),
                destacada: !!destacadas[String(id)]
            };
        } else {
            if (window.propiedadesDB) {
                prop = await window.propiedadesDB.getById(id);
            }
            if (!prop && window.propiedadesDetalle && window.propiedadesDetalle[id]) {
                prop = { ...window.propiedadesDetalle[id] };
            }
            const destacadas = JSON.parse(localStorage.getItem('breccia_propiedades_destacadas') || '{}');
            if (prop) {
                prop.destacada = !!(destacadas[String(id)] ?? prop.destacada);
            }
        }

        if (!prop) {
            alert('No se pudo cargar la información de la propiedad.');
            return;
        }

        const modal = asegurarModalCompartir();
        const canvas = modal.querySelector('#storyCanvas');
        const loadingEl = modal.querySelector('#storyLoading');

        modal.style.display = 'flex';
        loadingEl.style.display = 'flex';

        // Dibujar en el canvas
        await dibujarPlacaCanvas(canvas, prop);
        loadingEl.style.display = 'none';

        const safeTitle = (prop.titulo || 'propiedad').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const urlPropiedad = `${window.location.origin}${window.location.pathname.replace('admin.html', 'inmobiliaria.html')}#prop-${id}`;

        // 1. Botón Descargar Story
        modal.querySelector('#btnDescargarStory').onclick = () => {
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `historia_breccia_${safeTitle}.png`;
            a.click();
        };

        // 2. Botón Compartir Nativo (Instagram / Redes)
        modal.querySelector('#btnCompartirNativoStory').onclick = async () => {
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const file = new File([blob], `story_${safeTitle}.png`, { type: 'image/png' });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: `Breccia Inmuebles - ${prop.titulo}`,
                            text: `¡Mirá esta propiedad en Breccia Inmuebles! ${prop.titulo} - ${prop.precio}`
                        });
                    } catch (e) {
                        if (e.name !== 'AbortError') console.error('Error al compartir:', e);
                    }
                } else if (navigator.share) {
                    try {
                        await navigator.share({
                            title: `Breccia Inmuebles - ${prop.titulo}`,
                            text: `¡Mirá esta propiedad en Breccia Inmuebles! ${prop.titulo} - ${prop.precio}\n${urlPropiedad}`,
                            url: urlPropiedad
                        });
                    } catch (e) {
                        if (e.name !== 'AbortError') console.error('Error al compartir:', e);
                    }
                } else {
                    // Fallback para computadoras de escritorio
                    alert('Para publicar en Instagram desde la computadora, descargá la placa e importala en Instagram Web o enviala a tu celular.');
                }
            }, 'image/png');
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
                alert('¡Enlace directo copiado al portapapeles! Pegalo en el Sticker de Enlace de Instagram.');
            } catch (e) {
                prompt('Copiá este enlace:', urlPropiedad);
            }
        };
    };
})();
