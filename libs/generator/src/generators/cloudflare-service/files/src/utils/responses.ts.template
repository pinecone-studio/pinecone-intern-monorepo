import { Response } from 'node-fetch';

export function jsonResponse(data: object) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function errorResponse(status: number, message: string) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
