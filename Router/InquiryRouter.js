import express from "express";
import { addInquiry } from "../Controller/InquiryController.js";

const inquiryRouter=express.Router();

inquiryRouter.post("/",addInquiry);


export default inquiryRouter;