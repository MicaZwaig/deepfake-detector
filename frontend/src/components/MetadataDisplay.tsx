import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { AlertTriangle, Info, Eye, EyeOff } from 'lucide-react';

interface MetadataDisplayProps {
  analysis: AnalysisResult;
}

const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ analysis }) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const isSuspiciousField = (field: string, value: string) => {
    return analysis.analysis.suspicious_fields.some(sf => sf.field === field) ||
           analysis.analysis.software_detected.some(sd => sd.field === field);
  };

  const isMissingField = (field: string) => {
    return analysis.analysis.missing_data.includes(field);
  };

  const groupMetadataByCategory = () => {
    const categories: Record<string, Record<string, string>> = {
      'Información de la imagen': {},
      'Información de la cámara': {},
      'Información de fecha/hora': {},
      'Información de ubicación': {},
      'Información de software': {},
      'Otros metadatos': {}
    };

    Object.entries(analysis.metadata).forEach(([key, value]) => {
      const keyLower = key.toLowerCase();
      
      if (keyLower.includes('image') || keyLower.includes('width') || keyLower.includes('height')) {
        categories['Información de la imagen'][key] = value;
      } else if (keyLower.includes('make') || keyLower.includes('model') || keyLower.includes('camera')) {
        categories['Información de la cámara'][key] = value;
      } else if (keyLower.includes('date') || keyLower.includes('time')) {
        categories['Información de fecha/hora'][key] = value;
      } else if (keyLower.includes('gps') || keyLower.includes('location') || keyLower.includes('latitude') || keyLower.includes('longitude')) {
        categories['Información de ubicación'][key] = value;
      } else if (keyLower.includes('software') || keyLower.includes('creator') || keyLower.includes('processing')) {
        categories['Información de software'][key] = value;
      } else {
        categories['Otros metadatos'][key] = value;
      }
    });

    return categories;
  };

  const categories = groupMetadataByCategory();
  const visibleCategories = showAll ? categories : Object.fromEntries(
    Object.entries(categories).filter(([_, fields]) => Object.keys(fields).length > 0)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Metadatos EXIF</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showAll ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showAll ? 'Ocultar vacías' : 'Mostrar todas'}</span>
        </button>
      </div>

      {/* Alertas de problemas detectados */}
      {(analysis.analysis.software_detected.length > 0 || 
        analysis.analysis.suspicious_fields.length > 0 || 
        analysis.analysis.missing_data.length > 0) && (
        <div className="mb-6 space-y-3">
          {analysis.analysis.software_detected.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Software de edición detectado</span>
              </div>
              <div className="mt-2 space-y-1">
                {analysis.analysis.software_detected.map((item, index) => (
                  <div key={index} className="text-sm text-red-700">
                    <span className="font-medium">{item.field}:</span> {item.value} 
                    <span className="ml-2 text-red-600">(Software: {item.software})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.analysis.suspicious_fields.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-yellow-800">
                <Info className="w-5 h-5" />
                <span className="font-semibold">Campos sospechosos detectados</span>
              </div>
              <div className="mt-2 space-y-1">
                {analysis.analysis.suspicious_fields.map((item, index) => (
                  <div key={index} className="text-sm text-yellow-700">
                    <span className="font-medium">{item.field}:</span> {item.value}
                    <span className="ml-2 text-yellow-600">({item.reason})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.analysis.missing_data.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-blue-800">
                <Info className="w-5 h-5" />
                <span className="font-semibold">Datos importantes faltantes</span>
              </div>
              <div className="mt-2 text-sm text-blue-700">
                {analysis.analysis.missing_data.join(', ')}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Metadatos por categorías */}
      <div className="space-y-4">
        {Object.entries(visibleCategories).map(([categoryName, fields]) => {
          if (Object.keys(fields).length === 0) return null;
          
          const isExpanded = expandedSections.has(categoryName);
          
          return (
            <div key={categoryName} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleSection(categoryName)}
                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{categoryName}</h3>
                  <span className="text-sm text-gray-500">
                    {Object.keys(fields).length} campos
                  </span>
                </div>
              </button>
              
              {isExpanded && (
                <div className="p-4">
                  <div className="space-y-3">
                    {Object.entries(fields).map(([key, value]) => {
                      const isSuspicious = isSuspiciousField(key, value);
                      const isMissing = isMissingField(key);
                      
                      return (
                        <div 
                          key={key} 
                          className={`p-3 rounded border-l-4 ${
                            isSuspicious 
                              ? 'bg-red-50 border-red-400' 
                              : isMissing 
                                ? 'bg-yellow-50 border-yellow-400'
                                : 'bg-gray-50 border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm">
                                {key}
                                {isSuspicious && (
                                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Sospechoso
                                  </span>
                                )}
                                {isMissing && (
                                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    <Info className="w-3 h-3 mr-1" />
                                    Faltante
                                  </span>
                                )}
                              </div>
                              <div className={`text-sm mt-1 ${
                                isSuspicious ? 'text-red-700' : 'text-gray-600'
                              }`}>
                                {value}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetadataDisplay;
