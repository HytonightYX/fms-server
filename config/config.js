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
		secretKey: "abcdefg",        // 秘钥
		expiresIn: 60 * 60 * 24 * 30,   // 令牌过期时间 一个月
	},
	host:'http://localhost:3030/'
}
