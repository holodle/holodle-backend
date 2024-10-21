import { Branch, Generation, Talent } from "holodle-types"
import { Nullable } from "@/lib/types/tools"
import LocalRepository from "@/services/repository/local/LocalRepository.service"

export default interface IRepository {
    // Talents
    getTalents(): Promise<Talent[]>
    getTalentById(id: string): Promise<Nullable<Talent>>
    addTalent(t: Talent): Promise<boolean>
    updateTalent(t: Talent): Promise<boolean>
    enableTalent(id: string): Promise<boolean>
    disableTalent(id: string): Promise<boolean>
    removeTalent(id: string): Promise<boolean>

    // Generations
    getGenerations(): Promise<Generation[]>
    getGenerationById(id: string): Promise<Nullable<Generation>>
    addGeneration(g: Generation): Promise<boolean>
    updateGeneration(g: Generation): Promise<boolean>
    removeGeneration(id: string): Promise<boolean>

    // Branches
    getBranches(): Promise<Branch[]>
    getBranchById(id: string): Promise<Nullable<Branch>>
    addBranch(b: Branch): Promise<boolean>
    updateBranch(b: Branch): Promise<boolean>
    removeBranch(id: string): Promise<boolean>
}

export {
    LocalRepository
}
