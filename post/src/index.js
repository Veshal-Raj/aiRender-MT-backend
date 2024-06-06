import express from 'express'
import 'dotenv/config';

const port = process.env.PORT || 3000;

const app = express()



app.listen(port, ()=>{
    console.log(`Post server is running at http://localhost:${port}...`)
})