const {db} = require('../../core/db')
const {Model, Op, DataTypes} = require('sequelize')

class Borrow extends Model {

}

Borrow.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	// 借阅档案类型: 1: SingleFile / 0: Project 的 SubFile
	fileType: DataTypes.TINYINT,
	// 借阅开始时间
	start: DataTypes.TIME,
	// 借阅时长 (记录小时)
	length: DataTypes.INTEGER,
	// 借阅人
	borrower: DataTypes.INTEGER
}, {
	sequelize: db,
	tableName: 'borrow'
})

module.exports = {
	Borrow
}
