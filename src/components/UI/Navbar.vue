<template>
  <div class="navbar">
    <h1 @click="$router.push('/')">MVM</h1>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">posts</my-button>
      <my-button style="margin-left:10px" @click="$router.push('/about')">about</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.navbar {
  display: flex;
  height: 50px;
  background-color: lightgrey;
  align-items: center;
  box-shadow: 2px 2px 4px black;
}
.navbar__btns{
    margin-left: auto;
    padding: 5px 10px;
}
</style>