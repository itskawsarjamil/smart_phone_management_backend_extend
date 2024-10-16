import { Router, Request, Response } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    element: AuthRoutes,
  },
  {
    path: '/auth',
    element: AuthRoutes,
  },
];

router.get('/', (req: Request, res: Response) => {
  res.send({ message: 'test' });
});

moduleRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
