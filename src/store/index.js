import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from "axios";

export default new Vuex.Store({
  state: {
    questions :[]
  },
  mutations: {
    setQuestions(state, values){
      state.questions = values
    }
  },
  actions: {
      getQuestionFromDB(ct){
        return new Promise((resolve, reject) => {
          axios.get('http://127.0.0.1:3000/api/user/questions')
              .then((response)=> {
                ct.commit('setQuestions',response.data.questions)
                console.log(response)
                resolve()
              })
              .catch(error =>{
                reject(error)
              })
        })
      }
  },
  modules: {
  },
    getters: {
      Questions(state){
          return state.questions
      }
    }
})
