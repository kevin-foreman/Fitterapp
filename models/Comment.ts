import { Schema } from 'mongoose'

interface comment {
    commentBody: String,
    userId: String,
    username: String,
    createdAt?: String,
}

const commentSchema = new Schema<comment>(
    {
        userId: {
            type: String,
            required: true
        },
        commentBody: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date: Date) => date.toString().match(/[A-Za-z]{3}\s\d{2}\s\d{4}/)?.[0]
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

export default commentSchema