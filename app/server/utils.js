const fs = require('fs');

const updateDBFile = (filePath, handlers) => {
  const { onReadError, onReadOver, onWriteError, onWriteOver } = handlers
  fs.readFile(filePath, 'utf8', (err, dataStr) => {
    if (err) {
      onReadError?.(err)
      return
    }
    const data = dataStr ? JSON.parse(dataStr) : []
    const readOverResult = onReadOver?.(data)
    if (readOverResult !== false) {
      const ReadData = readOverResult || []
      const newDataStr = JSON.stringify(ReadData)
      fs.writeFile(filePath, newDataStr, err => {
        if (err) {
          onWriteError?.(err)
          return
        }
        onWriteOver?.()
      })
    }
  })
}

module.exports = { updateDBFile }