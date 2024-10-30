import { Router, Request, Response } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { smartPhoneRouter } from '../modules/smartPhone/smartPhone.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    element: userRoutes,
  },
  {
    path: '/auth',
    element: AuthRoutes,
  },
  {
    path: '/smartphone',
    element: smartPhoneRouter,
  },
];

router.get('/', (req: Request, res: Response) => {
  res.send({ message: 'test' });
});

moduleRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
