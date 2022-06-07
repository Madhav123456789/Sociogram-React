import { useEffect, useRef, useState } from "react";
import style from "./PageCover.module.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { firePageCoverEventNegative, firePageCoverEventPositive, reversePageCoverStrict } from "../../app/operater";

function PageCover({ isVisible = false, children, putVisbleRef, needHeight, needWidth, needMargin , onCloseCover}) {
  // this is page covers title
  const {title} = useSelector(s=>s.pagecover);
  // initializing dispatch
  const dispatch = useDispatch();

  // stoping propagation of component
  const onComponentClick = (e) => {
    e.stopPropagation();
  };

  // setting margin if required
  useEffect(() => {
    if (needMargin) {
      compoRef.current.style.margin = needMargin;
    }
  }, []);

  // ref for component
  const compoRef = useRef();
  // ref for page cover
  const pageCoverRef = useRef();

  // this will be responsible to open and close pagecover
  useEffect(() => {
    if (isVisible) {
      pageCoverRef.current.style.display = "flex";
    } else {
      pageCoverRef.current.style.display = "none";
    }

  }, [isVisible]);

  // this is on click function used to close page cover
  const closePageCover = () => {
    // putting state false
    dispatch(putVisbleRef(false));
    // pageCoverRef.current.style.display = "none";
  };

  // this will enable page scroll when pagecover is off and disabling scroll when pagecover on
  useEffect(() => {
    // disabling scroll
    if (isVisible) {
      document.querySelector("html").style.overflowY = "hidden";
    } else {
      document.querySelector("html").style.overflowY = "auto";
    }
  }, [isVisible]);

  return (
    <>
      <div ref={pageCoverRef} onClick={closePageCover} className={style.pagecover}>
        <div ref={compoRef} style={needHeight && needWidth && { height: needHeight, width: needWidth }} onClick={onComponentClick} className={style.component}>
          <div className={style.btnHolder}>
            <div className={style.title}>{title && String(title).substring(0, 30)}</div>
            <IoMdClose onClick={closePageCover} style={{ cursor: "pointer" }} size={30} />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default PageCover