import { User } from './user.model';

const findLastUser = async () => {
  const result = await User.findOne({ role: 'user' });
  return result?.id ?? null;
};

export const generateUserId = async () => {
  let userId = Number(1).toString().padStart(3, '0');
  const lastUserId: string | null = await findLastUser();
  if (lastUserId) {
    userId = (Number(lastUserId.split('-')[1]) + 1).toString().padStart(3, '0');
  }
  userId = `U-${userId}`;
  return userId;
};
