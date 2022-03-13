var express = require('express');
const fs = require('fs')
const path = require('path')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 增
// 将新创建的任务写在db中
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

// 删
router.post('/remove', function (req, res, next) {
  const dbPath = path.join(__dirname, '..', 'db')
  const taskID = req.body?.taskID
  if (!taskID) {
    res.send({
      data: [],
      code: 0,  // 0代表错误，1代表成功
      msg: '任务ID错误',
    })
    return
  }

  const dbFile = `${dbPath}\\DOING.json`
  fs.readFile(dbFile, 'utf8', (err, dataStr) => {
    if (err) {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
      return
    }
    const data = dataStr ? JSON.parse(dataStr) : []
    const removeTargetID = data.find(item => (
      item.taskID === taskID
    ))

    if (!data.length || !removeTargetID) {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: '任务ID无效',
      })
      return
    }

    const newData = data.filter(item => item.taskID !== taskID)
    const newDataStr = JSON.stringify(newData)
    fs.writeFile(dbFile, newDataStr, err => {
      if (err) {
        res.send({
          data: [],
          code: 0,  // 0代表错误，1代表成功
          msg: err,
        })
        return
      }
      // 文件删除成功
      res.send({
        code: 1,  // 0代表错误，1代表成功
        msg: '',
      })
    })
  })
});

// 改
router.post('/update', function (req, res, next) {
  const dbPath = path.join(__dirname, '..', 'db')
  const task = req.body
  const taskID = task?.taskID
  if (!taskID) {
    res.send({
      data: [],
      code: 0,  // 0代表错误，1代表成功
      msg: '任务ID错误',
    })
    return
  }

  const doneFile = `${dbPath}\\DONE.json`
  const doingFile = `${dbPath}\\DOING.json`
  fs.readFile(doingFile, 'utf8', (err, dataStr) => {
    if (err) {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
      return
    }
    const data = dataStr ? JSON.parse(dataStr) : []
    const targetTask = data.find(item => (
      item.taskID === taskID
    ))

    if (!data.length || !targetTask) {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: '任务ID无效',
      })
      return
    }

    let doingData = []
    if (task.status === 1) {
      doingData = data.filter(item => item.taskID !== taskID)
      const newDoneData = data.find(item => item.taskID === taskID)
      fs.readFile(doneFile, 'utf8', (err, oldDoneStr) => {
        if (err) {
          res.send({
            data: [],
            code: 0,  // 0代表错误，1代表成功
            msg: err,
          })
          return
        }
        const oldDoneData = oldDoneStr ? JSON.parse(oldDoneStr) : []
        oldDoneData.push(newDoneData)
        const newDoneDataStr = JSON.stringify(oldDoneData)
        fs.writeFile(doneFile, newDoneDataStr, err => {
          if (err) {
            res.send({
              data: [],
              code: 0,  // 0代表错误，1代表成功
              msg: err,
            })
            return
          }
        })
      })
    } else {
      doingData = data
      Object.assign(targetTask, task)
    }

    const doingDataStr = JSON.stringify(doingData)
    fs.writeFile(doingFile, doingDataStr, err => {
      if (err) {
        res.send({
          data: [],
          code: 0,  // 0代表错误，1代表成功
          msg: err,
        })
        return
      }
      // 文件删除成功
      res.send({
        code: 1,  // 0代表错误，1代表成功
        msg: '',
      })
      return
    })
  })
});

// 查
router.get('/list', function (req, res, next) {
  const tabType = req.query.type
  const dbPath = path.join(__dirname, '..', 'db')
  const dbFile = tabType === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`

  fs.readFile(dbFile, 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
      return
    }
    res.send({
      data: JSON.parse(data),
      code: 1,  // 0代表错误，1代表成功
      msg: '',
    })
    return
  })
});

module.exports = router;
