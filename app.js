const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const session = require("express-session")

const database = require("./config/db")
const adminRoutes = require("./src/routes/admin/index")

require("./src/models/category")
require("./src/models/product")

const port = 3000
const app = express()

// Session
app.use(session({
  secret: "blogapp",
  resave: true,
  saveUninitialized: true
}))

app.use(flash())

// Variaveis globais
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success")
  res.locals.errorMsg = req.flash("error")
  next()
}) 

// View engine
app.set("views", path.join(__dirname, "src/views"))
app.set("view engine", "ejs")
app.use(expressLayouts)

// Arquivos estaticos
app.use(express.static(path.join(__dirname, "public")))

// Body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Rotas
app.use("/admin", adminRoutes)

database.sync({force: true}).then(() => {
  app.listen(port, () => {
    console.log(`Local: http://localhost:${port}/admin/categories`)
  })
}).catch(err => {
  console.log(`Erro ao sincronizar com o banco de dados: ${err}`)
})

