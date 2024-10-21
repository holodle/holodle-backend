import { Router } from "express"
import expressAsyncHandler from "express-async-handler"
import BranchController from "@/controllers/branch.controller"

export default class BranchRouter {
    static url = "/branches"

    static router(): Router {
        const router = Router()

        // scope: anonymous
        router.get("/", expressAsyncHandler(BranchController.getAllBranches))

        // scope: anonymous
        router.get("/:id", expressAsyncHandler(BranchController.getBranch))

        return router
    }
}
