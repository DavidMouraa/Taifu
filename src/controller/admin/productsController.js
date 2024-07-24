const Product = require("../../models/product")
const Category = require("../../models/category")
const { getErrorMsgs } = require("../../../public/javascripts/validations")

exports.renderProductsPage = (req, res) => {
    Product.findAll().then(products => {
        res.render("pages/admin/products/products", {
            layout: "layouts/admin",
            products: products
        })
    }).catch(err => {
        console.log(`Erro ao procurar por produtos: ${err}`)
        res.redirect("/admin")
    })
}

exports.renderRegProductPage = (req, res) => {
    Category.findAll().then(categories => {
        res.render("pages/admin/products/regProduct", {
            layout: "layouts/admin",
            categories: categories
        })
    })
}

exports.regProduct = (req, res) => {
    const {desc, price, discont, salePrice, categoryId} = req.body

    const smallImage = req.files["smallImage"] ? req.files["smallImage"][0] : null
    const largeImage = req.files["largeImage"] ? req.files["largeImage"][0] : null

    Product.create({
        desc: desc,
        smallImage: smallImage.filename,
        largeImage: largeImage.filename,
        price: price,
        discont: discont,
        salePrice: salePrice,
        categoryId: categoryId,
    }).then(() => {
        res.redirect("/admin/products")
    }).catch(err => {
        req.flash("error", getErrorMsgs(err))
        res.redirect("/admin/products/register")
    })
}