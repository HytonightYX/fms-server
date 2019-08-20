const Router = require('koa-router')

const router = new Router({prefix: '/v1/user'})
const {User} = require('../../models/rbac')
const {success} = require('../../lib/helper')
const {IntIdValidator} = require('../../validators/validator')

router.get('/test', async ctx => {
	ctx.body = {test: 'user router is ok'}
})

/**
 * 获取所有用户
 */
router.get('/', async ctx => {
	ctx.body = await User.getAllUsers()
})

/**
 * 注册新用户
 */
router.post('/register', async ctx => {
	const user = ctx.request.body
	console.log(user)
	await User.create(user)
	success('注册成功')
})

/**
 * 删除一个用户
 */
router.delete('/:id', async ctx => {
	const v = await new IntIdValidator().validate(ctx)

	const user = await User.findOne({
		where: {
			id: v.get('path.id')
		}
	})

	const r = (await user.destroy()).toJSON()

	if (r && r.deleted_at) {
		success()
	}
})

/**
 * 启用用户
 */
router.patch('/:id/activate', async ctx => {
	const v = await new IntIdValidator().validate(ctx)
	const r = await User.activate(v.get('path.id'))
	success('已启用')
})

/**
 * 停用用户
 */
router.patch('/:id/deactivate', async ctx => {
	const v = await new IntIdValidator().validate(ctx)
	await User.deactivate(v.get('path.id'))
	success('已停用')
})

/**
 * TODO: 根据用户id获取系统菜单
 */
router.post('/sys-menu', async ctx => {
	const id = ctx.request.body
	console.log(id)
	ctx.body = {ok: 1}
})

module.exports = router
