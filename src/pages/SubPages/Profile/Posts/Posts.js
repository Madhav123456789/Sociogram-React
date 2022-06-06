import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePostOnClick } from "../../../../app/pagecover";
import PageCover from "../../../../components/PageCover/PageCover";
import ShowImagePost from "../../../../components/PageCoverComponents/ShowProfilePosts/ShowImagePost/ShowImagePost";
import Images from "../../../../components/PostBoxes/Images/Images";
import style from "./style.module.css";

function Posts({ isOwnerProfile, data }) {
  // initializing dispatch
  const dispatch = useDispatch();

  // this state will be used to get state from Images Post Boxes
  const [index, setIndex] = useState(0);

  // this state will be used for page cover toggling
  const { state: stateProfilePostsOnClick } = useSelector(s => s.pagecover.stateProfilePostsOnClick);

  // getting user posts from redux user state
  const { posts: userPosts  , profile , name} = useSelector(s => s.user.user);

  // creating posts state
  const [posts, setPosts] = useState([]);

  // setting posts
  useEffect(() => {
    if (isOwnerProfile) {
      setPosts(userPosts);
    } else {
      setPosts(data);
    }
  }, [userPosts]);

  // this is on click function for Image component
  const onImagePostClick = (e) => {
    // turning on page cover
    dispatch(setProfilePostOnClick(true));
    // setting index
    setIndex(e.currentTarget.id.split("_")[1]);
    // console.log(posts[index])
  };

  return (
    <>
      <div className={style.postsContainer}>
        {
          // cheking is post
          posts.length > 0 ?
            posts.map((post, index) => {
              return <Images onClick={onImagePostClick} key={index} blurDataUrl={`http://localhost:5001${post.blur_src}`} Src={`http://localhost:5001${post.src}`} index={index} _id={post._id} />
            }):
            <div className={style.noPostText}>No Post Found</div>}
      </div>

      {/* this is page cover for showing clicked post */}
      <PageCover isVisible={stateProfilePostsOnClick} putVisbleRef={setProfilePostOnClick} needWidth={"60vw"} needHeight={"80vh"}>
        <ShowImagePost isOwner={isOwnerProfile} post={posts[index]} profile={profile} name={name} index={index} putIndex={setIndex} postMaxLength={posts.length}/>
      </PageCover>
    </>
  )
}

export default Posts