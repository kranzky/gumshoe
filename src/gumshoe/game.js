import World from './world.js'
import Scenario from './scenario.js'
import { _ } from 'core-js'

class Game {
  constructor (root, store) {
    this.state = 'waiting'
    this.$root = root
    this.world = new World(root, store)
    this.scenario = null
  }

  run (name) {
    if (this.state !== 'waiting') {
      return
    }
    window.game = this
    this.scenario = Scenario(name, this.world)
    this.scenario.run()
    this.startEvents()
    this.state = 'running'
  }

  stop () {
    if (this.state !== 'running') {
      return
    }
    this.stopEvents()
    this.scenario.stop()
    this.scenario = null
    this.world.clear()
    window.game = undefined
    this.state = 'stopped'
  }

  startEvents () {
//  this.$root.$on("game:wait", this.wait)
    this.$root.$on("game:action", this.action)
//  this.$root.$on("game:view", this.view)
    this.$root.$on("game:mark", this.mark)
    this.$root.$on("game:unmark", this.unmark)
  }

  stopEvents () {
    this.$root.$off("game:unmark", this.unmark)
    this.$root.$off("game:mark", this.mark)
//  this.$root.$off("game:view", this.view)
    this.$root.$off("game:action", this.action)
//  this.$root.$off("game:wait", this.wait)
  }

  // TODO: delete
  update (type) {
    this.wait()
    this.render()
    this.renderItems(type)
  }

  // TODO: delete
  wait () {
    if (this != window.game) {
      window.game.wait()
      return
    }
    this.stats.wait()
    this.stats.render(this.store)
  }

  action (payload) {
    if (this != window.game) {
      window.game.action(payload)
      return
    }
    if (payload.action == 'focus') {
      this.world.focus(payload.data)  
      return
    }
    if (!_.isFunction(this.scenario[payload.action])) {
      this.$root.$emit("punk:error", `No handler for "${payload.action}"`)
      return
    }
    // TODO: advance time, like wait above
    this.scenario[payload.action](payload.id, payload.data)
  }

  // TODO: delete
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

  mark (type, id) {
    if (this != window.game) {
      window.game.mark(type, id)
      return
    }
    let item = this.scenario.getEntity(type, id)
    this.world.player.notebook.append(this.scenario.getEntity(type, id))
  }

  unmark (type, id) {
    if (this != window.game) {
      window.game.unmark(type, id)
      return
    }
    this.world.player.notebook.remove(id)
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

  render () {
    this.scenario.render(this.store)
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

}

export default Game
