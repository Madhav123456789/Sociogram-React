import axios from "axios";
let api;
export default api = axios.create({
    baseURL: "http://localhost:5001",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// function will be use to request otp
export const needOtp = async(data)=>api.post("/user" , data);
// function will be use to verify otp
export const needVerify = async(data)=>api.post("/user/verify" , data);
// function will be used to activate user
export const needActivation = async(data)=>api.post("/user/activate" , data);
// function will be used to request login otp
export const needLoginOtp = async(data)=>api.post("/user/login" , data);
// function will be used to verify login otp
export const needLoginOtpVerification = async(data)=>api.post("/user/login/verify" , data);
// function will be used to logout user
export const needLogOut = async()=>api.get("/user/logout");
// function will be used to generate forgot password otp request
export const needForgotOtp = async(data)=>api.post("/user/forget/password/otp" , data);
// function will be used to verify forgot password otp
export const needForgotOtpVerification = async(data)=>api.post("/user/forget/password/otp/verify" , data);
// this function will be used to update user's profile pic
export const needUpdateMyProfilePic = async(data)=>api.patch("/user/uploadprofile" , data);

// this function will be used to get one user
export const needGetOneUser = async(_id , data)=> api.get("/user/get/profile/"+_id , data);

