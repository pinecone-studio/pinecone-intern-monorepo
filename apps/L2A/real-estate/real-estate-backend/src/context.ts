import { USER_MODEL } from './models/user';
import { verifyToken } from './utils/jwt';
import { NextRequest } from 'next/server';

const extractToken = (req: NextRequest): string | null => {
  const auth = req.headers.get('authorization') || '';
  return auth.startsWith('Bearer ') ? auth.replace('Bearer ', '') : null;
};

const isValidDecoded = (decoded: any): decoded is { id: string } => {
  return decoded && typeof decoded !== 'string' && 'id' in decoded;
};

const findUserById = async (id: string) => {
  return await USER_MODEL.findById(id).select('_id email isAdmin');
};

const getUserFromToken = async (token: string) => {
  try {
    const decoded = verifyToken(token);
    if (!isValidDecoded(decoded)) return null;
    return await findUserById(decoded.id);
  } catch {
    return null;
  }
};

export const context = async (req: NextRequest) => {
  const token = extractToken(req);
  if (!token) return { user: null };

  const user = await getUserFromToken(token);
  return { user };
};
