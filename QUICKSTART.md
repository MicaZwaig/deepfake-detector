# Guía de Ejecución Rápida

## 🚀 Inicio Rápido

### 1. Backend (Terminal 1)
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

### 3. Usar la Aplicación
- Abre: http://localhost:3000
- Sube una imagen
- Revisa los resultados

## 📋 Checklist de Verificación

- [ ] Python 3.8+ instalado
- [ ] Node.js 16+ instalado
- [ ] Backend ejecutándose en puerto 8000
- [ ] Frontend ejecutándose en puerto 3000
- [ ] Navegador abierto en localhost:3000

## 🔧 Comandos Útiles

### Backend
```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
python main.py

# Verificar API
curl http://localhost:8000/health
```

### Frontend
```bash
# Instalar dependencias
npm install

# Ejecutar aplicación
npm start

# Construir para producción
npm run build
```

## 🐛 Problemas Comunes

**Error: "No module named 'fastapi'"**
```bash
pip install -r requirements.txt
```

**Error: "Cannot find module"**
```bash
npm install
```

**Error de conexión API**
- Verifica que el backend esté en puerto 8000
- Revisa la consola del navegador para errores CORS
