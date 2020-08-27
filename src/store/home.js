export default {
  state: {
    listData: [],
    highlite: false,
    selectedItem: [],
    controlRefresh: false,
    search: null
  },

  mutations: {
    setListData(state, param) {
      state.listData.push(param)
      sessionStorage.setItem('data', JSON.stringify(state.listData))
    },

    updateAllList(state, param) {
      state.listData = param
      sessionStorage.setItem('data', JSON.stringify(state.listData))
    },

    updateItemModal(state, param) {
      state.listData.map(item => {
        if(item.id == param.id) {
          item.prevent = param.prevent,
          item.nome = param.nome,
          item.email = param.email,
          item.telefone = param.telefone,
          item.editar = param.editar,
          item.id = param.id
          sessionStorage.setItem('data', JSON.stringify(state.listData))
        }
      })
    },

    updateControlRefresh(state, param) {
      state.controlRefresh = param
    },

    selectedItem(state, param) {
      state.selectedItem = param
    },

    setHighlite(state, param) {
      state.highlite = param
    },

    getSession(state, param) {
      state.listData = param
    },

    updateSearch(state, param) {
      state.search = param
    }
  },

  actions: {
    setListData(context, param) {
      context.commit('setListData', param)
      context.commit('setHighlite', true)
      context.dispatch('setHighlite', false)
    },

    selectedItem(context, param) {
      context.commit('selectedItem', param)
    },

    updateAllList(context, param) {
      context.commit('updateAllList', param)
      context.commit('updateControlRefresh', true)
    },

    updateControlRefresh(context, param) {
      context.commit('updateControlRefresh', param)
    },

    setHighlite(context) {
      setTimeout(() => {
        context.commit('setHighlite', false)
      }, 10000)
    },

    getSession(context) {
      const sessionData = JSON.parse(sessionStorage.getItem('data'))
      if(sessionData) context.commit('getSession', sessionData)
    },

    updateSearch(context, param) {
      context.commit('updateSearch', param)
    },

    updateItemModal(context, param) {
      context.commit('updateItemModal', param)
    }
  },

  getters: {
    listData: state => {
      return state.listData
    },

    highlite: state => {
      return state.highlite
    },

    selectedItem: state => {
      return state.selectedItem
    },

    controlRefresh: state => {
      return state.controlRefresh
    },

    search: state => {
      return state.search
    },
  }
}