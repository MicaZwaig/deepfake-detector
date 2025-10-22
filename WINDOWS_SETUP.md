# Instrucciones de Ejecución para Windows

## 🚀 Inicio Rápido en Windows

### Opción 1: Script Automático (Recomendado)
```cmd
# Ejecutar el script de inicio automático
start.bat
```

### Opción 2: Ejecución Manual

#### 1. Backend (PowerShell/CMD)
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### 2. Frontend (PowerShell/CMD - Nueva ventana)
```cmd
cd frontend
npm install
npm start
```

## 📋 Checklist de Verificación para Windows

- [ ] Python 3.8+ instalado (verificar con `python --version`)
- [ ] Node.js 16+ instalado (verificar con `node --version`)
- [ ] npm instalado (verificar con `npm --version`)
- [ ] Backend ejecutándose en puerto 8000
- [ ] Frontend ejecutándose en puerto 3000
- [ ] Navegador abierto en localhost:3000

## 🔧 Comandos Útiles para Windows

### Backend
```cmd
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
python main.py

# Verificar API (PowerShell)
Invoke-RestMethod -Uri "http://localhost:8000/health"
```

### Frontend
```cmd
# Instalar dependencias
npm install

# Ejecutar aplicación
npm start

# Construir para producción
npm run build
```

## 🐛 Problemas Comunes en Windows

### Error: "No module named 'fastapi'"
```cmd
# Asegúrate de activar el entorno virtual
venv\Scripts\activate
pip install -r requirements.txt
```

### Error: "Cannot find module"
```cmd
# Limpia la caché de npm
npm cache clean --force
npm install
```

### Error de conexión API
- Verifica que el backend esté en puerto 8000
- Revisa el firewall de Windows
- Asegúrate de que no haya otros servicios usando el puerto

### Error de permisos
- Ejecuta PowerShell/CMD como administrador
- Verifica que Python y Node.js estén en el PATH

## 💡 Consejos para Windows

1. **Usa PowerShell** en lugar de CMD para mejor compatibilidad
2. **Ejecuta como administrador** si tienes problemas de permisos
3. **Verifica el firewall** de Windows si hay problemas de conexión
4. **Usa el script start.bat** para una configuración automática

## 🔍 Verificación de Puertos

### Verificar puerto 8000 (Backend)
```cmd
netstat -an | findstr :8000
```

### Verificar puerto 3000 (Frontend)
```cmd
netstat -an | findstr :3000
```

## 📱 Acceso a la Aplicación

Una vez que ambos servicios estén ejecutándose:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

## 🛑 Detener la Aplicación

1. Presiona `Ctrl+C` en las ventanas de comandos
2. O cierra las ventanas de comandos directamente
3. Para detener procesos en background:
   ```cmd
   taskkill /f /im python.exe
   taskkill /f /im node.exe
   ```
