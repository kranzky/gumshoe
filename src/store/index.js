import Vue from "vue";
import Vuex from "vuex";

import page from "./page";
import people from "./people";
import quests from "./quests";

Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    modules: {
      page,
//    places,
      people,
//    objects,
//    inventory,
//    notebook,
      quests,
//    transcript,
//    viewport,
//    dialogue
    },
    strict: process.env.DEV
  });

  return Store;
}
