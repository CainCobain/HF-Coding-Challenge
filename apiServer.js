const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
//Connecting to MLab database 
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:123456@ds245287.mlab.com:45287/hidden_founders',{ useMongoClient: true },function(err){
  if (err) throw err;
  console.log("# Mongodb - connected");
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'# Mongodb - connection error:'));
//--------> SET UP SESSION <-------
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
 
//--------> END SET UP <--------

  //Models
  let Shops = require('./models/shop.js');
  let UserShops = require('./models/user_shop.js');
  let User = require('./models/user');

  //--------> GET Shops nearby and not in liked user shop collection <<<<------
  app.get('/shops',(req,res)=>{
    AllShops(req,res);
  });
  //---->Geting all liked shops<<<<---
  function AllShops(req,res){
    UserShops.find({})
    .then(usershops =>{
        let LikedArray = [];
        usershops.forEach(usershop => {
          LikedArray.push(usershop.shop);
        });
      ShopsException(LikedArray,res);
    })
  }
  //---->Geting all shops execpt the liked ones<<<<---
  function ShopsException(LikedArray,res){
    Shops.find({_id : {$nin : LikedArray}})
    .then(shop =>{
      //nearby shops test with user session
      /*"location": {
        $near: {
            $geometry:
                { type: "Point",
                coordinates: [req.session.user.location[0],
                              req.session.user.location[1]] 
                }
        }
    }*/
      res.json(shop);
    })
  }
//------->CRUD Shops liked <<-----
  //--------> POST SHOPS <<<<------
  app.post('/shops',(req,res)=>{
    var shop = req.body;
    UserShops.create(shop,(err,ushop)=>{
      if(err) throw err;
      AllShops(res);
    })
  });

  //--------> GET Liked Shops <<<<------
  app.get('/likedShop',(req,res)=>{
    UserShops.find({liked:true})
    .populate('shop')
    .then(shops=>{
        res.json(shops);
    })
  });


  //--------> DELETE Liked Shop <<<<------
  app.delete('/likedShop/:_id',(req,res)=>{
    let query = {_id:req.params._id};
    UserShops.remove(query,(deleteErr)=>{
      if(deleteErr) console.error("Error Delete Shop"+deleteErr);
      //Deleted Successfully and reredering liked shops
      UserShops.find({liked:true})
      .populate('shop')
      .then(shops=>{
        res.json(shops);
      })
    })
  
  });
//----->Disliked Shops Read and Remove<<<<------
    //--------> GET Disliked Shops <<<<------
    app.get('/dislikedShop',(req,res)=>{
      UserShops.find({liked:false})
      .populate('shop')
      .then(shops=>{
        res.json(shops);
    })
    });
    //--------> RERENDER Disliked Shop <<<<------
    app.delete('/dislikedShop/:_id',(req,res)=>{
      const userEmail = req.session.user.email;
      let query = {shop:req.params._id};
      UserShops.remove(query,(deleteErr,data)=>{
        if(deleteErr) console.error("Error Delete Shop"+deleteErr);
        res.json(shops);
      })
    });
//------->User Side <<<<------
    //--------> Register USER <<<<------
    app.post('/addUser',(req,res)=>{
      const user = req.body;
      let errors = [];
      const email = user.email;
      const password = user.password;
      const rpassword = user.rpassword;
      const currentPosition = {type:"Point",coordinates:[user.latitude,user.longitude]};
      
      if(email == ''){
        errors.push('email required field!');
      }
      if(password != rpassword){
        errors.push('Passwords do not match!');
      }
      if(password.length < 4 ){
        errors.push('Password must be at least 4 caracters!');
      }
      // Sending back the Form informations the "r" stands for Route 
      if(errors.length > 0){
        res.json({message : errors});
    
      }else{
        //Check if the email already exists
        User.findOne({email:email})
          .then(user => {
            if(user){
              res.json({message : 'Email already regsitered'});
            }else{
              const newUser = new User({
                email : email,
                password : password,
                location:currentPosition
              });
              // Save newUser in database with password hashed, using bcrypt method
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash)=>{
                  if(err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(user => {
                      res.json({message : 'You are now registered and can log in'});
                    })
                    .catch(err => {
                      console.log(err);
                      return;
                    });
                });
              });
            }
          });
      }

    });

    app.post('/login',(req, res)=>{
      const user = req.body;
      const email = user.email;
      const password = user.password;
      // Match the email
      User.findOne({
          email:email
      }).then(userFound => {
          if(!userFound) res.json({message : 'No User Found!'});
          // Match the password crypted
          bcrypt.compare(password ,userFound.password , (err,isMatch)=>{
              if(err) throw err;
              if(!isMatch) {
                res.json({message : 'Password Incorrect'});
              }else{
                  req.session.user = user;
                  req.session.save((err)=>{
                    if(err) throw err;
                    res.json({user:userFound,message:'success'});
                  })
              }
          });
      });
    });
    // Destroying the session 
      app.get('/logout',(req, res)=>{
        req.session.destroy();
        res.json({message : 'SessionDestroyed'});
      });
//------->User Side <<<<------
// END APIs


app.listen(3001,(err)=>{
  if(err) throw err;
  console.log('API Server listen on port 3001');
})
