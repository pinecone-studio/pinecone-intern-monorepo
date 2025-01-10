import  { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {type: String
        ,required:true
    },
    fullName: {type: String,
        required:true
    },
    email:{type:String,unique:true,required:true},
    bio: {type: String,default:""},
    password: {type: String,required:true},
    isPrivate: {type: Boolean,default:false},
    hasStory: {type: Boolean,default:false},
    profileImage: {type: String,default:"https://instagram.fmvs1-1.fna.fbcdn.net/v/t51.2885-19/464760996_1254146839119862_3605321457742435801_n.png?stp=dst-jpg_e0_s150x150_tt6&cb=8577c754-c2464923&_nc_ht=instagram.fmvs1-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2AFI2vvpQC5jXe9YV7HnIJ2Q1Rv8xBFlMqdzjm8AFydvo8KmYJjEuYfKnLq6Ll3hKnqw8r8lE_A-5iIIsXFaAF1b&_nc_ohc=C-7uiJ0H3h8Q7kNvgHQLpN_&_nc_gid=da401a2ac7894af0b2da5c697ab25dfe&edm=ALlQn9MBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.3-ccb7-5-cb8577c754-c2464923&oh=00_AYDcEMNaYIOczf3ec_CBmh6YbR28BRyMcQl0JGk48FelZQ&oe=67859C28&_nc_sid=e7f676"},
    gender: {type: String, enum:["female", "male", "not_know"], default:"not_know"}
})

export const UserModel = models["User"] || model("User", userSchema)