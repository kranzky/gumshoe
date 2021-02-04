import Vue from "vue"
import Vuex from "vuex"

import page from "./page"
import list from "./list"
import stats from "./stats"
import transcript from "./transcript"
import viewport from "./viewport"
import dialogue from "./dialogue"

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
      stats,
      transcript,
      viewport,
      dialogue
    },
    strict: process.env.DEV
  })

  return Store
}
