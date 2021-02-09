export function delay(store, action) {
  let root = this.$router.app
  let value = 0
  let delta = 0.25
  setTimeout(() => {
    let interval = setInterval(() => {
      value += delta
      this.commit("progress/value", value)
      if (value >= 1) {
        clearInterval(interval)
        setTimeout(() => {
          root.$emit("game:action", action)
          setTimeout(() => {
            this.commit("progress/hide")
          }, 1000)
        }, 500)
      }
    }, 1000)
    this.commit("progress/show")
  }, 500)
}
