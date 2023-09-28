const express = require('express');
//处理用户post请求提交的数据，将数据保存在req.body中。
//以一个对象的形式提供给服务器，方便进行后续的处理
const bodyParser = require('body-parser');
const mysql = require('mysql2');
// const path = require('path');
const fs = require('fs');
//用于实现ajax跨源资源共享
const cors = require('cors');
const multer = require('multer');
const app = express();
//已成功上传图片文件到本地
const upload = multer({ dest: 'uploads/' }); // 设置图片上传的临时目录

app.use(cors());
//解析并返回json格式的数据
app.use(bodyParser.json());


//创建连接对象
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc13713510201',
  database: 'meituan',
  port:'3306',
});

//连接mysql服务器
connection.connect(err => {
  if (err) {
    console.error('Database connection error: ', err.stack);
    return;
  }

  console.log('Connected to database');
});

app.get('/books', (req, res) => {
  connection.query('SELECT * FROM book', (err, rows) => {
    if (err) {
      console.error('Database query error: ', err.stack);
      res.status(500).send('Database query error');
      return;
    }

    res.send(rows);
  });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  connection.query('SELECT * FROM book WHERE book_id = ?', [bookId], (err, rows) => {
    if (err) {
      console.error('Database query error: ', err.stack);
      res.status(500).send('Database query error');
      return;
    }

    res.send(rows[0]);
  });
});


// 定义一个 GET 请求处理程序，用于搜索关键词
app.get('/api/search', (req, res) => {
  const keyword = req.query.keyword;

  // 构建 SQL 查询语句
  const query = `SELECT * FROM book WHERE book_name LIKE '%${keyword}%'`;

  // 执行查询
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database query error: ' + err.stack);
      return res.status(500).json({ error: 'Database query error.' });
    }

    // 返回查询结果
    // res.json(results);
    res.send(results);
  });
});


//表单提交请求
app.post('/books', (req, res) => {
  //获取用户输入的内容
  const newBook = req.body;


  // First, query the database to find the current max book_id
  connection.query('SELECT MAX(book_id) as maxId FROM book', (err, result) => {
    if (err) {
      console.error('Database query error: ', err.stack);
      res.status(500).send('Database query error');
      return;
    }

    const maxId = result[0].maxId;

    // Set the book_id of the new book to be maxId + 1
    newBook.book_id = maxId + 1;


    // Then, insert the new book into the database
    connection.query('INSERT INTO book SET ?', newBook, (err, result) => {
      if (err) {
        console.error('Database query error: ', err.stack);
        res.status(500).send('Database query error');
        return;
      }

      console.log('Book added:', newBook.book_id);
      res.status(201).send({ id: newBook.book_id });
    });
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  connection.query('UPDATE book SET ? WHERE book_id = ?', [updatedBook, bookId], (err, result) => {
    if (err) {
      console.error('Database query error: ', err.stack);
      res.status(500).send('Database query error');
      return;
    }

    console.log('Book updated:', bookId);
    res.send({ message: 'Book updated' });
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  connection.query('DELETE FROM book WHERE book_id = ?', [bookId], (err) => {
    if (err) {
      console.error('Database query error: ', err.stack);
      res.status(500).send('Database query error');
      return;
    }

  console.log('Book deleted:', bookId);
  res.send({ message: 'Book deleted' });
  });
});

// 处理图片上传的接口
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   const image = req.file;  // 获取上传的图片文件
//   // 将图片存储到MySQL数据库中
//   connection.query('INSERT INTO image SET ?', { image: image.buffer }, (error, results) => {
//     if (error) {
//       console.error('Error saving image to database:', error);
//       res.status(500).json({ error: 'Failed to save image' });
//     } else {
//       const imageId = results.insertId; // 获取插入的图片ID
//       res.json({ success: true, imageId });
//     }
//   });

//   console.log("lllllllllllllllllllllllllllllll");
// });



// 创建路由来获取图片数据
// app.get('/api/image/:imageId', (req, res) => {
//   const imageId = req.params.imageId;

//   // 查询数据库获取图片数据
//   const query = 'SELECT image FROM book WHERE book_id = ?';
//   connection.query(query, [imageId], (error, results) => {
//     if (error) {
//       console.error('Error querying the database: ', error);
//       res.status(500).send('Error querying the database');
//     } else {
//       if (results.length > 0) {

//         //方法一
//         // const imageData = results[0].image;
//         // console.log(imageData);
//         // res.end(imageData); // 将图片数据作为响应返回给前端

//         //方法二，但是没成功，试试方法一
//         const imageData = results[0].image;

//         // 发送图片给前端
//         res.writeHead(200, {
//           'Content-Type': 'image/jpeg',
//           'Content-Length': imageData.length
//         });
//         console.log("正在发往前端",imageId);
//         console.log(results.length);
//         console.log(imageData.length);
//         res.end(imageData);
//       } else {
//         res.status(404).send('Image not found');
//       }
//     }
//   });
// });


//已成功上传图片文件到本地
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  
  // 从临时目录移动文件到指定文件夹下
  const destinationFolder = 'src/assets/';
  const destinationPath = destinationFolder + file.originalname;
  fs.rename(file.path, destinationPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('File upload failed');
    } else {
      res.send('File uploaded successfully');
    }
  });
});




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
