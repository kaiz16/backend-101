<template>
  <div id="app">
    <h1>Todo App</h1>
    <input type="text" v-model="todoTitle"/>
    <button v-on:click="addTodo">Submit</button>
    <ul class="todos">
      <li class="todo" 
        v-for="todo in todos" 
        v-bind:key="todo.id"
      >
        <span>{{ todo.title }}</span>
        <button v-on:click="deleteTodo(todo)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
let api = 'http://localhost:3000'
export default {
  name: 'App',
  data(){
    return {
      todos: [],
      todoTitle: ''
    }
  },
  mounted(){
    this.getTodos()
  },
  methods: {
    async getTodos(){
      let data = await fetch(api)
      let datajson = await data.json()
      this.todos = datajson
    },
    async addTodo(){
      let body = {
        title: this.todoTitle
      }
      let data = await fetch(
        api + '/addTodo', 
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      )
      let datajson = await data.json()
      this.todos = datajson
    },
    async deleteTodo(todo){
      let body = {
        id: todo.id
      }
      let data = await fetch(
        api + '/deleteTodo', 
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      )
      let datajson = await data.json()
      this.todos = datajson
    }
  }
}
</script>

<style>
html, body {
  background: #cdcdcd;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #cdcdcd;
}

.todos li{
  list-style: none;
}

.todo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.todo span{
  margin: 0 7px 10px 7px;
}
.todo button{
  margin: 0 7px 10px 7px;
}
</style>
