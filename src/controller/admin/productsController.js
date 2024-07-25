const Product = require("../../models/product")
const Category = require("../../models/category")
const { getErrorMsgs } = require("../../../public/javascripts/validations")
const {resetTableIds} = require("../../../public/javascripts/triggers")

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

    const smallImg = req.files["smallImg"] ? req.files["smallImg"][0] : null
    const largeImg = req.files["largeImg"] ? req.files["largeImg"][0] : null

    console.log(smallImg)

    Product.create({
        desc: desc,
        smallImg: smallImg.filename,
        largeImg: largeImg.filename,
        price: price,
        discont: discont,
        salePrice: salePrice,
        categoryId: categoryId,
    }).then(() => {
        res.redirect("/admin/products")
    }).catch(err => {
        console.log(err)
        req.flash("error", getErrorMsgs(err))
        res.redirect("/admin/products/register")
    })
}

exports.renderEditProductPage = (req, res) => {
    const {id} = req.params
    console.log(id)

    Category.findAll().then(categories => {
        Product.findByPk(id).then(product => {
            res.render("pages/admin/products/editProduct", {
                layout: "layouts/admin",
                product: product,
                categories: categories
            })
        }).catch(err => {
            console.log(`Erro ao procurar por produto: ${err}`)
        })
    }).catch(err => {
        console.log(`Erro ao procurar pelas categorias: ${err}`)
    })
}

exports.delProduct = (req, res) => {
    const {id, _method} = req.body

    switch(_method) {
        case "delete":
            Product.destroy({where: {id: id}}).then(() => {
                resetTableIds(Product).then(() => {
                    res.redirect("/admin/products")
                }).catch(err => {
                    console.log(`Erro ao resetar os ids dos produtos: ${err}`)
                })
            }).catch(err => {
                console.log(`Erro ao deletar o produto: ${err}`)
                res.redirect("/admin/products")
            })
        break
    }
}