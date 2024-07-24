const { DataTypes } = require("sequelize")
const database = require("../../config/db")

const Product = database.define("product", {
    desc: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
    },
    smallImage: {
        type: DataTypes.STRING(90),
        allowNull: false,
        unique: true
    },
    largeImage: {
        type: DataTypes.STRING(90),
        allowNull: false,
        unique: true
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
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Product