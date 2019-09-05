class HttpException extends Error {
	constructor(message = '发生异常', errorCode = 10000, code = 400) {
		super()
		this.errorCode = errorCode
		this.code = code
		this.message = message
	}
}

class ParameterException extends HttpException {
	constructor(message, errorCode) {
		super()
		this.code = 400
		this.message = message || '参数错误'
		this.errorCode = errorCode || 10000
	}
}

class Success extends HttpException {
	constructor(message, errorCode) {
		super()
		this.code = 201
		this.message = message || 'ok'
		this.errorCode = errorCode || 0
	}
}

class NotFound extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '资源未找到'
		this.errorCode = errorCode || 10000
		this.code = 404
	}
}

class AuthFailed extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '授权失败'
		this.errorCode = errorCode || 10004
		this.code = 401
	}
}

class Forbidden extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '禁止访问'
		this.errorCode = errorCode || 10006
		this.code = 403
	}
}

class ActivateError extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '该记录已启用'
		this.errorCode = errorCode || 60001
		this.code = 400
	}
}

class DeactivateError extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '该记录已停用'
		this.errorCode = errorCode || 60002
		this.code = 400
	}
}

class LendError extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = '选择了已借出的档案'
		this.errorCode = errorCode || 60002
		this.code = 400
	}
}

module.exports = {
	HttpException,
	ParameterException,
	Success,
	NotFound,
	AuthFailed,
	Forbidden,

	ActivateError,
	DeactivateError,
	LendError
}

