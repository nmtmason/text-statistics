import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'

import statistics from './statistics'

const app = express()
app.use(morgan('combined'))
app.use(express.static('public'))

const upload = multer()
const fileParsers = {
  '.txt': function (str) {
    return str
  }
}

app.post('/statistics', upload.single('file'), function (request, response) {
  const extension = path.extname(request.file.originalname)
  const parser = fileParsers[extension]
  if (!parser) {
    response.status(415).json({ error: `Unsupported file type.` })
    return
  }
  const parsed = parser(request.file.buffer.toString('utf8'))
  response.json(statistics(parsed))
})

const port = process.env['PORT'] || 8080
app.listen(port, function () {
  console.log(`Server started on port ${port}`)
})
