import { handleError } from '../src/errorHandler';
import {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

describe('handleError utility function', () => {
  const mockAxiosError = (codeToTest: number): AxiosError => {
    const response: AxiosResponse = {
      status: codeToTest,
      statusText: 'Request failed',
      data: {},
      headers: {},
      config: {} as InternalAxiosRequestConfig,
      request: {},
    };
    const error = new AxiosError('Request failed', 'ERR', {
      url: 'http://example.com',
      method: 'get',
      headers: { 'Content-Type': 'application/json' } as AxiosRequestHeaders,
    });
    error.response = response;
    return error;
  };

  const errorMessages = {
    400: 'Bad Request',
    403: 'Forbidden',
    404: 'Not Found',
  };

  describe('When errorMessages is a string and errorCodeToCheck is undefined', () => {
    it('returns custom message for AxiosError with status < 500', () => {
      const error = mockAxiosError(400);
      const result = handleError(error, 'Custom error message');
      expect(result).toBe('Custom error message');
    });

    it('returns default server error message for AxiosError with status >= 500', () => {
      const error = mockAxiosError(500);
      const result = handleError(error, 'Custom error message');
      expect(result).toBe('A server error occurred. Please try again later.');
    });

    it('returns error message for generic Error', () => {
      const error = new Error('Generic error');
      const result = handleError(error, 'Custom error message');
      expect(result).toBe('Generic error');
    });

    it('returns default unknown error message for unknown error', () => {
      const error = {};
      const result = handleError(error, 'Custom error message');
      expect(result).toBe('An unknown error occurred.');
    });
  });

  describe('When errorMessages is a string and errorCodeToCheck is a number', () => {
    it('returns custom message for AxiosError with matching code', () => {
      const error = mockAxiosError(400);
      const result = handleError(error, 'Custom error message', 400);
      expect(result).toBe('Custom error message');
    });

    it('returns default client error message for AxiosError with non-matching code', () => {
      const error = mockAxiosError(403);
      const result = handleError(error, 'Custom error message', 400);
      expect(result).toBe('An unknown error occurred.');
    });

    it('returns default server error message for AxiosError with status >= 500', () => {
      const error = mockAxiosError(500);
      const result = handleError(error, 'Custom error message', 400);
      expect(result).toBe('A server error occurred. Please try again later.');
    });

    it('returns error message for generic Error', () => {
      const error = new Error('Generic error');
      const result = handleError(error, 'Custom error message', 400);
      expect(result).toBe('Generic error');
    });

    it('returns default unknown error message for unknown error', () => {
      const error = {};
      const result = handleError(error, 'Custom error message', 400);
      expect(result).toBe('An unknown error occurred.');
    });
  });

  describe('When errorMessages is an object', () => {
    it('returns corresponding message for AxiosError with matching code', () => {
      const error = mockAxiosError(400);
      const result = handleError(error, errorMessages);
      expect(result).toBe('Bad Request');
    });

    it('returns default client error message for AxiosError with non-matching code', () => {
      const error = mockAxiosError(418);
      const result = handleError(error, errorMessages);
      expect(result).toBe('An unknown error occurred.');
    });

    it('returns default server error message for AxiosError with status >= 500', () => {
      const error = mockAxiosError(500);
      const result = handleError(error, errorMessages);
      expect(result).toBe('A server error occurred. Please try again later.');
    });

    it('returns error message for generic Error', () => {
      const error = new Error('Generic error');
      const result = handleError(error, errorMessages);
      expect(result).toBe('Generic error');
    });

    it('returns default unknown error message for unknown error', () => {
      const error = {};
      const result = handleError(error, errorMessages);
      expect(result).toBe('An unknown error occurred.');
    });
  });

  describe('When serverErrorMessage is customized', () => {
    it('returns custom server error message for AxiosError with status >= 500', () => {
      const error = mockAxiosError(500);
      const result = handleError(
        error,
        'Custom error message',
        400,
        'Custom server error message',
      );
      expect(result).toBe('Custom server error message');
    });

    it('returns default client error message for AxiosError with status < 500', () => {
      const error = mockAxiosError(401);
      const result = handleError(
        error,
        'Custom error message',
        400,
        'Custom server error message',
      );
      expect(result).toBe('An unknown error occurred.');
    });

    it('returns error message for generic Error', () => {
      const error = new Error('Generic error');
      const result = handleError(
        error,
        'Custom error message',
        400,
        'Custom server error message',
      );
      expect(result).toBe('Generic error');
    });

    it('returns default unknown error message for unknown error', () => {
      const error = {};
      const result = handleError(
        error,
        'Custom error message',
        400,
        'Custom server error message',
      );
      expect(result).toBe('An unknown error occurred.');
    });
  });

  describe('When unknownServerMessage is customized', () => {
    it('returns custom unknown error message for AxiosError', () => {
      const error = mockAxiosError(401);
      const result = handleError(
        error,
        'Custom error message',
        400,
        undefined,
        'Custom unknown error message',
      );
      expect(result).toBe('Custom unknown error message');
    });

    it('returns error message for generic Error', () => {
      const error = new Error('Generic error');
      const result = handleError(
        error,
        'Custom error message',
        400,
        undefined,
        'Custom unknown error message',
      );
      expect(result).toBe('Generic error');
    });

    it('returns custom unknown error message for unknown error', () => {
      const error = {};
      const result = handleError(
        error,
        'Custom error message',
        400,
        undefined,
        'Custom unknown error message',
      );
      expect(result).toBe('Custom unknown error message');
    });
  });
});
