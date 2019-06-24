const colors = require('ansi-colors')

// Предупреждения
exports.warn = (...message) => {
	console.log(colors.brightYellow('[WARNING]:'))
	console.warn(...message)
	console.log(colors.brightYellow('============'))
}

// Ошибка
exports.error = (...message) => {
  console.log(colors.red('[ERROR]:'))
  console.log(...message)
  console.trace()
  console.log(colors.red('============'))
}

exports.message = message => {
  console.log(colors.cyan('[MESSAGE]: ') + message);
};

// Информационная
exports.info = (...message) => {
  console.log(colors.cyan(`[INFO]: `) + colors.whiteBright(...message))
}

// Базы данные
exports.db = (...message) => {
  console.log(colors.blue('[DATABASE]: ') + colors.whiteBright(...message))
}