import { createRouter, createWebHistory } from 'vue-router';
import BookList from '../components/BookList.vue';
import AddBook from '../components/AddBook.vue';
import EditBook from '../components/EditBook.vue';
import BookDetail from '../components/BookDetail.vue';
import SearchList from '../components/SearchList.vue'
// import UpLoad from '../components/UpLoad.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BookList,
  },
  {
    path: '/add',
    name: 'add',
    component: AddBook,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditBook,
    props: true
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: BookDetail,
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: SearchList,
    props: true
  },
  {
    path: '/upload',
    name: 'upload',
    component: BookList,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
