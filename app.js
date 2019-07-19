const Koa = require('koa')
const InitManager = require('./core/init')
const bodyParser = require('koa-bodyparser');
const app = new Koa()
const catchError = require('./middlewares/exception')
require('./app/models/file')
require('./app/models/user')
require('./app/models/group')
require('./app/models/auth')

app.use(bodyParser());
app.use(catchError)

InitManager.initCore(app)

if (global.config.env === 'dev') {
	console.log('current env: dev')
}

app.listen(3035, () => {console.log('PORT has opened on 3035')})
