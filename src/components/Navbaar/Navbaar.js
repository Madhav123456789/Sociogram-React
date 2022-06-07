import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { RiSettingsFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdAddBox, MdTravelExplore } from "react-icons/md";
import style from "./style.module.css";
import PageCover from "../PageCover/PageCover";
import CreatePost from "../PageCoverComponents/CreatePost/CreatePost";
import { setPageCoverCreatePost } from "../../app/pagecover";
import { Link, useLocation } from "react-router-dom";

function Navbaar() {
  // initializing loaction
  const location = useLocation().pathname;
  // this state will be used for pagecover
  const { state: stateCreatePosts } = useSelector(s => s.pagecover.stateCreatePosts);
  // getting from profile redux store
  const { profile } = useSelector(s => s.user.user);
  // using dispatch
  const dispatch = useDispatch();
  // this will control dynamically navicon's size
  const [active, setActive] = useState("36");
  // this state will contain active page path to know which nav icon should be higlighted or active
  const [activePath, setActivePath] = useState("");

  // setting active path on location change
  useEffect(() => {
    setActivePath(location);
  }, [location]);

  // this function will be used to open page cover
  const openPageCover = () => {
    // opening page via pagecover state true
    dispatch(setPageCoverCreatePost(true));
  }

  return (
    <>
      <PageCover isVisible={stateCreatePosts} putVisbleRef={setPageCoverCreatePost}>
        <CreatePost />
      </PageCover>
      <div className={style.navbaar}>
        <div className={style.left + " " + style.nav_childrens}>
          <div className={style.logoText}>Sociogram</div>
        </div>
        <div className={style.center + " " + style.nav_childrens}>
          <Link to={"/home"}>
            <AiFillHome className={style.gradient} size={activePath === "/home" ? active : "25"} />
          </Link>
          <Link to={"/chat"}>
            <BsFillChatDotsFill className={style.gradient} size={activePath === "/chat" ? active : "25"} />
          </Link>
          <MdAddBox onClick={openPageCover} className={style.gradient} size={"25"} />
          <Link to={"/explore"}>
            <MdTravelExplore className={style.gradient} size={activePath === "/explore" ? active : "25"} />
          </Link>
        </div>
        <div className={style.right + " " + style.nav_childrens}>
          <input placeholder="Search" className={style.search} type="text" id="search" />

          <section className={style.profile}>
            <Link to={"/profile"}>
              {profile ?
                <img style={{ borderRadius: "50%", objectFit: "cover" }} height={"32"} width={"32"} alt={"Your Profile"} src={profile} />
                :
                <CgProfile size={activePath === "/profile" ? active : "25"} />}
            </Link>

            <Link to={"/setting"}>
              <RiSettingsFill className={style.gradient} size={activePath === "/setting" ? active : "25"} />
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}

export default Navbaar