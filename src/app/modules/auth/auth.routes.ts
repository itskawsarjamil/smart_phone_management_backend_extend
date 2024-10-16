import { Request, Response, Router } from 'express';

const router = Router();

// router.get('',validateRequest,authController.)
router.get('/test', (req: Request, res: Response) => {
  res.send({ message: 'test' });
});
export const AuthRoutes = router;
