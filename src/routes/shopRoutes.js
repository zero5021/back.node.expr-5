//shopRoutes.js
const express = require("express");
const router = express.Router();

const {
    getJoyasByPage, 
    getJoyasByFilter
} = require("../controllers/shopController");

router.get("/joyas", getJoyasByPage);
router.get("/joyas/filters", getJoyasByFilter)

module.exports = router;