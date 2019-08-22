/*
RBAC(基于角色权限控制)模型
 */
const _ = require('lodash')
const {db} = require('../../core/db')
const {Model, DataTypes} = require('sequelize')
const bcryptjs = require('bcryptjs')
const {formatTime} = require('../lib/helper')

class User extends Model {
	static async verifyEmailPassword(email, plainPassword) {
		const user = await User.findOne({
			where: {email: email}
		})

		// 没有对应用户
		if (!user) {
			throw new global.errs.AuthFailed('账号不存在!')
		}

		const correct = bcryptjs.compareSync(plainPassword, user.password)
		if (!correct) {
			throw new global.errs.AuthFailed('密码不正确!')
		}

		return user
	}

	static async getUserByOpenId(openid) {
		return await User.findOne({where:{openid: openid}})
	}

	static async register(user) {
		return await await User.create(user)
	}

	static async getAllUsers() {
		// 复杂查询还是用自定SQL语句吧
		const users = await db.query(
			'SELECT fms_user.id, user_name as userName, fms_role.name as role, remark, fms_user.updated_at as updatedAt, fms_user.status\n' +
					'FROM fms_user, fms_role\n' +
					'WHERE fms_user.role_id = fms_role.id and fms_user.deleted_at is null',
			{ type: db.QueryTypes.SELECT }
		)

		return users.map((item, index) => {
			return Object.assign(item, {
					key: `user-${index}`,
					time: formatTime(item.updatedAt),
				}
			)
		})
	}

	static async activate(id) {
		const user = await User.findOne({
			where: {
				id
			}
		})

		if (user) {
			if (user.status === true) {
				throw new global.errs.ActivateError()
			}
			await user.update({status: true})
		} else {
			throw new global.errs.NotFound()
		}
	}

	static async deactivate(id) {
		const user = await User.findOne({
			where: {
				id
			}
		})

		if (user) {
			if (user.status === false) {
				throw new global.errs.DeactivateError()
			}
			await user.update({status: false})
		} else {
			throw new global.errs.NotFound()
		}
	}
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userName: DataTypes.STRING(32),
	email: {
		type: DataTypes.STRING, // 最大长度
		unique: true,               // 唯一
	},
	avatar: DataTypes.STRING(32),
	password: {
		type: DataTypes.STRING,
		set(val) {
			const salt = bcryptjs.genSaltSync(10) // 10 表示生成盐的成本,越高越安全
			const hashPassword = bcryptjs.hashSync(val, salt)
			this.setDataValue('password', hashPassword) // this 代表User类
		}
	},
	status: {
		type: DataTypes.TINYINT,
		defaultValue: true
	},
	roleId: DataTypes.INTEGER,
	remark: DataTypes.STRING
}, {
	sequelize: db,
	tableName: 'fms_user'
})

class Role extends Model {
	static async activate(roleCode) {
		const role = await Role.findOne({
			where: {
				code: roleCode
			}
		})

		if (role) {
			if (role.status === true) {
				throw new global.errs.ActivateError()
			}
			await role.update({status: true})
		} else {
			throw new global.errs.NotFound()
		}
	}

	static async deactivate(roleCode) {
		const role = await Role.findOne({
			where: {
				code: roleCode
			}
		})

		if (role) {
			if (role.status === false) {
				throw new global.errs.DeactivateError()
			}
			await role.update({status: false})
		} else {
			throw new global.errs.NotFound()
		}
	}

	static async getRoleCodeById(id) {
		const role = await Role.findOne({
			where: {
				id
			}
		})

		if (role) {
			return role.getDataValue('code')
		}
	}
}

Role.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: DataTypes.STRING,
	code: DataTypes.STRING,
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	}
}, {
	sequelize: db,
	tableName: 'fms_role'
})

class Permission extends Model {
	static getSystemMenuByUserId(id) {

	}
}

Permission.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: DataTypes.STRING,
	url: DataTypes.STRING,
	parentId: DataTypes.INTEGER,
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	}
}, {
	sequelize: db,
	tableName: 'fms_permission'
})

class RolePerm extends Model {
}

RolePerm.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	rid: DataTypes.INTEGER,
	pid: DataTypes.INTEGER,
}, {
	sequelize: db,
	tableName: 'fms_role_permission'
})

module.exports = {
	User,
	Role,
	Permission,
	RolePerm
}
