const defaultSettings = {
  "font-size": "18",
  "number-columns": '4',
  "line-camp": '6',
  "details-color": '#00b1ff'
}

const cache = {
  function() {
    this.getCache = () => JSON.parse(localStorage.getItem("settings"))
    this.assignCache = () => this.settings = this.getCache()
    this.checkCache = () => this.getCache() ? true : false
    this.saveCache = () => localStorage.setItem("settings", JSON.stringify(this.settings))
  }
}

const App = {
  settings: { ...defaultSettings },

  start() {
    this.setContexts()
    this.checkCache() && this.assignCache()
    this.updateCssVars()
    console.log("Terminou")
  },
  setContexts() {
    cache.function.call(this)
  },
  updateCssVars() {
    Object.keys(this.settings)
      .forEach(key => {
        const value = key == "font-size" ? this.settings[key] + "px" : this.settings[key]
        document.documentElement.style.setProperty(`--${key}`, value)
      })
  }
}

App.start()