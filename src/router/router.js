import { createRouter, createWebHistory } from "vue-router";
import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
import PostPageWithStore from "@/pages/PostPageWithStore"
import PostPageComposition from "@/pages/PostPageComposition"

const routes = [
  {
    path: "/",
    component: Main,
    exact: false,
  },
  {
    path: "/posts",
    component: PostPage,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
    exact: true,
  },
  {
    path: "/store",
    component: PostPageWithStore,
    exact: true,
  },
  {
    path: "/composition",
    component: PostPageComposition,
    exact: true,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
