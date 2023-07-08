const express = require("express");
const { newDonation, getSingleDonation, myDonations, deleteDonation} = require("../controllers/donationController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/donation/new").post(isAuthenticatedUser, newDonation);
router.route("/donation/:id").get(isAuthenticatedUser, getSingleDonation);
router.route("/donation/me").get(isAuthenticatedUser, myDonations);
router.route("/admin/donation/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDonation);


module.exports = router;