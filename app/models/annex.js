const {db} = require('../../core/db')
const {Model, Op, DataTypes} = require('sequelize')

/**
 * 附件
 */
class Annex extends Model {

}

Annex.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	parentId: DataTypes.INTEGER,
	title: DataTypes.STRING,
	path: DataTypes.STRING,
}, {
	sequelize: db,
	tableName: 'file_annex'
})

module.exports = {Annex}
