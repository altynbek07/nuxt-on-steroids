export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, payload) {
    state.loadedPosts = payload;
  }
};

export const actions = {
  nuxtServerInit({ dispatch }) {
    const posts = [
      {
        id: 1,
        title: "Title",
        previewText: "Text",
        thumbnail:
          "https://techclad.com/wp-content/uploads/2019/02/2018-07-10-image-35.jpg"
      }
    ];
    dispatch("setPosts", posts);
  },
  setPosts({ commit }, payload) {
    commit("setPosts", payload);
  }
};

export const getters = {
  loadedPosts: state => state.loadedPosts
};
