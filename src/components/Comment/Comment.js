import style from "./style.module.css"
import ProgressiveImg from "../../components/ProgressiveImg/ProgressiveImg";

function Comment(src) {
  return (
    <div className={style.Container}>
        <div className={style.left}>
            <ProgressiveImg src={src} isLoading height={"10px"} width={"10px"}/>
        </div>
        <div className={style.Right}></div>
    </div>
  )
}

export default Comment