export const decodeToken = (token: string) => {
  const base64UrlDecode = (base64Url: string) => {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    base64 += '='.repeat((4 - (base64.length % 4)) % 4);
    const decodedData = atob(base64);
    try {
      return JSON.parse(decodedData);
    } catch (error) {
      throw new Error('Invalid JSON in token payload');
    }
  };

  const [headerBase64, payloadBase64, signatureBase64] = token.split('.');
  console.log(headerBase64);
  console.log(signatureBase64);
  const decodedPayload = base64UrlDecode(payloadBase64);

  if (!decodedPayload || !decodedPayload.id) {
    throw new Error('Missing id in token payload');
  }
  return {
    id: decodedPayload.id,
    iat: decodedPayload.iat,
  };
};
