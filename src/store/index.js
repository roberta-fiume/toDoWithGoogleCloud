import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    todos: []
  },

  getters: {
    allTodos: (state) => state.todos,
  },


  actions: {  //make a request, get a response and then call a mutation that is what actually mutates the state. We don' call mutation directly, we call it with "commit" passe in fetchTodos
    async fetchTodos({ commit }) {
      console.log(commit)
      const response  = await axios.get('http://apicreation-260015.appspot.com/todos');
      console.log(response.data)
      commit('setTodos', response.data) //in order to call the mutation, we need to use commit. The first argument is setTodos in mutations and the second argument is the second parameter passed in mutations
    },

     addTodo({ commit }, title) {
      console.log(commit);
      const postPromise = axios.post("http://apicreation-260015.appspot.com/todos", {
        title,
        completed: false
      });
      postPromise.then((response) => {
        console.log("this is the responseee", response);

        commit('newTodo', response.data);

      },(error) => {
        console.log("this is the error",error);
      });
      
      return postPromise;
    },

    async deleteTodo({ commit }, id) {
        const response = await axios.delete('http://apicreation-260015.appspot.com/todos/'+ id);

        console.log("RESPONSE DELETE", response.data);

      commit('removeTodo', id);
    },

  

    async filterTodos({ commit }, e) {
      //Get selected number
      const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
      console.log("LIMIT", limit)

      const response  = await axios.get(`http://apicreation-260015.appspot.com/todos?limit=${limit}`);
      console.log("this is the response for LIMIT", response);

      commit('setTodos', response.data);


    },

    async updateTodo({ commit }, updTodo) {
      const response  = await axios.put(`http://apicreation-260015.appspot.com/todos/${updTodo.id}`, updTodo);
      console.log("UPDATE",response.data)

      commit('updateTodo', response.data);
    }
  },

  mutations: { //takes the array from the response and adds it to the state
    setTodos: (state, todos) => state.todos = todos,
    setDocumentId: (state, documentId) => state.idDocument = documentId,
    newTodo: (state, todo) => state.todos.unshift(todo), //unshift puts the new element at the beginning
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),

     //it will remove it from the UI
    updateTodo: (state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id); //give me the index of the todo that I want to replace
      if (index !== -1) {
        state.todos.splice(index, 1, updTodo);
      }
    }
  },

  modules: {
  }
})
