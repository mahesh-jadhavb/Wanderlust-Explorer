const Listing = require("../models/listing");
module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });
}

module.exports.rendernewform = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showlisting = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author", }, }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createlisting = async (req, res, next) => {
let url=req.file.path;
let filename=req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image={url,filename};
    await newlisting.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");

}

module.exports.rendereditform = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
   originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
}

module.exports.updatelisting = async (req, res) => {
    let { id } = req.params;

   let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if(typeof req.file!=="undefined"){   
   let url=req.file.path;
let filename=req.file.filename;
listing.image={url,filename};
await listing.save();
}
    req.flash("success", "Listing Updated");

    res.redirect(`/listings/${id}`);
}

module.exports.destroylisting=async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    // console.log(deletedlisting);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
    }