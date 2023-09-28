<template>
  <div class="container">
    <h1>Book List</h1>
    <ul class="book-list">

      <div>
        <el-input v-model="keyword" placeholder="关键词"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>

        <el-divider content-position="left" v-show="keyword">以下是“{{ keyword }}”的搜索结果</el-divider>
        <li :data="results" v-for="book in results" :key="book.book_id" class="book-item" v-show="keyword">
          <el-container>

            <el-header>
              <div class="book-content">
                {{ book.book_name }} / {{ book.author }}(著)
              </div>
            </el-header>

            <el-container>

              <el-aside width="200px">
                <div class="demo-image__lazy">
                  <img class="bgimg" :src="urls[book.book_id-1]" />
                  <!-- <el-image  class="bgimg" :src="urls" lazy></el-image> -->
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

      
      <el-divider content-position="left" v-show="!keyword">完整书目</el-divider>
      <li v-for="book in books" :key="book.book_id" class="book-item" v-show="!keyword">

        <el-container>

          <el-header>
            <div class="book-content">
              {{ book.book_name }} / {{ book.author }}(著)
            </div>
          </el-header>

          <el-container>

            <el-aside width="200px">
              <div class="demo-image__lazy">
                <img class="bgimg" :src="urls[book.book_id-1]" />
                <!-- <el-image  class="bgimg" :src="urls" lazy></el-image> -->
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
    </ul>
    <router-link to="/add" class="add-link">Add a Book</router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      books: [],

      urls:[
        require("../assets/1.jpg"),
        require("../assets/2.jpg"),
        require("../assets/3.jpg"),
        require("../assets/4.jpg"),
        require("../assets/5.jpg"),
        require("../assets/6.jpg"),
        require("../assets/7.jpg"),
        require("../assets/8.jpg"),
        require("../assets/9.jpg"),
        require("../assets/10.jpg"),
        require("../assets/11.jpg"),
        require("../assets/12.jpg"),
        require("../assets/13.jpg"),
        require("../assets/14.jpg"),
        require("../assets/15.jpg"),
        require("../assets/16.jpg"),
        require("../assets/17.jpg"),
      ],

      // urls:[
      // require("../assets/1.jpg"),
      // ],
      keyword: '',
      results:[],
      imageUrl:'',
      num:[1,2],
    };
  },
  methods: {
    deleteBook(bookId) {
      console.log('Deleting book with id:', bookId);  // Log the bookId
      axios.delete(`http://localhost:3000/books/${bookId}`)
        .then(response => {
          console.log('Delete response:', response);  // Log the response
          this.$router.push({ name: 'home' });
        })
        .catch(error => {
          console.error('Delete error:', error);  // Log the error
          alert('Error deleting book');
        });
    },
    fetchBooks() {
      axios.get('http://localhost:3000/books')
        .then(response => { this.books = response.data; })
        .catch(error => {
          console.error(error);
          alert('Error fetching books');
        });
    },
    search() {
      axios.get('http://localhost:3000/api/search', {
        params: { keyword: this.keyword }
      })
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    
  },
  created() {
    this.fetchBooks();
  },
  
};
</script>

<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
}

.book-list {
  list-style-type: none;
  padding: 0;
}

.book-item {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.book-content {
  margin-bottom: 10px;
}

.book-actions {
  display: flex;
  gap: 10px;
}

.delete-btn {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.edit-link, .detail-link, .add-link {
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.edit-link {
  background-color: blue;
}

.detail-link {
  background-color: green;
}

.add-link {
  display: inline-block;
  margin-top: 20px;
  background-color: purple;
}



.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .bgimg{
    /* margin-top: 100px; */
    width: 170px;
    height: 230px;
    background-size:contain ;
  }
</style>