<template>
  <div id="app">
    <YawikJobList :remote="remote" :count="count" :widget-title="widgetTitle"/>
  </div>
</template>

<script>
import YawikJobList from './components/YawikJobList.vue'

export default {
  name: 'app',
  props: ['remote', 'widget-title', 'count'],
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
