import express from "express"
import cors from 'cors'
import "dotenv/config"
import connectDB from "./config/mongoDB.js"
import concectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoutes.js"
import vendorRouter from './routes/vendorRoutes.js'
import userRouter from "./routes/userRoutes.js"

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
concectCloudinary()


//middleware
app.use(express.json())
app.use(cors())


//api end points
app.use('/api/admin',adminRouter)
app.use('/api/vendor',vendorRouter)
app.use('/api/user', userRouter)


app.get('/' ,(req, res)=>{
    res.send("API IS WORKING ")
})

app.listen(port, ()=>console.log("server is started" , port))