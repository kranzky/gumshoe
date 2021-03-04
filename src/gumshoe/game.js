import Store from './store.js'
import Stats from './stats.js'
import World from './world.js'

class Game {
  constructor (root, store) {
    this.state = 'waiting'
    this.$root = root
    this.store = new Store(store)
    this.stats = new Stats()
    this.world = new World()
    this.useWorld = false
  }

  run (scenario) {
    if (this.state !== 'waiting') {
      return
    }
    window.game = this
    this.$root.$on("game:wait", this.wait)
    this.$root.$on("game:action", this.action)
    this.$root.$on("game:view", this.view)
    this.$root.$on("game:items", this.items)
    this.$root.$on("game:mark", this.mark)
    this.$root.$on("game:unmark", this.unmark)
    this.loadGame()
    this.action(scenario)
    this.state = 'running'
  }

  update (type) {
    this.wait()
    if (this.useWorld) {
      this.world.render(this.store)
      if (!_.isUndefined(type)) {
        this.world.renderItems(type, this.store)
      }
    }
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
    this.data[action]()
    this.update()
  }

  view (item) {
    if (this != window.game) {
      window.game.view(item)
      return
    }
    if (item.type == 'room') {
      this.$root.$emit("punk:info", `You go to the "${item.name}"`)
      this.world.look(item.id)
      setTimeout(() => { this.store.set("page", "tab", 'room') }, 500)
      this.update('room')
    }
    if (item.type == 'item') {
      this.$root.$emit("punk:info", `You examine the "${item.name}"`)
      this.world.examine(item.id)
      setTimeout(() => { this.store.set("page", "tab", 'entity') }, 500)
      this.update('entity')
    }
    if (item.type == 'bot') {
      this.$root.$emit("punk:info", `You approach "${item.name}"`)
      this.world.examine_bot(item.id)
      setTimeout(() => { this.store.set("page", "tab", 'entity') }, 500)
      this.update('dialogue')
    }
    if (item.type == 'quest') {
      this.world.examine_quest(item.id)
      setTimeout(() => { this.store.set("page", "tab", 'quest') }, 500)
      this.update()
    }
  }

  items (type) {
    if (this != window.game) {
      window.game.items(type)
      return
    }
    this.world.renderItems(type, this.store)
  }

  mark (type, id) {
    if (this != window.game) {
      window.game.mark(type, id)
      return
    }
    let entity = this.world.getEntity(type, id)
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
    let entity = this.world.getEntity(type, id)
    this.store.del('notebook', id)
  }

  triggerQuestStart (name, description) {
    setTimeout(() => {
      this.$root.$emit("punk:dialog", `Started Quest "${name}"`, description)
    }, 3000)
  }

