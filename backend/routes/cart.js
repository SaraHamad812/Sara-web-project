const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart.controller");

router.get("/", controller.getCart);
router.post("/add", controller.addToCart);
router.delete("/:id", controller.removeFromCart);
router.put("/qty/:id", controller.updateQuantity);

module.exports = router;
