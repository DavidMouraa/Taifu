const Category = require("../../models/category")
const { getErrorMsgs } = require("../../../public/javascripts/validations")
const { Op } = require("sequelize")
const fs = require("fs")

async function renderCategoriesPage(req, res) {
    try {
        const categories = await Category.findAll()

        res.render("pages/admin/categories/categories", {
            layout: "layouts/admin",
            categories: categories
        })
    } catch(err) {
        console.log(`Erro ao renderizar a página de categorias: ${err}`)
        res.redirect("/admin")
    }
}

async function renderRegCategoryPage(req, res) {
    try {
        const categories = await Category.findAll({atributes: ["id", "name"]})
        
        res.render("pages/admin/categories/regCategory", {
            layout: "layouts/admin",
            categories: categories
        })
    } catch(err) {
        console.log(`Erro ao renderizar a página de cadastro de categoria: ${err}`)
        res.redirect("/admin/categories")
    }
}

async function regCategory(req, res) {
    const {name, slug, parentId, status} = req.body
    
    try {
        await Category.create({
            name: name,
            slug: slug,
            parentId: parentId ? parentId : null,
            status: status
        })
        
        res.redirect("/admin/categories")
    } catch(err) {
        console.log(`Erro ao registrar categoria: ${err}`)
        req.flash("error", getErrorMsgs(err))
        res.redirect("/admin/categories/register")
    }
}

async function renderEditCategoryPage(req, res) {
    const {id} = req.params

    try {
        const category = await Category.findByPk(id)
        const categories = await Category.findAll({where: {id: {[Op.not]: id}}})
        
        res.render("pages/admin/categories/editCategory", {
            layout: "layouts/admin",
            pagCategory: category,
            categories: categories
        })
    } catch(err) {
        console.log(`Erro ao renderizar a página de edição de categoria: ${err}`)
        res.redirect(`/admin/categories`)
    }
}



async function editCategory(req, res) {
    const {id, name, slug, parentId, status} = req.body
    
    try {
        await Category.update({
            name: name,
            slug: slug,
            parentId: parentId ? parentId : null,
            status: status
        }, {where: {id: id}})

        res.redirect(`/admin/categories`)
    } catch(err) {
        console.log(`Erro ao editar categoria: ${err}`)
        req.flash("error", getErrorMsgs(err))
        res.redirect(`/admin/categories/edit/${id}`)
    }
}


async function delCategory(req, res) {
    const {id} = req.body

    try {
        await Category.destroy({where: {id: id}})

        res.redirect("/admin/categories")
    } catch(err) {
        console.log(`Erro ao excluir categoria: ${err}`)
        res.redirect("/admin/categories")
    }
}

module.exports = {
    renderCategoriesPage,
    renderRegCategoryPage,
    renderEditCategoryPage,
    regCategory,
    editCategory,
    delCategory
}