  triggerQuestDone (name, description, entity) {
    this.world.removeItem(entity, this.store)
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

  loadGame () {
    this.data = {
      remote: () => {
        // TODO: implement remote game
      },
      demo: () => {
        this.useWorld = true
        this.stats.clear()
        this.store.reset()
        this.store.clear('notebook')
        this.world.spawn()
        this.stats.showTime()
      },
      talk: () => {
        this.world.talk()
        setTimeout(() => { this.store.set("page", "tab", 'dialogue') }, 500)
      },
      take: () => {
        let response = this.world.take()
        if (!_.isEmpty(response)) {
          this.$root.$emit("punk:info", response)
        }
      },
      drop: () => {
        let response = this.world.drop()
        if (!_.isEmpty(response)) {
          this.$root.$emit("punk:info", response)
        }
      },
      prologue: () => {
        this.useWorld = false
        this.stats.clear()
        this.store.reset()
        this.store.clear('room')
        this.store.set("page", "title", null)
        this.store.hide('room')
        setTimeout(() => {
          this.store.set("room", "title", "Nothingness.")
          this.store.set("page", "title", "Nothingness.")
          this.store.show('room')
          setTimeout(() => {
            this.store.add('roomItems', { text: "A lingering memory of utter chaos punctuates the void." })
            setTimeout(() => {
              this.store.add("roomChoices", { text: "What is there to do but wait?", action: 'waitLonger', icon: 'update' })
            }, 2000)
          }, 2000)
        }, 2000)
      },
      waitLonger: () => {
        this.store.clear('roomChoices')
        this.store.delay('firstDecision')
      },
      firstDecision: () => {
        this.store.add("roomItems", { text: "Aeons pass, but nothing happens." })
        this.store.add("roomChoices", { text: "Keep searching.", action: 'waitEvenLonger', icon: 'update' })
      },
      waitEvenLonger: () => {
        this.store.clear('roomChoices')
        this.store.delay('remember')
      },
      remember: () => {
        this.store.clear('people')
        this.store.add("people", { name: 'Your Lizard Brain', icon: 'face', action: "activateLizard" })
        this.store.add("roomItems", { text: "Something has changed." })
      },
      activateLizard: () => {
        this.store.add("roomItems", { text: "It is trying to attract your attention." })
        this.store.clear('dialogue')
        this.store.add("dialogueItems", { heading: true, label: "Chat with Your Lizard Brain" })
        this.store.add("dialogueItems", { name: "Your Lizard Brain", text: ["Hey! Over here! Emergency!"], time: "Somewhen" })
        this.store.add("dialogueChoices", { text: "Ugh. Why do you disturb my rest?", action: 'talkLizard1' })
      },
      talkLizard1: () => {
        this.store.clear('dialogueChoices')
        this.store.add("dialogueItems", { name: "Yourself", text: ["Ugh. Why do you disturb my rest?"], time: "Somewhen", player: true })
        setTimeout(() => {
          this.store.add("dialogueItems", { name: "Your Lizard Brain", text: ["You must awaken!!"], time: "Somewhen" })
          setTimeout(() => {
            this.store.add("dialogueChoices", { text: "Sounds tiring. It was so peaceful.", action: 'talkLizard2' })
          }, 2000)
        }, 2000)
      },
      talkLizard2: () => {
        this.store.clear('dialogueChoices')
        this.store.add("dialogueItems", { name: "Yourself", text: ["Sounds tiring. It was so peaceful."], time: "Somewhen", player: true })
        setTimeout(() => {
          this.store.add("dialogueItems", { name: "Your Lizard Brain", text: ["We risk non-existence!!!"], time: "Somewhen" })
          setTimeout(() => {
            this.store.add("dialogueChoices", { text: "I understand. But what can be done?", action: 'talkLizard3' })
          }, 2000)
        }, 2000)
      },
      talkLizard3: () => {
        this.store.clear('dialogueChoices')
        this.store.add("dialogueItems", { name: "Yourself", text: ["I understand. But what can be done?"], time: "Somewhen", player: true })
        setTimeout(() => {
          this.store.add("dialogueItems", { name: "Your Lizard Brain", text: ["Activate your sensory cortex!!!!"], time: "Somewhen" })
          setTimeout(() => {
            this.store.add("dialogueChoices", { text: "I ... can't. I don't remember how.", action: 'talkLizard4' })
          }, 2000)
        }, 2000)
      },
      talkLizard4: () => {
        this.store.clear('dialogueChoices')
        this.store.add("dialogueItems", { name: "Yourself", text: ["I ... can't. I don't remember how."], time: "Somewhen", player: true })
        setTimeout(() => {
          this.store.add("dialogueItems", { name: "Your Lizard Brain", text: ["Just try.", "Please.", "For all of us 🥺"], time: "Somewhen" })
          setTimeout(() => {
            this.store.add("roomChoices", { text: "Enter the world.", action: 'demo' })
            this.store.add("dialogueItems", { heading: true, label: "Your Lizard Brain has disconnected." })
          }, 5000)
        }, 2000)
      },
      testRoom: () => {
        this.store.add("roomItems", { text: "More room description." })
      },
      testRoomAppend: () => {
        this.store.add("roomItems", { text: "More room description." })
      },
      testRoomWait: () => {
        this.store.delay('testRoomAppend')
      },
      testDialogue: () => {
        this.store.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.store.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
      },
      testDialogueAppend: () => {
        this.store.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.store.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
      },
      testDialogueWait: () => {
        this.store.delay('testDialogueAppend')
      },
      testEntity: () => {
        this.store.add("entityItems", { text: "More entity description." })
      },
      testEntityAppend: () => {
        this.store.add("entityItems", { text: "More entity description." })
      },
      testEntityWait: () => {
        this.store.delay('testEntityAppend')
      },
      test: () => {
        this.useWorld = false
        this.stats.clear()
        this.store.reset()

        this.stats.showTime()
        this.stats.showScore()
        this.stats.setPlayer('Bob the Nob')
        this.stats.showPlayer()

        this.store.clear('room')
        this.store.set('room', 'title', "Room Name")
        this.store.set('page', 'title', "Room Name")
        this.store.add('roomItems', { text: "Room description." })
        this.store.add("roomChoices", { text: "Play Game", action: 'prologue' })
        this.store.add("roomChoices", { text: "More Content", action: 'testRoom' })
        this.store.add("roomChoices", { text: "Wait...", action: 'testRoomWait', icon: 'update' })

        this.store.clear('entity')
        this.store.set("entity", "title", "Entity Name")
        this.store.add("entityItems", { text: "Entity description." })
        this.store.add("entityChoices", { text: "Play Game", action: 'prologue' })
        this.store.add("entityChoices", { text: "More Content", action: 'testEntity' })
        this.store.add("entityChoices", { text: "Wait...", action: 'testEntityWait', icon: 'update' })

        this.store.clear('dialogue')
        this.store.add("dialogueItems", { heading: true, label: "Chat with NPC" })
        this.store.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.store.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
        this.store.add("dialogueChoices", { text: "Play Game", action: 'prologue' })
        this.store.add("dialogueChoices", { text: "More Content", action: 'testDialogue' })
        this.store.add("dialogueChoices", { text: "Wait...", action: 'testDialogueWait', icon: 'update' })

        this.store.clear('quest')
        this.store.set("quest", "title", "Quest Name")
        this.store.set("quest", "description", "Quest Description")
        this.store.add("questItems", { name: "Task #1", done: false })
        this.store.add("questItems", { name: "Task #2", done: true })

        this.store.clear('transcript')
        this.store.add("transcript", { heading: true, body: 'Chapter Title' })
        this.store.add("transcript", { name: "Part 1", date: "Date / Time", body: "Something." })
        this.store.add("transcript", { name: "Part 2", date: "Date / Time", body: "Something." })

        this.store.clear('places')
        this.store.add("places", { name: 'Room #1', icon: 'place' })

        this.store.clear('people')
        this.store.add("people", { name: 'NPC #1', icon: 'face' })

        this.store.clear('objects')
        this.store.add("objects", { name: 'Entity #1', icon: 'label' })

        this.store.clear('inventory')
        this.store.add("inventory", { name: 'Entity #2', icon: 'label' })

        this.store.clear('notebook')
        this.store.add("notebook", { name: 'Room #2', icon: 'place' })
        this.store.add("notebook", { name: 'NPC #2', icon: 'face' })
        this.store.add("notebook", { name: 'Entity #3', icon: 'label' })

        this.store.clear('quests')
        this.store.add("quests", { name: 'Quest #1', icon: 'assignment_turned_in' })
        this.store.add("quests", { name: 'Quest #2', icon: 'assignment_late' })
      }
    }
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
  }
}

export default Game
