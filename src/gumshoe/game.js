class Game {
  constructor (root, store) {
    this.state = 'waiting'
    this.$root = root
    this.$store = store
  }

  run () {
    if (this.state !== 'waiting') {
      return
    }
    window.game = this

    this.$root.$on("game:action", this.handleAction)
    this.loadGame()
    this.handleAction(process.env.DEV ? 'demo' : 'firstRoom')

    this.state = 'running'
  }

  handleAction (action) {
    window.game.data[action]()
  }

  reset () {
    console.debug('reset ui') // eslint-disable-line no-console
    this.$store.dispatch("game/reset")
  }

  clear (component) {
    console.debug(`clear ${component}`) // eslint-disable-line no-console
    this.$store.dispatch(`${component}/clear`)
  }

  set (component, name, value) {
    console.debug(`set ${component} ${name} to "${value}"`) // eslint-disable-line no-console
    this.$store.dispatch(`${component}/${name}`, value)
  }

  add (component, data) {
    console.debug(`add ${component} "${data.name || data.text}"`) // eslint-disable-line no-console
    this.$store.dispatch(`${component}/append`, data)
  }

  delay (action) {
    this.$store.dispatch("progress/delay", action)
  }

  loadGame () {
    this.data = {
      firstRoom: () => {
        this.reset()
        this.clear('room')
        setTimeout(() => {
          this.set("room", "title", "Nothingness.")
          this.set("page", "title", "Nothingness.")
          setTimeout(() => {
            this.add('roomItems', { text: "A lingering memory of utter chaos punctuates the void." })
            setTimeout(() => {
              this.add("roomChoices", { text: "What is there to do but wait?", action: 'waitLonger', icon: 'update' })
            }, 2000)
          }, 2000)
        }, 2000)
      },
      waitLonger: () => {
        this.clear('roomChoices')
        this.delay('firstDecision')
      },
      firstDecision: () => {
        this.add("roomItems", { text: "Aeons pass, but nothing happens." })
        this.add("roomChoices", { text: "Keep searching.", action: 'waitEvenLonger', icon: 'update' })
      },
      waitEvenLonger: () => {
        this.clear('roomChoices')
        this.delay('remember')
      },
      remember: () => {
        this.clear('people')
        this.add("people", { name: 'Your Lizard Brain', icon: 'face', action: "activateLizard" })
        this.add("roomItems", { text: "Something has changed." })
      },
      activateLizard: () => {
        this.add("roomItems", { text: "It is trying to attract your attention." })
        this.clear('dialogue')
        this.add("dialogueItems", { heading: true, label: "Chat with Your Lizard Brain" })
        this.add("dialogueItems", { name: "Your Lizard Brain", text: ["Hey! Over here! Emergency!"], time: "Somewhen" })
        this.add("dialogueChoices", { text: "Ugh. Why do you disturb my rest?", action: 'talkLizard1' })
      },
      talkLizard1: () => {
        this.clear('dialogueChoices')
        this.add("dialogueItems", { name: "Yourself", text: ["Ugh. Why do you disturb my rest?"], time: "Somewhen", player: true })
        setTimeout(() => {
          this.add("dialogueItems", { name: "Your Lizard Brain", text: ["You must awaken!!"], time: "Somewhen" })
          setTimeout(() => {
            this.add("dialogueChoices", { text: "Sounds tiring. It was so peaceful.", action: 'talkLizard2' })
          }, 2000)
        }, 2000)
      },
      talkLizard2: () => {
        this.clear('dialogueChoices')
        this.add("dialogueItems", { name: "Yourself", text: ["Sounds tiring. It was so peaceful."], time: "Somewhen", player: true })
        setTimeout(() => {
          this.add("dialogueItems", { name: "Your Lizard Brain", text: ["We risk non-existence!!!"], time: "Somewhen" })
          setTimeout(() => {
            this.add("dialogueChoices", { text: "I understand. But what can be done?", action: 'talkLizard3' })
          }, 2000)
        }, 2000)
      },
      talkLizard3: () => {
        this.clear('dialogueChoices')
        this.add("dialogueItems", { name: "Yourself", text: ["I understand. But what can be done?"], time: "Somewhen", player: true })
        setTimeout(() => {
          this.add("dialogueItems", { name: "Your Lizard Brain", text: ["Activate your sensory cortex!!!!"], time: "Somewhen" })
          setTimeout(() => {
            this.add("dialogueChoices", { text: "I ... can't. I don't remember how.", action: 'talkLizard4' })
          }, 2000)
        }, 2000)
      },
      talkLizard4: () => {
        this.clear('dialogueChoices')
        this.add("dialogueItems", { name: "Yourself", text: ["I ... can't. I don't remember how."], time: "Somewhen", player: true })
        setTimeout(() => {
          this.add("dialogueItems", { name: "Your Lizard Brain", text: ["Just try.", "Please.", "For all of us 🥺"], time: "Somewhen" })
          setTimeout(() => {
            this.add("roomChoices", { text: "Show demo content.", action: 'demo' })
            this.add("dialogueItems", { heading: true, label: "Your Lizard Brain has disconnected." })
          }, 5000)
        }, 2000)
      },
      demoRoom: () => {
        this.add("roomItems", { text: "More room description." })
      },
      demoRoomAppend: () => {
        this.add("roomItems", { text: "More room description." })
      },
      demoRoomWait: () => {
        this.delay('demoRoomAppend')
      },
      demoDialogue: () => {
        this.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
      },
      demoDialogueAppend: () => {
        this.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
      },
      demoDialogueWait: () => {
        this.delay('demoDialogueAppend')
      },
      demoEntity: () => {
        this.add("entityItems", { text: "More entity description." })
      },
      demoEntityAppend: () => {
        this.add("entityItems", { text: "More entity description." })
      },
      demoEntityWait: () => {
        this.delay('demoEntityAppend')
      },
      demo: () => {
        this.reset()

        this.set('game', 'player', "Player")
        this.set('game', 'time', "Date / Time")
        this.set('game', 'score', "Score")

        this.clear('room')
        this.set('room', 'title', "Room Name")
        this.add('roomItems', { text: "Room description." })
        this.add("roomChoices", { text: "Play Game", action: 'firstRoom' })
        this.add("roomChoices", { text: "More Content", action: 'demoRoom' })
        this.add("roomChoices", { text: "Wait...", action: 'demoRoomWait', icon: 'update' })

        this.clear('entity')
        this.set("entity", "title", "Entity Name")
        this.add("entityItems", { text: "Entity description." })
        this.add("entityChoices", { text: "Play Game", action: 'firstRoom' })
        this.add("entityChoices", { text: "More Content", action: 'demoEntity' })
        this.add("entityChoices", { text: "Wait...", action: 'demoEntityWait', icon: 'update' })

        this.clear('dialogue')
        this.add("dialogueItems", { heading: true, label: "Chat with NPC" })
        this.add("dialogueItems", { name: "NPC", text: ["Something."], time: "Date / Time" })
        this.add("dialogueItems", { name: "Player", text: ["Something."], time: "Date / Time", player: true })
        this.add("dialogueChoices", { text: "Play Game", action: 'firstRoom' })
        this.add("dialogueChoices", { text: "More Content", action: 'demoDialogue' })
        this.add("dialogueChoices", { text: "Wait...", action: 'demoDialogueWait', icon: 'update' })

        this.clear('quest')
        this.set("quest", "title", "Quest Name")
        this.set("quest", "description", "Quest Description")
        this.add("questItems", { name: "Task #1", done: false })
        this.add("questItems", { name: "Task #2", done: true })

        this.clear('transcript')
        this.add("transcript", { heading: true, body: 'Chapter Title' })
        this.add("transcript", { name: "Part 1", date: "Date / Time", body: "Something." })
        this.add("transcript", { name: "Part 2", date: "Date / Time", body: "Something." })

        this.clear('places')
        this.add("places", { name: 'Room #1', icon: 'place' })

        this.clear('people')
        this.add("people", { name: 'NPC #1', icon: 'face' })

        this.clear('objects')
        this.add("objects", { name: 'Entity #1', icon: 'label' })

        this.clear('inventory')
        this.add("inventory", { name: 'Entity #2', icon: 'label' })

        this.clear('notebook')
        this.add("notebook", { name: 'Room #2', icon: 'place' })
        this.add("notebook", { name: 'NPC #2', icon: 'face' })
        this.add("notebook", { name: 'Entity #3', icon: 'label' })

        this.clear('quests')
        this.add("quests", { name: 'Quest #1', icon: 'assignment_turned_in' })
        this.add("quests", { name: 'Quest #2', icon: 'assignment_late' })

      }
    }
  }

  stop () {
    if (this.state !== 'running') {
      return
    }
    this.$root.$off("game:action", this.handleAction)
    window.game = undefined
    this.state = 'stopped'
  }
}

export default Game
