from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import exifread
from PIL import Image
from datetime import datetime
import io
import json
from typing import Dict, Any, List
import re

app = FastAPI(title="Deepfake Detector API", version="1.0.0")

# Configurar CORS para permitir requests desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL del frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MetadataAnalyzer:
    def __init__(self):
        # Software de edición conocido
        self.editing_software = [
            "photoshop", "gimp", "paint", "paint.net", "coreldraw", 
            "illustrator", "lightroom", "capture one", "darktable",
            "rawtherapee", "luminar", "affinity", "canva", "figma",
            "sketch", "pixelmator", "acorn", "photopea"
        ]
        
        # Marcas de cámaras conocidas
        self.camera_brands = [
            "canon", "nikon", "sony", "fujifilm", "panasonic", 
            "olympus", "leica", "pentax", "samsung", "kodak",
            "apple", "huawei", "xiaomi", "oneplus", "google"
        ]

    def extract_metadata(self, image_data: bytes) -> Dict[str, Any]:
        """Extrae metadatos EXIF de la imagen"""
        try:
            # Usar exifread para extraer metadatos
            tags = exifread.process_file(io.BytesIO(image_data), details=True)
            
            metadata = {}
            
            # Convertir tags a diccionario
            for tag in tags.keys():
                if tag not in ['JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote']:
                    metadata[tag] = str(tags[tag])
            
            return metadata
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error al extraer metadatos: {str(e)}")

    def analyze_manipulation_indicators(self, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Analiza indicadores de manipulación"""
        indicators = {
            "software_detected": [],
            "suspicious_fields": [],
            "missing_data": [],
            "inconsistencies": [],
            "confidence_score": 100
        }
        
        # Verificar software de edición
        for key, value in metadata.items():
            value_lower = str(value).lower()
            for software in self.editing_software:
                if software in value_lower:
                    indicators["software_detected"].append({
                        "field": key,
                        "value": value,
                        "software": software
                    })
                    indicators["confidence_score"] -= 20
        
        # Verificar campos sospechosos
        suspicious_patterns = [
            ("Software", r"photoshop|gimp|paint|editor"),
            ("Processing Software", r"photoshop|gimp|paint|editor"),
            ("Creator Tool", r"photoshop|gimp|paint|editor"),
            ("History", r"photoshop|gimp|paint|editor")
        ]
        
        for field, pattern in suspicious_patterns:
            if field in metadata:
                if re.search(pattern, str(metadata[field]), re.IGNORECASE):
                    indicators["suspicious_fields"].append({
                        "field": field,
                        "value": metadata[field],
                        "reason": "Software de edición detectado"
                    })
                    indicators["confidence_score"] -= 15
        
        # Verificar datos faltantes importantes
        important_fields = [
            "EXIF DateTimeOriginal",
            "EXIF DateTimeDigitized", 
            "Image DateTime",
            "EXIF Make",
            "EXIF Model"
        ]
        
        for field in important_fields:
            if field not in metadata:
                indicators["missing_data"].append(field)
                indicators["confidence_score"] -= 5
        
        # Verificar inconsistencias en fechas
        date_fields = []
        for key in metadata.keys():
            if "date" in key.lower() or "time" in key.lower():
                date_fields.append((key, metadata[key]))
        
        if len(date_fields) > 1:
            # Verificar si las fechas son consistentes
            dates = []
            for field, value in date_fields:
                try:
                    # Intentar parsear diferentes formatos de fecha
                    date_str = str(value).replace(":", "-", 2)
                    parsed_date = datetime.strptime(date_str.split()[0], "%Y-%m-%d")
                    dates.append((field, parsed_date))
                except:
                    continue
            
            if len(dates) > 1:
                # Verificar si hay diferencias grandes entre fechas
                for i in range(len(dates)):
                    for j in range(i+1, len(dates)):
                        diff = abs((dates[i][1] - dates[j][1]).days)
                        if diff > 365:  # Más de un año de diferencia
                            indicators["inconsistencies"].append({
                                "field1": dates[i][0],
                                "field2": dates[j][0],
                                "difference_days": diff,
                                "reason": "Diferencia significativa en fechas"
                            })
                            indicators["confidence_score"] -= 10
        
        # Verificar si la imagen tiene metadatos mínimos
        if len(metadata) < 5:
            indicators["confidence_score"] -= 25
            indicators["missing_data"].append("Metadatos insuficientes")
        
        # Asegurar que el score no sea negativo
        indicators["confidence_score"] = max(0, indicators["confidence_score"])
        
        return indicators

    def get_reliability_level(self, confidence_score: int) -> str:
        """Determina el nivel de confiabilidad basado en el score"""
        if confidence_score >= 80:
            return "Alta"
        elif confidence_score >= 60:
            return "Media"
        elif confidence_score >= 40:
            return "Baja"
        else:
            return "Muy Baja"

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    """Endpoint principal para analizar una imagen"""
    try:
        # Validar tipo de archivo
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="El archivo debe ser una imagen")
        
        # Leer datos de la imagen
        image_data = await file.read()
        
        # Crear analizador
        analyzer = MetadataAnalyzer()
        
        # Extraer metadatos
        metadata = analyzer.extract_metadata(image_data)
        
        # Analizar indicadores de manipulación
        analysis = analyzer.analyze_manipulation_indicators(metadata)
        
        # Determinar nivel de confiabilidad
        reliability_level = analyzer.get_reliability_level(analysis["confidence_score"])
        
        # Preparar respuesta
        response = {
            "filename": file.filename,
            "metadata": metadata,
            "analysis": analysis,
            "reliability_level": reliability_level,
            "confidence_score": analysis["confidence_score"],
            "summary": {
                "total_metadata_fields": len(metadata),
                "software_detected_count": len(analysis["software_detected"]),
                "suspicious_fields_count": len(analysis["suspicious_fields"]),
                "missing_data_count": len(analysis["missing_data"]),
                "inconsistencies_count": len(analysis["inconsistencies"])
            }
        }
        
        return JSONResponse(content=response)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")

@app.get("/")
async def root():
    """Endpoint de prueba"""
    return {"message": "Deepfake Detector API está funcionando"}

@app.get("/health")
async def health_check():
    """Endpoint de salud"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
