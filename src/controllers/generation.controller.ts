import { Request, RequestHandler, Response } from "express"
import { DB } from "@/services"

export default class GenerationController {
    static getAllGenerations: RequestHandler = async (_: Request, res: Response) => {
        const generations = await DB.getGenerations()
        res.status(200).json(generations)
    }

    static getGeneration: RequestHandler = async (req: Request, res: Response) => {
        const id: string = String(req.params.id)
        const g = await DB.getGenerationById(id)
        if (g) {
            res.status(200).json(g)
        } else {
            res.status(404)
        }
    }
}
