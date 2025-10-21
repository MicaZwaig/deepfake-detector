# Detector de Manipulación de Imágenes

Una aplicación web completa que analiza metadatos EXIF de imágenes para detectar posibles signos de manipulación.

## 🚀 Características

- **Backend**: API REST desarrollada en Python con FastAPI
- **Frontend**: Interfaz web moderna en React con TypeScript
- **Análisis**: Extracción y análisis de metadatos EXIF
- **Detección**: Identificación de software de edición y inconsistencias
- **UI**: Diseño limpio y moderno con TailwindCSS
- **Indicadores**: Sistema de puntuación de confiabilidad visual

## 📁 Estructura del Proyecto

```
deepfake-detector/
├── backend/
│   ├── main.py              # Servidor FastAPI
│   └── requirements.txt      # Dependencias de Python
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── types.ts         # Tipos TypeScript
│   │   ├── api.ts          # Cliente API
│   │   ├── App.tsx         # Componente principal
│   │   └── index.tsx       # Punto de entrada
│   ├── package.json        # Dependencias Node.js
│   ├── tailwind.config.js  # Configuración TailwindCSS
│   └── postcss.config.js   # Configuración PostCSS
└── README.md              # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Python 3.8 o superior
- Node.js 16 o superior
- npm o yarn

### Backend (FastAPI)

1. **Navegar al directorio del backend:**
   ```bash
   cd backend
   ```

2. **Crear entorno virtual (recomendado):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar el servidor:**
   ```bash
   python main.py
   ```

   El servidor estará disponible en: `http://localhost:8000`

### Frontend (React)

1. **Navegar al directorio del frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**
   ```bash
   npm start
   ```

   La aplicación estará disponible en: `http://localhost:3000`

## 🔧 Uso

### 1. Iniciar los Servicios

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 2. Usar la Aplicación

1. Abre tu navegador en `http://localhost:3000`
2. Arrastra y suelta una imagen o haz clic para seleccionar
3. Espera a que se complete el análisis
4. Revisa los resultados:
   - **Nivel de confiabilidad**: Score visual de autenticidad
   - **Metadatos EXIF**: Información técnica de la imagen
   - **Alertas**: Campos sospechosos o faltantes

## 📊 Análisis de Metadatos

### Indicadores Analizados

- **Software de edición detectado**: Photoshop, GIMP, Paint, etc.
- **Campos sospechosos**: Patrones que sugieren manipulación
- **Datos faltantes**: Metadatos importantes ausentes
- **Inconsistencias**: Fechas o datos contradictorios

### Puntuación de Confiabilidad

- **80-100%**: Alta confiabilidad
- **60-79%**: Confiabilidad media
- **40-59%**: Baja confiabilidad
- **0-39%**: Muy baja confiabilidad

## 🔍 Endpoints de la API

### POST `/analyze-image`
Analiza una imagen y devuelve metadatos con evaluación de manipulación.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Archivo de imagen

**Response:**
```json
{
  "filename": "imagen.jpg",
  "metadata": { ... },
  "analysis": {
    "software_detected": [...],
    "suspicious_fields": [...],
    "missing_data": [...],
    "inconsistencies": [...],
    "confidence_score": 85
  },
  "reliability_level": "Alta",
  "confidence_score": 85,
  "summary": { ... }
}
```

### GET `/health`
Verifica el estado del servidor.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00"
}
```

## 🎨 Personalización

### Colores de Confiabilidad

Los colores se pueden personalizar en `frontend/tailwind.config.js`:

```javascript
colors: {
  'reliability-high': '#10b981',    // Verde
  'reliability-medium': '#f59e0b',  // Amarillo
  'reliability-low': '#ef4444',     // Rojo
  'reliability-very-low': '#dc2626' // Rojo oscuro
}
```

### Software de Edición Detectado

Para agregar más software de edición, modifica la lista en `backend/main.py`:

```python
self.editing_software = [
    "photoshop", "gimp", "paint", "paint.net", 
    "coreldraw", "illustrator", "lightroom",
    # Agregar más software aquí
]
```

## 🐛 Solución de Problemas

### Error de Conexión API
- Verifica que el backend esté ejecutándose en el puerto 8000
- Revisa que no haya firewall bloqueando la conexión
- Usa el botón "Reintentar" en la interfaz

### Error de Instalación de Dependencias
- Asegúrate de tener Python 3.8+ y Node.js 16+
- En Windows, puede ser necesario ejecutar como administrador
- Para problemas con npm, prueba con `npm install --legacy-peer-deps`

### Imagen No Se Analiza
- Verifica que el archivo sea una imagen válida
- Formatos soportados: JPEG, PNG, GIF, BMP, TIFF, WebP
- El tamaño máximo recomendado es 10MB

## 📝 Notas Importantes

- **Limitaciones**: Esta herramienta analiza metadatos, no el contenido visual de la imagen
- **Falsos positivos**: Imágenes legítimas pueden tener baja puntuación por falta de metadatos
- **Falsos negativos**: Imágenes manipuladas pueden pasar desapercibidas si los metadatos fueron preservados
- **Uso educativo**: Esta herramienta es para fines educativos y de investigación

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa la sección de solución de problemas
2. Verifica que todos los prerrequisitos estén instalados
3. Asegúrate de que ambos servicios (backend y frontend) estén ejecutándose
4. Crea un issue en el repositorio con detalles del problema

---

**Desarrollado con ❤️ para la detección de manipulación de imágenes**