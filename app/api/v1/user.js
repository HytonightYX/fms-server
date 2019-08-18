const Router = require('koa-router')

const router = new Router({prefix: '/v1/user'})
const {User} = require('../../models/rbac')

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
 * TODO: 根据用户id获取系统菜单
 */
router.post('/sys-menu', async ctx => {
	const id = ctx.request.body
	console.log(id)
	ctx.body = {ok: 1}
})

module.exports = router
