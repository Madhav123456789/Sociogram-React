import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  home: true,
  setting: false,
  chats: false,
  profile: false,
  explore: false
}

export const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    setHome(state) {
      state.home = true;
      state.chats = false;
      state.setting = false;
      state.profile = false;
      state.explore= false;
    },

    setSetting(state) {
      state.home = false;
      state.chats = false;
      state.setting = true;
      state.profile = false;
      state.explore= false;
    },

    setChats(state) {
      state.home = false;
      state.chats = true;
      state.setting = false;
      state.profile = false;
      state.explore= false;
    },

    setProfile(state){
      state.home = false;
      state.chats = false;
      state.setting = false;
      state.profile = true;
      state.explore= false
    },

    setExplore(state){
      state.home = false;
      state.chats = false;
      state.setting = false;
      state.profile = false;
      state.explore= true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setHome, setSetting, setChats , setExplore ,setProfile } = stackSlice.actions

export default stackSlice.reducer