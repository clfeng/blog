<template>
  <div id="app">
    <span @click="onShowBtn">showBtn</span>
    <button @click="this.onClick" v-if="showBtn">button</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      showBtn: false
    }
  },
  methods: {
    onClick () {
      console.log('click event');
    },
    onShowBtn () {
      this.showBtn = true;
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
