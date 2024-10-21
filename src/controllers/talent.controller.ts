import { Request, RequestHandler, Response } from "express"
import { DB } from "@/services"

export default class TalentController {
    static getAllTalents: RequestHandler = async (_: Request, res: Response) => {
        const talents = await DB.getTalents()
        res.status(200).json(talents)
    }

    static getTalent: RequestHandler = async (req: Request, res: Response) => {
        const id: string = String(req.params.id)
        const t = await DB.getTalentById(id)
        if (t) {
            res.status(200).json(t)
        } else {
            res.status(404)
        }
    }
}
