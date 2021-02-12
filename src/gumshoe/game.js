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

  run () {
    if (this.state !== 'waiting') {
      return
    }
    window.game = this

    this.$root.$on("game:wait", this.wait)
    this.$root.$on("game:action", this.handleAction)
    this.$root.$on("item:clicked", this.select)
    this.loadGame()
    this.handleAction(process.env.DEV ? 'world' : 'firstRoom')
    this.state = 'running'
  }

  update () {
    this.wait()
    if (this.useWorld) {
      this.world.render(this.store)
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

  handleAction (action) {
    if (this != window.game) {
      window.game.handleAction(action)
      return
    }
    console.debug(`action "${action}"`) // eslint-disable-line no-console
    this.data[action]()
    this.update()
  }

  select (item) {
    if (this != window.game) {
      window.game.select(item)
      return
    }
    console.debug(`select "${item.name}"`) // eslint-disable-line no-console
    if (item.type == 'room') {
      this.$root.$emit("punk:info", `You go to "${item.name}"`)
      console.debug(`look "${item.name}"`) // eslint-disable-line no-console
      this.world.look(item.id)
      this.store.set("page", "tab", 'room')
      this.update()
    }
    if (item.type == 'item') {
      this.$root.$emit("punk:info", `You examine the "${item.name}"`)
      console.debug(`examine "${item.name}"`) // eslint-disable-line no-console
      this.world.examine(item.id)
      this.store.set("page", "tab", 'entity')
      this.update()
    }
  }

  loadGame () {
    this.data = {
      world: () => {
        this.useWorld = true
        this.store.reset()
        this.world.spawn()
        this.stats.showTime()
      },
      firstRoom: () => {
        this.useWorld = false
        this.store.reset()
        this.store.clear('room')
        setTimeout(() => {
          this.store.set("room", "title", "Nothingness.")
          this.store.set("page", "title", "Nothingness.")
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
            this.store.add("roomChoices", { text: "Show demo content.", action: 'world' })
            this.store.add("dialogueItems", { heading: true, label: "Your Lizard Brain has disconnected." })
          }, 5000)
        }, 2000)
      },
      demoRoom: () => {
        this.store.add("roomItems", { text: "More room description." })
      },
      demoRoomAppend: () => {
        this.store.add("roomItems", { text: "More room description." })
      },
      demoRoomWait: () => {
        this.store.delay('demoRoomAppend')
      },
      demoDialogue: () => {
        this.store.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.store.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
      },
      demoDialogueAppend: () => {
        this.store.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.store.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
      },
      demoDialogueWait: () => {
        this.store.delay('demoDialogueAppend')
      },
      demoEntity: () => {
        this.store.add("entityItems", { text: "More entity description." })
      },
      demoEntityAppend: () => {
        this.store.add("entityItems", { text: "More entity description." })
      },
      demoEntityWait: () => {
        this.store.delay('demoEntityAppend')
      },
      demo: () => {
        this.useWorld = false
        this.store.reset()

        this.stats.showTime()
        this.stats.showScore()
        this.stats.setPlayer('Bob the Nob')
        this.stats.showPlayer()

        this.store.clear('room')
        this.store.set('room', 'title', "Room Name")
        this.store.set('page', 'title', "Room Name")
        this.store.add('roomItems', { text: "Room description." })
        this.store.add("roomChoices", { text: "Play Game", action: 'firstRoom' })
        this.store.add("roomChoices", { text: "More Content", action: 'demoRoom' })
        this.store.add("roomChoices", { text: "Wait...", action: 'demoRoomWait', icon: 'update' })

        this.store.clear('entity')
        this.store.set("entity", "title", "Entity Name")
        this.store.add("entityItems", { text: "Entity description." })
        this.store.add("entityChoices", { text: "Play Game", action: 'firstRoom' })
        this.store.add("entityChoices", { text: "More Content", action: 'demoEntity' })
        this.store.add("entityChoices", { text: "Wait...", action: 'demoEntityWait', icon: 'update' })

        this.store.clear('dialogue')
        this.store.add("dialogueItems", { heading: true, label: "Chat with NPC" })
        this.store.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.store.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
        this.store.add("dialogueChoices", { text: "Play Game", action: 'firstRoom' })
        this.store.add("dialogueChoices", { text: "More Content", action: 'demoDialogue' })
        this.store.add("dialogueChoices", { text: "Wait...", action: 'demoDialogueWait', icon: 'update' })

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
    this.$root.$off("item:clicked", this.select)
    this.$root.$off("game:action", this.handleAction)
    this.$root.$off("game:wait", this.wait)
    window.game = undefined
    this.state = 'stopped'
  }
}

export default Game
