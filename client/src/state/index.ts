import { createSlice } from '@reduxjs/toolkit'

export type AppState = {
    mode: string
    user: any
    token: string | null
    posts: any[]
}

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
} as AppState

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state: AppState) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state: AppState, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state: AppState) => {
            state.user = null
            state.token = null
        },
        setFriends: (state: AppState, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else console.error('user non-existent')
        },
        setPosts: (state: AppState, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state: AppState, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.postId)
                    return action.payload.post
                else return post
            })
            state.posts = updatedPosts
        },
    },
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
    authSlice.actions
export default authSlice.reducer
