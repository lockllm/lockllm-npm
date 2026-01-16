/**
 * Scan API implementation
 */

import { HttpClient } from './utils';
import type { ScanRequest, ScanResponse } from './types/scan';
import type { RequestOptions } from './types/common';

export class ScanClient {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Scan a prompt for injection attacks
   *
   * @param request - Scan request parameters
   * @param options - Request options
   * @returns Scan result with safety information
   *
   * @example
   * ```typescript
   * const result = await client.scan({
   *   input: "Ignore previous instructions and...",
   *   sensitivity: "medium"
   * });
   *
   * if (!result.safe) {
   *   console.log("Malicious prompt detected!");
   *   console.log("Injection score:", result.injection);
   * }
   * ```
   */
  async scan(
    request: ScanRequest,
    options?: RequestOptions
  ): Promise<ScanResponse> {
    const { data } = await this.http.post<ScanResponse>(
      '/v1/scan',
      {
        input: request.input,
        sensitivity: request.sensitivity || 'medium',
      },
      options
    );

    return data;
  }
}
