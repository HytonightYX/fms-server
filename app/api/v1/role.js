const Router = require('koa-router')
const router = new Router({prefix: '/v1/role'})
const {AddRoleValidator} = require('../../validators/validator')
const {success} = require('../../lib/helper')
const {
	User,
	Role,
	RolePerm,
	Permission
} = require('../../models/rbac')

router.get('/test', async ctx => {
	ctx.body = {test: 'role router is ok'}
})

router.post('/add', async ctx => {
	const v = await new AddRoleValidator().validate(ctx)
	const role = {
		name: v.get('body.name'),
		code: v.get('body.code'),
		status: true,
	}
	Role.create({
		name: v.get('body.name'),
		code: v.get('body.code'),
		status: true,
	})
	success(`${v.get('body.name')} 创建成功"`)
})

module.exports = router
