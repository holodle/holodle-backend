import { Nullable } from "@/lib/types/tools"
import IRepository from "@/services/repository"
import { Talent, Generation, Branch, IBranch, IGeneration, ITalent } from "holodle-types"

import branches from "@/services/repository/local/data/branches.json"
import generations from "@/services/repository/local/data/generations.json"
import talents from "@/services/repository/local/data/talents.json"
import { getTomorrowMMDD } from "@/lib/tools"

export default class LocalRepository implements IRepository {
    private readonly talents: Talent[]
    private readonly generations: Generation[]
    private readonly branches: Branch[]

    constructor() {
        this.talents = []
        this.generations = []
        this.branches = []

        for (const b of branches) {
            this.branches.push(new Branch(<IBranch>b))
        }

        const gp = generations.map(g => this.getBranchById(g.branch))
        Promise.all(gp).then(p => {
            for (let i = 0; i < generations.length; i++) {
                const g = generations[i]
                const g2: Partial<IGeneration> = { ...g, ...{ branch: p[i] ?? new Branch() } }
                this.generations.push(new Generation(g2))
            }
            talents.forEach(t => {
                const tgp = t.generations.map(g => this.getGenerationById(g))
                Promise.all(tgp).then(p => {
                    const p2 = p.map(x => x ?? new Generation())
                    const t2: Partial<ITalent> = { ...t, ...{ generations: p2 } }
                    this.talents.push(new Talent(t2))
                })
            })
        })
    }

    // Talents
    async getTalents(): Promise<Talent[]> {
        return this.talents.slice()
    }
    async getTalentById(id: string): Promise<Nullable<Talent>> {
        for (const t of this.talents) {
            if (t.id === id) return t
        }
        return null
    }
    async addTalent(t: Talent): Promise<boolean> {
        try {
            this.talents.push(t)
            return true
        } catch {
            return false
        }
    }
    async updateTalent(t: Talent): Promise<boolean> {
        for (let i = 0; i < this.talents.length; i++) {
            if (this.talents[i].id === t.id) {
                this.talents[i] = t
                return true
            }
        }
        return false
    }
    async enableTalent(id: string): Promise<boolean> {
        for (let i = 0; i < this.talents.length; i++) {
            if (this.talents[i].id === id) {
                this.talents[i].enableOn = getTomorrowMMDD()
                this.talents[i].disableOn = null
                return true
            }
        }
        return false
    }
    async disableTalent(id: string): Promise<boolean> {
        for (let i = 0; i < this.talents.length; i++) {
            if (this.talents[i].id === id) {
                this.talents[i].disableOn = getTomorrowMMDD()
                this.talents[i].enableOn = null
                return true
            }
        }
        return false
    }
    async removeTalent(id: string): Promise<boolean> {
        for (let i = 0; i < this.talents.length; i++) {
            if (this.talents[i].id === id) {
                this.talents.splice(i, 1)
                return true
            }
        }
        return false
    }

    // Generations
    async getGenerations(): Promise<Generation[]> {
        return this.generations.slice()
    }
    async getGenerationById(id: string): Promise<Nullable<Generation>> {
        for (const g of this.generations) {
            if (g.id === id) return g
        }
        return null
    }
    async addGeneration(g: Generation): Promise<boolean> {
        try {
            this.generations.push(g)
            return true
        } catch {
            return false
        }
    }
    async updateGeneration(g: Generation): Promise<boolean> {
        for (let i = 0; i < this.generations.length; i++) {
            if (this.generations[i].id === g.id) {
                this.generations[i] = g
                return true
            }
        }
        return false
    }
    async removeGeneration(id: string): Promise<boolean> {
        for (let i = 0; i < this.generations.length; i++) {
            if (this.generations[i].id === id) {
                this.generations.splice(i, 1)
                return true
            }
        }
        return false
    }

    // Branches
    async getBranches(): Promise<Branch[]> {
        return this.branches.slice()
    }
    async getBranchById(id: string): Promise<Nullable<Branch>> {
        for (const b of this.branches) {
            if (b.id === id) return b
        }
        return null
    }
    async addBranch(b: Branch): Promise<boolean> {
        try {
            this.branches.push(b)
            return true
        } catch {
            return false
        }
    }
    async updateBranch(b: Branch): Promise<boolean> {
        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].id === b.id) {
                this.branches[i] = b
                return true
            }
        }
        return false
    }
    async removeBranch(id: string): Promise<boolean> {
        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].id === id) {
                this.branches.splice(i, 1)
                return true
            }
        }
        return false
    }
}
