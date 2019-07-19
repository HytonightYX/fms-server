module.exports = {
	env: 'dev',
	// env: 'prod',
	database: {
		dbName: 'fms',
		host: 'localhost',
		port: 3306,
		user: 'root',
		pwd: ''
	},
	security: {
		secretKey:
			'\x88W\xf09\x91\x07\x98\x89\x87\x96\xa0A\xc68\xf9\xecJJU\x17\xc5V\xbe\x8b\xef\xd7\xd8\xd3\xe6\x95*4',        // 秘钥
		expiresIn: 60 * 60 * 24 * 30,   // 令牌过期时间 一个月
	},
	host:'http://localhost:3030/'
}
