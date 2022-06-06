import styles from "./Button.module.css"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

function Button({ needId, icondir = "left", workAsLink, disable, strict, Src, title, onClick }) {
    const navigate = useNavigate();
    const btnRef = useRef();

    // handling enabling or disabling of button using disable prop
    useEffect(() => {
        !title && console.log("Button must required title")
        if (disable) {
            btnRef.current.style.background = "#B2DFFC";
        } else {
            btnRef.current.style.background = "#0095F6";
        }
    }, [disable])

    // this manage mouse over animation
    function mouseoverAnim(e) {
        if (!disable) {
            e.target.style.background = "#004ef6ed";
        }
    }

    // this manage mouse out animation
    function moseoutAnim(e) {
        if (!disable) {
            e.target.style.background = "#0095F6";
        }
    }

    // hadle buttons click conditionally
    function clickManager() {
        if (workAsLink) {
            navigate(workAsLink);
        };
    };


    return (title &&
        <button disabled={disable} ref={btnRef} onMouseOut={moseoutAnim} onMouseOver={mouseoverAnim} id={needId ? needId : "custombtn"} style={strict && { width: strict }} onClick={workAsLink ? clickManager : onClick} className={styles.custombtn}>
            {icondir === "left" && Src && <div className={styles.mr}>
                <Src className={styles.transparent} size={25} color={"white"} />
            </div>}
            <div className={styles.btnTitle}>{title.substring(0, 20)}</div>
            {icondir === "right" && Src && <div style={{ marginRight: "5px" }} className={styles.mr}>
                <Src className={styles.transparent} size={25} color={"white"} />
            </div>}
        </button>
    )
}

export default Button