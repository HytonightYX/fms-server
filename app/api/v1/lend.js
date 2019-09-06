const Router = require('koa-router')
const router = new Router({prefix: '/v1/lend'})
const {Lend} = require('../../models/lend')

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
	const uid = ctx.params.uid
	const lends = await Lend.findAll({where: {lender: uid}})
	console.log(lends)
	ctx.body = lends
})

module.exports = router
