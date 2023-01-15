import bcrypt from 'bcrypt'
import User from '../models/user'
import jwt from 'jsonwebtoken'

type RegisterProps = {
    firstName: string
    lastName: string
    email: string
    password: string
    location: string
    occupation: string
    picture: File | undefined
}

export async function register(req: any, res: any) {
    console.log(`request received!: ${JSON.stringify(req.file)}`)
    try {
        const userInfo: RegisterProps = req.body
        console.log(`request body: ${JSON.stringify(req.body)}`)

        const salt = await bcrypt.genSalt()
        const hashword = await bcrypt.hash(userInfo.password, salt)

        const newUser = new User({
            ...userInfo,
            password: hashword,
            viewedProfile: Math.floor(Math.random() * 100),
            impressions: Math.floor(Math.random() * 100),
            friends: [],
        })
        console.log(`user: ${JSON.stringify(newUser, null, 2)}`)

        const savedUser = await newUser.save()
        const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET!)
        return res.status(201).json({ user: savedUser, token })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export async function login(req: any, res: any) {
    console.log('response received!')
    try {
        const { email, password } = req.body
        console.log(`request body: ${req.body}`)
        const user = await User.findOne({ email: email })
        console.log(`user: ${JSON.stringify(user)}`)
        if (!user)
            return res
                .status(400)
                .json({ field: 'email', msg: 'user does not exist' })

        bcrypt.compare(password, user.password!).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({ field: 'password', msg: 'incorrect password' })

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY!)
            delete user.password
            res.status(200).json({ token, user })
        })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}
