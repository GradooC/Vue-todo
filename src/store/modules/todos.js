import axios from 'axios';

const state = {
  todos: [],
  todosAmount: 200
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );

    commit('setTodos', response.data);
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      { title, completed: false }
    );

    commit('newTodo', response.data);
  },

  async deleteTodo({ commit }, todoId) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);

    commit('removeTodo', todoId);
  },

  async filterTodos({ commit }, e) {
    console.log("TCL: filterTodos -> e", e)
    const {target: {options}} = e;
    // commit('filterTodos', amount);
    const limit = options[options.selectedIndex].innerText;
    console.log("TCL: filterTodos -> limit", limit)
  }
};

const mutations = {
  setTodos: (state, todos) => {
    state.todos = todos;
  },
  newTodo: (state, todo) => {
    state.todos = [todo, ...state.todos];
  },
  removeTodo: (state, todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
  },
  filterTodos: (state, amount) => {
    state.todosAmount = amount;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
