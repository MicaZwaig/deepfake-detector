#!/bin/bash

echo "🚀 Iniciando Detector de Manipulación de Imágenes..."

# Detener procesos existentes
echo "🛑 Deteniendo procesos existentes..."
pkill -f "react-scripts start" 2>/dev/null
pkill -f "python main.py" 2>/dev/null
sleep 2

# Iniciar Backend
echo "📦 Iniciando Backend..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend se inicie
sleep 3

# Iniciar Frontend
echo "📦 Iniciando Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "🎉 ¡Aplicación iniciada!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo ""
echo "💡 Para detener: presiona Ctrl+C"

# Función para limpiar al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo aplicación..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT
wait
