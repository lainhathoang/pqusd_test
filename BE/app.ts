import express, { urlencoded, json, Request, Response, NextFunction } from 'express'
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import 'dotenv/config';
import router from './routers';
import cors from 'cors';


const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(urlencoded({
    extended: true
}))
app.use(json())
app.use(cors())

app.use(router)


app.use((_req, _res, next) => {
    const error: any = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = (err as any).status || 500
    res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: err.stack,
        message: err.message || 'Internal Server Error'
    })
})


export default app