<template>
    <button class=".button" v-if="isButton">
        <slot></slot>
    </button>
    <router-link v-else :to="to" class="router-style">
      <slot></slot>
    </router-link>
</template>

<script>
export default {
  props: ['isButton', 'to']
}
</script>

<style scoped>
button, .router-style {
  background-color: tomato;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-family: Courier;
}

.router-link-active {
  border: 2px tomato solid;
  color: tomato;
  background-color: white;
}
</style>