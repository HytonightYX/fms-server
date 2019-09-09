const Router = require('koa-router')
const {unset, set} = require('lodash')
const router = new Router({prefix: '/v1/user'})
const {User} = require('../../models/rbac')
const {success} = require('../../lib/helper')
const {IntIdValidator, RegisterUserValidator} = require('../../validators/validator')

router.get('/test', async ctx => {
	ctx.body = {test: 'user router is ok'}
})

/**
 * 获取所有用户
 */
router.get('/', async ctx => {
	const r = await User.getAllUsers()
	console.log(r)
	ctx.body = r
})

/**
 * 注册新用户
 */
router.post('/register', async ctx => {
	const v = await new RegisterUserValidator().validate(ctx)
	await User.create(v.get('body'))
	success('注册成功')
})

router.put('/:id/update', async ctx => {
	const v = await new RegisterUserValidator().validate(ctx)
	await User.update()
})

/**
 * 删除一个用户
 */
router.delete('/:id', async ctx => {
	const v = await new IntIdValidator().validate(ctx)

	const user = await User.findOne(
		{where: {id: v.get('path.id')}}
	)

	const r = (await user.destroy()).toJSON()

	if (r && r.deleted_at) {
		success('已删除')
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

/**
 * 登录
 */
router.post('/login', async ctx => {
	const {userName, password} = ctx.request.body
	console.log(ctx.request.body)
	const user = await User.verifyNamePassword(userName, password)
	unset(user, 'password')
	ctx.body = {
		user,
		message: '登录成功'
	}
})

module.exports = router
