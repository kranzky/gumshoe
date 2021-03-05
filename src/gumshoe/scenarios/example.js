class Example {
  constructor () {
    this.loadGame()
  }

  run () {
    this.data['test']()
  }

  loadGame () {
    this.data = {
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
}

export default Example
