<template>
  <div class="container">
    <h1>Book Detail</h1>
    <div class="book-detail">
      <p><strong>Title:</strong> {{ book.book_name }}</p>
      <p><strong>Author:</strong> {{ book.author }}</p>
      <p><strong>Intro:</strong> {{ book.intro }}</p>
      <p><strong>Price:</strong> {{ book.price }}</p>
      <p><strong>Num:</strong> {{ book.num }}</p>
    </div>
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
.container {
  width: 800px;
  margin: 0 auto;
}

.book-detail {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.book-detail p {
  margin-bottom: 10px;
}
</style>