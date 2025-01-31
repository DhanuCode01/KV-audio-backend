import express from "express";
import { addReviwe,getReviwe } from "../Controller/ReviweController.js";

const reviweRouter=express.Router();
reviweRouter.post("/",addReviwe);  //add reviwe
reviweRouter.get("/",getReviwe); //get(show)  reviwe

export default reviweRouter;