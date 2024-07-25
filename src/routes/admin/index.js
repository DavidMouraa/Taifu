const express = require("express");
const adminController = require("../../controller/admin/adminController")

const categoriesRoutes = require("./categories")
const productsRoutes = require("./products")

const router = express.Router()

router.get("/", adminController.renderAdminPage)

router.use("/categories", categoriesRoutes)

router.use("/products", productsRoutes)

module.exports = router