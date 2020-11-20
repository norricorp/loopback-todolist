<template>
  <Layout>
    <h1>Todo Nodes</h1>
    <div>
        <li v-for="todo in todos" :key="todo.id">
            {{ todo.id }}   {{ todo.title }} {{ todo.isCompleted }}
        </li>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios'

export default {
  metaInfo: {
    title: 'Todos from Loopback 4'
  },
  data () {
    return {
      todos: null
    }
  },
  async mounted () {
    try {
      const results = await axios.get(
        'http://mint20-loopback4:3000/todos'
      )

      this.todos = results.data
    } catch (error) {
      console.log(error)
    }
  }
}

</script>
