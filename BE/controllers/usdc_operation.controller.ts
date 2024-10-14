import { Request, Response } from "express";
import usdcOperationService from "../services/usdc_operation.service";
import { CREATED, OK } from "../core/success.response";


class UsdcOperationController {

    treasuryWallet = async (req: Request, res: Response) => {
        new OK({
            message: "Get Treasury Wallet Successfully",
            metadata: await usdcOperationService.treasuryWallet()
        }).send(res)
    }

    mint = async (req: Request, res: Response) => {

        new CREATED({
            message: "Mint success",
            metadata: await usdcOperationService.mint({ address: req.body.address, amount: req.body.amount })
        }).send(res)
    }

    generateAddress = async (req: Request, res: Response) => {
        new CREATED({
            message: "Generate Address Successfully",
            metadata: await usdcOperationService.generateAddress()
        }).send(res)
    }

    transferFrom = async (req: Request, res: Response) => {
        new CREATED({
            message: "Collect USDC Successfully",
            metadata: await usdcOperationService.transferFrom({ fromAddress: req.body.fromAddress })
        }).send(res)
    }

    burn = async (req: Request, res: Response) => {
        new CREATED({
            message: "Burn USDC Successfully",
            metadata: await usdcOperationService.burn({ address: req.body.address, amount: req.body.amount })
        }).send(res)
    }

}

const usdcOperationController = new UsdcOperationController()

export default usdcOperationController