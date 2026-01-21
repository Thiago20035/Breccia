// ============================================
// CARRUSEL DE SERVICIOS
// ============================================
let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
        
        if (index === currentSlide) {
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = '';
            }, 10);
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

let autoplayInterval = setInterval(nextSlide, 5000);

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// ============================================
// SISTEMA DE EDIFICIOS - DATOS CORREGIDOS
// ============================================

const edificios = [
    { nombre: "Leblon", direccion: "Corrientes 1847", zona: "centro", unidades: 278, pisos: 10 },
    { nombre: "Vista del Cabo", direccion: "Bolivar 989", zona: "centro", unidades: 6, pisos: 6 },
    { nombre: "Consorcio 25 de Mayo 3020", direccion: "25 de Mayo 3020", zona: "centro", unidades: 53, pisos: 10 },
    { nombre: "Consorcio Edificio San Lorenzo", direccion: "San Lorenzo 1641", zona: "centro", unidades: 9, pisos: 4 },
    { nombre: "Consorcio de Propietarios", direccion: "San Juan 3052", zona: "centro", unidades: 32, pisos: 3 },
    { nombre: "Consorcio Edificio Ocean View", direccion: "F.U Camet 1101", zona: "camet", unidades: 12, pisos: 6 },
    { nombre: "Consorcio Propietarios Brown 2317", direccion: "Brown 2317", zona: "centro", unidades: 6, pisos: 1 },
    { nombre: "Consorcio Neptuno XII", direccion: "La Rioja 3147", zona: "centro", unidades: 30, pisos: 4 },
    { nombre: "Consorcio Propietarios Puro Centro", direccion: "Gascon 2358", zona: "centro", unidades: 15, pisos: 11 },
    { nombre: "Buenos Aires 2861", direccion: "Buenos Aires 2861", zona: "centro", unidades: 12, pisos: 2 },
    { nombre: "Gascon 2744", direccion: "Gascon 2744", zona: "centro", unidades: 12, pisos: 6 },
    { nombre: "Edificio Playa Grande Office", direccion: "Formosa 203", zona: "playa grande", unidades: 4, pisos: 3 },
    { nombre: "Edificio Natura", direccion: "Almirante Brown 2569", zona: "centro", unidades: 78, pisos: 9 },
    { nombre: "Consorcio de Propietarios Chernomar II", direccion: "Catamarca 1271", zona: "centro", unidades: 59, pisos: 6 },
    { nombre: "Consorcio de Propietarios Olague XII", direccion: "Arenales 2445", zona: "centro", unidades: 105, pisos: 9 },
    { nombre: "Edificio Gacela", direccion: "Bolivar 3229", zona: "centro", unidades: 94, pisos: 12 },
    { nombre: "Consorcio de Propietarios Luchetti XV", direccion: "Bvard Maritimo 1411", zona: "centro", unidades: 7, pisos: 4 },
    { nombre: "Fideicomiso Terminal Guemes Trust", direccion: "Castelli 1575", zona: "centro", unidades: 9, pisos: 5 },
    { nombre: "Consorcio de Propietarios Ondina IV", direccion: "Jose Marmol 1053", zona: "centro", unidades: 13, pisos: 0 },
    { nombre: "Consorcio Oriana", direccion: "Bv. Maritimo P.P. Ramos 1599", zona: "playa grande", unidades: 9, pisos: 6 },
    { nombre: "Consorcio de Propietarios", direccion: "Mejico 731", zona: "centro", unidades: 7, pisos: 1 },
    { nombre: "Consorcio de Propietarios Pasteur", direccion: "Pasteur Esq. Chapeaurouge", zona: "centro", unidades: 5, pisos: 2 },
    { nombre: "Consorcio de Propietarios", direccion: "Uruguay 287", zona: "centro", unidades: 6, pisos: 1 },
    { nombre: "Consorcio de Propietarios", direccion: "Lopez de Gomara 4050", zona: "centro", unidades: 8, pisos: 1 },
    { nombre: "Consorcio de Propietarios San Mar II", direccion: "Falucho 2513/15", zona: "centro", unidades: 37, pisos: 9 },
    { nombre: "Condor II", direccion: "Falucho 4841", zona: "centro", unidades: 35, pisos: 6 },
    { nombre: "Condor I", direccion: "Alte. Brown 4840", zona: "centro", unidades: 34, pisos: 6 },
    { nombre: "Consorcio de Propietarios Evemar 5", direccion: "Cardiel 3935", zona: "centro", unidades: 11, pisos: 2 },
    { nombre: "Consorcio de Propietarios Evamar 6", direccion: "Zacagnini 4505", zona: "centro", unidades: 16, pisos: 2 },
    { nombre: "Edificio Linehouse Offices", direccion: "Hipolito Yrigoyen 2281", zona: "centro", unidades: 27, pisos: 10 },
    { nombre: "French 3741", direccion: "French 3741", zona: "centro", unidades: 22, pisos: 2 },
    { nombre: "Arizona Cumbre", direccion: "San Luis 2390", zona: "centro", unidades: 17, pisos: 8 },
    { nombre: "1° de Octubre Torre I", direccion: "Av. Independencia 4320", zona: "centro", unidades: 112, pisos: 14 },
    { nombre: "Consorcio de Propietarios Esmeralda", direccion: "Belgrano 2321", zona: "centro", unidades: 34, pisos: 8 },
    { nombre: "Torreta IV", direccion: "Derqui 1015", zona: "centro", unidades: 11, pisos: 3 },
    { nombre: "Consorcio de Propietarios Magaluf V", direccion: "Sarmiento 2465", zona: "centro", unidades: 57, pisos: 10 },
    { nombre: "Consorcio de Propietarios", direccion: "Hipolito Yrigoyen 3415", zona: "centro", unidades: 7, pisos: 3 },
    { nombre: "Consorcio de Propietarios", direccion: "Las Heras 2876/90", zona: "centro", unidades: 39, pisos: 6 },
    { nombre: "Consorcio de Propietarios", direccion: "Hipolito Yrigoyen 1206", zona: "centro", unidades: 19, pisos: 10 },
    { nombre: "Edificio Uruguay 1604/16", direccion: "Uruguay 1604/16", zona: "centro", unidades: 11, pisos: 4 },
    { nombre: "Consorcio de Propietario", direccion: "J. Acevedo 4217", zona: "centro", unidades: 20, pisos: 4 },
    { nombre: "Consorcio de Propietarios", direccion: "Salta 4342", zona: "centro", unidades: 15, pisos: 2 },
    { nombre: "Consorcio Independencia 4149", direccion: "Independencia 4149", zona: "centro", unidades: 16, pisos: 3 },
    { nombre: "Consorcio de Propietarios Storni II", direccion: "Alice 4380", zona: "centro", unidades: 14, pisos: 5 },
    { nombre: "Consorcio de Propietarios Storni III", direccion: "Sargento Cabral 31", zona: "centro", unidades: 16, pisos: 6 },
    { nombre: "Consorcio de Propietarios Orbia", direccion: "25 de Mayo 3073", zona: "centro", unidades: 72, pisos: 9 },
    { nombre: "Consorcio de Propietarios Costa Alsina", direccion: "Alsina 2478", zona: "centro", unidades: 15, pisos: 9 },
    { nombre: "Consorcio de Propietarios", direccion: "San Luis 1729", zona: "centro", unidades: 4, pisos: 4 }
];

