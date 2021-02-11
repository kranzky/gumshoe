class Stats {
  constructor (epoch = '2021-02-12 17:36:40') {
    this.epoch = epoch
    this.score = 0
    this.time = 0
    this.player = null
    this.show = {
      score: false,
      time: false,
      player: false
    }
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }

  render (store) {
    if (this.show.score) {
      store.set('game', 'score', `${this.score} / 100`)
    }

    if (this.show.time) {
      let date = this.getDate()
      store.set('game', 'time', `${this.days[date.getDay()]} ${date.getHours()}:${date.getMinutes()}`)
    }

    if (this.show.player) {
      store.set('game', 'player', this.player)
    }
  }

  getDate () {
    let date = new Date(this.epoch)
    date.setSeconds(date.getSeconds() + this.time * 41)
    return date
  }

  showScore () {
    this.show.score = true
  }

  addScore () {
    if (this.score < 100) {
      this.score += 1
    }
  }

  showTime() {
    this.show.time = true
  }

  wait () {
    this.time += 1
    console.debug(`time passes... [${this.getDate().toISOString()}]`) // eslint-disable-line no-console
  }

  showPlayer() {
    this.show.player = true
  }

  setPlayer (name) {
    this.player = name
  }
}

export default Stats
