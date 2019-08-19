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
 * TODO: 根据用户id获取系统菜单
 */
router.post('/sys-menu', async ctx => {
	const id = ctx.request.body
	console.log(id)
	ctx.body = {ok: 1}
})

module.exports = router
