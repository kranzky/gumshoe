import Vue from "vue";
import Vuex from "vuex";

import page from "./page";
import people from "./people";
import quests from "./quests";
import settings from "./settings";
import skills from "./skills";

Vue.use(Vuex);

export default function() {
  const Store = new Vuex.Store({
    modules: {
      page,
      people,
      quests,
      settings,
      skills
    },
    strict: process.env.DEV
  });

  return Store;
}
