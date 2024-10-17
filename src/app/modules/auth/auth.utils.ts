import jwt from 'jsonwebtoken';

export const createToken = (
  payload: { id: string; role: 'user' | 'superAdmin' },
  accessToken: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, accessToken, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
