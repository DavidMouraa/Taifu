const express = require("express");
const productsController = require("../../controller/admin/productsController");
const {productImgUpload} = require("../../../config/multer")

const router = express.Router()

router.get("/", productsController.renderProductsPage)


router.get("/register", productsController.renderRegProductPage)

router.post("/register", productImgUpload.fields([
    {name: "largeImg", maxCount: 1},
    {name: "smallImg", maxCount: 1}
]), productsController.regProduct)

router.get("/edit/:id", productsController.renderEditProductPage)

router.post("/delete", productsController.delProduct)

module.exports = router