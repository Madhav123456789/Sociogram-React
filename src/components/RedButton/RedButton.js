import styles from "./RedButton.module.css";
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

function RedButton({ workAsLink, history = true, disable, strict, Src, title, onClick }) {
    const navigate = useNavigate();
    const btnRef = useRef();

    // handling enabling or disabling of button using disable prop
    useEffect(() => {
        !title && console.error("Button must required title")
        if (disable) {
            btnRef.current.style.background = "#ff00005c";
        } else {
            btnRef.current.style.background = "#ff4700";
        }
    }, [disable]);

    // this manage mouse over animation
    function mouseoverAnim(e) {
        if (!disable) {
            e.target.style.background = "red";
        }
    }


    // this manage mouse out animation
    function moseoutAnim(e) {
        if (!disable) {
            e.target.style.background = "#ff4700";
        }
    }

    // hadle buttons click conditionally
    function clickManager() {
        if (workAsLink) {
            navigate(workAsLink);
        };
    };


    return (
        title &&
        <button disabled={disable} ref={btnRef} onMouseOut={moseoutAnim} onMouseOver={mouseoverAnim} id="custombtn" style={strict && { width: strict }} onClick={workAsLink ? clickManager : onClick} className={styles.custombtn}>
            {Src && <div className={styles.mr}>
                <Src className={styles.transparent} size={25} color={"white"} />
            </div>}
            <div className={styles.btnTitle}>{title.substring(0, 20)}</div>
        </button>
    )
}

export default RedButton;
