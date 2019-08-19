const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const r = require('./app/api/v1/file')

const app = new Koa()

app.use(bodyParser())
app.use(catchError)
app.use(cors())

InitManager.initCore(app)

if (global.config.env === 'dev') {
	console.log('current env: dev')

	// flash models and tables in db
	require('./app/models/file')
	require('./app/models/rbac')
	require('./app/models/annex')
	require('./app/models/borrow')
}

app.listen(3035, () => {console.log('PORT has opened on 3035')})
