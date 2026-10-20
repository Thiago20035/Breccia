/**
 * Módulo de almacenamiento para propiedades de Breccia Inmuebles.
 * Utiliza IndexedDB para almacenamiento amplio de fotos/datos sin límites de localStorage,
 * con respaldo automático.
 */

const DB_NAME = 'BrecciaPropiedadesDB';
const DB_VERSION = 1;
const STORE_NAME = 'propiedades';

class PropiedadesDB {
    constructor() {
        this.db = null;
        this.initPromise = this.initDB();
    }

    // Inicializar IndexedDB
    initDB() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                console.warn('IndexedDB no está soportado en este navegador. Usando localStorage.');
                resolve(null);
                return;
            }

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {
                console.error('Error al abrir IndexedDB:', event.target.error);
                resolve(null);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Base de datos IndexedDB lista.');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('categoria', 'categoria', { unique: false });
                    store.createIndex('tipo', 'tipo', { unique: false });
                    store.createIndex('fechaCreacion', 'fechaCreacion', { unique: false });
                }
            };
        });
    }

    // Obtener todas las propiedades dinámicas
    async getAll() {
        await this.initPromise;
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([STORE_NAME], 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.getAll();

                request.onsuccess = () => {
                    // Ordenar por fecha de creación desc
                    const props = request.result || [];
                    props.sort((a, b) => (b.fechaCreacion || 0) - (a.fechaCreacion || 0));
                    resolve(props);
                };
                request.onerror = () => {
                    resolve(this.getFromLocalStorage());
                };
            });
        } else {
            return this.getFromLocalStorage();
        }
    }

    // Obtener una propiedad por ID
    async getById(id) {
        await this.initPromise;
        const targetId = String(id);
        if (this.db) {
            return new Promise((resolve) => {
                const transaction = this.db.transaction([STORE_NAME], 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.get(targetId);

                request.onsuccess = () => resolve(request.result || null);
                request.onerror = () => {
                    const all = this.getFromLocalStorage();
                    resolve(all.find(p => String(p.id) === targetId) || null);
                };
            });
        } else {
            const all = this.getFromLocalStorage();
            return all.find(p => String(p.id) === targetId) || null;
        }
    }

    // Guardar o actualizar una propiedad
    async save(propiedad) {
        await this.initPromise;
        if (!propiedad.id) {
            propiedad.id = 'dyn_' + Date.now();
        } else {
            propiedad.id = String(propiedad.id);
        }

        propiedad.fechaModificacion = Date.now();
        if (!propiedad.fechaCreacion) {
            propiedad.fechaCreacion = Date.now();
        }

        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.put(propiedad);

                request.onsuccess = () => {
                    this.saveBackupToLocalStorage();
                    resolve(propiedad);
                };
                request.onerror = (e) => {
                    console.error('Error al guardar en IndexedDB', e);
                    reject(e.target.error);
                };
            });
        } else {
            const all = this.getFromLocalStorage();
            const index = all.findIndex(p => String(p.id) === String(propiedad.id));
            if (index >= 0) {
                all[index] = propiedad;
            } else {
                all.push(propiedad);
            }
            this.saveToLocalStorage(all);
            return propiedad;
        }
    }

    // Eliminar propiedad
    async delete(id) {
        await this.initPromise;
        const targetId = String(id);
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.delete(targetId);

                request.onsuccess = () => {
                    this.saveBackupToLocalStorage();
                    resolve(true);
                };
                request.onerror = (e) => reject(e.target.error);
            });
        } else {
            let all = this.getFromLocalStorage();
            all = all.filter(p => String(p.id) !== targetId);
            this.saveToLocalStorage(all);
            return true;
        }
    }

    // Exportar todo como JSON
    async exportJSON() {
        const props = await this.getAll();
        return JSON.stringify(props, null, 2);
    }

    // Importar datos desde JSON
    async importJSON(jsonString) {
        try {
            const props = JSON.parse(jsonString);
            if (!Array.isArray(props)) {
                throw new Error('El archivo debe contener un arreglo de propiedades.');
            }
            for (const prop of props) {
                if (prop && prop.titulo) {
                    await this.save(prop);
                }
            }
            return props.length;
        } catch (err) {
            console.error('Error al importar JSON:', err);
            throw err;
        }
    }

    // Fallbacks para localStorage
    getFromLocalStorage() {
        try {
            const data = localStorage.getItem('breccia_propiedades_dinamicas');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error al leer de localStorage:', e);
            return [];
        }
    }

    saveToLocalStorage(data) {
        try {
            localStorage.setItem('breccia_propiedades_dinamicas', JSON.stringify(data));
        } catch (e) {
            console.warn('localStorage lleno o deshabilitado:', e);
        }
    }

    async saveBackupToLocalStorage() {
        try {
            const all = await this.getAll();
            // Guardamos versión liviana en localStorage (sin imágenes gigantes si excede)
            const metaProps = all.map(p => ({
                ...p,
                imagenes: (p.imagenes || []).slice(0, 3) // preview
            }));
            localStorage.setItem('breccia_propiedades_meta', JSON.stringify(metaProps));
        } catch (e) {
            // Ignorar límite de localStorage
        }
    }

    // Utilidad: Comprimir imágenes antes de guardarlas (para rápido renderizado)
    static compressImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        if (width > height) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        } else {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedDataUrl);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

// Exportar instancia global
window.propiedadesDB = new PropiedadesDB();
