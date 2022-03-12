var express = require('express');
const fs = require('fs')
const path = require('path')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', function (req, res, next) {
  const dbPath = path.join(__dirname, '..', 'db')
  const newTask = req.body
  const dbFile = `${dbPath}\\DOING.json`

  fs.readFile(dbFile, 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
      return
    }
    let newData = null
    if (data) {
      newData = JSON.stringify([...JSON.parse(data), newTask])
    } else {
      newData = JSON.stringify(newTask)
    }
    fs.writeFile(dbFile, newData, err => {
      if (err) {
        res.send({
          data: [],
          code: 0,  // 0代表错误，1代表成功
          msg: err,
        })
        return
      }
      // 文件写入成功
      res.send({
        data: newTask,
        code: 1,  // 0代表错误，1代表成功
        msg: '',
      })
    })
  })
});

module.exports = router;
