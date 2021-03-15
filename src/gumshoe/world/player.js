import List from './list.js'

class Player {
  constructor (store) {
    this.$store = store
    this.inventory = new List(store, 'inventory', 'item')
    this.notebook = new List(store, 'notebook')
    this.quests = new List(store, 'quests', 'task')
  }

  _reset () {
    this.inventory._reset()
    this.notebook._reset()
    this.quests._reset()
  }
}

export default Player
