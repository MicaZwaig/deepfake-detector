import React from 'react';
import { AnalysisResult } from '../types.ts';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface ReliabilityIndicatorProps {
  analysis: AnalysisResult;
}

const ReliabilityIndicator: React.FC<ReliabilityIndicatorProps> = ({ analysis }) => {
  const getReliabilityColor = (level: string) => {
    switch (level) {
      case 'Alta':
        return 'text-reliability-high bg-green-100';
      case 'Media':
        return 'text-reliability-medium bg-yellow-100';
      case 'Baja':
        return 'text-reliability-low bg-red-100';
      case 'Muy Baja':
        return 'text-reliability-very-low bg-red-200';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getReliabilityIcon = (level: string) => {
    switch (level) {
      case 'Alta':
        return <CheckCircle className="w-5 h-5" />;
      case 'Media':
        return <Info className="w-5 h-5" />;
      case 'Baja':
      case 'Muy Baja':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-reliability-high';
    if (score >= 60) return 'text-reliability-medium';
    if (score >= 40) return 'text-reliability-low';
    return 'text-reliability-very-low';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Nivel de Confiabilidad</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Indicador principal */}
        <div className="space-y-4">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${getReliabilityColor(analysis.reliability_level)}`}>
            {getReliabilityIcon(analysis.reliability_level)}
            <span className="ml-2 font-semibold">{analysis.reliability_level}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Puntuación de confianza</span>
              <span className={`font-semibold ${getScoreColor(analysis.confidence_score)}`}>
                {analysis.confidence_score}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full progress-bar ${
                  analysis.confidence_score >= 80 ? 'bg-reliability-high' :
                  analysis.confidence_score >= 60 ? 'bg-reliability-medium' :
                  analysis.confidence_score >= 40 ? 'bg-reliability-low' :
                  'bg-reliability-very-low'
                }`}
                style={{ width: `${analysis.confidence_score}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Resumen de análisis */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Resumen del análisis</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Campos de metadatos:</span>
              <span className="font-medium">{analysis.summary.total_metadata_fields}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Software detectado:</span>
              <span className={`font-medium ${analysis.summary.software_detected_count > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {analysis.summary.software_detected_count}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Campos sospechosos:</span>
              <span className={`font-medium ${analysis.summary.suspicious_fields_count > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {analysis.summary.suspicious_fields_count}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Datos faltantes:</span>
              <span className={`font-medium ${analysis.summary.missing_data_count > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                {analysis.summary.missing_data_count}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Inconsistencias:</span>
              <span className={`font-medium ${analysis.summary.inconsistencies_count > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {analysis.summary.inconsistencies_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReliabilityIndicator;
