import express from 'express';
import usdcOperation from './usdc_operation';

const router = express.Router();

router.use('/v1/api/usdc_operation', usdcOperation)

export default router