import mongoose , { Schema} from "mongoose";
 import jwt from "jsonwebtoken"
 import bcrypt from "bcrypt"

const userShema = new Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        index : true,
    } , 
    watchhistory :[ 
        {
        type : Schema.Types.ObjectId,
        ref : "Video",
        } 
    ],
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    } ,
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,
        required : true,
    },
    coverImage : {
        type : String,
    },
    password : {
        type : String,
        required : [true, "Password is required"],
    },
    refreshToken : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    updateAt : {
        type : Date,
        default: Date.now,
    }
 }, {
        timestamps : true,
    }
)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(password){
   jwt.sign(
    {
        _id: this._id,
        username : this.username,
        email : this.email,
        fullname : this.fullname,
    },
    ptocess.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRESY,
    }
   )
}

userSchema.methods.generateRefreshToken = function(password){
   jwt.sign(
    {
        _id: this._id,
    },
    ptocess.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRESY,
    }
   )
}

 export const User = mongoose.models("User",userSchema)