import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff', '.webp']
    },
    multiple: false,
    disabled: isLoading
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive || dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onMouseEnter={() => setDragActive(true)}
        onMouseLeave={() => setDragActive(false)}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          ) : (
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isLoading ? 'Analizando imagen...' : 'Sube una imagen para analizar'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isDragActive 
                ? 'Suelta la imagen aquí' 
                : 'Arrastra y suelta una imagen aquí, o haz clic para seleccionar'
              }
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <ImageIcon className="w-4 h-4" />
              <span>Formatos soportados: JPEG, PNG, GIF, BMP, TIFF, WebP</span>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm">Procesando imagen...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
