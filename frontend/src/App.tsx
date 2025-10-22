import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload.tsx';
import MetadataDisplay from './components/MetadataDisplay.tsx';
import ReliabilityIndicator from './components/ReliabilityIndicator.tsx';
import { analyzeImage, healthCheck } from './api.ts';
import { AnalysisResult, ApiError } from './types.ts';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Verificar estado de la API al cargar
  React.useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await healthCheck();
        setApiStatus('online');
      } catch {
        setApiStatus('offline');
      }
    };
    
    checkApiStatus();
  }, []);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      setApiStatus('online');
    } catch (err) {
      const error = err as ApiError;
      setError(error.detail || 'Error al analizar la imagen');
      setApiStatus('offline');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryApiCheck = async () => {
    setApiStatus('checking');
    try {
      await healthCheck();
      setApiStatus('online');
    } catch {
      setApiStatus('offline');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Detector de Manipulación de Imágenes
              </h1>
              <p className="mt-2 text-gray-600">
                Analiza metadatos EXIF para detectar posibles signos de manipulación
              </p>
            </div>
            
            {/* Estado de la API */}
            <div className="flex items-center space-x-2">
              {apiStatus === 'checking' && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Verificando API...</span>
                </div>
              )}
              {apiStatus === 'online' && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">API Conectada</span>
                </div>
              )}
              {apiStatus === 'offline' && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">API Desconectada</span>
                  <button
                    onClick={handleRetryApiCheck}
                    className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {apiStatus === 'offline' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Error de conexión</span>
            </div>
            <p className="mt-2 text-red-700">
              No se puede conectar con el servidor. Asegúrate de que el backend esté ejecutándose en http://localhost:8000
            </p>
          </div>
        )}

        {/* Upload Section */}
        <div className="mb-8">
          <ImageUpload 
            onImageUpload={handleImageUpload} 
            isLoading={isLoading || apiStatus === 'offline'} 
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Error</span>
            </div>
            <p className="mt-2 text-red-700">{error}</p>
          </div>
        )}

        {/* Results */}
        {analysisResult && (
          <div className="space-y-6 animate-fade-in">
            {/* Reliability Indicator */}
            <ReliabilityIndicator analysis={analysisResult} />
            
            {/* Metadata Display */}
            <MetadataDisplay analysis={analysisResult} />
          </div>
        )}

        {/* Instructions */}
        {!analysisResult && !isLoading && apiStatus === 'online' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              ¿Cómo funciona el análisis?
            </h3>
            <div className="text-blue-800 space-y-2">
              <p>• <strong>Extracción de metadatos:</strong> Analizamos los datos EXIF de la imagen</p>
              <p>• <strong>Detección de software:</strong> Identificamos si se usó software de edición</p>
              <p>• <strong>Verificación de consistencia:</strong> Revisamos la coherencia de fechas y datos</p>
              <p>• <strong>Evaluación de confiabilidad:</strong> Calculamos un score basado en los indicadores encontrados</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>Detector de Manipulación de Imágenes - Análisis de Metadatos EXIF</p>
            <p className="mt-1 text-sm">
              Esta herramienta analiza metadatos para detectar posibles signos de manipulación.
              Los resultados son indicativos y no garantizan la autenticidad de la imagen.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
