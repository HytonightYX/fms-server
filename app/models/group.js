const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class Group extends Model {

}

Group.init({
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: Sequelize.STRING,
	info: Sequelize.STRING,
}, {
	sequelize: db,
	tableName: 'group'
})
