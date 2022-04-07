import {createSlice} from "@reduxjs/toolkit";

export interface BlogState {
    comments: {[id: string]: number}
}

const initialState: BlogState = {
    comments: {}
}

const blogSlice = createSlice( {
    name: "blog",
    initialState,
    reducers: {}
})

export default blogSlice.reducer;