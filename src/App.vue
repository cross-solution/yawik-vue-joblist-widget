<template>
  <div id="app">
    <YawikJobList :url="url" :page="page" :count="count" :title="title"/>
  </div>
</template>

<script>
import YawikJobList from './components/YawikJobList.vue'

export default {
  name: 'app',
  props: ['url', 'title', 'page', 'count'],
  components: {
    YawikJobList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
