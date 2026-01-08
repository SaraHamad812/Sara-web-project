const express = require("express");
const router = express.Router();
const controller = require("../controllers/services.controller");

router.get("/", controller.getServices);
router.post("/", controller.addService);
router.put("/:id", controller.updateService);
router.delete("/:id", controller.deleteService);

module.exports = router;
