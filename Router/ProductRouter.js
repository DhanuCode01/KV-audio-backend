import express from "express";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../Controller/ProductController.js";

const productRouter=express.Router();

productRouter.post("/add",addProduct);
productRouter.get("/",getProducts);
productRouter.put("/:key",updateProduct);
productRouter.delete("/:key",deleteProduct);

export default productRouter;