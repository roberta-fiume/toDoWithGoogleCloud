<template>
  <div id="app">
    <div class="container">
      <AddToDo />
      <FilterTodos />
      <Todos />
    </div>
    
  </div>
</template>

<script>
import Todos from "./components/Todos.vue"
import AddToDo from "./components/AddToDo.vue"
import FilterTodos from "./components/FilterTodos.vue"

export default {
  name: "App",
  components: {
    Todos,
    AddToDo,
    FilterTodos
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Solway&display=swap');
body {
  font-family: 'Solway', serif;
  line-height: 1.6;
  background: #e8f7f0;
}

.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>
