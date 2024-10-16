import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ success: false, messge: 'api not found', error: '' });
};
export default notFound;
