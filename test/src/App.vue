<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/other">其他</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <ul class="tab">
      <li>
        <router-link to="/" >首页</router-link>
      </li>
      <li>
        <router-link to="/list" >列表</router-link>
      </li>
      <li>
        <router-link to="/about" >关于</router-link>
      </li>
      <li>
        <a href="#" @click='() => { this.$router.back() }'>点击回退</a>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<style lang="scss">
  .list_content {
    height: 300px;
    overflow: auto;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
