import { Schema } from 'mongoose'

const postSchema = new Schema({
    id: String,
    user: { id: String, firstName: String, lastName: String },
    location: String,
    description: String,
    userPicturePath: String,
    picturePath: String,
    likes: [{ userId: String }],
    comments: [
        {
            user: { id: String, firstName: String, lastName: String },
            content: String,
        },
    ],
})
