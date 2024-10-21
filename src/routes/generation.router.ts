import { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import GenerationController from "@/controllers/generation.controller"

export default class GenerationRouter {
    static url = "/generations"

    static router(): Router {
        const router = Router()

        // scope: anonymous
        router.get("/", expressAsyncHandler(GenerationController.getAllGenerations))

        // scope: anonymous
        router.get("/:id", expressAsyncHandler(GenerationController.getGeneration))

        return router
    }
}
