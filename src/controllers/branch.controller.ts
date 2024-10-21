import { Request, RequestHandler, Response } from "express"
import { DB } from "@/services"

export default class BranchController {
    static getAllBranches: RequestHandler = async (_: Request, res: Response) => {
        const branches = await DB.getBranches()
        res.status(200).json(branches)
    }

    static getBranch: RequestHandler = async (req: Request, res: Response) => {
        const id: string = String(req.params.id)
        const b = await DB.getBranchById(id)
        if (b) {
            res.status(200).json(b)
        } else {
            res.status(404)
        }
    }
}
