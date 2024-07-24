const {DataTypes} = require("sequelize")
const database = require("../../config/db")

const Category = database.define("category", {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [2, 20],
                msg: "O nome deve ter entre 1 e 20 caracteres",
            }
        }
    },
    slug: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [2, 20],
                msg: "O nome deve ter entre 1 e 20 caracteres",
            }
        }
    },
    parentId: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    status: {
        type: DataTypes.ENUM("ativo", "inativo"),
        allowNull: false,
        defaultValue: "inativo"
    }
})

module.exports = Category