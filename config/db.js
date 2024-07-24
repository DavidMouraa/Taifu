const Sequelize = require("sequelize")

const database = new Sequelize("taifu", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
})

database.authenticate().then(() => {
    console.log("Conectado com o banco de dados!")
}).catch(err => {
    console.log(`Erro ao se conectar com o banco de dados: ${err}`)
})

module.exports = database
