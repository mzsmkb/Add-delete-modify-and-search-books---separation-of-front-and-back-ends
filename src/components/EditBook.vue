<template>
  <div class="container">
    <h1>Edit Book</h1>
    <img style="width: 100px;" :src="urls[book.book_id-1]" />
    <input type="file" ref="fileInput" @change="uploadFile">
    <form @submit.prevent="editBook" class="edit-form">
      <label class="form-label">
        Title:
        <input v-model="book.book_name" required class="form-input" />
      </label>
      <label class="form-label">
        Author:
        <input v-model="book.author" required class="form-input" />
      </label>
      <label class="form-label">
        Details:
        <textarea v-model="book.intro" required class="form-input form-textarea"></textarea>
      </label>
      <button type="submit" class="submit-btn">Update</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
     book: {
      book_name: '',
      author: '',
      intro: '',
      price: 0,
      num: 100
    },
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
    },
    editBook() {
      axios.put(`http://localhost:3000/books/${this.$route.params.id}`, this.book)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'home' });
        })
        .catch(error => {
          console.error(error);
          alert('Error updating book');
        });
    },
     //已成功上传图片文件到本地
     uploadFile() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      axios.post('/api/upload', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.fetchBook();
  }
};
</script>

<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
}

.edit-form {
  margin-top: 30px;
}

.form-label {
  display: block;
  margin-bottom: 20px;
}

.form-input, .form-textarea {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
}

.form-textarea {
  height: 100px;
  resize: vertical;
}

.submit-btn {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>