import jwt from 'jsonwebtoken';

export const createToken = (
  payload: { email: string },
  accessToken: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, accessToken, {
    expiresIn,
  });
};
