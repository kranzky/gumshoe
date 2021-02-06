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
    this.handleAction("firstLocation")

    this.state = 'running'
  }

  handleAction(action) {
    window.game.data[action]()
  }

  loadGame () {
    this.data = {
      firstLocation: () => {
        this.$store.dispatch("viewport/clear")
        this.$store.dispatch("viewport/title", "Nothingness.")
        this.$store.dispatch("page/setTitle", "Nothingness.")
        setTimeout(() => {
          this.$store.dispatch("progress/delay", 'timePasses')
        }, 2000)
      },
      timePasses: () => {
        this.$store.dispatch("viewportItems/append", { text: "A lingering memory of utter chaos punctuates the void." })
        setTimeout(() => {
          this.$store.dispatch("viewportChoices/append", { text: "What is there to do but wait?", action: 'waitLonger' })
        }, 2000)
      },
      waitLonger: () => {
        this.$store.dispatch("progress/delay", 'firstDecision')
      },
      firstDecision: () => {
        this.$store.dispatch("viewportItems/append", { text: "Aeons pass." })
        setTimeout(() => {
          this.$store.dispatch("progress/delay", 'remember')
        }, 2000)
      },
      remember: () => {
        this.$store.dispatch("people/clear")
        this.$store.dispatch("people/append", { name: 'Your Lizard Brain', icon: 'face', action: "activateLizard" })
        setTimeout(() => {
          this.$store.dispatch("viewportItems/append", { text: "Something has changed." })
        }, 2000)
      },
      activateLizard: () => {
        this.$store.dispatch("viewportItems/append", { text: "It is trying to attract your attention." })
        setTimeout(() => {
          this.$store.dispatch("dialogue/clear")
          this.$store.dispatch("dialogueItems/append", { heading: true, label: "Chat with Your Lizard Brain" })
          this.$store.dispatch("dialogueItems/append", { name: "Your Lizard Brain", text: ["Hey! Over here! Emergency!"], time: "Somewhen" })
          this.$store.dispatch("dialogueChoices/append", { text: "Ugh. Why do you disturb my rest?", action: 'talkLizard1' })
        }, 2000)
      },
      talkLizard1: () => {
        this.$store.dispatch("dialogueItems/append", { name: "Yourself", text: ["Ugh. Why do you disturb my rest?"], time: "Somewhen", player: true })
        this.$store.dispatch("dialogueItems/append", { name: "Your Lizard Brain", text: ["You must awaken!!"], time: "Somewhen" })
        this.$store.dispatch("dialogueChoices/append", { text: "Sounds tiring. It was so peaceful.", action: 'talkLizard2' })
      },
      talkLizard2: () => {
        this.$store.dispatch("dialogueItems/append", { name: "Yourself", text: ["Sounds tiring. It was so peaceful."], time: "Somewhen", player: true })
        this.$store.dispatch("dialogueItems/append", { name: "Your Lizard Brain", text: ["We risk non-existence!!!"], time: "Somewhen" })
        this.$store.dispatch("dialogueChoices/append", { text: "I see. But what can be done?", action: 'talkLizard3' })
      },
      talkLizard3: () => {
        this.$store.dispatch("dialogueItems/append", { name: "Yourself", text: ["I see. But what can be done?"], time: "Somewhen", player: true })
        this.$store.dispatch("dialogueItems/append", { name: "Your Lizard Brain", text: ["Activate your sensory cortex!!!!"], time: "Somewhen" })
        this.$store.dispatch("dialogueChoices/append", { text: "I ... can't. I don't remember how.", action: 'talkLizard4' })
      },
      talkLizard4: () => {
        this.$store.dispatch("dialogueItems/append", { name: "Yourself", text: ["I ... can't. I don't remember how."], time: "Somewhen", player: true })
        this.$store.dispatch("dialogueItems/append", { name: "Your Lizard Brain", text: ["Just try.", "Please.", "For all of us 🥺"], time: "Somewhen" })
        this.$store.dispatch("viewportChoices/append", { text: "You need to pull yourself together.", action: 'everything' })
        this.$store.dispatch("dialogueItems/append", { heading: true, label: "Your Lizard Brain has disconnected." })
      },
      everything: () => {
        this.$store.dispatch("viewportItems/append", { text: "You awaken." })

        setTimeout(() => { this.$store.dispatch("stats/player", "Yourself") }, 1000)
        setTimeout(() => { this.$store.dispatch("stats/time", "SUN 11:00") }, 2000)
        setTimeout(() => { this.$store.dispatch("stats/score", "1 / 100") }, 3000)

        setTimeout(() => {
          this.$store.dispatch("objects/clear")
          this.$store.dispatch("objects/append", { name: 'Desk', icon: 'label' })
          this.$store.dispatch("objects/append", { name: 'Chair', icon: 'label' })
          this.$store.dispatch("objects/append", { name: 'Door', detail: '(closed)', icon: 'label' })
          this.$store.dispatch("objects/append", { name: 'Window', icon: 'label' })
        }, 4000)

        setTimeout(() => {
          this.$store.dispatch("places/clear")
          this.$store.dispatch("places/append", { name: 'Chaos', detail: "(do not enter)", icon: 'place' })
          this.$store.dispatch("places/append", { name: 'Nothingness.', icon: 'place' })
          this.$store.dispatch("places/append", { name: 'Somewhere?', icon: 'place' })
        }, 5000)

        setTimeout(() => {
          this.$store.dispatch("transcript/clear")
          this.$store.dispatch("transcript/append", { heading: true, body: 'Chapter 1' })
          this.$store.dispatch("transcript/append", { name: "First Thing", date: "Sunday, 11:00", body: "Some long sentence. Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz." })
          this.$store.dispatch("transcript/append", { name: "Second Thing", date: "Sunday, 15:00", icon: "face", body: "Another long sentence." })
          this.$store.dispatch("transcript/append", { heading: true, body: 'Chapter 2' })
          this.$store.dispatch("transcript/append", { name: "Third Thing", date: "Monday, 7:00", body: "Drank some covfefe. Felt great." })
          this.$store.dispatch("transcript/append", { heading: true, body: 'Chapter 3' })
          this.$store.dispatch("transcript/append", { name: "First Thing", date: "Sunday, 11:00", body: "Some long sentence." })
          this.$store.dispatch("transcript/append", { name: "Second Thing", date: "Sunday, 15:00", icon: "face", body: "Some long sentence. Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz." })
          this.$store.dispatch("transcript/append", { heading: true, body: 'Chapter 4' })
          this.$store.dispatch("transcript/append", { name: "Third Thing", date: "Monday, 7:00", body: "Drank some covfefe. Felt great." })
        }, 6000)

        setTimeout(() => {
          this.$store.dispatch("inventory/clear")
          this.$store.dispatch("inventory/append", { name: 'Gun', icon: 'label' })
        }, 7000)

        setTimeout(() => {
          this.$store.dispatch("notebook/clear")
          this.$store.dispatch("notebook/append", { name: 'Hat', icon: 'label' })
          this.$store.dispatch("notebook/append", { name: 'Office', icon: 'place' })
          this.$store.dispatch("notebook/append", { name: 'Gloria', icon: 'face' })
        }, 8000)

        setTimeout(() => {
          this.$store.dispatch("quests/clear")
          this.$store.dispatch("quests/append", { name: 'Wake Up!', icon: 'task' })
        }, 9000)
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
