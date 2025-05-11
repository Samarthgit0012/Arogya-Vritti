import express from "express";
import { getHospitals, getIPLocation, reverseGeocode } from "../controllers/geopifyController.js";
const router = express.Router();

router.get("/hospitals", getHospitals);
router.get("/ip-location", getIPLocation);
router.get("/reverse-geocode", reverseGeocode);

export default router;