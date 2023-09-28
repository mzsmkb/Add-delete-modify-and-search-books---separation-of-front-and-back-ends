<template>
  <div class="container">
    <h1>Add Book</h1>
    <form @submit.prevent="addBook" class="add-form">
     
      
      
      <label class="form-label">添加图片：</label>
      <input type="file" ref="fileInput" @change="uploadFile">

     

      <label class="form-label">
        Title:
        <input v-model="book.book_name" required class="form-input" />
      </label>
      <label class="form-label">
        Author:
        <input v-model="book.author" required class="form-input" />
      </label>
      <label class="form-label">
        Price:
        <input v-model="book.price" required class="form-input" />
      </label>
      <label class="form-label">
        Details:
        <textarea v-model="book.intro" required class="form-input form-textarea"></textarea>
      </label>
      <button type="submit" class="submit-btn">Add</button>
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
        num: 100,
        image:''
      },
      imageUrl:''
    };
  },
  methods: {
    addBook() {
      axios.post('http://localhost:3000/books', this.book)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'home' });
        })
        .catch(error => {
          console.error('Error adding book: ', error.response ? error.response.data : error);
          alert('Error adding book');
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
  mounted() {
    // 在组件加载时调用后端API获取图片数据
    const imageId = 8; // 替换为你所需的图像ID
    axios.get(`/api/image/${imageId}`, { responseType: 'arraybuffer' })
      .then(response => {
        const imageData = Buffer.from(response.data, 'binary');
        const imageUrl = URL.createObjectURL(new Blob([imageData]));
        console.log(imageUrl);
        this.imageUrl = imageUrl;
      })
      .catch(error => {
        console.error('Error retrieving image: ', error);
      });
  }
};

</script>

<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
}

.add-form {
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
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>