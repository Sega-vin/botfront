import Vue from "vue";
import Vuex from "vuex";
import auth from './auth'
import calendar from './calendar'
import  instance  from '@/api/instanse'
import  {ConstructDifPost}  from '@/api/constructorApi'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    project: {}
  },
  mutations: {
    setProject(state, project){
      state.project = project
    }
  },
  actions: {
    async getProject({commit}, id){
      await instance.get(`constructor/${id}/`)
        .then(async resp => {
          const proj = resp.data 
          commit('setProject', proj)        
        })
        .catch(async err => {
          await this.dispatch('newProject', id)
        })
    
    },
    async newProject({commit}, user){
      await instance.post(`constructor/create/`, {
        user: user
      })
        .then(resp => {
          const proj = resp.data 
          commit('setProject', proj)
        })
        .catch(err => {
          console.log(err)
        })
       
    }
  },
  getters: {
    project: state => state.project
  },
  modules: {
    auth,
    calendar
  }
});
