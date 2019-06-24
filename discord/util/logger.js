const colors = require('ansi-colors')

// Warns
exports.warn = (...message) => {
	console.log(colors.brightYellow('[WARNING]:'))
	console.warn(...message)
	console.log(colors.brightYellow('============'))
}

// Errors
exports.error = (...message) => {
  console.log(colors.red('[ERROR]:'))
  console.log(...message)
  console.trace()
  console.log(colors.red('============'))
}

exports.message = message => {
  console.log(colors.cyan('[MESSAGE]: ') + message);
};

// Info
exports.info = (...message) => {
  console.log(colors.cyan(`[INFO]: `) + colors.whiteBright(...message))
}

// Database
exports.db = (...message) => {
  console.log(colors.blue('[DATABASE]: ') + colors.whiteBright(...message))
}
