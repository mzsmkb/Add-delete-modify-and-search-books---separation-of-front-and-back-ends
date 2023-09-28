<template>
  <div class="search">
    <a>这是搜索结果页面</a>
    <li :data="results" v-for="book in results" :key="book.book_id" class="book-item">
          <el-container>

            <el-header>
              <div class="book-content">
                {{ book.book_name }} / {{ book.author }}(著)
              </div>
            </el-header>

            <el-container>

              <el-aside width="200px">
                <div class="demo-image__lazy">
                  <el-image  class="bgimg" :src="urls" lazy></el-image>
                </div>
              </el-aside>

              <el-container>
                <el-main>
                  <p>{{ book.intro }}</p>
                </el-main>

                <el-footer>
                  <el-button type="danger" round @click="deleteBook(book.book_id)">Delete</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <!-- <el-button type="danger" round router :to="{ name: 'edit', params: { id: book.book_id } }">Edit</el-button> -->
                  <router-link :to="{ name: 'edit', params: { id: book.book_id } }" class="edit-link">Edit</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <router-link :to="{ name: 'detail', params: { id: book.book_id } }" class="detail-link">Details</router-link>
                </el-footer>

              </el-container>
              
            </el-container>
            </el-container>
        </li>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      book: {}
    };
  },
  methods: {
    fetchBook() {
      axios.get(`http://localhost:3000/books/${this.$route.params.id}`)
        .then(response => {
          this.book = response.data;
        })
        .catch(error => {
          console.error(error);
          alert('Error fetching book details');
        });
    }
  },
  created() {
    this.fetchBook();
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
