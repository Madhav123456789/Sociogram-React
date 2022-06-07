import style from "./style.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";
import { needGetOnePost, needLikeAPost, needPostAComment, needPostDeletion } from "../../../../apis/posts";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../app/user";
import { setProfilePostOnClick } from "../../../../app/pagecover";
import { BsChevronRight } from "react-icons/bs";
import ProgressiveImg from "../../../ProgressiveImg/ProgressiveImg";
import Comment from "../../../Comment/Comment";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

function ShowImagePost({ isOwner, post, profile, name, putIndex, postMaxLength, index, username, _id }) {
  // initializing dispatch
  const dispatch = useDispatch();
  // const getting user from user redux
  const { user } = useSelector(s => s.user);
  // this state will be used to hold post
  const [userLikes, setUserLikes] = useState([]);
  // this state will contain posts comment
  const [postComments, setPosComments] = useState([]);
  // this is a boolean state to for like and dislike
  const [isLike, setIsLike] = useState(false);
  // setting posts comments
  useEffect(() => {
    // finding post
    needGetOnePost(post && post._id)
      .then(res => {
        const { post, flag } = res.data;
        // setting post comments
        setPosComments(post.comments);
        setUserLikes(post.likes);
        setIsLike(post.likes.includes(_id));
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.msg);
        }
      });
  }, [post]);
  // setting isLike conditionally
  useEffect(() => {
    if (isLike) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  }, [userLikes]);
  // getting profile post on click state
  const { state } = useSelector(s => s.pagecover.stateProfilePostsOnClick);
  // state will be used to enable and disbale options menu
  const [holderState, setHolderState] = useState("none");
  // state will be used to set placeholder with dynamic strings
  const [inputPlaceHolder, setInputPlaceHolder] = useState("write comment here");
  // this will contian color of send btn color
  const [sendBtnColor, setSendBtnColor] = useState("");
  // state will be used to contain comment input text
  const [inputComment, setInputComment] = useState("");
  // checking and changing sendbtn color
  useEffect(() => {
    if (inputComment.length >= 2 && inputComment.length <= 300) {
      setSendBtnColor("#0095f6");
    } else {
      setSendBtnColor("#0000004a");
    }
  }, [inputComment]);

  //this is on click function and this function will be used to open options menu
  const openOptionsMenu = (e) => {
    e.stopPropagation();
    // toggling
    if (holderState === "none") {
      setHolderState("flex");
    } else {
      setHolderState("none");
    }
  };
  // this is on click function used to close menu
  const closeMenu = () => {
    setHolderState("none");
  };

  // closing menu if page cover closed
  useEffect(() => {
    if (!state) {
      closeMenu();
    }
  }, [state]);

  // this function will be used for menu items on click
  const menuItemOnCLick = async (e) => {
    e.stopPropagation();
    const value = e.target.innerText;

    // for delete option
    if (value === "Delete") {
      // closing menu
      closeMenu();
      // deleting post
      try {
        const { data } = await needPostDeletion(post._id);
        const { flag, msg, user } = data;

        if (flag) {
          toast.success(msg);
          // setting user
          dispatch(setUser(user));
          // closing page cover
          dispatch(setProfilePostOnClick(false));
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        }
      }
    }
    // for cancel option
    else if (value === "Cancel") {
      // closing menu
      closeMenu();
    }
  }

  // this function will be used to navigate posts on right arrow click
  const navigatePosts = () => {
    // updating index
    if (Number(index) < Number(postMaxLength) - 1) {
      putIndex(Number(index) + 1);
    }
  };

  // on change for comment input
  const onInputCommentHandler = useCallback((e) =>
    setInputComment(e.target.value)
  );

  // this is on click function for send comment btn
  const sendComment = async () => {
    if (inputComment.length >= 2 && inputComment.length <= 300) {
      try {
        // requesting api
        const { data } = await needPostAComment(post._id, { comment: inputComment });
        const { comments, flag, msg } = data;
        console.log(comments);
        if (flag) {
          toast.success(msg);
          setPosComments(comments);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        }
      } finally {
        setInputComment("");
      }
    }
  };

  // this is on click function for like post react icon
  const likeThisPost = async () => {
    try {
      const { data } = await needLikeAPost(post._id);
      const { flag, msg } = data;
      if (flag) {
        toast.success(msg);
        if (!userLikes.includes(_id)) {
          setUserLikes(userLikes.concat(_id));
        } else {
          // find index
          const index = userLikes.indexOf(_id);
          setUserLikes(userLikes.splice(index, 1));
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  // press enter key
  useEffect(() => {
    window.onkeyup = (e) => {
      if (e.key === "Enter") {
        document.getElementById("comment_btn").click();
      }
    }
  }, []);


  return (
    <div onClick={closeMenu} className={style.Container}>
      <div className={style.Left}>
        {post && <ProgressiveImg isLoading blurDataUrl={`http://localhost:5001${post.blur_src}`} style={{ borderRadius: "5px", objectFit: "cover" }} src={`http://localhost:5001${post.src}`} height={370} width={370} />}
      </div>
      <div className={style.Right}>
        <div className={style.Right_left}>
          <div className={style.Right_left_Top}>
            <ProgressiveImg height={"40px"} width={"40px"} style={{ borderRadius: "50%" }} src={profile} />
            <div className={style.Name}>{name}</div>
          </div>

          <div className={style.Right_left_Center}>
            <div className={postComments.length>0?style.CommentsContainer:style.CommentsContainerCenter}>
              {postComments.length > 0 ? postComments.map((c, i) => {
                return <Comment needSetComment={setPosComments} key={i} comment={c} postId={post && post._id} />
              }):"No Comments Yet"}
            </div>
            <div style={{ cursor: "pointer" }} className={style.postActions}>
              <div onClick={likeThisPost}>
                {isLike ?
                  <AiOutlineLike color="#0095f6" size={"25"} />
                  :
                  <AiFillLike color="#0095f6" size={"25"} />
                }
              </div>

              <FiSend color="#0095f6" size={"25"} />
              <BsBookmark color="red" size={"25"} />
            </div>
          </div>
          <div className={style.Right_left_Bottom}>
            <input value={inputComment} onChange={onInputCommentHandler} placeholder={inputPlaceHolder} type={"text"} maxLength="300" className={style.textBox} />
            <div id={"comment_btn"} onClick={sendComment}>
              <IoMdSend color={sendBtnColor} size={"30"} />
            </div>
          </div>
        </div>
        <div className={style.Right_Right}>
          <div className={style.Right_Right_Top}>
            <BsThreeDots onClick={openOptionsMenu} size={30} />
            <div style={{ display: holderState }} className={style.options_holder}>
              <div onClick={menuItemOnCLick} className={style.options + " " + style.danger}>Report</div>
              {isOwner && <div onClick={menuItemOnCLick} className={style.options + " " + style.danger}>Delete</div>}
              {// cheking for follow
                !isOwner && !user.followings.includes(post.owner) && <div onClick={menuItemOnCLick} className={style.options + " " + style.danger}>Follow</div>}
              {// cheking unfollow
                !isOwner && user.followings.includes(post.owner) && <div onClick={menuItemOnCLick} className={style.options + " " + style.danger}>Un Follow</div>}
              <div onClick={menuItemOnCLick} className={style.options}>Share to</div>
              <div onClick={menuItemOnCLick} className={style.options}>Copy Link</div>
              <div onClick={menuItemOnCLick} className={style.options}>Cancel</div>
            </div>
          </div>
          <div className={style.Right_Right_Bottom}>
            <BsChevronRight onClick={navigatePosts} style={{ cursor: "pointer" }} size={30} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowImagePost;