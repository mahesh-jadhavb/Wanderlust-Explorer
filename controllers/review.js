const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createreview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyreview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Pull the review reference from the listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document from the database
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");

    res.redirect(`/listings/${id}`);
}
