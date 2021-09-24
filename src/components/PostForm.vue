<template>
 <h1>create posts</h1>
  <form @submit.prevent>
    <my-input v-model="post.title" placeholder="title"/>
    <my-input v-model="post.body" placeholder="body"/>
    <my-button style="align-self: flex-end" @click="createPost">add</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style  scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>