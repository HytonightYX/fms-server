const faker = require('faker')
const _ = require('lodash')
const {SingleFile} = require('../app/models/file')
const {
	User,
	Role,
	Permission
} = require('../app/models/rbac')
/**
 * SingleFile
 * 生成填充数据
 * @returns {Promise<void>}
 */
const fakeSingleFile = async () => {
	const fileList = []
	for (let i = 0; i < 100; i++) {
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

/**
 * Role
 * 填充数据
 * @returns {Promise<void>}
 */
const fakeRole = async () => {
	const roleList = []
	roleList.push({
		name: '超级管理员',
		code: 'SUPER_ADMIN',
		remark: '超管啥都能干',
		status: 1
	}, {
		name: '录入员',
		code: 'DATA_ENTRY_STAFF',
		remark: '录入档案信息',
		status: 0
	}, {
		name: '普通用户',
		code: 'DEFAULT_USER',
		remark: '只能查阅资料',
		status: 1
	})

	await Role.bulkCreate(roleList)
}

const fakeUser = async () => {
	const userList = [
		{
			userName: 'admin',
			roleId: 1,
			remark: '超级管理员',
			valid: true
		},
		{
			userName: '录入员01',
			roleId: 2,
			remark: '录入档案信息',
			valid: false
		},
		{
			userName: '录入员02',
			roleId: 2,
			remark: '录入档案信息',
			valid: true
		},
		{
			userName: '普通用户01',
			roleId: 3,
			remark: '只能看看,借资料',
			valid: true
		},
		{
			userName: '普通用户02',
			roleId: 3,
			remark: '只能看看,借资料',
			valid: true
		},
	]
	await User.bulkCreate(userList)
}


const fakePerm = async () => {
	const permList = []
	permList.push(
		{
			// 1
			title: '所有',
			url: '/index',
			icon: null,
			parentId: null
		},
		{
			title: '仪表盘',
			url: '/index/dashboard',
			icon: 'dashboard',
			parentId: 1
		},
		{
			title: '档案借阅',
			url: '/index/borrow',
			icon: 'dashboard',
			parentId: 1
		},
		{
			title: '档案管理',
			url: '/index/file',
			icon: 'profile',
			parentId: 1
		},
		{
			title: '文件档案',
			url: '/index/file/single',
			icon: 'file',
			parentId: 4
		},
		{
			title: '业务项目档案',
			url: '/index/file/project',
			icon: 'project',
			parentId: 4
		},
		{
			// 7
			title: '权限管理',
			url: '/index/auth',
			icon: 'security-scan',
			parentId: 1
		},
		{
			title: '角色管理',
			url: '/index/auth/role',
			icon: 'robot',
			parentId: 7
		},
		{
			title: '用户管理',
			url: '/index/auth/user',
			icon: 'team',
			parentId: 7,
		})
	await Permission.bulkCreate(permList)
}

// fakeSingleFile()
// fakeRole()
fakeUser()
// fakePerm()
