var express = require('express');
const fs = require('fs');
var cors = require('cors');
const path = require('path');
var app = express();
require('dotenv').config();
const api = process.env.URL_API;

app.use(cors());
app.use(express.json());
//Post
app.get(`${api}/get-all-post`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/post.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(data);
  })
})

app.delete(`${api}/delete-post/:id`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/post.json', 'utf8', (err, data) => {
    const id = req.params.id;
    const listPost = JSON.parse(data);
    let ind = listPost.findIndex(item => {
      return item.id === id;
    });
    listPost.splice(ind, 1);
    fs.writeFile(__dirname + '/data-mock/post.json', JSON.stringify(listPost), function (err, result) {
      if (err) res.send({ status: 200, msg: err });
      res.send({ status: 200, body: { id: id } });
    });

  })
})

app.put(`${api}/update-post`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/post.json', 'utf8', (err, data) => {
    const id = req.body.id;
    const category = req.body.category;
    const contentDetail = req.body.contentDetail;
    const title = req.body.title;
    const view = req.body.view;
    const rating = req.body.rating;
    const urlThumnail = req.body.urlThumnail;
    const date = req.body.date;
    const listImage = req.body.listImage;
    const urlVideo = req.body.urlVideo;

    const listPost = JSON.parse(data);
    let ind = listPost.findIndex(item => {
      return item.id === id;
    });
    if (ind > -1) {
      listPost[ind] = {
        id: id, category: category, contentDetail: contentDetail,
        rating: rating, view: view, title: title, urlThumnail: urlThumnail,
        date: date, listImage: listImage, urlVideo: urlVideo
      };
      fs.writeFile(__dirname + '/data-mock/post.json', JSON.stringify(listPost), function (err, result) {
        if (err) res.send({ status: 400, msg: err });
        res.send({
          status: 200, body: {
            id: id, category: category, contentDetail: contentDetail,
            rating: rating, view: view, title: title, urlThumnail: urlThumnail,
            date: date, listImage: listImage, urlVideo: urlVideo
          }
        });
      });
    } else {
      res.send({
        status: 400, body: "Not Found"
      });
    }

  })
})

app.post(`${api}/add-post`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/post.json', 'utf8', (err, data) => {
    const id = req.body.id;
    const category = req.body.category;
    const contentDetail = req.body.contentDetail;
    const title = req.body.title;
    const view = req.body.view;
    const rating = req.body.rating;
    const urlThumnail = req.body.urlThumnail;
    const date = req.body.date;
    const listImage = req.body.listImage;
    const urlVideo = req.body.urlVideo;
    const listPost = JSON.parse(data);

    listPost.push({
      id: id, category: category, contentDetail: contentDetail,
      rating: rating, view: view, title: title, urlThumnail: urlThumnail,
      date: date, listImage: listImage, urlVideo: urlVideo
    });
    fs.writeFile(__dirname + '/data-mock/post.json', JSON.stringify(listPost), function (err, result) {
      if (err) res.send({ status: 400, body: err });
      res.send({
        status: 200, body: {
          id: id, category: category, contentDetail: contentDetail,
          rating: rating, view: view, title: title, urlThumnail: urlThumnail,
          date: date, listImage: listImage, urlVideo: urlVideo
        }
      });
    });

  })
})

//Comment
app.get(`${api}/get-comment-by-anwser/:idAnwser`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/comment.json', 'utf8', (err, data) => {
    if (err) {
      res.send({ status: 400, body: err });
    }
    const idAnwser = req.params.idAnwser;
    const listComment = data ? JSON.parse(data) : [];
    listCommentByIdAnwser = [];
    if (listComment && listComment.length > 0) {
      listComment.some(comment => {
        if (comment.idAnwser === idAnwser) {
          listCommentByIdAnwser.push(comment);
        }
      });
    }
    res.send({ status: 200, body: listCommentByIdAnwser });
  })
})

