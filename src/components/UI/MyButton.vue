<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name:'my-button'
  }
</script>

<style  scoped>
.btn {
  background: none;
  color: teal;
  border: 2px solid teal;
  margin-top: 15px;
  padding: 5px 10px;
}
</style>