function success(message, errorCode) {
	throw new global.errs.Success(message, errorCode)
}

function formatTime(t) {
	return t.toISOString()
		.replace('T', ' ')
		.replace(/\..+/, '')
}

module.exports = {
	success,
	formatTime
}
