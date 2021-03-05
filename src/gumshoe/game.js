import Store from './store.js'
import Stats from './stats.js'
import Remote from './scenarios/remote.js'
import Demo from './scenarios/demo.js'
import Prologue from './scenarios/prologue.js'
import Example from './scenarios/example.js'

class Game {
  constructor (root, store) {
    this.state = 'waiting'
    this.$root = root
    this.store = new Store(store)
    this.stats = new Stats()
    this.scenario = null
  }

  run (scenario) {
    if (this.state !== 'waiting') {
      return
    }
    window.game = this
    switch (scenario) {
      case 'remote':
        this.scenario = new Remote()
        break
      case 'demo':
        this.scenario = new Demo()
        break
      case 'prologue':
        this.scenario = new Prologue()
        break
      case 'example':
        this.scenario = new Example()
        break
    }
    this.$root.$on("game:wait", this.wait)
    this.$root.$on("game:action", this.action)
    this.$root.$on("game:view", this.view)
    this.$root.$on("game:items", this.items)
    this.$root.$on("game:mark", this.mark)
    this.$root.$on("game:unmark", this.unmark)
    this.stats.clear()
    this.store.reset()
    this.store.clear('notebook')
    this.stats.showTime()
    this.scenario.run()
    this.state = 'running'
  }

  update (type) {
    this.wait()
    this.render()
    this.renderItems(type)
  }

  wait () {
    if (this != window.game) {
      window.game.wait()
      return
    }
    this.stats.wait()
    this.stats.render(this.store)
  }

  action (action) {
    if (this != window.game) {
      window.game.action(action)
      return
    }
    // TODO: this.scenario.action(action)
    this.update()
  }

  view (item) {
    if (this != window.game) {
      window.game.view(item)
      return
    }
    if (item.type == 'room') {
      this.$root.$emit("punk:info", `You go to the "${item.name}"`)
      this.look(item.id)
      setTimeout(() => { this.store.set("page", "tab", 'room') }, 500)
      this.update('room')
    }
    if (item.type == 'item') {
      this.$root.$emit("punk:info", `You examine the "${item.name}"`)
      this.examine(item.id)
      setTimeout(() => { this.store.set("page", "tab", 'entity') }, 500)
      this.update('entity')
    }
    if (item.type == 'bot') {
      this.$root.$emit("punk:info", `You approach "${item.name}"`)
      setTimeout(() => { this.store.set("page", "tab", 'entity') }, 500)
      this.update('dialogue')
    }
    if (item.type == 'quest') {
      this.examine_quest(item.id)
      setTimeout(() => { this.store.set("page", "tab", 'quest') }, 500)
      this.update()
    }
  }

  items (type) {
    if (this != window.game) {
      window.game.items(type)
      return
    }
    this.renderItems(type)
  }

  mark (type, id) {
    if (this != window.game) {
      window.game.mark(type, id)
      return
    }
    let entity = this.getEntity(type, id)
    let icon = null
    if (type == 'room') {
      icon = 'place'
    }
    if (type == 'item') {
      icon = 'label'
    }
    if (type == 'bot') {
      icon = 'face'
    }
    this.store.add('notebook', { id: entity.id, name: entity.name, type: entity.type, seen: entity.seen, icon: icon })
  }

  unmark (type, id) {
    if (this != window.game) {
      window.game.unmark(type, id)
      return
    }
    let entity = this.getEntity(type, id)
    this.store.del('notebook', id)
  }

  triggerQuestStart (name, description) {
    setTimeout(() => {
      this.$root.$emit("punk:dialog", `Started Quest "${name}"`, description)
    }, 3000)
  }

  triggerQuestDone (name, description, entity) {
    this.removeItem(entity)
    setTimeout(() => {
      this.$root.$emit("punk:dialog", `Completed Quest "${name}"`, description)
    }, 1000)
  }

  triggerTask (description) {
    this.$root.$emit("punk:success", description)
    this.stats.addScore()
    this.stats.showScore()
    this.stats.render(this.store)
  }

  // TODO: implement render and renderItems here
  render () {
    this.scenario.render(this.store)
  }

  renderItems (type) {
    this.scenario.renderItems(type, this.store)
  }

  spawn () {
    this.scenario.spawn(this.store)
  }

  move (sourceId, destinationId) {
  }

  getEntity (type, id) {
  }

  destroyEntity (type, id) {
  }

  take (id) {
  }

  drop (id) {
  }

  look (id) {
  }

  examine (type, id) {
  }

  talk (id) {
  }

  stop () {
    if (this.state !== 'running') {
      return
    }
    this.$root.$off("game:unmark", this.unmark)
    this.$root.$off("game:mark", this.mark)
    this.$root.$off("game:items", this.items)
    this.$root.$off("game:view", this.view)
    this.$root.$off("game:action", this.action)
    this.$root.$off("game:wait", this.wait)
    window.game = undefined
    this.state = 'stopped'
    this.scenario = null
  }
}

export default Game
