const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxLength: 100
    },
    email: {
        type: String,
        minLength: 5
    },
    password:{
        type: String,
        maxlength: 100
    },
    lastname: {
        type:String,
        maxLength: 50    
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})

userSchema.pre('save', function( next ){
    
    var user = this;  
    // 비밀번호를 암호화 시킨다.
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
        
            if(err) return next(err)
            //user.password 는   raw 한 비밀번호
            bcrypt.hash(user.password, salt, function(err, hash){
            if(err)  return next(err)

            user.password = hash;
            next()
            })
        

        })
    } 
    else{
        next();
    }

 
})

    userSchema.methods.comparePassword = function(plainPassword, cb){
        //plainpassword 1234567  암호화된 비밀번호 #fskj@fsdjkflslk%fsjklfd 랑비교
        // 암호화해서 비교는 가능, 복호화는 안된다
        bcrypt.compare(plainPassword, this.password, function(err, isMatch){
            if(err) return cb(err);
            cb(null, isMatch)
        })
    }

    userSchema.methods.generateToken = function(cb){
        var user = this;
        //jsonwebtoken을 이용해서 token생성하기
      var token =  jwt.sign(user._id.toHexString(), 'secretToken')

   
    /*   user._id + 'sectretToken' = token
    ->
    'secretToken' -> user._id  */
        user.token = token;
        user.save(function(err, user) {
            if(err) return cb(err)
            cb(null, user)
        })
    }

    userSchema.statics.findByToken = function(token, cb){
        var user = this;
        //토큰을 decode 한다.
        jwt.verify(token, 'secretToken', function(err,decoded){
            //유저아이디를 이용해서 유저를 찾은 다음에 
            //클라이언트에서 가져온 token과 db에 보관된 token의 일치여부 확인

            user.findOne({ "_id": decoded, "token": token}, function(err,user) 
            {
                if(err) return cb(err);
                cb(null,user)
            })
        })

        
    }
const User = mongoose.model('User', userSchema)

module.exports = { User}