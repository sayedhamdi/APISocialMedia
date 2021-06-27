const express = require('express');
const cors = require('cors')
require('dotenv').config()

const app = express() ;
const PORT = process.env.PORT || 4000 ;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/uploads"));
app.use("/uploads", express.static(__dirname +"/uploads/"));

const myMulter = require('./middleware/multer')
const mongoose = require('mongoose');
const Post = require('./Models/Post');
const User = require('./Models/User');
var MONGO_URIi = 'mongodb://localhost:27017/social';
var MONGO_ONLINE ='mongodb+srv://hmedhappy:'+process.env.DB_PASS+'@cluster0.acekd.mongodb.net/social?retryWrites=true&w=majority'

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_ONLINE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify:false,
    })
    console.log("DB CONNECTED...");
  } catch (error) {
    console.log(error.message)
  }
}
connectDb() ;

// nzid user
app.post('/newuser',myMulter.uploadImg('users').single('photo'),async(req,res)=>{
  const userContent = {...req.body,photo:req.file_IMG}
    var newUser = new User(userContent);
    newUser.save();
    res.json({newUser})
});

// nzid post
app.post('/',myMulter.uploadImg('posts').single('photo'),async(req,res)=>{
  const postContent = {...req.body,photo:req.file_IMG}
    var newpost = new Post(postContent);
    newpost.save();
    res.json(newpost)
});
// nzid commentaire
app.post('/comment',async(req,res)=>{
  const { commentaire , commenter , postID , UserPhoto } = req.body;
  try {
   const resul = await Post.findByIdAndUpdate(
    postID,
      {
        $push: {
          comments: {commenter,commentaire,UserPhoto},
        },
      },
      {
        new: true,
      }
    )
  } catch (error) {
    console.log({error});
  }
  res.json({success:1,message:"Comment Added Succesfully"})
})

// njibhom
app.get('/',async(req,res)=>{
    const results = await Post.find() ;
    res.json(results)
})

app.listen(PORT,()=>console.log("Server online..."))