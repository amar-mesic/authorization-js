import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import mongoose from 'mongoose'
import { register } from './controllers/auth'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'

// const __filename = fileURLToPath("./");
// const __dirname = path.dirname("./");
dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// FILE STORAGE
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'public/assets')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })

// ROUTES WITH FILES
app.post('/auth/register', upload.single('picture'), register)

// ROUTES
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

/* MONGOOSE SETUP */
const port = process.env.PORT || 6001
mongoose
    .connect(process.env.DB_URL || '<--DB URL NOT FOUND-->', {})
    .then(() => app.listen(port, () => console.log(`server port: ${port}`)))
    .catch((error) => console.error(`did not connect - ${error}`))
