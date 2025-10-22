# 🚀 COMANDOS PARA EJECUTAR LA APLICACIÓN LOCAL

## 📋 PREREQUISITOS
- Python 3.8 o superior instalado
- Node.js 16 o superior instalado
- npm instalado

## 🔧 COMANDOS PASO A PASO

### 1. ABRIR DOS TERMINALES SEPARADAS

**Terminal 1 - Para el Backend (Python)**
```bash
# Navegar al directorio del proyecto
cd C:\Users\Micaela\Documents\GitHub\deepfake-detector\deepfake-detector

# Ir al directorio backend
cd backend

# Instalar dependencias de Python
pip install -r requirements.txt

# Ejecutar el servidor backend
python main.py
```

**Terminal 2 - Para el Frontend (React)**
```bash
# Navegar al directorio del proyecto
cd C:\Users\Micaela\Documents\GitHub\deepfake-detector\deepfake-detector

# Ir al directorio frontend
cd frontend

# Instalar dependencias de Node.js
npm install

# Ejecutar la aplicación frontend
npm start
```

## 🌐 ACCESO A LA APLICACIÓN

Una vez que ambos comandos estén ejecutándose:

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:8000
3. **Documentación API**: http://localhost:8000/docs

## ✅ VERIFICACIÓN DE FUNCIONAMIENTO

### Verificar que los puertos estén abiertos:
```bash
# En una nueva terminal
netstat -an | findstr ":8000\|:3000"
```

### Verificar procesos:
```bash
# Verificar Python
tasklist | findstr python

# Verificar Node.js
tasklist | findstr node
```

## 🎯 CÓMO USAR LA APLICACIÓN

1. **Abrir navegador** en http://localhost:3000
2. **Arrastrar y soltar** una imagen o hacer clic para seleccionar
3. **Esperar** el análisis (puede tomar unos segundos)
4. **Revisar resultados**:
   - Barra de confiabilidad (verde/amarillo/rojo)
   - Metadatos EXIF organizados por categorías
   - Alertas de campos sospechosos
   - Software de edición detectado

## 🛑 DETENER LA APLICACIÓN

Para detener los servicios:
- Presionar `Ctrl+C` en ambas terminales
- O cerrar las ventanas de comandos

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "No module named 'fastapi'"
```bash
cd backend
pip install -r requirements.txt
```

### Error: "Cannot find module"
```bash
cd frontend
npm install
```

### Error: "Missing script: start"
```bash
cd frontend
npm install
npm start
```

### Error de conexión API
- Verificar que el backend esté en puerto 8000
- Verificar que el frontend esté en puerto 3000
- Revisar firewall de Windows

## 📱 TIPOS DE IMÁGENES PARA PROBAR

- **Imágenes normales** de cámara (alta confiabilidad)
- **Imágenes editadas** con Photoshop/GIMP (baja confiabilidad)
- **Imágenes de redes sociales** (metadatos modificados)
- **Imágenes con filtros** o efectos (patrones sospechosos)

## 🎨 CARACTERÍSTICAS DE LA APLICACIÓN

- **Detección de software** de edición (Photoshop, GIMP, Instagram, etc.)
- **Análisis de patrones** sospechosos (AI, deepfake, filters)
- **Verificación de consistencia** de fechas y datos
- **Sistema de puntuación** visual de confiabilidad
- **Interfaz moderna** con TailwindCSS
- **Animaciones suaves** y transiciones

## 📊 INTERPRETACIÓN DE RESULTADOS

- **80-100%**: Alta confiabilidad (Verde) ✅
- **60-79%**: Confiabilidad media (Amarillo) ⚠️
- **40-59%**: Baja confiabilidad (Rojo) ❌
- **0-39%**: Muy baja confiabilidad (Rojo oscuro) 🚨

---

**¡LISTO!** 🎉 

Sigue estos comandos exactos y tendrás la aplicación funcionando en tu máquina local.
