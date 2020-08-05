import Cookies from 'js-cookie'

export const state = () => ({
  loadedPosts: [],
  token: null
})

export const mutations = {
  setPosts(state, payload) {
    state.loadedPosts = payload
  },
  addPost(state, payload) {
    state.loadedPosts.push(payload)
  },
  editPost(state, payload) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === payload.id
    )
    state.loadedPosts[postIndex] = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }, { $axios }) {
    const data = await $axios.$get(
      'https://nuxt-on-steroids.firebaseio.com/posts.json'
    )
    const posts = []

    for (const key in data) {
      posts.push({ ...data[key], id: key })
    }

    dispatch('setPosts', posts)
  },
  setPosts({ commit }, payload) {
    commit('setPosts', payload)
  },
  async addPost({ commit, state }, payload) {
    const createdPost = { ...payload, updatedDate: new Date() }
    const data = await this.$axios.$post(
      'https://nuxt-on-steroids.firebaseio.com/posts.json?auth=' + state.token,
      createdPost
    )
    commit('addPost', { ...createdPost, id: data.name })
  },
  async editPost({ commit, state }, payload) {
    await this.$axios.$put(
      `https://nuxt-on-steroids.firebaseio.com/posts/${payload.id}.json?auth=` +
        state.token,
      payload
    )
    commit('editPost', payload)
  },
  async authenticateUser({ commit, dispatch }, payload) {
    const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
    if (!payload.isLogin) {
      const authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
    }

    const data = await this.$axios.$post(authUrl, {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    })

    commit('setToken', data.idToken)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem(
      'tokenExpiration',
      new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
    )

    Cookies.set('jwt', data.idToken)
    Cookies.set(
      'expirationDate',
      new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
    )
  },
  initAuth({ commit, dispatch }, req) {
    let token
    let expirationDate
    if (req) {
      if (!req.headers.cookie) {
        return
      }

      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))

      if (!jwtCookie) {
        return
      }

      token = jwtCookie.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expirationDate='))
        .split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }

    if (new Date().getTime() > +expirationDate || !token) {
      dispatch('logout')
      return
    }

    commit('setToken', token)
  },
  logout({ commit }) {
    commit('clearToken')
    Cookies.remove('jwt')
    Cookies.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }
}

export const getters = {
  loadedPosts: state => state.loadedPosts,
  isAuthenticated: state => state.token !== null
}
