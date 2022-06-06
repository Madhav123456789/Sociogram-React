import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:{
      name:null,
      username:null,
      password:null,
      email:null,
      hash:null,
      type:null
  },
  isAuth:false,
  pageTitle:""
}

export const operaterSlice = createSlice({
  name: 'operater',
  initialState,
  reducers: {
    setUserName(state , action){
      state.user.username = action.payload;
    },
    setUserWithOperater(state , action){
      const {email , hash , type , username , name , password} = action.payload;
      state.user.email = email;
      state.user.hash = hash;
      state.user.name = name;
      state.user.password = password;
      state.user.type = type;
      state.user.username = username
    },
    authDone(state){
      state.isAuth = true;
    },

    rejectAuth(state){
      state.isAuth = false;
    },
    setPageTitle(state , action){
      state.pageTitle = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserWithOperater , authDone , rejectAuth , setUserName , firePageCoverEventNegative , setPageTitle} = operaterSlice.actions

export default operaterSlice.reducer