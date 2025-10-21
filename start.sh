#!/bin/bash

# Script para ejecutar el Detector de Manipulación de Imágenes
# Este script configura el entorno y ejecuta tanto el backend como el frontend

echo "🚀 Iniciando Detector de Manipulación de Imágenes..."
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar Python
echo -e "${BLUE}🔍 Verificando Python...${NC}"
if command_exists python3; then
    PYTHON_CMD="python3"
    PIP_CMD="pip3"
    echo -e "${GREEN}✅ Python3 encontrado${NC}"
elif command_exists python; then
    PYTHON_CMD="python"
    PIP_CMD="pip"
    echo -e "${GREEN}✅ Python encontrado${NC}"
else
    echo -e "${RED}❌ Python no encontrado${NC}"
    echo -e "${YELLOW}💡 Instala Python desde: https://www.python.org/downloads/${NC}"
    exit 1
fi

# Verificar Node.js
echo -e "${BLUE}🔍 Verificando Node.js...${NC}"
if command_exists node; then
    echo -e "${GREEN}✅ Node.js encontrado${NC}"
else
    echo -e "${RED}❌ Node.js no encontrado${NC}"
    echo -e "${YELLOW}💡 Instala Node.js desde: https://nodejs.org/${NC}"
    exit 1
fi

# Verificar npm
if command_exists npm; then
    echo -e "${GREEN}✅ npm encontrado${NC}"
else
    echo -e "${RED}❌ npm no encontrado${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Configurando Backend...${NC}"

# Navegar al directorio backend
cd backend

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}📝 Creando entorno virtual...${NC}"
    $PYTHON_CMD -m venv venv
fi

# Activar entorno virtual
echo -e "${YELLOW}🔧 Activando entorno virtual...${NC}"
source venv/bin/activate

# Instalar dependencias
echo -e "${YELLOW}📥 Instalando dependencias de Python...${NC}"
$PIP_CMD install -r requirements.txt

# Ejecutar backend en background
echo -e "${GREEN}🚀 Iniciando servidor backend...${NC}"
$PYTHON_CMD main.py &
BACKEND_PID=$!

# Volver al directorio raíz
cd ..

echo ""
echo -e "${BLUE}📦 Configurando Frontend...${NC}"

# Navegar al directorio frontend
cd frontend

# Instalar dependencias de Node.js
echo -e "${YELLOW}📥 Instalando dependencias de Node.js...${NC}"
npm install

# Ejecutar frontend
echo -e "${GREEN}🚀 Iniciando aplicación frontend...${NC}"
npm start &
FRONTEND_PID=$!

# Volver al directorio raíz
cd ..

echo ""
echo -e "${GREEN}🎉 ¡Aplicación iniciada exitosamente!${NC}"
echo "=================================================="
echo -e "${BLUE}📱 Frontend:${NC} http://localhost:3000"
echo -e "${BLUE}🔧 Backend:${NC} http://localhost:8000"
echo ""
echo -e "${YELLOW}💡 Para detener la aplicación, presiona Ctrl+C${NC}"

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Deteniendo aplicación...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Aplicación detenida${NC}"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Esperar a que el usuario presione Ctrl+C
wait
