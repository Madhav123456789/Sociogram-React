import api from "../apis/user";

// this api will be used to create a post
export const needPostCreation = async (data) => api.post("/post/createpost" , data);
// this api will be used to delete a post
export const needPostDeletion = async (_id) => api.delete("/post/deletepost/"+_id);