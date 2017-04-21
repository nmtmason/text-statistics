'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _statistics = require('./statistics');

var _statistics2 = _interopRequireDefault(_statistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use((0, _morgan2.default)('combined'));
app.use(_express2.default.static('public'));

const upload = (0, _multer2.default)();
const fileParsers = {
  '.txt': function (str) {
    return str;
  }
};

app.post('/statistics', upload.single('file'), function (request, response) {
  const extension = _path2.default.extname(request.file.originalname);
  const parser = fileParsers[extension];
  if (!parser) {
    response.status(415).json({ error: `Unsupported file type.` });
    return;
  }
  const parsed = parser(request.file.buffer.toString('utf8'));
  response.json((0, _statistics2.default)(parsed));
});

const port = process.env['PORT'] || 8080;
app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});