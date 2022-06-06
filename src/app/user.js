import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    _id: null,
    name: null,
    username: null,
    profile: null,
    email: null,
    biography: null,
    category: null,
    posts: [],
    followers: [],
    followings: [],
    activated:false,
    user_type:null,
    is_verified:false
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser(state, action) {
      const { _id , name , username , profile , email , biography , category , posts , followers , followings , activated , user_type , is_verified} = action.payload;

      state.user._id = _id;
      state.user.name = name;
      state.user.username = username;
      state.user.profile = profile;
      state.user.email = email;
      state.user.biography = biography;
      state.user.category = category;
      state.user.posts = posts;
      state.user.followers = followers;
      state.user.followings = followings;
      state.user.activated = activated;
      state.user.user_type = user_type;
      state.user.is_verified = is_verified;
    },

    Deactivate(state){
      state.user.activated = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser , Deactivate , setPostTemp} = userSlice.actions

export default userSlice.reducer