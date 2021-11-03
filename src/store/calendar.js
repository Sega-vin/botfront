import  instance  from '@/api/instanse'

export default{
  state: {
    calendar: {},
  },
  actions: { 
    Calendar({commit}, id){
      return new Promise((resolve, reject) => {
        instance.get(`constructor/staff-constructor/${id}/`)
         .then(resp => {
            commit('setCalendar', resp.data)
            resolve(resp)
         })
         .catch(err => { 
           reject(err)
         })
       })
    },
  },
  mutations: {
   setCalendar(state, calendar){
    state.calendar = calendar
   }
  },
  getters : {
    calendar: state => state.calendar,
  }
}
