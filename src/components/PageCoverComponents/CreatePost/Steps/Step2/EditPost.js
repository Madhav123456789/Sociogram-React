import style from "./EditPost.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "../../../../Slider/Slider";
import { setPageCoverCreatePost } from "../../../../../app/pagecover";
import { needPostCreation } from "../../../../../apis/posts";
import { setUser } from "../../../../../app/user";
import Loader from "../../../../Loader/Loader";
import Button from "../../../../Button/Button";
import ProgressiveImg from "../../../../ProgressiveImg/ProgressiveImg";

function EditPost({ putState }) {
  const dispatch = useDispatch();
  // getting post data through redux store
  const { src: Src, title, description, category } = useSelector(s => s.post.imagePost);
  // creating states
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(50);
  const [greyScale, setGreyScale] = useState(86);
  const [hueRotate, setHueRotate] = useState(2);
  const [saturation, setSaturation] = useState(9);
  const [contrast, setContrast] = useState(85);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [sepia, setSepia] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);

  // this will be used as protected route this will restrict user if fields empty
  useEffect(() => {
    if (!Src || !title || !description || !category) {
      putState(1);
    }
  }, []);

  // handlers
  const stateHandler = (e) => {
    // finding image
    const image = document.getElementById("EditModeImage");
    setIsEdited(true);

    if (e.target.id === "Blur") {
      setBlur(e.target.value);
    } else if (e.target.id === "Brightness") {
      setBrightness(e.target.value);
    } else if (e.target.id === "GreyScale") {
      setGreyScale(e.target.value);
    } else if (e.target.id === "HueRotate") {
      setHueRotate(e.target.value);
    } else if (e.target.id === "Saturation") {
      setSaturation(e.target.value);
    } else if (e.target.id === "Opacity") {
      setOpacity(e.target.value);
    } else if (e.target.id === "Invert") {
      setInvert(e.target.value);
    } else if (e.target.id === "Contrast") {
      setContrast(e.target.value);
    } else {
      // for sepia
      setSepia(e.target.value);
    }

    // styling image
    image.style.filter = 'grayscale(' + greyScale + '%) hue-rotate(' + hueRotate * 2 + 'deg) brightness(' + brightness * 2 + '%) blur(' + blur + 'px) saturate(' + saturation + ') sepia( ' + sepia + '%) contrast(' + contrast + '%) opacity(' + opacity + '%) invert(' + invert * 2 + '%)';
  };

  // button on click
  const uploadPost = async () => {
    // loading...
    setLoading(true);
    // this condition will define is image edited or not
    if (isEdited) {
      // finding image
      const image = document.getElementById("EditModeImage");
      // finding canvas
      const canvas = document.getElementById("edtPostCanvas")
      // canvas context
      const context = canvas.getContext('2d');

      // always write it before filters because i have wasted a day only because of it
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      // canvas.height = "500";
      // canvas.width = "500";

      // setting filters
      context.filter = 'grayscale(' + greyScale + '%) hue-rotate(' + hueRotate * 2 + 'deg) brightness(' + brightness * 2 + '%) blur(' + blur + 'px) saturate(' + saturation + ') sepia( ' + sepia + '%) contrast(' + contrast + '%) opacity(' + opacity + '%) invert(' + invert * 2 + '%)';

      // drawing image
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      // getting canvas image url
      var editedImage = canvas.toDataURL("image/jpg");

      try {
        // uploading post
        const { data } = await needPostCreation({ src: editedImage, title, description, category, post_type: "img" });

        const { flag, msg, user } = data;

        if (flag) {
          toast.success(msg);
          // setting user state to show realtime updations
          dispatch(setUser(user));
          putState(1);
          setLoading(false);
        }
        console.log(data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        }
        putState(1);
        setLoading(false);
      } finally {
        setLoading(false);
        // closing page cover
        dispatch(setPageCoverCreatePost(false));
      }
    } else {
      try {
        // uploading post
        const { data } = await needPostCreation({ src: Src, title, description, category, post_type: "img" });

        const { flag, msg, user } = data;

        console.log(user)

        if (flag) {
          toast.success(msg);
          // setting user state to show realtime updations
          dispatch(setUser(user));
          putState(1);
          setLoading(false);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        }
        putState(1);
        setLoading(false);
      } finally {
        setLoading(false);
        // closing page cover
        dispatch(setPageCoverCreatePost(false));
      }
    }
  }

  return (<>
    {loading ?
      <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} >
        <Loader />
      </div>
      ://else
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className={style.editor}>
        <div className={style.left}>
          {Src && <ProgressiveImg id="EditModeImage" src={Src} height={"250"} width={"250"} style={{objectFit:"cover"}} className={style.postImg} />}
        </div>
        <div className={style.right}>
          <div className={style.filterTitle}>Filters</div>
          <Slider max={8} value={blur} onChange={stateHandler} id={"Blur"} title={"Blur"} />
          <Slider max={100} value={brightness} onChange={stateHandler} id={"Brightness"} title={"Brightness"} />
          <Slider max={100} value={greyScale} onChange={stateHandler} id={"GreyScale"} title={"Grey Scale"} />
          <Slider max={100} value={hueRotate} onChange={stateHandler} id={"HueRotate"} title={"Hue Rotate"} />
          <Slider max={100} value={saturation} onChange={stateHandler} id={"Saturation"} title={"Saturation"} />
          <Slider max={100} value={sepia} onChange={stateHandler} id={"Sepia"} title={"Sepia"} />
          <Slider max={100} value={contrast} onChange={stateHandler} id={"Contrast"} title={"Contrast"} />
          <Slider max={100} value={opacity} onChange={stateHandler} id={"Opacity"} title={"Opacity"} />
          <Slider max={50} value={invert} onChange={stateHandler} id={"Invert"} title={"Invert"} />

          <Button onClick={uploadPost} title={"Upload Post"} />
          <canvas style={{ display: "none" }} id={"edtPostCanvas"}></canvas>
        </div>
      </div>}
  </>
  )
}

export default EditPost