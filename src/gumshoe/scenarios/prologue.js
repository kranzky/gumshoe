class Prologue {
  constructor () {
    this.loadGame()
  }

  run () {
    this.data['prologue']()
  }

  loadGame () {
    this.data = {
      talk: () => {
        this.talk()
        setTimeout(() => { this.store.set("page", "tab", 'dialogue') }, 500)
      },
      take: () => {
        let response = this.take()
        if (!_.isEmpty(response)) {
          this.$root.$emit("punk:info", response)
        }
      },
      drop: () => {
        let response = this.drop()
        if (!_.isEmpty(response)) {
          this.$root.$emit("punk:info", response)
        }
      },
      prologue: () => {
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
            this.store.add("roomChoices", { text: "Enter the world.", action: 'world' })
            this.store.add("dialogueItems", { heading: true, label: "Your Lizard Brain has disconnected." })
          }, 5000)
        }, 2000)
      }
    }
  }
}

export default Prologue
