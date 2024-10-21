import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import TalentRouter from "@/routes/talent.router"
import GenerationRouter from "@/routes/generation.router"
import BranchRouter from "@/routes/branch.router"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(require("cors")())

app.get("/", (_: Request, res: Response) => {
    res.status(200).json({
        message: "ok",
        env: (process.env.ENV ?? "local").toLowerCase()
    })
})

app.use(TalentRouter.url, TalentRouter.router())
app.use(GenerationRouter.url, GenerationRouter.router())
app.use(BranchRouter.url, BranchRouter.router())

app.listen(port, () => {
    console.log(`[holodle-backend] Running at http://localhost:${port}!`)
})
