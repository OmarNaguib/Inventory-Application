const { Router } = require("express");

const router = Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.viewAllCategories);

router.get("/create", categoryController.createCategoryGet);
router.post("/create", categoryController.createCategoryPost);

router.get("/:id", categoryController.viewCategory);

router.get("/:id/delete", categoryController.deleteCategoryGet);
router.post("/:id/delete", categoryController.deleteCategoryPost);

router.get("/:id/update", categoryController.updateCategoryGet);
router.post("/:id/update", categoryController.updateCategoryPost);

module.exports = router;
