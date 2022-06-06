import style from "./CreatePost.module.css";
import { BsFillCameraFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Materialnput from "../../../../MaterialInput/Materialnput";
import Button from "../../../../Button/Button";
import STATIC_STATES from "../../../../../addons/static/STATIC_STATES";
import { setImagePost } from "../../../../../app/post";

function CreatePost({ putState }) {
  const dispatch = useDispatch();
  const [postCategories, setPostCategories] = useState(STATIC_STATES.POST_CATEGORIES);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [src, setSrc] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  // validation
  const validater = () => {
    if (title.length < 5) {
      return true;
    } else if (title.length > 25) {
      return true;
    } else if (description.length < 10) {
      return true;
    } else if (description.length > 150) {
      return true;
    } else if (!category) {
      return true;
    } else if (!src) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    // console.log("Validating");
    const $result = validater();
    if (!$result) {
      // console.log("Validation Successful");
      setDisable($result);
    } else {
      setDisable($result);
    }
  }, [title, description, category]);

  // handlers
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  // this function will be used to capture image

  // this function is used to select files and it is onChange function
  const captureImage = (e) => {
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
        reader.onloadend = () => {
          toast.success("Post image has been selected");
          setSrc(reader.result);
          // console.log(reader.result);
        }
      } else {
        toast.error("Unsupported file format");
      }
    }
  };

  // this is on btn click function
  const onNextClick = () => {
    // setting next step
    putState(2);
    // setting post state
    dispatch(setImagePost({ title, description, category, src }));
  }

  return (
    <div className={style.container}>
      <div className={style.left}>
        <label htmlFor="uploadPost" className={`${style.uploadImage} ${src && style.colorWhite}`}>
          {!src ? <BsFillCameraFill size={70} /> :
            <img style={{ borderRadius: "3px" , objectFit:"cover"}} src={src}  height={"200"} width={"200"} />
          }
        </label>
        <input accept="image/*" onChange={captureImage} style={{ display: "none" }} id="uploadPost" type="file" />
      </div>
      <div className={style.right}>
        <Materialnput min={5} showOnType value={title} onChange={onChangeTitle} placeholder={"Title"} increamentVal={title.length} max={25}/>
        <Materialnput min={10} showOnType value={description} onChange={onChangeDescription} placeholder={"Description"} increamentVal={description.length} max={150}/>
        <select onChange={categoryHandler} value={category} className={style.select} name="date" id="date">
          {postCategories.map((item) => {
            return <option key={item} value={item}>{item}</option>
          })}
        </select>

        <Button needId={"gonextpoststep"} onClick={onNextClick} disable={disable} strict={"17vw"} title={"Next"} Src={AiOutlineArrowRight} icondir={"right"} />
      </div>
    </div>
  )
}

export default CreatePost