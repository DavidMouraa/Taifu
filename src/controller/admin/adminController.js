exports.renderAdminPage = (req, res) => {
    res.render("pages/admin/admin", {
        layout: "layouts/admin"
    })
}
