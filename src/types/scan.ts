/**
 * Scan API types
 */

import type { ScanResult } from './errors';

export type Sensitivity = 'low' | 'medium' | 'high';

export interface ScanRequest {
  /** The text prompt to scan for injection attacks */
  input: string;
  /** Detection sensitivity level (default: medium) */
  sensitivity?: Sensitivity;
}

/**
 * Full scan response from the scan API endpoint
 * Extends the base ScanResult with additional metadata
 */
export interface ScanResponse extends ScanResult {
  /** Unique request identifier */
  request_id: string;
  /** Usage statistics */
  usage: {
    /** Number of upstream inference requests */
    requests: number;
    /** Number of input characters processed */
    input_chars: number;
  };
  /** Debug information (only available with pro plan) */
  debug?: {
    /** Total processing duration in milliseconds */
    duration_ms: number;
    /** Inference time in milliseconds */
    inference_ms: number;
    /** Processing mode used */
    mode: 'single' | 'chunked';
  };
}
