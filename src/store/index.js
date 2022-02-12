import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
    userInfo: {},
    userList: [],
    error: "",
  },

  mutations: {
    _login(state, { payload }) {
      state.userList.map((item) => {
        if (
          item.email === payload.email &&
          item.password === payload.password
        ) {
          state.userInfo = payload.email;
          state.token = payload.email;
          return false;
        }
      });
      // state.error = "Incorrect Password";
    },
    removeToken(state) {
      state.userInfo = "";
      state.token = "";
    },
    saveUserList(state, { payload }) {
      state.userList.push(payload);
    },
    _create(state, { payload }) {
      state.userList.push(payload);
    },
    _update(state, { payload }) {
      let temp = state.userList;
      let temp2 = temp.map((item) => {
        if (item.email === payload.email) {
          return {
            ...item,
            email: payload.email,
            username: payload.username,
            password: payload.password,
          };
        }
        return item;
      });
      state.userList = [...temp2];
    },
    _remove(state, { payload }) {
      let temp = state.userList;
      let temp2 = temp.filter((item) => {
        if (item.email !== payload.email) {
          return item;
        }
      });
      state.userList = [...temp2];
    },
  },
  actions: {
    async login(context, data) {
      context.commit({ type: "_login", payload: data });
    },
    async register(context, data) {
      context.commit({ type: "saveUserList", payload: data });
    },
    async logout(context) {
      context.commit("removeToken");
    },
    async create(context, data) {
      context.commit({ type: "_create", payload: data });
    },
    async update(context, data) {
      context.commit({ type: "_update", payload: data });
    },
    async remove(context, data) {
      context.commit({ type: "_remove", payload: data });
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUsers(state) {
      return state.userList;
    },
    getError(state) {
      return state.error;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  modules: {},
});
