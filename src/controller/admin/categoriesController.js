const {getErrorMsgs} = require("../../../public/javascripts/validations")
const {resetTableIds} = require("../../../public/javascripts/triggers")

const Category = require("../../models/category")
const { Op, where } = require("sequelize")

exports.renderCategoriesPage = (req, res) => {
    Category.findAll().then(categories => {
        res.render("pages/admin/categories/categories", {
            layout: "layouts/admin",
            categories: categories
        })
    }).catch(err => {
        console.log(`Erro ao procurar por categorias: ${err}`)
        res.redirect("/admin")
    })
}

exports.renderRegCategoryPage = (req, res) => {
    Category.findAll({atributes: ["id", "name"]}).then(categories => {
        res.render("pages/admin/categories/regCategory", {
            layout: "layouts/admin",
            categories: categories
        })
    }).catch(err => {
        console.log(`Erro ao procurar pelas categorias: ${err}`)
    })
}

exports.renderEditCategoryPage = (req, res) => {
    const {id} = req.params

    Category.findByPk(id).then(category => {
        Category.findAll({where: {id: {[Op.not] : id}}}).then(categories => {
            res.render("pages/admin/categories/editCategory", {
                layout: "layouts/admin",
                pagCategory: category,
                categories: categories
            })
        }).catch(err => {
            console.log(`Erro ao procurar pelas categorias: ${err}`)
        })
    }).catch(err => {
        console.log(`Erro ao procurar por categoria: ${err}`)
    })
}

exports.editCategory = (req, res) => {
    const {id, name, slug, parentId, status} = req.body
    
    Category.update({
        name: name,
        slug: slug,
        parentId: parentId ? parentId : null,
        status: status
    }, {where: {id: id}}).then(() => {
        res.redirect(`/admin/categories`)
    }).catch(err => {
        req.flash("error", getErrorMsgs(err))
        console.log(getErrorMsgs(err))
        res.redirect(`/admin/categories/edit/${id}`)
    })
}

exports.regCategory = (req, res) => {
    const {name, slug, parentId, status} = req.body
    
    Category.create({
        name: name,
        slug: slug,
        parentId: parentId ? parentId : null,
        status: status
    }).then(() => {
        resetTableIds(Category).then(() => {
            res.redirect("/admin/categories")
        })
    }).catch(err => {
        req.flash("error", getErrorMsgs(err))
        res.redirect("/admin/categories/register")
    })
}

exports.delCategory = (req, res) => {
    const {id, _method} = req.body

    if (_method === "delete") {
        Category.destroy({where: {id: id}}).then(() => {
            resetTableIds(Category).then(() => {
                res.redirect("/admin/categories")
            })
        }).catch(err => {
            console.log(`Erro ao excluir categoria: ${err}`)
            res.redirect("/admin/categories")
        })
    }
}