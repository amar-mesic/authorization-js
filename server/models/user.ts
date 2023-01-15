import { model, Schema, Types } from 'mongoose'
const UserSchema = new Schema(
    {
        id: Types.ObjectId,
        firstName: { type: String, required: true, min: 2, max: 50 },
        lastName: { type: String, required: true, min: 2, max: 50 },
        email: { type: String, required: true, max: 50, unique: true },
        friends: [
            {
                id: String,
                firstName: String,
                lastName: String,
                picturePath: String,
                occupation: String,
                location: String,
            },
        ],
        password: { type: String, required: false, min: 8 },
        picturePath: { type: String, default: '' },
        occupation: String,
        location: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
)

const User = model('User', UserSchema)
export default User
