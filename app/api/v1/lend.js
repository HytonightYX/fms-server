const Router = require('koa-router')
const router = new Router({prefix: '/v1/lend'})
const {Lend} = require('../../models/lend')
const {success} = require('../../lib/helper')

/**
 * lend测试接口
 * 公开
 */
router.get('/test', (ctx, next) => {
	ctx.body = {test: 'lend router is ok'}
})

/**
 * 获取指定用户(uid) lend 的文件
 */
router.get('/:uid', async ctx => {
	const lends = await Lend.getAll(ctx.params.uid)
	ctx.body = lends
})

/**
 * 归还文件
 */
router.post('/return', async ctx => {
	const ids = ctx.request.body
	console.log(ids)
	await Lend.returnAll(ids)
	success('归还成功')
})

module.exports = router
