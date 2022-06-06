import style from "./style.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { needPostDeletion } from "../../../../apis/posts";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../app/user";
import { setProfilePostOnClick } from "../../../../app/pagecover";
import { BsChevronRight } from "react-icons/bs";
import ProgressiveImg from "../../../ProgressiveImg/ProgressiveImg";

function ShowImagePost({ isOwner, post, profile, name, putIndex, postMaxLength, index }) {
  // initializing dispatch
  const dispatch = useDispatch();
  // const getting user from user redux
  const { user } = useSelector(s => s.user);
  // state will be used to enable and disbale options menu
  const [holderState, setHolderState] = useState("none");
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
  }

  return (
    <div onClick={closeMenu} className={style.Container}>
      <div className={style.Left}>
        {post && <ProgressiveImg style={{ borderRadius: "5px", objectFit: "cover" }} src={`http://localhost:5001${post.src}`} height={370} width={370} />}
      </div>
      <div className={style.Right}>
        <div className={style.Right_left}>
          <div className={style.Right_left_Top}>
            <ProgressiveImg height={"40px"} width={"40px"} style={{ borderRadius: "50%" }} src={profile} />
            <div className={style.Name}>{name}</div>
          </div>

          <div className={style.Right_left_Center}>
            <div className={style.CommentsContainer}>
              
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