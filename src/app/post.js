import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  imagePost: {
    title: "",
    description: "",
    src: "",
    category:""
  },
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setImage(state, action) {
      state.imagePost.src = action.payload;
    },
    setImagePost(state, action) {
      const { title, description, src , category} = action.payload;
      state.imagePost.title = title;
      state.imagePost.description = description;
      state.imagePost.src = src;
      state.imagePost.category = category;
    },
    setError(state){
      state.Error = true;
    },

    setSuccess(state){
      state.Success = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setImage ,setImagePost , setError,setSuccess} = postSlice.actions

export default postSlice.reducer