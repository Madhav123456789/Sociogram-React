import api from "../apis/user";

// this api will be used to create a post
export const needPostCreation = async (data) => api.post("/post/createpost" , data);
// this api will be used to delete a post
export const needPostDeletion = async (_id) => api.delete("/post/deletepost/"+_id);
// this api will be used to get a post
export const needGetOnePost = async (_id) => api.get("/post/getonepost/"+_id);
// this api will be used to post a comment
export const needPostAComment = async (_id , data) => api.patch("/post/comment/"+_id , data);
// this api will be used to like and dislike the post
export const needLikeAPost = async (_id) => api.patch("/post/likeanddislike/"+_id);
// this api will be used to delete a comment
export const needDeleteComment = async (_id , data) => api.patch("/post/uncomment/"+_id , data);