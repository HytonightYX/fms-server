const Router = require('koa-router')
const router = new Router({prefix: '/v1/role'})
const {AddRoleValidator, DelRoleValidator} = require('../../validators/validator')
const {success} = require('../../lib/helper')
const {db} = require('../../../core/db')
const {
	User,
	Role,
	RolePerm,
	Permission
} = require('../../models/rbac')

router.get('/test', async ctx => {
	ctx.body = {test: 'role router is ok'}
})

/**
 * 获取所有角色
 */
router.get('/', async ctx => {
	ctx.body = await Role.findAll({
		attributes: ['id', 'name', 'code', 'status', 'updatedAt', 'remark']
	})
})

/**
 * 根据rid查询用户
 */
router.get('/:rid', async ctx => {
	const rid = ctx.params.rid
	console.log(rid)

	const isRoleUser = await User.findAll({
		where: {roleId: rid}
	})

	const notRoleUser = await db.query(`
		SELECT *
		FROM fms_user
		where role_id != ${rid} or role_id is null
	`, { type: db.QueryTypes.SELECT })

	ctx.body = {
		isRoleUser,
		notRoleUser
	}
})

/**
 * 新建角色Role
 */
router.post('/add', async ctx => {
	const v = await new AddRoleValidator().validate(ctx)
	const role = {
		name: v.get('body.name'),
		code: v.get('body.code'),
		status: true,
	}
	Role.create(role)
	success(`${role.name} 创建成功"`)
})

/**
 * 删除角色接口
 */
router.post('/delete', async ctx => {
	const v = await new DelRoleValidator().validate(ctx)
	const role = await Role.findOne({
		where: {
			code: v.get('body.code')
		}
	})

	if (role) {
		await role.destroy({force: true})
		success(`${role.name} 删除成功"`)
	}
})

/**
 * 停用角色接口
 */
router.post('/deactivate', async ctx => {
	const v = await new DelRoleValidator().validate(ctx)
	const code = v.get('body.code')
	await Role.deactivate(code)
	success(`${code} 已停用`)
})

/**
 * 启用角色接口
 */
router.post('/activate', async ctx => {
	const v = await new DelRoleValidator().validate(ctx)
	const code = v.get('body.code')
	await Role.activate(code)
	success(`${code} 已启用`)
})

module.exports = router
