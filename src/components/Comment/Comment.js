import style from "./style.module.css"
import ProgressiveImg from "../../components/ProgressiveImg/ProgressiveImg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import LinkText from "../LinkText/LinkText";
import ActiveTexts from "../ActiveTexts/ActiveTexts";
import { MdDelete } from "react-icons/md";
import { needDeleteComment } from "../../apis/posts";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Comment({comment , username , src , postId , setDetails , index , needSetComment}) {
  // this state will manage like counts
  const [likeCounts , setLikeCounts] = useState(comment.likes.length);
  // this function will be used to delete comment
  const deleteComment=async()=>{
    try {
      const {data} = await needDeleteComment(postId , {comment_id:comment._id});
      const {msg , flag , comments} = data;
      if(flag){
        toast.success(msg);
        needSetComment(comments);
      }
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.msg);
      }
    }
  }
  return (
    <div className={style.Container}>
      <div className={style.Left}>
        <ProgressiveImg src={src} style={{ borderRadius: "50%" }} height={"30px"} width={"30px"} />
      </div>
      <div className={style.Mid}>
        <div className={style.Mid_Top}>
          <div className={style.Mid_Top_Left}>
            <LinkText className={style.fontSize} text={username} />
          </div>
          <div className={style.Mid_Top_Right}>
            <p className={style.fontSizeL + " " + style.commentText}>{comment.comment}</p>
          </div>
        </div>
        <div className={style.Mid_Bottom}>
          <div className={style.Mid_Bottom_Top}>
            <div className={style.fontForMidBottom}>10h</div>
            <div className={style.fontForMidBottom}>{likeCounts < 1 ? likeCounts + " like" : likeCounts + " likes"}</div>
            <div className={style.fontForMidBottom}>
              <ActiveTexts text={"Reply"} style={{ fontSize: "13px" }} />
            </div>
          </div>

          <div className={style.Mid_Bottom_Bottom}>
            <div style={{ fontSize: "11px" }}>{"--------------"}</div>
            <div style={{ marginLeft: "20px", fontSize: "11px", cursor: "pointer" }}>{"Replies(1)"}</div>
          </div>
        </div>
      </div>

      <div className={style.Right}>
        <div>
          {!comment.liked ?
            <AiOutlineHeart style={{ cursor: "pointer" }} size={"20"} />
            :
            <AiFillHeart style={{ cursor: "pointer" }} size={"20"} />
          }
        </div>
        <MdDelete onClick={deleteComment} style={{ cursor: "pointer" }} size={"20"}/>
      </div>
    </div>
  )
}

export default Comment