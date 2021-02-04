<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "gumshoe",
  mounted() {
    this.$q.dark.set(true)

    setTimeout(() => {
      this.$store.dispatch("stats/time", "SUN 11:00")
      this.$store.dispatch("stats/player", "Yourself")
      this.$store.dispatch("stats/score", "1 / 100")
    }, 2000)

    this.$store.dispatch("places/clear")
    this.$store.dispatch("places/append", { id: 1, name: 'Chaos', detail: "(do not enter)", icon: 'place', seen: false })
    this.$store.dispatch("places/append", { id: 2, name: 'Nothingness.', icon: 'place', seen: false })
    this.$store.dispatch("places/append", { id: 3, name: 'Somewhere?', icon: 'place', seen: false })

    this.$store.dispatch("people/clear")
    this.$store.dispatch("people/append", { id: 1, name: 'Limbic System', icon: 'face', seen: false })

    this.$store.dispatch("objects/clear")
    this.$store.dispatch("objects/append", { id: 1, name: 'Desk', icon: 'label', seen: false })
    this.$store.dispatch("objects/append", { id: 2, name: 'Chair', icon: 'label', seen: false })
    this.$store.dispatch("objects/append", { id: 3, name: 'Door', detail: '(closed)', icon: 'label', seen: false })
    this.$store.dispatch("objects/append", { id: 4, name: 'Window', icon: 'label', seen: false })

    this.$store.dispatch("inventory/clear")
    this.$store.dispatch("inventory/append", { id: 1, name: 'Gun', icon: 'label', seen: false })

    this.$store.dispatch("notebook/clear")
    this.$store.dispatch("notebook/append", { id: 1, name: 'Hat', icon: 'label', seen: false })
    this.$store.dispatch("notebook/append", { id: 2, name: 'Office', icon: 'place', seen: false })
    this.$store.dispatch("notebook/append", { id: 3, name: 'Gloria', icon: 'face', seen: false })

    this.$store.dispatch("quests/clear")
    this.$store.dispatch("quests/append", { id: 1, name: 'Wake Up!', icon: 'task', seen: false })

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

    this.$store.dispatch("viewport/clear")
    this.$store.dispatch("viewport/title", "Utter Chaos")
    this.$store.dispatch("viewport/appendItem", { id: 1, text: "This is the first paragraph." })
    this.$store.dispatch("viewport/appendItem", { id: 2, text: "And this is the second!" })
    this.$store.dispatch("viewport/appendChoice", { id: 1, text: "Not much..." })
    this.$store.dispatch("viewport/appendChoice", { id: 2, text: "Lots of things!" })

    this.$store.dispatch("dialogue/clear")
    this.$store.dispatch("dialogue/appendItem", { id: 1, heading: true, label: "Sunday, 11:00" })
    this.$store.dispatch("dialogue/appendItem", { id: 2, name: "Other Person", text: ["This is my message.", "And this is another."], time: "1 minute ago" })
    this.$store.dispatch("dialogue/appendItem", { id: 3, name: "Yourself", text: ["Well, there you go!"], time: "1 minute ago", player: true })
    this.$store.dispatch("dialogue/appendItem", { id: 4, name: "Other Person", text: ["JUST TESTING DUDE"], time: "1 minute ago" })
    this.$store.dispatch("dialogue/appendChoice", { id: 1, text: "Blah blah." })
    this.$store.dispatch("dialogue/appendChoice", { id: 2, text: "Rhubarb?" })
  }
};
</script>

<style scoped lang="stylus">
</style>
