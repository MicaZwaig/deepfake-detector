@echo off
REM Script para ejecutar el Detector de Manipulación de Imágenes en Windows
REM Este script configura el entorno y ejecuta tanto el backend como el frontend

echo 🚀 Iniciando Detector de Manipulación de Imágenes...
echo ==================================================

REM Verificar Python
echo 🔍 Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python no encontrado
    echo 💡 Instala Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)
echo ✅ Python encontrado

REM Verificar Node.js
echo 🔍 Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no encontrado
    echo 💡 Instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js encontrado

REM Verificar npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no encontrado
    pause
    exit /b 1
)
echo ✅ npm encontrado

echo.
echo 📦 Configurando Backend...

REM Navegar al directorio backend
cd backend

REM Crear entorno virtual si no existe
if not exist "venv" (
    echo 📝 Creando entorno virtual...
    python -m venv venv
)

REM Activar entorno virtual
echo 🔧 Activando entorno virtual...
call venv\Scripts\activate.bat

REM Instalar dependencias
echo 📥 Instalando dependencias de Python...
pip install -r requirements.txt

REM Ejecutar backend en background
echo 🚀 Iniciando servidor backend...
start "Backend Server" cmd /k "python main.py"

REM Volver al directorio raíz
cd ..

echo.
echo 📦 Configurando Frontend...

REM Navegar al directorio frontend
cd frontend

REM Instalar dependencias de Node.js
echo 📥 Instalando dependencias de Node.js...
npm install

REM Ejecutar frontend
echo 🚀 Iniciando aplicación frontend...
start "Frontend App" cmd /k "npm start"

REM Volver al directorio raíz
cd ..

echo.
echo 🎉 ¡Aplicación iniciada exitosamente!
echo ==================================================
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:8000
echo.
echo 💡 Las ventanas del backend y frontend se abrirán automáticamente
echo 💡 Para detener la aplicación, cierra las ventanas de comandos
echo.
pause
