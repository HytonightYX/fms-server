const {Lend} = require('./lend')
const {FileType} = require('../lib/enum')

const {db} = require('../../core/db')
const {Model, Op, DataTypes} = require('sequelize')

const commonAttr = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	// 全宗号
	fondsCode: {
		type: DataTypes.STRING,
		comment: '全宗号'
	},
	// 档号
	archivalCode: DataTypes.STRING,
	// 件号
	itemNum: DataTypes.INTEGER,
	// 文件字号 如: "##政发[2014]26号"
	fileCode: DataTypes.STRING,
	// 责任者
	responsible: DataTypes.STRING,
	// 文件题名
	title: DataTypes.STRING,
	// 盒号
	boxNum: DataTypes.INTEGER,
	// 页数
	page: DataTypes.INTEGER,
	// 保管期限
	time: DataTypes.INTEGER,
	// 年度
	year: DataTypes.INTEGER,
	// 备注
	remarks: DataTypes.STRING,
	// 主题词
	subjectWords: DataTypes.STRING,
	// 收发编号
	transCode: DataTypes.STRING,
	// 条码编号
	barCode: DataTypes.STRING,
	// 分类: 如: "A公司/B公司"
	classification: DataTypes.STRING,
	// 份数
	quantity: DataTypes.INTEGER,
	// 文件类别 如: 收文
	fileCategory: DataTypes.STRING,
	// 机构问题
	issue: DataTypes.STRING,
	// 公文种类
	documentType: DataTypes.STRING,
	// 密级
	securityLevel: DataTypes.STRING,
	// 紧急程度
	emergency: DataTypes.STRING,
	// 借阅状态 1/0 是否
	lend: DataTypes.INTEGER,
	// 文件日期
	fileDate: DataTypes.DATE
}

class SingleFile extends Model {

	// static async lendOne(fondsCode, lender) {
	// 	db.transaction(async t => {
	// 		// 添加记录
	// 		await Lend.create({
	// 			fileType: FileType.SINGLE_FILE,
	// 			start: new Date(),
	// 			length: 72,
	// 			lender: lender
	// 		}, {
	// 			transaction: t
	// 		})
	//
	// 		const art = await Art.getData(artId, type, false)
	//
	// 		// 对art实体中的favNums字段进行 +1 操作
	// 		return await art.increment('favNums', {by: 1, transaction: t})
	// 	})
	// }

	static async lendAll(ids, lender) {
		const fileList = []

		if (ids.length > 0) {
			console.log(ids, lender)

			for (const id of ids) {

				const exist = await Lend.findOne({where: {fileId: id}})

				if (exist) {
					console.log('err', id)
					throw new global.errs.LendError()
				}

				fileList.push({
					fileId: id,
					fileType: FileType.SINGLE_FILE,
					length: 72,
					lender: lender,
					start: new Date()
				})
			}

			db.transaction(async t => {
				await Lend.bulkCreate(fileList,
					{transaction: t}
					)

				return await SingleFile.update(
					{lend: true},
					{
						where: {id: ids},
						transaction: t
					}
				)
			})

		}
	}
}

SingleFile.init({
	...commonAttr
}, {
	sequelize: db,
	tableName: 'file_single'
})

class ProjectFile extends Model {

}

ProjectFile.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING
	}
}, {
	sequelize: db,
	tableName: 'file_project'
})

/**
 * ProjectFile附属记录
 */
class SubFile extends Model {

}

SubFile.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	// 父档案id
	parentId: DataTypes.INTEGER,
	// 责任者
	responsible: DataTypes.STRING,
	// 文件题名
	title: DataTypes.STRING,
	// 文件日期
	date: DataTypes.DATE,
	// 页号
	page: DataTypes.INTEGER,
	// 是否原件
	original: DataTypes.BOOLEAN
}, {
	sequelize: db,
	tableName: 'file_project_sub'
})

module.exports = {
	SingleFile,
	ProjectFile,
	SubFile
}
