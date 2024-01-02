require('dotenv').config();
const express=require('express');
const connect=require('./Connection/db')
const cors=require('cors');
const errorMiddleware=require('./middlewares/errorMiddleware');
const userRouter=require('./Router/userRoute')
const noteRouter=require('./Router/noteRoute')

const port=process.env.PORT;
const app=express();
app.use(cors());
app.use(express.json());

app.use('/user',userRouter);
app.use('/note',noteRouter)

app.use(errorMiddleware);
connect;
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})