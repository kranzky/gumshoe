export function delay(store, action) {
  let root = this.$router.app
  let value = 0.25
  let delta = 0.25
  let interval = setInterval(() => {
    value += delta
    root.$emit("game:wait")
    this.commit("progress/value", value)
    if (value >= 1) {
      clearInterval(interval)
      setTimeout(() => {
        root.$emit("game:action", action)
        setTimeout(() => {
          this.commit("progress/hide")
        }, 1000)
      }, 1000)
    }
  }, 1000)
  this.commit("progress/show")
  this.commit("progress/value", value)
}
