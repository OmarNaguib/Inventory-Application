const { Router } = require("express");

const router = Router();

const itemController = require("../controllers/itemController");

router.get("/", itemController.viewAllItems);

router.get("/create", itemController.createItemGet);
router.post("/create", itemController.createItemPost);

router.get("/:id", itemController.viewItem);

router.get("/:id/delete", itemController.deleteItemGet);
router.post("/:id/delete", itemController.deleteItemPost);

router.get("/:id/update", itemController.updateItemGet);
router.post("/:id/update", itemController.updateItemPost);

module.exports = router;
