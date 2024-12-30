const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js"); // Import the model correctly and capitalize
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");
const multer=require('multer');
const { storage } = require("../cloudconfig.js");
const upload=multer({storage});


router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
   .post(isLoggedIn, upload.single('listing[image]'),validatelisting, wrapAsync(listingcontroller.createlisting));
 

// New route
router.get("/new", isLoggedIn, listingcontroller.rendernewform);

router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showlisting))
  .put(isLoggedIn, isOwner, upload.single('listing[image]'),validatelisting, wrapAsync(listingcontroller.updatelisting))
  .delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.destroylisting));

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingcontroller.rendereditform));

module.exports = router;
