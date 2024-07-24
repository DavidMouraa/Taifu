const express = require("express");
const productsController = require("../../controller/admin/productsController");
const {productImgUpload} = require("../../../config/multer")

const router = express.Router()

router.get("/", productsController.renderProductsPage)

router.get("/register", productsController.renderRegProductPage)

router.post("/register", productImgUpload.fields([
    {name: "largeImage", maxCount: 1},
    {name: "smallImage", maxCount: 1}
]), productsController.regProduct)

module.exports = router