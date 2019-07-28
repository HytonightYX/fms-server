const Router = require('koa-router')
const router = new Router({prefix: '/v1/file'})
const {
	SingleFile,
	ProjectFile,
	SubFile
} = require('../../models/file')

const {Auth} = require('../../../middlewares/auth')

/**
 * file测试接口
 * 公开
 */
router.get('/test', (ctx, next) => {
	ctx.body = {test: 'file router is ok'}
})

/**
 * 获取所有SingleFile
 */
router.get('/single/', async (ctx, next) => {
	ctx.body = await SingleFile.getAll()
})

router.get('')
