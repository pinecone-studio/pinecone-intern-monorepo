import { decodeToken } from '@/components/utils/decode-utils';

describe('decodeToken', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly decode a JWT token and return _doc content', () => {
    const sampleData = {
      _doc: {
        userId: '123',
        email: 'test@example.com',
        role: 'user',
      },
      iat: 1516239022,
    };

    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify(sampleData));
    const signature = 'dummy-signature';

    const headerBase64Url = header.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const payloadBase64Url = payload.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const signatureBase64Url = signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    const token = `${headerBase64Url}.${payloadBase64Url}.${signatureBase64Url}`;

    const result = decodeToken(token);

    expect(result).toEqual(sampleData._doc);
    expect(result.userId).toBe('123');
    expect(result.email).toBe('test@example.com');
    expect(result.role).toBe('user');
  });

  it('should handle tokens with padding characters correctly', () => {
    const sampleData = {
      _doc: {
        userId: '456',
        permissions: ['read', 'write'],
      },
    };

    const header = 'eyJhbGciOiJIUzI';
    const payload = btoa(JSON.stringify(sampleData)) + '==';
    const signature = 'dummy-signature';

    const payloadBase64Url = payload.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const token = `${header}.${payloadBase64Url}.${signature}`;

    const result = decodeToken(token);

    expect(result).toEqual(sampleData._doc);
    expect(result.userId).toBe('456');
    expect(result.permissions).toEqual(['read', 'write']);
  });

  it('should throw an error for malformed JSON in payload', () => {
    const header = 'eyJhbGciOiJIUzI';
    const payload = btoa('{"malformed json"');
    const signature = 'dummy-signature';

    const payloadBase64Url = payload.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const token = `${header}.${payloadBase64Url}.${signature}`;

    expect(() => decodeToken(token)).toThrow();
  });
});
