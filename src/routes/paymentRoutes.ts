import { Router } from 'express';
import { createToken } from '../controllers/paymentController';

const router = Router();

router.post('/create-token', createToken);

export default router;
