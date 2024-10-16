import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import path from 'path';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    element: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
