import { createStore } from "vuex";
import { postModule } from "./postModule";

const store = createStore({
  modules: {
    post:postModule
  },
});

export default store;
