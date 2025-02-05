import express from "express";
import { addInquiry ,deleteInquiry,getInquiriry} from "../Controller/InquiryController.js";

const inquiryRouter=express.Router();

inquiryRouter.post("/",addInquiry);
inquiryRouter.get("/",getInquiriry);
inquiryRouter.delete("/:id",deleteInquiry);




export default inquiryRouter;