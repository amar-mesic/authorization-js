export async function profile(req: any, res: any) {
    try {
    } catch (error) {}
}

export async function getUser(req: any, res: any) {
    try {
    } catch (error) {
        res.status(404).json({ error: (error as Error).message })
    }
}
