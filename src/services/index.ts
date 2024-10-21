import dotenv from "dotenv"
import { log } from "@/lib/tools"
import IRepository, { LocalRepository } from "@/services/repository"

dotenv.config()

export let DB: IRepository

switch (process.env.ENV) {
    case "DEV":
    case "PROD": {
        log(`Environment: ${process.env.ENV}`)
        DB = new LocalRepository()
    } break

    default: {
        log(`Environment: LOCAL`)
        DB = new LocalRepository()
    }
}
