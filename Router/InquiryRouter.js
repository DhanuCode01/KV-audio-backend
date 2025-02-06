import express from "express";
import { addInquiry ,deleteInquiry,getInquiriry, updateInquiry} from "../Controller/InquiryController.js";

const inquiryRouter=express.Router();

inquiryRouter.post("/",addInquiry);
inquiryRouter.get("/",getInquiriry);
inquiryRouter.delete("/:id",deleteInquiry);
inquiryRouter.put("/:id",updateInquiry);




export default inquiryRouter;