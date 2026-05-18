import mongoose, { Schema} from "mongoose"
import moongooseaggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema({
    videoFile : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    owner : {
        type:Schema.Types.ObjectId,
        ref : "User",
    } ,
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required :true,
    },
    duration : {
        type : Number,
        required : true,
    },
    views : {
        type : Number,
        default : 0,
    },
    isPublished : {
        type: Boolean,
        required:true,
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

videoSchema.plugin(moongooseaggregatePaginate)

export const Video = mongoose.models("Video", videoSchema)  