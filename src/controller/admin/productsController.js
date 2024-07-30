const Product = require("../../models/product")
const Category = require("../../models/category")

const fs = require("fs")
const { getErrorMsgs } = require("../../../public/javascripts/validations")
const path = require("path")
const { Op } = require("sequelize")

async function renderProductsPage(req, res) {
    try {
        const products = await Product.findAll({
            include: [{
                model: Category,
                attributes: ["name"],
            }]
        })

        res.render("pages/admin/products/products", {
            layout: "layouts/admin",
            products: products
        })
    } catch(err) {
        console.log(`Erro ao renderiza a página de produtos: ${err.message}`)
        res.redirect("/admin")
    }
}
async function renderRegProductPage(req, res) {
    try {
        const categories = await Category.findAll()

        res.render("pages/admin/products/regProduct", {
            layout: "layouts/admin",
            categories: categories
        })
    } catch(err) {
        console.error(`Erro ao renderizar a página de cadastro de produtos: ${err.message}`)
        res.redirect("/admin/products")
    }
}

async function regProduct(req, res) {
    const {desc, slug, price, discont, salePrice, categoryId} = req.body

    const smallImg = req.files["smallImg"] ? req.files["smallImg"][0] : null
    const largeImg = req.files["largeImg"] ? req.files["largeImg"][0] : null

    try {
        await Product.create({
            desc: desc,
            slug: slug,
            smallImg: smallImg.filename,
            largeImg: largeImg.filename,
            price: price,
            discont: discont,
            salePrice: salePrice,
            categoryId: categoryId ? categoryId : null,
        })

        res.redirect("/admin/products")
    } catch(err) {
        console.error(`Erro ao criar produto: ${err.message}`)
        req.flash("error", getErrorMsgs(err))
        res.redirect("/admin/products/register")
    }
}

async function renderEditProductPage(req, res) {
    const {id} = req.params

    try {
        const product = await Product.findByPk(id)
        const categories = await Category.findAll()

        res.render("pages/admin/products/editProduct", {
            layout: "layouts/admin",
            product: product,
            categories: categories
        })
    } catch(err) {
        console.error(`Erro ao renderizar a página de edição de produtos: ${err.message}`)
        throw new Error(`Erro ao renderizar a página de edição de produtos: ${err.message}`)
    }
}

async function editProduct(req, res) {
    const {id, desc, slug, price, discont, salePrice, categoryId, dftLargeImg, dftSmallImg} = req.body

    let largeImg = req.files["largeImg"] ? req.files["largeImg"][0].filename : null
    let smallImg = req.files["smallImg"] ? req.files["smallImg"][0].filename : null

    const imgs = [{
        img: largeImg,
        dftImg: dftLargeImg
    }, {
        img: smallImg,
        dftImg: dftSmallImg
    }]

    try {
        const currentSlug = await Product.findOne({where: {id: id}, attributes: ["slug"]}).slug
        const productImgsPath = `${process.cwd()}/public/images/products`

        // Renomeia as imagens
        imgs.forEach(imgItem => {
            if (!imgItem.img && currentSlug !== slug) {
                const { dftImg } = imgItem

                const dotIndex = dftImg.indexOf(".")
                const imgExt = dftImg.slice(dotIndex)
                const imgSize = dftImg.slice(dftImg.lastIndexOf("-") + 1, dotIndex)
                const newName = `${slug}-${imgSize}${imgExt}`

                const imgPaths = {
                    old: `${process.cwd()}/public/images/products/${dftImg}`,
                    new: `${process.cwd()}/public/images/products/${newName}`
                }

                fs.rename(imgPaths.old, imgPaths.new, err => {
                    if (err) {
                        console.error(`Erro ao renomear imagem: ${err.message}`)
                        throw new Error(`Erro ao renomear imagem: ${err.message}`)
                    }
                })

                switch(imgSize) {
                    case "large":
                        largeImg = newName
                    break
                    case "small":
                        smallImg = newName
                    break
                }
            }
        })

        // Atualiza o valor dos atributos
        await Product.update({
            desc: desc,
            slug: slug,
            largeImg: largeImg,
            smallImg: smallImg,
            price: price,
            discont: discont,
            salePrice: salePrice,
            categoryId: categoryId ? categoryId : null,
        }, {where: {id: id}})

        // Apaga as imagens de produtos que não possuem um produto
        fs.readdir(productImgsPath, (err, files) => {
            let filePath = ""

            if (err) {
                console.error(`Erro ao ler o diretorio: ${err.message}`)
                throw new Error(`Erro ao ler diretorio: ${err.message}`)
            }
                
            files.forEach(async (file) => {
                const products = await Product.findOne({
                    where: {[Op.or]: [
                        {largeImg: file},
                        {smallImg: file}
                    ]}
                })

                filePath = path.join(productImgsPath, file)

                !products && fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Erro ao deletar arquivo: ${err.message}`)
                        throw new Error(`Erro ao deletar arquivo: ${err.message}`)
                    }
                })
            })
        })
        
        res.redirect("/admin/products")
    } catch(err) {
        console.error(`Erro ao editar categoria: ${err.message}`)
        res.redirect(`/admin/products/edit/${id}`)
    }
}

async function delProduct(req, res) {
    const {id} = req.body

    try {
        const product = await Product.findOne({where: {id: id}, attributes: ["smallImg", "largeImg"]})
        const productImgs = product.get({ plain: true })

        await Product.destroy({where: {id: id}})

        for (let img in productImgs) {
            const path = `${process.cwd()}/public/images/products/${productImgs[img]}`

            fs.unlink(path, (err) => {
                if (err) {
                    console.error(`Erro ao deletar imagem do produto: ${err.message}`)
                    throw new Error(`Erro ao deletar imagem do produto: ${err.message}`)
                }
            })
        }

        res.redirect("/admin/products")
    } catch(err) {
        console.error(`Erro ao deletar o produto: ${err.message}`)
        res.redirect("/admin/products")
    }
}

module.exports = {
    renderProductsPage,
    renderRegProductPage,
    renderEditProductPage,
    regProduct,
    editProduct,
    delProduct,
}