import { decodeToken } from '@/components/utils/decode-utils';

const generateToken = (payload: object, header = { alg: 'HS256', typ: 'JWT' }, signature = 'dummy-signature') => {
  const headerBase64Url = btoa(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const payloadBase64Url = btoa(JSON.stringify(payload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const signatureBase64Url = signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${headerBase64Url}.${payloadBase64Url}.${signatureBase64Url}`;
};

describe('decodeToken', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly decode a JWT token and return the id and iat', () => {
    const sampleData = {
      id: '6736de8f281cb64d91e94b7b',
      iat: 1733473631,
    };

    const token = generateToken(sampleData);
    const result = decodeToken(token);

    expect(result).toEqual({
      id: '6736de8f281cb64d91e94b7b',
      iat: 1733473631,
    });
  });

  it('should handle tokens with padding characters correctly', () => {
    const sampleData = {
      id: 'abcdef123456',
      iat: 1733473640,
    };

    const payload = btoa(JSON.stringify(sampleData)) + '==';
    console.log(payload);
    const token = generateToken(sampleData, { alg: 'HS256', typ: 'JWT' }, 'dummy-signature');

    const result = decodeToken(token);

    expect(result).toEqual({
      id: 'abcdef123456',
      iat: 1733473640,
    });
  });

  it('should throw an error for malformed JSON in payload', () => {
    const header = 'eyJhbGciOiJIUzI';
    const payload = btoa('{"malformed json"');
    const signature = 'dummy-signature';

    const token = `${header}.${payload}.${signature}`;

    expect(() => decodeToken(token)).toThrowError('Invalid JSON in token payload');
  });

  it('should throw an error for a token with missing parts', () => {
    const token = 'eyJhbGciOiJIUzI';

    expect(() => decodeToken(token)).toThrowError('Malformed token');
  });

  it('should throw an error if _doc or id is missing in payload', () => {
    const sampleData = { userId: '789' };

    const token = generateToken(sampleData);

    expect(() => decodeToken(token)).toThrowError('Missing id in token payload');
  });
});
