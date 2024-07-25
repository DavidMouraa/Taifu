const express = require("express");
const categoriesController = require("../../controller/admin/categoriesController")

const router = express.Router()

router.get("/", categoriesController.renderCategoriesPage)

router.get("/register", categoriesController.renderRegCategoryPage)

router.post("/register", categoriesController.regCategory)

router.get("/edit/:id", categoriesController.renderEditCategoryPage)

router.post("/edit", categoriesController.editCategory)

router.post("/delete", categoriesController.delCategory)

module.exports = router