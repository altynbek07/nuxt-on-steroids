export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, payload) {
    state.loadedPosts = payload;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }, { $axios }) {
    const data = await $axios.$get("https://nuxt-on-steroids.firebaseio.com/posts.json")
    const posts = []

    for (const key in data) {
      posts.push({ ...data[key], id: key })
    }

    dispatch("setPosts", posts);
  },
  setPosts({ commit }, payload) {
    commit("setPosts", payload);
  }
};

export const getters = {
  loadedPosts: state => state.loadedPosts
};
