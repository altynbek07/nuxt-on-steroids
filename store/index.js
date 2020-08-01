export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, payload) {
    state.loadedPosts = payload;
  },
  addPost(state, payload) {
    state.loadedPosts.push(payload)
  },
  editPost(state, payload) {
    const postIndex = state.loadedPosts.findIndex(post => post.id === payload.id)
    state.loadedPosts[postIndex] = payload
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
  },
  async addPost({ commit }, payload) {
    const createdPost = { ...payload, updatedDate: new Date() }
    const data = await this.$axios.$post("https://nuxt-on-steroids.firebaseio.com/posts.json", createdPost);
    commit("addPost", { ...createdPost, id: data.name });
  },
  async editPost({ commit }, payload) {
    await this.$axios.$put(`https://nuxt-on-steroids.firebaseio.com/posts/${payload.id}.json`, payload);
    commit("editPost", payload);
  }
};

export const getters = {
  loadedPosts: state => state.loadedPosts
};
