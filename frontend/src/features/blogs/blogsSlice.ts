import {createSlice} from "@reduxjs/toolkit";
import {BlogPost} from "../../components/BlogPost";

export interface BlogsState {
    blogs: {[id: string]: BlogPost}
}

const initialState: BlogsState = {
    blogs: {}
}

const blogsSlice = createSlice( {
    name: "blogs",
    initialState,
    reducers: {}
})

export default blogsSlice.reducer;