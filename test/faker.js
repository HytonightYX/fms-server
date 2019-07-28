const faker = require('faker');
const _ = require('lodash')
const {SingleFile} = require('../app/models/file')

/**
 * SingleFile
 * 生成填充数据
 * @returns {Promise<void>}
 */
const fakeSingleFile = async () => {
	const fileList = []
	for (let i = 0; i < 3; i++) {
		const file = {
			fondsCode: _.random(100, 1000),
			archivalCode: _.random(0, 5),
			itemNum: _.random(0, 5),
			fileCode: `政发[${_.random(2000, 2019)}]${_.random(10, 200)}号`,
			title: `关于在${faker.company.companyName()}举办活动的方案`,
			fileCategory: _.random(1) === 1 ? '收文' : '发文',
			issue: ['经营类', '管理类', '政策类'][_.random(2)],
			fileDate: `${_.random(2000, 2019)}-${_.random(1, 12)}-${_.random(1, 29)}`
		}
		fileList.push(file)
	}
	await SingleFile.bulkCreate(fileList)
}

fakeSingleFile()

