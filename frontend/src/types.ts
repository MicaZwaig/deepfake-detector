// Tipos para la respuesta de la API
export interface AnalysisResult {
  filename: string;
  metadata: Record<string, string>;
  analysis: {
    software_detected: Array<{
      field: string;
      value: string;
      software: string;
    }>;
    suspicious_fields: Array<{
      field: string;
      value: string;
      reason: string;
    }>;
    missing_data: string[];
    inconsistencies: Array<{
      field1: string;
      field2: string;
      difference_days: number;
      reason: string;
    }>;
    confidence_score: number;
  };
  reliability_level: string;
  confidence_score: number;
  summary: {
    total_metadata_fields: number;
    software_detected_count: number;
    suspicious_fields_count: number;
    missing_data_count: number;
    inconsistencies_count: number;
  };
}

export interface ApiError {
  detail: string;
}
