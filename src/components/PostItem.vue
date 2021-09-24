<template>
  <div class="post">
    <div>
      <div>
        id: <strong>{{ post.id }}</strong>
      </div>
      <div>
        title: <strong>{{ post.title }}</strong>
      </div>
      <div>
        body: <strong>{{ post.body }}</strong>
      </div>
    </div>
    <div class="post__btn">
      <my-button @click="$emit('remove', post)">remove</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style  scoped>
.post {
  display: flex;
  border: 2px solid teal;
  padding: 5px 10px;
  margin-top: 15px;
  align-items: center;
  justify-content: space-between;
}
</style>