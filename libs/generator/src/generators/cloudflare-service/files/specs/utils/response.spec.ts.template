/* eslint-disable max-nested-callbacks */
import { errorResponse, jsonResponse } from '@/utils/responses';
import { Response } from 'node-fetch';

describe('Response Functions', () => {
  describe('jsonResponse', () => {
    test('should create a Response with JSON content', () => {
      const data = { key: 'value', number: 42 };
      const response = jsonResponse(data);

      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('application/json');
    });

    test('should stringify the data correctly', async () => {
      const data = { key: 'value', number: 42 };
      const response = jsonResponse(data);

      const responseBody = await response.json();
      expect(responseBody).toEqual(data);
    });

    test('should handle empty object', () => {
      const data = {};
      const response = jsonResponse(data);

      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(200);
    });

    test('should handle complex nested objects', async () => {
      const data = {
        user: {
          name: 'John Doe',
          age: 30,
          addresses: [
            { city: 'New York', country: 'USA' },
            { city: 'London', country: 'UK' },
          ],
        },
      };
      const response = jsonResponse(data);

      const responseBody = await response.json();
      expect(responseBody).toEqual(data);
    });
  });

  describe('errorResponse', () => {
    test('should create a Response with error message', () => {
      const status = 404;
      const message = 'Not Found';
      const response = errorResponse(status, message);

      expect(response).toBeInstanceOf(Response);
      expect(response.status).toBe(status);
      expect(response.headers.get('Content-Type')).toBe('application/json');
    });

    test('should include the error message in the response body', async () => {
      const status = 500;
      const message = 'Internal Server Error';
      const response = errorResponse(status, message);

      const responseBody = await response.json();
      expect(responseBody).toEqual({ message });
    });

    test('should handle different status codes', () => {
      const testCases = [
        { status: 400, message: 'Bad Request' },
        { status: 401, message: 'Unauthorized' },
        { status: 403, message: 'Forbidden' },
        { status: 500, message: 'Internal Server Error' },
      ];

      testCases.forEach(({ status, message }) => {
        const response = errorResponse(status, message);
        expect(response.status).toBe(status);
      });
    });

    test('should handle empty error message', async () => {
      const status = 418;
      const message = '';
      const response = errorResponse(status, message);

      const responseBody = await response.json();
      expect(responseBody).toEqual({ message: '' });
    });
  });
});
