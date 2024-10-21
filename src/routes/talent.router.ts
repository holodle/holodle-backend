import { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import TalentController from "@/controllers/talent.controller"

export default class TalentRouter {
    static url = "/talents"

    static router(): Router {
        const router = Router()

        // scope: anonymous
        router.get("/", expressAsyncHandler(TalentController.getAllTalents))

        // scope: anonymous
        router.get("/:id", expressAsyncHandler(TalentController.getTalent))

        return router
    }
}
