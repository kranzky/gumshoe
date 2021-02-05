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
        this.$store.dispatch("viewport/appendItem", { id: 1, text: "A lingering memory of utter chaos intrudes upon the void." })
        this.$store.dispatch("progress/delay", 'firstDecision')
      },
      firstDecision: () => {
        this.$store.dispatch("viewport/appendChoice", { id: 1, text: "What is there to do but wait?", action: 'waitLonger' })
      },
      waitLonger: () => {
        this.$store.dispatch("progress/delay", 'remember')
      },
      remember: () => {
        this.$store.dispatch("viewport/appendItem", { id: 2, text: "Aeons pass. Then something changes." })
        setTimeout(() => {
          this.$store.dispatch("viewport/appendItem", { id: 3, text: "There is another presence here." })
        }, 2000)
        setTimeout(() => {
          this.$store.dispatch("people/clear")
          this.$store.dispatch("people/append", { id: 1, name: 'Your Lizard Brain', icon: 'face', seen: false, action: "activateLizard" })
        }, 4000)
      },
      activateLizard: () => {
        this.$store.dispatch("viewport/appendItem", { id: 4, text: "Your Lizard Brain is trying to attract your attention." })
        this.$store.dispatch("dialogue/clear")
        this.$store.dispatch("dialogue/appendItem", { id: 1, heading: true, label: "Chat with Your Lizard Brain" })
        this.$store.dispatch("dialogue/appendItem", { id: 2, name: "Your Lizard Brain", text: ["Hey! Over here! Emergency!"], time: "Somewhen" })
        this.$store.dispatch("dialogue/appendChoice", { id: 1, text: "Ugh. Why do you disturb my rest?", action: 'talkLizard1' })
      },
      talkLizard1: () => {
        this.$store.dispatch("dialogue/appendItem", { id: 3, name: "Yourself", text: ["Ugh. Why do you disturb my rest?"], time: "Somewhen", player: true })
        this.$store.dispatch("dialogue/appendItem", { id: 4, name: "Your Lizard Brain", text: ["We need you to awaken."], time: "Somewhen" })
        this.$store.dispatch("dialogue/appendChoice", { id: 1, text: "Sounds tiring. It was so peaceful.", action: 'talkLizard2' })
      },
      talkLizard2: () => {
        this.$store.dispatch("dialogue/appendItem", { id: 5, name: "Yourself", text: ["Sounds tiring. It was so peaceful."], time: "Somewhen", player: true })
        this.$store.dispatch("dialogue/appendItem", { id: 6, name: "Your Lizard Brain", text: ["But we are in danger of non-existence."], time: "Somewhen" })
        this.$store.dispatch("dialogue/appendChoice", { id: 1, text: "I see. But what can be done?", action: 'talkLizard3' })
      },
      talkLizard3: () => {
        this.$store.dispatch("dialogue/appendItem", { id: 7, name: "Yourself", text: ["I see. But what can be done?"], time: "Somewhen", player: true })
        this.$store.dispatch("dialogue/appendItem", { id: 8, name: "Your Lizard Brain", text: ["Activate your sensory cortex!"], time: "Somewhen" })
        this.$store.dispatch("dialogue/appendChoice", { id: 1, text: "I ... can't. I don't remember how.", action: 'talkLizard4' })
      },
      talkLizard4: () => {
        this.$store.dispatch("dialogue/appendItem", { id: 9, name: "Yourself", text: ["I ... can't. I don't remember how."], time: "Somewhen", player: true })
        this.$store.dispatch("dialogue/appendItem", { id: 10, name: "Your Lizard Brain", text: ["Just try. Please. For all of us."], time: "Somewhen" })
        this.$store.dispatch("viewport/appendChoice", { id: 1, text: "You need to pull yourself together.", action: 'everything' })
        this.$store.dispatch("dialogue/appendItem", { id: 11, heading: true, label: "Your Lizard Brain has disconnected." })
      },
      everything: () => {
        this.$store.dispatch("viewport/appendItem", { id: 5, text: "You awaken." })

        setTimeout(() => { this.$store.dispatch("stats/player", "Yourself") }, 1000)
        setTimeout(() => { this.$store.dispatch("stats/time", "SUN 11:00") }, 2000)
        setTimeout(() => { this.$store.dispatch("stats/score", "1 / 100") }, 3000)

        setTimeout(() => {
          this.$store.dispatch("objects/clear")
          this.$store.dispatch("objects/append", { id: 1, name: 'Desk', icon: 'label', seen: false })
          this.$store.dispatch("objects/append", { id: 2, name: 'Chair', icon: 'label', seen: false })
          this.$store.dispatch("objects/append", { id: 3, name: 'Door', detail: '(closed)', icon: 'label', seen: false })
          this.$store.dispatch("objects/append", { id: 4, name: 'Window', icon: 'label', seen: false })
        }, 4000)

        setTimeout(() => {
          this.$store.dispatch("places/clear")
          this.$store.dispatch("places/append", { id: 1, name: 'Chaos', detail: "(do not enter)", icon: 'place', seen: false })
          this.$store.dispatch("places/append", { id: 2, name: 'Nothingness.', icon: 'place', seen: false })
          this.$store.dispatch("places/append", { id: 3, name: 'Somewhere?', icon: 'place', seen: false })
        }, 5000)

        setTimeout(() => {
          this.$store.dispatch("transcript/clear")
          this.$store.dispatch("transcript/append", { id: 1, heading: true, body: 'Chapter 1' })
          this.$store.dispatch("transcript/append", { id: 2, name: "First Thing", date: "Sunday, 11:00", body: "Some long sentence. Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz." })
          this.$store.dispatch("transcript/append", { id: 3, name: "Second Thing", date: "Sunday, 15:00", icon: "face", body: "Another long sentence." })
          this.$store.dispatch("transcript/append", { id: 4, heading: true, body: 'Chapter 2' })
          this.$store.dispatch("transcript/append", { id: 5, name: "Third Thing", date: "Monday, 7:00", body: "Drank some covfefe. Felt great." })
          this.$store.dispatch("transcript/append", { id: 6, heading: true, body: 'Chapter 3' })
          this.$store.dispatch("transcript/append", { id: 7, name: "First Thing", date: "Sunday, 11:00", body: "Some long sentence." })
          this.$store.dispatch("transcript/append", { id: 8, name: "Second Thing", date: "Sunday, 15:00", icon: "face", body: "Some long sentence. Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz.  Lorum ipsum and all that jazz." })
          this.$store.dispatch("transcript/append", { id: 9, heading: true, body: 'Chapter 4' })
          this.$store.dispatch("transcript/append", { id: 10, name: "Third Thing", date: "Monday, 7:00", body: "Drank some covfefe. Felt great." })
        }, 6000)

        setTimeout(() => {
          this.$store.dispatch("inventory/clear")
          this.$store.dispatch("inventory/append", { id: 1, name: 'Gun', icon: 'label', seen: false })
        }, 7000)

        setTimeout(() => {
          this.$store.dispatch("notebook/clear")
          this.$store.dispatch("notebook/append", { id: 1, name: 'Hat', icon: 'label', seen: false })
          this.$store.dispatch("notebook/append", { id: 2, name: 'Office', icon: 'place', seen: false })
          this.$store.dispatch("notebook/append", { id: 3, name: 'Gloria', icon: 'face', seen: false })
        }, 8000)

        setTimeout(() => {
          this.$store.dispatch("quests/clear")
          this.$store.dispatch("quests/append", { id: 1, name: 'Wake Up!', icon: 'task', seen: false })
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
