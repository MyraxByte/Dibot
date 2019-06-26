const fs = require('fs')
const path = require('path')

class Locale {
  constructor(options = {}) {
    
    this.defaultLocale = 'ru'
    this.localesDirectory = 'locales'
    // Проверяем есть ли папка локализации
    if (!fs.existsSync(`./discord/${this.localesDirectory}`)) { 
      throw new Error(`Директория локализации '${this.localesDirectory}' не найдена.`) 
    }

    // Проверяем какие локализации имеюся у нас
    this.locales = fs.readdirSync(`./discord/${this.localesDirectory}/`).filter(file => 
      fs.statSync(path.join(`./discord/${this.localesDirectory}/`, file)).isDirectory())


    this.constants = fs.existsSync(path.resolve(`./discord/${this.localesDirectory}/constants.json`)) ? require(path.resolve(`./discord/${this.localesDirectory}/constants.json`)) : null
    this.constantsRegExp = this.constants ? new RegExp(Object.keys(this.constants).join('|'), 'gi') : null

    this._strings = new Map()
    for (let locale of this.locales) {
      let files = fs.readdirSync(`./discord/${this.localesDirectory}/${locale}`)
      let strings = {}

      for (let file of files) {
        let stringFile = file.substr(0, file.length - 5);
        file = JSON.parse(fs.readFileSync(`./discord/${this.localesDirectory}/${locale}/${file}`, { encoding: 'utf-8' }))
        strings[stringFile] = file;
      }
      this._strings.set(locale, strings)
    }
  }


  _getString(ns, l, k, ...a) {
    if (!this._strings.has(l)) l = this.defaultLocale

    if (!this._strings.get(l)[ns] || !this._strings.get(l)[ns].hasOwnProperty(k)) {
      if (l === this.defaultLocale) {
        return `Нет перевода для '${k}'.`
      }
      return this._getString(ns, this.defaultLocale, k);
    }


    if (this.constantsRegExp) {
      return substitute(this._strings.get(l)[ns][k].replace(this.constantsRegExp, matched => this.constants[matched]), ...a);
    }
    return substitute(this._strings.get(l)[ns][k], ...a);
  }

  info(locale, key, ...vars) {
    return this._getString('info', locale, key, ...vars);
  }

  warn(locale, key, ...vars) {
    return this._getString('warn', locale, key, ...vars);
  }

  error(locale, key, ...vars) {
    return this._getString('error', locale, key, ...vars);
  }
}

module.exports = Locale

function substitute(string, ...args) {
  let count = 0;
  return string.replace(/%var%/g, () => args[count++]);
}