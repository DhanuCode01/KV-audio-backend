import express from "express";
import { addProduct, getProducts } from "../Controller/ProductController.js";

const productRouter=express.Router();

productRouter.post("/add",addProduct);
productRouter.get("/",getProducts);

export default productRouter;