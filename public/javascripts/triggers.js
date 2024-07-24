const { where } = require("sequelize")

async function resetTableIds(Table) {
    try {
        const tabelSize = await contTable(Table)
        const Items = await getAllFromTable(Table)

        for (let i = 0; i < tabelSize; i++) {
           await Table.update({id: i + 1}, {where: {id: Items[i].id}})
        }
    } catch (err) {
        console.log(`Erro ao resetar os ids: ${err}`)
    }
}

async function contTable(Table) {
    try {
        return await Table.count()
    } catch(err) {
        console.log(`Erro ao contar o tamanho da tabela: ${err}`)
    }
}

async function getAllFromTable(Table) {
    try {
        return await Table.findAll()
    } catch(err) {
        console.log(`Erro ao selecionar todas as linhas da tabela: ${err}`)
    }
}

module.exports = {
    resetTableIds
}
