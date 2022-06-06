import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { needUpdateMyProfilePic } from "../../../apis/user";
import Footer from "../../../components/Footer/Footer";
import Posts from "../../SubPages/Profile/Posts/Posts";
import Reels from "../../SubPages/Profile/Reels/Reels";
import Saved from "../../SubPages/Profile/Saved/Saved";
import Tagged from "../../SubPages/Profile/Tagged/Tagged";
import Videos from "../../SubPages/Profile/Videos/Videos";
import style from "./style.module.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../components/Loader/Loader";
import {setUser} from "../../../app/user";
import {CgProfile} from "react-icons/cg";
import merges from "../../merges.module.css";
import {FiSettings} from "react-icons/fi";
import {setPageTitle} from "../../../app/operater";

function Profile() {
    // initializing dispatch
    const dispatch = useDispatch();
    
    useEffect(()=>{
        // setting page title
        dispatch(setPageTitle("Profile"));
    },[]);

    // states
    const [loading, setLoading] = useState(false);

    // this will be used to make dynamic components
    const subComponents = {
        post: Posts,
        video: Videos,
        reels: Reels,
        tagged: Tagged,
        saved: Saved
    };

    // destructuring user data for the profile
    const { profile, name, username, biography, posts, followers, followings } = useSelector(s => s.user.user);

    // option state is a state for managing sub components
    const [optionState, setOptionState] = useState(sessionStorage.getItem("option_state"));

    // this will be used to decide which sub component should be rendered
    const SubPage = !optionState ? subComponents['post'] : subComponents[optionState];

    // this function is used to select files and it is onChange function
    const captureImageAndUpdateProfile = (e) => {
        // getting file from Element object.filesArray
        const file = e.target.files[0];
        // console.log(file)
        // this  is a array to check that user's selected file is valid or not
        const validfiles = ["image/png"/*, "image/svg+xml"*/, "image/jpg", "image/jpeg"];
        if (file) {
            if (validfiles.includes(file.type)) {
                setLoading(true);
                // this is file reader api and it's an in built function/api
                const reader = new FileReader();
                reader.readAsDataURL(file);
                // this is it's callback
                reader.onloadend = async () => {
                    // setting the avtaar in redux/state/app/avtaar
                    // dispatch(setAvtaar(reader.result));
                    try {
                        // The activateAccount method comes from api folder it is using axios api for making requests
                        const data = await (await needUpdateMyProfilePic({ avtaar: reader.result })).data;
                        const { flag, msg, user } = data;
                        if (flag) {
                            toast.success(msg);
                            dispatch(setUser(user));
                            setLoading(false);
                        }
                    } catch (error) {
                        if (error.response) {
                            setLoading(false);
                            if (!error.response.status == 413) {
                                toast.error(error.response.data.msg);
                            } else {
                                toast.error("Max file size 8 mb");
                            }
                        }
                    } finally {
                        setLoading(false);
                    }
                }
            } else {
                toast.error("Unsupported file format");
            }
        }
    };

    return (
        <div className={`authenticated`}>
            <div className={style.profileBox}>
                <div className={style.top}>
                    <div className={style.topLeft}>
                        <input accept="image/*" onChange={captureImageAndUpdateProfile} type="file" id="img-selecter" style={{ display: "none" }} />
                        <label style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }} htmlFor="img-selecter" className={style.changer}>
                            {loading && <Loader />}
                            {profile ? <img className={style.profilePic} style={{ cursor: "pointer", borderRadius: "50%", marginLeft: "10px" , height:"20vh" , objectFit:"cover"}}  src={profile} /> : <CgProfile style={{ cursor: "pointer" }} className={style.profilePic} size={150} />}
                        </label>
                    </div>
                    <div className={style.topRight}>
                        <div className={style.topOfTopRight}>
                            <div className={style.leftOfTopOfTopRight}>
                                {username}
                            </div>
                            <div className={style.rightOfTopOfTopRight}>
                                <FiSettings style={{ color: "white", cursor: "pointer", marginLeft: "5px" }} size={"23"} />
                            </div>

                        </div>
                        <div className={style.midOfTopRight}>
                            <div className={style.countName}>Posts</div>
                            <div className={style.counts}>{posts ? posts.length : "0"}</div>
                            <div className={style.countName}>Followers</div>
                            <div className={style.counts}>{followers ? followers.length : "0"}</div>
                            <div className={style.countName}>Followings</div>
                            <div className={style.counts}>{followings ? followings.length : "0"}</div>
                        </div>
                        <div className={style.bottomOfTopRight}>
                            <div className={style.name}>{name}</div>
                            <div className={style.bio}>{biography}</div>
                        </div>
                    </div>
                </div>
                <div className={style.bottom}>
                    <div className={style.optionHolder}>
                        <div onClick={
                            () => {
                                sessionStorage.setItem("option_state", "post");
                                setOptionState(sessionStorage.getItem("option_state"));
                            }
                        } className={!optionState || optionState === "post" ? style.active_option : style.options}>Posts</div>
                        <div onClick={
                            () => {
                                sessionStorage.setItem("option_state", "reels");
                                setOptionState(sessionStorage.getItem("option_state"));
                            }
                        } className={optionState && optionState === "reels" ? style.active_option : style.options}>Reels</div>
                        <div onClick={
                            () => {
                                sessionStorage.setItem("option_state", "video");
                                setOptionState(sessionStorage.getItem("option_state"));
                            }
                        } className={optionState && optionState === "video" ? style.active_option : style.options}>Videos</div>
                        <div onClick={
                            () => {
                                sessionStorage.setItem("option_state", "saved");
                                setOptionState(sessionStorage.getItem("option_state"));
                            }
                        } className={optionState && optionState === "saved" ? style.active_option : style.options}>Saved</div>
                        <div onClick={
                            () => {
                                sessionStorage.setItem("option_state", "tagged");
                                setOptionState(sessionStorage.getItem("option_state"));
                            }
                        } className={optionState && optionState === "tagged" ? style.active_option : style.options}>Tagged</div>
                    </div>
                    <SubPage isOwnerProfile />
                </div>
            </div>
            <Footer name={["Blogs", "About", "Job", "Api", "Priacy Policy", "Terms And Conditions", "Coming Events", "Help", "Customer Care", "Credits"]} redirect={["/blogs", "/sitemeta/about"]}>
                <div className={merges.footerRight}>All Copyrights Reserved By Sociography&copy;</div>
            </Footer>
        </div>
    )
}

export default Profile