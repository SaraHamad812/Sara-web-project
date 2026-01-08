const express = require("express");
const router = express.Router();
const controller = require("../controllers/contact.controller");

router.get("/", controller.getMessages);
router.post("/", controller.addMessage);
router.delete("/:id", controller.deleteMessage);

module.exports = router;
