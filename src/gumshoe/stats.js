class Stats {
  constructor () {
    this.score = 0
    this.time = 0
    this.player = null
    this.show = {
      score: false,
      time: false,
      player: false
    }
  }

  render (store) {
    if (this.show.score) {
      store.set('game', 'score', `${this.score} / 100`)
    }

    if (this.show.time) {
      let date = new Date('2021-02-12 17:36:40')
      date.setSeconds(date.getSeconds() + this.time * 41)
      store.set('game', 'time', `Fri ${date.getHours()}:${date.getMinutes()}`)
    }

    if (this.show.player) {
      store.set('game', 'player', this.player)
    }
  }

  showScore() {
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

  addTime (delta = 1) {
    this.time += delta
  }

  showPlayer() {
    this.show.player = true
  }

  setPlayer (name) {
    this.player = name
  }
}

export default Stats
