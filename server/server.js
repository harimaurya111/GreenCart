import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import cors from 'cors'
import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import userRouter from "./routes/userRoute.js"
import sellerRouter from "./routes/sellerRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import addressRouter from "./routes/addressRoute.js"
import orderRouter from "./routes/orderRouter.js"
import { stripeWebhooks } from "./controllers/orderController.js"
dotenv.config()

await connectCloudinary()


app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)


//Allow multiple origins
const allowedOrigin = ["http://localhost:5173","https://green-cart-frontend-jade.vercel.app"]


//Middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigin, credentials:true}))


app.get("/",(req,res)=>{
 res.send("Api is Working")
})

app.use("/api/user",userRouter)
app.use("/api/seller",sellerRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use("/api/order",orderRouter)


const PORT = process.env.PORT || 8001

await connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})
