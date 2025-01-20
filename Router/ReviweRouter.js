import express from "express";
import { addReviwe } from "../Controller/ReviweController.js";

const reviweRouter=express.Router();
reviweRouter.post("/",addReviwe);