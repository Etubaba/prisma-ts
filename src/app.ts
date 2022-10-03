import express,{Application} from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import userRoutes from './routes/userPath'
import { PrismaClient } from '@prisma/client';
 


 export  const prisma= new PrismaClient()


const app:Application = express();

dotenv.config()
const port = process.env.PORT || 5000;


//midlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())


//routes 
app.use('/',userRoutes)

app.listen(port,()=>{
   console.log( `Server is running on port ${port}`)
})