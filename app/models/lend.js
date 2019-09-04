const {db} = require('../../core/db')
const {Model, Op, DataTypes} = require('sequelize')

class Lend extends Model {

}

Lend.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	// 借阅档案类型: 100: SingleFile / 200: Project 的 SubFile
	fileType: DataTypes.TINYINT,
	// 借阅档案类型
	file_id: DataTypes.INTEGER,
	// 借阅开始时间
	start: DataTypes.TIME,
	// 借阅时长 (记录小时)
	length: DataTypes.INTEGER,
	// 借阅人
	lender: DataTypes.INTEGER
}, {
	sequelize: db,
	tableName: 'lend'
})

module.exports = {
	Lend
}
