const express = require("express");
const mongoose = require("mongoose");
multer = require('multer');
path = require('path');

var fileExtension = require('file-extension')
const categorieRoute = require('./routers/categorieRouter');
const produitRouter=require('./routers/produitRouter');
const contactRouter=require('./routers/contactRouter');
const userRouter=require('./routers/userRouter');
const reservationRouter=require('./routers/reservationRouter');
const checkoutRouter=require('./routers/checkoutRouter');
const cpRouter=require('./routers/commande_produitRouter');
const PATH = './uploads';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    let newName=file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname)
    cb(null,newName)
   req.newName=newName
  }
});
let upload = multer({
  storage: storage
});


const app = express();
const cors=require('cors')
app.use(express.json());

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors())
app.get('/api', function (req, res) {
  res.end('File catcher');
});
app.post('/api/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!');
    return res.send({
      success: true,
      file:req.newName
    })
  }
});
let database = process.env.MONGODB_URI || 'mongodb://localhost/restaurant'
mongoose.connect(database).then(
  ()=>{console.log("mongoose connected")},
  err =>{console.log("err",err);}
);

app.use('/api/categorie',categorieRoute)
app.use('/api/produit',produitRouter)
app.use('/api/contact',contactRouter)
app.use('/api/user',userRouter)
app.use('/api/reservation',reservationRouter)
app.use('/api/checkout',checkoutRouter)
app.use('/api/cp',cpRouter)
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "https://frontend-reservation.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});
io.on('connection', (socket) => {
  console.log('a user connected'+socket.id);
  socket.on('contact', (message) => {
    console.log(message);
    io.emit('contactAdmin', 'hello from back');
  });
});
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server is running...");
});
