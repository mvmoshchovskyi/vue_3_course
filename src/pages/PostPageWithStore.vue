<template>
  <div>
    <my-input 
    :model-value="searchQuery"
    @update:model-value="setSearchQuery"
    v-focus></my-input>
    <div class="btns__wrapper">
      <my-button style="align-self: flex-start" @click="showDialog">
        create post</my-button
      >
      <my-select 
      :model-value="selectedSort" 
      @update:model-value='setSelectedSort'
      :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="remove"
      v-if="!isPostLoading"
    />

    <div v-else>post loading ...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <div ref="observer" class="observer"></div>

  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery:"post/setSearchQuery",
      setSelectedSort:"post/setSelectedSort"
    }),
    ...mapActions({
      fetchPosts: "post/fetchPosts",
      loadMorePosts: "post/loadMorePosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    remove(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },

  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // },
  },
};
</script>

<style >
.btns__wrapper {
  display: flex;
  justify-content: space-between;
}
h1 {
  text-align: center;
}
.pagination__wraper {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}
.page {
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}
.current-page {
  border: 3px solid teal;
}
.observer {
  height: 30px;
  background: red;
}
</style>
