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

const eventsCallbacks = {
  callbacks() {
    this.handleSettingsButton = ({ target: el }) => {
      const action = el.getAttribute("data-settings")
      const inputs = [...document.querySelectorAll(".c-settings input")]

      const actions = {
        reset: () => {
          this.settings = { ...defaultSettings }
          inputs.forEach(input => {
            const id = input.id
            input.value = this.settings[id]
          })
        },
        save: () => {
          inputs.forEach(input => {
            const id = input.id
            this.settings[id] = input.value
          })
        }
      }
      const func = actions[action]
      if (!func) return
      func()
      this.saveCache()
      this.updateSettings()
      this.updateCssVars()
    }
    this.handleInputDetailsColor = ({ target: el }) => {
      this.labelDetailsElem.style.background = el.value
    }
  },
  events() {
    this.settingsButton.addEventListener("click", this.debounce(this.handleSettingsButton, 150))
    this.inputDetailsColor.addEventListener("change", this.handleInputDetailsColor)
  }
}

const Settings = {
  settings: { ...defaultSettings },
  settingsButton: document.querySelector(".c-settings .buttons"),
  labelDetailsElem: document.querySelector(".details-color"),
  inputDetailsColor: document.querySelector("#details-color"),

  start() {
    this.setContexts()
    this.updateSettings()
    this.updateCssVars()
  },
  setContexts() {
    cache.function.call(this)
    eventsCallbacks.callbacks.call(this)
    eventsCallbacks.events.call(this)
  },
  updateSettings() {
    this.checkCache() && this.assignCache()
    Object.keys(this.settings)
      .forEach(setting =>
        document.querySelector(`#${setting}`).value = this.settings[setting]
      )
    this.updateLabelColor()
  },
  updateCssVars() {
    Object.keys(this.settings)
      .forEach(key => {
        const value = key == "font-size" ? this.settings[key] + "px" : this.settings[key]
        document.documentElement.style.setProperty(`--${key}`, value)
      })
  },
  updateLabelColor() {
    this.labelDetailsElem.style.background = this.settings["details-color"]
  },
  debounce(func, wait, immediate) {
    let timeout;
    return function (...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }
}

Settings.start()