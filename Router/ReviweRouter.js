import express from "express";
import { addReviwe,getReviwe,deleteReviwe, approvedReviwe } from "../Controller/ReviweController.js";

const reviweRouter=express.Router();
reviweRouter.post("/",addReviwe);  //add reviwe
reviweRouter.get("/",getReviwe); //get(show)  reviwe
reviweRouter.delete("/:email",deleteReviwe); //delete reviwe useing parameeter(Sending the email parameter to the end of the router) value
reviweRouter.put("/approve/:email",approvedReviwe)// Approved reviwe useing parameeter

export default reviweRouter;