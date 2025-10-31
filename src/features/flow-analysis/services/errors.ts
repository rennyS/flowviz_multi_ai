export class AIServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
    public readonly retryable: boolean = false
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

export class NetworkError extends AIServiceError {
  constructor(message: string = 'Network connection failed') {
    super(message, 'NETWORK_ERROR', undefined, true);
    this.name = 'NetworkError';
  }
}

export class APIError extends AIServiceError {
  constructor(message: string, statusCode: number) {
    const retryable = statusCode >= 500 || statusCode === 429;
    super(message, 'API_ERROR', statusCode, retryable);
    this.name = 'APIError';
  }
}

export class ValidationError extends AIServiceError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400, false);
    this.name = 'ValidationError';
  }
}