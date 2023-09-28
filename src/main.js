import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

createApp(App).use(router).use(ElementPlus).mount('#app')
