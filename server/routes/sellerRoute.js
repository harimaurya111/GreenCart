import express from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js'
import authSeller from '../middlewares/authSeller.js'
const sellerRouter = express.Router()


sellerRouter.post("/login",sellerLogin)
sellerRouter.get("/logout",sellerLogout)
sellerRouter.get("/is-auth",authSeller,isSellerAuth)




export default sellerRouter