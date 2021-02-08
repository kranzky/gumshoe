import Vue from "vue"
import Vuex from "vuex"

import page from "./page"
import list from "./list"
import room from "./room"
import entity from "./entity"
import dialogue from "./dialogue"
import quest from "./quest"
import game from "./game"
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
      room,
      roomItems: list('roomItems'),
      roomChoices: list('roomChoices'),
      entity,
      entityItems: list('entityItems'),
      entityChoices: list('entityChoices'),
      dialogue,
      dialogueItems: list('dialogueItems'),
      dialogueChoices: list('dialogueChoices'),
      quest,
      questItems: list('questItems'),
      game,
      progress
    },
    strict: process.env.DEV
  })

  return Store
}
