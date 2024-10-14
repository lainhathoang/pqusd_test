'use strict'
import express from "express"
import { asyncHandler } from "../../helpers/asyncHandler";
import usdcOperationController from "../../controllers/usdc_operation.controller";

const router = express.Router();

router.get('/treasury-wallet', asyncHandler(usdcOperationController.treasuryWallet))

router.post('/mint', asyncHandler(usdcOperationController.mint))

router.post('/create-wallet', asyncHandler(usdcOperationController.generateAddress))

router.post('/collect', asyncHandler(usdcOperationController.transferFrom))

router.post('/burn', asyncHandler(usdcOperationController.burn))


export default router;