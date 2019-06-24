const locales = require('../util/locales')

const Languages = class StringHandler extends locales {
  event(locale, event) {
    return super._getString('event', locale, event)
  }

  command(locale, command) {
    if (!this._strings.has(locale)) locale = this.defaultLocale;

    if (!this._strings.get(locale)['command'] || !this._strings.get(locale)['command'].hasOwnProperty(command)) {
      if (locale === this.defaultLocale) {
        return `Описание команды '${command}' не найдено.`
      }
      return this.command(this.defaultLocale, command)
    }

    let commandInfo = this._strings.get(locale)['command'][command]

    if (this._constantsRegExp && commandInfo.description) {
      commandInfo.description = commandInfo.description.replace(this.constantsRegExp, matched => this.constants[matched])
    }
    return commandInfo
  }
}

module.exports = Languages
