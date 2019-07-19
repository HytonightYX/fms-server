const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class Permission extends Model {

}

Permission.init({
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	permission: Sequelize.STRING(64),
	module: Sequelize.STRING(64),
}, {
	sequelize: db,
	tableName: 'permission'
})
