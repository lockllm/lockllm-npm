/**
 * Error type definitions
 */

export interface ScanResult {
  safe: boolean;
  label: 0 | 1;
  confidence: number;
  injection: number;
  sensitivity: 'low' | 'medium' | 'high';
}

export interface LockLLMErrorData {
  message: string;
  type: string;
  code?: string;
  status?: number;
  requestId?: string;
  [key: string]: any;
}

export interface PromptInjectionErrorData extends LockLLMErrorData {
  scanResult: ScanResult;
}
