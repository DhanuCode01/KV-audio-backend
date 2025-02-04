import express from "express";
import { addProduct, getProducts, updateProduct } from "../Controller/ProductController.js";

const productRouter=express.Router();

productRouter.post("/add",addProduct);
productRouter.get("/",getProducts);
productRouter.put("/:key",updateProduct);

export default productRouter;