/*
RBAC(基于角色权限控制)模型
 */
const {db} = require('../../core/db')
const {Model, DataTypes} = require('sequelize')
const bcryptjs = require('bcryptjs')

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

	static async registerByOpenId(openid) {
		return await User.create({openid: openid})
	}
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nickname: DataTypes.STRING(32),
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
	admin: DataTypes.TINYINT,
	active: DataTypes.TINYINT,
	roleId: DataTypes.INTEGER,
}, {
	sequelize: db,
	tableName: 'fms_user'
})

class Role extends Model {

}

Role.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: DataTypes.STRING,
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	}
}, {
	sequelize: db,
	tableName: 'fms_role'
})

class Permission extends Model {

}

Permission.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: DataTypes.STRING,
	url: DataTypes.STRING,
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
