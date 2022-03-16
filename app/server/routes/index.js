var express = require('express');
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const { updateDBFile } = require('../utils');
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
  const type = req.body.type
  if (!taskID) {
    res.send({
      data: [],
      code: 0,  // 0代表错误，1代表成功
      msg: '任务ID错误',
    })
    return
  }

  const dbFile = String(type) === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  updateDBFile(dbFile, {
    onReadError: (err) => {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
    },
    onWriteError: (err) => {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
    },
    onReadOver: (data) => {
      const removeTargetID = data.find(item => (
        item.taskID === taskID
      ))

      if (!data.length || !removeTargetID) {
        res.send({
          data: [],
          code: 0,  // 0代表错误，1代表成功
          msg: '任务ID无效',
        })
        return false
      }
      return data.filter(item => item.taskID !== taskID)
    },
    onWriteOver: () => {
      res.send({
        code: 1,  // 0代表错误，1代表成功
        msg: '',
      })
    },
  })
});

// 改
router.post('/update', function (req, res, next) {
  const dbPath = path.join(__dirname, '..', 'db')
  const task = req.body
  const type = req.body.type
  delete task.type
  const taskID = task?.taskID

  if (!taskID) {
    res.send({
      data: [],
      code: 0,  // 0代表错误，1代表成功
      msg: '任务ID错误',
    })
    return
  }

  const dbFile = String(type) === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
  updateDBFile(dbFile, {
    onReadError: (err) => {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
    },
    onWriteError: (err) => {
      res.send({
        data: [],
        code: 0,  // 0代表错误，1代表成功
        msg: err,
      })
    },
    onReadOver: (data) => {
      const targetTask = data.find(item => (
        item.taskID === taskID
      ))
      if (targetTask.status === task.status) {
        Object.assign(targetTask, task)
        return data
      } else {
        // 还在Done列表中的task
        const otherData = data.filter(item => item.taskID !== taskID)
        // 改变状态成为Doing的task
        const changeData = targetTask
        Object.assign(targetTask, task)
        const changeDBFile = String(task.status) === '0' ? `${dbPath}\\DOING.json` : `${dbPath}\\DONE.json`
        updateDBFile(changeDBFile, {
          onReadError: (err) => {
            res.send({
              data: [],
              code: 0,  // 0代表错误，1代表成功
              msg: err,
            })
          },
          onWriteError: (err) => {
            res.send({
              data: [],
              code: 0,  // 0代表错误，1代表成功
              msg: err,
            })
          },
          onReadOver: (data) => {
            data.push(changeData)
            return data
          },
          onWriteOver: () => {

          },
        })
        return otherData
      }
    },
    onWriteOver: () => {
      res.send({
        code: 1,  // 0代表错误，1代表成功
        msg: '',
      })
    },
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

// 菜单栏数量显示
router.get('/count', function (req, res, next) {
  const dbPath = path.join(__dirname, '..', 'db');
  const dbFileList = [`${dbPath}\\DOING.json`, `${dbPath}\\DONE.json`];
  const result = {};

  fs.readFile(dbFileList[0], 'utf8', (err, data) => {
    if (err) {
      res.send({
        data: [],
        code: 0,
        msg: err,
      });
      return;
    }
    result['doing'] = JSON.parse(data).length;

    fs.readFile(dbFileList[1], 'utf8', (err, data) => {
      if (err) {
        res.send({
          data: [],
          code: 0,
          msg: err,
        });
        return;
      }
      result['done'] = JSON.parse(data).length;
      res.send({
        data: result,
        code: 1,
        msg: '',
      });
    });
  });
});

module.exports = router;
