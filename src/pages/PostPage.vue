<template>
  <div >
    <h2>page with posts</h2>
    <my-input v-model="searchQuery"></my-input>
    <div class="btns__wrapper">
      <my-button style="align-self: flex-start" @click="showDialog">
        create post</my-button
      >
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
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
    <div ref="observer" class="observer"></div>
    <!-- <div class="pagination__wraper">
      <div
        class="page"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      searchQuery: "",
      selectedSort: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { name: "по-назві", value: "title" },
        { name: "по-опису", value: "body" },
      ],
    };
  },
  methods: {
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          }
        );
        this.posts = response.data;
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          }
        );
        this.posts = [...this.posts, ...response.data];
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  mounted() {
    this.fetchPosts();

    const options = {
      // root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((pos1, pos2) =>
        pos1[this.selectedSort]?.localeCompare(pos2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((pos) =>
        pos.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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