app.delete(`${api}/delete-comment/:idComment`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/comment.json', 'utf8', (err, data) => {
    const idComment = req.params.idComment;
    const listComment = data ? JSON.parse(data) : [];
    let ind = listComment.findIndex(item => {
      return item.id === idComment;
    });
    listComment.splice(ind, 1);
    fs.writeFile(__dirname + '/data-mock/comment.json', JSON.stringify(listComment), function (err, result) {
      if (err) res.send({ status: 200, msg: err });
      res.send({ status: 200, body: { id: idComment } });
    });

  })
})

app.put(`${api}/update-comment`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/comment.json', 'utf8', (err, data) => {
    const id = req.body.id;
    const content = req.body.content;

    const listComment = JSON.parse(data);
    let ind = listComment.findIndex(item => {
      return item.id === id;
    });
    if (ind > -1) {
      listComment[ind].content = content;
      fs.writeFile(__dirname + '/data-mock/comment.json', JSON.stringify(listComment), function (err, result) {
        if (err) res.send({ status: 400, msg: err });
        res.send({
          status: 200, body: listComment[ind]
        });
      });
    } else {
      res.send({
        status: 400, body: "Not Found"
      });
    }

  })
})

app.post(`${api}/add-comment`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/comment.json', 'utf8', (err, data) => {
    const id = req.body.id;
    const idAnwser = req.body.idAnwser;
    const idCommentator = req.body.idCommentator;
    const idPost = req.body.idPost;
    const content = req.body.content;
    const date = req.body.date;
    const listComment = data ? JSON.parse(data) : [];

    listComment.push({
      id: id, idAnwser: idAnwser, idCommentator: idCommentator, idPost: idPost,
      content: content, date: date
    });
    fs.writeFile(__dirname + '/data-mock/comment.json', JSON.stringify(listComment), function (err, result) {
      if (err) res.send({ status: 400, body: err });
      res.send({
        status: 200, body: {
          id: id, idAnwser: idAnwser, idCommentator: idCommentator, idPost: idPost,
          content: content, date: date
        }
      });
    });

  })
})

//Menu
app.get(`${api}/get-all-menu`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/menu.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(data);
  })
})

app.get(`${api}/get-all-menu/:type`, function (req, res) {
  fs.readFile(__dirname + '/data-mock/menu.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(JSON.parse(data).find(el => { return el.type === req.params.type }));
  })
})

app.delete(`${api}/delete-all-menu`, function (req, res) {
  res.end({});
})

app.post(`${api}/add-all-menu`, function (req, res) {
  res.end({});
})

app.post(`${api}/add-all-menu/:start/:end`, function (req, res) {
  res.end(req.params.start);
})

app.put(`${api}/update-all-menu/:id`, function (req, res) {

})
//End menu

//Account
app.get(`${api}/get-all-account`, function (req, res) {
  res.end({});
})

app.get(`${api}/get-all-account/:id`, function (req, res) {
  res.end({ id: req.params.id });
})

app.delete(`${api}/delete-all-account`, function (req, res) {
  res.end({});
})

app.post(`${api}/register-user`, function (req, res) {
  res.end({});
})

app.post(`${api}/login-user`, function (req, res) {
  res.end(req.params.start);
})

app.put(`${api}/update-all-account/:id`, function (req, res) {
  res.sendFile('app.component.html', { root: "../app/" });
})
//End account

var formidable = require('formidable');
const maxSize = 2 * 1024 * 1024;

app.post(`${api}/upload-image`, function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.upload.path;
    var newpath = `${__dirname}\\uploads\\` + files.upload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.send("thanh cong");
    });
  });
});

app.get(`${api}/all-image`, function (req, res) {
  res.sendFile(path.join(__dirname, '/uploads/Capture.PNG'));
})

app.get(`${api}/load-image-list`, function (req, res) {
  res.sendFile(path.join(__dirname, '/view/index.html'));
})

var server = app.listen(3000, function () {
  console.log("server start", api)
})