<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style>
