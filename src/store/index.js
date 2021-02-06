import Vue from "vue"
import Vuex from "vuex"

import page from "./page"
import list from "./list"
import viewport from "./viewport"
import dialogue from "./dialogue"
import stats from "./stats"
import progress from "./progress"

Vue.use(Vuex)

export default function() {
  const Store = new Vuex.Store({
    modules: {
      page,
      places: list('places'),
      people: list('people'),
      objects: list('objects'),
      inventory: list('inventory'),
      notebook: list('notebook'),
      quests: list('quests'),
      transcript: list('transcript'),
      viewport,
      viewportItems: list('viewportItems'),
      viewportChoices: list('viewportChoices'),
      dialogue,
      dialogueItems: list('dialogueItems'),
      dialogueChoices: list('dialogueChoices'),
      stats,
      progress
    },
    strict: process.env.DEV
  })

  return Store
}
