const { DataTypes } = require("sequelize")
const database = require("../../config/db")
const Category = require("./category")

const Product = database.define("product", {
    desc: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
    },
    slug: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
    },
    smallImg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    largeImg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    discont: {
        type: DataTypes.INTEGER,
    },
    salePrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }
})

Product.belongsTo(Category, {
    constraint: true,
})

Category.hasMany(Product)

module.exports = Product
