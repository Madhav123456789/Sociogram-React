import style from "./style.module.css";
import Image from "../../ProgressiveImg/ProgressiveImg";
import ProgressiveImg from "../../ProgressiveImg/ProgressiveImg";
function Images({ index, Src, onClick, getIndex , blurDataUrl}) {

  return (
    <div id={"PostBoxeImage_" + index} onClick={()=>{onClick(index)}} className={style.imageContainer}>
      <ProgressiveImg blurDataUrl={blurDataUrl} style={{ borderRadius: "3px" , objectFit:"cover"}} src={Src} height={"150px"} width={"150px"}/>
    </div>
  )
}

export default Images