let filteredEdificios = [...edificios];
let currentPage = 1;
const itemsPerPage = 12;

function renderEdificios() {
    const grid = document.getElementById('edificiosGrid');
    if (!grid) return;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageEdificios = filteredEdificios.slice(start, end);

    grid.innerHTML = pageEdificios.map(ed => `
        <div class="edificio-card">
            <h3>🏢 ${ed.nombre}</h3>
            <div class="edificio-ubicacion">📍 ${ed.direccion}</div>
            <div class="edificio-info">
                <div class="info-badge"><strong>${ed.unidades}</strong> unidades</div>
                <div class="info-badge"><strong>${ed.pisos}</strong> pisos</div>
            </div>
        </div>
    `).join('');

    const showingEl = document.getElementById('showing');
    const totalEl = document.getElementById('total');
    if (showingEl) showingEl.textContent = pageEdificios.length;
    if (totalEl) totalEl.textContent = filteredEdificios.length;
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredEdificios.length / itemsPerPage);

    let buttons = `
        <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            buttons += `<span style="padding: 0 5px;">...</span>`;
        }
    }

    buttons += `
        <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>›</button>
    `;

    pagination.innerHTML = buttons;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredEdificios.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderEdificios();
    renderPagination();
    
    const section = document.querySelector('.edificios-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function filterEdificios() {
    const searchInput = document.getElementById('searchEdificio');
    const activeBtn = document.querySelector('.filter-btn.active');
    
    if (!searchInput || !activeBtn) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const activeZona = activeBtn.dataset.zona;

    filteredEdificios = edificios.filter(ed => {
        const matchSearch = ed.nombre.toLowerCase().includes(searchTerm) || 
                          ed.direccion.toLowerCase().includes(searchTerm);
        const matchZona = activeZona === 'todas' || ed.zona === activeZona;
        return matchSearch && matchZona;
    });

    currentPage = 1;
    renderEdificios();
    renderPagination();
}

// Event listeners
const searchInput = document.getElementById('searchEdificio');
if (searchInput) {
    searchInput.addEventListener('input', filterEdificios);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterEdificios();
    });
});

// Inicializar
renderEdificios();
renderPagination();