const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const app = express();

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

app.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(new AppError(err, 400));
    } else {
      if (req.file == undefined) {
        return next(new AppError('No file selected!', 400));
      } else {
        res.status(200).json({
          message: 'File uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

app.get('/data', async (req, res, next) => {
  try {
    const response = await axios.get('https://api.example.com/data');
    res.json(response.data);
  } catch (error) {
    next(new AppError('Failed to fetch data from API', 500));
  }
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
