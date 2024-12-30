const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validatereview, isLoggedIn, isReviewAuthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/review.js");

//reviews
//post route
router.post("/",isLoggedIn,validatereview, wrapAsync(reviewcontroller.createreview));
    
    //delete review route
    //delete review route
  router.delete("/:reviewId",isLoggedIn ,isReviewAuthor,wrapAsync(reviewcontroller.destroyreview));
    module.exports=router;