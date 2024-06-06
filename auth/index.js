import express from 'express'
import 'dotenv/config';
import authRoutes from './routes/authRoute';

const port = process.env.PORT || 3001;

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', authRoutes)


app.listen(port, ()=>{
    console.log(`Auth server is running at http://localhost:${port}...`)
})