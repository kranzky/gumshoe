import Entity from './entity.js'

// TODO: figure out how to do time
// TODO: figure out how to add delay
// TODO: figure out how to add multiple lines
class Dialogue extends Entity {
  show () {
    this._show()
  }

  start (playerName, botName) {
    this.time = "whenever"
    this.playerName = playerName
    this.botName = botName
    this.lines = []
    this._appendItem({ heading: true, label: `Chat with ${this.botName}` })
  }

  player (line) {
    this._appendItem({ text: [line], name: this.playerName, time: this.time, player: true })
  }

  bot (line) {
    this._appendItem({ text: [line], name: this.botName, time: this.time })
  }

  stop () {
    this._appendItem({ heading: true, label: `${this.botName} has disconnected.` })
  }

  addChoice (text, action, data) {
    if (_.isUndefined(data)) {
      data = {}
    }
    this._appendChoice({ text: text, action: action, data: data })
  }
}

export default Dialogue
