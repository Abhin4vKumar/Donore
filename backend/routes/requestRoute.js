const express = require("express");
const { getAllRequests, createRequest, updateRequest, deleteRequest, getRequestDetails, getMyRequests } = require("../controllers/requestController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/requests").get(isAuthenticatedUser,getAllRequests);
router.route("/myRequest/:id").get(isAuthenticatedUser , getMyRequests);
router.route("/request/new").post(isAuthenticatedUser, createRequest);
router.route("/request/:id").put(isAuthenticatedUser , updateRequest).delete(isAuthenticatedUser, deleteRequest).get(getRequestDetails);
// router.route("/request/status/:id").get()

module.exports = router