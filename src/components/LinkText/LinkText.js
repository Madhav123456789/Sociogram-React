import styles from "./LinkText.module.css";
import { useNavigate } from "react-router-dom";

function LinkText({ text="", target , className}) {
    const navigate = useNavigate();

    function workAsLink() {
        if (target) {
           navigate(target);
        }
    }

    return (
        <span onClick={workAsLink} className={`${styles.linktext} ${className}`}>
            {`${text.length<=20 ? text.substring(0, 20):text.substring(0, 20).concat("...")}`}
        </span>
    )
}

export default LinkText