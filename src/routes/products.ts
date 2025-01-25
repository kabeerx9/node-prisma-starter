import { Router } from "express";
import { createProduct } from "../controllers/products";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes = Router();

productRoutes.post("/create",[authMiddleware , adminMiddleware] ,errorHandler(createProduct));


export default productRoutes;
