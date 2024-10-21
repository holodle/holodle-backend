export function getTomorrowMMDD(): string {
    const now = new Date()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    return `${('0' + (tomorrow.getMonth() + 1)).slice(-2)}${('0' + (tomorrow.getDate() + 1)).slice(-2)}`
}

export function log(string: string): void {
    console.log(`[holodle-backend] ${string}`)
}
