import jwt from 'jsonwebtoken'
export async function verifyWebToken(req: any, res: any, next: any) {
    try {
        let token: string = req.header('Authorization')
        if (!token) return res.status(403).send('Access Denied')

        if (token.startsWith('Bearer '))
            token = token.slice(7, token.length).trimStart()

        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        req.user = verifiedUser
        next()
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}
