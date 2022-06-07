import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title:"",
  stateCreatePosts:{
    state:false,
  },
  stateProfilePostsOnClick:{
    state:false,
    data:{
      
    }
  },

}

export const pagecoverSlice = createSlice({
  name: 'pagecover',
  initialState,
  reducers: {
    // get title
    setPageCoverTitle(state , action){
      state.title = action.payload;
    },
    // post create
    setPageCoverCreatePost(state , action){
      state.stateCreatePosts.state = action.payload;
    },
    // profile post on click
    setProfilePostOnClick(state , action){
      state.stateProfilePostsOnClick.state = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {setPageCoverCreatePost , setPageCoverTitle , setProfilePostOnClick} = pagecoverSlice.actions

export default pagecoverSlice.reducer