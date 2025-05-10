const express = require("express");
const router = express.Router();
const {
  getHospitals,
  getIPLocation,
  reverseGeocode,
} = require("../controllers/geopifyController");

router.get("/hospitals", getHospitals);
router.get("/ip-location", getIPLocation);
router.get("/reverse-geocode", reverseGeocode);

module.exports = router;
