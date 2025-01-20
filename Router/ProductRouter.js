import express from "express";
import { addProduct } from "../Controller/ProductController.js";

const productRouter=express.Router();

productRouter.post("/add",addProduct);

export default productRouter;